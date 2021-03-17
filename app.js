const express = require('express');       //shows that we use the express
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const server = app.listen(5000, listening);
const AuthRoute = require('./controllers/AuthController')



function listening(){
    console.log("listening...");
}

app.use(express.static('public'));
// app.use('/login', login);

console.log('server is Starting');