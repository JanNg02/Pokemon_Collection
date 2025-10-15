const express = require('express');
const app = express(); 

const loginController = require('./Controller/loginController.js');
const registerController = require('./Controller/registerController.js')
const homepageController = require('./Controller/homepageController.js');

//Landing Page
app.get('/', homepageController.generateHomePage);

//Login and Register
app.get('/login', loginController.generateLoginPage);
app.get('/register', registerController.generateRegisterPage);

module.exports = app;