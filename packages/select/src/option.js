import { getOptUniqueId } from './util'
import { UtilTools } from '../../tools'

const watch = {}
const wProps = ['value', 'label', 'disabled']
wProps.forEach(name => {
  watch[name] = function () {
    this.$xeselect.updateOptions()
  }
})

export default {
  name: 'VxeOption',
  props: {
    value: null,
    label: { type: [String, Number, Boolean], default: '' },
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
      id: getOptUniqueId()
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
  watch,
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
        'data-optid': id
      },
      on: {
        click: this.optionEvent,
        mouseenter: this.opeionMouseenterEvent
      }
    }, $slots.default || UtilTools.formatText(UtilTools.getFuncText(this.label)))
  },
  methods: {
    optionEvent (evnt) {
      if (!this.isDisabled) {
        this.$xeselect.changeOptionEvent(evnt, this.value)
      }
    },
    opeionMouseenterEvent () {
      if (!this.isDisabled) {
        this.$xeselect.setCurrentOption(this)
      }
    }
  }
}
