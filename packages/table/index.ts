import { App } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxeTableComponent from './src/table'
import './module/filter/hook'
import './module/menu/hook'
import './module/edit/hook'
import './module/export/hook'
import './module/keyboard/hook'
import './module/validator/hook'
import './module/custom/hook'
import './render'

export const VxeTable = Object.assign({}, VxeTableComponent, {
  install (app: App) {
    app.component(VxeTableComponent.name as string, VxeTableComponent)
  }
})

if (VxeUI.dynamicApp) {
  VxeUI.dynamicApp.component(VxeTableComponent.name as string, VxeTableComponent)
}

export const Table = VxeTable
export default VxeTable
