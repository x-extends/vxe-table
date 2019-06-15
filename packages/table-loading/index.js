import VxeTableLoading from './src/loading'

VxeTableLoading.install = function (Vue) {
  Vue.component(VxeTableLoading.name, VxeTableLoading)
}

export const TableLoading = VxeTableLoading
export default VxeTableLoading
