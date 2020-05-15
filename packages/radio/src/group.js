import XEUtils from 'xe-utils'
import GlobalConfig from '../../conf'

export default {
  name: 'VxeRadioGroup',
  props: {
    value: [String, Number],
    disabled: Boolean,
    size: { type: String, default: () => GlobalConfig.radio.size || GlobalConfig.size }
  },
  provide () {
    return {
      $xegroup: this
    }
  },
  computed: {
    vSize () {
      return this.size || this.$parent.size || this.$parent.vSize
    },
    isDisabled () {
      return this.disabled || (this.isGroup && this.$xegroup.disabled)
    }
  },
  data () {
    return {
      name: XEUtils.uniqueId('xegroup_')
    }
  },
  render (h) {
    return h('div', {
      class: 'vxe-radio-group'
    }, this.$slots.default)
  },
  methods: {
    handleChecked (params, evnt) {
      this.$emit('input', params.label)
      this.$emit('change', params, evnt)
    }
  }
}
