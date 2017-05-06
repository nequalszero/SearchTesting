const path = require('path');

module.exports = {
  context: __dirname,
  entry: './frontend/util.js',
  output: {
    path: path.resolve(__dirname, 'frontend'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '*']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-1']
        }
      }
    ]
  },
  devtool: 'source-maps'
};
