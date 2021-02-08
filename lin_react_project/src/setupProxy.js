const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/test-api',
        createProxyMiddleware({
            target: 'https://api.countrystatecity.in/v1',
            changeOrigin: true,
        })
    );
};