const path = require('path');
const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const packageJson = require('./package.json');

const ENV = process.env.NODE_ENV || 'development';
const DIST_PATH = path.join(__dirname, 'dist');

module.exports = {
  target: 'electron-renderer',

  externals: Object.keys(packageJson.dependencies),

  resolve: {
    extensions: ['.js', '.react.js'],
  },

  entry: path.join(__dirname, 'renderer'),

  output: {
    path: DIST_PATH,
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
    new CleanPlugin([DIST_PATH]),

    new ExtractTextPlugin('styles.css'),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(ENV),
    }),
  ],

  devtool: ENV === 'development' ? 'inline-source-map' : false,

  devServer: {
    contentBase: DIST_PATH,
    port: 3000,
  },
};
