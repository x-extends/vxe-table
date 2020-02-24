import { UtilTools } from '../../tools'

let optionUniqueId = 0

export default {
  name: 'VxeOption',
  props: {
    value: [String, Number],
    label: [String, Number],
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
  warch: {
    value () {
      this.updateView()
    }
  },
  mounted () {
    this.updateView()
  },
  destroyed () {
    this.updateView()
  },
  render (h) {
    const { $xeselect, id, isDisabled, value } = this
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
        mouseenter: this.mouseenterEvent,
        mouseleave: this.mouseleaveEvent
      }
    }, UtilTools.getFuncText(this.label))
  },
  methods: {
    updateView () {
      this.$xeselect.updateStatus()
    },
    optionEvent (evnt) {
      this.$xeselect.changeOptionEvent(evnt, this.value)
    },
    mouseenterEvent (evnt) {
      this.$xeselect.currentOptionEvent(evnt, this.value)
    },
    mouseleaveEvent () {
      this.$xeselect.updateCurrentOption(this.value)
    }
  }
}
