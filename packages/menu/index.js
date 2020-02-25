import VxeTableMenu from './src/menu'

VxeTableMenu.install = function (Vue) {
  Vue.component(VxeTableMenu.name, VxeTableMenu)
}

export const Menu = VxeTableMenu
export default VxeTableMenu
