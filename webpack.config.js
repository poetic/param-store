// this is only used for testing
var path = require('path');

module.exports = {
  entry:  {
    test: ["./src/index", "./test/index"]
  },
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "[name].bundle.js",
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.join(__dirname, 'src'),
          path.join(__dirname, 'test')
        ],
        loader: 'babel',
        query: {
          presets: ["es2015", "stage-0", "react"]
        }
      }
    ]
  }
};
