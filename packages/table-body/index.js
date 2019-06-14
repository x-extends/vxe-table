import VxeTableBody from './src/body'

VxeTableBody.install = function (Vue) {
  Vue.component(VxeTableBody.name, VxeTableBody)
}

export const TableBody = VxeTableBody
export default VxeTableBody
