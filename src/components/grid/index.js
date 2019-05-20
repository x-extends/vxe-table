import VxeGrid from '../table/src/grid'

VxeGrid.install = function (Vue) {
  Vue.component(VxeGrid.name, VxeGrid)
}

export const Grid = VxeGrid
export default VxeGrid
