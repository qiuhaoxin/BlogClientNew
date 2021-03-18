const path=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const MiniCssExtractPlugin=require('mini-css-extract-plugin');
const {CleanWebpackPlugin}=require('clean-webpack-plugin');
const webpack=require('webpack');
module.exports={
    entry:path.resolve(__dirname,"../src/index.js"),
    output:{
        path:path.resolve(__dirname,'../dist'),
        filename:'[name].[contenthash:8].js',
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                use:'babel-loader',
            },{
                test:/\.css$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    {
                        loader:'css-loader',
                        options:{
                            module:true
                        }
                    }
                ]
            },{
                test:/\.less$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    {
                        loader:'css-loader',
                        options:{
                            modules:true
                        }
                    },{
                        loader:'less-loader',
                    }
                ]
            },{
                test:/\.(png|jpe?g|git)$/,
                type:'asset/resource',
            }
        ]
    },
    resolve:{
        extensions:['.js','.jsx','.less','.css'],
    },
    plugins:[
    //    new webpack.ProgressPlugin((percentage, message, ...args)=>{
    //        console.info(`${percentage}%`);
    //    }),
       new CleanWebpackPlugin(),
       new HtmlWebpackPlugin({
           template:path.resolve(__dirname,'../src/public/index.html'),
           inject:true,
       }),
       new MiniCssExtractPlugin({
           filename:'[name].[contenthash:8].css'
       })
    ],
}