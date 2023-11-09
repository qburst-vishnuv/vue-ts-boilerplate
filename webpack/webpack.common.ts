import * as path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import * as webpack from "webpack";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import dotenv from "dotenv";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import  { VueLoaderPlugin } from "vue-loader";

// const CopyPlugin = require("copy-webpack-plugin");

const IN_PRODUCTION =
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging" ||
  process.env.NODE_ENV === "perf";

if (!IN_PRODUCTION) {
  // process.env in localhost
  dotenv.config();
}

const {
 // Declare env variables here
} = process.env;

const outputPath = path.resolve(__dirname, "..", "build");

const config: webpack.Configuration = {
  entry: "./src/index.ts",
  resolve: {
    alias: {
      "@images": path.resolve(__dirname, "../assets/images"),
      "@fonts": path.resolve(__dirname, "../assets/fonts"),
    },
    fallback: {
      
    },
    extensions: [".ts", ".js", ".vue", ".css", ".scss"],
    modules: [path.resolve(__dirname, "../src"), "../node_modules"]
  },
  output: {
    path: outputPath,
    filename: "[name].[fullhash].js",
    sourceMapFilename: "[name].[fullhash].map",
    chunkFilename: "[id].[fullhash].js",
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        use: {
          loader: "babel-loader",
        },
        exclude: /node_modules/,
  
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          postcss: [require('postcss-cssnext')()]
        }
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: "css-loader",
            options: {
              url: false
            }
          },

          { loader: "sass-loader", 
          options: {}
          },
          {
            loader: "vue-style-loader"
          },
        ]

      },
      {
        test: /\.(less|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|pdf|ico)$/,
        use: [
          {
            loader: "file-loader",

            options: {
              modules: true,
              name: "assets/images/[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2)$/,
        use: [
          {
            loader: "file-loader",

            options: {
              modules: true,
              name: "assets/fonts/[name].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: "ejs-compiled-loader!./src/index.ejs",
      hash: true,
      options: {
      }
    }),
    new webpack.DefinePlugin(
      Object.assign({})
    ),
    new ForkTsCheckerWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[fullhash].css",
      chunkFilename: "[id].[fullhash].css",
    }),
  ]
};

export default config;
