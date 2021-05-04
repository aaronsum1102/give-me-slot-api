const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './app.ts',
  target: 'node',
  node: {
    __filename: false,
    __dirname: false
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: /node_modules/
      }
    ]
  },
  externalsPresets: { node: true },
  externals: [nodeExternals()],
  resolve: {
    extensions: ['.ts', '.js']
  }
};
