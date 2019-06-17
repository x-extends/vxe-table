import VxeTableLoading from './src/loading'

VxeTableLoading.install = function (Vue) {
  Vue.component(VxeTableLoading.name, VxeTableLoading)
}

export const Loading = VxeTableLoading
export default VxeTableLoading
