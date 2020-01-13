import XEUtils from 'xe-utils/methods/xe-utils'
import GlobalConfig from '../../conf'
import { UtilTools, DomTools } from '../../tools'

export default {
  name: 'VxeButton',
  props: {
    type: String,
    size: String,
    name: [String, Number],
    status: String,
    icon: String,
    disabled: Boolean,
    loading: Boolean
  },
  computed: {
    vSize () {
      return this.size || this.$parent.size || this.$parent.vSize
    },
    isText () {
      return this.type === 'text'
    },
    isFormBtn () {
      return this.type === 'submit' || this.type === 'reset'
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
    let { $scopedSlots, $listeners, type, isText, isFormBtn, btnStatus, btnType, vSize, name, disabled, loading } = this
    return $scopedSlots.dropdowns ? h('div', {
      class: ['vxe-button--dropdown', {
        [`size--${vSize}`]: vSize
      }]
    }, [
      h('button', {
        class: ['vxe-button', `type--${btnType}`, {
          [`size--${vSize}`]: vSize,
          [`theme--${btnStatus}`]: btnStatus && !isText,
          'is--disabled': disabled || loading,
          'is--loading': loading
        }],
        attrs: {
          name,
          type: isFormBtn ? type : null,
          disabled: disabled || loading
        },
        on: Object.assign({
          mouseenter: this.mouseenterEvent,
          mouseleave: this.mouseleaveEvent
        }, XEUtils.objectMap($listeners, (cb, type) => evnt => this.$emit(type, evnt)))
      }, this.renderContent(h).concat([
        h('i', {
          class: `vxe-button--dropdown-arrow ${GlobalConfig.icon.dropdownBottom}`
        })
      ])),
      h('div', {
        class: 'vxe-button--dropdown-wrapper',
        on: {
          click: this.clickDropdownEvent,
          mouseenter: this.mouseenterEvent,
          mouseleave: this.mouseleaveEvent
        }
      }, $scopedSlots.dropdowns.call(this))
    ]) : h('button', {
      class: ['vxe-button', `type--${btnType}`, {
        [`size--${vSize}`]: vSize,
        [`theme--${btnStatus}`]: btnStatus && !isText,
        'is--disabled': disabled || loading,
        'is--loading': loading
      }],
      attrs: {
        name,
        type: isFormBtn ? type : null,
        disabled: disabled || loading
      },
      on: XEUtils.objectMap($listeners, (cb, type) => evnt => this.$emit(type, evnt))
    }, this.renderContent(h))
  },
  methods: {
    renderContent (h) {
      let { $scopedSlots, icon, loading } = this
      let contents = []
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
          $scopedSlots.default.call(this)
        )
      }
      return contents
    },
    clickDropdownEvent (evnt) {
      let dropdownElem = evnt.currentTarget
      let wrapperElem = dropdownElem.parentNode
      let { flag, targetElem } = DomTools.getEventTargetNode(evnt, dropdownElem, 'vxe-button')
      if (flag) {
        wrapperElem.dataset.active = 'N'
        DomTools.removeClass(wrapperElem, 'is--active')
        UtilTools.emitEvent(this, 'dropdown-click', [{ name: targetElem.getAttribute('name') }, evnt])
      }
    },
    mouseenterEvent (evnt) {
      let dropdownElem = evnt.currentTarget
      let wrapperElem = dropdownElem.parentNode
      wrapperElem.dataset.active = 'Y'
      DomTools.addClass(wrapperElem, 'is--active')
    },
    mouseleaveEvent (evnt) {
      let dropdownElem = evnt.currentTarget
      let wrapperElem = dropdownElem.parentNode
      wrapperElem.dataset.active = 'N'
      setTimeout(() => {
        if (wrapperElem.dataset.active !== 'Y') {
          DomTools.removeClass(wrapperElem, 'is--active')
        }
      }, 300)
    }
  }
}
