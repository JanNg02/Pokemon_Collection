const express = require('express');
const app = express(); 

const controller = require('./Controller/homepageController.js');

app.get('/', controller.generateHomePage);

module.exports = app;