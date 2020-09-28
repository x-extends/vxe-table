import VxeTableColumn from './column'

export default {
  name: 'VxeTableColgroup',
  extends: VxeTableColumn,
  provide () {
    return {
      xecolgroup: this
    }
  }
}
