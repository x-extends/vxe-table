import XEUtils from 'xe-utils'
import GlobalConfig from '../../conf'
import { DomTools } from '../../tools'

export default {
  name: 'VxeTooltip',
  props: {
    value: Boolean,
    theme: { type: String, default: () => GlobalConfig.tooltip.theme },
    content: [String, Function],
    zIndex: { type: Number, default: () => GlobalConfig.tooltip.zIndex },
    isArrow: { type: Boolean, default: true }
  },
  data () {
    return {
      isUpdate: false,
      visible: false,
      message: '',
      tipStore: {
        style: {},
        placement: '',
        arrowStyle: null
      }
    }
  },
  watch: {
    content (value) {
      this.message = value
    },
    value (value) {
      if (!this.isUpdate) {
        this[value ? 'show' : 'close']()
      }
      this.isUpdate = false
    }
  },
  mounted () {
    let { $el, content, value } = this
    let parentNode = $el.parentNode
    this.message = content
    Array.from($el.children).forEach((elem, index) => {
      if (index > 1) {
        parentNode.insertBefore(elem, $el)
        this.target = elem
      }
    })
    parentNode.removeChild($el)
    if (value) {
      this.show()
    }
  },
  beforeDestroy () {
    let { $el } = this
    let parentNode = $el.parentNode
    if (parentNode) {
      parentNode.removeChild($el)
    }
  },
  render (h) {
    let { theme, message, isArrow, visible, tipStore } = this
    return h('div', {
      class: ['vxe-table--tooltip-wrapper', `theme--${theme}`, `placement--${tipStore.placement}`, {
        'is--visible': visible,
        'is--arrow': isArrow
      }],
      style: tipStore.style,
      ref: 'tipWrapper'
    }, [
      h('div', {
        class: 'vxe-table--tooltip-content'
      }, this.$slots.content || message),
      h('div', {
        class: 'vxe-table--tooltip-arrow',
        style: tipStore.arrowStyle
      })
    ].concat(this.$slots.default))
  },
  methods: {
    show () {
      return this.toVisible(this.target)
    },
    close () {
      Object.assign(this.tipStore, {
        style: {},
        placement: '',
        arrowStyle: null
      })
      this.update(false)
      return this.$nextTick()
    },
    update (value) {
      if (value !== this.visible) {
        this.visible = value
        this.isUpdate = true
        if (this.$listeners.input) {
          this.$emit('input', this.visible)
        }
      }
    },
    toVisible (target, message) {
      if (target) {
        let { $el, tipStore, zIndex } = this
        let { top, left } = DomTools.getAbsolutePos(target)
        let { scrollTop, scrollLeft, visibleWidth } = DomTools.getDomNode()
        let parentNode = $el.parentNode
        let tipLeft = left
        tipStore.placement = 'top'
        tipStore.style = { width: 'auto' }
        tipStore.arrowStyle = { left: '50%' }
        if (!parentNode) {
          document.body.appendChild($el)
        }
        if (message) {
          this.message = message
        }
        this.update(true)
        return this.$nextTick().then(() => {
          let wrapperElem = $el
          if (wrapperElem) {
            let clientHeight = wrapperElem.clientHeight
            let clientWidth = XEUtils.toNumber(getComputedStyle(wrapperElem).width)
            tipLeft = left + Math.floor((target.clientWidth - clientWidth) / 2)
            tipStore.style = {
              zIndex,
              width: `${clientWidth}px`,
              top: `${top - clientHeight - 6}px`,
              left: `${tipLeft}px`
            }
            return this.$nextTick()
          }
        }).then(() => {
          let wrapperElem = $el
          if (wrapperElem) {
            let clientHeight = wrapperElem.clientHeight
            let clientWidth = wrapperElem.clientWidth
            Object.assign(tipStore.style, {
              top: `${top - clientHeight - 6}px`,
              left: `${tipLeft}px`
            })
            if (top - clientHeight < scrollTop + 6) {
              tipStore.placement = 'bottom'
              tipStore.style.top = `${top + target.clientHeight + 6}px`
            }
            if (tipLeft < scrollLeft + 6) {
              // 超出左边界
              tipLeft = scrollLeft + 6
              tipStore.arrowStyle.left = `${left > tipLeft + 16 ? left - tipLeft + 16 : 16}px`
              tipStore.style.left = `${tipLeft}px`
            } else if (tipLeft + clientWidth > scrollLeft + visibleWidth) {
              // 超出右边界
              tipLeft = scrollLeft + visibleWidth - clientWidth - 6
              tipStore.arrowStyle.left = `${clientWidth - Math.max(Math.floor((tipLeft + clientWidth - left) / 2), 22)}px`
              tipStore.style.left = `${tipLeft}px`
            }
          }
        })
      }
      return this.$nextTick()
    }
  }
}
