import { defineComponent, h, ref, Ref, computed, nextTick, watch, PropType, reactive } from 'vue'
import XEUtils from 'xe-utils/ctor'
import GlobalConfig from '../../conf'
import { UtilTools } from '../../tools'
import { useSize } from '../../hooks/size'

import { SizeType, TextareaReactData, TextareaMethods, VxeTextareaConstructor, VxeTextareaEmits } from '../../../types/vxe-table'

let autoTxtElem: HTMLDivElement

export default defineComponent({
  name: 'VxeTextarea',
  props: {
    modelValue: [String, Number],
    immediate: { type: Boolean, default: true },
    name: String,
    readonly: Boolean,
    disabled: Boolean,
    placeholder: String,
    maxlength: [String, Number],
    rows: { type: [String, Number], default: 2 },
    showWordCount: Boolean,
    autosize: [Boolean, Object],
    form: String,
    resize: { type: String, default: () => GlobalConfig.textarea.resize },
    size: { type: String as PropType<SizeType>, default: () => GlobalConfig.textarea.size || GlobalConfig.size }
  },
  emits: [
    'update:modelValue',
    'input',
    'change',
    'focus',
    'blur'
  ] as VxeTextareaEmits,
  setup (props, context) {
    const { emit } = context

    const xID = XEUtils.uniqueId()

    const computeSize = useSize(props)

    const reactData = reactive({
      inputValue: props.modelValue
    } as TextareaReactData)

    const $xetextarea = {
      xID,
      props,
      context,
      reactData
    } as VxeTextareaConstructor

    const refTextarea = ref() as Ref<HTMLTextAreaElement>

    let textareaMethods = {} as TextareaMethods

    const computeInputCount = computed(() => {
      return XEUtils.getSize(reactData.inputValue)
    })

    const computeIsCountError = computed(() => {
      const inputCount = computeInputCount.value
      return props.maxlength && inputCount > XEUtils.toNumber(props.maxlength)
    })

    const computeSizeOpts = computed(() => {
      return Object.assign({ minRows: 1, maxRows: 10 }, GlobalConfig.textarea.autosize, props.autosize)
    })

    const updateAutoTxt = () => {
      const { size, autosize } = props
      const { inputValue } = reactData
      if (autosize) {
        if (!autoTxtElem) {
          autoTxtElem = document.createElement('div')
        }
        if (!autoTxtElem.parentNode) {
          document.body.appendChild(autoTxtElem)
        }
        const textElem = refTextarea.value
        const textStyle = getComputedStyle(textElem)
        autoTxtElem.className = ['vxe-textarea--autosize', size ? `size--${size}` : ''].join(' ')
        autoTxtElem.style.width = `${textElem.clientWidth}px`
        autoTxtElem.style.padding = textStyle.padding
        autoTxtElem.innerHTML = ('' + (inputValue || '　')).replace(/\n$/, '\n　')
      }
    }

    const handleResize = () => {
      if (props.autosize) {
        nextTick(() => {
          const sizeOpts = computeSizeOpts.value
          const { minRows, maxRows } = sizeOpts
          const textElem = refTextarea.value
          const sizeHeight = autoTxtElem.clientHeight
          const textStyle = getComputedStyle(textElem)
          const lineHeight = XEUtils.toNumber(textStyle.lineHeight)
          const paddingTop = XEUtils.toNumber(textStyle.paddingTop)
          const paddingBottom = XEUtils.toNumber(textStyle.paddingBottom)
          const borderTopWidth = XEUtils.toNumber(textStyle.borderTopWidth)
          const borderBottomWidth = XEUtils.toNumber(textStyle.borderBottomWidth)
          const intervalHeight = paddingTop + paddingBottom + borderTopWidth + borderBottomWidth
          const rowNum = (sizeHeight - intervalHeight) / lineHeight
          const textRows = rowNum && /[0-9]/.test('' + rowNum) ? rowNum : Math.floor(rowNum) + 1
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

    const triggerEvent = (evnt: Event & { type: 'focus' | 'blur' | 'change' }) => {
      const value = reactData.inputValue
      $xetextarea.dispatchEvent(evnt.type, { value }, evnt)
    }

    const emitUpdate = (value: string, evnt: Event) => {
      reactData.inputValue = value
      emit('update:modelValue', value)
      if (XEUtils.toString(props.modelValue) !== value) {
        textareaMethods.dispatchEvent('change', { value }, evnt)
      }
    }

    const inputEvent = (evnt: InputEvent) => {
      const { immediate } = props
      const textElem = evnt.target as HTMLTextAreaElement
      const value = textElem.value
      reactData.inputValue = value
      if (immediate) {
        emitUpdate(value, evnt)
      }
      $xetextarea.dispatchEvent('input', { value }, evnt)
      handleResize()
    }

    const changeEvent = (evnt: Event & { type: 'change' }) => {
      const { immediate } = props
      if (immediate) {
        triggerEvent(evnt)
      } else {
        emitUpdate(reactData.inputValue, evnt)
      }
    }

    const blurEvent = (evnt: Event & { type: 'blur' }) => {
      const { immediate } = props
      const { inputValue } = reactData
      if (!immediate) {
        emitUpdate(inputValue, evnt)
      }
      $xetextarea.dispatchEvent('blur', { value: inputValue }, evnt)
    }

    textareaMethods = {
      dispatchEvent (type, params, evnt) {
        emit(type, Object.assign({ $textarea: $xetextarea, $event: evnt }, params))
      },

      focus () {
        const textElem = refTextarea.value
        textElem.focus()
        return nextTick()
      },

      blur () {
        const textElem = refTextarea.value
        textElem.blur()
        return nextTick()
      }
    }

    Object.assign($xetextarea, textareaMethods)

    watch(() => props.modelValue, (val) => {
      reactData.inputValue = val
      updateAutoTxt()
    })

    nextTick(() => {
      const { inputValue } = reactData
      if (inputValue) {
        updateAutoTxt()
        handleResize()
      }
    })

    const renderVN = () => {
      const { resize, placeholder, disabled, maxlength, autosize, showWordCount } = props
      const { inputValue } = reactData
      const vSize = computeSize.value
      const isCountError = computeIsCountError.value
      const inputCount = computeInputCount.value
      return h('div', {
        class: ['vxe-textarea', {
          [`size--${vSize}`]: vSize,
          'is--autosize': autosize,
          'is--disabled': disabled
        }]
      }, [
        h('textarea', {
          ref: refTextarea,
          class: 'vxe-textarea--inner',
          value: inputValue,
          name: props.name,
          placeholder: placeholder ? UtilTools.getFuncText(placeholder) : null,
          maxlength,
          readonly: props.readonly,
          disabled,
          style: resize ? {
            resize
          } : null,
          onInput: inputEvent,
          onChange: changeEvent,
          onFocus: triggerEvent,
          onBlur: blurEvent
        }),
        showWordCount ? h('span', {
          class: ['vxe-textarea--count', {
            'is--error': isCountError
          }]
        }, `${inputCount}${maxlength ? `/${maxlength}` : ''}`) : null
      ])
    }

    $xetextarea.renderVN = renderVN

    return $xetextarea
  },
  render () {
    return this.renderVN()
  }
})
