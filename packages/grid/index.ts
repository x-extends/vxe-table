import { App } from 'vue'
import VxeGridComponent from './src/grid'
import { dynamicApp } from '../dynamics'

export const Grid = Object.assign(VxeGridComponent, {
  install (app: App) {
    dynamicApp.component(VxeGridComponent.name, VxeGridComponent)
    app.component(VxeGridComponent.name, VxeGridComponent)
  }
})

export default Grid
