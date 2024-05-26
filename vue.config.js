const path = require('path')
const pkg = require('./package.json')
const { defineConfig } = require('@vue/cli-service')

function resolve (dir) {
  return path.join(__dirname, '.', dir)
}

process.env.VUE_APP_VXE_VERSION = pkg.version
process.env.VUE_APP_VXE_ENV = 'development'

const externalMaps = {
  'xe-utils': 'XEUtils',
  '@vxe-ui/core': 'VxeCore'
}

const externals = {}
if (process.env.npm_lifecycle_event && process.env.npm_lifecycle_event.indexOf('lib') === 0) {
  for (const key in externalMaps) {
    const name = externalMaps[key]
    const item = {
      root: name,
      commonjs: key,
      commonjs2: key,
      amd: key
    }
    externals[key] = item
  }
}

module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  pages: {
    index: {
      title: 'Vxe PC Table',
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
      library: 'VxeUITable'
    },
    externals
  }
})
