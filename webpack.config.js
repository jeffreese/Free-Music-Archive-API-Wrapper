const webpack = require('webpack')

// File ops
const HtmlWebpackPlugin = require('html-webpack-plugin')

// Folder ops
const path = require('path')

// PostCSS support
const postcssImport = require('postcss-easy-import')
const precss = require('precss')
const autoprefixer = require('autoprefixer')

// constants
const APP = path.join(__dirname, 'app')
const BUILD = path.join(__dirname, 'build')
const STYLE = path.join(__dirname, 'app/style.css')
const TEMPLATE = path.join(__dirname, 'app/index.html')
const HOST = process.env.HOST || 'localhost'
const PORT = process.env.PORT || 8080

module.exports = {
  entry: {
    app: APP,
    style: STYLE
  },
  output: {
    path: BUILD,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js']
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
        loaders: ['style', 'css', 'postcss'],
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
  devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    stats: 'errors-only',
    host: HOST,
    port: PORT,
    outputPath: BUILD
  },
  plugins: [
    // auto generate the index.html
    new HtmlWebpackPlugin({
      template: TEMPLATE,
      inject: 'body'
    }),

    // hot reloading
    new webpack.HotModuleReplacementPlugin()
  ]
}
