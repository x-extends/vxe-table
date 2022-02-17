import { App } from 'vue'
import VxeTableHeader from './src/header'
import { dynamicApp } from '../dynamics'

export const Header = Object.assign(VxeTableHeader, {
  install (app: App) {
    app.component(VxeTableHeader.name, VxeTableHeader)
  }
})

dynamicApp.component(VxeTableHeader.name, VxeTableHeader)

export default Header
