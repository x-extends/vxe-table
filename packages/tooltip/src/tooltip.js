import XEUtils from 'xe-utils'
import GlobalConfig from '../../v-x-e-table/src/conf'
import vSize from '../../mixins/size'
import UtilTools from '../../tools/utils'
import DomTools from '../../tools/dom'

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

function showTip (_vm) {
  const { $el, tipStore, zIndex } = _vm
  const parentNode = $el.parentNode
  if (!parentNode) {
    document.body.appendChild($el)
  }
  _vm.updateValue(true)
  _vm.updateZindex()
  tipStore.placement = 'top'
  tipStore.style = { width: 'auto', left: 0, top: 0, zIndex: zIndex || _vm.tipZindex }
  tipStore.arrowStyle = { left: '50%' }
  return _vm.updatePlacement()
}

function renderContent (h, _vm) {
  const { $scopedSlots, useHTML, tipContent } = _vm
  if ($scopedSlots.content) {
    return h('div', {
      key: 1,
      class: 'vxe-table--tooltip-content'
    }, $scopedSlots.content.call(this, {}))
  }
  if (useHTML) {
    return h('div', {
      key: 2,
      class: 'vxe-table--tooltip-content',
      domProps: {
        innerHTML: tipContent
      }
    })
  }
  return h('div', {
    key: 3,
    class: 'vxe-table--tooltip-content'
  }, UtilTools.formatText(tipContent))
}

export default {
  name: 'VxeTooltip',
  mixins: [vSize],
  props: {
    value: Boolean,
    size: { type: String, default: () => GlobalConfig.tooltip.size || GlobalConfig.size },
    trigger: { type: String, default: () => GlobalConfig.tooltip.trigger },
    theme: { type: String, default: () => GlobalConfig.tooltip.theme },
    content: { type: [String, Number], default: null },
    useHTML: Boolean,
    zIndex: [String, Number],
    isArrow: { type: Boolean, default: true },
    enterable: Boolean,
    enterDelay: { type: Number, default: () => GlobalConfig.tooltip.enterDelay },
    leaveDelay: { type: Number, default: () => GlobalConfig.tooltip.leaveDelay }
  },
  data () {
    return {
      isUpdate: false,
      visible: false,
      tipContent: '',
      tipActive: false,
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
      this.tipContent = value
    },
    value (value) {
      if (!this.isUpdate) {
        this[value ? 'open' : 'close']()
      }
      this.isUpdate = false
    }
  },
  created () {
    this.showDelayTip = XEUtils.debounce(() => {
      if (this.tipActive) {
        showTip(this)
      }
    }, this.enterDelay, { leading: false, trailing: true })
  },
  mounted () {
    const { $el, trigger, content, value } = this
    const parentNode = $el.parentNode
    if (parentNode) {
      let target
      this.tipContent = content
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
    const { $scopedSlots, vSize, theme, tipActive, isArrow, visible, tipStore, enterable } = this
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
        'is--actived': tipActive
      }],
      style: tipStore.style,
      ref: 'tipWrapper',
      on
    }, [
      renderContent(h, this),
      h('div', {
        class: 'vxe-table--tooltip-arrow',
        style: tipStore.arrowStyle
      })
    ].concat($scopedSlots.default ? $scopedSlots.default.call(this, {}) : []))
  },
  methods: {
    open (target, content) {
      return this.toVisible(target || this.target, content)
    },
    close () {
      this.tipTarget = null
      this.tipActive = false
      Object.assign(this.tipStore, {
        style: {},
        placement: '',
        arrowStyle: null
      })
      this.updateValue(false)
      return this.$nextTick()
    },
    updateValue (value) {
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
    toVisible (target, content) {
      if (target) {
        const { trigger, enterDelay } = this
        this.tipActive = true
        this.tipTarget = target
        if (content) {
          this.tipContent = content
        }
        if (enterDelay && trigger === 'hover') {
          this.showDelayTip()
        } else {
          return showTip(this)
        }
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
    isActived () {
      return this.tipActive
    },
    setActived (actived) {
      this.tipActive = !!actived
    },
    clickEvent () {
      this[this.visible ? 'close' : 'open']()
    },
    targetMouseenterEvent () {
      this.open()
    },
    targetMouseleaveEvent () {
      const { trigger, enterable, leaveDelay } = this
      this.tipActive = false
      if (enterable && trigger === 'hover') {
        setTimeout(() => {
          if (!this.tipActive) {
            this.close()
          }
        }, leaveDelay)
      } else {
        this.close()
      }
    },
    wrapperMouseenterEvent () {
      this.tipActive = true
    },
    wrapperMouseleaveEvent () {
      const { trigger, enterable, leaveDelay } = this
      this.tipActive = false
      if (enterable && trigger === 'hover') {
        setTimeout(() => {
          if (!this.tipActive) {
            this.close()
          }
        }, leaveDelay)
      }
    }
  }
}
