var express = require('express');
var app = express();
var path = require('path');

let router = express.Router();
var bodyParser= require('body-parser');
app.use(bodyParser());
var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/Builder', function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('connected');
    }
});
 var root = require('./routes/route');

app.use('/routes',root);
app.listen(3000,function(){
    console.log('server is running on port 3000');
});

