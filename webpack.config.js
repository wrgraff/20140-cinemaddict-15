const path = require('path');

module.exports = {
  entry: './src/main.js',
  outpt: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  devtool: 'source-map'
};
