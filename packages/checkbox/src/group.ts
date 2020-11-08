import { defineComponent, h, provide, PropType } from 'vue'
import GlobalConfig from '../../conf'
import XEUtils from 'xe-utils/ctor'
import { useSize } from '../../hooks/size'

import { SizeType, VxeCheckboxGroupConstructor, VxeCheckboxGroupEmits, VxeCheckboxGroupPrivateMethods, CheckboxGroupPrivateMethods, CheckboxGroupMethods } from '../../../types/vxe-table'

export default defineComponent({
  name: 'VxeCheckboxGroup',
  props: {
    modelValue: Array as PropType<any[]>,
    disabled: Boolean,
    size: { type: String as PropType<SizeType>, default: () => GlobalConfig.checkbox.size || GlobalConfig.size }
  },
  emits: [
    'update:modelValue',
    'change'
  ] as VxeCheckboxGroupEmits,
  setup (props, context) {
    const { slots, emit } = context

    const xID = XEUtils.uniqueId()

    const $xecheckboxgroup = {
      xID,
      props,
      context
    } as VxeCheckboxGroupConstructor & VxeCheckboxGroupPrivateMethods

    useSize(props)

    const checkboxGroupMethods: CheckboxGroupMethods = {
      dispatchEvent (type, params, evnt) {
        emit(type, Object.assign({ $checkboxGroup: $xecheckboxgroup, $event: evnt }, params))
      }
    }

    const checkboxGroupPrivateMethods: CheckboxGroupPrivateMethods = {
      handleChecked (params, evnt) {
        const { checked, label } = params
        const checklist = props.modelValue || []
        const checkIndex = checklist.indexOf(label)
        if (checked) {
          if (checkIndex === -1) {
            checklist.push(label)
          }
        } else {
          checklist.splice(checkIndex, 1)
        }
        emit('update:modelValue', checklist)
        $xecheckboxgroup.dispatchEvent('change', Object.assign({ checklist }, params), evnt)
      }
    }

    Object.assign($xecheckboxgroup, checkboxGroupMethods, checkboxGroupPrivateMethods)

    const renderVN = () => {
      return h('div', {
        class: 'vxe-checkbox-group'
      }, slots.default ? slots.default({}) : [])
    }

    $xecheckboxgroup.renderVN = renderVN

    provide('$xecheckboxgroup', $xecheckboxgroup)

    return renderVN
  }
})
