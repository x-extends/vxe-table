import VxeGridComponent from './src/grid'
import VxeUI from '../v-x-e-table'

export const VxeGrid = Object.assign(VxeGridComponent, {
  install (Vue) {
    VxeUI.Grid = VxeGridComponent
    VxeUI.GridComponent = VxeGridComponent
    Vue.component(VxeGridComponent.name, VxeGridComponent)
  }
})
VxeUI.component(VxeGridComponent)

export const Grid = VxeGrid

export default VxeGrid
