const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/index.tsx'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    assetModuleFilename: '[name].[ext]',
    clean: true,
  },
  // loaders
  module: {
    rules: [
      // css
      { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] },
      // images
      { test: /\.(svg|ico|png|webp|jpg|gif|jpeg)$/, type: 'asset/resource' },
      // tsx for ts-loader
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
    ],
  },
  // plugins
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.ts', '.tsx', '.js'],
  },
};
