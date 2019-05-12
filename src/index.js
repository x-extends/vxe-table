import Table from './components/table'
import TableColumn from './components/table-column'
import TableConfig from './components/table-grid'
import ExcelTable from './components/excel'
import GlobalConfig from './conf'
import EventInterceptor from './interceptor'

import './style/index.scss'

const components = [
  Table,
  TableColumn,
  TableConfig,
  ExcelTable
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
    setup(options)
    components.map(component => Vue.component(component.name, component))
    Array.from(arguments).slice(1).map(plugin => plugin(GlobalConfig, EventInterceptor))
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  setup,
  Table,
  TableColumn
}
