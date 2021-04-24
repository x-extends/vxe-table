const path = require('path')

function resolve (dir) {
  return path.join(__dirname, '.', dir)
}

process.env.VUE_APP_VXE_TABLE_ENV = 'development'

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/vxe-table/v4/' : '/',
  outputDir: 'docs',
  assetsDir: 'static',
  productionSourceMap: false,
  pages: {
    index: {
      entry: 'examples/main.ts',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'vxe-table 4.0+ (Latest)'
    }
  },
  transpileDependencies: ['highlight.js'],
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
    } else {
      if (config.has('externals')) {
        config.externals
          .set('xlsx', 'XLSX')
          .set('exceljs', 'ExcelJS')
          .set('jspdf', 'jspdf')
          .set('jsbarcode', 'JsBarcode')
          .set('qrcode', 'QRCode')
          .set('dayjs', 'dayjs')
          .set('sortablejs', 'Sortable')
      } else {
        config
          .set('externals', {
            'xlsx': 'XLSX',
            'exceljs': 'ExcelJS',
            'jspdf': 'jspdf',
            'jsbarcode': 'JsBarcode',
            'qrcode': 'QRCode',
            'dayjs': 'dayjs',
            'sortablejs': 'Sortable'
          })
      }
    }
  }
}
