import Table from '../table'
import VXETable from '../v-x-e-table'
import CustomPanel from './src/custom-panel'
import mixin from './src/mixin'

export const Custom = {
  install (Vue) {
    VXETable.reg('custom')
    Table.mixins.push(mixin)
    Vue.component(CustomPanel.name, CustomPanel)
  }
}

export default Custom
