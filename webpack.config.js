'use strict';

const path = require('path');

const publicDirectory = path.resolve(__dirname, 'public');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: publicDirectory
  },
  devtool: 'source-map',
  devServer: {
    contentBase: publicDirectory,
    watchContentBase: true
  }
};
