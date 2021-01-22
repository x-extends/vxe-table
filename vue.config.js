const path = require('path')
const envs = ['VUE', 'APP', 'VXE', 'TABLE', 'ENV']

function resolve (dir) {
  return path.join(__dirname, '.', dir)
}

process.env[envs.join('_')] = !process || !process.env || !process.env.npm_lifecycle_event || process.env.npm_lifecycle_event.indexOf('lib:dev_pack') === 0 ? 'development' : process.env.NODE_ENV

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/vxe-table/v2' : '/',
  outputDir: '../../../vxe-table/public/v2',
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
      title: 'vxe-table 2.x'
    }
  },
  transpileDependencies: ['highlight.js'],
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
    } else {
      if (config.has('externals')) {
        config.externals
          .set('xlsx', 'XLSX')
          .set('exceljs', 'ExcelJS')
          .set('jspdf', 'jspdf')
          .set('jsbarcode', 'JsBarcode')
          .set('qrcode', 'QRCode')
          .set('moment', 'moment')
          .set('sortablejs', 'Sortable')
      } else {
        config
          .set('externals', {
            'xlsx': 'XLSX',
            'exceljs': 'ExcelJS',
            'jspdf': 'jspdf',
            'jsbarcode': 'JsBarcode',
            'qrcode': 'QRCode',
            'moment': 'moment',
            'sortablejs': 'Sortable'
          })
      }
    }
  }
}
