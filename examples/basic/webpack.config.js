var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var fs = require('fs');

const plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new HtmlWebpackPlugin({
    template: 'index.html',
  }),
];

const entries = {
  index: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    '@babel/polyfill',
    './src/index.js',
  ],
};

let appPlugins = [];

if (fs.existsSync(path.join(__dirname, 'plugins.js'))) {
  const loadedPlugins = require('./plugins');

  appPlugins = loadedPlugins.PLUGINS;
}

plugins.push(
  new webpack.DefinePlugin({
    PLUGINS: JSON.stringify(appPlugins),
  })
);

module.exports = {
  mode: 'development',
  devtool: 'eval',
  entry: entries,
  output: {
    path: '/',
    filename: '[name].bundle-[hash].js',
    publicPath: '/',
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.(jpg|png|svg|eot|woff|woff2|ttf|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-import')({
                  addDependencyTo: webpack,
                  path: ['node_modules', 'src/assets'],
                }),
                require('postcss-color-function'),
                require('postcss-url')(),
                require('precss')(),
                require('autoprefixer')({ browsers: ['last 2 versions'] }),
              ],
            },
          },
        ],
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@plugins': path.resolve('./plugins'),
    },
  },
};
