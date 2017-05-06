/* Webpack configuration for Electron renderer process */

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const conf = require('./conf');

module.exports = {
  target: 'electron-renderer',

  externals: conf.externalModules,

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
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
        test: /\.(js|tsx?)$/,
        include: conf.rendererPath,
        use: [
          { loader: 'awesome-typescript-loader' },
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
      '$$API_ROOT': JSON.stringify(conf.apiRoot),
    }),
  ],

  devtool: conf.env === 'development' ? 'inline-source-map' : false,
};

