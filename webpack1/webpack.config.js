const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = {
  mode: 'production',
  entry: {
    index: './src/index.js',
    context: './components/index.js',
  },
  output: {
    filename: '[name][hash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  // devtool:'inline-source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin(),
    new webpack.ProvidePlugin({ _lodash_: 'lodash' }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    moduleIds: 'hashed',
    runtimeChunk: 'single',
  },
  devServer: {
    contentBase: './dist',
    compress: true,
    port: 1234,
    hot: true,
  },
};

module.exports = config;
