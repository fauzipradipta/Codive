var express = require('express');       //shows that we use the express
var app = express();

var server = app.listen(5000, listening);
// var login = require('./public/login');

function listening(){
    console.log("listening...");
}

app.use(express.static('public'));
// app.use('/login', login);

console.log('server is Starting');