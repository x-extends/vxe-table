import VxeGridComponent from './src/grid'
import VXETable from '../v-x-e-table'

export const VxeGrid = Object.assign(VxeGridComponent, {
  install (Vue) {
    VXETable.Grid = VxeGridComponent
    VXETable.GridComponent = VxeGridComponent
    Vue.component(VxeGridComponent.name, VxeGridComponent)
  }
})

export const Grid = VxeGrid

export default VxeGrid
