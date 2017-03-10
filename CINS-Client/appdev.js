import 'angular2-universal-polyfills';
const express     = require('express');
const proxy       = require('express-http-proxy');
const config      = require('./config.json');
const compression = require('compression');


import * as path from 'path';
import {provideRouter} from '@angular/router';
import {enableProdMode} from '@angular/core';
import {
  expressEngine,
  BASE_URL,
  REQUEST_URL,
  ORIGIN_URL,
  NODE_LOCATION_PROVIDERS,
  NODE_HTTP_PROVIDERS,
  ExpressEngineConfig
} from 'angular2-universal';

import {App, routes} from './src/app';

const app         = express();
const ROOT = path.join(path.resolve(__dirname, '..'));
app.engine('.html', expressEngine);
app.set('views', __dirname);
app.set('view engine', 'html');

function ngApp(req, res) {
  let baseUrl = '/';
  let url = req.originalUrl || '/';

  let config = {
    directives: [ App ],

    // dependencies shared among all requests to server
    platformProviders: [
      {provide: ORIGIN_URL, useValue: 'http://localhost:3000'},
      {provide: BASE_URL, useValue: baseUrl},
    ],

    // dependencies re-created for each request
    providers: [
      {provide: REQUEST_URL, useValue: url},
      provideRouter(routes),
      NODE_LOCATION_PROVIDERS,
      NODE_HTTP_PROVIDERS,
    ],

    // if true, server will wait for all async to resolve before returning response
    async: true,

    // if you want preboot, you need to set selector for the app root
    // you can also include various preboot options here (explained in separate document)
    preboot: false // { appRoot: 'app' }
  };

  res.render('index', config);
}

app.use(express.static(ROOT, {index: false}));

app.use(compression());
// app.use(express.static('dist'));
app.use('/api', proxy(config[process.env.NODE_ENV].apiServer.URL));

app.get('*', (req, res) => {
  res.status(200).sendFile('index.html', { root: __dirname + '/dist'});
});

app.listen(config[process.env.NODE_ENV].Port, () => console.log(`
Server ${process.env.NODE_ENV} on port ${config[process.env.NODE_ENV].Port}
Proxy to ${config[process.env.NODE_ENV].apiServer.URL}
`));
