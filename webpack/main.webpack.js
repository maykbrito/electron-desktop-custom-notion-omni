module.exports = {
  resolve: {
    extensions: ['.ts', '.js']
  },
  entry: './src/main/app.js',
  module: {
    rules: require('./rules.webpack')
  }
}
