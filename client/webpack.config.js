const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "J.A.T.E",
      }),
      new WebpackPwaManifest({
        fingerprints: false,
        inject:true,
        name: "Just Another Text Editor",
        short_name: "J.A.T.E",
        description: "Take notes with Javascript syntax highlighting!",
        start_url: "/",
        publicPath: "/",
        theme_color: "#225ca3",
        background_color: "#225ca3",
        orientation: "portrait",
        display: "standalone",
        icons: [
          {
            src: path.resolve("./src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384,512],
            destination: path.join("assets", "icons"),
          },
        ],
      }),
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js",
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        // {
        //   test: /\.(png|svg|jpg|jpeg|gif)$/i,
        //   type: "asset/resource",
        // },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/plugin-transform-runtime",
              ],
            },
          },
        },
      ],
    },
  };
};
