import { defineComponent, h, ref, Ref, nextTick, onBeforeUnmount, onMounted, reactive, watch, PropType } from 'vue'
import XEUtils from 'xe-utils'
import GlobalConfig from '../../v-x-e-table/src/conf'
import { useSize } from '../../hooks/size'
import { getLastZIndex, nextZIndex, formatText } from '../../tools/utils'
import { getAbsolutePos, getDomNode } from '../../tools/dom'
import { getSlotVNs } from '../../tools/vn'

import { VxeTooltipPropTypes, VxeTooltipConstructor, VxeTooltipEmits, TooltipReactData, TooltipMethods, TooltipPrivateRef } from '../../../types/all'

export default defineComponent({
  name: 'VxeTooltip',
  props: {
    modelValue: Boolean,
    size: { type: String as PropType<VxeTooltipPropTypes.Size>, default: () => GlobalConfig.tooltip.size || GlobalConfig.size },
    trigger: { type: String as PropType<VxeTooltipPropTypes.Trigger>, default: () => GlobalConfig.tooltip.trigger || 'hover' },
    theme: { type: String as PropType<VxeTooltipPropTypes.Theme>, default: () => GlobalConfig.tooltip.theme || 'dark' },
    content: { type: [String, Number] as PropType<VxeTooltipPropTypes.Content>, default: null },
    useHTML: Boolean as PropType<VxeTooltipPropTypes.UseHTML>,
    zIndex: [String, Number] as PropType<VxeTooltipPropTypes.ZIndex>,
    popupClassName: [String, Function] as PropType<VxeTooltipPropTypes.PopupClassName>,
    isArrow: { type: Boolean as PropType<VxeTooltipPropTypes.IsArrow>, default: true },
    enterable: Boolean as PropType<VxeTooltipPropTypes.Enterable>,
    enterDelay: { type: Number as PropType<VxeTooltipPropTypes.EnterDelay>, default: () => GlobalConfig.tooltip.enterDelay },
    leaveDelay: { type: Number as PropType<VxeTooltipPropTypes.LeaveDelay>, default: () => GlobalConfig.tooltip.leaveDelay }
  },
  emits: [
    'update:modelValue'
  ] as VxeTooltipEmits,
  setup (props, context) {
    const { slots, emit } = context

    const xID = XEUtils.uniqueId()

    const computeSize = useSize(props)

    const reactData = reactive<TooltipReactData>({
      target: null,
      isUpdate: false,
      visible: false,
      tipContent: '',
      tipActive: false,
      tipTarget: null,
      tipZindex: 0,
      tipStore: {
        style: {},
        placement: '',
        arrowStyle: {}
      }
    })

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
    } as unknown as VxeTooltipConstructor

    let tooltipMethods = {} as TooltipMethods

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
      reactData.tipActive = false
      if (enterable && trigger === 'hover') {
        setTimeout(() => {
          if (!reactData.tipActive) {
            tooltipMethods.close()
          }
        }, leaveDelay)
      } else {
        tooltipMethods.close()
      }
    }

    const wrapperMouseenterEvent = () => {
      reactData.tipActive = true
    }

    const wrapperMouseleaveEvent = () => {
      const { trigger, enterable, leaveDelay } = props
      reactData.tipActive = false
      if (enterable && trigger === 'hover') {
        setTimeout(() => {
          if (!reactData.tipActive) {
            tooltipMethods.close()
          }
        }, leaveDelay)
      }
    }

    const showTip = () => {
      const { tipStore } = reactData
      const el = refElem.value
      if (el) {
        const parentNode = el.parentNode
        if (!parentNode) {
          document.body.appendChild(el)
        }
      }
      updateValue(true)
      updateZindex()
      tipStore.placement = 'top'
      tipStore.style = { width: 'auto', left: 0, top: 0, zIndex: props.zIndex || reactData.tipZindex }
      tipStore.arrowStyle = { left: '50%' }
      return tooltipMethods.updatePlacement()
    }

    const showDelayTip = XEUtils.debounce(() => {
      if (reactData.tipActive) {
        showTip()
      }
    }, props.enterDelay, { leading: false, trailing: true })

    tooltipMethods = {
      dispatchEvent (type, params, evnt) {
        emit(type, Object.assign({ $tooltip: $xetooltip, $event: evnt }, params))
      },
      open (target?: HTMLElement, content?: VxeTooltipPropTypes.Content) {
        return tooltipMethods.toVisible(target || reactData.target as HTMLElement, content)
      },
      close () {
        reactData.tipTarget = null
        reactData.tipActive = false
        Object.assign(reactData.tipStore, {
          style: {},
          placement: '',
          arrowStyle: null
        })
        updateValue(false)
        return nextTick()
      },
      toVisible (target: HTMLElement, content?: VxeTooltipPropTypes.Content) {
        if (target) {
          const { trigger, enterDelay } = props
          reactData.tipActive = true
          reactData.tipTarget = target
          if (content) {
            reactData.tipContent = content
          }
          if (enterDelay && trigger === 'hover') {
            showDelayTip()
          } else {
            return showTip()
          }
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
      },
      isActived () {
        return reactData.tipActive
      },
      setActived (actived) {
        reactData.tipActive = !!actived
      }
    }

    Object.assign($xetooltip, tooltipMethods)

    watch(() => props.content, () => {
      reactData.tipContent = props.content
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

    onMounted(() => {
      nextTick(() => {
        const { trigger, content, modelValue } = props
        const wrapperElem = refElem.value
        if (wrapperElem) {
          const parentNode = wrapperElem.parentNode
          if (parentNode) {
            reactData.tipContent = content
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
                target.onmouseenter = targetMouseenterEvent
                target.onmouseleave = targetMouseleaveEvent
              } else if (trigger === 'click') {
                target.onclick = clickEvent
              }
            }
            if (modelValue) {
              tooltipMethods.open()
            }
          }
        }
      })
    })

    onBeforeUnmount(() => {
      const { trigger } = props
      const { target } = reactData
      const wrapperElem = refElem.value
      if (target) {
        if (trigger === 'hover') {
          target.onmouseenter = null
          target.onmouseleave = null
        } else if (trigger === 'click') {
          target.onclick = null
        }
      }
      if (wrapperElem) {
        const parentNode = wrapperElem.parentNode
        if (parentNode) {
          parentNode.removeChild(wrapperElem)
        }
      }
    })

    const renderContent = () => {
      const { useHTML } = props
      const { tipContent } = reactData
      const contentSlot = slots.content
      if (contentSlot) {
        return h('div', {
          key: 1,
          class: 'vxe-table--tooltip-content'
        }, getSlotVNs(contentSlot({})))
      }
      if (useHTML) {
        return h('div', {
          key: 2,
          class: 'vxe-table--tooltip-content',
          innerHTML: tipContent
        })
      }
      return h('div', {
        key: 3,
        class: 'vxe-table--tooltip-content'
      }, formatText(tipContent))
    }

    const renderVN = () => {
      const { popupClassName, theme, isArrow, enterable } = props
      const { tipActive, visible, tipStore } = reactData
      const defaultSlot = slots.default
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
        class: ['vxe-table--tooltip-wrapper', `theme--${theme}`, popupClassName ? (XEUtils.isFunction(popupClassName) ? popupClassName({ $tooltip: $xetooltip }) : popupClassName) : '', {
          [`size--${vSize}`]: vSize,
          [`placement--${tipStore.placement}`]: tipStore.placement,
          'is--enterable': enterable,
          'is--visible': visible,
          'is--arrow': isArrow,
          'is--active': tipActive
        }],
        style: tipStore.style,
        ...ons
      }, [
        renderContent(),
        h('div', {
          class: 'vxe-table--tooltip-arrow',
          style: tipStore.arrowStyle
        }),
        ...(defaultSlot ? getSlotVNs(defaultSlot({})) : [])
      ])
    }

    $xetooltip.renderVN = renderVN

    return $xetooltip
  },
  render () {
    return this.renderVN()
  }
})
