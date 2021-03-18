const {merge}=require('webpack-merge');
const baseConfig=require('./webpack.base.config');
const webpack=require('webpack');
process.env.NODE_ENV="development";
module.exports=merge({
    mode:'development',
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
    ]
},baseConfig);