import keyboardHook from './src/hook'
import VXETable from '../v-x-e-table'

export const Keyboard = {
  install () {
    VXETable.hooks.add('$tableKeyboard', keyboardHook)
  }
}

export default Keyboard
