const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = {
    entry: './src/main.tsx',
    resolve: {
	extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    module: {

        rules: [
	    {
                // регулярное выражение для поиска js, jsx, ts, tsx
                test: /\.(js|ts)x?$/,
                // используем лоадер babel-loader
                use: ['babel-loader'],
                // исключаем попадание node_modules в лоадер
                // https://webpack.js.org/loaders/babel-loader/#babel-loader-is-slow
                exclude: /node_modules/
            },
            {
                test: /\.css$/i,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                use: [
                    'style-loader',
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: false
                        }
                    },
                    {
                        loader: "css-loader"
                    },
                    'postcss-loader'
                ],
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.svg$/i,
                type: "asset/resource",
            },
        ],
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        })
    ]
};