import { App } from 'vue'
import { VXETable } from '../v-x-e-table'
import PanelComponent from './src/panel'
import customHook from './src/hook'
import { dynamicApp } from '../dynamics'

export const VxeTableCustomModule = {
  Panel: PanelComponent,
  install (app: App) {
    VXETable.hooks.add('$tableCustom', customHook)
    app.component(PanelComponent.name, PanelComponent)
  }
}

export const Custom = VxeTableCustomModule

dynamicApp.component(PanelComponent.name, PanelComponent)

export default VxeTableCustomModule
