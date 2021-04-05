import { defineComponent, h, ref, Ref, nextTick, onBeforeUnmount, reactive, watch, PropType } from 'vue'
import XEUtils from 'xe-utils'
import GlobalConfig from '../../v-x-e-table/src/conf'
import { useSize } from '../../hooks/size'
import { getLastZIndex, nextZIndex, formatText } from '../../tools/utils'
import { getAbsolutePos, getDomNode } from '../../tools/dom'

import { VxeTooltipPropTypes, VxeTooltipConstructor, VxeTooltipEmits, TooltipReactData, TooltipMethods, TooltipPrivateRef } from '../../../types/all'

export default defineComponent({
  name: 'VxeTooltip',
  props: {
    modelValue: Boolean,
    size: { type: String as PropType<VxeTooltipPropTypes.Size>, default: () => GlobalConfig.tooltip.size || GlobalConfig.size },
    trigger: { type: String as PropType<VxeTooltipPropTypes.Trigger>, default: () => GlobalConfig.tooltip.trigger },
    theme: { type: String as PropType<VxeTooltipPropTypes.Theme>, default: () => GlobalConfig.tooltip.theme },
    content: [String, Number] as PropType<VxeTooltipPropTypes.Content>,
    zIndex: [String, Number] as PropType<VxeTooltipPropTypes.ZIndex>,
    isArrow: { type: Boolean as PropType<VxeTooltipPropTypes.IsArrow>, default: true },
    enterable: Boolean as PropType<VxeTooltipPropTypes.Enterable>,
    leaveDelay: { type: Number as PropType<VxeTooltipPropTypes.LeaveDelay>, default: GlobalConfig.tooltip.leaveDelay },
    leaveMethod: Function as PropType<VxeTooltipPropTypes.LeaveMethod>
  },
  emits: [
    'update:modelValue'
  ] as VxeTooltipEmits,
  setup (props, context) {
    const { slots, emit } = context

    const xID = XEUtils.uniqueId()

    const computeSize = useSize(props)

    const reactData = reactive({
      target: null,
      isUpdate: false,
      isHover: false,
      visible: false,
      message: '',
      tipTarget: null,
      tipZindex: 0,
      tipStore: {
        style: {},
        placement: '',
        arrowStyle: {}
      }
    } as TooltipReactData)

    const refElem = ref() as Ref<HTMLDivElement>

    const refMaps: TooltipPrivateRef = {
      refElem
    }

    const $xetooltip = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: () => refMaps
    } as VxeTooltipConstructor

    let tooltipMethods = {} as TooltipMethods

    let targetActive: boolean

    const updateTipStyle = () => {
      const { tipTarget, tipStore } = reactData
      if (tipTarget) {
        const { scrollTop, scrollLeft, visibleWidth } = getDomNode()
        const { top, left } = getAbsolutePos(tipTarget)
        const el = refElem.value
        const marginSize = 6
        const offsetHeight = el.offsetHeight
        const offsetWidth = el.offsetWidth
        let tipLeft = left
        let tipTop = top - offsetHeight - marginSize
        tipLeft = Math.max(marginSize, left + Math.floor((tipTarget.offsetWidth - offsetWidth) / 2))
        if (tipLeft + offsetWidth + marginSize > scrollLeft + visibleWidth) {
          tipLeft = scrollLeft + visibleWidth - offsetWidth - marginSize
        }
        if (top - offsetHeight < scrollTop + marginSize) {
          tipStore.placement = 'bottom'
          tipTop = top + tipTarget.offsetHeight + marginSize
        }
        tipStore.style.top = `${tipTop}px`
        tipStore.style.left = `${tipLeft}px`
        tipStore.arrowStyle.left = `${left - tipLeft + tipTarget.offsetWidth / 2}px`
      }
    }

    const updateValue = (value: VxeTooltipPropTypes.ModelValue) => {
      if (value !== reactData.visible) {
        reactData.visible = value
        reactData.isUpdate = true
        emit('update:modelValue', value)
      }
    }

    const updateZindex = () => {
      if (reactData.tipZindex < getLastZIndex()) {
        reactData.tipZindex = nextZIndex()
      }
    }

    const clickEvent = () => {
      if (reactData.visible) {
        tooltipMethods.close()
      } else {
        tooltipMethods.open()
      }
    }

    const targetMouseenterEvent = () => {
      tooltipMethods.open()
    }

    const targetMouseleaveEvent = () => {
      const { trigger, enterable, leaveDelay } = props
      targetActive = false
      if (enterable && trigger === 'hover') {
        setTimeout(() => {
          if (!reactData.isHover) {
            tooltipMethods.close()
          }
        }, leaveDelay)
      } else {
        tooltipMethods.close()
      }
    }

    const wrapperMouseenterEvent = () => {
      reactData.isHover = true
    }

    const wrapperMouseleaveEvent = (evnt: MouseEvent) => {
      const { leaveMethod, trigger, enterable, leaveDelay } = props
      reactData.isHover = false
      if (!leaveMethod || leaveMethod({ $event: evnt }) !== false) {
        if (enterable && trigger === 'hover') {
          setTimeout(() => {
            if (!targetActive) {
              tooltipMethods.close()
            }
          }, leaveDelay)
        }
      }
    }

    tooltipMethods = {
      dispatchEvent (type, params, evnt) {
        emit(type, Object.assign({ $tooltip: $xetooltip, $event: evnt }, params))
      },
      open (target?: HTMLElement, message?: VxeTooltipPropTypes.Content) {
        return tooltipMethods.toVisible(target || reactData.target as HTMLElement, message)
      },
      close () {
        reactData.tipTarget = null
        Object.assign(reactData.tipStore, {
          style: {},
          placement: '',
          arrowStyle: null
        })
        updateValue(false)
        return nextTick()
      },
      toVisible (target: HTMLElement, message?: VxeTooltipPropTypes.Content) {
        targetActive = true
        if (target) {
          const { tipStore } = reactData
          const el = refElem.value
          const parentNode = el.parentNode
          if (!parentNode) {
            document.body.appendChild(el)
          }
          if (message) {
            reactData.message = message
          }
          reactData.tipTarget = target
          updateValue(true)
          updateZindex()
          tipStore.placement = 'top'
          tipStore.style = { width: 'auto', left: 0, top: 0, zIndex: props.zIndex || reactData.tipZindex }
          tipStore.arrowStyle = { left: '50%' }
          return tooltipMethods.updatePlacement()
        }
        return nextTick()
      },
      updatePlacement () {
        return nextTick().then(() => {
          const { tipTarget } = reactData
          const el = refElem.value
          if (tipTarget && el) {
            updateTipStyle()
            return nextTick().then(updateTipStyle)
          }
        })
      }
    }

    Object.assign($xetooltip, tooltipMethods)

    watch(() => props.content, () => {
      reactData.message = props.content
    })

    watch(() => props.modelValue, () => {
      if (!reactData.isUpdate) {
        if (props.modelValue) {
          tooltipMethods.open()
        } else {
          tooltipMethods.close()
        }
      }
      reactData.isUpdate = false
    })

    nextTick(() => {
      const { trigger, content, modelValue } = props
      const wrapperElem = refElem.value
      const parentNode = wrapperElem.parentNode
      if (parentNode) {
        reactData.message = content
        reactData.tipZindex = nextZIndex()
        XEUtils.arrayEach(wrapperElem.children, (elem, index) => {
          if (index > 1) {
            parentNode.insertBefore(elem, wrapperElem)
            if (!reactData.target) {
              reactData.target = elem as HTMLElement
            }
          }
        })
        parentNode.removeChild(wrapperElem)
        const { target } = reactData
        if (target) {
          if (trigger === 'hover') {
            target.onmouseleave = targetMouseleaveEvent
            target.onmouseenter = targetMouseenterEvent
          } else if (trigger === 'click') {
            target.onclick = clickEvent
          }
        }
        if (modelValue) {
          tooltipMethods.open()
        }
      }
    })

    onBeforeUnmount(() => {
      const { trigger } = props
      const { target } = reactData
      const wrapperElem = refElem.value
      const parentNode = wrapperElem.parentNode
      if (parentNode) {
        parentNode.removeChild(wrapperElem)
      }
      if (target) {
        if (trigger === 'hover') {
          target.onmouseenter = null
          target.onmouseleave = null
        } else if (trigger === 'click') {
          target.onclick = null
        }
      }
    })

    const renderVN = () => {
      const { theme, isArrow, enterable } = props
      const { isHover, visible, tipStore, message } = reactData
      const vSize = computeSize.value
      let ons
      if (enterable) {
        ons = {
          onMouseenter: wrapperMouseenterEvent,
          onMouseleave: wrapperMouseleaveEvent
        }
      }
      return h('div', {
        ref: refElem,
        class: ['vxe-table--tooltip-wrapper', `theme--${theme}`, {
          [`size--${vSize}`]: vSize,
          [`placement--${tipStore.placement}`]: tipStore.placement,
          'is--enterable': enterable,
          'is--visible': visible,
          'is--arrow': isArrow,
          'is--hover': isHover
        }],
        style: tipStore.style,
        ...ons
      }, [
        h('div', {
          class: 'vxe-table--tooltip-content'
        }, slots.content ? slots.content({}) : formatText(message)),
        h('div', {
          class: 'vxe-table--tooltip-arrow',
          style: tipStore.arrowStyle
        })
      ].concat(slots.default ? slots.default({}) : []))
    }

    $xetooltip.renderVN = renderVN

    return $xetooltip
  },
  render () {
    return this.renderVN()
  }
})
