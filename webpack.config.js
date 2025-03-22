import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  mode: 'development',
  devServer: {
    static: path.resolve(__dirname, 'dist'), //Copies index.html to dist/
    hot: true,
    port: 8080, //Runs Webpack Dev Server on port 8080
  },
  experiments: {
    topLevelAwait: true, //Allows top-level await in Webpack builds
  },

  entry: {
    index: './src/script.js',
    name: './src/name.js',
    paperOptions: './src/paperOptions.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['index'],
    }),

    new HtmlWebpackPlugin({
      template: './src/name.html',
      filename: 'name.html',
      chunks: ['name'],
    }),

    new HtmlWebpackPlugin({
      template: './src/paperOptions.html',
      filename: 'paperOptions.html',
      chunks: ['paperOptions'],
    }),
  ],
};
