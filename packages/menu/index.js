import Table from '../table'
import VXETable from '../v-x-e-table'
import Panel from './src/panel'
import mixin from './src/mixin'

Panel.install = function (Vue) {
  VXETable.reg('menu')
  Table.mixins.push(mixin)
  Vue.component(Panel.name, Panel)
}

export const Menu = Panel
export default Panel
