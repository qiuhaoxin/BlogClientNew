const {merge}=require('webpack-merge');
const baseWebpackCfg=require('./webpack.base.config');
process.env.NODE_ENV="production";
module.exports=merge({
    mode:'production',
    optimization:{
        splitChunks:{
            chunks:'all',
            minChunks:2,
            cacheGroups:{
                common:{
                    name:'common',
                    minSize:1,
                    priority:1
                },
                vendor:{
                    name:'vendor',
                    test:/[\\/]node_modules[\\/]/,
                    priority:10
                }
            }
        }
    }
},baseWebpackCfg);