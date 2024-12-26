const autoprefixer = require("autoprefixer");
const CopyPlugin = require("copy-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require("path");
const tailwindcss = require("tailwindcss");

module.exports = {
    mode: "development",
    devtool: "cheap-module-source-map",
    entry: {
        background: path.resolve(__dirname, "./src/background/background.ts"),
        content: path.resolve(__dirname, "./src/scripts/content.ts"),
    },
    module: {
        rules: [
            {
                use: "ts-loader",
                test: /\.tsx?$/,
                exclude: /node_modules/
            },
            {
                use: ["style-loader", "css-loader", {
                    loader: "postcss-loader",
                    options: {
                        postcssOptions: {
                            ident: "postcss",
                            plugins: [
                                tailwindcss, autoprefixer
                            ]
                        }
                    }
                }],
                test: /\.css$/i,
            }
        ]
    },
    plugins: [ 
        new CopyPlugin({
            patterns: [
                { from: path.resolve("./src/static"), to: path.resolve("dist") },
            ],
        }),
        new CopyWebpackPlugin({
            patterns: [
              {
                from: 'src/assets/index.css',
                to: path.resolve("dist"),
                force: true,
              },
            ],
          }),
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx"]
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './dist'),
    }
}