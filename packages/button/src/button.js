import XEUtils from 'xe-utils'
import GlobalConfig from '../../conf'
import { UtilTools, DomTools } from '../../tools'

export default {
  name: 'VxeButton',
  props: {
    type: String,
    size: String,
    name: [String, Number],
    content: String,
    status: String,
    icon: String,
    disabled: Boolean,
    loading: Boolean
  },
  data () {
    return {
      showPanel: false,
      animatVisible: false,
      panelIndex: 0,
      panelStyle: null
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
  },
  render (h) {
    const { $scopedSlots, $listeners, type, isFormBtn, btnStatus, btnType, vSize, name, disabled, loading, showPanel, animatVisible } = this
    return $scopedSlots.dropdowns ? h('div', {
      class: ['vxe-button--dropdown', {
        [`size--${vSize}`]: vSize,
        'is--active': showPanel
      }]
    }, [
      h('button', {
        class: ['vxe-button', `type--${btnType}`, {
          [`size--${vSize}`]: vSize,
          [`theme--${btnStatus}`]: btnStatus,
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
        }, XEUtils.objectMap($listeners, (cb, type) => evnt => this.$emit(type, {}, evnt)))
      }, this.renderContent(h).concat([
        h('i', {
          class: `vxe-button--dropdown-arrow ${GlobalConfig.icon.dropdownBtn}`
        })
      ])),
      h('div', {
        ref: 'panel',
        class: ['vxe-button--dropdown-panel', {
          'animat--leave': animatVisible,
          'animat--enter': showPanel
        }],
        style: this.panelStyle
      }, [
        h('div', {
          class: 'vxe-button--dropdown-wrapper',
          on: {
            click: this.clickDropdownEvent,
            mouseenter: this.mouseenterEvent,
            mouseleave: this.mouseleaveEvent
          }
        }, $scopedSlots.dropdowns.call(this))
      ])
    ]) : h('button', {
      class: ['vxe-button', `type--${btnType}`, {
        [`size--${vSize}`]: vSize,
        [`theme--${btnStatus}`]: btnStatus,
        'is--disabled': disabled || loading,
        'is--loading': loading
      }],
      attrs: {
        name,
        type: isFormBtn ? type : 'button',
        disabled: disabled || loading
      },
      on: XEUtils.objectMap($listeners, (cb, type) => evnt => this.$emit(type, {}, evnt))
    }, this.renderContent(h))
  },
  methods: {
    renderContent (h) {
      const { $scopedSlots, content, icon, loading } = this
      const contents = []
      if (loading) {
        contents.push(
          h('i', {
            class: ['vxe-button--loading-icon', GlobalConfig.icon.btnLoading]
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
    updateZindex () {
      if (this.panelIndex < UtilTools.getLastZIndex()) {
        this.panelIndex = UtilTools.nextZIndex()
      }
    },
    clickDropdownEvent (evnt) {
      const dropdownElem = evnt.currentTarget
      const wrapperElem = this.$refs.panel
      const { flag, targetElem } = DomTools.getEventTargetNode(evnt, dropdownElem, 'vxe-button')
      if (flag) {
        wrapperElem.dataset.active = 'N'
        this.showPanel = false
        setTimeout(() => {
          if (wrapperElem.dataset.active !== 'Y') {
            this.animatVisible = false
          }
        }, 200)
        UtilTools.emitEvent(this, 'dropdown-click', [{ name: targetElem.getAttribute('name') }, evnt])
      }
    },
    mouseenterEvent () {
      const wrapperElem = this.$refs.panel
      this.updateZindex()
      this.panelStyle = {
        zIndex: this.panelIndex
      }
      wrapperElem.dataset.active = 'Y'
      this.animatVisible = true
      setTimeout(() => {
        if (wrapperElem.dataset.active === 'Y') {
          this.showPanel = true
        }
      }, 10)
    },
    mouseleaveEvent () {
      const wrapperElem = this.$refs.panel
      wrapperElem.dataset.active = 'N'
      setTimeout(() => {
        if (wrapperElem.dataset.active !== 'Y') {
          this.showPanel = false
          setTimeout(() => {
            if (wrapperElem.dataset.active !== 'Y') {
              this.animatVisible = false
            }
          }, 200)
        }
      }, 200)
    }
  }
}
