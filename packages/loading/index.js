import VXETable from '../v-x-e-table'
import VxeLoading from './src/loading'

VxeLoading.install = function (Vue) {
  VXETable._loading = 1
  Vue.component(VxeLoading.name, VxeLoading)
}

export const Loading = VxeLoading
export default VxeLoading
