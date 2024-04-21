import Table from '../table'
import mixin from './src/mixin'
import VXETable from '../v-x-e-table'

export const VxeTableValidatorModule = {
  install () {
    VXETable.reg('valid')
    Table.mixins.push(mixin)
  }
}

export const Validator = VxeTableValidatorModule

export default VxeTableValidatorModule
