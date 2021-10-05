import VxeFormItem from './form-item'
import { UtilTools } from '../../tools'

export default {
  name: 'VxeFormGather',
  extends: VxeFormItem,
  provide () {
    return {
      xeformgather: this
    }
  },
  created () {
    if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
      this.$nextTick(() => {
        if (this.$xeform && this.$xeform.customLayout) {
          UtilTools.error('vxe.error.errConflicts', ['custom-layout', '<form-gather ...>'])
        }
      })
    }
  },
  render (h) {
    return h('div', this.$slots.default)
  }
}
