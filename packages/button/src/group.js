import GlobalConfig from '../../v-x-e-table/src/conf'
import XEUtils from 'xe-utils'

export default {
  name: 'VxeButtonGroup',
  props: {
    options: Array,
    mode: String,
    status: String,
    round: Boolean,
    circle: Boolean,
    className: [String, Function],
    disabled: Boolean,
    size: { type: String, default: () => GlobalConfig.buttonGroup.size || GlobalConfig.size }
  },
  provide () {
    return {
      $xebuttongroup: this
    }
  },
  computed: {
    vSize () {
      return this.size || this.$parent.size || this.$parent.vSize
    }
  },
  render (h) {
    const { $scopedSlots, className, options } = this
    const defaultSlot = $scopedSlots.default
    return h('div', {
      class: ['vxe-button-group', className ? (XEUtils.isFunction(className) ? className({ $buttonGroup: this }) : className) : '']
    }, defaultSlot ? defaultSlot.cell(this, {}) : (options ? options.map(item => h('vxe-button', { props: item })) : []))
  },
  methods: {
    handleClick (params, evnt) {
      const { options } = this
      const { name } = params
      const option = options ? options.find(item => item.name === name) : null
      this.$emit('click', { ...params, option, $event: evnt })
    }
  }
}
