const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');


module.exports = {
    entry:{
        'index':'./src/js/index.js', 
        'common':'./src/js/common.js', 
        'product':'./src/js/product.js', 
        'proshow':'./src/js/proshow.js', 
        'join':'./src/js/join.js'
    },
    output:{               
        path: __dirname,
        filename:'dist/[name].[hash:8].js'
    }, 
    //配置webpack插件
    plugins: [
        new MiniCssExtractPlugin({
            filename: './src/css/[name].css',
            chunkFilename: '[id].css',
        }),
        new HtmlWebpackPlugin({
            //模板文件
            template: './src/page/index.html',
            //输出文件名字
            filename: './src/page/index.html',
            hash: true,
            chunks: ['common','index']
        }),
        new HtmlWebpackPlugin({
            template: './src/page/product.html',
            filename: './src/page/product.html',
            hash: true,
            chunks: ['common','product']
        }),
        new HtmlWebpackPlugin({
            template: './src/page/proShow.html',
            filename: './src/page/proShow.html',
            hash: true,
            chunks: ['common','proshow']
        }),
        new HtmlWebpackPlugin({
            template: './src/page/story.html',
            filename: './src/page/story.html',
            hash: true,
            chunks: ['common']
        }),
        new HtmlWebpackPlugin({
            template: './src/page/life.html',
            filename: './src/page/life.html',
            hash: true,
            chunks: ['common']
        }),
        new HtmlWebpackPlugin({
            template: './src/page/contact.html',
            filename: './src/page/contact.html',
            hash: true,
            chunks: ['common']
        }),
        new HtmlWebpackPlugin({
            template: './src/page/join.html',
            filename: './src/page/join.html',
            hash: true,
            chunks: ['common',"join"]
        }),
        new HtmlWebpackPlugin({
            template: './src/page/worth.html',
            filename: './src/page/worth.html',
            hash: true,
            chunks: ['common']
        }),
        new HtmlWebpackPlugin({
            template: './src/page/develop.html',
            filename: './src/page/develop.html',
            hash: true,
            chunks: ['common']
        }),
        new HtmlWebpackPlugin({
            template: './src/page/find.html',
            filename: './src/page/find.html',
            hash: true,
            chunks: ['common']
        }),
        new HtmlWebpackPlugin({
            template: './src/page/technology.html',
            filename: './src/page/technology.html',
            hash: true,
            chunks: ['common']
        }),
        new HtmlWebpackPlugin({
            template: './src/page/formula.html',
            filename: './src/page/formula.html',
            hash: true,
            chunks: ['common']
        }),
        new HtmlWebpackPlugin({
            template: './src/page/quality.html',
            filename: './src/page/quality.html',
            hash: true,
            chunks: ['common']
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            jquery: "jquery",
            "window.jQuery": "jquery"
        })
    ],
    //模块配置
    module: {
        //配置文件编译的规则
        rules: [
            //编译es6的配置
            {
                test:/\.js$/,
                exclude:/node_modules/,
                loader:'babel-loader'
            },
            //编译css的配置
            {
                test: /\.css$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        },
                    },
                    'css-loader',
                    'postcss-loader'
                ]
            },
            //编译url的配置
            {
                test: /\.(png|gif|jpeg|jpg|ttf)$/,
                loader: 'url-loader'
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg|otf)$/,
                loader: 'url-loader'
            }
        ]
    },
    mode:'development', // 可以更改模式

    devServer: { 
        host: '192.168.1.144', 
        port: 9090,
//         proxy: { 
//             '/v2/*': { 
//                 changeOrigin: true, 
//                 target: 'https://api.douban.com/', 
//             }
//         }
    }
        
}
