import Table from '../table'
import GlobalConfig from '../conf'
import Panel from './src/panel'
import Methods from './src/methods'

Panel.install = function (Vue) {
  GlobalConfig._menu = 1
  Object.assign(Table.methods, Methods)
  Vue.component(Panel.name, Panel)
}

export const Menu = Panel
export default Panel
