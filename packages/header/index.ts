import { App } from 'vue'
import VxeTableHeader from './src/header'

export const Header = {
  install (app: App) {
    app.component(VxeTableHeader.name, VxeTableHeader)
  }
}

export default Header
