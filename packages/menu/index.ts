import { App } from 'vue'
import { VXETable } from '../v-x-e-table'
import PanelComponent from './src/panel'
import menuHook from './src/hooks'
import { dynamicApp } from '../dynamics'

export const Menu = {
  Panel: PanelComponent,
  install (app: App) {
    VXETable.hooks.add('$tableMenu', menuHook)
    dynamicApp.component(PanelComponent.name, PanelComponent)
    app.component(PanelComponent.name, PanelComponent)
  }
}

export default Menu
