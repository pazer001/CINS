var path = require('path');

module.exports = {
    entry: './app.js',
    target: 'node',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'backend.js'
    },
    module: {
        loaders: [
            {test: /\.js?$/, exclude: /(node_modules)/, loader: 'babel-loader'},
            {test: /\.json?$/, loader: 'json-loader'},
        ]
    }
}