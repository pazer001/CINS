const express     = require('express');
const proxy       = require('express-http-proxy');
const config      = require('./config.json');
const compression = require('compression');
const app         = express();


app.use(express.static('dist'));
app.use('/api', proxy(config[process.env.NODE_ENV].apiServer.URL));
app.use(compression());

app.get('*', (req, res) => {
  res.status(200).sendFile('index.html', { root: 'dist'});
});

app.listen(config[process.env.NODE_ENV].Port, () => console.log(`
Server ${process.env.NODE_ENV} on port ${config[process.env.NODE_ENV].Port}
Proxy to ${config[process.env.NODE_ENV].apiServer.URL}
`));