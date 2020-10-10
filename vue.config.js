const path = require('path')
const envs = ['VUE', 'APP', 'VXE', 'TABLE', 'ENV']

function resolve (dir) {
  return path.join(__dirname, '.', dir)
}

process.env[envs.join('_')] = !process || !process.env || !process.env.npm_lifecycle_event || process.env.npm_lifecycle_event.indexOf('lib:dev_pack') === 0 ? 'development' : process.env.NODE_ENV

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/vxe-table/v1' : '/',
  outputDir: '../../../vxe-table/public/v1',
  assetsDir: 'static',
  productionSourceMap: false,
  configureWebpack: {
    performance: {
      hints: false
    }
  },
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'vxe-table 1.x (Deprecated)'
    }
  },
  transpileDependencies: ['highlight.js'],
  chainWebpack (config) {
    config.resolve.alias
      .set('@', resolve('examples'))
    config.output
      .set('libraryExport', 'default')
      .set('library', 'VXETable')
    if (process.env.npm_lifecycle_event && process.env.npm_lifecycle_event.indexOf('lib') === 0) {
      const XEUtils = {
        root: 'XEUtils',
        commonjs: 'xe-utils',
        commonjs2: 'xe-utils',
        amd: 'xe-utils'
      }
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
