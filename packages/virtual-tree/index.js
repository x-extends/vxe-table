import VxeVirtualTree from './src/virtual-tree'

VxeVirtualTree.install = function (Vue) {
  Vue.component(VxeVirtualTree.name, VxeVirtualTree)
}

export const VirtualTree = VxeVirtualTree
export default VxeVirtualTree
