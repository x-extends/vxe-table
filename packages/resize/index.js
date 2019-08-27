import Table from '../table'
import VXETable from '../v-x-e-table'
import Methods from './src/methods'

export const Resize = {
  install () {
    VXETable._resize = 1
    Object.assign(Table.methods, Methods)
  }
}

export default Resize
