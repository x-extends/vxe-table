import XEUtils from 'xe-utils/methods/xe-utils'
import GlobalConfig from '../../conf'
import { UtilTools, DomTools } from '../../tools'

export default {
  name: 'VxeTooltip',
  props: {
    value: Boolean,
    size: { type: String, default: () => GlobalConfig.tooltip.size || GlobalConfig.size },
    trigger: { type: String, default: () => GlobalConfig.tooltip.trigger },
    theme: { type: String, default: () => GlobalConfig.tooltip.theme },
    content: [String, Function],
    zIndex: [String, Number],
    isArrow: { type: Boolean, default: true },
    enterable: Boolean,
    leaveDelay: { type: Number, default: GlobalConfig.tooltip.leaveDelay }
  },
  data () {
    return {
      isUpdate: false,
      isHover: false,
      visible: false,
      message: '',
      tipTarget: null,
      tipZindex: 0,
      tipStore: {
        style: {},
        placement: '',
        arrowStyle: null
      }
    }
  },
  computed: {
    vSize () {
      return this.size || this.$parent.size || this.$parent.vSize
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
    const { $el, trigger, content, value } = this
    const parentNode = $el.parentNode
    let target
    this.message = content
    this.tipZindex = UtilTools.nextZIndex()
    XEUtils.arrayEach($el.children, (elem, index) => {
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
        target.onmouseleave = this.targetMouseleaveEvent
        target.onmouseenter = this.targetMouseenterEvent
      } else if (trigger === 'click') {
        target.onclick = this.clickEvent
      }
    }
    if (value) {
      this.show()
    }
  },
  beforeDestroy () {
    const { $el, target, trigger } = this
    const parentNode = $el.parentNode
    if (parentNode) {
      parentNode.removeChild($el)
    }
    if (target) {
      if (trigger === 'hover') {
        target.onmouseenter = null
        target.onmouseleave = null
      } else if (trigger === 'click') {
        target.onclick = null
      }
    }
  },
  render (h) {
    const { vSize, theme, message, isHover, isArrow, visible, tipStore, enterable } = this
    let on
    if (enterable) {
      on = {
        mouseenter: this.wrapperMouseenterEvent,
        mouseleave: this.wrapperMouseleaveEvent
      }
    }
    return h('div', {
      class: ['vxe-table--tooltip-wrapper', `theme--${theme}`, `placement--${tipStore.placement}`, {
        [`size--${vSize}`]: vSize,
        'is--enterable': enterable,
        'is--visible': visible,
        'is--arrow': isArrow,
        'is--hover': isHover
      }],
      style: tipStore.style,
      ref: 'tipWrapper',
      on
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
      this.tipTarget = null
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
        this.tipZindex = UtilTools.nextZIndex()
      }
    },
    toVisible (target, message) {
      this.targetActive = true
      if (target) {
        const { $el, tipStore } = this
        const parentNode = $el.parentNode
        tipStore.placement = 'top'
        tipStore.style = { width: 'auto' }
        tipStore.arrowStyle = { left: '50%' }
        if (!parentNode) {
          document.body.appendChild($el)
        }
        if (message) {
          this.message = message
        }
        this.tipTarget = target
        this.update(true)
        this.updateZindex()
        return this.updatePlacement()
      }
      return this.$nextTick()
    },
    updatePlacement () {
      return this.$nextTick().then(() => {
        const { $el: wrapperElem, tipTarget, tipStore, zIndex } = this
        if (tipTarget && wrapperElem) {
          const { scrollTop, scrollLeft, visibleWidth } = DomTools.getDomNode()
          const { top, left } = DomTools.getAbsolutePos(tipTarget)
          let tipLeft = left
          const offsetHeight = wrapperElem.offsetHeight
          const offsetWidth = wrapperElem.offsetWidth
          tipLeft = left + Math.floor((tipTarget.offsetWidth - offsetWidth) / 2)
          tipStore.style = {
            zIndex: zIndex || this.tipZindex,
            top: `${top - offsetHeight - 6}px`,
            left: `${tipLeft}px`
          }
          return this.$nextTick().then(() => {
            const offsetHeight = wrapperElem.offsetHeight
            const offsetWidth = wrapperElem.offsetWidth
            Object.assign(tipStore.style, {
              top: `${top - offsetHeight - 6}px`,
              left: `${tipLeft}px`
            })
            if (top - offsetHeight < scrollTop + 6) {
              tipStore.placement = 'bottom'
              tipStore.style.top = `${top + tipTarget.offsetHeight + 6}px`
            }
            if (tipLeft < scrollLeft + 6) {
              // 超出左边界
              tipLeft = scrollLeft + 6
              tipStore.arrowStyle.left = `${left > tipLeft + 16 ? left - tipLeft + 16 : 16}px`
              tipStore.style.left = `${tipLeft}px`
            } else if (tipLeft + offsetWidth > scrollLeft + visibleWidth) {
              // 超出右边界
              tipLeft = scrollLeft + visibleWidth - offsetWidth - 6
              tipStore.arrowStyle.left = `${offsetWidth - Math.max(Math.floor((tipLeft + offsetWidth - left) / 2), 22)}px`
              tipStore.style.left = `${tipLeft}px`
            }
          })
        }
      })
    },
    clickEvent () {
      this[this.visible ? 'close' : 'show']()
    },
    targetMouseenterEvent () {
      this.show()
    },
    targetMouseleaveEvent () {
      const { trigger, enterable, leaveDelay } = this
      this.targetActive = false
      if (enterable && trigger === 'hover') {
        setTimeout(() => {
          if (!this.isHover) {
            this.close()
          }
        }, leaveDelay)
      } else {
        this.close()
      }
    },
    wrapperMouseenterEvent () {
      this.isHover = true
    },
    wrapperMouseleaveEvent (evnt) {
      const { $listeners, trigger, enterable, leaveDelay } = this
      this.isHover = false
      if ($listeners.leave) {
        this.$emit('leave', { $event: evnt })
      } else if (enterable && trigger === 'hover') {
        setTimeout(() => {
          if (!this.targetActive) {
            this.close()
          }
        }, leaveDelay)
      }
    }
  }
}
