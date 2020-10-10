import GlobalConfig from '../../conf'
import XEUtils from 'xe-utils/ctor'
import MsgQueue from './queue'
import allActivedModals from './activities'
import { UtilTools, DomTools, GlobalEvent } from '../../tools'

const activeModals = []

export default {
  name: 'VxeModal',
  props: {
    value: Boolean,
    id: String,
    type: { type: String, default: 'modal' },
    loading: { type: Boolean, default: null },
    status: String,
    iconStatus: String,
    className: String,
    top: { type: [Number, String], default: 15 },
    position: [String, Object],
    title: String,
    duration: { type: [Number, String], default: () => GlobalConfig.modal.duration },
    message: [String, Function],
    cancelButtonText: String,
    confirmButtonText: String,
    lockView: { type: Boolean, default: () => GlobalConfig.modal.lockView },
    lockScroll: Boolean,
    mask: { type: Boolean, default: () => GlobalConfig.modal.mask },
    maskClosable: Boolean,
    escClosable: Boolean,
    resize: Boolean,
    showHeader: { type: Boolean, default: true },
    showFooter: Boolean,
    dblclickZoom: { type: Boolean, default: () => GlobalConfig.modal.dblclickZoom },
    width: [Number, String],
    height: [Number, String],
    minWidth: { type: [Number, String], default: () => GlobalConfig.modal.minWidth },
    minHeight: { type: [Number, String], default: () => GlobalConfig.modal.minHeight },
    zIndex: Number,
    marginSize: { type: [Number, String], default: GlobalConfig.modal.marginSize },
    fullscreen: Boolean,
    remember: { type: Boolean, default: () => GlobalConfig.modal.remember },
    destroyOnClose: Boolean,
    showTitleOverflow: { type: Boolean, default: () => GlobalConfig.modal.showTitleOverflow },
    transfer: { type: Boolean, default: () => GlobalConfig.modal.transfer },
    storage: { type: Boolean, default: () => GlobalConfig.modal.storage },
    storageKey: { type: String, default: () => GlobalConfig.modal.storageKey },
    animat: { type: Boolean, default: () => GlobalConfig.modal.animat },
    size: { type: String, default: () => GlobalConfig.modal.size || GlobalConfig.size },
    slots: Object,
    events: Object
  },
  data () {
    return {
      inited: false,
      visible: false,
      contentVisible: false,
      modalTop: 0,
      modalZindex: 0,
      zoomLocat: null,
      firstOpen: false
    }
  },
  computed: {
    vSize () {
      return this.size || (this.$parent && (this.$parent.size || this.$parent.vSize))
    },
    isMsg () {
      return this.type === 'message'
    }
  },
  watch: {
    width () {
      this.recalculate()
    },
    height () {
      this.recalculate()
    },
    value (visible) {
      this[visible ? 'open' : 'close']()
    }
  },
  created () {
    if (this.storage && !this.id) {
      UtilTools.error('vxe.error.reqProp', ['modal.id'])
    }
    activeModals.push(this)
  },
  mounted () {
    const { $listeners, events = {} } = this
    if (this.value) {
      this.open()
    }
    this.recalculate()
    if (this.escClosable) {
      GlobalEvent.on(this, 'keydown', this.handleGlobalKeydownEvent)
    }
    // 触发 inserted 事件
    const type = 'inserted'
    const params = { type, $modal: this, $event: { type } }
    if ($listeners.inserted) {
      this.$emit('inserted', params)
    } else if (events.inserted) {
      events.inserted.call(this, params)
    }
  },
  beforeDestroy () {
    const { $el } = this
    GlobalEvent.off(this, 'keydown')
    this.removeMsgQueue()
    if ($el.parentNode === document.body) {
      $el.parentNode.removeChild($el)
    }
    XEUtils.remove(activeModals, $modal => $modal === this)
  },
  render (h) {
    const { $scopedSlots, slots = {}, inited, vSize, className, type, resize, animat, loading, status, iconStatus, showFooter, zoomLocat, modalTop, dblclickZoom, contentVisible, visible, title, message, lockScroll, lockView, mask, isMsg, showTitleOverflow, destroyOnClose } = this
    const defaultSlot = $scopedSlots.default || slots.default
    const footerSlot = $scopedSlots.footer || slots.footer
    const headerSlot = $scopedSlots.header || slots.header
    const titleSlot = $scopedSlots.title || slots.title
    const headerOns = {
      mousedown: this.mousedownEvent
    }
    if (resize && dblclickZoom && type === 'modal') {
      headerOns.dblclick = this.toggleZoomEvent
    }
    return h('div', {
      class: ['vxe-modal--wrapper', `type--${type}`, className, {
        [`size--${vSize}`]: vSize,
        [`status--${status}`]: status,
        'is--animat': animat,
        'lock--scroll': lockScroll,
        'lock--view': lockView,
        'is--mask': mask,
        'is--maximize': zoomLocat,
        'is--visible': contentVisible,
        'is--active': visible,
        'is--loading': loading
      }],
      style: {
        zIndex: this.modalZindex,
        top: modalTop ? `${modalTop}px` : null
      },
      on: {
        click: this.selfClickEvent
      }
    }, [
      h('div', {
        class: 'vxe-modal--box',
        on: {
          mousedown: this.boxMousedownEvent
        },
        ref: 'modalBox'
      }, [
        this.showHeader ? h('div', {
          class: ['vxe-modal--header', !isMsg && showTitleOverflow ? 'is--ellipsis' : ''],
          on: headerOns
        }, headerSlot ? (!inited || (destroyOnClose && !visible) ? [] : headerSlot.call(this, { $modal: this }, h)) : [
          titleSlot ? titleSlot.call(this, { $modal: this }, h) : h('span', {
            class: 'vxe-modal--title'
          }, title ? UtilTools.getFuncText(title) : GlobalConfig.i18n('vxe.alert.title')),
          resize ? h('i', {
            class: ['vxe-modal--zoom-btn', 'trigger--btn', zoomLocat ? GlobalConfig.icon.MODAL_ZOOM_OUT : GlobalConfig.icon.MODAL_ZOOM_IN],
            attrs: {
              title: GlobalConfig.i18n(`vxe.modal.zoom${zoomLocat ? 'Out' : 'In'}`)
            },
            on: {
              click: this.toggleZoomEvent
            }
          }) : null,
          h('i', {
            class: ['vxe-modal--close-btn', 'trigger--btn', GlobalConfig.icon.MODAL_CLOSE],
            attrs: {
              title: GlobalConfig.i18n('vxe.modal.close')
            },
            on: {
              click: this.closeEvent
            }
          })
        ]) : null,
        h('div', {
          class: 'vxe-modal--body'
        }, [
          status ? h('div', {
            class: 'vxe-modal--status-wrapper'
          }, [
            h('i', {
              class: ['vxe-modal--status-icon', iconStatus || GlobalConfig.icon[`MODAL_${status}`.toLocaleUpperCase()]]
            })
          ]) : null,
          h('div', {
            class: 'vxe-modal--content'
          }, defaultSlot ? (!inited || (destroyOnClose && !visible) ? [] : defaultSlot.call(this, { $modal: this }, h)) : UtilTools.getFuncText(message)),
          !isMsg ? h('div', {
            class: ['vxe-loading', {
              'is--visible': loading
            }]
          }, [
            h('div', {
              class: 'vxe-loading--spinner'
            })
          ]) : null
        ]),
        showFooter ? h('div', {
          class: 'vxe-modal--footer'
        }, footerSlot ? (!inited || (destroyOnClose && !visible) ? [] : footerSlot.call(this, { $modal: this }, h)) : [
          type === 'confirm' ? h('vxe-button', {
            ref: 'cancelBtn',
            on: {
              click: this.cancelEvent
            }
          }, this.cancelButtonText || GlobalConfig.i18n('vxe.button.cancel')) : null,
          h('vxe-button', {
            ref: 'confirmBtn',
            props: {
              status: 'primary'
            },
            on: {
              click: this.confirmEvent
            }
          }, this.confirmButtonText || GlobalConfig.i18n('vxe.button.confirm'))
        ]) : null,
        !isMsg && resize ? h('span', {
          class: 'vxe-modal--resize'
        }, ['wl', 'wr', 'swst', 'sest', 'st', 'swlb', 'selb', 'sb'].map(type => {
          return h('span', {
            class: `${type}-resize`,
            attrs: {
              'data-type': type
            },
            on: {
              mousedown: this.dragEvent
            }
          })
        })) : null
      ])
    ])
  },
  methods: {
    recalculate () {
      const { width, height } = this
      const modalBoxElem = this.getBox()
      modalBoxElem.style.width = width ? (isNaN(width) ? width : `${width}px`) : null
      modalBoxElem.style.height = height ? (isNaN(height) ? height : `${height}px`) : null
      return this.$nextTick()
    },
    selfClickEvent (evnt) {
      if (this.maskClosable && evnt.target === this.$el) {
        const type = 'mask'
        this.close(type)
      }
    },
    updateZindex () {
      const { zIndex, modalZindex } = this
      if (zIndex) {
        this.modalZindex = zIndex
      } else if (modalZindex < UtilTools.getLastZIndex()) {
        this.modalZindex = UtilTools.nextZIndex()
      }
    },
    closeEvent (evnt) {
      const type = 'close'
      this.$emit(type, { type, $modal: this, $event: evnt }, evnt)
      this.close(type)
    },
    confirmEvent (evnt) {
      const type = 'confirm'
      this.$emit(type, { type, $modal: this, $event: evnt }, evnt)
      this.close(type)
    },
    cancelEvent (evnt) {
      const type = 'cancel'
      this.$emit(type, { type, $modal: this, $event: evnt }, evnt)
      this.close(type)
    },
    open () {
      const { $refs, events = {}, inited, duration, visible, isMsg, remember, showFooter } = this
      if (!inited) {
        this.inited = true
        if (this.transfer) {
          document.body.appendChild(this.$el)
        }
      }
      if (!visible) {
        const type = 'show'
        const params = { type, $modal: this, $event: { type } }
        if (!remember) {
          this.recalculate()
        }
        this.visible = true
        this.contentVisible = false
        this.updateZindex()
        allActivedModals.push(this)
        this.$emit('activated', params)
        setTimeout(() => {
          this.contentVisible = true
          this.$nextTick(() => {
            if (showFooter) {
              const operBtn = $refs.confirmBtn || $refs.cancelBtn
              if (operBtn) {
                operBtn.focus()
              }
            }
            if (events.show) {
              events.show.call(this, params)
            } else {
              this.$emit('input', true)
              this.$emit('show', params)
            }
          })
        }, 10)
        if (isMsg) {
          this.addMsgQueue()
          if (duration !== -1) {
            setTimeout(this.close, XEUtils.toNumber(duration))
          }
        } else {
          this.$nextTick(() => {
            const { firstOpen, fullscreen } = this
            if (!remember || !firstOpen) {
              this.updatePosition().then(() => {
                setTimeout(() => this.updatePosition(), 20)
              })
            }
            if (!firstOpen) {
              this.firstOpen = true
              if (this.hasPosStorage()) {
                this.restorePosStorage()
              } else if (fullscreen) {
                this.$nextTick(() => this.maximize())
              }
            }
          })
        }
      }
    },
    addMsgQueue () {
      if (MsgQueue.indexOf(this) === -1) {
        MsgQueue.push(this)
      }
      this.updateStyle()
    },
    removeMsgQueue () {
      if (MsgQueue.indexOf(this) > -1) {
        XEUtils.remove(MsgQueue, comp => comp === this)
      }
      this.updateStyle()
    },
    updateStyle () {
      this.$nextTick(() => {
        let offsetTop = 0
        MsgQueue.forEach(comp => {
          offsetTop += XEUtils.toNumber(comp.top)
          comp.modalTop = offsetTop
          offsetTop += comp.$refs.modalBox.clientHeight
        })
      })
    },
    updatePosition () {
      return this.$nextTick().then(() => {
        const { marginSize, position } = this
        const modalBoxElem = this.getBox()
        const clientVisibleWidth = document.documentElement.clientWidth || document.body.clientWidth
        const clientVisibleHeight = document.documentElement.clientHeight || document.body.clientHeight
        const isPosCenter = position === 'center'
        const { top, left } = isPosCenter ? { top: position, left: position } : Object.assign({}, position)
        const topCenter = isPosCenter || top === 'center'
        const leftCenter = isPosCenter || left === 'center'
        let posTop = ''
        let posLeft = ''
        if (left && !leftCenter) {
          posLeft = isNaN(left) ? left : `${left}px`
        } else {
          posLeft = `${Math.max(marginSize, clientVisibleWidth / 2 - modalBoxElem.offsetWidth / 2)}px`
        }
        if (top && !topCenter) {
          posTop = isNaN(top) ? top : `${top}px`
        } else {
          posTop = `${Math.max(marginSize, clientVisibleHeight / 2 - modalBoxElem.offsetHeight / 2)}px`
        }
        modalBoxElem.style.top = posTop
        modalBoxElem.style.left = posLeft
      })
    },
    close (type) {
      const { events = {}, remember, visible, isMsg } = this
      const params = { type, $modal: this, $event: { type } }
      if (visible) {
        if (isMsg) {
          this.removeMsgQueue()
        }
        this.contentVisible = false
        if (!remember) {
          this.zoomLocat = null
        }
        this.$emit('deactivated', params)
        XEUtils.remove(allActivedModals, item => item === this)
        setTimeout(() => {
          this.visible = false
          if (events.hide) {
            events.hide.call(this, params)
          } else {
            this.$emit('input', false)
            this.$emit('hide', params)
          }
        }, 200)
      }
    },
    handleGlobalKeydownEvent (evnt) {
      if (evnt.keyCode === 27) {
        const lastModal = XEUtils.max(allActivedModals, item => item.modalZindex)
        // 多个时，只关掉最上层的窗口
        if (lastModal) {
          setTimeout(() => {
            if (lastModal === this && lastModal.escClosable) {
              this.close()
            }
          }, 10)
        }
      }
    },
    getBox () {
      return this.$refs.modalBox
    },
    isMaximized () {
      return !!this.zoomLocat
    },
    maximize () {
      return this.$nextTick().then(() => {
        if (this.resize && !this.zoomLocat) {
          const marginSize = this.marginSize
          const modalBoxElem = this.getBox()
          const { visibleHeight, visibleWidth } = DomTools.getDomNode()
          this.zoomLocat = {
            top: modalBoxElem.offsetTop,
            left: modalBoxElem.offsetLeft,
            width: modalBoxElem.offsetWidth + (modalBoxElem.style.width ? 0 : 1),
            height: modalBoxElem.offsetHeight + (modalBoxElem.style.height ? 0 : 1)
          }
          Object.assign(modalBoxElem.style, {
            top: `${marginSize}px`,
            left: `${marginSize}px`,
            width: `${visibleWidth - marginSize * 2}px`,
            height: `${visibleHeight - marginSize * 2}px`
          })
          this.savePosStorage()
        }
      })
    },
    revert () {
      return this.$nextTick().then(() => {
        const zoomLocat = this.zoomLocat
        if (zoomLocat) {
          const modalBoxElem = this.getBox()
          this.zoomLocat = null
          Object.assign(modalBoxElem.style, {
            top: `${zoomLocat.top}px`,
            left: `${zoomLocat.left}px`,
            width: `${zoomLocat.width}px`,
            height: `${zoomLocat.height}px`
          })
          this.savePosStorage()
        }
      })
    },
    zoom () {
      return this[this.zoomLocat ? 'revert' : 'maximize']().then(() => this.isMaximized())
    },
    toggleZoomEvent (evnt) {
      const { $listeners, zoomLocat, events = {} } = this
      const params = { type: zoomLocat ? 'revert' : 'max', $modal: this, $event: evnt }
      return this.zoom().then(() => {
        if ($listeners.zoom) {
          this.$emit('zoom', params, evnt)
        } else if (events.zoom) {
          events.zoom.call(this, params, evnt)
        }
      })
    },
    getPosition () {
      if (!this.isMsg) {
        const modalBoxElem = this.getBox()
        if (modalBoxElem) {
          return {
            top: modalBoxElem.offsetTop,
            left: modalBoxElem.offsetLeft
          }
        }
      }
      return null
    },
    setPosition (top, left) {
      if (!this.isMsg) {
        const modalBoxElem = this.getBox()
        if (XEUtils.isNumber(top)) {
          modalBoxElem.style.top = `${top}px`
        }
        if (XEUtils.isNumber(left)) {
          modalBoxElem.style.left = `${left}px`
        }
      }
      return this.$nextTick()
    },
    boxMousedownEvent () {
      const { modalZindex } = this
      if (activeModals.some(_vm => _vm.visible && _vm.modalZindex > modalZindex)) {
        this.updateZindex()
      }
    },
    mousedownEvent (evnt) {
      const { remember, storage, marginSize, zoomLocat } = this
      const modalBoxElem = this.getBox()
      if (!zoomLocat && evnt.button === 0 && !DomTools.getEventTargetNode(evnt, modalBoxElem, 'trigger--btn').flag) {
        evnt.preventDefault()
        const domMousemove = document.onmousemove
        const domMouseup = document.onmouseup
        const disX = evnt.clientX - modalBoxElem.offsetLeft
        const disY = evnt.clientY - modalBoxElem.offsetTop
        const { visibleHeight, visibleWidth } = DomTools.getDomNode()
        document.onmousemove = evnt => {
          evnt.preventDefault()
          const offsetWidth = modalBoxElem.offsetWidth
          const offsetHeight = modalBoxElem.offsetHeight
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
          modalBoxElem.style.left = `${left}px`
          modalBoxElem.style.top = `${top}px`
        }
        document.onmouseup = () => {
          document.onmousemove = domMousemove
          document.onmouseup = domMouseup
          if (remember && storage) {
            this.$nextTick(() => {
              this.savePosStorage()
            })
          }
        }
      }
    },
    dragEvent (evnt) {
      evnt.preventDefault()
      const { $listeners, marginSize, events = {}, remember, storage } = this
      const { visibleHeight, visibleWidth } = DomTools.getDomNode()
      const type = evnt.target.dataset.type
      const minWidth = XEUtils.toNumber(this.minWidth)
      const minHeight = XEUtils.toNumber(this.minHeight)
      const maxWidth = visibleWidth
      const maxHeight = visibleHeight
      const modalBoxElem = this.getBox()
      const domMousemove = document.onmousemove
      const domMouseup = document.onmouseup
      const clientWidth = modalBoxElem.clientWidth
      const clientHeight = modalBoxElem.clientHeight
      const disX = evnt.clientX
      const disY = evnt.clientY
      const offsetTop = modalBoxElem.offsetTop
      const offsetLeft = modalBoxElem.offsetLeft
      const params = { type: 'resize', $modal: this }
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
                modalBoxElem.style.width = `${width < maxWidth ? width : maxWidth}px`
                modalBoxElem.style.left = `${offsetLeft - dragLeft}px`
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
                modalBoxElem.style.width = `${width < maxWidth ? width : maxWidth}px`
                modalBoxElem.style.left = `${offsetLeft - dragLeft}px`
              }
            }
            if (offsetTop - dragTop > marginSize) {
              if (height > minHeight) {
                modalBoxElem.style.height = `${height < maxHeight ? height : maxHeight}px`
                modalBoxElem.style.top = `${offsetTop - dragTop}px`
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
                modalBoxElem.style.width = `${width < maxWidth ? width : maxWidth}px`
                modalBoxElem.style.left = `${offsetLeft - dragLeft}px`
              }
            }
            if (offsetTop + height + marginSize < visibleHeight) {
              if (height > minHeight) {
                modalBoxElem.style.height = `${height < maxHeight ? height : maxHeight}px`
              }
            }
            break
          case 'st':
            dragTop = disY - evnt.clientY
            height = clientHeight + dragTop
            if (offsetTop - dragTop > marginSize) {
              if (height > minHeight) {
                modalBoxElem.style.height = `${height < maxHeight ? height : maxHeight}px`
                modalBoxElem.style.top = `${offsetTop - dragTop}px`
              }
            }
            break
          case 'wr':
            dragLeft = evnt.clientX - disX
            width = dragLeft + clientWidth
            if (offsetLeft + width + marginSize < visibleWidth) {
              if (width > minWidth) {
                modalBoxElem.style.width = `${width < maxWidth ? width : maxWidth}px`
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
                modalBoxElem.style.width = `${width < maxWidth ? width : maxWidth}px`
              }
            }
            if (offsetTop - dragTop > marginSize) {
              if (height > minHeight) {
                modalBoxElem.style.height = `${height < maxHeight ? height : maxHeight}px`
                modalBoxElem.style.top = `${offsetTop - dragTop}px`
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
                modalBoxElem.style.width = `${width < maxWidth ? width : maxWidth}px`
              }
            }
            if (offsetTop + height + marginSize < visibleHeight) {
              if (height > minHeight) {
                modalBoxElem.style.height = `${height < maxHeight ? height : maxHeight}px`
              }
            }
            break
          case 'sb':
            dragTop = evnt.clientY - disY
            height = dragTop + clientHeight
            if (offsetTop + height + marginSize < visibleHeight) {
              if (height > minHeight) {
                modalBoxElem.style.height = `${height < maxHeight ? height : maxHeight}px`
              }
            }
            break
        }
        modalBoxElem.className = modalBoxElem.className.replace(/\s?is--drag/, '') + ' is--drag'
        if (remember && storage) {
          this.savePosStorage()
        }
        if ($listeners.zoom) {
          this.$emit('zoom', params, evnt)
        } else if (events.zoom) {
          events.zoom.call(this, params, evnt)
        }
      }
      document.onmouseup = () => {
        this.zoomLocat = null
        document.onmousemove = domMousemove
        document.onmouseup = domMouseup
        setTimeout(() => {
          modalBoxElem.className = modalBoxElem.className.replace(/\s?is--drag/, '')
        }, 50)
      }
    },
    getStorageMap (key) {
      const version = GlobalConfig.version
      const rest = XEUtils.toStringJSON(localStorage.getItem(key))
      return rest && rest._v === version ? rest : { _v: version }
    },
    hasPosStorage () {
      const { id, remember, storage, storageKey } = this
      return !!(remember && storage && this.getStorageMap(storageKey)[id])
    },
    restorePosStorage () {
      const { id, remember, storage, storageKey } = this
      if (remember && storage) {
        const posStorage = this.getStorageMap(storageKey)[id]
        if (posStorage) {
          const modalBoxElem = this.getBox()
          const [left, top, width, height, zoomLeft, zoomTop, zoomWidth, zoomHeight] = posStorage.split(',')
          if (left) {
            modalBoxElem.style.left = `${left}px`
          }
          if (top) {
            modalBoxElem.style.top = `${top}px`
          }
          if (width) {
            modalBoxElem.style.width = `${width}px`
          }
          if (height) {
            modalBoxElem.style.height = `${height}px`
          }
          if (zoomLeft && zoomTop) {
            this.zoomLocat = {
              left: zoomLeft,
              top: zoomTop,
              width: zoomWidth,
              height: zoomHeight
            }
          }
        }
      }
    },
    savePosStorage () {
      const { id, remember, storage, storageKey, zoomLocat } = this
      if (remember && storage) {
        const modalBoxElem = this.getBox()
        const posStorageMap = this.getStorageMap(storageKey)
        posStorageMap[id] = [
          modalBoxElem.style.left,
          modalBoxElem.style.top,
          modalBoxElem.style.width,
          modalBoxElem.style.height
        ].concat(zoomLocat ? [
          zoomLocat.left,
          zoomLocat.top,
          zoomLocat.width,
          zoomLocat.height
        ] : []).map(val => val ? XEUtils.toNumber(val) : '').join(',')
        localStorage.setItem(storageKey, XEUtils.toJSONString(posStorageMap))
      }
    }
  }
}
