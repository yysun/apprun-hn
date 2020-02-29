module.exports = {
  globDirectory: "./",
  globPatterns: [
    "manifest.json",
    "index.html",
    "dist/app.js"
  ],
  globIgnores: [
    "node_modules/**",
    "webpack.config.js",
    "workbox-config.js"
  ],
  swDest: "./sw.js",
  clientsClaim: true,
  skipWaiting: true,
  sourcemap: false,
  runtimeCaching: [
    {
      urlPattern: new RegExp("https://www.gstatic.comy"),
      handler: "StaleWhileRevalidate"
    },
    {
      urlPattern: new RegExp("https://hacker-news.firebaseio.com"),
      handler: "StaleWhileRevalidate"
    },
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
      handler: 'CacheFirst'
    }
  ]
};
