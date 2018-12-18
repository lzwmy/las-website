const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let pathsToClean = [
    'dist',
]

module.exports = {
    // 入口
    entry:{
        'index':'./src/js/index.js', 
        'common':'./src/js/common.js', 
        'product':'./src/js/product.js', 
        'proshow':'./src/js/proshow.js', 
        'join':'./src/js/join.js'
    },
    //输出文件配置
    output:{                
        path: path.resolve(__dirname+'/dist'),
        filename:'src/js/[name].[hash:8].js',
        publicPath: '../../'
    },
    //配置webpack插件
    plugins: [
        new CleanWebpackPlugin(pathsToClean),
        new MiniCssExtractPlugin({
            filename: './src/css/[name].css',
            chunkFilename: '[id].css',
        }),
        new HtmlWebpackPlugin({
            template: './src/page/index.html',
            filename: './src/page/index.html',
            minify: {
                collapseWhitespace: true,  //删除空白符与换行符
                removeComments:true,       //移除HTML中的注释
                minifyCSS:true, //压缩css
                minifyJS:true, //压缩js
                minifyURLs:true 
            },
            hash: true,
            chunks: ['common','index']
        }),
        new HtmlWebpackPlugin({
            template: './src/page/common/nav.html',
            filename: './src/page/common/nav.html',
            minify: {
                collapseWhitespace: true,  
                removeComments:true,       
                minifyCSS:true, 
                minifyJS:true, 
                minifyURLs:true 
            },
            hash: true,
        }),
        new HtmlWebpackPlugin({
            template: './src/page/common/about_nav.html',
            filename: './src/page/common/about_nav.html',
            minify: {
                collapseWhitespace: true,  
                removeComments:true,       
                minifyCSS:true, 
                minifyJS:true, 
                minifyURLs:true 
            },
            hash: true,
        }),
        new HtmlWebpackPlugin({
            template: './src/page/common/quality_nav.html',
            filename: './src/page/common/quality_nav.html',
            minify: {
                collapseWhitespace: true,  
                removeComments:true,       
                minifyCSS:true, 
                minifyJS:true, 
                minifyURLs:true 
            },
            hash: true,
        }),
        new HtmlWebpackPlugin({
            template: './src/page/common/footer.html',
            filename: './src/page/common/footer.html',
            minify: {
                collapseWhitespace: true,  
                removeComments:true,       
                minifyCSS:true, 
                minifyJS:true, 
                minifyURLs:true 
            },
            hash: true,
        }),
        new HtmlWebpackPlugin({
            template: './src/page/product.html',
            filename: './src/page/product.html',
            chunks: ['common','product'],
            minify: {
                collapseWhitespace: true,  
                removeComments:true,       
                minifyCSS:true, 
                minifyJS:true, 
                minifyURLs:true 
            },
            hash: true,
        }),
        new HtmlWebpackPlugin({
            template: './src/page/proShow.html',
            filename: './src/page/proShow.html',
            chunks: ['common','proshow'],
            minify: {
                collapseWhitespace: true,  
                removeComments:true,       
                minifyCSS:true, 
                minifyJS:true, 
                minifyURLs:true 
            },
            hash: true
        }),
        new HtmlWebpackPlugin({
            template: './src/page/story.html',
            filename: './src/page/story.html',
            chunks: ['common'],
            minify: {
                collapseWhitespace: true,  
                removeComments:true,       
                minifyCSS:true, 
                minifyJS:true, 
                minifyURLs:true 
            },
            hash: true
        }),
        new HtmlWebpackPlugin({
            template: './src/page/life.html',
            filename: './src/page/life.html',
            chunks: ['common'],
            minify: {
                collapseWhitespace: true,  
                removeComments:true,       
                minifyCSS:true, 
                minifyJS:true, 
                minifyURLs:true 
            },
            hash: true
        }),
        new HtmlWebpackPlugin({
            template: './src/page/worth.html',
            filename: './src/page/worth.html',
            chunks: ['common'],
            minify: {
                collapseWhitespace: true,  
                removeComments:true,       
                minifyCSS:true, 
                minifyJS:true, 
                minifyURLs:true 
            },
            hash: true
        }),
        new HtmlWebpackPlugin({
            template: './src/page/find.html',
            filename: './src/page/find.html',
            chunks: ['common'],
            minify: {
                collapseWhitespace: true,  
                removeComments:true,       
                minifyCSS:true, 
                minifyJS:true, 
                minifyURLs:true 
            },
            hash: true
        }),
        new HtmlWebpackPlugin({
            template: './src/page/technology.html',
            filename: './src/page/technology.html',
            chunks: ['common'],
            minify: {
                collapseWhitespace: true,  
                removeComments:true,       
                minifyCSS:true, 
                minifyJS:true, 
                minifyURLs:true 
            },
            hash: true
        }),
        new HtmlWebpackPlugin({
            template: './src/page/formula.html',
            filename: './src/page/formula.html',
            chunks: ['common'],
            minify: {
                collapseWhitespace: true,  
                removeComments:true,       
                minifyCSS:true, 
                minifyJS:true, 
                minifyURLs:true 
            },
            hash: true
        }),
        new HtmlWebpackPlugin({
            template: './src/page/quality.html',
            filename: './src/page/quality.html',
            chunks: ['common'],
            minify: {
                collapseWhitespace: true,  
                removeComments:true,       
                minifyCSS:true, 
                minifyJS:true, 
                minifyURLs:true 
            },
            hash: true
        }),
        new HtmlWebpackPlugin({
            template: './src/page/develop.html',
            filename: './src/page/develop.html',
            chunks: ['common'],
            minify: {
                collapseWhitespace: true,  
                removeComments:true,       
                minifyCSS:true, 
                minifyJS:true, 
                minifyURLs:true 
            },
            hash: true
        }),
        new HtmlWebpackPlugin({
            template: './src/page/contact.html',
            filename: './src/page/contact.html',
            chunks: ['common'],
            minify: {
                collapseWhitespace: true,  
                removeComments:true,       
                minifyCSS:true, 
                minifyJS:true, 
                minifyURLs:true 
            },
            hash: true
        }),
        new HtmlWebpackPlugin({
            template: './src/page/join.html',
            filename: './src/page/join.html',
            chunks: ['common',"join"],
            minify: {
                collapseWhitespace: true,  
                removeComments:true,       
                minifyCSS:true, 
                minifyJS:true, 
                minifyURLs:true 
            },
            hash: true
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
                            publicPath: './'
                        },
                    },
                    'css-loader',
                    'postcss-loader'
                ]
            },
            //编译url的配置
            {
                test: /\.(png|gif|jpeg|jpg|ttf)$/,
                loader: 'url-loader',
                options: {
                    limit:10000,
                    name:'src/images/[name].[ext]',
                    publicPath: '../../'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|svg|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                  limit: 10000,
                  name: 'src/fonts/[name].[hash:8].[ext]'
                }
            }
        ]
    },
    mode:'production', // 可以更改模式
}