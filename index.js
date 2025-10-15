require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const router  = require('./routes.js');
const bodyParser = require("body-parser"); 

//body parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//for css, js and images and such
app.use(express.static(__dirname + '/Public'));
app.use(express.static(__dirname));

//Ejs enabled   
app.set('view engine', 'ejs');
app.set('View', 'view'); 

//Mongoose
const mongoAtlasUri = process.env.MONGODB_URI;
try {
    // Connect to the MongoDB cluster
    mongoose.connect(mongoAtlasUri);
    console.log("Mongoose is connected")

} catch (e) {
    console.log("could not connect");
}

// Start the server
app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});

app.use("/", router); 
