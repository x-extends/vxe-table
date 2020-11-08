import { defineComponent, h, computed, inject, PropType } from 'vue'
import XEUtils from 'xe-utils/ctor'
import { UtilTools } from '../../tools'
import GlobalConfig from '../../conf'
import { useSize } from '../../hooks/size'

import { SizeType, VxeRadioGroupConstructor, VxeRadioButtonConstructor, VxeRadioButtonEmits, VxeRadioGroupPrivateMethods, RadioButtonMethods } from '../../../types/vxe-table'

export default defineComponent({
  name: 'VxeRadioButton',
  props: {
    modelValue: [String, Number, Boolean],
    label: { type: [String, Number, Boolean], default: null },
    title: [String, Number],
    content: [String, Number],
    disabled: Boolean,
    size: { type: String as PropType<SizeType>, default: () => GlobalConfig.radio.size || GlobalConfig.size }
  },
  emits: [
    'update:modelValue',
    'change'
  ] as VxeRadioButtonEmits,
  setup (props, context) {
    const { slots, emit } = context

    const xID = XEUtils.uniqueId()

    const computeSize = useSize(props)

    const $xeradiobutton = {
      xID,
      props,
      context
    } as VxeRadioButtonConstructor

    let radioButtonMethods = {} as RadioButtonMethods

    const $xeradiogroup = inject('$xeradiogroup', null as (VxeRadioGroupConstructor & VxeRadioGroupPrivateMethods) | null)

    const computeDisabled = computed(() => {
      return props.disabled || ($xeradiogroup && $xeradiogroup.props.disabled)
    })

    const computeName = computed(() => {
      return $xeradiogroup ? $xeradiogroup.name : null
    })

    const computeChecked = computed(() => {
      const { modelValue, label } = props
      return $xeradiogroup ? $xeradiogroup.props.modelValue === label : modelValue === label
    })

    radioButtonMethods = {
      dispatchEvent (type, params, evnt) {
        emit(type, Object.assign({ $radioButton: $xeradiobutton, $event: evnt }, params))
      }
    }

    Object.assign($xeradiobutton, radioButtonMethods)

    const changeEvent = (evnt: Event) => {
      const { label } = props
      const isDisabled = computeDisabled.value
      if (!isDisabled) {
        if ($xeradiogroup) {
          $xeradiogroup.handleChecked({ label }, evnt)
        } else {
          emit('update:modelValue', label)
          radioButtonMethods.dispatchEvent('change', { label }, evnt)
        }
      }
    }

    const renderVN = () => {
      const vSize = computeSize.value
      const isDisabled = computeDisabled.value
      const name = computeName.value
      const checked = computeChecked.value
      return h('label', {
        class: ['vxe-radio', 'vxe-radio-button', {
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
          class: 'vxe-radio--label'
        }, slots.default ? slots.default({}) : UtilTools.getFuncText(props.content))
      ])
    }

    Object.assign($xeradiobutton, {
      renderVN,
      dispatchEvent
    })

    return renderVN
  }
})
