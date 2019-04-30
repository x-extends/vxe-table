import Table from '../packages/table'
import TableColumn from '../packages/table-column'
import GlobalConfig from './conf'

import '../style/index.scss'

const components = [
  Table,
  TableColumn
]

const install = function (Vue, options) {
  if (!install.installed) {
    Object.assign(GlobalConfig, options)
    components.map(component => Vue.component(component.name, component))
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  Table,
  TableColumn
}
