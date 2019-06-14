module.exports = {
  presets: process.env.npm_lifecycle_event.indexOf('lib') === 0 ? [] : [
    '@vue/app'
  ]
}
