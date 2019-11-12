'use strict'

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const deployLocation = 'examples'

module.exports = {
  mode: 'development',
  entry: {
    index: './examples/src/Loading.jsx'
  },
  output: {
    filename: 'build/[name].js',
    path: path.join(__dirname, deployLocation),
    publicPath: `/${deployLocation}`
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/react'
              ]
            }
          }
        ]
      },
      {
        test: /\.css/,
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
              },
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer')({
                  grid: true
                }),
                require('precss')
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './examples/src/index.html',
      inject: 'body',
      filename: 'build/index.html'
    })
  ]
}
