import VxeTableBody from './src/body'

VxeTableBody.install = function (Vue) {
  Vue.component(VxeTableBody.name, VxeTableBody)
}

export const Body = VxeTableBody
export default VxeTableBody
