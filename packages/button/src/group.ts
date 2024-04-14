import { defineComponent, h, provide, PropType } from 'vue'
import GlobalConfig from '../../v-x-e-table/src/conf'
import XEUtils from 'xe-utils'
import VxeButtonComponent from './button'
import { useSize } from '../../hooks/size'

import { VxeButtonGroupPropTypes, VxeButtonGroupEmits, VxeButtonGroupConstructor, VxeButtonGroupPrivateMethods, ButtonGroupMethods, ButtonPrivateComputed, ButtonGroupPrivateMethods } from '../../../types/all'

export default defineComponent({
  name: 'VxeButtonGroup',
  props: {
    options: Array as PropType<VxeButtonGroupPropTypes.Options>,
    disabled: Boolean as PropType<VxeButtonGroupPropTypes.Disabled>,
    size: { type: String as PropType<VxeButtonGroupPropTypes.Size>, default: () => GlobalConfig.buttonGroup.size || GlobalConfig.size }
  },
  emits: [
    'click'
  ] as VxeButtonGroupEmits,
  setup (props, context) {
    const { slots, emit } = context

    const xID = XEUtils.uniqueId()

    const computeMaps: ButtonPrivateComputed = {}

    const $xebuttongroup = {
      xID,
      props,
      context,

      getComputeMaps: () => computeMaps
    } as unknown as VxeButtonGroupConstructor & VxeButtonGroupPrivateMethods

    useSize(props)

    const buttonGroupMethods: ButtonGroupMethods = {
      dispatchEvent (type, params, evnt) {
        emit(type, Object.assign({ $buttonGroup: $xebuttongroup, $event: evnt }, params))
      }
    }

    const buttonGroupPrivateMethods: ButtonGroupPrivateMethods = {
      handleClick (params, evnt) {
        const { name } = params
        const option = props.options ? props.options.find(item => item.name === name) : null
        buttonGroupMethods.dispatchEvent('click', { ...params, option }, evnt)
      }
    }

    Object.assign($xebuttongroup, buttonGroupMethods, buttonGroupPrivateMethods)

    const renderVN = () => {
      const { options } = props
      const defaultSlot = slots.default
      return h('div', {
        class: 'vxe-button-group'
      }, defaultSlot ? defaultSlot({}) : (options ? options.map(item => {
        return h(VxeButtonComponent, item)
      }) : []))
    }

    $xebuttongroup.renderVN = renderVN

    provide('$xebuttongroup', $xebuttongroup)

    return renderVN
  }
})
