import Table from '../table'
import VXETable from '../v-x-e-table'
import mixin from './src/mixin'

export const Export = {
  install () {
    VXETable.reg('export')
    Table.mixins.push(mixin)
  }
}

export default Export
