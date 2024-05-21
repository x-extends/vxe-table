import { defineComponent, h, Teleport, ref, Ref, reactive, nextTick, watch, PropType, VNode, onMounted, onUnmounted } from 'vue'
import XEUtils from 'xe-utils'
import { useSize } from '../../hooks/size'
import { getLastZIndex, nextZIndex, getFuncText } from '../../tools/utils'
import { GlobalEvent, hasEventKey, EVENT_KEYS } from '../../tools/event'
import GlobalConfig from '../../v-x-e-table/src/conf'
import VxeButtonComponent from '../../button/src/button'
import VxeLoadingComponent from '../../loading/index'
import { getSlotVNs } from '../../tools/vn'

import { VxeDrawerPropTypes, DrawerReactData, VxeDrawerEmits, DrawerPrivateRef, DrawerMethods, DrawerPrivateMethods, VxeDrawerPrivateComputed, VxeDrawerConstructor, VxeDrawerPrivateMethods, VxeButtonInstance, DrawerEventTypes } from '../../../types'

export const allActiveDrawers: VxeDrawerConstructor[] = []

export default defineComponent({
  name: 'VxeDrawer',
  props: {
    modelValue: Boolean as PropType<VxeDrawerPropTypes.ModelValue>,
    id: String as PropType<VxeDrawerPropTypes.ID>,
    title: String as PropType<VxeDrawerPropTypes.Title>,
    loading: { type: Boolean as PropType<VxeDrawerPropTypes.Loading>, default: null },
    className: String as PropType<VxeDrawerPropTypes.ClassName>,
    position: [String, Object] as PropType<VxeDrawerPropTypes.Position>,
    lockView: { type: Boolean as PropType<VxeDrawerPropTypes.LockView>, default: () => GlobalConfig.drawer.lockView },
    lockScroll: Boolean as PropType<VxeDrawerPropTypes.LockScroll>,
    mask: { type: Boolean as PropType<VxeDrawerPropTypes.Mask>, default: () => GlobalConfig.drawer.mask },
    maskClosable: { type: Boolean as PropType<VxeDrawerPropTypes.MaskClosable>, default: () => GlobalConfig.drawer.maskClosable },
    escClosable: { type: Boolean as PropType<VxeDrawerPropTypes.EscClosable>, default: () => GlobalConfig.drawer.escClosable },
    showHeader: { type: Boolean as PropType<VxeDrawerPropTypes.ShowHeader>, default: () => GlobalConfig.drawer.showHeader },
    showFooter: { type: Boolean as PropType<VxeDrawerPropTypes.ShowFooter>, default: () => GlobalConfig.drawer.showFooter },
    showClose: { type: Boolean as PropType<VxeDrawerPropTypes.ShowClose>, default: () => GlobalConfig.drawer.showClose },
    content: [Number, String] as PropType<VxeDrawerPropTypes.Content>,
    showCancelButton: { type: Boolean as PropType<VxeDrawerPropTypes.ShowCancelButton>, default: null },
    cancelButtonText: { type: String as PropType<VxeDrawerPropTypes.CancelButtonText>, default: () => GlobalConfig.drawer.cancelButtonText },
    showConfirmButton: { type: Boolean as PropType<VxeDrawerPropTypes.ShowConfirmButton>, default: () => GlobalConfig.drawer.showConfirmButton },
    confirmButtonText: { type: String as PropType<VxeDrawerPropTypes.ConfirmButtonText>, default: () => GlobalConfig.drawer.confirmButtonText },
    destroyOnClose: { type: Boolean as PropType<VxeDrawerPropTypes.DestroyOnClose>, default: () => GlobalConfig.drawer.destroyOnClose },
    showTitleOverflow: { type: Boolean as PropType<VxeDrawerPropTypes.ShowTitleOverflow>, default: () => GlobalConfig.drawer.showTitleOverflow },
    width: [Number, String] as PropType<VxeDrawerPropTypes.Width>,
    height: [Number, String] as PropType<VxeDrawerPropTypes.Height>,
    zIndex: Number as PropType<VxeDrawerPropTypes.ZIndex>,
    transfer: { type: Boolean as PropType<VxeDrawerPropTypes.Transfer>, default: () => GlobalConfig.drawer.transfer },
    size: { type: String as PropType<VxeDrawerPropTypes.Size>, default: () => GlobalConfig.drawer.size || GlobalConfig.size },
    beforeHideMethod: { type: Function as PropType<VxeDrawerPropTypes.BeforeHideMethod>, default: () => GlobalConfig.drawer.beforeHideMethod },
    slots: Number as PropType<VxeDrawerPropTypes.Slots>
  },
  emits: [
    'update:modelValue',
    'show',
    'hide',
    'before-hide',
    'close',
    'confirm',
    'cancel'
  ] as VxeDrawerEmits,
  setup (props, context) {
    const { slots, emit } = context

    const xID = XEUtils.uniqueId()

    const computeSize = useSize(props)

    const refElem = ref<HTMLDivElement>()
    const refDrawerBox = ref() as Ref<HTMLDivElement>
    const refConfirmBtn = ref<VxeButtonInstance>()
    const refCancelBtn = ref<VxeButtonInstance>()

    const reactData = reactive<DrawerReactData>({
      inited: false,
      visible: false,
      contentVisible: false,
      drawerZIndex: 0,
      firstOpen: true
    })

    const refMaps: DrawerPrivateRef = {
      refElem
    }

    const computeMaps: VxeDrawerPrivateComputed = {
    }

    const $xeDrawer = {
      xID,
      props,
      context,
      reactData,

      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    } as unknown as VxeDrawerConstructor & VxeDrawerPrivateMethods

    const getBox = () => {
      const boxElem = refDrawerBox.value
      return boxElem
    }

    const recalculate = () => {
      const { width, height } = props
      const boxElem = getBox()
      boxElem.style.width = `${width ? (isNaN(width as number) ? width : `${width}px`) : ''}`
      boxElem.style.height = `${height ? (isNaN(height as number) ? height : `${height}px`) : ''}`
      return nextTick()
    }

    const updateZindex = () => {
      const { zIndex } = props
      const { drawerZIndex } = reactData
      if (zIndex) {
        reactData.drawerZIndex = zIndex
      } else if (drawerZIndex < getLastZIndex()) {
        reactData.drawerZIndex = nextZIndex()
      }
    }

    const updatePosition = () => {
      return nextTick().then(() => {
      })
    }

    const closeDrawer = (type: DrawerEventTypes) => {
      const { beforeHideMethod } = props
      const { visible } = reactData
      const params = { type }
      if (visible) {
        Promise.resolve(beforeHideMethod ? beforeHideMethod(params) : null).then((rest) => {
          if (!XEUtils.isError(rest)) {
            reactData.contentVisible = false
            XEUtils.remove(allActiveDrawers, item => item === $xeDrawer)
            drawerMethods.dispatchEvent('before-hide', params)
            setTimeout(() => {
              reactData.visible = false
              emit('update:modelValue', false)
              drawerMethods.dispatchEvent('hide', params)
            }, 200)
          }
        }).catch(e => e)
      }
      return nextTick()
    }

    const closeEvent = (evnt: Event) => {
      const type = 'close'
      drawerMethods.dispatchEvent(type, { type }, evnt)
      closeDrawer(type)
    }

    const confirmEvent = (evnt: Event) => {
      const type = 'confirm'
      drawerMethods.dispatchEvent(type, { type }, evnt)
      closeDrawer(type)
    }

    const cancelEvent = (evnt: Event) => {
      const type = 'cancel'
      drawerMethods.dispatchEvent(type, { type }, evnt)
      closeDrawer(type)
    }

    const openDrawer = () => {
      const { showFooter } = props
      const { inited, visible } = reactData
      if (!inited) {
        reactData.inited = true
      }
      if (!visible) {
        recalculate()
        reactData.visible = true
        reactData.contentVisible = false
        updateZindex()
        allActiveDrawers.push($xeDrawer)
        setTimeout(() => {
          reactData.contentVisible = true
          nextTick(() => {
            if (showFooter) {
              const confirmBtn = refConfirmBtn.value
              const cancelBtn = refCancelBtn.value
              const operBtn = confirmBtn || cancelBtn
              if (operBtn) {
                operBtn.focus()
              }
            }
            const type = ''
            const params = { type }
            emit('update:modelValue', true)
            drawerMethods.dispatchEvent('show', params)
          })
        }, 10)
        nextTick(() => {
          const { firstOpen } = reactData
          if (firstOpen) {
            updatePosition().then(() => {
              setTimeout(() => updatePosition(), 20)
            })
          }
          if (firstOpen) {
            reactData.firstOpen = false
          }
        })
      }
      return nextTick()
    }

    const drawerMethods: DrawerMethods = {
      dispatchEvent (type, params, evnt) {
        emit(type, Object.assign({ $drawer: $xeDrawer, $event: evnt }, params))
      },
      open: openDrawer,
      close () {
        return closeDrawer('close')
      },
      getBox
    }

    const selfClickEvent = (evnt: Event) => {
      const el = refElem.value
      if (props.maskClosable && evnt.target === el) {
        const type = 'mask'
        closeDrawer(type)
      }
    }

    const handleGlobalKeydownEvent = (evnt: KeyboardEvent) => {
      const isEsc = hasEventKey(evnt, EVENT_KEYS.ESCAPE)
      if (isEsc) {
        const lastDrawer = XEUtils.max(allActiveDrawers, (item) => item.reactData.drawerZIndex)
        // 多个时，只关掉最上层的窗口
        if (lastDrawer) {
          setTimeout(() => {
            if (lastDrawer === $xeDrawer && (lastDrawer as VxeDrawerConstructor).props.escClosable) {
              closeDrawer('exit')
            }
          }, 10)
        }
      }
    }

    const boxMousedownEvent = () => {
      const { drawerZIndex } = reactData
      if (allActiveDrawers.some(comp => comp.reactData.visible && comp.reactData.drawerZIndex > drawerZIndex)) {
        updateZindex()
      }
    }

    const formDesignPrivateMethods: DrawerPrivateMethods = {}

    Object.assign($xeDrawer, drawerMethods, formDesignPrivateMethods)

    const renderTitles = () => {
      const { slots: propSlots = {}, showClose, title } = props
      const titleSlot = slots.title || propSlots.title
      const cornerSlot = slots.corner || propSlots.corner
      const titVNs = [
        h('div', {
          class: 'vxe-drawer--header-title'
        }, titleSlot ? getSlotVNs(titleSlot({ $drawer: $xeDrawer })) : (title ? getFuncText(title) : GlobalConfig.i18n('vxe.alert.title')))
      ]
      const rightVNs = []
      if (cornerSlot) {
        rightVNs.push(
          h('span', {
            class: 'vxe-drawer--corner-wrapper'
          }, getSlotVNs(cornerSlot({ $drawer: $xeDrawer })))
        )
      }
      if (showClose) {
        rightVNs.push(
          h('i', {
            class: ['vxe-drawer--close-btn', 'trigger--btn', GlobalConfig.icon.MODAL_CLOSE],
            title: GlobalConfig.i18n('vxe.drawer.close'),
            onClick: closeEvent
          })
        )
      }
      titVNs.push(
        h('div', {
          class: 'vxe-drawer--header-right'
        }, rightVNs)
      )
      return titVNs
    }

    const renderHeader = () => {
      const { slots: propSlots = {}, showTitleOverflow } = props
      const headerSlot = slots.header || propSlots.header
      const headVNs: VNode[] = []
      if (props.showHeader) {
        headVNs.push(
          h('div', {
            class: ['vxe-drawer--header', {
              'is--ellipsis': showTitleOverflow
            }]
          }, headerSlot
            ? (!reactData.inited || (props.destroyOnClose && !reactData.visible) ? [] : getSlotVNs(headerSlot({ $drawer: $xeDrawer })))
            : renderTitles())
        )
      }
      return headVNs
    }

    const renderBody = () => {
      const { slots: propSlots = {}, content } = props
      const defaultSlot = slots.default || propSlots.default
      return [
        h('div', {
          class: 'vxe-drawer--body'
        }, [
          h('div', {
            class: 'vxe-drawer--content'
          }, defaultSlot ? (!reactData.inited || (props.destroyOnClose && !reactData.visible) ? [] : getSlotVNs(defaultSlot({ $drawer: $xeDrawer }))) as VNode[] : getFuncText(content)),
          h(VxeLoadingComponent, {
            class: 'vxe-drawer--loading',
            modelValue: props.loading
          })
        ])
      ]
    }

    const renderBtns = () => {
      const { showCancelButton, showConfirmButton } = props
      const btnVNs = []
      if (showCancelButton) {
        btnVNs.push(
          h(VxeButtonComponent, {
            key: 1,
            ref: refCancelBtn,
            content: props.cancelButtonText || GlobalConfig.i18n('vxe.button.cancel'),
            onClick: cancelEvent
          })
        )
      }
      if (showConfirmButton) {
        btnVNs.push(
          h(VxeButtonComponent, {
            key: 2,
            ref: refConfirmBtn,
            status: 'primary',
            content: props.confirmButtonText || GlobalConfig.i18n('vxe.button.confirm'),
            onClick: confirmEvent
          })
        )
      }
      return btnVNs
    }

    const renderFooter = () => {
      const { slots: propSlots = {} } = props
      const footerSlot = slots.footer || propSlots.footer
      const footVNs: VNode[] = []
      if (props.showFooter) {
        footVNs.push(
          h('div', {
            class: 'vxe-drawer--footer'
          }, footerSlot
            ? (!reactData.inited || (props.destroyOnClose && !reactData.visible) ? [] : getSlotVNs(footerSlot({ $drawer: $xeDrawer })))
            : renderBtns())
        )
      }
      return footVNs
    }

    const renderVN = () => {
      const { className, position, loading, lockScroll, lockView, mask } = props
      const { inited, contentVisible, visible } = reactData
      const vSize = computeSize.value
      return h(Teleport, {
        to: 'body',
        disabled: props.transfer ? !inited : true
      }, [
        h('div', {
          ref: refElem,
          class: ['vxe-drawer--wrapper', `pos--${position}`, className || '', {
            [`size--${vSize}`]: vSize,
            'lock--scroll': lockScroll,
            'lock--view': lockView,
            'is--mask': mask,
            'is--visible': contentVisible,
            'is--active': visible,
            'is--loading': loading
          }],
          style: {
            zIndex: reactData.drawerZIndex
          },
          onClick: selfClickEvent
        }, [
          h('div', {
            ref: refDrawerBox,
            class: 'vxe-drawer--box',
            onMousedown: boxMousedownEvent
          }, renderHeader().concat(renderBody(), renderFooter()))
        ])
      ])
    }

    $xeDrawer.renderVN = renderVN

    watch(() => props.width, recalculate)
    watch(() => props.height, recalculate)

    watch(() => props.modelValue, (value) => {
      if (value) {
        openDrawer()
      } else {
        closeDrawer('model')
      }
    })

    onMounted(() => {
      nextTick(() => {
        if (props.modelValue) {
          openDrawer()
        }
        recalculate()
      })
      if (props.escClosable) {
        GlobalEvent.on($xeDrawer, 'keydown', handleGlobalKeydownEvent)
      }
    })

    onUnmounted(() => {
      GlobalEvent.off($xeDrawer, 'keydown')
    })

    return $xeDrawer
  },
  render () {
    return this.renderVN()
  }
})
