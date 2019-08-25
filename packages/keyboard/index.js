import Table from '../table'
import Methods from './src/methods'
import GlobalConfig from '../conf'

export const Keyboard = {
  install () {
    GlobalConfig._keyboard = 1
    Object.assign(Table.methods, Methods)
  }
}

export default Keyboard
