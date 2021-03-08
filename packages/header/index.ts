import { App } from 'vue'
import VxeTableHeader from './src/header'
import { dynamicApp } from '../dynamics'

export const Header = Object.assign(VxeTableHeader, {
  install (app: App) {
    dynamicApp.component(VxeTableHeader.name, VxeTableHeader)
    app.component(VxeTableHeader.name, VxeTableHeader)
  }
})

export default Header
