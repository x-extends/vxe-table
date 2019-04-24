import Table from './table/table'
import ColumnCell from './table/cell'
import ColumnGroup from './table/group'
import ColumnIndex from './table/index'
import ColumnRadio from './table/radio'
import ColumnCheckbox from './table/checkbox'

const components = [
  Table,
  ColumnCell,
  ColumnGroup,
  ColumnIndex,
  ColumnRadio,
  ColumnCheckbox
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
  install
}
