const path = require('path');
const common = require('./webpack.common');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractplugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TeserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name].[contentHash].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin(),
      new TeserPlugin(),
      new HtmlWebpackPlugin({
        template: './index.html',
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true
        }
      })
    ]
  },
  plugins: [
    new MiniCssExtractplugin({filename: '[name].[contentHash].css'}),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractplugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
});