import { defineComponent, h, ref, Ref, computed, Teleport, VNode, onBeforeMount, onUnmounted, reactive, nextTick, PropType } from 'vue'
import XEUtils from 'xe-utils'
import GlobalConfig from '../../v-x-e-table/src/conf'
import { useSize } from '../../hooks/size'
import { getAbsolutePos, getEventTargetNode } from '../../tools/dom'
import { getFuncText, getLastZIndex, nextZIndex } from '../../tools/utils'
import { GlobalEvent } from '../../tools/event'

import { VxeButtonConstructor, VxeButtonPropTypes, VxeButtonEmits, ButtonReactData, ButtonMethods, ButtonPrivateRef, ButtonInternalData } from '../../../types/all'

export default defineComponent({
  name: 'VxeButton',
  props: {
    /**
     * 按钮类型
     */
    type: String as PropType<VxeButtonPropTypes.Type>,
    className: String as PropType<VxeButtonPropTypes.ClassName>,
    /**
     * 按钮尺寸
     */
    size: { type: String as PropType<VxeButtonPropTypes.Size>, default: () => GlobalConfig.button.size || GlobalConfig.size },
    /**
     * 用来标识这一项
     */
    name: [String, Number] as PropType<VxeButtonPropTypes.Name>,
    /**
     * 按钮内容
     */
    content: String as PropType<VxeButtonPropTypes.Content>,
    /**
     * 固定显示下拉面板的方向
     */
    placement: String as PropType<VxeButtonPropTypes.Placement>,
    /**
     * 按钮状态
     */
    status: String as PropType<VxeButtonPropTypes.Status>,
    /**
     * 按钮的图标
     */
    icon: String as PropType<VxeButtonPropTypes.Icon>,
    /**
     * 圆角边框
     */
    round: Boolean as PropType<VxeButtonPropTypes.Round>,
    /**
     * 圆角按钮
     */
    circle: Boolean as PropType<VxeButtonPropTypes.Circle>,
    /**
     * 是否禁用
     */
    disabled: Boolean as PropType<VxeButtonPropTypes.Disabled>,
    /**
     * 是否加载中
     */
    loading: Boolean as PropType<VxeButtonPropTypes.Loading>,
    /**
     * 在下拉面板关闭时销毁内容
     */
    destroyOnClose: Boolean as PropType<VxeButtonPropTypes.DestroyOnClose>,
    /**
     * 是否将弹框容器插入于 body 内
     */
    transfer: { type: Boolean as PropType<VxeButtonPropTypes.Transfer>, default: () => GlobalConfig.button.transfer }
  },
  emits: [
    'click',
    'dropdown-click'
  ] as VxeButtonEmits,
  setup (props, context) {
    const { slots, emit } = context

    const xID = XEUtils.uniqueId()

    const computeSize = useSize(props)

    const reactData = reactive({
      inited: false,
      showPanel: false,
      animatVisible: false,
      panelIndex: 0,
      panelStyle: {},
      panelPlacement: ''
    } as ButtonReactData)

    const internalData: ButtonInternalData = {
      showTime: null
    }

    const refElem = ref() as Ref<HTMLDivElement>
    const refButton = ref() as Ref<HTMLButtonElement>
    const refBtnPanel = ref() as Ref<HTMLDivElement>

    const refMaps: ButtonPrivateRef = {
      refElem
    }

    const $xebutton = {
      xID,
      props,
      context,
      reactData,
      internalData,
      getRefMaps: () => refMaps
    } as VxeButtonConstructor

    let buttonMethods = {} as ButtonMethods

    const computeIsFormBtn = computed(() => {
      const { type } = props
      if (type) {
        return ['submit', 'reset', 'button'].indexOf(type) > -1
      }
      return false
    })

    const computeBtnType = computed(() => {
      const { type } = props
      return type && type === 'text' ? type : 'button'
    })

    const updateZindex = () => {
      if (reactData.panelIndex < getLastZIndex()) {
        reactData.panelIndex = nextZIndex()
      }
    }

    const updatePlacement = () => {
      return nextTick().then(() => {
        const { transfer, placement } = props
        const { panelIndex } = reactData
        const targetElem = refButton.value
        const panelElem = refBtnPanel.value
        if (panelElem && targetElem) {
          const targetHeight = targetElem.offsetHeight
          const targetWidth = targetElem.offsetWidth
          const panelHeight = panelElem.offsetHeight
          const panelWidth = panelElem.offsetWidth
          const marginSize = 5
          const panelStyle: { [key: string]: string | number } = {
            zIndex: panelIndex
          }
          const { boundingTop, boundingLeft, visibleHeight, visibleWidth } = getAbsolutePos(targetElem)
          let panelPlacement = 'bottom'
          if (transfer) {
            let left = boundingLeft + targetWidth - panelWidth
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
              right: 'auto',
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
          return nextTick()
        }
      })
    }

    const clickEvent = (evnt: Event) => {
      buttonMethods.dispatchEvent('click', { $event: evnt }, evnt)
    }

    const mousedownDropdownEvent = (evnt: MouseEvent) => {
      const isLeftBtn = evnt.button === 0
      if (isLeftBtn) {
        evnt.stopPropagation()
      }
    }

    const clickDropdownEvent = (evnt: Event) => {
      const dropdownElem = evnt.currentTarget
      const panelElem = refBtnPanel.value
      const { flag, targetElem } = getEventTargetNode(evnt, dropdownElem, 'vxe-button')
      if (flag) {
        if (panelElem) {
          panelElem.dataset.active = 'N'
        }
        reactData.showPanel = false
        setTimeout(() => {
          if (!panelElem || panelElem.dataset.active !== 'Y') {
            reactData.animatVisible = false
          }
        }, 350)
        buttonMethods.dispatchEvent('dropdown-click', { name: targetElem.getAttribute('name'), $event: evnt }, evnt)
      }
    }

    const mouseenterEvent = () => {
      const panelElem = refBtnPanel.value
      panelElem.dataset.active = 'Y'
      reactData.animatVisible = true
      setTimeout(() => {
        if (panelElem.dataset.active === 'Y') {
          reactData.showPanel = true
          updateZindex()
          updatePlacement()
          setTimeout(() => {
            if (reactData.showPanel) {
              updatePlacement()
            }
          }, 50)
        }
      }, 20)
    }

    const mouseenterTargetEvent = () => {
      const panelElem = refBtnPanel.value
      panelElem.dataset.active = 'Y'
      if (!reactData.inited) {
        reactData.inited = true
      }
      internalData.showTime = setTimeout(() => {
        if (panelElem.dataset.active === 'Y') {
          mouseenterEvent()
        } else {
          reactData.animatVisible = false
        }
      }, 250)
    }

    const closePanel = () => {
      const panelElem = refBtnPanel.value
      clearTimeout(internalData.showTime)
      if (panelElem) {
        panelElem.dataset.active = 'N'
        setTimeout(() => {
          if (panelElem.dataset.active !== 'Y') {
            reactData.showPanel = false
            setTimeout(() => {
              if (panelElem.dataset.active !== 'Y') {
                reactData.animatVisible = false
              }
            }, 350)
          }
        }, 100)
      } else {
        reactData.animatVisible = false
        reactData.showPanel = false
      }
    }

    const mouseleaveEvent = () => {
      closePanel()
    }

    const renderContent = () => {
      const { content, icon, loading } = props
      const contVNs: VNode[] = []
      if (loading) {
        contVNs.push(
          h('i', {
            class: ['vxe-button--loading-icon', GlobalConfig.icon.BUTTON_LOADING]
          })
        )
      } else if (icon) {
        contVNs.push(
          h('i', {
            class: ['vxe-button--icon', icon]
          })
        )
      }
      if (slots.default) {
        contVNs.push(
          h('span', {
            class: 'vxe-button--content'
          }, slots.default({}))
        )
      } else if (content) {
        contVNs.push(
          h('span', {
            class: 'vxe-button--content'
          }, getFuncText(content))
        )
      }
      return contVNs
    }

    buttonMethods = {
      dispatchEvent (type, params, evnt) {
        emit(type, Object.assign({ $button: $xebutton, $event: evnt }, params))
      },
      focus () {
        const btnElem = refButton.value
        btnElem.focus()
        return nextTick()
      },
      blur () {
        const btnElem = refButton.value
        btnElem.blur()
        return nextTick()
      }
    }

    Object.assign($xebutton, buttonMethods)

    onBeforeMount(() => {
      GlobalEvent.on($xebutton, 'mousewheel', (evnt: Event) => {
        const panelElem = refBtnPanel.value
        if (reactData.showPanel && !getEventTargetNode(evnt, panelElem).flag) {
          closePanel()
        }
      })
    })

    onUnmounted(() => {
      GlobalEvent.off($xebutton, 'mousewheel')
    })

    const renderVN = () => {
      const { className, transfer, type, round, circle, destroyOnClose, status, name, disabled, loading } = props
      const { inited, showPanel } = reactData
      const isFormBtn = computeIsFormBtn.value
      const btnType = computeBtnType.value
      const vSize = computeSize.value
      if (slots.dropdowns) {
        return h('div', {
          ref: refElem,
          class: ['vxe-button--dropdown', className, {
            [`size--${vSize}`]: vSize,
            'is--active': showPanel
          }]
        }, [
          h('button', {
            ref: refButton,
            class: ['vxe-button', `type--${btnType}`, {
              [`size--${vSize}`]: vSize,
              [`theme--${status}`]: status,
              'is--round': round,
              'is--circle': circle,
              'is--disabled': disabled || loading,
              'is--loading': loading
            }],
            name,
            type: isFormBtn ? type : 'button',
            disabled: disabled || loading,
            onMouseenter: mouseenterTargetEvent,
            onMouseleave: mouseleaveEvent,
            onClick: clickEvent
          }, renderContent().concat([
            h('i', {
              class: `vxe-button--dropdown-arrow ${GlobalConfig.icon.BUTTON_DROPDOWN}`
            })
          ])),
          h(Teleport, {
            to: 'body',
            disabled: transfer ? !inited : true
          }, [
            h('div', {
              ref: refBtnPanel,
              class: ['vxe-button--dropdown-panel', {
                [`size--${vSize}`]: vSize,
                'animat--leave': reactData.animatVisible,
                'animat--enter': showPanel
              }],
              placement: reactData.panelPlacement,
              style: reactData.panelStyle
            }, inited ? [
              h('div', {
                class: 'vxe-button--dropdown-wrapper',
                onMousedown: mousedownDropdownEvent,
                onClick: clickDropdownEvent,
                onMouseenter: mouseenterEvent,
                onMouseleave: mouseleaveEvent
              }, destroyOnClose && !showPanel ? [] : slots.dropdowns({}))
            ] : [])
          ])
        ])
      }
      return h('button', {
        ref: refButton,
        class: ['vxe-button', `type--${btnType}`, {
          [`size--${vSize}`]: vSize,
          [`theme--${status}`]: status,
          'is--round': round,
          'is--circle': circle,
          'is--disabled': disabled || loading,
          'is--loading': loading
        }],
        name,
        type: isFormBtn ? type : 'button',
        disabled: disabled || loading,
        onClick: clickEvent
      }, renderContent())
    }

    $xebutton.renderVN = renderVN

    return $xebutton
  },
  render () {
    return this.renderVN()
  }
})
