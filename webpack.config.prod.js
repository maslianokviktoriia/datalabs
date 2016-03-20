/* eslint vars-on-top: 0, no-var: 0, object-shorthand: 0 */
var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: {
    main: ['./src/js/index'],
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),

    new ExtractTextPlugin('[name].css', { allChunks: true }),

    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
    publicPath: '/build/',
  },
  module: {
    loaders: [
      { test: /\.js?$/, include: path.join(__dirname, 'src'), loaders: ['babel'] },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!postcss!sass') },
    ],
  },
  postcss: function postCssFunc() {
    return [autoprefixer({ browsers: ['last 2 versions'] })];
  },
  sassLoader: {
    includePaths: [
      path.resolve(__dirname, './node_modules/bootstrap-sass/assets/stylesheets/bootstrap'),
      path.resolve(__dirname, './src/sass'),
    ],
  },
};
