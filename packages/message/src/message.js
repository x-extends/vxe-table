import GlobalConfig from '../../conf'
import XEUtils from 'xe-utils'
import MsgQueue from './msgQueue'

export default {
  name: 'VxeMessage',
  props: {
    value: Boolean,
    id: String,
    type: String,
    status: String,
    top: { type: Number, default: 15 },
    title: String,
    duration: { type: Number, default: () => GlobalConfig.message.duration },
    message: [String, Function],
    lockView: { type: Boolean, default: () => GlobalConfig.message.lockView },
    lockScroll: { type: Boolean, default: () => GlobalConfig.message.lockScroll },
    mask: { type: Boolean, default: () => GlobalConfig.message.mask },
    maskClosable: Boolean,
    zIndex: { type: Number, default: () => GlobalConfig.message.zIndex },
    animat: { type: Boolean, default: () => GlobalConfig.message.animat }
  },
  data () {
    return {
      visible: false,
      contentVisible: false,
      beforeLockStyle: null,
      msgTop: 0
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
    document.body.appendChild(this.$el)
  },
  beforeDestroy () {
    this.removeMsgQueue()
    this.$el.parentNode.removeChild(this.$el)
  },
  render (h) {
    let { vSize, type, animat, zIndex, status, msgTop, contentVisible, visible, title, message, lockView, mask, isMsg } = this
    return h('div', {
      class: ['vxe-msg--wrapper', `type--${type}`, {
        [`size--${vSize}`]: vSize,
        [`msg--${status}`]: status,
        'is--animat': animat,
        'lock--view': lockView,
        'is--mask': mask,
        'is--visible': contentVisible,
        active: visible
      }],
      style: {
        zIndex,
        top: msgTop ? `${msgTop}px` : null
      },
      on: {
        click: this.selfClickEvent
      }
    }, [
      h('div', {
        class: 'vxe-msg--box',
        ref: 'msgBox'
      }, [
        !isMsg ? h('div', {
          class: 'vxe-msg--header',
          on: {
            mousedown: this.mousedownEvent
          }
        }, [
          h('span', {
            class: 'vxe-msg--title'
          }, title || GlobalConfig.i18n('vxe.alert.title')),
          h('i', {
            class: ['vxe-msg--close-btn', GlobalConfig.icon.msgClose],
            on: {
              click: this.closeEvent
            }
          })
        ]) : null,
        h('div', {
          class: 'vxe-msg--body'
        }, [
          status ? h('div', {
            class: 'vxe-msg--status-wrapper'
          }, [
            h('i', {
              class: ['vxe-msg--status-icon', GlobalConfig.icon[`msg${status.replace(/\b(\w)/, word => word.toUpperCase())}`]]
            })
          ]) : null,
          h('div', {
            class: 'vxe-msg--content'
          }, this.$slots.default || (XEUtils.isFunction(message) ? message.call(this, h) : message))
        ]),
        !isMsg ? h('div', {
          class: 'vxe-msg--footer'
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
        ]) : null
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
      let { duration, visible, lockScroll, _handleCustom, isMsg } = this
      if (!visible) {
        this.visible = true
        this.contentVisible = false
        setTimeout(() => {
          this.contentVisible = true
        }, 10)
        if (lockScroll) {
          let bodyElem = document.body
          this.beforeLockStyle = {
            paddingRight: bodyElem.style.paddingRight,
            overflow: bodyElem.style.overflow
          }
          bodyElem.style.paddingRight = `${window.innerWidth - (document.documentElement.clientWidth || document.body.clientWidth)}px`
          bodyElem.style.overflow = 'hidden'
        }
        if (!_handleCustom) {
          this.$emit('input', true)
          this.$emit('show')
        }
        if (isMsg) {
          this.addMsgQueue()
          setTimeout(this.close, duration)
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
          offsetTop += comp.top
          comp.msgTop = offsetTop
          offsetTop += comp.$refs.msgBox.clientHeight
        })
      })
    },
    close (type) {
      let { visible, lockScroll, beforeLockStyle, isMsg } = this
      if (visible) {
        if (isMsg) {
          this.removeMsgQueue()
        }
        this.contentVisible = false
        setTimeout(() => {
          this.visible = false
          if (lockScroll) {
            Object.assign(document.body.style, beforeLockStyle)
          }
          if (this._handleCustom) {
            this._handleCustom(type)
          } else {
            this.$emit('input', false)
            this.$emit('hide', type)
          }
        }, 200)
      }
    },
    mousedownEvent (evnt) {
      if (evnt.button === 0) {
        evnt.preventDefault()
        let msgBoxElem = this.$refs.msgBox
        let demMousemove = document.onmousemove
        let demMouseup = document.onmouseup
        let disX = evnt.clientX - msgBoxElem.offsetLeft
        let disY = evnt.clientY - msgBoxElem.offsetTop
        document.onmousemove = evnt => {
          evnt.preventDefault()
          let clientVisibleWidth = document.documentElement.clientWidth || document.body.clientWidth
          let clientVisibleHeight = document.documentElement.clientHeight || document.body.clientHeight
          let offsetWidth = msgBoxElem.offsetWidth
          let offsetHeight = msgBoxElem.offsetHeight
          let minX = offsetWidth / 2
          let maxX = clientVisibleWidth - offsetWidth / 2
          let minY = 0
          let maxY = clientVisibleHeight - offsetHeight
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
          msgBoxElem.style.left = `${left}px`
          msgBoxElem.style.top = `${top}px`
          msgBoxElem.className = msgBoxElem.className.replace(/\s?drag-move/, '') + ` drag-move`
        }
        document.onmouseup = evnt => {
          document.onmousemove = demMousemove
          document.onmouseup = demMouseup
          this.$nextTick(() => {
            msgBoxElem.className = msgBoxElem.className.replace(/\s?drag-move/, '')
          })
        }
      }
    }
  }
}
