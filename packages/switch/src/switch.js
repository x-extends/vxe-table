import { UtilTools } from '../../tools'
import GlobalConfig from '../../v-x-e-table/src/conf'
import vSize from '../../mixins/size'
import { browse } from '../../tools/src/dom'

export default {
  name: 'VxeSwitch',
  mixins: [vSize],
  props: {
    value: [String, Number, Boolean],
    disabled: Boolean,
    className: String,
    size: { type: String, default: () => GlobalConfig.switch.size || GlobalConfig.size },
    openLabel: String,
    closeLabel: String,
    openValue: { type: [String, Number, Boolean], default: true },
    closeValue: { type: [String, Number, Boolean], default: false },
    openIcon: String,
    closeIcon: String
  },
  data () {
    return {
      isActivated: false,
      hasAnimat: false,
      offsetLeft: 0
    }
  },
  computed: {
    isChecked () {
      return this.value === this.openValue
    },
    onShowLabel () {
      return UtilTools.getFuncText(this.openLabel)
    },
    offShowLabel () {
      return UtilTools.getFuncText(this.closeLabel)
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
    const { isChecked, vSize, className, disabled, openIcon, closeIcon } = this
    return h('div', {
      class: ['vxe-switch', className, isChecked ? 'is--on' : 'is--off', {
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
          click: this.clickEvent,
          focus: this.focusEvent,
          blur: this.blurEvent
        }
      }, [
        h('span', {
          class: 'vxe-switch--label vxe-switch--label-on'
        }, [
          openIcon ? h('i', {
            class: ['vxe-switch--label-icon', openIcon]
          }) : null,
          this.onShowLabel
        ]),
        h('span', {
          class: 'vxe-switch--label vxe-switch--label-off'
        }, [
          closeIcon ? h('i', {
            class: ['vxe-switch--label-icon', closeIcon]
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
        const value = this.isChecked ? this.closeValue : this.openValue
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
    },
    focusEvent (evnt) {
      this.isActivated = true
      this.$emit('focus', { value: this.value, $event: evnt })
    },
    blurEvent (evnt) {
      this.isActivated = false
      this.$emit('blur', { value: this.value, $event: evnt })
    }
  }
}
