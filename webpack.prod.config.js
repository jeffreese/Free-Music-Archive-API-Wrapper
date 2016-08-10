const webpack = require('webpack')

// File ops
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// Folder ops
const CleanPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

// PostCSS support
const postcssImport = require('postcss-easy-import')
const precss = require('precss')
const autoprefixer = require('autoprefixer')

// constants
const APP = path.join(__dirname, 'app')
const BUILD = path.join(__dirname, 'build/app')
const STYLE = path.join(__dirname, 'app/style.css')
const PUBLIC = path.join(__dirname, 'app/public')
const TEMPLATE = path.join(__dirname, 'app/index.html')

const PACKAGE = Object.keys(
  require('./package.json').dependencies
)

module.exports = {
  entry: {
    app: APP,
    style: STYLE,
    vendor: PACKAGE
  },
  resolve: {
    extensions: ['', '.js']
  },
  output: {
    path: BUILD,
    filename: '[name].[chunkhash].js',
    chunkFilename: '[chunkhash].js'
  },
  module: {
    loaders: [
      // transpile js
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['transform-decorators-legacy']
        },
        include: APP
      },
      // process css
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss'),
        include: APP
      }
    ]
  },

  // Configure PostCSS plugins
  postcss: function processPostcss (webpack) {
    return [
      postcssImport({
        addDependencyTo: webpack
      }),
      precss, // enable sass-like markup
      autoprefixer({ browsers: ['last 2 versions'] }) // handle browser prefixing
    ]
  },
  plugins: [
    // Required to inject NODE_ENV within React app.
    // Optimizes React for use in production mode
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    // empty the BUILD directory
    new CleanPlugin([BUILD]),

    // auto generate the index.html
    new HtmlWebpackPlugin({
      template: TEMPLATE,
      inject: 'body',
      minify: {
        collapseWhitespace: true
      }
    }),

    // Extract CSS to a separate file
    new ExtractTextPlugin('[name].[chunkhash].css'),

    // create separate CSS bundles
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),

    // minify JS
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),

    // copy public assets (images, etc.)
    new CopyWebpackPlugin(
      [
        { from: PUBLIC, to: BUILD }
      ],
      {
        ignore: ['.DS_Store']
      }
    )
  ]
}
