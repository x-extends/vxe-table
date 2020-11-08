import { App } from 'vue'
import VxeTableColumnComponent from './src/column'
import VxeTableColgroupComponent from './src/group'

export const Column = {
  install (app: App) {
    app.component(VxeTableColumnComponent.name, VxeTableColumnComponent)
    app.component(VxeTableColgroupComponent.name, VxeTableColgroupComponent)
  }
}

export default Column
