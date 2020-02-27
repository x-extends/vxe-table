import XEUtils from 'xe-utils/methods/xe-utils'
import { UtilTools } from '../../tools'

export default {
  name: 'VxeTextarea',
  props: {
    value: [String, Number],
    name: String,
    readonly: Boolean,
    disabled: Boolean,
    placeholder: String,
    maxlength: [String, Number],
    rows: { type: [String, Number], default: 2 },
    form: String,
    size: String
  },
  computed: {
    vSize () {
      return this.size || this.$parent.size || this.$parent.vSize
    },
    defaultEvents () {
      const evnts = {}
      XEUtils.each(this.$listeners, (cb, name) => {
        evnts[name] = this.triggerEvent
      })
      evnts.input = this.inputEvent
      return evnts
    }
  },
  render (h) {
    const { defaultEvents, value, vSize, name, form, placeholder, readonly, disabled, maxlength } = this
    const attrs = {
      name,
      form,
      placeholder,
      maxlength,
      readonly,
      disabled
    }
    if (placeholder) {
      attrs.placeholder = UtilTools.getFuncText(placeholder)
    }
    return h('div', {
      class: ['vxe-textarea', {
        [`size--${vSize}`]: vSize,
        'is--disabled': disabled
      }]
    }, [
      h('textarea', {
        ref: 'textarea',
        class: 'vxe-textarea--inner',
        domProps: {
          value
        },
        attrs,
        on: defaultEvents
      })
    ])
  },
  methods: {
    focus () {
      this.$refs.textarea.focus()
      return this.$nextTick()
    },
    blur () {
      this.$refs.textarea.blur()
      return this.$nextTick()
    },
    emitUpdate (value) {
      this.$emit('input', value)
    },
    inputEvent (evnt) {
      this.emitUpdate(evnt.target.value)
    }
  }
}
