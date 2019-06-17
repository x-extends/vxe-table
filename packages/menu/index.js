import VxeTableContextMenu from './src/menu'

VxeTableContextMenu.install = function (Vue) {
  Vue.component(VxeTableContextMenu.name, VxeTableContextMenu)
}

export const TableContextMenu = VxeTableContextMenu
export default VxeTableContextMenu
