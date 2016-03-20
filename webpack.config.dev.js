/* eslint vars-on-top: 0, no-var: 0, object-shorthand: 0 */
var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    main: [
      'webpack-hot-middleware/client',
      './src/js/index',
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
    publicPath: '/build/',
  },
  module: {
    loaders: [
      { test: /\.js?$/, include: path.join(__dirname, 'src'), loaders: ['babel'] },
      { test: /\.scss$/, loader: 'style!css?&sourceMap!postcss!sass?sourceMap' },
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
