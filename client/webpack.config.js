const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

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
        filename: "index.html",
      }),
      new WebpackPwaManifest({
        name: "Just Another Text Editor",
        short_name: "J.A.T.E",
        description: "Take notes with Javascript syntax highlighting!",
        start_url: "/",
        theme_color: "#225ca3",
        background_color: "#225ca3",
        orientation: "portrait",
        display: "standalone",
        icons: [
          {
            src: path.resolve("./src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("icons"),
          },
          {
            src: path.resolve("./src/images/logo.png"),
            size: "512x512",
            destination: path.join("icons"),
          },
        ],
      }),
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "service-worker.js",
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.js$/,
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
