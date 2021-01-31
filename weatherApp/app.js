/* Global Variables */
const generate = document.querySelector('.generate');
const description = document.querySelector('textarea');
const cityName = document.querySelector('input');

// Create a new date instance dynamically with JS, UK/Aus/NZ format
let d = new Date();
let newDate = d.getDate() + '/' + d.getMonth() + 1 + '/' + d.getFullYear();

// Key for OpenWeatherMap (see https://openweathermap.org/)
const key = 'b279d2dc68159b9a66df281d1f671494';

//------------------------------------------------------------------//
//check the server for latest values of the page
getServerData();

// Event listener to add function to existing HTML DOM element
generate.addEventListener('click', retrieve);

/* Function called by event listener */

function retrieve() {
    let desValue = description.value;
    let cityValue = cityName.value;

    getWeather(cityValue, desValue).then(() => {
        getServerData();
    });
}

/* Function to GET Web API Data*/
function getWeather(city, des) {
    //check if city is empty
    if (city == '') {
        return;
    }
    //api - retrieve city data, with temp in metric units
    let api = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;
    console.log(api);
    //fetch api
    return fetch(api)
        .then(function (response) {
            let data = response.json();
            return data;
        })
        .then(function (data) {
            const temperature = Math.floor(data.main.temp);
            const description = data.weather[0].description;
            const icon = data.weather[0].icon;
            const city = data.name;
            const country = data.sys.country;
            const userText = des; //add the user description
            postData('/add', {
                temperature,


                description,
                icon,
                city,
                country,
                userText,
                newDate,
            });
        });
}

/* Function to POST data */
async function postData(url, data) {
    await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        // Body data type must match "Content-Type" header = i.e. json
        body: JSON.stringify(data), //convert strings from server
    });
}

// get project data and update the UI
async function getServerData() {
    const response = await fetch('/return');
    const latestEntry = await response.json();
    // checking if there is a temperature attribute
    if (latestEntry && latestEntry.temperature) {
        updateUI(latestEntry);
    }
}

const icon = document.getElementById('icon');
const temp = document.getElementById('temp');
const date = document.getElementById('date');
const place = document.getElementById('location');
const content = document.getElementById('content');

function updateUI(weather) {
    console.log(weather);

    icon.innerHTML = `<img src="svg/${weather.icon}.svg" alt="nothing yet" />`;
    temp.innerHTML = `${weather.temperature}°C`;
    date.innerHTML = weather.newDate ? weather.newDate : '';
    place.innerHTML = weather.city ? weather.city : '';
    content.innerHTML = weather.userText ? weather.userText : '';
}