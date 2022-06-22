import VxeFormItem from './form-item'
import { errLog } from '../../tools/log'

export default {
  name: 'VxeFormGather',
  extends: VxeFormItem,
  provide () {
    return {
      $xeformgather: this,
      xeformitem: null,
      $xeformiteminfo: this
    }
  },
  created () {
    if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
      this.$nextTick(() => {
        if (this.$xeform && this.$xeform.customLayout) {
          errLog('vxe.error.errConflicts', ['custom-layout', '<form-gather ...>'])
        }
      })
    }
  },
  render (h) {
    return h('div', this.$slots.default)
  }
}
