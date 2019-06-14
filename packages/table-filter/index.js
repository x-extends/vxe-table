import VxeTableFilter from './src/filter'

VxeTableFilter.install = function (Vue) {
  Vue.component(VxeTableFilter.name, VxeTableFilter)
}

export const TableFilter = VxeTableFilter
export default VxeTableFilter
