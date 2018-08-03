const webpack = require("webpack");
const path = require("path");
const BabiliPlugin = require("babili-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

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
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: false
            }
          }
        ],
        include: defaultInclude
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: false
            }
          },
          "sass-loader"
        ]
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
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new BabiliPlugin(),
    new MiniCssExtractPlugin({
      filename: "./css/styles.css",
      chunkFilename: "id.css"
    })
  ],
  stats: {
    colors: true,
    children: false,
    chunks: false,
    modules: false
  }
};
