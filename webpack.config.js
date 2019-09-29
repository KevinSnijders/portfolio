const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const webpack = require('webpack');

const PATHS = {
  src: path.join(__dirname, 'src')
};

const sharedPlugins = [
  new MiniCssExtractPlugin({
    filename: 'bundle.min.css',
    publicPath: './'
  }),
  new htmlWebpackPlugin({
    template: './src/templates/index.html',
    filename: 'index.html'
  }),
  new PurgecssPlugin({
    paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true })
  })
];
module.exports = ({ mode } = { mode: 'production' }) => {
  console.log(`mode is: ${mode}`);

  return {
    mode,
    entry: ['./src/scripts/index.js', './src/styles/main.scss'],
    devServer: {
      publicPath: 'http://0.0.0.0:8080/dist/',
      hot: true,
      inline: true,
      index: 'index.html',
      open: true
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.min.js',
      publicPath: './'
    },
    optimization:
      mode === 'production'
        ? {
            minimizer: [
              new UglifyJsPlugin({
                cache: true,
                parallel: true
              })
            ],
            usedExports: true,
            splitChunks: {
              cacheGroups: {
                styles: {
                  name: 'styles',
                  test: /\.css$/,
                  chunks: 'all',
                  enforce: true
                }
              }
            }
          }
        : {},
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.(sa|sc|c)ss$/,
          exclude: /(node_modules)/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            {
              loader: 'css-loader',
              options: {
                url: url => {
                  // Don't handle image urls, because gulp handles all the static images
                  let images = 'assets/images';
                  if (url.includes(images)) {
                    return false;
                  }
                  return true;
                }
              }
            },
            {
              loader: 'postcss-loader'
            },
            {
              loader: 'sass-loader',
              options: {
                implementation: require('sass')
              }
            }
          ]
        },
        {
          test: /\.(woff|woff2|ttf|otf|eot|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: '/assets/fonts'
              }
            }
          ]
        },
        {
          test: /\.(jpg|png)$/,
          use: {
            loader: 'url-loader'
          }
        }
      ]
    },
    plugins:
      mode === 'production'
        ? sharedPlugins
        : sharedPlugins.concat([new webpack.HotModuleReplacementPlugin()])
  };
};
