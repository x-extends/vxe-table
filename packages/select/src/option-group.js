import { UtilTools } from '../../tools'

export default {
  name: 'VxeOptionGroup',
  props: {
    label: [String, Number],
    size: String
  },
  inject: {
    $xeselect: {
      default: null
    }
  },
  computed: {
    vSize () {
      return this.size || this.$parent.size || this.$parent.vSize
    }
  },
  mounted () {
    this.$xeselect.updateStatus()
  },
  destroyed () {
    this.$xeselect.updateStatus()
  },
  render (h) {
    return h('div', {
      class: 'vxe-select-option-group'
    }, [
      h('div', {
        class: 'vxe-select-option-group--title'
      }, UtilTools.getFuncText(this.label)),
      h('div', {
        class: 'vxe-select-option-group--wrapper'
      }, this.$slots.default)
    ])
  }
}
