const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/main.ts',
  },
  devServer: {
    port: 3000,
    static: {
      serveIndex: true,
      directory: path.resolve(__dirname, 'dist'),
    },
    // Reload if this files was changed
    watchFiles: ["./public/*"],
  },
  output: {
    filename: '[name].bundle.js',
    // destination directory
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    // Clean dist directory before build
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
    ]
  },
  watchOptions: {
    ignored: /node_modules/
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "public",
          globOptions: {
            dot: true,
            gitignore: true,
            ignore: ["**/public/index.html"],
          },
        },
      ],
    }),
  ],
};
