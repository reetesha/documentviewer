var express = require('express'),
    http = require('http'),
    fs = require('fs'),
    passport = require('passport'),
    routes = require('./server/routes').routes;

/*var swagger = require("swagger-node-express");
    swagger.setAppHandler(express);*/

var app = express();
app.use(express.bodyParser());

routes(app, JSON.parse(fs.readFileSync('server/initial_data.json')));

app.use('/', express.static(__dirname + '/client/app/documentviewer'));

var port = process.env.PORT || 7000;
app.listen(port);
console.log('Please go to http://localhost:' + port);