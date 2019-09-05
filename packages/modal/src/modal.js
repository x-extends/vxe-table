import GlobalConfig from '../../conf'
import XEUtils from 'xe-utils'
import MsgQueue from './queue'
import { UtilTools, DomTools, GlobalEvent } from '../../tools'

let cumsumZindex = 0
let maxZindex = 0
function getZIndex () {
  maxZindex = GlobalConfig.modal.zIndex + cumsumZindex++
  return maxZindex
}

export default {
  name: 'VxeModal',
  props: {
    value: Boolean,
    id: String,
    type: { type: String, default: 'modal' },
    status: String,
    top: { type: [Number, String], default: 15 },
    title: String,
    duration: { type: [Number, String], default: () => GlobalConfig.modal.duration },
    message: [String, Function],
    lockView: { type: Boolean, default: () => GlobalConfig.modal.lockView },
    lockScroll: Boolean,
    mask: { type: Boolean, default: () => GlobalConfig.modal.mask },
    maskClosable: Boolean,
    escClosable: Boolean,
    resize: Boolean,
    showHeader: { type: Boolean, default: true },
    showFooter: { type: Boolean, default: true },
    width: [Number, String],
    height: [Number, String],
    zIndex: [Number, String],
    marginSize: { type: [Number, String], default: GlobalConfig.modal.marginSize },
    animat: { type: Boolean, default: () => GlobalConfig.modal.animat },
    slots: Object,
    events: Object
  },
  data () {
    return {
      visible: false,
      contentVisible: false,
      modalTop: 0,
      modalZindex: 0,
      zoomLocat: null
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
    value (visible) {
      this[visible ? 'open' : 'close']()
    }
  },
  created () {
    if (this.value) {
      this.open()
    }
    this.modalZindex = this.zIndex || getZIndex()
  },
  mounted () {
    let { width, height } = this
    let modalBoxElem = this.getBox()
    Object.assign(modalBoxElem.style, {
      width: width ? (isNaN(width) ? width : `${width}px`) : null,
      height: height ? (isNaN(height) ? height : `${height}px`) : null
    })
    if (this.escClosable) {
      GlobalEvent.on(this, 'keydown', this.handleGlobalKeydownEvent)
    }
    document.body.appendChild(this.$el)
  },
  beforeDestroy () {
    GlobalEvent.off(this, 'keydown')
    this.removeMsgQueue()
    this.$el.parentNode.removeChild(this.$el)
  },
  render (h) {
    let {
      $scopedSlots,
      slots = {},
      vSize,
      type,
      resize,
      animat,
      status,
      showHeader,
      showFooter,
      zoomLocat,
      modalTop,
      contentVisible,
      visible,
      title,
      message,
      lockScroll,
      lockView,
      mask,
      isMsg
    } = this
    let defaultSlot = $scopedSlots.default || slots.default
    let footerSlot = $scopedSlots.footer || slots.footer
    return h('div', {
      class: ['vxe-modal--wrapper', `type--${type}`, {
        [`size--${vSize}`]: vSize,
        [`status--${status}`]: status,
        'is--animat': animat,
        'lock--scroll': lockScroll,
        'lock--view': lockView,
        'is--mask': mask,
        'is--visible': contentVisible,
        active: visible
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
          mousedown: this.updateZindex
        },
        ref: 'modalBox'
      }, [
        showHeader ? h('div', {
          class: 'vxe-modal--header',
          on: {
            mousedown: this.mousedownEvent
          }
        }, [
          h('span', {
            class: 'vxe-modal--title'
          }, title ? UtilTools.getFuncText(title) : GlobalConfig.i18n('vxe.alert.title')),
          resize ? h('i', {
            class: ['vxe-modal--zoom-btn', 'trigger--btn', zoomLocat ? GlobalConfig.icon.zoomOut : GlobalConfig.icon.zoomIn],
            on: {
              click: this.zoomInEvent
            }
          }) : null,
          h('i', {
            class: ['vxe-modal--close-btn', 'trigger--btn', GlobalConfig.icon.modalClose],
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
              class: ['vxe-modal--status-icon', GlobalConfig.icon[`modal${status.replace(/\b(\w)/, word => word.toUpperCase())}`]]
            })
          ]) : null,
          h('div', {
            class: 'vxe-modal--content'
          }, defaultSlot ? defaultSlot.call(this, { $modal: this }, h) : (XEUtils.isFunction(message) ? message.call(this, h) : message))
        ]),
        showFooter ? h('div', {
          class: 'vxe-modal--footer'
        }, footerSlot ? footerSlot.call(this, { $modal: this }, h) : [
          type === 'confirm' ? h('vxe-button', {
            on: {
              click: this.cancelEvent
            }
          }, GlobalConfig.i18n('vxe.button.cancel')) : null,
          h('vxe-button', {
            props: {
              type: 'primary'
            },
            on: {
              click: this.confirmEvent
            }
          }, GlobalConfig.i18n('vxe.button.confirm'))
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
    selfClickEvent (evnt) {
      if (this.maskClosable && evnt.target === this.$el) {
        let type = 'mask'
        this.close(type)
      }
    },
    updateZindex () {
      if (this.modalZindex < maxZindex) {
        this.modalZindex = getZIndex()
      }
    },
    closeEvent (evnt) {
      let type = 'close'
      this.$emit(type, { type, $modal: this }, evnt)
      this.close(type)
    },
    confirmEvent (evnt) {
      let type = 'confirm'
      this.$emit(type, { type, $modal: this }, evnt)
      this.close(type)
    },
    cancelEvent (evnt) {
      let type = 'cancel'
      this.$emit(type, { type, $modal: this }, evnt)
      this.close(type)
    },
    open () {
      let { $listeners, events = {}, duration, visible, isMsg } = this
      if (!visible) {
        let params = { type: 'show', $modal: this }
        this.visible = true
        this.contentVisible = false
        this.updateZindex()
        if (!events.show) {
          this.$emit('input', true)
          this.$emit('show', params)
        }
        setTimeout(() => {
          this.contentVisible = true
          if (!$listeners.show && events.show) {
            this.$nextTick(() => {
              events.show.call(this, params)
            })
          }
        }, 10)
        if (isMsg) {
          this.addMsgQueue()
          setTimeout(this.close, XEUtils.toNumber(duration))
        } else {
          this.$nextTick(() => {
            let { marginSize } = this
            let modalBoxElem = this.getBox()
            let clientVisibleWidth = document.documentElement.clientWidth || document.body.clientWidth
            let clientVisibleHeight = document.documentElement.clientHeight || document.body.clientHeight
            modalBoxElem.style.left = `${clientVisibleWidth / 2 - modalBoxElem.offsetWidth / 2}px`
            if (modalBoxElem.offsetHeight + modalBoxElem.offsetTop + marginSize > clientVisibleHeight) {
              modalBoxElem.style.top = `${marginSize}px`
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
    close (type) {
      let { events = {}, visible, isMsg } = this
      if (visible) {
        if (isMsg) {
          this.removeMsgQueue()
        }
        this.contentVisible = false
        setTimeout(() => {
          this.visible = false
          let params = { type, $modal: this }
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
        this.close()
      }
    },
    getBox () {
      return this.$refs.modalBox
    },
    zoomInEvent (evnt) {
      let { $listeners, marginSize, zoomLocat, events = {} } = this
      let { visibleHeight, visibleWidth } = DomTools.getDomNode()
      let modalBoxElem = this.getBox()
      let type = 'min'
      if (zoomLocat) {
        this.zoomLocat = null
        Object.assign(modalBoxElem.style, {
          top: `${zoomLocat.top}px`,
          left: `${zoomLocat.left}px`,
          width: `${zoomLocat.width}px`,
          height: `${zoomLocat.height}px`
        })
      } else {
        type = 'max'
        this.zoomLocat = {
          top: modalBoxElem.offsetTop,
          left: modalBoxElem.offsetLeft,
          width: modalBoxElem.clientWidth,
          height: modalBoxElem.clientHeight
        }
        Object.assign(modalBoxElem.style, {
          top: `${marginSize}px`,
          left: `${marginSize}px`,
          width: `${visibleWidth - marginSize * 2}px`,
          height: `${visibleHeight - marginSize * 2}px`
        })
      }
      let params = { type, $modal: this }
      if ($listeners.zoom) {
        this.$emit('zoom', params, evnt)
      } else if (events.zoom) {
        events.zoom.call(this, params, evnt)
      }
    },
    mousedownEvent (evnt) {
      let { marginSize } = this
      let modalBoxElem = this.getBox()
      if (evnt.button === 0 && !DomTools.getEventTargetNode(evnt, modalBoxElem, 'trigger--btn').flag) {
        evnt.preventDefault()
        let demMousemove = document.onmousemove
        let demMouseup = document.onmouseup
        let disX = evnt.clientX - modalBoxElem.offsetLeft
        let disY = evnt.clientY - modalBoxElem.offsetTop
        let { visibleHeight, visibleWidth } = DomTools.getDomNode()
        document.onmousemove = evnt => {
          evnt.preventDefault()
          let offsetWidth = modalBoxElem.offsetWidth
          let offsetHeight = modalBoxElem.offsetHeight
          let minX = marginSize
          let maxX = visibleWidth - offsetWidth - marginSize
          let minY = marginSize
          let maxY = visibleHeight - offsetHeight - marginSize
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
          modalBoxElem.className = modalBoxElem.className.replace(/\s?is--drag/, '') + ` is--drag`
        }
        document.onmouseup = evnt => {
          document.onmousemove = demMousemove
          document.onmouseup = demMouseup
          this.$nextTick(() => {
            modalBoxElem.className = modalBoxElem.className.replace(/\s?is--drag/, '')
          })
        }
      }
    },
    dragEvent (evnt) {
      evnt.preventDefault()
      const { $listeners, marginSize, events = {} } = this
      const { visibleHeight, visibleWidth } = DomTools.getDomNode()
      const type = evnt.target.dataset.type
      const minWidth = 340
      const maxWidth = visibleWidth - 20
      const minHeight = 200
      const maxHeight = visibleHeight - 20
      const modalBoxElem = this.getBox()
      const demMousemove = document.onmousemove
      const demMouseup = document.onmouseup
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
        modalBoxElem.className = modalBoxElem.className.replace(/\s?is--drag/, '') + ` is--drag`
        if ($listeners.zoom) {
          this.$emit('zoom', params, evnt)
        } else if (events.zoom) {
          events.zoom.call(this, params, evnt)
        }
      }
      document.onmouseup = evnt => {
        document.onmousemove = demMousemove
        document.onmouseup = demMouseup
        setTimeout(() => {
          modalBoxElem.className = modalBoxElem.className.replace(/\s?is--drag/, '')
        }, 50)
      }
    }
  }
}
