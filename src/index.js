import XEUtils from 'xe-utils'
import Table from './components/table'
import TableColumn from './components/table-column'
import Grid from './components/grid'
import Excel from './components/excel'
import Pagination from './components/pagination'
import GlobalConfig from './conf'
import EventInterceptor from './interceptor'

import './style/index.scss'

const components = [
  Table,
  TableColumn,
  Grid,
  Excel,
  Pagination
]

function setup (options = {}) {
  let { renderMap, iconMap } = GlobalConfig
  if (options.renderMap) {
    Object.assign(renderMap, options.renderMap)
  }
  if (options.iconMap) {
    Object.assign(iconMap, options.iconMap)
  }
  Object.assign(GlobalConfig, options, {
    renderMap,
    iconMap
  })
}

function install (Vue, options) {
  if (!install.installed) {
    if (XEUtils.isPlainObject(options)) {
      setup(options)
    }
    components.map(component => Vue.component(component.name, component))
    use.apply(null, Array.from(arguments).slice(1))
  }
}

function use () {
  Array.from(arguments).forEach(plugin => {
    if (plugin && plugin.install) {
      plugin.install(GlobalConfig, EventInterceptor)
    }
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  use,
  setup,
  Table,
  TableColumn,
  Grid,
  Excel
}
