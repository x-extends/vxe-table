import { App } from 'vue'
import VxeGridComponent from './src/grid'

export const Grid = {
  install (app: App) {
    app.component(VxeGridComponent.name, VxeGridComponent)
  }
}

export default Grid
