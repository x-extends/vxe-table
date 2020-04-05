import { UtilTools, DomTools } from '../../tools'
import GlobalConfig from '../../conf'

const browse = DomTools.browse

export default {
  name: 'VxeSwitch',
  props: {
    value: [String, Number, Boolean],
    disabled: Boolean,
    size: { type: String, default: () => GlobalConfig.switch.size || GlobalConfig.size },
    onLabel: String,
    offLabel: String,
    onValue: { type: [String, Number, Boolean], default: true },
    offValue: { type: [String, Number, Boolean], default: false },
    onIcon: String,
    offIcon: String
  },
  data () {
    return {
      hasAnimat: false,
      offsetLeft: 0
    }
  },
  computed: {
    vSize () {
      return this.size || this.$parent.size || this.$parent.vSize
    },
    isChecked () {
      return this.value === this.onValue
    },
    onShowLabel () {
      return UtilTools.getFuncText(this.onLabel)
    },
    offShowLabel () {
      return UtilTools.getFuncText(this.offLabel)
    },
    styles () {
      return browse.msie && this.isChecked ? {
        left: `${this.offsetLeft}px`
      } : null
    }
  },
  created () {
    if (browse.msie) {
      this.$nextTick(() => this.updateStyle())
    }
  },
  render (h) {
    const { isChecked, vSize, disabled, onIcon, offIcon } = this
    return h('div', {
      class: ['vxe-switch', isChecked ? 'is--on' : 'is--off', {
        [`size--${vSize}`]: vSize,
        'is--disabled': disabled,
        'is--animat': this.hasAnimat
      }]
    }, [
      h('button', {
        ref: 'btn',
        class: 'vxe-switch--button',
        attrs: {
          type: 'button',
          disabled: disabled
        },
        on: {
          click: this.clickEvent
        }
      }, [
        h('span', {
          class: 'vxe-switch--label vxe-switch--label-on'
        }, [
          onIcon ? h('i', {
            class: ['vxe-switch--label-icon', onIcon]
          }) : null,
          this.onShowLabel
        ]),
        h('span', {
          class: 'vxe-switch--label vxe-switch--label-off'
        }, [
          offIcon ? h('i', {
            class: ['vxe-switch--label-icon', offIcon]
          }) : null,
          this.offShowLabel
        ]),
        h('span', {
          class: 'vxe-switch--icon',
          style: this.styles
        })
      ])
    ])
  },
  methods: {
    updateStyle () {
      // 兼容 IE
      this.hasAnimat = true
      this.offsetLeft = this.$refs.btn.offsetWidth
    },
    clickEvent (evnt) {
      if (!this.disabled) {
        clearTimeout(this.activeTimeout)
        const value = this.isChecked ? this.offValue : this.onValue
        this.hasAnimat = true
        if (browse.msie) {
          this.updateStyle()
        }
        this.$emit('input', value)
        this.$emit('change', { value, $event: evnt })
        this.activeTimeout = setTimeout(() => {
          this.hasAnimat = false
        }, 400)
      }
    }
  }
}
