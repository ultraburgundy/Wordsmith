const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "index[contenthash].js",
        clean: true,
        path: path.resolve(__dirname, "docs"),
        clean: true,
        assetModuleFilename: "[name][ext]",
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [ "style-loader", "css-loader", "postcss-loader",],
            },
            {
                test: /\.(png|gif|svg|jpg)$/i,
                type: "asset/resource"
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
           
              },
        ],
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: "Wordsmith",
            filename: "index.html",
            template: "./src/index.html",
        })
    ]
}