const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
    mode: 'development',
    entry: "./src/index.js",
    output: {
        filename: "index[contenthash].js",
        clean: true,
        path: path.resolve(__dirname, "docs"),
        clean: true,
        assetModuleFilename: "[name][ext]",
    },
    resolve: {
        extensions: [ ".ts", ".js", ".tsx"],
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [ "style-loader", "css-loader",],
                exclude: /node_modules/,
            },
            {
                test: /\.(png|gif|svg|jpg)$/i,
                type: "asset/resource"
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
           
              },
        ],
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: "Wordsmith",
            filename: "index.html",
            template: "./src/index.html",
        }),
        new CopyWebpackPlugin({
            patterns: [
              { from: './src/assets', to: 'assets' },
              { from: './src/styles', to: 'styles' }
            ]
          })
    ]
}