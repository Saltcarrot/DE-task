const { resolve } = require("path")
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
          ? '[name].[fullhash].js'
          : '[name].js',
      clean: true,
      assetModuleFilename:
        isProd
          ? '[name].[fullhash][ext]'
          : '[name][ext]',
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
          test: /\.(sass)$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [
                    [
                      "postcss-preset-env",
                      {
                        browsers: "last 3 versions",
                        autoprefixer: { grid: true },
                      },
                    ],
                  ],
                },
              },
            },
            'sass-loader',
          ],
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg|webp|svg)$/i,
          type: 'asset/resource',
          generator: {
            filename:
              isProd
                ? 'assets/images/[name].[fullhash][ext]'
                : 'assets/images/[name][ext]'
          }
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf|)$/,
          type: 'asset/resource',
          generator: {
            filename:
              isProd
                ? 'assets/fonts/[name].[fullhash][ext]'
                : 'assets/fonts/[name][ext]'
          }
        },
      ]
    }
  }
}
