import { defineComponent, h, computed, inject, PropType } from 'vue'
import XEUtils from 'xe-utils/ctor'
import { UtilTools } from '../../tools'
import GlobalConfig from '../../conf'
import { useSize } from '../../hooks/size'

import { SizeType, VxeRadioConstructor, VxeRadioEmits, VxeRadioGroupConstructor, VxeRadioGroupPrivateMethods, RadioMethods } from '../../../types/vxe-table'

export default defineComponent({
  name: 'VxeRadio',
  props: {
    modelValue: [String, Number, Boolean],
    label: { type: [String, Number, Boolean], default: null },
    title: [String, Number],
    content: [String, Number],
    disabled: Boolean,
    name: String,
    size: { type: String as PropType<SizeType>, default: () => GlobalConfig.radio.size || GlobalConfig.size }
  },
  emits: [
    'update:modelValue',
    'change'
  ] as VxeRadioEmits,
  setup (props, context) {
    const { slots, emit } = context

    const xID = XEUtils.uniqueId()

    const $xeradio = {
      xID,
      props,
      context
    } as VxeRadioConstructor

    const computeSize = useSize(props)

    const $xeradiogroup = inject('$xeradiogroup', null as (VxeRadioGroupConstructor & VxeRadioGroupPrivateMethods) | null)

    let radioMethods = {} as RadioMethods

    const computeDisabled = computed(() => {
      return props.disabled || ($xeradiogroup && $xeradiogroup.props.disabled)
    })

    const computeName = computed(() => {
      return $xeradiogroup ? $xeradiogroup.name : props.name
    })

    const computeChecked = computed(() => {
      const { modelValue, label } = props
      return $xeradiogroup ? $xeradiogroup.props.modelValue === label : modelValue === label
    })

    const changeEvent = (evnt: Event) => {
      const { label } = props
      const isDisabled = computeDisabled.value
      if (!isDisabled) {
        if ($xeradiogroup) {
          $xeradiogroup.handleChecked({ label }, evnt)
        } else {
          emit('update:modelValue', label)
          radioMethods.dispatchEvent('change', { label }, evnt)
        }
      }
    }

    radioMethods = {
      dispatchEvent (type, params, evnt) {
        emit(type, Object.assign({ $radio: $xeradio, $event: evnt }, params))
      }
    }

    Object.assign($xeradio, radioMethods)

    const renderVN = () => {
      const vSize = computeSize.value
      const isDisabled = computeDisabled.value
      const name = computeName.value
      const checked = computeChecked.value
      return h('label', {
        class: ['vxe-radio', {
          [`size--${vSize}`]: vSize,
          'is--disabled': isDisabled
        }],
        title: props.title
      }, [
        h('input', {
          class: 'vxe-radio--input',
          type: 'radio',
          name,
          checked,
          disabled: isDisabled,
          onChange: changeEvent
        }),
        h('span', {
          class: 'vxe-radio--icon'
        }),
        h('span', {
          class: 'vxe-radio--label'
        }, slots.default ? slots.default({}) : UtilTools.getFuncText(props.content))
      ])
    }

    $xeradio.renderVN = renderVN

    return $xeradio
  },
  render () {
    return this.renderVN()
  }
})
