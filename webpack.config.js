const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, 'src')
};

const sharedPlugins = [
  new CleanWebpackPlugin(),
  new CopyWebpackPlugin([
    { context: './src/assets/images/', from: '**/*.{png,svg,jpg}', to: './assets/images' },
    {
      context: './public/',
      from: '**/*.{png,json}',
      to: './assets'
    }
  ]),
  new MiniCssExtractPlugin({
    filename: 'bundle.min.css',
    publicPath: './'
  }),
  new htmlWebpackPlugin({
    template: './public/index.html',
    filename: 'index.html'
  }),
  new PurgecssPlugin({
    paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true })
  }),
  new webpack.DefinePlugin({
    'process.env.PUBLIC_URL': JSON.stringify(
      process.env.PUBLIC_URL || 'https://kevinsnijders.github.io'
    )
  })
];

const prodPlugins = [
  new webpack.optimize.ModuleConcatenationPlugin(),
  new webpack.HashedModuleIdsPlugin({
    hashFunction: 'sha256',
    hashDigest: 'hex',
    hashDigestLength: 4
  }),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new WorkboxPlugin.GenerateSW({
    // Define runtime caching rules.
    runtimeCaching: [
      {
        // Match any request that ends with .png, .jpg, .jpeg or .svg.
        urlPattern: /\.(?:png|jpg|jpeg|svg)$/,

        // Apply a cache-first strategy.
        handler: 'CacheFirst',

        options: {
          // Use a custom cache name.
          cacheName: 'images',

          // Only cache 10 images.
          expiration: {
            maxEntries: 20
          }
        }
      }
    ]
  })
];

const fallbackLibs = ['whatwg-fetch', 'core-js/stable/'];
module.exports = ({ mode } = { mode: 'production' }) => {
  console.log(`mode is: ${mode}`);

  return {
    mode,
    entry: [...fallbackLibs, './src/scripts/index.js', './src/styles/main.scss'],
    devServer: {
      publicPath: 'http://0.0.0.0:9000/dist/',
      compress: true,
      port: 9000,
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
            namedModules: false,
            namedChunks: false,
            flagIncludedChunks: true,
            occurrenceOrder: true,
            sideEffects: true,
            usedExports: true,
            concatenateModules: true,
            splitChunks: {
              cacheGroups: {
                styles: {
                  name: 'styles',
                  test: /\.css$/,
                  chunks: 'all',
                  enforce: true
                }
              },
              minSize: 30000,
              maxAsyncRequests: 5
            },
            noEmitOnErrors: true,
            minimize: true,
            minimizer: [
              new UglifyJsPlugin({
                cache: true,
                parallel: true,
                uglifyOptions: {
                  compress: true,
                  ecma: 5,
                  mangle: true
                }
              })
            ],
            removeAvailableModules: true,
            removeEmptyChunks: true,
            mergeDuplicateChunks: true
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
                  // Don't handle image urls
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
          test: /\.(woff|woff2)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: '/assets/fonts/'
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
        ? sharedPlugins.concat([...prodPlugins])
        : sharedPlugins.concat([new webpack.HotModuleReplacementPlugin()])
  };
};
