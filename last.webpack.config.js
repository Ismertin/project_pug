const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const pug = require('pug');

let mode = 'development'
if(process.env.NODE_ENV === 'production') {
    mode = 'production'
}
console.log(mode + ' mode')

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode : mode,
    entry: {
        main: './src/index.js',
    },
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: "assets/[hash][ext][query]",
        clean: true,
    },
    devServer: {
        hot: true,
    },
    plugins: [
        // new CopyPlugin({
        //    patterns:[
        //        {
        //            from: path.resolve(__dirname, 'src/images')
        //            to: path.resolve(__dirname, 'src/assets')
        //        }
        //    ]
        // }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
        new HtmlWebpackPlugin({
        template: "./src/index.pug",
    }),
    ],
    module: {
        rules: [
            {
            test: /\.(sa|sc|c)ss$/i,
                use: [
                    (mode === 'development') ? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.(png|svg|jpe?g|gif|webp|ico)$/i,
                type: mode === 'production' ? 'asset' : 'asset/resource',
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                // use:{
                //     loader: "file-loader",
                //     options: {
                //         publicPath: '../',
                //         name
                //     }
                // }
            },
            {
                test: /\.pug$/,
                loader: "pug-loader",
                exclude: /(node_modules|browser_components)/,
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use:{
                    loader: "babel-loader",
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }]
                        ]
                    }
                }
            }
        ]
    },
}