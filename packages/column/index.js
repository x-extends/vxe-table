import VxeTableColumn from './src/column'

export const Column = Object.assign(VxeTableColumn, {
  install (Vue) {
    Vue.component(VxeTableColumn.name, VxeTableColumn)
  }
})

export default Column
