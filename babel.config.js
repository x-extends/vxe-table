module.exports = {
  presets: process.env.npm_lifecycle_event.indexOf('lib:module') === 0 ? [] : [
    '@vue/app'
  ]
}
