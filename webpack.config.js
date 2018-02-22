const path = require('path');
const workboxPlugin = require('workbox-webpack-plugin');
const DIST_DIR = 'dist';
module.exports = {
  entry: {
    'app': './src/hacker-news.tsx',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, DIST_DIR),
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
    publicPath: './',
    open: true
  },
  devtool: "source-map",
  externals: {
    "firebase": "firebase"
  },
  plugins: [
    new workboxPlugin({
      globDirectory: "./",
      globPatterns: [
        "**/*.{html,css,js}"
      ],
      globIgnores: [
        "node_modules/**",
        "webpack.config.js",
        "dist/sw.js",
        "dist/workbox-*.js"
      ],
      swDest: './sw.js',
    }),
  ]
}