module.exports = {
  presets: !process || !process.env || !process.env.npm_lifecycle_event || process.env.npm_lifecycle_event.indexOf('lib:module') === 0 ? [] : [
    '@vue/app'
  ]
}
