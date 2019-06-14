import VxeExcel from './src/excel'

VxeExcel.install = function (Vue) {
  Vue.component(VxeExcel.name, VxeExcel)
}

export const Excel = VxeExcel
export default VxeExcel
