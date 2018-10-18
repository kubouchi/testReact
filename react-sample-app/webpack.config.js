const webpack = require('webpack');
const path = require('path');

module.exports = [{
  cache: true,
  devtool: 'source-map',
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true,
    historyApiFallback: true
  },
  context: path.resolve(__dirname, 'src'),
  entry: './Routes.tsx',
  output: {
    filename: './dist/js/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
    ]
  },
  resolve: {
    modules: [
      'node_modules',
      path.join(__dirname, 'src')
    ],
    extensions: ['.ts', '.tsx', '.js']
  }
}];
