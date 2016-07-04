// const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: "./src/Components/index",

  // This will not actually create a bundle.js file in ./client. It is used
  // by the dev server for dynamic hot loading.
  output: {
    path: __dirname + "/build/",
    filename: "build.js"
  },
  // entry:'./src/main.jsx',
  // output: {
  //   path: './client',
  //   filename: 'bundle.js'
  // },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel-loader?presets[]=react,presets[]=es2015'],
      exclude: /node_modules/
    },
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('css!sass')
    }]
  },
  plugins: [
    new ExtractTextPlugin('build.css', { allChunks: true })
  ],
  // plugins: [
  //   new webpack.HotModuleReplacementPlugin(),
  //   // new ExtractTextPlugin('style.css', { allChunks: true })
  //   new webpack.NoErrorsPlugin()
  // ],
}