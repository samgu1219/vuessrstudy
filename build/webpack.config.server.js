const baseConfig = require('./webpack.config.base');
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const VueServerPlugin = require('vue-server-renderer/server-plugin');

let config;
config = merge(baseConfig,{
  target:'node',
  entry:path.join(__dirname,'../client/server-entry.js'),
  devtool: "#source-map",
  output:{
    libraryTarget:'commonjs2',
    // filename:'server-entry.js',
    path:path.join(__dirname, '../server-build')
  },
  // 指出不需要打包的文件
  externals:Object.keys(require('../package').dependencies),
  module:{
    rules:[{
      test:/\.css$/,
      use:ExtractTextPlugin.extract({
        use:[
          'css-loader',
          {
            loader:'postcss-loader',
            options:{
              sourceMap:true
            }
          }
        ]
      })
    },
      {
        test:/\.styl/,
        use: ExtractTextPlugin.extract({
          use:[
            'css-loader',
            {
              loader:'postcss-loader',
              options:{
                sourceMap:true
              }
            },
            'stylus-loader'
          ]
        })
      }]
  },
  plugins:[
    new ExtractTextPlugin('[name][contentHash:8].css'),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV":JSON.stringify(process.env.NODE_ENV) || 'development',
      "process.env.VUE_ENV":'server'
    }),
    new VueServerPlugin()
  ]
});

module.exports = config;