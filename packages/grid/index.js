import VxeGrid from './src/grid'
import VXETable from '../v-x-e-table'

VxeGrid.install = function (Vue) {
  VXETable.Grid = VxeGrid
  Vue.component(VxeGrid.name, VxeGrid)
}

export const Grid = VxeGrid
export default VxeGrid
