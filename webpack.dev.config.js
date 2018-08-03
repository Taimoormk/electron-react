const webpack = require("webpack");
const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
const { spawn } = require("child_process");

// Config directories
const SRC_DIR = path.resolve(__dirname, "src");
const SCSS_DIR = path.resolve(__dirname, "src/css/styles.scss");
const OUTPUT_DIR = path.resolve(__dirname, "dist");

// Any directories you will be adding code/files into, need to be added to this array so webpack will pick them up
const defaultInclude = [SRC_DIR];

module.exports = {
  entry: [`${SRC_DIR}/js/index.jsx`, SCSS_DIR],
  output: {
    path: OUTPUT_DIR,
    publicPath: "./js/",
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
        include: defaultInclude
      },
      {
        test: /\.scss$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
        include: defaultInclude
      },
      {
        test: /\.jsx$/,
        use: [{ loader: "babel-loader" }],
        include: defaultInclude
      }
    ]
  },
  target: "electron-renderer",
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development")
    })
  ],
  // devtools: "cheap-source-map",
  devServer: {
    contentBase: OUTPUT_DIR,
    stats: {
      colors: true,
      chunks: false,
      children: false
    },
    setup() {
      spawn("electron", ["."], {
        shell: true,
        env: process.env,
        stdio: "inherit"
      })
        .on("close", code => process.exit(0))
        .on("error", spawnError => console.log(spawnError));
    }
  }
};
