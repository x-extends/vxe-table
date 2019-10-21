import XEUtils from 'xe-utils'
import GlobalConfig from '../../conf'
import { UtilTools, DomTools } from '../../tools'

export default {
  name: 'VxeTooltip',
  props: {
    value: Boolean,
    trigger: { type: String, default: () => GlobalConfig.tooltip.trigger },
    theme: { type: String, default: () => GlobalConfig.tooltip.theme },
    content: [String, Function],
    zIndex: [String, Number],
    isArrow: { type: Boolean, default: true }
  },
  data () {
    return {
      isUpdate: false,
      visible: false,
      message: '',
      tipZindex: 0,
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
    let { $el, trigger, content, value } = this
    let parentNode = $el.parentNode
    let target
    this.message = content
    this.tipZindex = UtilTools.getZIndex()
    Array.from($el.children).forEach((elem, index) => {
      if (index > 1) {
        parentNode.insertBefore(elem, $el)
        if (!target) {
          target = elem
        }
      }
    })
    parentNode.removeChild($el)
    this.target = target
    if (target) {
      if (trigger === 'hover') {
        target.onmouseleave = this.mouseleaveEvent
        target.onmouseenter = this.mouseenterEvent
      } else if (trigger === 'click') {
        target.onclick = this.clickEvent
      }
    }
    if (value) {
      this.show()
    }
  },
  beforeDestroy () {
    let { $el, target, trigger } = this
    let parentNode = $el.parentNode
    if (parentNode) {
      parentNode.removeChild($el)
    }
    if (target) {
      if (trigger === 'hover') {
        target.onmouseleave = null
        target.onmouseenter = null
      } else if (trigger === 'click') {
        target.onclick = null
      }
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
    updateZindex () {
      if (this.tipZindex < UtilTools.getLastZIndex()) {
        this.tipZindex = UtilTools.getZIndex()
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
        this.updateZindex()
        return this.$nextTick().then(() => {
          let wrapperElem = $el
          if (wrapperElem) {
            let clientHeight = wrapperElem.clientHeight
            let clientWidth = XEUtils.toNumber(getComputedStyle(wrapperElem).width)
            tipLeft = left + Math.floor((target.offsetWidth - clientWidth) / 2)
            tipStore.style = {
              zIndex: zIndex || this.tipZindex,
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
              tipStore.style.top = `${top + target.offsetHeight + 6}px`
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
    },
    clickEvent (event) {
      this[this.visible ? 'close' : 'show']()
    },
    mouseleaveEvent (evnt) {
      this.close()
    },
    mouseenterEvent (evnt) {
      this.show()
    }
  }
}
