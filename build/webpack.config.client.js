const baseConfig = require('./webpack.config.base');
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const VueClientPlugin = require('vue-server-renderer/client-plugin');
const cdnConfig = require('../app.config');

const isDev = process.env.NODE_ENV === "development";

const devServer = {
  host:'localhost',
  port:8000,
  open:true,
  hot:true,
  historyApiFallback:{
    'index':'/index.html'
  },
  headers:{'Access-Control-Allow-Origin':'*'},
  proxy: {
    '/api':'http://127.0.0.1:3333/'
  },
  compress:true,
  overlay: {
    errors: true
  }
}

let config;

if(isDev) {
  config = merge(baseConfig,{
    devtool: "#cheap-module-eval-source-map",
    devServer,
    module:{
      rules:[{
        test:/\.css$/,
        use:[
          'vue-style-loader',
          'css-loader',
          {
            loader:'postcss-loader',
            options:{
              sourceMap:true
            }
          }
        ]
      },
        {
          test:/\.styl/,
          use:[
            'vue-style-loader',
            'css-loader',
            {
              loader:'postcss-loader',
              options:{
                sourceMap:true
              }
            },
            'stylus-loader'
          ]
        }]
    },
    plugins:[
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new VueClientPlugin()
    ]
  });
} else {
  config = merge(baseConfig, {
    entry:{
      app:path.join(__dirname,'../client/client-entry.js'),
      vendor:['vue','vuex','vue-router','vue-meta']
    },
    output:{
      filename:'js/[name].[chunkHash:8].js',
      path:path.join(__dirname,'../dist/public'),
      // publicPath:`${cdnConfig.cdn.host}/public/`
    },
    module:{
      rules:[{
        test:/\.css$/,
        use: ExtractTextPlugin.extract({
          fallback:'vue-style-loader',
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
          use:ExtractTextPlugin.extract({
            fallback:'vue-style-loader',
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
      new ExtractTextPlugin('styles/main.[contentHash:8].css'),
      new webpack.optimize.CommonsChunkPlugin({
        name:'vendor',
        minChunks:2
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name:'runtime',
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.optimize.UglifyJsPlugin(),
      new VueClientPlugin({
        filename:'../vue-ssr-client-manifest.json'
      })
    ]
  });
}

module.exports = config;