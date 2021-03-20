import VxeGrid from './src/grid'
import VXETable from '../v-x-e-table'

export const Grid = Object.assign(VxeGrid, {
  install (Vue) {
    VXETable.Grid = VxeGrid
    VXETable.GridComponent = VxeGrid
    Vue.component(VxeGrid.name, VxeGrid)
  }
})

export default Grid
