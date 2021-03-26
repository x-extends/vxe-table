import VXEStore from './store'

import { VxeGlobalCommands } from '../../../types/v-x-e-table'

export const commands = new VXEStore() as VxeGlobalCommands

if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
  Object.assign(commands, { _name: 'Commands' })
}
