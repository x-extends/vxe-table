import VxeTableFooter from './src/footer'

export const Footer = Object.assign(VxeTableFooter, {
  install (Vue) {
    Vue.component(VxeTableFooter.name, VxeTableFooter)
  }
})

export default Footer
