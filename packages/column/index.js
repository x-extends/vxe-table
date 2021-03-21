import VxeTableColumn from './src/column'
import VxeTableColgroup from './src/group'

VxeTableColumn.install = function (Vue) {
  Vue.component(VxeTableColumn.name, VxeTableColumn)
  Vue.component('VxeTableColumn', VxeTableColumn)
  Vue.component(VxeTableColgroup.name, VxeTableColgroup)
  Vue.component('VxeTableColgroup', VxeTableColgroup)
}

export const Column = VxeTableColumn
export default VxeTableColumn
