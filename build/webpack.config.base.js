const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const CopyPlugin = require('copy-webpack-plugin');
const vueLoaderOptions = require('./vue-loader.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDev = process.env.NODE_ENV === "development";

const config = {
  entry: path.join(__dirname, '../client/client-entry.js'),
  output:{
    filename:'js/bundle.js',
    path:path.join(__dirname,'../dist'),
    publicPath: "http://127.0.0.1:8000/"
  },
  module:{
    rules:[
      {
        test:/\.(vue|js)$/,
        loader:'eslint-loader',
        exclude:/node_modules/,
        enforce: "pre"
      },
      {
        test:/\.vue$/,
        use:[
          {
            loader:'vue-loader',
            options:vueLoaderOptions(isDev)
          }
        ]
      },
      {
        test:/\.js$/,
        loader:'babel-loader',
        exclude:/node_modules/
      },
      {
        test:/\.(jpg|jpeg|png|gif|svg)/,
        use:[
          {
            loader:'url-loader',
            options:{
              limit:5000,
              name:'images/[name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new CopyPlugin([{
      from:path.join(__dirname,'../client/assets/images/favicon.ico'),
      to:path.join(__dirname,'../dist/public/favicon.ico')
    }]),
    new HtmlWebpackPlugin({
      template:path.join(__dirname,'../client/index.html'),
      filename:"index.html"
    })
  ],
  resolve:{
    extensions: ['.js','.vue','.json'],
    alias:{
      // vue$:'vue/dist/vue.js'
      // vue$:path.join(__dirname,'../node_modules/vue/dist/vue.esm.js')
    }
  },
}

module.exports = config;