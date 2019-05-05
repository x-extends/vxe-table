import Table from '../packages/table'
import TableColumn from '../packages/table-column'
import TableConfig from '../packages/table-config'
import GlobalConfig from './conf'

import '../style/index.scss'

const components = [
  Table,
  TableColumn,
  TableConfig
]

function setup (options = {}) {
  let renderMap
  if (options.renderMap) {
    renderMap = Object.assign(GlobalConfig.renderMap || {}, options.renderMap)
  }
  Object.assign(GlobalConfig, options, {
    renderMap
  })
}

function install (Vue, options) {
  if (!install.installed) {
    setup(options)
    components.map(component => Vue.component(component.name, component))
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
