export default {
  name: 'VxeSwitch',
  props: {
    value: [String, Number, Boolean],
    disabled: Boolean,
    size: String,
    onLabel: String,
    offLabel: String,
    onValue: { type: [String, Number, Boolean], default: true },
    offValue: { type: [String, Number, Boolean], default: false }
  },
  data () {
    return {
      hasAnimat: false
    }
  },
  computed: {
    vSize () {
      return this.size || this.$parent.size || this.$parent.vSize
    }
  },
  render (h) {
    const { vSize, disabled } = this
    const isChecked = this.value === this.onValue
    return h('div', {
      class: ['vxe-switch', isChecked ? 'is--on' : 'is--off', {
        [`size--${vSize}`]: vSize,
        'is--disabled': disabled,
        'is--animat': this.hasAnimat
      }]
    }, [
      h('button', {
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
          class: 'vxe-switch--label'
        }, isChecked ? this.onLabel : this.offLabel),
        h('span', {
          class: 'vxe-switch--icon'
        })
      ])
    ])
  },
  methods: {
    clickEvent (evnt) {
      if (!this.disabled) {
        clearTimeout(this.activeTimeout)
        this.hasAnimat = true
        const value = this.value === this.onValue ? this.offValue : this.onValue
        this.$emit('input', value)
        this.$emit('change', { value, $event: evnt })
        this.activeTimeout = setTimeout(() => {
          this.hasAnimat = false
        }, 400)
      }
    }
  }
}
