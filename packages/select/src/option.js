import { UtilTools } from '../../tools'

let optionUniqueId = 0

export default {
  name: 'VxeOption',
  props: {
    value: [String, Number],
    label: [String, Number],
    size: String
  },
  inject: {
    $xeselect: {
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
    }
  },
  mounted () {
    this.$xeselect.updateStatus()
  },
  destroyed () {
    this.$xeselect.updateStatus()
  },
  render (h) {
    const { $xeselect, id, value } = this
    return h('div', {
      class: ['vxe-select-option', {
        'is--active': $xeselect.value === value,
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
