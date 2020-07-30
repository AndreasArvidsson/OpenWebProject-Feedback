const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");


module.exports = (env, argv) => {

    console.log("----------------------------")
    console.log(" ", argv.mode);
    console.log("----------------------------\n")

    const res = {
        entry: path.resolve(__dirname, "demo/demo.js"),
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: [
                        {
                            loader: "babel-loader",
                        },
                        {
                            loader: "eslint-loader",
                            options: {
                                configFile: "./eslintrc.js"
                            }
                        }
                    ]
                },
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader"
                    ]
                }
            ]
        },
        plugins: [
            new HtmlWebPackPlugin({
                template: path.resolve(__dirname, "demo/demo.html")
            }),
            //Extract css styles as external file.
            new MiniCssExtractPlugin({
                filename: "styles.css"
            })
        ]
    };

    if (argv.mode === "production") {
        res.output = {
            path: path.resolve(__dirname, "docs"),
            filename: "index.js"
        };
    }

    return res;
};