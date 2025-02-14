const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://www.flickr.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/services/feeds/photos_public.gne?format=json&tags='
      }
    })
  );
};
