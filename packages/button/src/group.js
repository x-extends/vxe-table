import GlobalConfig from '../../v-x-e-table/src/conf'

export default {
  name: 'VxeButtonGroup',
  props: {
    options: Array,
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
    const { $scopedSlots, options } = this
    const defaultSlot = $scopedSlots.default
    return h('div', {
      class: 'vxe-button-group'
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
