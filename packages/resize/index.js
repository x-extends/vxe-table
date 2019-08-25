import Table from '../table'
import GlobalConfig from '../conf'
import Methods from './src/methods'

export const Resize = {
  install () {
    GlobalConfig._resize = 1
    Object.assign(Table.methods, Methods)
  }
}

export default Resize
