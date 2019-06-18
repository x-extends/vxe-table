import GlobalConfig from '../../conf'

export default {
  name: 'VxeMessageBox',
  props: {
    value: Boolean,
    type: String,
    title: { type: String, default: () => GlobalConfig.i18n('vxe.alert.title') },
    message: String,
    lockView: { type: Boolean, default: () => GlobalConfig.message.lockView },
    lockScroll: { type: Boolean, default: () => GlobalConfig.message.lockScroll },
    mask: { type: Boolean, default: () => GlobalConfig.message.mask },
    maskClosable: Boolean,
    animat: { type: Boolean, default: () => GlobalConfig.message.animat }
  },
  data () {
    return {
      visible: false,
      contentVisible: false,
      beforeLockStyle: null
    }
  },
  computed: {
    vSize () {
      return this.size || (this.$parent && (this.$parent.size || this.$parent.vSize))
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
    this.$el.parentNode.removeChild(this.$el)
  },
  render (h) {
    let { vSize, type, animat, contentVisible, visible, title, message, lockView, mask } = this
    return h('div', {
      class: ['vxe-alert--wrapper', {
        [`size--${vSize}`]: vSize,
        'is--animat': animat,
        'lock--view': lockView,
        'is--mask': mask,
        'is--visible': contentVisible,
        active: visible
      }],
      on: {
        click: this.selfClickEvent
      }
    }, [
      h('div', {
        class: 'vxe-alert--box'
      }, [
        h('div', {
          class: 'vxe-alert--header'
        }, [
          h('span', {
            class: 'vxe-alert--title'
          }, title),
          h('i', {
            class: 'vxe-alert--close-icon',
            on: {
              click: this.closeEvent
            }
          })
        ]),
        h('div', {
          class: 'vxe-alert--body'
        }, [
          h('span', {
            class: 'vxe-alert--content'
          }, this.$slots.default || message)
        ]),
        h('div', {
          class: 'vxe-alert--footer'
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
        ])
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
      if (!this.visible) {
        this.visible = true
        this.contentVisible = false
        setTimeout(() => {
          this.contentVisible = true
        }, 10)
        if (this.lockScroll) {
          let bodyElem = document.body
          this.beforeLockStyle = {
            paddingRight: bodyElem.style.paddingRight,
            overflow: bodyElem.style.overflow
          }
          bodyElem.style.paddingRight = `${window.innerWidth - (document.documentElement.clientWidth || document.body.clientWidth)}px`
          bodyElem.style.overflow = 'hidden'
        }
        if (!this._handleCustom) {
          this.$emit('input', true)
          this.$emit('show')
        }
      }
    },
    close (type) {
      let { visible, lockScroll, beforeLockStyle } = this
      if (visible) {
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
    }
  }
}
