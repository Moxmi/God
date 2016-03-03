'use strict';
/**
 * This is a server bower by express.
 */

var express = require('express'),
    routes = require('./routes/index.js'),
    bodyParser = require('body-parser');

var PORT = 4002;
var HOST = '0.0.0.0';

var app = express();
app.set('port', PORT);
app.set('host', HOST);

//app.use(express.bodyParser());
app.use(express.static(__dirname + '/app'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

global.allowHosts = ['http://200.21.13.1:4002', 'http://localhost:4002', 'http://0.0.0.0:4002']

routes(app);

app.listen(app.get('port'), app.get('host'), function () {
  console.log("Express [%s] server listening on http://%s:%s",
             app.get('env'), app.get('host'), app.get('port'));
});
