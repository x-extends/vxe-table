import GlobalConfig from '../../conf'
import { UtilTools, DomTools, GlobalEvent } from '../../tools'

export default {
  name: 'VxePulldown',
  props: {
    disabled: Boolean,
    placement: String,
    size: { type: String, default: () => GlobalConfig.size },
    destroyOnClose: Boolean,
    transfer: Boolean
  },
  data () {
    return {
      inited: false,
      panelIndex: 0,
      panelStyle: null,
      panelPlacement: null,
      currentValue: null,
      visiblePanel: false,
      animatVisible: false,
      isActivated: false
    }
  },
  computed: {
    vSize () {
      return this.size || this.$parent.size || this.$parent.vSize
    }
  },
  created () {
    GlobalEvent.on(this, 'mousewheel', this.handleGlobalMousewheelEvent)
    GlobalEvent.on(this, 'mousedown', this.handleGlobalMousedownEvent)
    GlobalEvent.on(this, 'blur', this.handleGlobalBlurEvent)
  },
  beforeDestroy () {
    const panelElem = this.$refs.panel
    if (panelElem && panelElem.parentNode) {
      panelElem.parentNode.removeChild(panelElem)
    }
  },
  destroyed () {
    GlobalEvent.off(this, 'mousewheel')
    GlobalEvent.off(this, 'mousedown')
    GlobalEvent.off(this, 'blur')
  },
  render (h) {
    const { $scopedSlots, inited, vSize, destroyOnClose, transfer, isActivated, disabled, animatVisible, visiblePanel, panelStyle, panelPlacement } = this
    const defaultSlot = $scopedSlots.default
    const downSlot = $scopedSlots.dropdown
    return h('div', {
      class: ['vxe-pulldown', {
        [`size--${vSize}`]: vSize,
        'is--visivle': visiblePanel,
        'is--disabled': disabled,
        'is--active': isActivated
      }]
    }, [
      h('div', {
        ref: 'content',
        class: 'vxe-pulldown--content'
      }, defaultSlot ? defaultSlot.call(this, { $pulldown: this }, h) : []),
      h('div', {
        ref: 'panel',
        class: ['vxe-table--ignore-clear vxe-pulldown--panel', {
          [`size--${vSize}`]: vSize,
          'is--transfer': transfer,
          'animat--leave': animatVisible,
          'animat--enter': visiblePanel
        }],
        attrs: {
          'data-placement': panelPlacement
        },
        style: panelStyle
      }, downSlot ? (!inited || (destroyOnClose && !visiblePanel && !animatVisible) ? [] : downSlot.call(this, { $pulldown: this }, h)) : [])
    ])
  },
  methods: {
    handleGlobalMousewheelEvent (evnt) {
      const { $refs, disabled, visiblePanel } = this
      if (!disabled) {
        if (visiblePanel) {
          if (DomTools.getEventTargetNode(evnt, $refs.panel).flag) {
            this.updatePlacement()
          } else {
            this.hidePanel()
            this.$emit('hide-panel', { $event: evnt })
          }
        }
      }
    },
    handleGlobalMousedownEvent (evnt) {
      const { $refs, $el, disabled, visiblePanel } = this
      if (!disabled) {
        this.isActivated = DomTools.getEventTargetNode(evnt, $el).flag || DomTools.getEventTargetNode(evnt, $refs.panel).flag
        if (visiblePanel && !this.isActivated) {
          this.hidePanel()
          this.$emit('hide-panel', { $event: evnt })
        }
      }
    },
    handleGlobalBlurEvent (evnt) {
      if (this.visiblePanel) {
        this.hidePanel()
        this.$emit('hide-panel', { $event: evnt })
      }
    },
    updateZindex () {
      if (this.panelIndex < UtilTools.getLastZIndex()) {
        this.panelIndex = UtilTools.nextZIndex()
      }
    },
    isPanelVisible () {
      return this.visiblePanel
    },
    /**
     * 切换下拉面板
     */
    togglePanel () {
      if (this.visiblePanel) {
        return this.hidePanel()
      }
      return this.showPanel()
    },
    /**
     * 显示下拉面板
     */
    showPanel () {
      if (!this.inited) {
        this.inited = true
        if (this.transfer) {
          document.body.appendChild(this.$refs.panel)
        }
      }
      return new Promise(resolve => {
        if (!this.disabled) {
          clearTimeout(this.hidePanelTimeout)
          this.isActivated = true
          this.animatVisible = true
          setTimeout(() => {
            this.visiblePanel = true
            this.updatePlacement()
            setTimeout(() => {
              resolve(this.updatePlacement())
            }, 40)
          }, 10)
          this.updateZindex()
        } else {
          resolve(this.$nextTick())
        }
      })
    },
    /**
     * 隐藏下拉面板
     */
    hidePanel () {
      this.visiblePanel = false
      return new Promise(resolve => {
        if (this.animatVisible) {
          this.hidePanelTimeout = setTimeout(() => {
            this.animatVisible = false
            resolve(this.$nextTick())
          }, 350)
        } else {
          resolve(this.$nextTick())
        }
      })
    },
    /**
     * 手动更新位置
     */
    updatePlacement () {
      return this.$nextTick().then(() => {
        const { $refs, transfer, placement, panelIndex, visiblePanel } = this
        if (visiblePanel) {
          const panelElem = $refs.panel
          const targetElem = $refs.content
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
          }
        }
        return this.$nextTick()
      })
    }
  }
}
