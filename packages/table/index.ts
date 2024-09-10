import { VueConstructor } from 'vue'
import { VxeUI } from '../ui'
import VxeTableComponent from './src/table'
import './render'

export const VxeTable = Object.assign({}, VxeTableComponent, {
  install (app: VueConstructor) {
    app.component(VxeTableComponent.name as string, VxeTableComponent)
  }
})

if (VxeUI.dynamicApp) {
  VxeUI.dynamicApp.component(VxeTableComponent.name as string, VxeTableComponent)
}

VxeUI.component(VxeTableComponent)

export const Table = VxeTable
export default VxeTable
