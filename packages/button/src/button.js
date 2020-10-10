import XEUtils from 'xe-utils/ctor'
import GlobalConfig from '../../conf'
import { UtilTools, DomTools, GlobalEvent } from '../../tools'

export default {
  name: 'VxeButton',
  props: {
    type: String,
    size: { type: String, default: () => GlobalConfig.button.size || GlobalConfig.size },
    name: [String, Number],
    content: String,
    placement: String,
    status: String,
    icon: String,
    round: Boolean,
    circle: Boolean,
    disabled: Boolean,
    loading: Boolean,
    destroyOnClose: Boolean,
    transfer: { type: Boolean, default: () => GlobalConfig.button.transfer }
  },
  data () {
    return {
      inited: false,
      showPanel: false,
      animatVisible: false,
      panelIndex: 0,
      panelStyle: null,
      panelPlacement: null
    }
  },
  computed: {
    vSize () {
      return this.size || this.$parent.size || this.$parent.vSize
    },
    isText () {
      return this.type === 'text'
    },
    isFormBtn () {
      return ['submit', 'reset', 'button'].indexOf(this.type) > -1
    },
    btnType () {
      return this.isText ? this.type : 'button'
    },
    btnStatus () {
      return this.status || (this.type === 'primary' ? this.type : null)
    }
  },
  created () {
    if (this.type === 'primary') {
      UtilTools.warn('vxe.error.delProp', ['type=primary', 'status=primary'])
    }
    GlobalEvent.on(this, 'mousewheel', this.handleGlobalMousewheelEvent)
  },
  beforeDestroy () {
    const panelElem = this.$refs.panel
    if (panelElem && panelElem.parentNode) {
      panelElem.parentNode.removeChild(panelElem)
    }
  },
  destroyed () {
    GlobalEvent.off(this, 'mousewheel')
  },
  render (h) {
    const { $scopedSlots, $listeners, inited, type, destroyOnClose, isFormBtn, btnStatus, btnType, vSize, name, disabled, loading, showPanel, animatVisible, panelPlacement } = this
    const downsSlot = $scopedSlots.dropdowns
    return downsSlot ? h('div', {
      class: ['vxe-button--dropdown', {
        [`size--${vSize}`]: vSize,
        'is--active': showPanel
      }]
    }, [
      h('button', {
        ref: 'btn',
        class: ['vxe-button', `type--${btnType}`, {
          [`size--${vSize}`]: vSize,
          [`theme--${btnStatus}`]: btnStatus,
          'is--round': this.round,
          'is--circle': this.circle,
          'is--disabled': disabled || loading,
          'is--loading': loading
        }],
        attrs: {
          name,
          type: isFormBtn ? type : 'button',
          disabled: disabled || loading
        },
        on: Object.assign({
          mouseenter: this.mouseenterEvent,
          mouseleave: this.mouseleaveEvent
        }, XEUtils.objectMap($listeners, (cb, type) => evnt => this.$emit(type, { $event: evnt }, evnt)))
      }, this.renderContent(h).concat([
        h('i', {
          class: `vxe-button--dropdown-arrow ${GlobalConfig.icon.BUTTON_DROPDOWN}`
        })
      ])),
      h('div', {
        ref: 'panel',
        class: ['vxe-button--dropdown-panel', {
          [`size--${vSize}`]: vSize,
          'animat--leave': animatVisible,
          'animat--enter': showPanel
        }],
        attrs: {
          'data-placement': panelPlacement
        },
        style: this.panelStyle
      }, inited ? [
        h('div', {
          class: 'vxe-button--dropdown-wrapper',
          on: {
            click: this.clickDropdownEvent,
            mouseenter: this.mouseenterEvent,
            mouseleave: this.mouseleaveEvent
          }
        }, destroyOnClose && !showPanel ? [] : downsSlot.call(this, {}, h))
      ] : null)
    ]) : h('button', {
      ref: 'btn',
      class: ['vxe-button', `type--${btnType}`, {
        [`size--${vSize}`]: vSize,
        [`theme--${btnStatus}`]: btnStatus,
        'is--round': this.round,
        'is--circle': this.circle,
        'is--disabled': disabled || loading,
        'is--loading': loading
      }],
      attrs: {
        name,
        type: isFormBtn ? type : 'button',
        disabled: disabled || loading
      },
      on: XEUtils.objectMap($listeners, (cb, type) => evnt => this.$emit(type, { $event: evnt }, evnt))
    }, this.renderContent(h))
  },
  methods: {
    renderContent (h) {
      const { $scopedSlots, content, icon, loading } = this
      const contents = []
      if (loading) {
        contents.push(
          h('i', {
            class: ['vxe-button--loading-icon', GlobalConfig.icon.BUTTON_LOADING]
          })
        )
      } else if (icon) {
        contents.push(
          h('i', {
            class: ['vxe-button--icon', icon]
          })
        )
      }
      if ($scopedSlots.default) {
        contents.push(
          h('span', {
            class: 'vxe-button--content'
          }, $scopedSlots.default.call(this))
        )
      } else if (content) {
        contents.push(
          h('span', {
            class: 'vxe-button--content'
          }, [UtilTools.getFuncText(content)])
        )
      }
      return contents
    },
    handleGlobalMousewheelEvent (evnt) {
      if (this.showPanel && !DomTools.getEventTargetNode(evnt, this.$refs.panel).flag) {
        this.updatePlacement()
      }
    },
    updateZindex () {
      if (this.panelIndex < UtilTools.getLastZIndex()) {
        this.panelIndex = UtilTools.nextZIndex()
      }
    },
    clickDropdownEvent (evnt) {
      const dropdownElem = evnt.currentTarget
      const panelElem = this.$refs.panel
      const { flag, targetElem } = DomTools.getEventTargetNode(evnt, dropdownElem, 'vxe-button')
      if (flag) {
        panelElem.dataset.active = 'N'
        this.showPanel = false
        setTimeout(() => {
          if (panelElem.dataset.active !== 'Y') {
            this.animatVisible = false
          }
        }, 350)
        this.$emit('dropdown-click', { name: targetElem.getAttribute('name'), $event: evnt }, evnt)
      }
    },
    mouseenterEvent () {
      const panelElem = this.$refs.panel
      if (!this.inited) {
        this.inited = true
        if (this.transfer) {
          document.body.appendChild(panelElem)
        }
      }
      panelElem.dataset.active = 'Y'
      this.animatVisible = true
      setTimeout(() => {
        if (panelElem.dataset.active === 'Y') {
          this.showPanel = true
          this.updateZindex()
          this.updatePlacement()
        }
      }, 10)
    },
    mouseleaveEvent () {
      const panelElem = this.$refs.panel
      panelElem.dataset.active = 'N'
      setTimeout(() => {
        if (panelElem.dataset.active !== 'Y') {
          this.showPanel = false
          setTimeout(() => {
            if (panelElem.dataset.active !== 'Y') {
              this.animatVisible = false
            }
          }, 350)
        }
      }, 100)
    },
    updatePlacement () {
      return this.$nextTick().then(() => {
        const { $refs, transfer, placement, panelIndex } = this
        const targetElem = $refs.btn
        const panelElem = $refs.panel
        if (panelElem && targetElem) {
          const targetHeight = targetElem.offsetHeight
          const targetWidth = targetElem.offsetWidth
          const panelHeight = panelElem.offsetHeight
          const panelWidth = panelElem.offsetWidth
          const marginSize = 5
          const panelStyle = {
            zIndex: panelIndex
          }
          const { boundingTop, boundingLeft, visibleHeight, visibleWidth } = DomTools.getAbsolutePos(targetElem)
          let panelPlacement = 'bottom'
          if (transfer) {
            let left = boundingLeft
            let top = boundingTop + targetHeight
            if (placement === 'top') {
              panelPlacement = 'top'
              top = boundingTop - panelHeight
            } else if (!placement) {
              // 如果下面不够放，则向上
              if (top + panelHeight + marginSize > visibleHeight) {
                panelPlacement = 'top'
                top = boundingTop - panelHeight
              }
              // 如果上面不够放，则向下（优先）
              if (top < marginSize) {
                panelPlacement = 'bottom'
                top = boundingTop + targetHeight
              }
            }
            // 如果溢出右边
            if (left + panelWidth + marginSize > visibleWidth) {
              left -= left + panelWidth + marginSize - visibleWidth
            }
            // 如果溢出左边
            if (left < marginSize) {
              left = marginSize
            }
            Object.assign(panelStyle, {
              left: `${left}px`,
              top: `${top}px`,
              minWidth: `${targetWidth}px`
            })
          } else {
            if (placement === 'top') {
              panelPlacement = 'top'
              panelStyle.bottom = `${targetHeight}px`
            } else if (!placement) {
              // 如果下面不够放，则向上
              if (boundingTop + targetHeight + panelHeight > visibleHeight) {
                // 如果上面不够放，则向下（优先）
                if (boundingTop - targetHeight - panelHeight > marginSize) {
                  panelPlacement = 'top'
                  panelStyle.bottom = `${targetHeight}px`
                }
              }
            }
          }
          this.panelStyle = panelStyle
          this.panelPlacement = panelPlacement
          return this.$nextTick()
        }
      })
    },
    focus () {
      this.$el.focus()
      return this.$nextTick()
    },
    blur () {
      this.$el.blur()
      return this.$nextTick()
    }
  }
}
