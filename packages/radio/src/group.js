import XEUtils from 'xe-utils'
import GlobalConfig from '../../v-x-e-table/src/conf'

export default {
  name: 'VxeRadioGroup',
  props: {
    value: [String, Number, Boolean],
    type: String,
    options: Array,
    optionProps: Object,
    disabled: Boolean,
    strict: { type: Boolean, default: () => GlobalConfig.radioGroup.strict },
    size: { type: String, default: () => GlobalConfig.radioGroup.size || GlobalConfig.size }
  },
  inject: {
    $xeform: {
      default: null
    },
    $xeformiteminfo: {
      default: null
    }
  },
  provide () {
    return {
      $xeradiogroup: this
    }
  },
  computed: {
    vSize () {
      return this.size || this.$parent.size || this.$parent.vSize
    },
    propsOpts () {
      return this.optionProps || {}
    },
    labelField () {
      return this.propsOpts.label || 'label'
    },
    valueField () {
      return this.propsOpts.value || 'value'
    },
    disabledField () {
      return this.propsOpts.disabled || 'disabled'
    }
  },
  data () {
    return {
      name: XEUtils.uniqueId('xegroup_')
    }
  },
  render (h) {
    const { $scopedSlots, options, type, valueField, labelField, disabledField } = this
    const defaultSlot = $scopedSlots.default
    const btnComp = type === 'button' ? 'vxe-radio-button' : 'vxe-radio'
    return h('div', {
      class: 'vxe-radio-group'
    }, defaultSlot ? defaultSlot.call(this, {}) : (options ? options.map(item => {
      return h(btnComp, {
        props: {
          label: item[valueField],
          content: item[labelField],
          disabled: item[disabledField]
        }
      })
    }) : []))
  },
  methods: {
    handleChecked (params, evnt) {
      this.$emit('input', params.label)
      this.$emit('change', params)
      // 自动更新校验状态
      if (this.$xeform && this.$xeformiteminfo) {
        this.$xeform.triggerItemEvent(evnt, this.$xeformiteminfo.itemConfig.field, params.label)
      }
    }
  }
}
