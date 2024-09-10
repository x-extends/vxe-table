import { VueConstructor } from 'vue'
import { VxeUI } from '../ui'
import VxeGridComponent from './src/grid'

export const VxeGrid = Object.assign({}, VxeGridComponent, {
  install (app: VueConstructor) {
    app.component(VxeGridComponent.name as string, VxeGridComponent)
  }
})

if (VxeUI.dynamicApp) {
  VxeUI.dynamicApp.component(VxeGridComponent.name as string, VxeGridComponent)
}

VxeUI.component(VxeGridComponent)

export const Grid = VxeGrid
export default VxeGrid
