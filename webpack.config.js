import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';


const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  mode: 'development',
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    hot: true,
    port: 8080,
    open: true,
  },

  experiments: {
    topLevelAwait: true, //Allows top-level await in Webpack builds
  },

  entry: {
    index: './src/index.js',
    paperSizes: './src/paperSizes.js',
    paperNames: './src/paperNames.js',
    paperOptions: './src/paperOptions.js',
    calipers: './src/calipers.js',
    dateReceived: './src/dateReceived.js',
    maintenance: './src/maintenance.js',
    supplies: './src/supplies.js',
    inks: './src/inks.js',
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
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['index'], // no JS needed
    }),

    new HtmlWebpackPlugin({
      template: './src/paperNames.html',
      filename: 'paperNames.html',
      chunks: ['paperNames'],
    }),
    new HtmlWebpackPlugin({
      template: './src/paperSizes.html',
      filename: 'paperSizes.html',
      chunks: ['paperSizes'],
    }),
    new HtmlWebpackPlugin({
      template: './src/calipers.html',
      filename: 'calipers.html',
      chunks: ['calipers'],
    }),
    new HtmlWebpackPlugin({
      template: './src/dateReceived.html',
      filename: 'dateReceived.html',
      chunks: ['dateReceived'],
    }),
    new HtmlWebpackPlugin({
      template: './src/maintenance.html',
      filename: 'maintenance.html',
      chunks: ['maintenance'],
    }),
    new HtmlWebpackPlugin({
      template: './src/inks.html',
      filename: 'inks.html',
      chunks: ['inks'],
    }),
    new HtmlWebpackPlugin({
      template: './src/supplies.html',
      filename: 'supplies.html',
      chunks: ['supplies'],
    }),
    new HtmlWebpackPlugin({
      template: './src/paperOptions.html',
      filename: 'paperOptions.html',
      chunks: ['paperOptions'],
    }),
  ],
};
