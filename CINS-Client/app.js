const express = require('express');
const proxy   = require('express-http-proxy');
const config  = require('./config.json');
var app       = express();

app.use(express.static('dist'));
app.use('/api', proxy(config[process.env.NODE_ENV].apiServer.URL));

app.listen(8080);
