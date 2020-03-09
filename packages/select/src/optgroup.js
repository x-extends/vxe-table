import { UtilTools } from '../../tools'

export default {
  name: 'VxeOptgroup',
  props: {
    label: [String, Number],
    disabled: Boolean,
    size: String
  },
  provide () {
    return {
      $xeoptgroup: this
    }
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
  render (h) {
    return h('div', {
      class: ['vxe-optgroup', {
        'is--disabled': this.disabled
      }]
    }, [
      h('div', {
        class: 'vxe-optgroup--title'
      }, UtilTools.getFuncText(this.label)),
      h('div', {
        class: 'vxe-optgroup--wrapper'
      }, this.$slots.default)
    ])
  }
}
