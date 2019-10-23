import Table from '../table'
import VXETable from '../v-x-e-table'
import mixin from './src/mixin'

export const Resize = {
  install () {
    VXETable._resize = 1
    Table.mixins.push(mixin)
  }
}

export default Resize
