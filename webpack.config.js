const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AutoPreFixer = require('autoprefixer');

// some paths
const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'src');
const BUILD_PATH = path.resolve(ROOT_PATH, 'build');
const TARGET = process.env.npm_lifecycle_event;

const webpackConfig = {
  entry: {
    app: path.resolve(APP_PATH, 'index.js'),
    libs: ['classnames', 'react', 'react-dom', 'rc-animate', 'velocity-animate']
  },
  output: {
    path: BUILD_PATH,
    publicPath: '/',
    filename: 'bundle.[hash].js'
  },
  module: {
    loaders: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file?hash=sha512&digest=hex&name=imgs/[hash].[ext]'
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff&prefix=fonts&name=fonts/[hash].[ext]'
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream&prefix=fonts&name=fonts/[hash].[ext]'
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/vnd.ms-fontobject&prefix=fonts&name=fonts/[hash].[ext]'
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml&prefix=fonts&name=fonts/[hash].[ext]'
      },
      {
        test: /\.json$/,
        loaders: ['json']
      },
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: APP_PATH,
        exclude: [
          path.resolve(ROOT_PATH, 'node_modules')
        ]
      }
    ]
  },
  postcss: [AutoPreFixer()],
  resolve: {
    root: path.resolve(APP_PATH),
    extensions: ['', '.js', '.jsx']
  }
};

const env = TARGET === 'build' ? 'production' : 'development';

let plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(env)
    }
  }),
  new ExtractTextPlugin('style.[hash].css', {
    allChunks: true
  }),
  new HtmlWebpackPlugin({
    template: './templates/index.tpl',
    title: 'component'
  }),
  new webpack.optimize.CommonsChunkPlugin('libs', 'libs.[hash].js')
];

if (TARGET === 'build') {
  webpackConfig.module.loaders.push({
    test: /\.jsx?$/,
    loader: 'strip-loader?strip[]=log,strip[]=console.log',
    exclude: [
      path.resolve(ROOT_PATH, 'node_modules')
    ]
  });

  webpackConfig.module.loaders.push({
    test: /\.(le|c)ss$/,
    loader: ExtractTextPlugin.extract('style', 'css!postcss!less')
  });

  Array.prototype.push.apply(plugins, [
    new CleanPlugin([BUILD_PATH]),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 51200 // ~50kb
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]);
  // build 至 gh-pages
  webpackConfig.output.publicPath = '/React-Component-zad/dist/';
} else {
  webpackConfig.devServer = {port: 9999};
  webpackConfig.module.preLoaders = [{test: /\.jsx?$/, loader: 'eslint'}];
  webpackConfig.devtool = 'source-map';
  webpackConfig.module.loaders.push({
    test: /\.(le|c)ss$/,
    loader: ExtractTextPlugin.extract(
      'css-loader?sourceMap!postcss-loader!less-loader?sourceMap'
    )
  });
}

webpackConfig.plugins = plugins;
module.exports = webpackConfig;
