const path = require('path');
const workboxPlugin = require('workbox-webpack-plugin');
const DIST_DIR = 'dist';
module.exports = {
  entry: {
    'docs/dist/app': './src/hacker-news.tsx',
  },
  output: {
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      { test: /.tsx?$/, loader: 'ts-loader' }
    ]
  },
  devServer: {
    open: true
  },
  devtool: "source-map",
  plugins: [
    new workboxPlugin({
      globDirectory: './docs',
      globPatterns: ["**/*.{html,css,js}"],
      globIgnores: [
        "node_modules/**",
        "webpack.config.js",
        "dist/sw.js",
        "dist/workbox-*.js"
      ],
      swDest: './docs/sw.js',
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: new RegExp('/'),
          handler: 'staleWhileRevalidate'
        }
      ]
    }),
  ]
}