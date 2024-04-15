import VxeTableHeader from '../table/src/header'

export const Header = Object.assign(VxeTableHeader, {
  install (Vue) {
    Vue.component(VxeTableHeader.name, VxeTableHeader)
  }
})

export default Header
