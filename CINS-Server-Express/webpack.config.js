var path = require('path');

module.exports = {
  entry: "./App/app.js",
  output: {
    path: path.resolve(__dirname),
    filename: "App/app.bundle.js"
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: "babel-loader",
        options: {
          presets: ["latest"]
        },
      }
    ]
  },
  target: "async-node"
}
