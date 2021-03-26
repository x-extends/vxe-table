import VXEStore from './store'

import { VxeGlobalMenus } from '../../../types/v-x-e-table'

export const menus = new VXEStore() as VxeGlobalMenus

if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
  Object.assign(menus, { _name: 'Menus' })
}
