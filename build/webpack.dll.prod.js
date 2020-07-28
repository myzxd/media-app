/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const vendors = require('./dll.config.js');

const dllPath = path.resolve(__dirname, '../dll/prod');
const library = '[name]_library';
const dllPlugin = new webpack.DllPlugin({
  path: path.resolve(dllPath, '[name]-manifest.json'),
  name: library,
});
const cleanWebpackPlugin = new CleanWebpackPlugin();

module.exports = {
  mode: 'production',

  entry: { vendors },

  output: {
    filename: '[name].dll.[hash:5].js',
    path: dllPath,
    library,
  },

  plugins: [
    cleanWebpackPlugin,
    dllPlugin,
  ],

};
