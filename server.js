// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
// Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Dependencies */
//configure express to use body-parser as middle-ware
const bodyParser = require("body-parser");
/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 3000;
// Spin up the server
const server = app.listen(port, listening);
function listening() {
  // Callback to debug
  console.log(`running on localhost: ${port}`);
}

// Initialize all routes with a callback function

// GET route
app.get("/return", getData);
function getData(request, response) {
  response.send(projectData);
}

// POST route
app.post("/add", postData);

function postData(request, response) {
  projectData = request.body;
  response.send({ message: "Post received" });
  console.log(projectData);
}
