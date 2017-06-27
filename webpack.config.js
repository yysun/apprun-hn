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
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      { test: /.tsx?$/, loader: 'ts-loader' }
    ]
  },
  devServer: {
    publicPath: `/${DIST_DIR}/`
  },
  plugins: [
    new workboxPlugin({
      globDirectory: DIST_DIR,
      // staticFileGlobs: ['**/*.{html,js,css}'],
      swDest: path.join(DIST_DIR, 'sw.js'),
    }),
  ]
}