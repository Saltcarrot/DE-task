const { resolve } = require("path");
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = () => {
  const isProd = process.env.NODE_ENV === 'production'

  return {
    mode: isProd ? 'production' : 'development',
    entry: resolve(__dirname, 'src/index.js'),
    output: {
      path: resolve(__dirname, 'dist'),
      filename:
        isProd
          ? '[name].[hash].js'
          : '[name].js',
      clean: true
    },
    devServer: {
      port: 3000,
      hot: true,
      static: {
        directory:
          isProd
            ? resolve(__dirname, 'dist')
            : resolve(__dirname, 'src')
      },
    },
    devtool: isProd ? false : 'source-map',
    plugins: [
      new HTMLWebpackPlugin({
        template: resolve(__dirname, './src/index.html'),
        filename: 'index.html',
        minify: isProd,
      }),
      new MiniCssExtractPlugin({
        filename: 'style.css',
      }),
    ],
    optimization: {
      minimizer: [new CssMinimizerWebpackPlugin(), new TerserPlugin()],
      minimize: isProd,
    },
    module: {
      rules: [
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.(sass)$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
          type: 'asset/inline',
        },

      ]
    }
  }
}