import { App } from 'vue'
import VxeTableComponent from './src/table'
import { dynamicApp } from '../dynamics'

export const Table = Object.assign(VxeTableComponent, {
  install: function (app: App) {
    dynamicApp.component(VxeTableComponent.name, VxeTableComponent)
    app.component(VxeTableComponent.name, VxeTableComponent)
  }
})

export default Table
