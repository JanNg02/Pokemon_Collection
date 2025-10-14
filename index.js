const express = require('express');
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

// Start the server
app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});

app.use("/", router); 
