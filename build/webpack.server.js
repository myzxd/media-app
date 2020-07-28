const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const getIp = require('./lib/getIp');

const theme = require(path.resolve(__dirname, '../src/theme.js'));

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, '../src/index.html'),
  filename: './index.html',
});
const dllReferencePlugin = new webpack.DllReferencePlugin({
  context: __dirname,
  manifest: path.resolve(__dirname, '../dll/dev/vendors-manifest.json'),
});
const addAssetHtmlWebpackPlugin = new AddAssetHtmlWebpackPlugin({
  filepath: path.resolve(__dirname, '../dll/dev/vendors.dll.*.js'),
});
const cssLoader = {
  loader: 'css-loader',
  options: {
    modules: true,
  },
};

module.exports = {
  mode: 'development',

  entry: path.resolve(__dirname, '../src/index.jsx'),

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.[hash:5].js',
  },

  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        use: 'babel-loader?cacheDirectory=true',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', cssLoader],
      },
      {
        test: /\.less$/,
        use: ['style-loader', cssLoader, {
          loader: 'less-loader',
        }],
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', {
          loader: 'less-loader',
          options: {
            modifyVars: theme,
            javascriptEnabled: true,
          },
        }],
        include: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.(md|yml)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },

  plugins: [
    dllReferencePlugin,
    htmlWebpackPlugin,
    addAssetHtmlWebpackPlugin,
  ],

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },

  devtool: 'source-map',

  devServer: {
    port: 8001,
    host: getIp(),
    open: true,
    progress: true,
  },
};
