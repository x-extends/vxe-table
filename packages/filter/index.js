import VxeTableFilter from './src/filter'

VxeTableFilter.install = function (Vue) {
  Vue.component(VxeTableFilter.name, VxeTableFilter)
}

export const Filter = VxeTableFilter
export default VxeTableFilter
