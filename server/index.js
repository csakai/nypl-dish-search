/*jshint node:true*/
'use strict';

var config = require('config'),
    express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    app = express(),
    port,
    routes;

if (process.env.PORT) {
    port = process.env.PORT;
} else if (config.has('PORT')) {
    port = config.get('PORT');
} else {
    port = 8000;
}

if (!config.has('API_KEY') || config.get('API_KEY') === 'YOUR_API_KEY') {
    console.log('Please specify a real API_KEY. This can be easily accomplished by adding a new config file to the config folder,');
    console.log('named "local.json", with an API_KEY specified.');
    process.exit(1);
}

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
routes = require('./routes');

app.get('/ping', function(req, res, next) {
    console.log(req.query);
    res.send('pong');
});
app.use("/src", express.static(path.resolve(__dirname + "/../client/app/")));
app.use("/bower_components", express.static(path.resolve(__dirname + "/../bower_components/")));

app.use("/api", routes);
app.get("/*", function (req, res) {
    res.sendFile(path.resolve(__dirname + "/../client/index.html"));
});
app.listen(port, function() {
    console.log('************************');
    console.log('NYPL Dishes Search Server');
    console.log('Listening on port ' + port);
});
