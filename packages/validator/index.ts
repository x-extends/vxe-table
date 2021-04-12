import validatorHook from './src/hook'
import { VXETable } from '../v-x-e-table'

export const Validator = {
  install (): void {
    VXETable.hooks.add('$tableValidator', validatorHook)
  }
}

export default Validator
