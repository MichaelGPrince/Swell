const path = require('path');
const merge = require('webpack-merge');
const { spawn } = require('child_process');
const base = require('./webpack.config');

module.exports = merge(base, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    host: 'localhost',
    port: '8080',
    hot: true,
    compress: true,
    contentBase: path.resolve(__dirname, 'dist'),
    watchContentBase: true,
    watchOptions: {
      ignored: /node_modules/,
    },
    before() {
      spawn('electron', ['.', 'dev'], {
        shell: true,
        env: process.env,
        stdio: 'inherit',
      })
        .on('close', (code) => process.exit(0))
        .on('error', (spawnError) => console.error(spawnError));
    },
  },
});
