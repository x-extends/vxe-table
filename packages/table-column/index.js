import TableColumn from '../table/src/column'

TableColumn.install = function (Vue) {
  Vue.component(TableColumn.name, TableColumn)
}

export default TableColumn
