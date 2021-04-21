import VxeTableColumn from '../table/src/column'

export const Column = Object.assign(VxeTableColumn, {
  install (Vue) {
    Vue.component(VxeTableColumn.name, VxeTableColumn)
    // 兼容旧用法
    Vue.component('VxeTableColumn', VxeTableColumn)
  }
})

export default Column
