import { UtilTools } from '../../tools'

let optionUniqueId = 0

export default {
  name: 'VxeOption',
  props: {
    value: null,
    label: [String, Number, Boolean],
    disabled: Boolean,
    size: String
  },
  inject: {
    $xeselect: {
      default: null
    },
    $xeoptgroup: {
      default: null
    }
  },
  data () {
    return {
      id: `option_${++optionUniqueId}`
    }
  },
  computed: {
    vSize () {
      return this.size || this.$parent.size || this.$parent.vSize
    },
    isDisabled () {
      const { $xeoptgroup, disabled } = this
      return ($xeoptgroup && $xeoptgroup.disabled) || disabled
    }
  },
  mounted () {
    this.$xeselect.updateOptions()
  },
  destroyed () {
    this.$xeselect.updateOptions()
  },
  render (h) {
    const { $slots, $xeselect, id, isDisabled, value } = this
    return h('div', {
      class: ['vxe-select-option', {
        'is--disabled': isDisabled,
        'is--checked': $xeselect.value === value,
        'is--hover': $xeselect.currentValue === value
      }],
      attrs: {
        'data-option-id': id
      },
      on: {
        click: this.optionEvent,
        mouseenter: this.mouseenterEvent
      }
    }, $slots.default || UtilTools.getFuncText(this.label))
  },
  methods: {
    optionEvent (evnt) {
      if (!this.isDisabled) {
        this.$xeselect.changeOptionEvent(evnt, this.value)
      }
    },
    mouseenterEvent () {
      if (!this.isDisabled) {
        this.$xeselect.setCurrentOption(this)
      }
    }
  }
}
