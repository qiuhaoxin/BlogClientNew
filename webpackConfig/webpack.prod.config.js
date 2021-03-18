const {merge}=require('webpack-merge');
const baseWebpackCfg=require('./webpack.base.config');
process.env.NODE_ENV="production";
module.exports=merge({
    mode:'production',
},baseWebpackCfg);