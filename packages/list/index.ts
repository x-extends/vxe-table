import { App } from 'vue'
import VxeListComponent from './src/list'
import { dynamicApp } from '../dynamics'

export const List = Object.assign(VxeListComponent, {
  install (app: App) {
    app.component(VxeListComponent.name, VxeListComponent)
  }
})

dynamicApp.component(VxeListComponent.name, VxeListComponent)

export default List
