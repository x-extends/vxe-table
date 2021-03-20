import Table from '../table'
import VXETable from '../v-x-e-table'
import Panel from './src/panel'
import mixin from './src/mixin'

export const Menu = {
  Panel,
  install (Vue) {
    VXETable.reg('menu')
    Table.mixins.push(mixin)
    Vue.component(Panel.name, Panel)
  }
}

export default Menu
