import VxeTableColgroup from '../table/src/group'

export const Colgroup = Object.assign(VxeTableColgroup, {
  install (Vue) {
    Vue.component(VxeTableColgroup.name, VxeTableColgroup)
    Vue.component('VxeTableColgroup', VxeTableColgroup)
  }
})

export default Colgroup
