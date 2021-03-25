import VXEStore from './store'

export const menus = new VXEStore()

if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
  Object.assign(menus, { _name: 'Menus' })
}
