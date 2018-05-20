const webpack = require('webpack');
const path = require('path');

module.exports = function (env) {
  console.log('--- env ---');
  console.log(env);

  return {
    mode: env.production ? 'production' : 'development',
    entry: './index.js',
    output: {
      path: __dirname,
      filename: 'bundle.js',
      publicPath: '/'
    },
    resolve: {
      modules: [path.resolve(__dirname, 'node_modules')],
      extensions: ['.webpack.js', '.web.js', '.js', '.jsx']
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        }
      ]
    },
    performance: {
      hints: false
    }
  };
};