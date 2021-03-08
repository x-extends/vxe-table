import { App } from 'vue'
import VxeTableColumnComponent from './src/column'
import VxeTableColgroupComponent from './src/group'
import { dynamicApp } from '../dynamics'

export const Column = Object.assign(VxeTableColumnComponent, {
  Colgroup: VxeTableColgroupComponent,
  install (app: App) {
    dynamicApp.component(VxeTableColumnComponent.name, VxeTableColumnComponent)
    dynamicApp.component(VxeTableColgroupComponent.name, VxeTableColgroupComponent)
    app.component(VxeTableColumnComponent.name, VxeTableColumnComponent)
    app.component(VxeTableColgroupComponent.name, VxeTableColgroupComponent)
  }
})

export default Column
