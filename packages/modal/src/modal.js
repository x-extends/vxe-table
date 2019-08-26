import GlobalConfig from '../../conf'
import XEUtils from 'xe-utils'
import MsgQueue from './queue'
import { UtilTools, GlobalEvent } from '../../tools'

export default {
  name: 'VxeModal',
  props: {
    value: Boolean,
    id: String,
    type: { type: String, default: 'modal' },
    status: String,
    top: { type: [Number, String], default: 15 },
    title: String,
    duration: { type: [Number, String], default: () => GlobalConfig.message.duration },
    message: [String, Function],
    lockView: { type: Boolean, default: () => GlobalConfig.message.lockView },
    lockScroll: Boolean,
    mask: { type: Boolean, default: () => GlobalConfig.message.mask },
    maskClosable: Boolean,
    escClosable: Boolean,
    resize: Boolean,
    width: [Number, String],
    height: [Number, String],
    zIndex: { type: [Number, String], default: () => GlobalConfig.message.zIndex },
    marginSize: { type: [Number, String], default: GlobalConfig.message.marginSize },
    animat: { type: Boolean, default: () => GlobalConfig.message.animat }
  },
  data () {
    return {
      visible: false,
      contentVisible: false,
      modalTop: 0
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
  },
  mounted () {
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
    let { vSize, type, resize, animat, width, height, zIndex, status, modalTop, contentVisible, visible, title, message, lockScroll, lockView, mask, isMsg } = this
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
        zIndex,
        top: modalTop ? `${modalTop}px` : null
      },
      on: {
        click: this.selfClickEvent
      }
    }, [
      h('div', {
        class: 'vxe-modal--box',
        style: {
          width: width ? (isNaN(width) ? width : `${width}px`) : null,
          height: height ? (isNaN(height) ? height : `${height}px`) : null
        },
        ref: 'modalBox'
      }, [
        !isMsg ? h('div', {
          class: 'vxe-modal--header',
          on: {
            mousedown: this.mousedownEvent
          }
        }, [
          h('span', {
            class: 'vxe-modal--title'
          }, title ? UtilTools.getFuncText(title) : GlobalConfig.i18n('vxe.alert.title')),
          h('i', {
            class: ['vxe-modal--close-btn', GlobalConfig.icon.modalClose],
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
          }, this.$slots.default || (XEUtils.isFunction(message) ? message.call(this, h) : message))
        ]),
        !isMsg ? h('div', {
          class: 'vxe-modal--footer'
        }, [
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
        }, ['wl', 'wr', 'swlb', 'selb', 'bs'].map(type => {
          return h('span', {
            class: `${type}-resize`,
            on: {
              mousedown: this[`${type}MousedownEvent`]
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
    closeEvent (evnt) {
      let type = 'close'
      this.$emit(type, evnt)
      this.close(type)
    },
    confirmEvent (evnt) {
      let type = 'confirm'
      this.$emit(type, evnt)
      this.close(type)
    },
    cancelEvent (evnt) {
      let type = 'cancel'
      this.$emit(type, evnt)
      this.close(type)
    },
    open () {
      let { duration, visible, _handleCustom, isMsg } = this
      if (!visible) {
        this.visible = true
        this.contentVisible = false
        setTimeout(() => {
          this.contentVisible = true
        }, 10)
        if (!_handleCustom) {
          this.$emit('input', true)
          this.$emit('show')
        }
        if (isMsg) {
          this.addMsgQueue()
          setTimeout(this.close, XEUtils.toNumber(duration))
        } else {
          this.$nextTick(() => {
            let { $refs, marginSize } = this
            let modalBoxElem = $refs.modalBox
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
      let { visible, isMsg } = this
      if (visible) {
        if (isMsg) {
          this.removeMsgQueue()
        }
        this.contentVisible = false
        setTimeout(() => {
          this.visible = false
          if (this._handleCustom) {
            this._handleCustom(type)
          } else {
            this.$emit('input', false)
            this.$emit('hide', type)
          }
        }, 200)
      }
    },
    handleGlobalKeydownEvent (evnt) {
      if (evnt.keyCode === 27) {
        this.close()
      }
    },
    mousedownEvent (evnt) {
      if (evnt.button === 0) {
        evnt.preventDefault()
        let { $refs, marginSize } = this
        let modalBoxElem = $refs.modalBox
        let demMousemove = document.onmousemove
        let demMouseup = document.onmouseup
        let disX = evnt.clientX - modalBoxElem.offsetLeft
        let disY = evnt.clientY - modalBoxElem.offsetTop
        document.onmousemove = evnt => {
          evnt.preventDefault()
          let clientVisibleWidth = document.documentElement.clientWidth || document.body.clientWidth
          let clientVisibleHeight = document.documentElement.clientHeight || document.body.clientHeight
          let offsetWidth = modalBoxElem.offsetWidth
          let offsetHeight = modalBoxElem.offsetHeight
          let minX = marginSize
          let maxX = clientVisibleWidth - offsetWidth - marginSize
          let minY = marginSize
          let maxY = clientVisibleHeight - offsetHeight - marginSize
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
    resizeWinEvent (type, evnt) {
      evnt.preventDefault()
      const clientVisibleWidth = document.documentElement.clientWidth || document.body.clientWidth
      const clientVisibleHeight = document.documentElement.clientHeight || document.body.clientHeight
      const minWidth = 340
      const maxWidth = clientVisibleWidth - 20
      const minHeight = 200
      const maxHeight = clientVisibleHeight - 20
      const modalBoxElem = this.$refs.modalBox
      const demMousemove = document.onmousemove
      const demMouseup = document.onmouseup
      const clientWidth = modalBoxElem.clientWidth
      const clientHeight = modalBoxElem.clientHeight
      const disX = evnt.clientX
      const disY = evnt.clientY
      switch (type) {
        case 'l-w':
        case 'lb-sw':
          modalBoxElem.style.right = `${clientVisibleWidth - clientWidth - modalBoxElem.offsetLeft}px`
          modalBoxElem.style.left = 'auto'
          break
        case 'r-w':
        case 'lb-se':
          modalBoxElem.style.left = `${modalBoxElem.offsetLeft}px`
          modalBoxElem.style.right = 'auto'
          break
      }
      document.onmousemove = evnt => {
        evnt.preventDefault()
        let offsetLeft
        let offsetTop
        let width
        let height
        switch (type) {
          case 'l-w':
            offsetLeft = disX - evnt.clientX
            width = offsetLeft + clientWidth
            modalBoxElem.style.width = `${width > minWidth ? (width < maxWidth ? width : maxWidth) : minWidth}px`
            break
          case 'lb-sw':
            offsetLeft = disX - evnt.clientX
            offsetTop = evnt.clientY - disY
            width = offsetLeft + clientWidth
            height = offsetTop + clientHeight
            modalBoxElem.style.width = `${width > minWidth ? (width < maxWidth ? width : maxWidth) : minWidth}px`
            modalBoxElem.style.height = `${height > minHeight ? (height < maxHeight ? height : maxHeight) : minHeight}px`
            break
          case 'r-w':
            offsetLeft = evnt.clientX - disX
            width = offsetLeft + clientWidth
            modalBoxElem.style.width = `${width > minWidth ? (width < maxWidth ? width : maxWidth) : minWidth}px`
            break
          case 'lb-se':
            offsetLeft = evnt.clientX - disX
            offsetTop = evnt.clientY - disY
            width = offsetLeft + clientWidth
            height = offsetTop + clientHeight
            modalBoxElem.style.width = `${width > minWidth ? (width < maxWidth ? width : maxWidth) : minWidth}px`
            modalBoxElem.style.height = `${height > minHeight ? (height < maxHeight ? height : maxHeight) : minHeight}px`
            break
          case 'b-s':
            offsetTop = evnt.clientY - disY
            height = offsetTop + clientHeight
            modalBoxElem.style.height = `${height > minHeight ? (height < maxHeight ? height : maxHeight) : minHeight}px`
            break
        }
        modalBoxElem.className = modalBoxElem.className.replace(/\s?is--drag/, '') + ` is--drag`
      }
      document.onmouseup = evnt => {
        document.onmousemove = demMousemove
        document.onmouseup = demMouseup
        setTimeout(() => {
          modalBoxElem.className = modalBoxElem.className.replace(/\s?is--drag/, '')
        }, 50)
      }
    },
    wlMousedownEvent (evnt) {
      this.resizeWinEvent('l-w', evnt)
    },
    wrMousedownEvent (evnt) {
      this.resizeWinEvent('r-w', evnt)
    },
    swlbMousedownEvent (evnt) {
      this.resizeWinEvent('lb-sw', evnt)
    },
    selbMousedownEvent (evnt) {
      this.resizeWinEvent('lb-se', evnt)
    },
    bsMousedownEvent (evnt) {
      this.resizeWinEvent('b-s', evnt)
    }
  }
}
