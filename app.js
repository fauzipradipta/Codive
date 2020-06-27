var express = require('express');       //shows that we use the express
var app = express();

var server = app.listen(5000, listening);

function listening(){
    console.log("listening...");
}

app.use(express.static('public'));

console.log('server is Starting');