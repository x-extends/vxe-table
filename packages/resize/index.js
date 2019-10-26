import Table from '../table'
import VXETable from '../v-x-e-table'
import mixin from './src/mixin'

export const Resize = {
  install () {
    VXETable.reg('resize')
    Table.mixins.push(mixin)
  }
}

export default Resize
