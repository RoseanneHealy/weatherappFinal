// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
const { randomInt } = require('crypto');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));
const port = 3000;


// Setup Server
const server = app.listen(port, listening);
function listening() {
  console.log(`running on localhost: ${port}`);
};

// Setup empty JS object to act as endpoint for all routes
let projectData = {};

app.get('/all', getData)

function getData(req, res) {
  res.send(projectData)
}

//POST ROUTE (posting new info back like zip and users entered feelings)
app.post('/addNewZip', storingPostedDataFromJS);

function storingPostedDataFromJS(req, res) {
  newEntry = req.body;
  projectData = newEntry;
  console.log(projectData);
  res.send(projectData);
}


