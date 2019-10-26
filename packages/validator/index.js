import Table from '../table'
import mixin from './src/mixin'
import VXETable from '../v-x-e-table'

export const Validator = {
  install () {
    VXETable.reg('valid')
    Table.mixins.push(mixin)
  }
}

export default Validator
