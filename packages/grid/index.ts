import { App } from 'vue'
import VxeGridComponent from './src/grid'
import { dynamicApp } from '../dynamics'

export const VxeGrid = Object.assign(VxeGridComponent, {
  install (app: App) {
    app.component(VxeGridComponent.name, VxeGridComponent)
  }
})

export const Grid = VxeGrid

dynamicApp.component(VxeGridComponent.name, VxeGridComponent)

export default VxeGrid
