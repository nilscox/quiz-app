/* eslint-disable */

const path = require('path');
const { HotModuleReplacementPlugin } = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { NODE_ENV = 'development', HOST = '0.0.0.0', PORT = '8000' } = process.env;
const dev = NODE_ENV === 'development';

module.exports = {
  mode: dev ? 'development' : 'production',
  devtool: 'source-map',

  entry: './src/index.tsx',

  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },

  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },

  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'tsx',
          target: 'es6',
        },
      },
    ],
  },

  plugins: [
    dev && new HotModuleReplacementPlugin(),
    dev && new ReactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin(),
  ].filter(Boolean),

  devServer: {
    host: HOST,
    port: Number(PORT),
    hot: true,
  },
};
