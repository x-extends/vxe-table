import { defineComponent, h, provide, PropType } from 'vue'
import XEUtils from 'xe-utils'
import GlobalConfig from '../../v-x-e-table/src/conf'
import { useSize } from '../../hooks/size'

import { VxeRadioGroupPropTypes, VxeRadioGroupConstructor, VxeRadioGroupEmits, VxeRadioGroupPrivateMethods, RadioGroupPrivateMethods, RadioGroupMethods } from '../../../types/all'

export default defineComponent({
  name: 'VxeRadioGroup',
  props: {
    modelValue: [String, Number, Boolean] as PropType<VxeRadioGroupPropTypes.ModelValue>,
    disabled: Boolean as PropType<VxeRadioGroupPropTypes.Disabled>,
    size: { type: String as PropType<VxeRadioGroupPropTypes.Size>, default: () => GlobalConfig.radio.size || GlobalConfig.size }
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
