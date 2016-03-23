
var config = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname + '/app/js',
    filename: 'main.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/
      }
    ]
  }
}

module.exports = config;
