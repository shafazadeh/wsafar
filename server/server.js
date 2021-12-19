const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
// const proxy = require('express-http-proxy');

const app = express();

app.use(cors())

app.use('/', createProxyMiddleware({
    target: 'http://front-api-test.wsafar.com/',
    logLevel: 'debug',
    changeOrigin: true 
}));

// app.use('/', proxy('http://front-api-test.wsafar.com'));

app.listen(5000);




