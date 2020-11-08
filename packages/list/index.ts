import { App } from 'vue'
import VxeListComponent from './src/list'

export const List = {
  install (app: App) {
    app.component(VxeListComponent.name, VxeListComponent)
  }
}

export default List
