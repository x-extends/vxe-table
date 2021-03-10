import VxeTableColumn from './src/column'
import VxeTableColgroup from './src/group'

export const Column = Object.assign(VxeTableColumn, {
  Colgroup: VxeTableColgroup,
  install (Vue) {
    Vue.component(VxeTableColumn.name, VxeTableColumn)
    Vue.component(VxeTableColgroup.name, VxeTableColgroup)
  }
})

export default VxeTableColumn
