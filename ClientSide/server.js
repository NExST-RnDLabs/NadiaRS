/* eslint no-console: 0 */
 
const path = require('path');
const express = require('express');
const httpProxy = require('http-proxy');
const Agent = require('agentkeepalive')
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');
 
const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();
 
if (isDeveloping) {
    const compiler = webpack(config);
    const middleware = webpackMiddleware(compiler, {
        publicPath: config.output.publicPath,
        contentBase: 'src',
        hot: true,
        stats: {
            colors: true,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            modules: false
        }
    });
 
    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));

    var LOCAL_SERVER_ENDPOINT = '/service/';
    var JAVA_SERVER_ENDPOINT = 'http://localhost:8080/service/';

    var agent = new Agent({
        maxSockets: 100,
        keepAlive :true,
        maxFreeSockets: 10,
        keepAliveMsecs:10000,
        timeout: 60000,
        keepAliveTimeout: 30000 // free socket keepalive for 30 seconds
    })

    var proxyKeepAlive = httpProxy.createProxy({ target: JAVA_SERVER_ENDPOINT, agent: agent});
    proxyKeepAlive.on('proxyRes', function (proxyRes) {
        var key = 'www-authenticate';
        
        proxyRes.headers[key] = proxyRes.headers[key] ? proxyRes.headers[key].split(',') : [];
        
    });

    app.all(LOCAL_SERVER_ENDPOINT+'*', function (req, res) {
        // This hack re-sets the base url in the proxy request
        req.url = req.url.substring(LOCAL_SERVER_ENDPOINT.length);
        proxyKeepAlive.web(req, res);
    });
      
     
    app.use('/', express.static('public/'));
 
} else {
    app.use('/', express.static('public/'));
}
 
app.listen(port, '0.0.0.0', function onStart(err) {
    if (err) {
        console.log(err);
    }
    console.info('==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.', port);
});