var path = require('path');

module.exports = {
  // TODO:
  // after webpack 2,
  // change
  // src: ["./src/index"],
  // to
  // src: "./src/index",
  //https://github.com/webpack/webpack/issues/300
  entry: {
    src: ["./src/index"],
    test: "./test/index"
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
