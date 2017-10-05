/* Webpack configuration for Electron main process */

const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const conf = require('./conf');

module.exports = {
  target: 'electron-main',

  externals: conf.externalModules,

  entry: path.join(conf.rootPath, 'main'),

  output: {
    path: conf.distPath,
    filename: 'main.js',
    libraryTarget: 'commonjs2',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' },
        ],
      },
    ],
  },

  plugins: [
    new CopyPlugin([
      {
        from: path.join(conf.rootPath, 'package.json'),
        to: conf.distPath,
      },
      {
        from: path.join(conf.rootPath, 'index.html'),
        to: conf.distPath,
      },
    ]),
  ],

  // https://github.com/electron/electron/issues/5107
  node: {
    __dirname: false,
    __filename: false,
  },
};

