import { App } from 'vue'
import VxeTableFooterComponent from './src/footer'
import { dynamicApp } from '../dynamics'

export const Footer = Object.assign(VxeTableFooterComponent, {
  install (app: App) {
    app.component(VxeTableFooterComponent.name, VxeTableFooterComponent)
  }
})

dynamicApp.component(VxeTableFooterComponent.name, VxeTableFooterComponent)

export default Footer
