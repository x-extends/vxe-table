import XEUtils from 'xe-utils'
import GlobalConfig from '../../v-x-e-table/src/conf'
import vSize from '../../mixins/size'
import { UtilTools } from '../../tools'

let autoTxtElem

export default {
  name: 'VxeTextarea',
  mixins: [vSize],
  model: {
    prop: 'value',
    event: 'modelValue'
  },
  props: {
    value: [String, Number],
    immediate: { type: Boolean, default: true },
    name: String,
    readonly: Boolean,
    disabled: Boolean,
    placeholder: String,
    maxlength: [String, Number],
    rows: { type: [String, Number], default: 2 },
    cols: { type: [String, Number], default: null },
    showWordCount: Boolean,
    countMethod: Function,
    autosize: [Boolean, Object],
    form: String,
    resize: { type: String, default: () => GlobalConfig.textarea.resize },
    className: String,
    size: { type: String, default: () => GlobalConfig.textarea.size || GlobalConfig.size }
  },
  data () {
    return {
      inputValue: this.value
    }
  },
  computed: {
    inputCount () {
      return XEUtils.getSize(this.inputValue)
    },
    isCountError () {
      return this.maxlength && this.inputCount > XEUtils.toNumber(this.maxlength)
    },
    defaultEvents () {
      const evnts = {}
      XEUtils.each(this.$listeners, (cb, name) => {
        if (['input', 'change', 'blur'].indexOf(name) === -1) {
          evnts[name] = this.triggerEvent
        }
      })
      evnts.input = this.inputEvent
      evnts.change = this.changeEvent
      evnts.blur = this.blurEvent
      return evnts
    },
    sizeOpts () {
      return Object.assign({ minRows: 1, maxRows: 10 }, GlobalConfig.textarea.autosize, this.autosize)
    }
  },
  watch: {
    value (val) {
      this.inputValue = val
      this.updateAutoTxt()
    }
  },
  mounted () {
    const { autosize } = this
    if (autosize) {
      this.updateAutoTxt()
      this.handleResize()
    }
  },
  render (h) {
    const { className, defaultEvents, inputValue, vSize, name, form, resize, placeholder, readonly, disabled, maxlength, autosize, showWordCount, countMethod, rows, cols } = this
    const attrs = {
      name,
      form,
      placeholder,
      maxlength,
      readonly,
      disabled,
      rows,
      cols
    }
    if (placeholder) {
      attrs.placeholder = UtilTools.getFuncText(placeholder)
    }
    return h('div', {
      class: ['vxe-textarea', className, {
        [`size--${vSize}`]: vSize,
        'is--autosize': autosize,
        'is--disabled': disabled,
        'def--rows': !XEUtils.eqNull(rows),
        'def--cols': !XEUtils.eqNull(cols)
      }]
    }, [
      h('textarea', {
        ref: 'textarea',
        class: 'vxe-textarea--inner',
        domProps: {
          value: inputValue
        },
        attrs,
        style: resize ? {
          resize
        } : null,
        on: defaultEvents
      }),
      showWordCount ? h('span', {
        class: ['vxe-textarea--count', {
          'is--error': this.isCountError
        }]
      }, countMethod ? `${countMethod({ value: inputValue })}` : `${this.inputCount}${maxlength ? `/${maxlength}` : ''}`) : null
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
    triggerEvent (evnt) {
      const { inputValue } = this
      this.$emit(evnt.type, { value: inputValue, $event: evnt })
    },
    emitUpdate (value, evnt) {
      this.inputValue = value
      this.$emit('modelValue', value)
      if (this.value !== value) {
        this.$emit('change', { value, $event: evnt })
      }
    },
    inputEvent (evnt) {
      const { immediate } = this
      const value = evnt.target.value
      this.inputValue = value
      if (immediate) {
        this.emitUpdate(value, evnt)
      }
      this.handleResize()
      this.triggerEvent(evnt)
    },
    changeEvent (evnt) {
      const { immediate } = this
      if (immediate) {
        this.triggerEvent(evnt)
      } else {
        this.emitUpdate(this.inputValue, evnt)
      }
    },
    blurEvent (evnt) {
      const { inputValue, immediate } = this
      if (!immediate) {
        this.emitUpdate(inputValue, evnt)
      }
      this.$emit('blur', { value: inputValue, $event: evnt })
    },
    updateAutoTxt () {
      const { $refs, inputValue, size, autosize } = this
      if (autosize) {
        if (!autoTxtElem) {
          autoTxtElem = document.createElement('div')
        }
        if (!autoTxtElem.parentNode) {
          document.body.appendChild(autoTxtElem)
        }
        const textElem = $refs.textarea
        const textStyle = getComputedStyle(textElem)
        autoTxtElem.className = ['vxe-textarea--autosize', size ? `size--${size}` : ''].join(' ')
        autoTxtElem.style.width = `${textElem.clientWidth}px`
        autoTxtElem.style.padding = textStyle.padding
        autoTxtElem.innerHTML = ('' + (inputValue || '　')).replace(/\n$/, '\n　')
      }
    },
    handleResize () {
      if (this.autosize) {
        this.$nextTick(() => {
          const { $refs, sizeOpts } = this
          const { minRows, maxRows } = sizeOpts
          const textElem = $refs.textarea
          const sizeHeight = autoTxtElem.clientHeight
          const textStyle = getComputedStyle(textElem)
          const lineHeight = XEUtils.toNumber(textStyle.lineHeight)
          const paddingTop = XEUtils.toNumber(textStyle.paddingTop)
          const paddingBottom = XEUtils.toNumber(textStyle.paddingBottom)
          const borderTopWidth = XEUtils.toNumber(textStyle.borderTopWidth)
          const borderBottomWidth = XEUtils.toNumber(textStyle.borderBottomWidth)
          const intervalHeight = paddingTop + paddingBottom + borderTopWidth + borderBottomWidth
          const rowNum = (sizeHeight - intervalHeight) / lineHeight
          const textRows = rowNum && /[0-9]/.test(rowNum) ? rowNum : Math.floor(rowNum) + 1
          let vaildRows = textRows
          if (textRows < minRows) {
            vaildRows = minRows
          } else if (textRows > maxRows) {
            vaildRows = maxRows
          }
          textElem.style.height = `${(vaildRows * lineHeight) + intervalHeight}px`
        })
      }
    }
  }
}
