import VxeExcel from './src/excel'
import Cells from './src/cells'
import VXETable from '../v-x-e-table'

VxeExcel.install = function (Vue) {
  VXETable.renderer.mixin(Cells)
  Vue.component(VxeExcel.name, VxeExcel)
}

export const Excel = VxeExcel
export default VxeExcel
