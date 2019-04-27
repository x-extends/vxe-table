import Table from '../packages/table'
import TableColumn from '../packages/table-column'

import '../style/index.scss'

const components = [
  Table,
  TableColumn
]

const install = function (Vue) {
  if (!install.installed) {
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
