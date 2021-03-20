import VxeTableColgroup from '../column/src/group'

export const Colgroup = Object.assign(VxeTableColgroup, {
  install (Vue) {
    Vue.component(VxeTableColgroup.name, VxeTableColgroup)
  }
})

export default Colgroup
