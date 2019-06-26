import GlobalConfig from '../../conf'
import { DomTools } from '../../tools'

export default {
  name: 'VxeTooltip',
  props: {
    value: Boolean,
    theme: { type: String, default: () => GlobalConfig.tooltip.theme },
    content: String,
    zIndex: { type: Number, default: () => GlobalConfig.tooltip.zIndex },
    isArrow: { type: Boolean, default: true }
  },
  data () {
    return {
      isUpdate: false,
      visible: false,
      message: '',
      tipStore: {
        style: null,
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
        class: ['vxe-table--tooltip-content']
      }, this.$slots.content || message),
      h('div', {
        class: ['vxe-table--tooltip-arrow'],
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
        style: null,
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
        this.$emit('input', this.visible)
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
            tipLeft = left + Math.floor((target.offsetWidth - wrapperElem.offsetWidth) / 2)
            tipStore.style = {
              zIndex,
              width: `${wrapperElem.offsetWidth}px`,
              top: `${top - wrapperElem.offsetHeight - 6}px`,
              left: `${tipLeft}px`
            }
            return this.$nextTick()
          }
        }).then(() => {
          let wrapperElem = $el
          if (wrapperElem) {
            let offsetHeight = wrapperElem.offsetHeight
            let offsetWidth = wrapperElem.offsetWidth
            if (top - offsetHeight < scrollTop + 6) {
              tipStore.placement = 'bottom'
              tipStore.style.top = `${top + target.offsetHeight + 6}px`
            }
            if (tipLeft < scrollLeft + 6) {
            // 超出左边界
              tipLeft = scrollLeft + 6
              tipStore.arrowStyle.left = `${left > tipLeft + 16 ? left - tipLeft + 16 : 16}px`
              tipStore.style.left = `${tipLeft}px`
            } else if (left + offsetWidth > scrollLeft + visibleWidth) {
            // 超出右边界
              tipLeft = scrollLeft + visibleWidth - offsetWidth - 6
              tipStore.arrowStyle.left = `${offsetWidth - Math.max(Math.floor((tipLeft + offsetWidth - left) / 2), 22)}px`
              tipStore.style.left = `${tipLeft}px`
            }
          }
        })
      }
      return this.$nextTick()
    }
  }
}
