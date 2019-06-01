import GlobalConfig from '../../../conf'

export default {
  name: 'VxeAlert',
  props: {
    value: Boolean,
    title: { type: String, default: () => GlobalConfig.i18n('vxe.alert.title') },
    message: String,
    lockView: { type: Boolean, default: true },
    lockScroll: { type: Boolean, default: true },
    mask: { type: Boolean, default: true },
    maskClosable: { type: Boolean, default: false }
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
      return this.size || this.$parent.size || this.$parent.vSize
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
  render (h) {
    let { vSize, contentVisible, visible, title, message, lockView, mask } = this
    return h('div', {
      class: ['vxe-alert--wrapper is--animat', {
        [`size--${vSize}`]: vSize,
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
          h('vxe-button', {
            props: {
              type: 'primary'
            },
            on: {
              click: this.closeEvent
            }
          }, GlobalConfig.i18n('vxe.button.confirm'))
        ])
      ])
    ])
  },
  mounted () {
    document.body.appendChild(this.$el)
  },
  beforeDestroy () {
    this.$el.parentNode.removeChild(this.$el)
  },
  methods: {
    selfClickEvent (evnt) {
      if (this.maskClosable && evnt.target === this.$el) {
        this.close()
      }
    },
    closeEvent (evnt) {
      this.close()
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
        this.$emit('input', true)
        this.$emit('open')
      }
    },
    close () {
      let { visible, lockScroll, beforeLockStyle } = this
      if (visible) {
        this.contentVisible = false
        setTimeout(() => {
          this.visible = false
          if (lockScroll) {
            Object.assign(document.body.style, beforeLockStyle)
          }
        }, 200)
        this.$emit('input', false)
        this.$emit('close')
      }
    }
  }
}
