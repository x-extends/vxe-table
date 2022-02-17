import { App } from 'vue'
import VxeGridComponent from './src/grid'
import { dynamicApp } from '../dynamics'

export const Grid = Object.assign(VxeGridComponent, {
  install (app: App) {
    app.component(VxeGridComponent.name, VxeGridComponent)
  }
})

dynamicApp.component(VxeGridComponent.name, VxeGridComponent)

export default Grid
