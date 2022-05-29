import { defineComponent, h, provide, PropType, inject } from 'vue'
import XEUtils from 'xe-utils'
import GlobalConfig from '../../v-x-e-table/src/conf'
import { useSize } from '../../hooks/size'

import { VxeRadioGroupPropTypes, VxeRadioGroupConstructor, VxeRadioGroupEmits, VxeRadioGroupPrivateMethods, RadioGroupPrivateMethods, RadioGroupMethods, VxeFormConstructor, VxeFormPrivateMethods, VxeFormDefines } from '../../../types/all'

export default defineComponent({
  name: 'VxeRadioGroup',
  props: {
    modelValue: [String, Number, Boolean] as PropType<VxeRadioGroupPropTypes.ModelValue>,
    disabled: Boolean as PropType<VxeRadioGroupPropTypes.Disabled>,
    strict: { type: Boolean as PropType<VxeRadioGroupPropTypes.Strict>, default: () => GlobalConfig.radio.strict },
    size: { type: String as PropType<VxeRadioGroupPropTypes.Size>, default: () => GlobalConfig.radio.size || GlobalConfig.size }
  },
  emits: [
    'update:modelValue',
    'change'
  ] as VxeRadioGroupEmits,
  setup (props, context) {
    const { slots, emit } = context
    const $xeform = inject<VxeFormConstructor & VxeFormPrivateMethods | null>('$xeform', null)
    const $xeformiteminfo = inject<VxeFormDefines.ProvideItemInfo | null>('$xeformiteminfo', null)

    const xID = XEUtils.uniqueId()

    const $xeradiogroup = {
      xID,
      props,
      context,
      name: XEUtils.uniqueId('xegroup_')
    } as unknown as VxeRadioGroupConstructor & VxeRadioGroupPrivateMethods

    let radioGroupMethods = {} as RadioGroupMethods

    useSize(props)

    const radioGroupPrivateMethods: RadioGroupPrivateMethods = {
      handleChecked (params, evnt) {
        emit('update:modelValue', params.label)
        radioGroupMethods.dispatchEvent('change', params)
        // 自动更新校验状态
        if ($xeform && $xeformiteminfo) {
          $xeform.triggerItemEvent(evnt, $xeformiteminfo.itemConfig.field, params.label)
        }
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
