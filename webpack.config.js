const { resolve } = require("path")
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = () => {
  const isProd = process.env.NODE_ENV === 'production'

  return {
    mode: isProd ? 'production' : 'development',
    entry: pathTo('src/index.js'),
    output: {
      path: pathTo('docs'),
      filename:
        isProd
          ? '[name].[hash].js'
          : '[name].js',
      clean: true,
      assetModuleFilename: assetFilename('', isProd)
    },
    devServer: {
      port: 3000,
      hot: true,
      static: {
        directory:
          isProd
            ? pathTo('docs')
            : pathTo('src')
      },
    },
    devtool: isProd ? false : 'source-map',
    plugins: [
      new HTMLWebpackPlugin({
        template: pathTo('./src/index.html'),
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
          test: /\.html$/i,
          loader: "html-loader",
        },
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
          test: /\.(pcss)$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader'
          ],
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg|webp|svg)$/i,
          type: 'asset/resource',
          generator: {
            filename: assetFilename('assets/images/', isProd)
          }
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf|)$/,
          type: 'asset/resource',
          generator: {
            filename: assetFilename('assets/fonts/', isProd)
          }
        },
      ]
    }
  }
}

const pathTo = (path) => resolve(__dirname, path)

const assetFilename = (folder, isProd) =>
  isProd
    ? `${folder}[name].[hash][ext]`
    : `${folder}[name][ext]`