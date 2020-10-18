import { UtilTools, DomTools } from '../../tools'
import GlobalConfig from '../../conf'

const browse = DomTools.browse

export default {
  name: 'VxeSwitch',
  props: {
    value: [String, Number, Boolean],
    disabled: Boolean,
    size: { type: String, default: () => GlobalConfig.switch.size || GlobalConfig.size },
    openLabel: String,
    closeLabel: String,
    openValue: { type: [String, Number, Boolean], default: true },
    closeValue: { type: [String, Number, Boolean], default: false },
    openIcon: String,
    closeIcon: String,

    // 在 v3 中废弃 onLabel、offLabel、onValue、offValue、onIcon、offIcon
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
      return this.value === (this.openValue || this.onValue)
    },
    onShowLabel () {
      return UtilTools.getFuncText(this.openLabel || this.onLabel)
    },
    offShowLabel () {
      return UtilTools.getFuncText(this.closeLabel || this.offLabel)
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
    const { isChecked, vSize, disabled, openIcon, onIcon, closeIcon, offIcon } = this
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
          (openIcon || onIcon) ? h('i', {
            class: ['vxe-switch--label-icon', openIcon || onIcon]
          }) : null,
          this.onShowLabel
        ]),
        h('span', {
          class: 'vxe-switch--label vxe-switch--label-off'
        }, [
          (closeIcon || offIcon) ? h('i', {
            class: ['vxe-switch--label-icon', closeIcon || offIcon]
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
        const value = this.isChecked ? (this.closeValue || this.offValue) : (this.openValue || this.onValue)
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
