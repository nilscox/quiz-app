/* eslint-disable */

const path = require('path');
const { EnvironmentPlugin, HotModuleReplacementPlugin, ProvidePlugin } = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { NODE_ENV = 'development', HOST = '0.0.0.0', PORT = '8000' } = process.env;

/** @type {import('webpack').Configuration} */
const config = (module.exports = {
  mode: 'development',
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
    //
    new EnvironmentPlugin(),
    new ProvidePlugin({ React: 'react' }),
    new HtmlWebpackPlugin(),
  ],
});

if (NODE_ENV === 'development') {
  config.plugins.push(new HotModuleReplacementPlugin());
  config.plugins.push(new ReactRefreshWebpackPlugin());

  config.devServer = {
    host: HOST,
    port: Number(PORT),
    hot: true,
  };
}

if (NODE_ENV === 'production') {
  config.mode = 'production';
}
