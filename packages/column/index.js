import VxeTableColumn from './src/column'
import VxeTableColgroup from './src/group'

VxeTableColumn.install = function (Vue) {
  Vue.component(VxeTableColumn.name, VxeTableColumn)
  Vue.component(VxeTableColgroup.name, VxeTableColgroup)
}

export const Column = VxeTableColumn
export default VxeTableColumn
