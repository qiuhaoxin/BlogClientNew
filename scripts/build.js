const webpack=require('webpack');
const prodWebpackCfg=require('../webpackConfig/webpack.prod.config');
const compiler=webpack(prodWebpackCfg,(err,stats)=>{
    if(err || stats.hasErrors()){
        console.log("err!!!",err);
    }
});
