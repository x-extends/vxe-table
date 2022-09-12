import { App } from 'vue'
import { VXETable } from '../v-x-e-table'
import PanelComponent from './src/panel'
import filterHook from './src/hook'
import { dynamicApp } from '../dynamics'

export const VxeModuleFilter = {
  Panel: PanelComponent,
  install (app: App) {
    VXETable.hooks.add('$tableFilter', filterHook)
    app.component(PanelComponent.name, PanelComponent)
  }
}

export const Filter = VxeModuleFilter

dynamicApp.component(PanelComponent.name, PanelComponent)

export default VxeModuleFilter
