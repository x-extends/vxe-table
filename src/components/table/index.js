import VxeTable from './src/table'

VxeTable.install = function (Vue) {
  Vue.component(VxeTable.name, VxeTable)
}

export const Table = VxeTable
export default VxeTable
