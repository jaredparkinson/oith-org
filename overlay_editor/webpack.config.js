var path = require('path');

module.exports = {
  mode: 'production',
  entry: './build/src/main.js',
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'overlay-editor.js',
  },
};
