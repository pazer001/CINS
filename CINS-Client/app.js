const express     = require('express');
const proxy       = require('express-http-proxy');
const config      = require('./config.json');
const compression = require('compression')

var app       = express();
app.use(compression());
app.use(express.static('dist'));
app.use('/api', proxy(config[process.env.NODE_ENV].apiServer.URL));

app.listen(config[process.env.NODE_ENV].Port, () => console.log(`
Server ${process.env.NODE_ENV} on port ${config[process.env.NODE_ENV].Port}
Proxy to ${config[process.env.NODE_ENV].apiServer.URL}
`));
