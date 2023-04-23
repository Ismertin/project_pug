const HtmlWebpackPlugin  = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const pug = require('pug');
const path = require('path');
let mode = 'development'
if(process.env.NODE_ENV === 'production') {
    mode = 'production'
}
console.log(mode + ' mode')

module.exports = {
    mode : mode,
    entry:path.join(__dirname, 'src', 'index.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "[name].[contenthash].js",
        assetModuleFilename: path.join('images', '[name].[contenthash][ext]'),
        clean: true,
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.pug'),
            filename: "index.html",
        }),],
    devServer: {
        watchFiles: path.join(__dirname, 'src'),
        port: 8080,
    },
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
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: "asset/resource",

            },
            {
                test: /\.svg$/,
                type: "asset/resource",
                generator: {
                    filename: path.join('icons', '[name].[contenthash][ext]'),
                },
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
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
                        ],
                    }
                }
            }
        ]
    },
}