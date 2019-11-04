import Table from '../table'
import VXETable from '../v-x-e-table'
import Panel from './src/panel'
import mixin from './src/mixin'

export const Export = {
  install (Vue) {
    VXETable.reg('export')
    Table.mixins.push(mixin)
    Vue.component(Panel.name, Panel)
  }
}

export default Export
