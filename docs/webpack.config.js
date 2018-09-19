const path = require('path');

module.exports = function(env, argv) {
  const mode = argv && argv.mode ? argv.mode : 'development';
  console.log('mode: ' + mode);

  return {
    mode: mode,
    entry: './src/index.tsx',
    output: {
      path: __dirname,
      filename: 'bundle.js'
    },
    resolve: {
      modules: [path.resolve(__dirname, 'node_modules')],
      extensions: ['.tsx', '.ts', '.js']
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'ts-loader'
          }
        }
      ]
    },
    performance: {
      hints: false
    }
  };
};
