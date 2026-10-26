import { VueConstructor } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxeGridComponent from './src/grid'

let isReg = false

export const VxeGrid = Object.assign({}, VxeGridComponent, {
  install(app: VueConstructor) {
    if (!isReg) {
      isReg = true
      if (VxeUI.dynamicApp) {
        VxeUI.dynamicApp.component(VxeGridComponent.name as string, VxeGridComponent)
      }
    }
    app.component(VxeGridComponent.name as string, VxeGridComponent)
  }
})

VxeUI.component(VxeGridComponent)

export const Grid = VxeGrid
export default VxeGrid
