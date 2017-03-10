var path = require('path');

module.exports = {
  entry: "./app.js",
  output: {
    path: path.resolve(__dirname),
    filename: "app.bundle.js"
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: "babel-loader",
        options: {
          presets: ["es2015"]
        },
      }
    ]
  },
  target: "async-node"
}
