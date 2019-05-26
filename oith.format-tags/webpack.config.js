var path = require('path');

module.exports = {
  mode: 'production',
  entry: './build/oith.format-tags/src/browser.js',
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'browser.js',
  },
};
