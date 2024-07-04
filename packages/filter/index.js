import Table from '../table'
import VXETable from '../v-x-e-table'
import PanelComponent from './src/panel'
import mixin from './src/mixin'

export const VxeTableFilterModule = {
  Panel: PanelComponent,
  install (Vue) {
    VXETable.reg('filter')
    Table.mixins.push(mixin)
    Vue.component(PanelComponent.name, PanelComponent)
  }
}

export const Filter = VxeTableFilterModule

export default VxeTableFilterModule
