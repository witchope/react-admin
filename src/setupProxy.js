const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/msharp-admin',
        proxy({
            target: "http://192.168.2.200:8081",
            changeOrigin: true,
            secure: false
        })
    );
    app.use(
        '/pearl-server',
        proxy({
            target: "http://192.168.2.200:8080",
            changeOrigin: true,
            secure: false
        })
    );
};