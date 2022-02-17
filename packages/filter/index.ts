import { App } from 'vue'
import { VXETable } from '../v-x-e-table'
import PanelComponent from './src/panel'
import filterHook from './src/hook'
import { dynamicApp } from '../dynamics'

export const Filter = {
  Panel: PanelComponent,
  install (app: App) {
    VXETable.hooks.add('$tableFilter', filterHook)
    app.component(PanelComponent.name, PanelComponent)
  }
}

dynamicApp.component(PanelComponent.name, PanelComponent)

export default Filter
