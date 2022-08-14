import { defineComponent, h, computed, inject, PropType } from 'vue'
import XEUtils from 'xe-utils'
import { getFuncText } from '../../tools/utils'
import GlobalConfig from '../../v-x-e-table/src/conf'
import { useSize } from '../../hooks/size'

import { VxeRadioButtonPropTypes, VxeRadioGroupConstructor, VxeRadioButtonConstructor, VxeRadioButtonEmits, VxeRadioGroupPrivateMethods, RadioButtonMethods, VxeFormConstructor, VxeFormPrivateMethods, VxeFormDefines } from '../../../types/all'

export default defineComponent({
  name: 'VxeRadioButton',
  props: {
    modelValue: [String, Number, Boolean] as PropType<VxeRadioButtonPropTypes.ModelValue>,
    label: { type: [String, Number, Boolean] as PropType<VxeRadioButtonPropTypes.Label>, default: null },
    title: [String, Number] as PropType<VxeRadioButtonPropTypes.Title>,
    content: [String, Number] as PropType<VxeRadioButtonPropTypes.Content>,
    disabled: Boolean as PropType<VxeRadioButtonPropTypes.Disabled>,
    strict: { type: Boolean as PropType<VxeRadioButtonPropTypes.Strict>, default: () => GlobalConfig.radioButton.strict },
    size: { type: String as PropType<VxeRadioButtonPropTypes.Size>, default: () => GlobalConfig.radioButton.size || GlobalConfig.size }
  },
  emits: [
    'update:modelValue',
    'change'
  ] as VxeRadioButtonEmits,
  setup (props, context) {
    const { slots, emit } = context
    const $xeform = inject<VxeFormConstructor & VxeFormPrivateMethods | null>('$xeform', null)
    const $xeformiteminfo = inject<VxeFormDefines.ProvideItemInfo | null>('$xeformiteminfo', null)

    const xID = XEUtils.uniqueId()

    const computeSize = useSize(props)

    const $xeradiobutton = {
      xID,
      props,
      context
    } as unknown as VxeRadioButtonConstructor

    let radioButtonMethods = {} as RadioButtonMethods

    const $xeradiogroup = inject('$xeradiogroup', null as (VxeRadioGroupConstructor & VxeRadioGroupPrivateMethods) | null)

    const computeDisabled = computed(() => {
      return props.disabled || ($xeradiogroup && $xeradiogroup.props.disabled)
    })

    const computeName = computed(() => {
      return $xeradiogroup ? $xeradiogroup.name : null
    })

    const computeStrict = computed(() => {
      return $xeradiogroup ? $xeradiogroup.props.strict : props.strict
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

    const handleValue = (label: VxeRadioButtonPropTypes.Label, evnt: Event) => {
      if ($xeradiogroup) {
        $xeradiogroup.handleChecked({ label }, evnt)
      } else {
        emit('update:modelValue', label)
        radioButtonMethods.dispatchEvent('change', { label }, evnt)
        // 自动更新校验状态
        if ($xeform && $xeformiteminfo) {
          $xeform.triggerItemEvent(evnt, $xeformiteminfo.itemConfig.field, label)
        }
      }
    }

    const changeEvent = (evnt: Event) => {
      const isDisabled = computeDisabled.value
      if (!isDisabled) {
        handleValue(props.label, evnt)
      }
    }

    const clickEvent = (evnt: Event) => {
      const isDisabled = computeDisabled.value
      const isStrict = computeStrict.value
      if (!isDisabled && !isStrict) {
        if (props.label === ($xeradiogroup ? $xeradiogroup.props.modelValue : props.modelValue)) {
          handleValue(null, evnt)
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
          onChange: changeEvent,
          onClick: clickEvent
        }),
        h('span', {
          class: 'vxe-radio--label'
        }, slots.default ? slots.default({}) : getFuncText(props.content))
      ])
    }

    Object.assign($xeradiobutton, {
      renderVN,
      dispatchEvent
    })

    return renderVN
  }
})
