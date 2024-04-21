import Table from '../table'
import mixin from './src/mixin'
import PanelComponent from './src/panel'
import VXETable from '../v-x-e-table'

export const VxeTableCustomModule = {
  Panel: PanelComponent,
  install (Vue) {
    VXETable.reg('custom')
    Table.mixins.push(mixin)
    Vue.component(PanelComponent.name, PanelComponent)
  }
}

export const Custom = VxeTableCustomModule

export default VxeTableCustomModule
