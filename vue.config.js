const path = require('path')
const pkg = require('./package.json')

function resolve (dir) {
  return path.join(__dirname, '.', dir)
}

process.env.VUE_APP_VXE_TABLE_VERSION = pkg.version
process.env.VUE_APP_VXE_TABLE_ENV = 'development'

module.exports = {
  productionSourceMap: false,
  pages: {
    index: {
      entry: 'examples/main.ts',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  configureWebpack: {
    performance: {
      hints: false
    },
    resolve: {
      alias: {
        '@': resolve('examples')
      }
    },
    output: {
      library: 'VXETable'
    }
  },
  chainWebpack (config) {
    const XEUtils = {
      root: 'XEUtils',
      commonjs: 'xe-utils',
      commonjs2: 'xe-utils',
      amd: 'xe-utils'
    }
    if (process.env.npm_lifecycle_event && process.env.npm_lifecycle_event.indexOf('lib') === 0) {
      if (config.has('externals')) {
        config.externals
          .set('xe-utils', XEUtils)
      } else {
        config
          .set('externals', {
            'xe-utils': XEUtils
          })
      }
    }
  }
}
