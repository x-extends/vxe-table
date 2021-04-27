import { defineComponent, h, Teleport, ref, Ref, computed, reactive, nextTick, onBeforeMount, watch, PropType, VNode } from 'vue'
import XEUtils from 'xe-utils'
import { useSize } from '../../hooks/size'
import { getDomNode, getEventTargetNode } from '../../tools/dom'
import { errLog, getLastZIndex, nextZIndex, isNumVal, getFuncText } from '../../tools/utils'
import { GlobalEvent } from '../../tools/event'
import GlobalConfig from '../../v-x-e-table/src/conf'
import VxeButtonConstructor from '../../button/src/button'

import { VxeModalConstructor, VxeModalPropTypes, ModalReactData, VxeModalEmits, ModalEventTypes, VxeButtonInstance, ModalMethods, ModalPrivateRef, VxeModalMethods } from '../../../types/all'

export const allActivedModals: VxeModalConstructor[] = []
export const msgQueue: VxeModalConstructor[] = []

export default defineComponent({
  name: 'VxeModal',
  props: {
    modelValue: Boolean as PropType<VxeModalPropTypes.ModelValue>,
    id: String as PropType<VxeModalPropTypes.ID>,
    type: { type: String as PropType<VxeModalPropTypes.Type>, default: 'modal' },
    loading: { type: Boolean as PropType<VxeModalPropTypes.Loading>, default: null },
    status: String as PropType<VxeModalPropTypes.Status>,
    iconStatus: String as PropType<VxeModalPropTypes.IconStatus>,
    className: String as PropType<VxeModalPropTypes.ClassName>,
    top: { type: [Number, String] as PropType<VxeModalPropTypes.Top>, default: () => GlobalConfig.modal.top },
    position: [String, Object] as PropType<VxeModalPropTypes.Position>,
    title: String as PropType<VxeModalPropTypes.Title>,
    duration: { type: [Number, String] as PropType<VxeModalPropTypes.Duration>, default: () => GlobalConfig.modal.duration },
    message: [Number, String] as PropType<VxeModalPropTypes.Message>,
    content: [Number, String] as PropType<VxeModalPropTypes.Content>,
    cancelButtonText: { type: String as PropType<VxeModalPropTypes.CancelButtonText>, default: () => GlobalConfig.modal.cancelButtonText },
    confirmButtonText: { type: String as PropType<VxeModalPropTypes.ConfirmButtonText>, default: () => GlobalConfig.modal.confirmButtonText },
    lockView: { type: Boolean as PropType<VxeModalPropTypes.LockView>, default: () => GlobalConfig.modal.lockView },
    lockScroll: Boolean as PropType<VxeModalPropTypes.LockScroll>,
    mask: { type: Boolean as PropType<VxeModalPropTypes.Mask>, default: () => GlobalConfig.modal.mask },
    maskClosable: { type: Boolean as PropType<VxeModalPropTypes.MaskClosable>, default: () => GlobalConfig.modal.maskClosable },
    escClosable: { type: Boolean as PropType<VxeModalPropTypes.EscClosable>, default: () => GlobalConfig.modal.escClosable },
    resize: Boolean as PropType<VxeModalPropTypes.Resize>,
    showHeader: { type: Boolean as PropType<VxeModalPropTypes.ShowHeader>, default: () => GlobalConfig.modal.showHeader },
    showFooter: { type: Boolean as PropType<VxeModalPropTypes.ShowFooter>, default: () => GlobalConfig.modal.showFooter },
    showZoom: Boolean as PropType<VxeModalPropTypes.ShowZoom>,
    showClose: { type: Boolean as PropType<VxeModalPropTypes.ShowClose>, default: () => GlobalConfig.modal.showClose },
    dblclickZoom: { type: Boolean as PropType<VxeModalPropTypes.DblclickZoom>, default: () => GlobalConfig.modal.dblclickZoom },
    width: [Number, String] as PropType<VxeModalPropTypes.Width>,
    height: [Number, String] as PropType<VxeModalPropTypes.Height>,
    minWidth: { type: [Number, String] as PropType<VxeModalPropTypes.MinWidth>, default: () => GlobalConfig.modal.minWidth },
    minHeight: { type: [Number, String] as PropType<VxeModalPropTypes.MinHeight>, default: () => GlobalConfig.modal.minHeight },
    zIndex: Number as PropType<VxeModalPropTypes.ZIndex>,
    marginSize: { type: [Number, String] as PropType<VxeModalPropTypes.MarginSize>, default: GlobalConfig.modal.marginSize },
    fullscreen: Boolean as PropType<VxeModalPropTypes.Fullscreen>,
    remember: { type: Boolean, default: () => GlobalConfig.modal.remember },
    destroyOnClose: { type: Boolean as PropType<VxeModalPropTypes.DestroyOnClose>, default: () => GlobalConfig.modal.destroyOnClose },
    showTitleOverflow: { type: Boolean as PropType<VxeModalPropTypes.ShowTitleOverflow>, default: () => GlobalConfig.modal.showTitleOverflow },
    transfer: { type: Boolean as PropType<VxeModalPropTypes.Transfer>, default: () => GlobalConfig.modal.transfer },
    storage: { type: Boolean as PropType<VxeModalPropTypes.Storage>, default: () => GlobalConfig.modal.storage },
    storageKey: { type: String as PropType<VxeModalPropTypes.StorageKey>, default: () => GlobalConfig.modal.storageKey },
    animat: { type: Boolean as PropType<VxeModalPropTypes.Animat>, default: () => GlobalConfig.modal.animat },
    size: { type: String as PropType<VxeModalPropTypes.Size>, default: () => GlobalConfig.modal.size || GlobalConfig.size },
    beforeHideMethod: { type: Function as PropType<VxeModalPropTypes.BeforeHideMethod>, default: () => GlobalConfig.modal.beforeHideMethod },
    slots: Object as PropType<VxeModalPropTypes.Slots>
  },
  emits: [
    'update:modelValue',
    'show',
    'hide',
    'before-hide',
    'close',
    'confirm',
    'cancel',
    'zoom'
  ] as VxeModalEmits,
  setup (props, context) {
    const { slots, emit } = context

    const xID = XEUtils.uniqueId()

    const computeSize = useSize(props)

    const reactData = reactive({
      inited: false,
      visible: false,
      contentVisible: false,
      modalTop: 0,
      modalZindex: 0,
      zoomLocat: null,
      firstOpen: false
    } as ModalReactData)

    const refElem = ref() as Ref<HTMLDivElement>
    const refModalBox = ref() as Ref<HTMLDivElement>
    const refConfirmBtn = ref() as Ref<VxeButtonInstance>
    const refCancelBtn = ref() as Ref<VxeButtonInstance>

    const refMaps: ModalPrivateRef = {
      refElem
    }

    const $xemodal = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: () => refMaps
    } as VxeModalConstructor & VxeModalMethods

    let modalMethods = {} as ModalMethods

    const computeIsMsg = computed(() => {
      return props.type === 'message'
    })

    const getBox = () => {
      const boxElem = refModalBox.value
      return boxElem
    }

    const recalculate = () => {
      const { width, height } = props
      const boxElem = getBox()
      boxElem.style.width = width ? (isNumVal(width) ? `${width}px` : width) : ''
      boxElem.style.height = height ? (isNumVal(height) ? `${height}px` : height) : ''
      return nextTick()
    }

    const updateZindex = () => {
      const { zIndex } = props
      const { modalZindex } = reactData
      if (zIndex) {
        reactData.modalZindex = zIndex
      } else if (modalZindex < getLastZIndex()) {
        reactData.modalZindex = nextZIndex()
      }
    }

    const updatePosition = () => {
      return nextTick().then(() => {
        const { position } = props
        const marginSize = XEUtils.toNumber(props.marginSize)
        const boxElem = getBox()
        const clientVisibleWidth = document.documentElement.clientWidth || document.body.clientWidth
        const clientVisibleHeight = document.documentElement.clientHeight || document.body.clientHeight
        const isPosCenter = position === 'center'
        const { top, left }: any = XEUtils.isString(position) ? { top: position, left: position } : Object.assign({}, position)
        const topCenter = isPosCenter || top === 'center'
        const leftCenter = isPosCenter || left === 'center'
        let posTop = ''
        let posLeft = ''
        if (left && !leftCenter) {
          posLeft = isNaN(left) ? left : `${left}px`
        } else {
          posLeft = `${Math.max(marginSize, clientVisibleWidth / 2 - boxElem.offsetWidth / 2)}px`
        }
        if (top && !topCenter) {
          posTop = isNaN(top) ? top : `${top}px`
        } else {
          posTop = `${Math.max(marginSize, clientVisibleHeight / 2 - boxElem.offsetHeight / 2)}px`
        }
        boxElem.style.top = posTop
        boxElem.style.left = posLeft
      })
    }

    const updateStyle = () => {
      nextTick(() => {
        let offsetTop = 0
        msgQueue.forEach(comp => {
          const boxElem = comp.getBox()
          offsetTop += XEUtils.toNumber(comp.props.top)
          comp.reactData.modalTop = offsetTop
          offsetTop += boxElem.clientHeight
        })
      })
    }

    const removeMsgQueue = () => {
      if (msgQueue.indexOf($xemodal) > -1) {
        XEUtils.remove(msgQueue, comp => comp === $xemodal)
      }
      updateStyle()
    }

    const closeModal = (type: ModalEventTypes) => {
      const { remember, beforeHideMethod } = props
      const { visible } = reactData
      const isMsg = computeIsMsg.value
      const params = { type }
      if (visible) {
        Promise.resolve(beforeHideMethod ? beforeHideMethod(params) : null).then((rest) => {
          if (!XEUtils.isError(rest)) {
            if (isMsg) {
              removeMsgQueue()
            }
            reactData.contentVisible = false
            if (!remember) {
              reactData.zoomLocat = null
            }
            XEUtils.remove(allActivedModals, item => item === $xemodal)
            modalMethods.dispatchEvent('before-hide', params)
            setTimeout(() => {
              reactData.visible = false
              emit('update:modelValue', false)
              modalMethods.dispatchEvent('hide', params)
            }, 200)
          }
        }).catch(e => e)
      }
      return nextTick()
    }

    const closeEvent = (evnt: Event) => {
      const type = 'close'
      modalMethods.dispatchEvent(type, { type }, evnt)
      closeModal(type)
    }

    const confirmEvent = (evnt: Event) => {
      const type = 'confirm'
      modalMethods.dispatchEvent(type, { type }, evnt)
      closeModal(type)
    }

    const cancelEvent = (evnt: Event) => {
      const type = 'cancel'
      modalMethods.dispatchEvent(type, { type }, evnt)
      closeModal(type)
    }

    const getStorageMap = (key: string) => {
      const version = GlobalConfig.version
      const rest = XEUtils.toStringJSON(localStorage.getItem(key) || '')
      return rest && rest._v === version ? rest : { _v: version }
    }

    const hasPosStorage = () => {
      const { id, remember, storage, storageKey } = props
      return !!(id && remember && storage && getStorageMap(storageKey)[id])
    }

    const restorePosStorage = () => {
      const { id, remember, storage, storageKey } = props
      if (id && remember && storage) {
        const posStorage = getStorageMap(storageKey)[id]
        if (posStorage) {
          const boxElem = getBox()
          const [left, top, width, height, zoomLeft, zoomTop, zoomWidth, zoomHeight] = posStorage.split(',')
          if (left) {
            boxElem.style.left = `${left}px`
          }
          if (top) {
            boxElem.style.top = `${top}px`
          }
          if (width) {
            boxElem.style.width = `${width}px`
          }
          if (height) {
            boxElem.style.height = `${height}px`
          }
          if (zoomLeft && zoomTop) {
            reactData.zoomLocat = {
              left: zoomLeft,
              top: zoomTop,
              width: zoomWidth,
              height: zoomHeight
            }
          }
        }
      }
    }

    const addMsgQueue = () => {
      if (msgQueue.indexOf($xemodal) === -1) {
        msgQueue.push($xemodal)
      }
      updateStyle()
    }

    const savePosStorage = () => {
      const { id, remember, storage, storageKey } = props
      const { zoomLocat } = reactData
      if (id && remember && storage) {
        const boxElem = getBox()
        const posStorageMap = getStorageMap(storageKey)
        posStorageMap[id] = ([
          boxElem.style.left,
          boxElem.style.top,
          boxElem.style.width,
          boxElem.style.height
        ] as (string | number)[]).concat(zoomLocat ? [
          zoomLocat.left,
          zoomLocat.top,
          zoomLocat.width,
          zoomLocat.height
        ] : []).map(val => val ? XEUtils.toNumber(val) : '').join(',')
        localStorage.setItem(storageKey, XEUtils.toJSONString(posStorageMap))
      }
    }

    const maximize = () => {
      return nextTick().then(() => {
        if (!reactData.zoomLocat) {
          const marginSize = XEUtils.toNumber(props.marginSize)
          const boxElem = getBox()
          const { visibleHeight, visibleWidth } = getDomNode()
          reactData.zoomLocat = {
            top: boxElem.offsetTop,
            left: boxElem.offsetLeft,
            width: boxElem.offsetWidth + (boxElem.style.width ? 0 : 1),
            height: boxElem.offsetHeight + (boxElem.style.height ? 0 : 1)
          }
          Object.assign(boxElem.style, {
            top: `${marginSize}px`,
            left: `${marginSize}px`,
            width: `${visibleWidth - marginSize * 2}px`,
            height: `${visibleHeight - marginSize * 2}px`
          })
          savePosStorage()
        }
      })
    }

    const openModal = () => {
      const { duration, remember, showFooter } = props
      const { inited, visible } = reactData
      const isMsg = computeIsMsg.value
      if (!inited) {
        reactData.inited = true
      }
      if (!visible) {
        if (!remember) {
          recalculate()
        }
        reactData.visible = true
        reactData.contentVisible = false
        updateZindex()
        allActivedModals.push($xemodal)
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
            modalMethods.dispatchEvent('show', params)
          })
        }, 10)
        if (isMsg) {
          addMsgQueue()
          if (duration !== -1) {
            setTimeout(() => closeModal('close'), XEUtils.toNumber(duration))
          }
        } else {
          nextTick(() => {
            const { fullscreen } = props
            const { firstOpen } = reactData
            if (!remember || !firstOpen) {
              updatePosition().then(() => {
                setTimeout(() => updatePosition(), 20)
              })
            }
            if (!firstOpen) {
              reactData.firstOpen = true
              if (hasPosStorage()) {
                restorePosStorage()
              } else if (fullscreen) {
                nextTick(() => maximize())
              }
            }
          })
        }
      }
      return nextTick()
    }

    const selfClickEvent = (evnt: Event) => {
      const el = refElem.value
      if (props.maskClosable && evnt.target === el) {
        const type = 'mask'
        closeModal(type)
      }
    }

    const handleGlobalKeydownEvent = (evnt: KeyboardEvent) => {
      const isEsc = evnt.keyCode === 27
      if (isEsc) {
        const lastModal = XEUtils.max(allActivedModals, (item) => item.reactData.modalZindex)
        // 多个时，只关掉最上层的窗口
        if (lastModal) {
          setTimeout(() => {
            if (lastModal === $xemodal && lastModal.props.escClosable) {
              closeModal('exit')
            }
          }, 10)
        }
      }
    }

    const isMaximized = () => {
      return !!reactData.zoomLocat
    }

    const revert = () => {
      return nextTick().then(() => {
        const { zoomLocat } = reactData
        if (zoomLocat) {
          const boxElem = getBox()
          reactData.zoomLocat = null
          Object.assign(boxElem.style, {
            top: `${zoomLocat.top}px`,
            left: `${zoomLocat.left}px`,
            width: `${zoomLocat.width}px`,
            height: `${zoomLocat.height}px`
          })
          savePosStorage()
        }
      })
    }

    const zoom = () => {
      if (reactData.zoomLocat) {
        return revert().then(() => isMaximized())
      }
      return maximize().then(() => isMaximized())
    }

    const toggleZoomEvent = (evnt: Event) => {
      const { zoomLocat } = reactData
      const params = { type: zoomLocat ? 'revert' : 'max' }
      return zoom().then(() => {
        modalMethods.dispatchEvent('zoom', params, evnt)
      })
    }

    const getPosition = () => {
      const isMsg = computeIsMsg.value
      if (!isMsg) {
        const boxElem = getBox()
        if (boxElem) {
          return {
            top: boxElem.offsetTop,
            left: boxElem.offsetLeft
          }
        }
      }
      return null
    }

    const setPosition = (top?: number, left?: number) => {
      const isMsg = computeIsMsg.value
      if (!isMsg) {
        const boxElem = getBox()
        if (XEUtils.isNumber(top)) {
          boxElem.style.top = `${top}px`
        }
        if (XEUtils.isNumber(left)) {
          boxElem.style.left = `${left}px`
        }
      }
      return nextTick()
    }

    const boxMousedownEvent = () => {
      const { modalZindex } = reactData
      if (allActivedModals.some(comp => comp.reactData.visible && comp.reactData.modalZindex > modalZindex)) {
        updateZindex()
      }
    }

    const mousedownEvent = (evnt: MouseEvent) => {
      const { remember, storage } = props
      const { zoomLocat } = reactData
      const marginSize = XEUtils.toNumber(props.marginSize)
      const boxElem = getBox()
      if (!zoomLocat && evnt.button === 0 && !getEventTargetNode(evnt, boxElem, 'trigger--btn').flag) {
        evnt.preventDefault()
        const domMousemove = document.onmousemove
        const domMouseup = document.onmouseup
        const disX = evnt.clientX - boxElem.offsetLeft
        const disY = evnt.clientY - boxElem.offsetTop
        const { visibleHeight, visibleWidth } = getDomNode()
        document.onmousemove = evnt => {
          evnt.preventDefault()
          const offsetWidth = boxElem.offsetWidth
          const offsetHeight = boxElem.offsetHeight
          const minX = marginSize
          const maxX = visibleWidth - offsetWidth - marginSize - 1
          const minY = marginSize
          const maxY = visibleHeight - offsetHeight - marginSize - 1
          let left = evnt.clientX - disX
          let top = evnt.clientY - disY
          if (left > maxX) {
            left = maxX
          }
          if (left < minX) {
            left = minX
          }
          if (top > maxY) {
            top = maxY
          }
          if (top < minY) {
            top = minY
          }
          boxElem.style.left = `${left}px`
          boxElem.style.top = `${top}px`
        }
        document.onmouseup = () => {
          document.onmousemove = domMousemove
          document.onmouseup = domMouseup
          if (remember && storage) {
            nextTick(() => {
              savePosStorage()
            })
          }
        }
      }
    }

    const dragEvent = (evnt: MouseEvent) => {
      evnt.preventDefault()
      const { remember, storage } = props
      const { visibleHeight, visibleWidth } = getDomNode()
      const marginSize = XEUtils.toNumber(props.marginSize)
      const targetElem = evnt.target as HTMLSpanElement
      const type = targetElem.getAttribute('type')
      const minWidth = XEUtils.toNumber(props.minWidth)
      const minHeight = XEUtils.toNumber(props.minHeight)
      const maxWidth = visibleWidth
      const maxHeight = visibleHeight
      const boxElem = getBox()
      const domMousemove = document.onmousemove
      const domMouseup = document.onmouseup
      const clientWidth = boxElem.clientWidth
      const clientHeight = boxElem.clientHeight
      const disX = evnt.clientX
      const disY = evnt.clientY
      const offsetTop = boxElem.offsetTop
      const offsetLeft = boxElem.offsetLeft
      const params = { type: 'resize' }
      document.onmousemove = evnt => {
        evnt.preventDefault()
        let dragLeft
        let dragTop
        let width
        let height
        switch (type) {
          case 'wl':
            dragLeft = disX - evnt.clientX
            width = dragLeft + clientWidth
            if (offsetLeft - dragLeft > marginSize) {
              if (width > minWidth) {
                boxElem.style.width = `${width < maxWidth ? width : maxWidth}px`
                boxElem.style.left = `${offsetLeft - dragLeft}px`
              }
            }
            break
          case 'swst':
            dragLeft = disX - evnt.clientX
            dragTop = disY - evnt.clientY
            width = dragLeft + clientWidth
            height = dragTop + clientHeight
            if (offsetLeft - dragLeft > marginSize) {
              if (width > minWidth) {
                boxElem.style.width = `${width < maxWidth ? width : maxWidth}px`
                boxElem.style.left = `${offsetLeft - dragLeft}px`
              }
            }
            if (offsetTop - dragTop > marginSize) {
              if (height > minHeight) {
                boxElem.style.height = `${height < maxHeight ? height : maxHeight}px`
                boxElem.style.top = `${offsetTop - dragTop}px`
              }
            }
            break
          case 'swlb':
            dragLeft = disX - evnt.clientX
            dragTop = evnt.clientY - disY
            width = dragLeft + clientWidth
            height = dragTop + clientHeight
            if (offsetLeft - dragLeft > marginSize) {
              if (width > minWidth) {
                boxElem.style.width = `${width < maxWidth ? width : maxWidth}px`
                boxElem.style.left = `${offsetLeft - dragLeft}px`
              }
            }
            if (offsetTop + height + marginSize < visibleHeight) {
              if (height > minHeight) {
                boxElem.style.height = `${height < maxHeight ? height : maxHeight}px`
              }
            }
            break
          case 'st':
            dragTop = disY - evnt.clientY
            height = clientHeight + dragTop
            if (offsetTop - dragTop > marginSize) {
              if (height > minHeight) {
                boxElem.style.height = `${height < maxHeight ? height : maxHeight}px`
                boxElem.style.top = `${offsetTop - dragTop}px`
              }
            }
            break
          case 'wr':
            dragLeft = evnt.clientX - disX
            width = dragLeft + clientWidth
            if (offsetLeft + width + marginSize < visibleWidth) {
              if (width > minWidth) {
                boxElem.style.width = `${width < maxWidth ? width : maxWidth}px`
              }
            }
            break
          case 'sest':
            dragLeft = evnt.clientX - disX
            dragTop = disY - evnt.clientY
            width = dragLeft + clientWidth
            height = dragTop + clientHeight
            if (offsetLeft + width + marginSize < visibleWidth) {
              if (width > minWidth) {
                boxElem.style.width = `${width < maxWidth ? width : maxWidth}px`
              }
            }
            if (offsetTop - dragTop > marginSize) {
              if (height > minHeight) {
                boxElem.style.height = `${height < maxHeight ? height : maxHeight}px`
                boxElem.style.top = `${offsetTop - dragTop}px`
              }
            }
            break
          case 'selb':
            dragLeft = evnt.clientX - disX
            dragTop = evnt.clientY - disY
            width = dragLeft + clientWidth
            height = dragTop + clientHeight
            if (offsetLeft + width + marginSize < visibleWidth) {
              if (width > minWidth) {
                boxElem.style.width = `${width < maxWidth ? width : maxWidth}px`
              }
            }
            if (offsetTop + height + marginSize < visibleHeight) {
              if (height > minHeight) {
                boxElem.style.height = `${height < maxHeight ? height : maxHeight}px`
              }
            }
            break
          case 'sb':
            dragTop = evnt.clientY - disY
            height = dragTop + clientHeight
            if (offsetTop + height + marginSize < visibleHeight) {
              if (height > minHeight) {
                boxElem.style.height = `${height < maxHeight ? height : maxHeight}px`
              }
            }
            break
        }
        boxElem.className = boxElem.className.replace(/\s?is--drag/, '') + ' is--drag'
        if (remember && storage) {
          savePosStorage()
        }
        modalMethods.dispatchEvent('zoom', params, evnt)
      }
      document.onmouseup = () => {
        reactData.zoomLocat = null
        document.onmousemove = domMousemove
        document.onmouseup = domMouseup
        setTimeout(() => {
          boxElem.className = boxElem.className.replace(/\s?is--drag/, '')
        }, 50)
      }
    }

    const renderTitles = () => {
      const { slots: propSlots = {}, showClose, showZoom, title } = props
      const { zoomLocat } = reactData
      const titleSlot = slots.title || propSlots.title
      const titVNs: VNode[] = titleSlot ? titleSlot({ $modal: $xemodal }) as VNode[] : [
        h('span', {
          class: 'vxe-modal--title'
        }, title ? getFuncText(title) : GlobalConfig.i18n('vxe.alert.title'))
      ]
      if (showZoom) {
        titVNs.push(
          h('i', {
            class: ['vxe-modal--zoom-btn', 'trigger--btn', zoomLocat ? GlobalConfig.icon.MODAL_ZOOM_OUT : GlobalConfig.icon.MODAL_ZOOM_IN],
            title: GlobalConfig.i18n(`vxe.modal.zoom${zoomLocat ? 'Out' : 'In'}`),
            onClick: toggleZoomEvent
          })
        )
      }
      if (showClose) {
        titVNs.push(
          h('i', {
            class: ['vxe-modal--close-btn', 'trigger--btn', GlobalConfig.icon.MODAL_CLOSE],
            title: GlobalConfig.i18n('vxe.modal.close'),
            onClick: closeEvent
          })
        )
      }
      return titVNs
    }

    const renderHeaders = () => {
      const { slots: propSlots = {}, showZoom } = props
      const isMsg = computeIsMsg.value
      const headerSlot = slots.header || propSlots.header
      const headVNs: VNode[] = []
      if (props.showHeader) {
        const headerOns: {
          onDblclick?: typeof toggleZoomEvent;
        } = {}
        if (showZoom && props.dblclickZoom && props.type === 'modal') {
          headerOns.onDblclick = toggleZoomEvent
        }
        headVNs.push(
          h('div', {
            class: ['vxe-modal--header', !isMsg && props.showTitleOverflow ? 'is--ellipsis' : ''],
            onMousedown: mousedownEvent,
            ...headerOns
          }, headerSlot ? (!reactData.inited || (props.destroyOnClose && !reactData.visible) ? [] : headerSlot({ $modal: $xemodal })) as VNode[] : renderTitles())
        )
      }
      return headVNs
    }

    const renderBodys = () => {
      const { slots: propSlots = {}, status, message } = props
      const content = props.content || message
      const isMsg = computeIsMsg.value
      const defaultSlot = slots.default || propSlots.default
      const contVNs: VNode[] = []
      if (status) {
        contVNs.push(
          h('div', {
            class: 'vxe-modal--status-wrapper'
          }, [
            h('i', {
              class: ['vxe-modal--status-icon', props.iconStatus || GlobalConfig.icon[`MODAL_${status}`.toLocaleUpperCase()]]
            })
          ])
        )
      }
      contVNs.push(
        h('div', {
          class: 'vxe-modal--content'
        }, defaultSlot ? (!reactData.inited || (props.destroyOnClose && !reactData.visible) ? [] : defaultSlot({ $modal: $xemodal })) as VNode[] : getFuncText(content))
      )
      if (!isMsg) {
        contVNs.push(
          h('div', {
            class: ['vxe-loading', {
              'is--visible': props.loading
            }]
          }, [
            h('div', {
              class: 'vxe-loading--spinner'
            })
          ])
        )
      }
      return [
        h('div', {
          class: 'vxe-modal--body'
        }, contVNs)
      ]
    }

    const renderBtns = () => {
      const { type } = props
      const btnVNs = []
      if (type === 'confirm') {
        btnVNs.push(
          h(VxeButtonConstructor, {
            ref: refCancelBtn,
            content: props.cancelButtonText || GlobalConfig.i18n('vxe.button.cancel'),
            onClick: cancelEvent
          })
        )
      }
      btnVNs.push(
        h(VxeButtonConstructor, {
          ref: refConfirmBtn,
          status: 'primary',
          content: props.confirmButtonText || GlobalConfig.i18n('vxe.button.confirm'),
          onClick: confirmEvent
        })
      )
      return btnVNs
    }

    const renderFooters = () => {
      const { slots: propSlots = {} } = props
      const isMsg = computeIsMsg.value
      const footerSlot = slots.footer || propSlots.footer
      const footVNs: VNode[] = []
      if (props.showFooter) {
        footVNs.push(
          h('div', {
            class: 'vxe-modal--footer'
          }, footerSlot ? (!reactData.inited || (props.destroyOnClose && !reactData.visible) ? [] : footerSlot({ $modal: $xemodal })) as VNode[] : renderBtns())
        )
      }
      if (!isMsg && props.resize) {
        footVNs.push(
          h('span', {
            class: 'vxe-modal--resize'
          }, ['wl', 'wr', 'swst', 'sest', 'st', 'swlb', 'selb', 'sb'].map(type => {
            return h('span', {
              class: `${type}-resize`,
              type: type,
              onMousedown: dragEvent
            })
          }))
        )
      }
      return footVNs
    }

    modalMethods = {
      dispatchEvent (type, params, evnt) {
        emit(type, Object.assign({ $modal: $xemodal, $event: evnt }, params))
      },
      open: openModal,
      close () {
        return closeModal('close')
      },
      getBox,
      getPosition,
      setPosition,
      isMaximized,
      zoom,
      maximize,
      revert
    }

    Object.assign($xemodal, modalMethods)

    watch(() => props.width, recalculate)
    watch(() => props.height, recalculate)

    watch(() => props.modelValue, (value) => {
      if (value) {
        openModal()
      } else {
        closeModal('model')
      }
    })

    nextTick(() => {
      if (props.storage && !props.id) {
        errLog('vxe.error.reqProp', ['modal.id'])
      }
      if (props.modelValue) {
        openModal()
      }
      recalculate()
      if (props.escClosable) {
        GlobalEvent.on($xemodal, 'keydown', handleGlobalKeydownEvent)
      }
    })

    onBeforeMount(() => {
      GlobalEvent.off($xemodal, 'keydown')
      removeMsgQueue()
    })

    const renderVN = () => {
      const { className, type, animat, loading, status, lockScroll, lockView, mask, resize } = props
      const { inited, zoomLocat, modalTop, contentVisible, visible } = reactData
      const vSize = computeSize.value
      return h(Teleport, {
        to: 'body',
        disabled: props.transfer ? !inited : true
      }, [
        h('div', {
          ref: refElem,
          class: ['vxe-modal--wrapper', `type--${type}`, className || '', {
            [`size--${vSize}`]: vSize,
            [`status--${status}`]: status,
            'is--animat': animat,
            'lock--scroll': lockScroll,
            'lock--view': lockView,
            'is--resize': resize,
            'is--mask': mask,
            'is--maximize': zoomLocat,
            'is--visible': contentVisible,
            'is--active': visible,
            'is--loading': loading
          }],
          style: {
            zIndex: reactData.modalZindex,
            top: modalTop ? `${modalTop}px` : null
          },
          onClick: selfClickEvent
        }, [
          h('div', {
            ref: refModalBox,
            class: 'vxe-modal--box',
            onMousedown: boxMousedownEvent
          }, renderHeaders().concat(renderBodys(), renderFooters()))
        ])
      ])
    }

    $xemodal.renderVN = renderVN

    return $xemodal
  },
  render () {
    return this.renderVN()
  }
})
