import { App } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxeGridComponent from './src/grid'

export const VxeGrid = Object.assign({}, VxeGridComponent, {
  install (app: App) {
    app.component(VxeGridComponent.name as string, VxeGridComponent)
  }
})

if (VxeUI.dynamicApp) {
  VxeUI.dynamicApp.component(VxeGridComponent.name as string, VxeGridComponent)
}

export const Grid = VxeGrid
export default VxeGrid
