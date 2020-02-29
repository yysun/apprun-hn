module.exports = {
  entry: {
    'app': './src/hacker-news.tsx',
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
  externals: { firebase: 'firebase' },
  devServer: {
    open: true
  },
  devtool: "source-map"
}