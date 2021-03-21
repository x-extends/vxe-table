import VxeTableColumn from './column'

export default {
  name: 'VxeColgroup',
  extends: VxeTableColumn,
  provide () {
    return {
      xecolgroup: this,
      $xegrid: null
    }
  }
}
