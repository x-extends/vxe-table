import VxeTableColumn from '../table/src/column'

VxeTableColumn.install = function (Vue) {
  Vue.component(VxeTableColumn.name, VxeTableColumn)
}

export const TableColumn = VxeTableColumn
export default VxeTableColumn
