import VxeTableFooter from './src/footer'

VxeTableFooter.install = function (Vue) {
  Vue.component(VxeTableFooter.name, VxeTableFooter)
}

export const TableFooter = VxeTableFooter
export default VxeTableFooter
