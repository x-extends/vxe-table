import Table from '../table'
import Methods from './src/methods'
import VXETable from '../v-x-e-table'

export const Keyboard = {
  install () {
    VXETable._keyboard = 1
    Object.assign(Table.methods, Methods)
  }
}

export default Keyboard
