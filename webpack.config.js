const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const Dotenv = require('dotenv-webpack');
var webpack = require('webpack');
const deps = require("./package.json").dependencies;

module.exports = {
    entry: __dirname + "/src/index.ts",
    output: {
        clean: true,
        path: __dirname + "/public",
        publicPath: '/',
    },

    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },

    devServer: {
        port: 8090,
        historyApiFallback: true,
        allowedHosts: "all"
    },
    module: {
        rules: [
            {
                test: /\.m?js/,
                type: "javascript/auto",
                resolve: {
                    fullySpecified: false,
                },
            },
            {
                test: /\.(css|s[ac]ss)$/i,
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
            {
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: /node_modules/,
                use: { loader: "babel-loader" }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: ['@babel/preset-env',
                        '@babel/react', {
                            'plugins': ['@babel/plugin-proposal-class-properties']
                        }]
                }
            },
            {
                test: /\.(jpe?g|png|gif|woff|woff2|otf|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1000,
                            name: 'assets/img/[name].[ext]'
                        }
                    }
                ]
            }
        ],
    },

    plugins: [
        new ModuleFederationPlugin({
            name: 'PDF Example',
            filename: 'remoteEntry.js',
            remotes: {},
            exposes: {},
            shared: {
                ...deps,
                react: {
                    singleton: true,
                    requiredVersion: deps.react,
                },
                "react-dom": {
                    singleton: true,
                    requiredVersion: deps["react-dom"],
                },
                "jose": {
                    version: '^4.12.0',
                    singleton: true,
                    requiredVersion: deps["jose"],

                }
            },
        }),
        new HtmlWebPackPlugin({ template: "custom_template/index.html" }),
        new webpack.SourceMapDevToolPlugin({}),
        new Dotenv()
    ]
}
