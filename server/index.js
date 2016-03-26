/*jshint node:true*/
'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 8000;
var routes;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

routes = require('./routes');

var source = '';

app.get('/ping', function(req, res, next) {
    console.log(req.body);
    res.send('pong');
});

app.use("/", express.static("./client/"))

app.use("/api", routes);

app.listen(port, function() {
    console.log('************************');
    console.log('NYPL Dishes Search Server');
    console.log('Listening on port ' + port);
});
