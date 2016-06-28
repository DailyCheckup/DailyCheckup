var webpackStripLoader = require('strip-loader');
var devConfig = require('./webpack.config.js');

// Strip loader strips arbitrary functions out of our production code
// In this case we're stripping out console.log
var stripLoader = {
  test: [/\.js$/, /\.jsx$/],
  exclude: /node_modules/,
  loader: webpackStripLoader.loader('console.log'),
};

devConfig.module.loaders.push(stripLoader);

module.exports = devConfig;