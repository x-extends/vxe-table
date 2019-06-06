import VxeGrid from './src/grid'

VxeGrid.install = function (Vue) {
  Vue.component(VxeGrid.name, VxeGrid)
}

export const Grid = VxeGrid
export default VxeGrid
