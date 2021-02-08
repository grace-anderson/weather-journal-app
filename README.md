# Weather-Journal App (Udacity Project)

## Overview
This project created an asynchronous web app that uses Web API and user data to dynamically update the UI. 

## User experience
### App behaviour
* The user enters a city and (optionally) the city's country code. 
* The country field can be used where a city exists in more than one country (e.g. Melbourne, AU vs Melbourne, FL, US).
* The user can choose to look up the country code, if needed, by clicking 'Find Country Code'
* Finally, the user enters text about their feelings.
* Clicking the 'Get Weather' retrieves the current weather for the entered city, with a background that pictures the retrieved weather. The weather is retrieved via an api from openweathermap.org.
* After viewing the retrieved weather results, the user can choose to look up weather for another city by clicking 'Get More Weather'
### Responsiveness
* The app is fully responsive, and can adapt to any screen size.
* If the user has a screen with a narrow horizontal view (e.g. iPhone X turned horizontally), the app will scroll up to the top of the screen after clicking 'Get Weather' or 'Get More Weather'.

## Project Environment Setup
### Node and Express environment
* Node and Express should be installed on the local machine
* server.js requires express and creates an instance of the app using express
* The express app instance is pointed to the project folder ('website'), which contains the .html, .css and .js files

### Project Dependencies
* The ‘cors’ package should be installed in the project from the command line
* 'cors' is required in the project file server.js, and the instance of the app is setup to use cors().
* body-parser package is installed and included in the project

### Local server
* Local server should be shown as running by producing feedback to the command line through a callback

### API credentials 
* Created on OpenWeatherMap.com

## APIs and Routes
### App API end point
* JavaScript Object named projectData is initiated in the file server.js to act as the app API endpoint.

### Integrating OpenWeatherMap API
* The API searches by city, as this caters for an international audience. The zip code option doesn't work for non-US, such as Australia (where I live)
* Personal API Key for OpenWeatherMap API is saved in a named const variable
* The API Key variable is passed as a parameter to fetch()
* Data is successfully returned from the external API.

### Return Endpoint data - Get route I - Server Side
* a GET route setup on the server side with the first argument as a string naming the route (i.e. '/return'), and the second argument a callback function (i.e. getData function) that returns JS object (i.e. projectData) is created at the top of server code.

### Return Endpoint data - Get route II - Client Side
* an asynchronous function fetches the data from the app endpoint - getServerData() - and awaits for the fetch return

### POST Route
* entry added to the project endpoint using a POST route setup on the server side (app.post, function postData())and executed on the client side as an asynchronous function (async function postData())
* client side function (postData) takes two arguments, the URL to make a POST to (url), and an object holding the data to POST (data)
* server side function creates a new entry in the apps endpoint (the named JS object (projectData)) consisting of the data received from the client side POST (postData)

## Dynamic UI
### Naming HTML Inputs and Buttons For Interaction
* the input element uses city, as zip code does not work consistently with Australian or NZ codes. IDs etc updated to city.
### Assigning Element Properties Dynamically
* the div with the id, entryHolder, has child divs with the ids:
    - date
    - temp
    - location (city)
    - country
    - content
### Event Listeners
* In app.js file, the 'Get weather' button has an id of 'generate' and an event listener (addEventListener()), click is the first parameter, and callback function (retrieve) as is second parameter. 
* Clicking the 'Get weather' button initiates retrieval of the data to display in the UI
### Dynamically Update UI
* properties of existing HTML elements are set from the DOM
* the async function retrieves the app’s data on the client side (getServerData())
* existing DOM elements have their innerHTML properties dynamically set according to data returned by the app route.(updateUI())

# weather-journal-app