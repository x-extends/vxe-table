const path = require('path')

function resolve (dir) {
  return path.join(__dirname, '.', dir)
}

process.env.VUE_APP_VXE_TABLE_ENV = !process || !process.env || !process.env.npm_lifecycle_event || process.env.npm_lifecycle_event.indexOf('lib:dev_pack') === 0 ? 'development' : process.env.NODE_ENV

module.exports = {
  productionSourceMap: false,
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'vxe-table 2.0+'
    }
  },
  configureWebpack: {
    performance: {
      hints: false
    }
  },
  chainWebpack (config) {
    const XEUtils = {
      root: 'XEUtils',
      commonjs: 'xe-utils/ctor',
      commonjs2: 'xe-utils/ctor',
      amd: 'xe-utils'
    }
    config.resolve.alias
      .set('@', resolve('examples'))
    config.output
      .set('libraryExport', 'default')
      .set('library', 'VXETable')
    if (process.env.npm_lifecycle_event && process.env.npm_lifecycle_event.indexOf('lib') === 0) {
      if (config.has('externals')) {
        config.externals
          // .set('xe-utils', XEUtils)
          .set('xe-utils/ctor', XEUtils)
      } else {
        config
          .set('externals', {
            // 'xe-utils': XEUtils,
            'xe-utils/ctor': XEUtils
          })
      }
    }
  }
}
