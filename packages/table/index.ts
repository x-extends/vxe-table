import { App } from 'vue'
import VxeTableComponent from './src/table'
import { dynamicApp } from '../dynamics'

export const Table = Object.assign(VxeTableComponent, {
  install: function (app: App) {
    app.component(VxeTableComponent.name, VxeTableComponent)
  }
})

dynamicApp.component(VxeTableComponent.name, VxeTableComponent)

export default Table
