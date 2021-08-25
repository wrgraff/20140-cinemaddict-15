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
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@const': path.resolve(__dirname, 'src/const'),
      '@mock': path.resolve(__dirname, 'src/mock'),
      '@view': path.resolve(__dirname, 'src/view'),
      '@presenter': path.resolve(__dirname, 'src/presenter')
    },
  }
};
