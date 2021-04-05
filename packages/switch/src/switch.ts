import { defineComponent, h, ref, Ref, computed, reactive, nextTick, createCommentVNode, PropType } from 'vue'
import XEUtils from 'xe-utils'
import GlobalConfig from '../../v-x-e-table/src/conf'
import { useSize } from '../../hooks/size'
import { getFuncText } from '../../tools/utils'

import { VxeSwitchPropTypes, VxeSwitchConstructor, VxeSwitchEmits, SwitchReactData, SwitchMethods } from '../../../types/all'

export default defineComponent({
  name: 'VxeSwitch',
  props: {
    modelValue: [String, Number, Boolean] as PropType<VxeSwitchPropTypes.ModelValue>,
    disabled: Boolean as PropType<VxeSwitchPropTypes.Disabled>,
    size: { type: String as PropType<VxeSwitchPropTypes.Size>, default: () => GlobalConfig.switch.size || GlobalConfig.size },
    openLabel: String as PropType<VxeSwitchPropTypes.OpenLabel>,
    closeLabel: String as PropType<VxeSwitchPropTypes.CloseLabel>,
    openValue: { type: [String, Number, Boolean] as PropType<VxeSwitchPropTypes.OpenValue>, default: true },
    closeValue: { type: [String, Number, Boolean] as PropType<VxeSwitchPropTypes.CloseValue>, default: false },
    openIcon: String as PropType<VxeSwitchPropTypes.OpenIcon>,
    closeIcon: String as PropType<VxeSwitchPropTypes.CloseIcon>
  },
  emits: [
    'update:modelValue',
    'change',
    'focus',
    'blur'
  ] as VxeSwitchEmits,
  setup (props, context) {
    const { emit } = context

    const xID = XEUtils.uniqueId()

    const computeSize = useSize(props)

    const reactData = reactive({
      isActivated: false,
      hasAnimat: false,
      offsetLeft: 0
    } as SwitchReactData)

    const $xeswitch = {
      xID,
      props,
      context,
      reactData
    } as VxeSwitchConstructor

    const refButton = ref() as Ref<HTMLButtonElement>

    let switchMethods = {} as SwitchMethods

    const computeOnShowLabel = computed(() => {
      return getFuncText(props.openLabel)
    })

    const computeOffShowLabel = computed(() => {
      return getFuncText(props.closeLabel)
    })

    const computeIsChecked = computed(() => {
      return props.modelValue === props.openValue
    })

    let _atimeout: any
    const clickEvent = (evnt: Event) => {
      if (!props.disabled) {
        const isChecked = computeIsChecked.value
        clearTimeout(_atimeout)
        const value = isChecked ? props.closeValue : props.openValue
        reactData.hasAnimat = true
        emit('update:modelValue', value)
        switchMethods.dispatchEvent('change', { value }, evnt)
        _atimeout = setTimeout(() => {
          reactData.hasAnimat = false
        }, 400)
      }
    }

    const focusEvent = (evnt: Event) => {
      reactData.isActivated = true
      switchMethods.dispatchEvent('focus', { value: props.modelValue }, evnt)
    }

    const blurEvent = (evnt: Event) => {
      reactData.isActivated = false
      switchMethods.dispatchEvent('blur', { value: props.modelValue }, evnt)
    }

    switchMethods = {
      dispatchEvent (type, params, evnt) {
        emit(type, Object.assign({ $switch: $xeswitch, $event: evnt }, params))
      },
      focus () {
        const btnElem = refButton.value
        reactData.isActivated = true
        btnElem.focus()
        return nextTick()
      },
      blur () {
        const btnElem = refButton.value
        btnElem.blur()
        reactData.isActivated = false
        return nextTick()
      }
    }

    Object.assign($xeswitch, switchMethods)

    const renderVN = () => {
      const { disabled, openIcon, closeIcon } = props
      const isChecked = computeIsChecked.value
      const vSize = computeSize.value
      const onShowLabel = computeOnShowLabel.value
      const offShowLabel = computeOffShowLabel.value
      return h('div', {
        class: ['vxe-switch', isChecked ? 'is--on' : 'is--off', {
          [`size--${vSize}`]: vSize,
          'is--disabled': disabled,
          'is--animat': reactData.hasAnimat
        }]
      }, [
        h('button', {
          ref: refButton,
          class: 'vxe-switch--button',
          type: 'button',
          disabled,
          onClick: clickEvent,
          onFocus: focusEvent,
          onBlur: blurEvent
        }, [
          h('span', {
            class: 'vxe-switch--label vxe-switch--label-on'
          }, [
            openIcon ? h('i', {
              class: ['vxe-switch--label-icon', openIcon]
            }) : createCommentVNode(),
            onShowLabel
          ]),
          h('span', {
            class: 'vxe-switch--label vxe-switch--label-off'
          }, [
            closeIcon ? h('i', {
              class: ['vxe-switch--label-icon', closeIcon]
            }) : createCommentVNode(),
            offShowLabel
          ]),
          h('span', {
            class: 'vxe-switch--icon'
          })
        ])
      ])
    }

    $xeswitch.renderVN = renderVN

    return $xeswitch
  },
  render () {
    return this.renderVN()
  }
})
