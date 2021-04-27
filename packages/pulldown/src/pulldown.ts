import { defineComponent, h, Teleport, ref, Ref, onUnmounted, reactive, nextTick, PropType } from 'vue'
import XEUtils from 'xe-utils'
import GlobalConfig from '../../v-x-e-table/src/conf'
import { useSize } from '../../hooks/size'
import { getAbsolutePos, getEventTargetNode } from '../../tools/dom'
import { getLastZIndex, nextZIndex } from '../../tools/utils'
import { GlobalEvent } from '../../tools/event'

import { VNodeStyle, VxePulldownConstructor, VxePulldownPropTypes, VxePulldownEmits, PulldownReactData, PulldownMethods, PulldownPrivateRef, VxePulldownMethods } from '../../../types/all'

export default defineComponent({
  name: 'VxePulldown',
  props: {
    disabled: Boolean as PropType<VxePulldownPropTypes.Disabled>,
    placement: String as PropType<VxePulldownPropTypes.Placement>,
    size: { type: String as PropType<VxePulldownPropTypes.Size>, default: () => GlobalConfig.size },
    destroyOnClose: Boolean as PropType<VxePulldownPropTypes.DestroyOnClose>,
    transfer: Boolean as PropType<VxePulldownPropTypes.Transfer>
  },
  emits: [
    'hide-panel'
  ] as VxePulldownEmits,
  setup (props, context) {
    const { slots, emit } = context

    const xID = XEUtils.uniqueId()

    const computeSize = useSize(props)

    const reactData = reactive({
      inited: false,
      panelIndex: 0,
      panelStyle: null,
      panelPlacement: null,
      visiblePanel: false,
      animatVisible: false,
      isActivated: false
    } as PulldownReactData)

    const refElem = ref() as Ref<HTMLDivElement>
    const refPulldowContent = ref() as Ref<HTMLDivElement>
    const refPulldowPnanel = ref() as Ref<HTMLDivElement>

    const refMaps: PulldownPrivateRef = {
      refElem
    }

    const $xepulldown = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: () => refMaps
    } as VxePulldownConstructor & VxePulldownMethods

    let pulldownMethods = {} as PulldownMethods

    const updateZindex = () => {
      if (reactData.panelIndex < getLastZIndex()) {
        reactData.panelIndex = nextZIndex()
      }
    }

    const isPanelVisible = () => {
      return reactData.visiblePanel
    }

    /**
     * 手动更新位置
     */
    const updatePlacement = () => {
      return nextTick().then(() => {
        const { transfer, placement } = props
        const { panelIndex, visiblePanel } = reactData
        if (visiblePanel) {
          const targetElem = refPulldowContent.value
          const panelElem = refPulldowPnanel.value
          if (panelElem && targetElem) {
            const targetHeight = targetElem.offsetHeight
            const targetWidth = targetElem.offsetWidth
            const panelHeight = panelElem.offsetHeight
            const panelWidth = panelElem.offsetWidth
            const marginSize = 5
            const panelStyle: VNodeStyle = {
              zIndex: panelIndex
            }
            const { boundingTop, boundingLeft, visibleHeight, visibleWidth } = getAbsolutePos(targetElem)
            let panelPlacement = 'bottom'
            if (transfer) {
              let left = boundingLeft
              let top = boundingTop + targetHeight
              if (placement === 'top') {
                panelPlacement = 'top'
                top = boundingTop - panelHeight
              } else if (!placement) {
                // 如果下面不够放，则向上
                if (top + panelHeight + marginSize > visibleHeight) {
                  panelPlacement = 'top'
                  top = boundingTop - panelHeight
                }
                // 如果上面不够放，则向下（优先）
                if (top < marginSize) {
                  panelPlacement = 'bottom'
                  top = boundingTop + targetHeight
                }
              }
              // 如果溢出右边
              if (left + panelWidth + marginSize > visibleWidth) {
                left -= left + panelWidth + marginSize - visibleWidth
              }
              // 如果溢出左边
              if (left < marginSize) {
                left = marginSize
              }
              Object.assign(panelStyle, {
                left: `${left}px`,
                top: `${top}px`,
                minWidth: `${targetWidth}px`
              })
            } else {
              if (placement === 'top') {
                panelPlacement = 'top'
                panelStyle.bottom = `${targetHeight}px`
              } else if (!placement) {
                // 如果下面不够放，则向上
                if (boundingTop + targetHeight + panelHeight > visibleHeight) {
                  // 如果上面不够放，则向下（优先）
                  if (boundingTop - targetHeight - panelHeight > marginSize) {
                    panelPlacement = 'top'
                    panelStyle.bottom = `${targetHeight}px`
                  }
                }
              }
            }
            reactData.panelStyle = panelStyle
            reactData.panelPlacement = panelPlacement
          }
        }
        return nextTick()
      })
    }

    let hidePanelTimeout: number

    /**
     * 显示下拉面板
     */
    const showPanel = () => {
      if (!reactData.inited) {
        reactData.inited = true
      }
      return new Promise(resolve => {
        if (!props.disabled) {
          clearTimeout(hidePanelTimeout)
          reactData.isActivated = true
          reactData.animatVisible = true
          setTimeout(() => {
            reactData.visiblePanel = true
            updatePlacement()
            setTimeout(() => {
              resolve(updatePlacement())
            }, 40)
          }, 10)
          updateZindex()
        } else {
          resolve(nextTick())
        }
      })
    }

    /**
     * 隐藏下拉面板
     */
    const hidePanel = () => {
      reactData.visiblePanel = false
      return new Promise(resolve => {
        if (reactData.animatVisible) {
          hidePanelTimeout = window.setTimeout(() => {
            reactData.animatVisible = false
            resolve(nextTick())
          }, 350)
        } else {
          resolve(nextTick())
        }
      })
    }

    /**
     * 切换下拉面板
     */
    const togglePanel = () => {
      if (reactData.visiblePanel) {
        return hidePanel()
      }
      return showPanel()
    }

    const handleGlobalMousewheelEvent = (evnt: Event) => {
      const { disabled } = props
      const { visiblePanel } = reactData
      const panelElem = refPulldowPnanel.value
      if (!disabled) {
        if (visiblePanel) {
          if (getEventTargetNode(evnt, panelElem).flag) {
            updatePlacement()
          } else {
            hidePanel()
            pulldownMethods.dispatchEvent('hide-panel', {}, evnt)
          }
        }
      }
    }

    const handleGlobalMousedownEvent = (evnt: Event) => {
      const { disabled } = props
      const { visiblePanel } = reactData
      const el = refElem.value
      const panelElem = refPulldowPnanel.value
      if (!disabled) {
        reactData.isActivated = getEventTargetNode(evnt, el).flag || getEventTargetNode(evnt, panelElem).flag
        if (visiblePanel && !reactData.isActivated) {
          hidePanel()
          pulldownMethods.dispatchEvent('hide-panel', {}, evnt)
        }
      }
    }

    const handleGlobalBlurEvent = (evnt: Event) => {
      if (reactData.visiblePanel) {
        reactData.isActivated = false
        hidePanel()
        pulldownMethods.dispatchEvent('hide-panel', {}, evnt)
      }
    }

    pulldownMethods = {
      dispatchEvent (type, params, evnt) {
        emit(type, Object.assign({ $pulldown: $xepulldown, $event: evnt }, params))
      },
      isPanelVisible,
      togglePanel,
      showPanel,
      hidePanel
    }

    Object.assign($xepulldown, pulldownMethods)

    nextTick(() => {
      GlobalEvent.on($xepulldown, 'mousewheel', handleGlobalMousewheelEvent)
      GlobalEvent.on($xepulldown, 'mousedown', handleGlobalMousedownEvent)
      GlobalEvent.on($xepulldown, 'blur', handleGlobalBlurEvent)
    })

    onUnmounted(() => {
      GlobalEvent.off($xepulldown, 'mousewheel')
      GlobalEvent.off($xepulldown, 'mousedown')
      GlobalEvent.off($xepulldown, 'blur')
    })

    const renderVN = () => {
      const { destroyOnClose, transfer, disabled } = props
      const { inited, isActivated, animatVisible, visiblePanel, panelStyle, panelPlacement } = reactData
      const vSize = computeSize.value
      return h('div', {
        ref: refElem,
        class: ['vxe-pulldown', {
          [`size--${vSize}`]: vSize,
          'is--visivle': visiblePanel,
          'is--disabled': disabled,
          'is--active': isActivated
        }]
      }, [
        h('div', {
          ref: refPulldowContent,
          class: 'vxe-pulldown--content'
        }, slots.default ? slots.default({ $pulldown: $xepulldown }) : []),
        h(Teleport, {
          to: 'body',
          disabled: transfer ? !inited : true
        }, [
          h('div', {
            ref: refPulldowPnanel,
            class: ['vxe-table--ignore-clear vxe-pulldown--panel', {
              [`size--${vSize}`]: vSize,
              'is--transfer': transfer,
              'animat--leave': animatVisible,
              'animat--enter': visiblePanel
            }],
            placement: panelPlacement,
            style: panelStyle
          }, slots.dropdown ? [
            h('div', {
              class: 'vxe-pulldown--wrapper'
            }, !inited || (destroyOnClose && !visiblePanel && !animatVisible) ? [] : slots.dropdown({ $pulldown: $xepulldown }))
          ] : [])
        ])
      ])
    }

    $xepulldown.renderVN = renderVN

    return $xepulldown
  },
  render () {
    return this.renderVN()
  }
})
