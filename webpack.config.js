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
    resolve: {
        extensions: [ ".ts", ".js", ".tsx"],
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
                exclude: /node_modules/,
           
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