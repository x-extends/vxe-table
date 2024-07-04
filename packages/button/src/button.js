import XEUtils from 'xe-utils'
import GlobalConfig from '../../v-x-e-table/src/conf'
import vSize from '../../mixins/size'
import UtilTools, { getFuncText } from '../../tools/utils'
import DomTools from '../../tools/dom'
import { GlobalEvent } from '../../tools/event'
// import { warnLog } from '../../tools/log'

export default {
  name: 'VxeButton',
  mixins: [vSize],
  props: {
    type: String,
    mode: String,
    size: { type: String, default: () => GlobalConfig.button.size || GlobalConfig.size },
    name: [String, Number],
    content: String,
    placement: String,
    status: String,
    icon: String,
    round: Boolean,
    circle: Boolean,
    title: String,
    disabled: Boolean,
    loading: Boolean,
    trigger: { type: String, default: () => GlobalConfig.button.trigger },
    destroyOnClose: Boolean,
    className: [String, Function],
    popupClassName: [String, Function],
    transfer: { type: Boolean, default: () => GlobalConfig.button.transfer }
  },
  inject: {
    $xebuttonggroup: {
      default: null
    }
  },
  data () {
    return {
      inited: false,
      visiblePanel: false,
      animatVisible: false,
      isActivated: false,
      panelIndex: 0,
      panelStyle: null,
      panelPlacement: null
    }
  },
  computed: {
    isFormBtn () {
      const { type } = this
      if (type) {
        return ['submit', 'reset', 'button'].indexOf(type) > -1
      }
      return false
    },
    btnMode () {
      const { $xebuttonggroup, mode, type } = this
      if (mode === 'text' || type === 'text' || ($xebuttonggroup && $xebuttonggroup.mode === 'text')) {
        return 'text'
      }
      return 'button'
    },
    btnStatus () {
      const { $xebuttonggroup, status } = this
      if (status) {
        return status
      }
      if ($xebuttonggroup) {
        return $xebuttonggroup.status
      }
      return ''
    },
    btnRound () {
      const { $xebuttonggroup, round } = this
      if (round) {
        return round
      }
      if ($xebuttonggroup) {
        return $xebuttonggroup.round
      }
      return false
    },
    btnCircle () {
      const { $xebuttonggroup, circle } = this
      if (circle) {
        return circle
      }
      if ($xebuttonggroup) {
        return $xebuttonggroup.circle
      }
      return false
    }
  },
  created () {
    // if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
    //   if (this.type === 'text') {
    //     warnLog('vxe.error.delProp', ['type=text', 'mode=text'])
    //   }
    // }

    GlobalEvent.on(this, 'mousewheel', this.handleGlobalMousewheelEvent)
    GlobalEvent.on(this, 'mousedown', this.handleGlobalMousedownEvent)
  },
  beforeDestroy () {
    const panelElem = this.$refs.btnPanel
    if (panelElem && panelElem.parentNode) {
      panelElem.parentNode.removeChild(panelElem)
    }
  },
  destroyed () {
    GlobalEvent.off(this, 'mousewheel')
    GlobalEvent.off(this, 'mousedown')
  },
  render (h) {
    const { $scopedSlots, className, popupClassName, trigger, title, inited, type, destroyOnClose, isFormBtn, btnMode, btnStatus, btnRound, btnCircle, vSize, name, disabled, loading, visiblePanel, animatVisible, panelPlacement } = this
    const downsSlot = $scopedSlots.dropdowns
    const btnOns = {}
    const panelOns = {}
    if (downsSlot && trigger === 'hover') {
      // hover 触发
      btnOns.mouseenter = this.mouseenterTargetEvent
      btnOns.mouseleave = this.mouseleaveTargetEvent

      panelOns.mouseenter = this.mouseenterDropdownEvent
      panelOns.mouseleave = this.mouseleaveDropdownEvent
    }
    return downsSlot ? h('div', {
      class: ['vxe-button--dropdown', className ? (XEUtils.isFunction(className) ? className({ $button: this }) : className) : '', {
        [`size--${vSize}`]: vSize,
        'is--active': visiblePanel
      }]
    }, [
      h('button', {
        ref: 'xBtn',
        class: ['vxe-button', `type--${btnMode}`, {
          [`size--${vSize}`]: vSize,
          [`theme--${btnStatus}`]: btnStatus,
          'is--round': btnRound,
          'is--circle': btnCircle,
          'is--disabled': disabled || loading,
          'is--loading': loading
        }],
        attrs: {
          name,
          title,
          type: isFormBtn ? type : 'button',
          disabled: disabled || loading
        },
        on: {
          click: this.clickTargetEvent,
          ...btnOns
        }
      }, this.renderContent(h).concat([
        h('i', {
          class: `vxe-button--dropdown-arrow ${GlobalConfig.icon.BUTTON_DROPDOWN}`
        })
      ])),
      h('div', {
        ref: 'btnPanel',
        class: ['vxe-button--dropdown-panel', popupClassName ? (XEUtils.isFunction(popupClassName) ? popupClassName({ $button: this }) : popupClassName) : '', {
          [`size--${vSize}`]: vSize,
          'animat--leave': animatVisible,
          'animat--enter': visiblePanel
        }],
        attrs: {
          placement: panelPlacement
        },
        style: this.panelStyle,
        on: panelOns
      }, inited ? [
        h('div', {
          class: 'vxe-button--dropdown-wrapper',
          on: {
            mousedown: this.mousedownDropdownEvent,
            click: this.clickDropdownEvent
          }
        }, destroyOnClose && !visiblePanel ? [] : downsSlot.call(this, {}, h))
      ] : null)
    ]) : h('button', {
      ref: 'xBtn',
      class: ['vxe-button', `type--${btnMode}`, className ? (XEUtils.isFunction(className) ? className({ $button: this }) : className) : '', {
        [`size--${vSize}`]: vSize,
        [`theme--${btnStatus}`]: btnStatus,
        'is--round': btnRound,
        'is--circle': btnCircle,
        'is--disabled': disabled || loading,
        'is--loading': loading
      }],
      attrs: {
        name,
        title,
        type: isFormBtn ? type : 'button',
        disabled: disabled || loading
      },
      on: {
        click: this.clickEvent,
        onMouseenter: this.mouseenterEvent,
        onMouseleave: this.mouseleaveEvent
      }
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
      } else if ($scopedSlots.icon) {
        contents.push(
          h('span', {
            class: 'vxe-button--custom-icon'
          }, $scopedSlots.icon.call(this, {}))
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
          }, $scopedSlots.default.call(this, {}))
        )
      } else if (content) {
        contents.push(
          h('span', {
            class: 'vxe-button--content'
          }, [getFuncText(content)])
        )
      }
      return contents
    },
    handleGlobalMousewheelEvent (evnt) {
      if (this.visiblePanel && !DomTools.getEventTargetNode(evnt, this.$refs.btnPanel).flag) {
        this.closePanel()
      }
    },
    handleGlobalMousedownEvent (evnt) {
      const { disabled, visiblePanel } = this
      if (!disabled) {
        const el = this.$refs.$el
        const panelElem = this.$refs.btnPanel
        this.isActivated = DomTools.getEventTargetNode(evnt, el).flag || DomTools.getEventTargetNode(evnt, panelElem).flag
        if (visiblePanel && !this.isActivated) {
          this.closePanel()
        }
      }
    },
    updateZindex () {
      if (this.panelIndex < UtilTools.getLastZIndex()) {
        this.panelIndex = UtilTools.nextZIndex()
      }
    },
    mousedownDropdownEvent (evnt) {
      const isLeftBtn = evnt.button === 0
      if (isLeftBtn) {
        evnt.stopPropagation()
      }
    },
    clickEvent (evnt) {
      const { $xebuttonggroup } = this
      if ($xebuttonggroup) {
        $xebuttonggroup.handleClick({ name: this.name }, evnt)
      } else {
        this.$emit('click', { $event: evnt })
      }
    },
    clickDropdownEvent (evnt) {
      const dropdownElem = evnt.currentTarget
      const panelElem = this.$refs.btnPanel
      const { flag, targetElem } = DomTools.getEventTargetNode(evnt, dropdownElem, 'vxe-button')
      if (flag) {
        if (panelElem) {
          panelElem.dataset.active = 'N'
        }
        this.visiblePanel = false
        setTimeout(() => {
          if (!panelElem || panelElem.dataset.active !== 'Y') {
            this.animatVisible = false
          }
        }, 350)
        this.$emit('dropdown-click', { name: targetElem.getAttribute('name'), $event: evnt })
      }
    },
    mouseleaveTargetEvent (evnt) {
      this.closePanel()
      this.mouseleaveEvent(evnt)
    },
    mouseenterEvent (evnt) {
      this.$emit('mouseenter', { $event: evnt })
    },
    mouseleaveEvent (evnt) {
      this.$emit('mouseleave', { $event: evnt })
    },
    mouseenterTargetEvent (evnt) {
      this.openPanel()
      this.$emit('mouseenter', { $event: evnt })
    },
    mouseenterDropdownEvent () {
      const panelElem = this.$refs.btnPanel
      if (panelElem) {
        panelElem.dataset.active = 'Y'
        this.animatVisible = true
        setTimeout(() => {
          if (panelElem.dataset.active === 'Y') {
            this.visiblePanel = true
            this.updateZindex()
            this.updatePlacement()
            setTimeout(() => {
              if (this.visiblePanel) {
                this.updatePlacement()
              }
            }, 50)
          }
        }, 20)
      }
    },
    mouseleaveDropdownEvent () {
      this.closePanel()
    },
    clickTargetEvent (evnt) {
      const { trigger } = this
      if (trigger === 'click') {
        if (this.visiblePanel) {
          this.closePanel()
        } else {
          this.openPanel()
        }
      }
      this.clickEvent(evnt)
    },
    openPanel () {
      const { trigger } = this
      const panelElem = this.$refs.btnPanel
      if (panelElem) {
        panelElem.dataset.active = 'Y'
        if (!this.inited) {
          this.inited = true
          if (this.transfer) {
            document.body.appendChild(panelElem)
          }
        }
        this.showTime = setTimeout(() => {
          if (panelElem.dataset.active === 'Y') {
            this.mouseenterDropdownEvent()
          } else {
            this.animatVisible = false
          }
        }, trigger === 'click' ? 50 : 250)
      }
      return this.$nextTick()
    },
    closePanel () {
      const panelElem = this.$refs.btnPanel
      clearTimeout(this.showTime)
      if (panelElem) {
        panelElem.dataset.active = 'N'
        setTimeout(() => {
          if (panelElem.dataset.active !== 'Y') {
            this.visiblePanel = false
            setTimeout(() => {
              if (panelElem.dataset.active !== 'Y') {
                this.animatVisible = false
              }
            }, 350)
          }
        }, 100)
      } else {
        this.animatVisible = false
        this.visiblePanel = false
      }
      return this.$nextTick()
    },
    updatePlacement () {
      return this.$nextTick().then(() => {
        const { $refs, transfer, placement, panelIndex } = this
        const targetElem = $refs.xBtn
        const panelElem = $refs.btnPanel
        if (panelElem && targetElem) {
          const targetHeight = targetElem.offsetHeight
          const targetWidth = targetElem.offsetWidth
          const panelHeight = panelElem.offsetHeight
          const panelWidth = panelElem.offsetWidth
          const marginSize = 5
          const panelStyle = {
            zIndex: panelIndex
          }
          const { top, left, boundingTop, visibleHeight, visibleWidth } = DomTools.getAbsolutePos(targetElem)
          let panelPlacement = 'bottom'
          if (transfer) {
            let btnLeft = left + targetWidth - panelWidth
            let btnTop = top + targetHeight
            if (placement === 'top') {
              panelPlacement = 'top'
              btnTop = top - panelHeight
            } else if (!placement) {
              // 如果下面不够放，则向上
              if (boundingTop + targetHeight + panelHeight + marginSize > visibleHeight) {
                panelPlacement = 'top'
                btnTop = top - panelHeight
              }
              // 如果上面不够放，则向下（优先）
              if (btnTop < marginSize) {
                panelPlacement = 'bottom'
                btnTop = top + targetHeight
              }
            }
            // 如果溢出右边
            if (btnLeft + panelWidth + marginSize > visibleWidth) {
              btnLeft -= btnLeft + panelWidth + marginSize - visibleWidth
            }
            // 如果溢出左边
            if (btnLeft < marginSize) {
              btnLeft = marginSize
            }
            Object.assign(panelStyle, {
              left: `${btnLeft}px`,
              right: 'auto',
              top: `${btnTop}px`,
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
