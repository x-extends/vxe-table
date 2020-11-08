import { defineComponent, h, provide, PropType } from 'vue'
import XEUtils from 'xe-utils/ctor'
import GlobalConfig from '../../conf'
import { useSize } from '../../hooks/size'

import { SizeType, VxeRadioGroupConstructor, VxeRadioGroupEmits, VxeRadioGroupPrivateMethods, RadioGroupPrivateMethods, RadioGroupMethods } from '../../../types/vxe-table'

export default defineComponent({
  name: 'VxeRadioGroup',
  props: {
    modelValue: [String, Number, Boolean],
    disabled: Boolean,
    size: { type: String as PropType<SizeType>, default: () => GlobalConfig.radio.size || GlobalConfig.size }
  },
  emits: [
    'update:modelValue',
    'change'
  ] as VxeRadioGroupEmits,
  setup (props, context) {
    const { slots, emit } = context

    const xID = XEUtils.uniqueId()

    const $xeradiogroup = {
      xID,
      props,
      context,
      name: XEUtils.uniqueId('xegroup_')
    } as VxeRadioGroupConstructor & VxeRadioGroupPrivateMethods

    let radioGroupMethods = {} as RadioGroupMethods

    useSize(props)

    const radioGroupPrivateMethods: RadioGroupPrivateMethods = {
      handleChecked (params) {
        emit('update:modelValue', params.label)
        radioGroupMethods.dispatchEvent('change', params)
      }
    }

    radioGroupMethods = {
      dispatchEvent (type, params, evnt) {
        emit(type, Object.assign({ $radioGroup: $xeradiogroup, $event: evnt }, params))
      }
    }

    const renderVN = () => {
      return h('div', {
        class: 'vxe-radio-group'
      }, slots.default ? slots.default({}) : [])
    }

    Object.assign($xeradiogroup, radioGroupPrivateMethods, {
      renderVN,
      dispatchEvent
    })

    provide('$xeradiogroup', $xeradiogroup)

    return renderVN
  }
})
