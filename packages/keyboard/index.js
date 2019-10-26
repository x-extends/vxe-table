import Table from '../table'
import mixin from './src/mixin'
import VXETable from '../v-x-e-table'

export const Keyboard = {
  install () {
    VXETable.reg('keyboard')
    Table.mixins.push(mixin)
  }
}

export default Keyboard
