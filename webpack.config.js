
module.exports = {

  // Entry - Name of top-level file(s) we want to include in our build
  entry: './src/app.js',
  // Output - Object containing output configuration
  output: {
    filename: './build/build.js',
  },
  // Webpack will watch the files and rebuild when one changes
  watch: true,
  // Loaders are like 'tasks' in gulp
  module: {
    preLoaders: [
    // ESLint preprocessor, runs before the loaders do
      {
        test: [/\.js$/, /\.jsx$/],
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
    ],
    loaders: [
      // Babel transpiler
      {
        test: [/\.js$/, /\.jsx$/],
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          presets: ['react', 'es2015'],
        },
      },
      {
      // SASS compiler
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  eslint: {
    failOnWarning: false,
    failOnError: true,
  },
  // File types wwe can process without specifically giving the file extension in require statements
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};
