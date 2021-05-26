import XEUtils from 'xe-utils'
import GlobalConfig from '../../v-x-e-table/src/conf'
import vSize from '../../mixins/size'
import { UtilTools, DomTools } from '../../tools'

function updateTipStyle (_vm) {
  const { $el: wrapperElem, tipTarget, tipStore } = _vm
  if (tipTarget) {
    const { scrollTop, scrollLeft, visibleWidth } = DomTools.getDomNode()
    const { top, left } = DomTools.getAbsolutePos(tipTarget)
    const marginSize = 6
    const offsetHeight = wrapperElem.offsetHeight
    const offsetWidth = wrapperElem.offsetWidth
    let tipTop = top - offsetHeight - marginSize
    let tipLeft = Math.max(marginSize, left + Math.floor((tipTarget.offsetWidth - offsetWidth) / 2))
    if (tipLeft + offsetWidth + marginSize > scrollLeft + visibleWidth) {
      tipLeft = scrollLeft + visibleWidth - offsetWidth - marginSize
    }
    if (top - offsetHeight < scrollTop + marginSize) {
      tipStore.placement = 'bottom'
      tipTop = top + tipTarget.offsetHeight + marginSize
    }
    tipStore.style.top = `${tipTop}px`
    tipStore.style.left = `${tipLeft}px`
    tipStore.arrowStyle.left = `${left - tipLeft + tipTarget.offsetWidth / 2}px`
  }
}

export default {
  name: 'VxeTooltip',
  mixins: [vSize],
  props: {
    value: Boolean,
    size: { type: String, default: () => GlobalConfig.tooltip.size || GlobalConfig.size },
    trigger: { type: String, default: () => GlobalConfig.tooltip.trigger },
    theme: { type: String, default: () => GlobalConfig.tooltip.theme },
    content: [String, Number],
    zIndex: [String, Number],
    isArrow: { type: Boolean, default: true },
    enterable: Boolean,
    leaveDelay: { type: Number, default: () => GlobalConfig.tooltip.leaveDelay },
    leaveMethod: Function
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
  watch: {
    content (value) {
      this.message = value
    },
    value (value) {
      if (!this.isUpdate) {
        this[value ? 'open' : 'close']()
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
      this.open()
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
    const { $scopedSlots, vSize, theme, message, isHover, isArrow, visible, tipStore, enterable } = this
    let on
    if (enterable) {
      on = {
        mouseenter: this.wrapperMouseenterEvent,
        mouseleave: this.wrapperMouseleaveEvent
      }
    }
    return h('div', {
      class: ['vxe-table--tooltip-wrapper', `theme--${theme}`, {
        [`size--${vSize}`]: vSize,
        [`placement--${tipStore.placement}`]: tipStore.placement,
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
      }, $scopedSlots.content ? $scopedSlots.content.call(this, {}) : message),
      h('div', {
        class: 'vxe-table--tooltip-arrow',
        style: tipStore.arrowStyle
      })
    ].concat($scopedSlots.default ? $scopedSlots.default.call(this, {}) : []))
  },
  methods: {
    open (target, message) {
      return this.toVisible(target || this.target, message)
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
        const { $el, tipStore, zIndex } = this
        const parentNode = $el.parentNode
        if (!parentNode) {
          document.body.appendChild($el)
        }
        if (message) {
          this.message = message
        }
        this.tipTarget = target
        this.update(true)
        this.updateZindex()
        tipStore.placement = 'top'
        tipStore.style = { width: 'auto', left: 0, top: 0, zIndex: zIndex || this.tipZindex }
        tipStore.arrowStyle = { left: '50%' }
        return this.updatePlacement()
      }
      return this.$nextTick()
    },
    updatePlacement () {
      return this.$nextTick().then(() => {
        const { $el: wrapperElem, tipTarget } = this
        if (tipTarget && wrapperElem) {
          updateTipStyle(this)
          return this.$nextTick().then(() => updateTipStyle(this))
        }
      })
    },
    clickEvent () {
      this[this.visible ? 'close' : 'open']()
    },
    targetMouseenterEvent () {
      this.open()
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
      const { leaveMethod, trigger, enterable, leaveDelay } = this
      this.isHover = false
      if (!leaveMethod || leaveMethod({ $event: evnt }) !== false) {
        if (enterable && trigger === 'hover') {
          setTimeout(() => {
            if (!this.targetActive) {
              this.close()
            }
          }, leaveDelay)
        }
      }
    }
  }
}
