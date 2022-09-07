const path = require('path');
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
    entry:"./src/index.ts",
    devtool:'inline-source-map',
    devServer:{
        contentBase:'./dist'
    },
    output:{
        path:path.resolve(__dirname,"dist"),
        filename:"bundle.js"
    },
    module:{
        rules:[
            {
            test:/\.ts$/,
            use:'ts-loader',
            exclude:/node-module/
            }
        ]
           
        
    },
    mode:'development',
    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template:"./src/index.html"
        })
    ]
        
    
}