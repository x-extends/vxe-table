import XEUtils from 'xe-utils'
import GlobalConfig from '../../v-x-e-table/src/conf'

export default {
  name: 'VxeRadioGroup',
  props: {
    value: [String, Number, Boolean],
    disabled: Boolean,
    size: { type: String, default: () => GlobalConfig.radio.size || GlobalConfig.size }
  },
  provide () {
    return {
      $xeradiogroup: this
    }
  },
  computed: {
    vSize () {
      return this.size || this.$parent.size || this.$parent.vSize
    }
  },
  data () {
    return {
      name: XEUtils.uniqueId('xegroup_')
    }
  },
  render (h) {
    const { $scopedSlots } = this
    return h('div', {
      class: 'vxe-radio-group'
    }, $scopedSlots.default ? $scopedSlots.default.call(this, {}) : [])
  },
  methods: {
    handleChecked (params) {
      this.$emit('input', params.label)
      this.$emit('change', params)
    }
  }
}
