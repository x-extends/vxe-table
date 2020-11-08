import { App } from 'vue'
import VxeTableFooterComponent from './src/footer'

export const Footer = {
  install (app: App) {
    app.component(VxeTableFooterComponent.name, VxeTableFooterComponent)
  }
}

export default Footer
