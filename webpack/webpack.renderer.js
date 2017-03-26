/* Webpack configuration for Electron renderer process */

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const conf = require('./conf');

module.exports = {
  target: 'electron-renderer',

  externals: conf.externalModules,

  resolve: {
    extensions: ['.js', '.react.js'],
  },

  entry: {
    renderer: conf.rendererPath,
  },

  output: {
    path: conf.distPath,
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: conf.rendererPath,
        use: [
          { loader: 'babel-loader' },
        ],
      },

      {
        test: /\.s?css$/,
        include: conf.rendererPath,
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
    new ExtractTextPlugin('[name].css'),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(conf.env),
    }),
  ],

  devtool: conf.env === 'development' ? 'inline-source-map' : false,
};

