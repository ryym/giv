/* Webpack configuration for Electron renderer process */

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const conf = require('./conf');

module.exports = {
  target: 'electron-renderer',

  externals: conf.externalModules,

  resolve: {
    extensions: ['.js', '.react.js'],
  },

  entry: path.join(conf.rootPath, 'renderer'),

  output: {
    path: conf.distPath,
    filename: 'renderer.js',
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

      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader' },
            { loader: 'postcss-loader' },
          ],
        }),
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin('styles.css'),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(conf.env),
    }),
  ],

  devtool: conf.env === 'development' ? 'inline-source-map' : false,
};

