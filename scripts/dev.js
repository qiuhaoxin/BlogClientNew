const webpack=require('webpack');
const WebpackDevServer=require('webpack-dev-server');
const devWebpackCfg=require('../webpackConfig/webpack.dev.config');

const path=require('path');
const compiler=webpack(devWebpackCfg);
const devServerCfg={
    contentBase:path.resolve(__dirname,'../dist'),
    hot:true,
    open:true,
}

WebpackDevServer.addDevServerEntrypoints(devWebpackCfg,devServerCfg);
const devServerApp=new WebpackDevServer(compiler,devServerCfg);

devServerApp.listen(8099,(err)=>{
   if(err){
       console.error("error!!!");
   }
})
