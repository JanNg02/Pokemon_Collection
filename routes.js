const express = require('express');
const app = express(); 

function requireAuth(req, res, next) {
  if (req.session.userID) {
    next(); // User is authenticated, proceed to the next handler
  } else {
    res.redirect('/login'); // Redirect to login
  }
}

const loginController = require('./Controller/loginController.js');
const registerController = require('./Controller/registerController.js');
const homepageController = require('./Controller/homepageController.js');
const setViewCardsController = require('./Controller/setViewCardsController.js');
const collectionController = require('./Controller/collectionController.js');

//Landing Page
app.get('/', requireAuth, homepageController.generateHomePage);

//Login and Register
app.get('/login', loginController.generateLoginPage);
app.post('/loginUser', loginController.loginUser);
app.get('/logoutUser', loginController.logoutUser);
app.get('/register',registerController.generateRegisterPage);
app.post('/registerUser', registerController.registerUser);

//set View Cards
app.get('/setViewCards/:setId', setViewCardsController.generateViewPage);

//collection functions
app.get('/addToCollection/:cardID', collectionController.addToCollection);

module.exports = app;