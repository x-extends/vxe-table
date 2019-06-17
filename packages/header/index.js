import VxeTableHeader from './src/header'

VxeTableHeader.install = function (Vue) {
  Vue.component(VxeTableHeader.name, VxeTableHeader)
}

export const Header = VxeTableHeader
export default VxeTableHeader
