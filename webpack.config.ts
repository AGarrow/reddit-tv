import { webpack, EnvironmentPlugin } from "webpack";

var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const child_process = require('child_process');

const git = (command) => (
  child_process.execSync(`git ${command}`, { encoding: 'utf8' }).trim()
)

module.exports = env => {
  return {
    entry: [
      './src/index'
    ],
    output: {
      path: path.join(__dirname, 'dist', env.TARGET_ENV || 'dev'),
      publicPath: '/',
      filename: 'bundle.js',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    },

    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          },
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.(ttf)$/,
          use: {
            loader: 'url-loader',
          },
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({ template: './src/index.html' }),
      new EnvironmentPlugin(['TARGET_ENV']),
      new EnvironmentPlugin({'VERSION': git('describe --always')})
    ]
  }
};
