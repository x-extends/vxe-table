import VxeTableColumn from './src/column'

VxeTableColumn.install = function (Vue) {
  Vue.component(VxeTableColumn.name, VxeTableColumn)
}

export const Column = VxeTableColumn
export default VxeTableColumn
