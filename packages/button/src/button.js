import XEUtils from 'xe-utils'
import GlobalConfig from '../../conf'
import { UtilTools, DomTools } from '../../tools'

export default {
  name: 'VxeButton',
  props: {
    type: String,
    size: String,
    disabled: Boolean
  },
  computed: {
    vSize () {
      return this.size || this.$parent.size || this.$parent.vSize
    }
  },
  render (h) {
    let { $scopedSlots, $listeners, type, vSize, disabled } = this
    let isText = type === 'text'
    return $scopedSlots.dropdowns ? h('div', {
      class: ['vxe-button--dropdown', {
        [`size--${vSize}`]: vSize
      }]
    }, [
      h('button', {
        class: ['vxe-button', `type--${isText ? type : 'button'}`, {
          [`size--${vSize}`]: vSize,
          [`theme--${type}`]: type && !isText
        }],
        attrs: {
          disabled: disabled
        },
        on: Object.assign({
          mouseenter: this.mouseenterEvent,
          mouseleave: this.mouseleaveEvent
        }, XEUtils.objectMap($listeners, (cb, type) => evnt => this.$emit(type, evnt)))
      }, [
        h('span', $scopedSlots.default.call(this)),
        h('i', {
          class: `vxe-button--dropdown-arrow ${GlobalConfig.icon.dropdownBottom}`
        })
      ]),
      h('div', {
        class: 'vxe-button--dropdown-wrapper',
        on: {
          click: this.clickDropdownEvent,
          mouseenter: this.mouseenterEvent,
          mouseleave: this.mouseleaveEvent
        }
      }, $scopedSlots.dropdowns.call(this))
    ]) : h('button', {
      class: ['vxe-button', `type--${isText ? type : 'button'}`, {
        [`size--${vSize}`]: vSize,
        [`theme--${type}`]: type && !isText
      }],
      attrs: {
        disabled: disabled
      },
      on: XEUtils.objectMap($listeners, (cb, type) => evnt => this.$emit(type, evnt))
    }, $scopedSlots.default.call(this))
  },
  methods: {
    clickDropdownEvent (evnt) {
      let dropdownElem = evnt.currentTarget
      let wrapperElem = dropdownElem.parentNode
      if (DomTools.getEventTargetNode(evnt, dropdownElem, 'vxe-button').flag) {
        wrapperElem.dataset.active = 'N'
        DomTools.removeClass(wrapperElem, 'is--active')
        UtilTools.emitEvent(this, 'dropdown-click', [{ $grid: this }, evnt])
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
