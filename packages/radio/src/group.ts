import { defineComponent, h, provide, PropType, inject, computed } from 'vue'
import XEUtils from 'xe-utils'
import GlobalConfig from '../../v-x-e-table/src/conf'
import VxeRadioComponent from './radio'
import VxeRadioButtonComponent from './button'
import { useSize } from '../../hooks/size'

import { VxeRadioGroupPropTypes, VxeRadioGroupConstructor, VxeRadioGroupEmits, VxeRadioGroupPrivateMethods, RadioGroupPrivateMethods, RadioGroupMethods, VxeFormConstructor, VxeFormPrivateMethods, VxeFormDefines } from '../../../types/all'

export default defineComponent({
  name: 'VxeRadioGroup',
  props: {
    modelValue: [String, Number, Boolean] as PropType<VxeRadioGroupPropTypes.ModelValue>,
    disabled: Boolean as PropType<VxeRadioGroupPropTypes.Disabled>,
    type: String as PropType<VxeRadioGroupPropTypes.Type>,
    options: Array as PropType<VxeRadioGroupPropTypes.Options>,
    optionProps: Object as PropType<VxeRadioGroupPropTypes.OptionProps>,
    strict: { type: Boolean as PropType<VxeRadioGroupPropTypes.Strict>, default: () => GlobalConfig.radioGroup.strict },
    size: { type: String as PropType<VxeRadioGroupPropTypes.Size>, default: () => GlobalConfig.radioGroup.size || GlobalConfig.size }
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

    const computePropsOpts = computed(() => {
      return props.optionProps || {}
    })

    const computeLabelField = computed(() => {
      const propsOpts = computePropsOpts.value
      return propsOpts.label || 'label'
    })

    const computeValueField = computed(() => {
      const propsOpts = computePropsOpts.value
      return propsOpts.value || 'value'
    })

    const computeDisabledField = computed(() => {
      const propsOpts = computePropsOpts.value
      return propsOpts.disabled || 'disabled'
    })

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
      const { options, type } = props
      const defaultSlot = slots.default
      const valueField = computeValueField.value as 'value'
      const labelField = computeLabelField.value as 'label'
      const disabledField = computeDisabledField.value as 'disabled'
      const btnComp = type === 'button' ? VxeRadioButtonComponent : VxeRadioComponent
      return h('div', {
        class: 'vxe-radio-group'
      }, defaultSlot ? defaultSlot({}) : (options ? options.map(item => {
        return h(btnComp, {
          label: item[valueField],
          content: item[labelField],
          disabled: item[disabledField]
        })
      }) : []))
    }

    Object.assign($xeradiogroup, radioGroupPrivateMethods, {
      renderVN,
      dispatchEvent
    })

    provide('$xeradiogroup', $xeradiogroup)

    return renderVN
  }
})
