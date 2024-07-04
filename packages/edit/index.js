import Table from '../table'
import mixin from './src/mixin'
import VXETable from '../v-x-e-table'

export const VxeTableEditModule = {
  install () {
    VXETable.reg('edit')
    Table.mixins.push(mixin)
  }
}

export const Edit = VxeTableEditModule

export default VxeTableEditModule
