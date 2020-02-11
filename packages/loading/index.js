import VXETable from '../v-x-e-table'
import VxeLoading from './src/loading'

VxeLoading.install = function (Vue) {
  VXETable.reg('loading')
  Vue.component(VxeLoading.name, VxeLoading)
}

export const Loading = VxeLoading
export default VxeLoading
