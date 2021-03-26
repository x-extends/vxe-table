import VXEStore from './store'

import { VxeGlobalFormats } from '../../../types/v-x-e-table'

export const formats = new VXEStore() as VxeGlobalFormats

if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
  Object.assign(formats, { _name: 'Formats' })
}
