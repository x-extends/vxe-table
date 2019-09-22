import Table from '../table'
import Methods from './src/methods'
import VXETable from '../v-x-e-table'

export const Validator = {
  install () {
    VXETable._valid = 1
    Object.assign(Table.methods, Methods)
  }
}

export default Validator
