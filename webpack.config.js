const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: {
    api: './src/index.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js',
  },
  devtool: 'hidden-source-map',
  target: 'node',
  externals: [
    nodeExternals(),
  ],
  module: {
    rules: [
      {
        // Transpiles ES6-8 into ES5
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [],
};
