const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src',
  output: {
    path: path.resolve(__dirname, './dist2'),
    filename: '[name].js'
  }
}
