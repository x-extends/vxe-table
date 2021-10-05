import XEUtils from 'xe-utils'
import GlobalConfig from '../../v-x-e-table/src/conf'
import VXETable from '../../v-x-e-table'
import { UtilTools, isEnableConf } from '../../tools'
import { createItem, destroyItem, assemItem } from './util'
import { renderTitle } from './render'

const props = {
  title: String,
  field: String,
  size: String,
  span: [String, Number],
  align: String,
  titleAlign: String,
  titleWidth: [String, Number],
  className: [String, Function],
  titleOverflow: { type: [Boolean, String], default: null },
  titlePrefix: Object,
  titleSuffix: Object,
  resetValue: { default: null },
  visible: { type: Boolean, default: null },
  visibleMethod: Function,
  folding: Boolean,
  collapseNode: Boolean,
  itemRender: Object
}

const watch = {}
Object.keys(props).forEach(name => {
  watch[name] = function (value) {
    this.itemConfig.update(name, value)
  }
})

const renderItem = (h, _vm, item, slots) => {
  const { rules, data, collapseAll, validOpts, titleOverflow: allTitleOverflow } = _vm
  const { title, folding, visible, visibleMethod, field, collapseNode, itemRender, showError, errRule, className, titleOverflow } = item
  const compConf = isEnableConf(itemRender) ? VXETable.renderer.get(itemRender.name) : null
  const span = item.span || _vm.span
  const align = item.align || _vm.align
  const titleAlign = item.titleAlign || _vm.titleAlign
  const titleWidth = item.titleWidth || _vm.titleWidth
  let itemVisibleMethod = visibleMethod
  const itemOverflow = (XEUtils.isUndefined(titleOverflow) || XEUtils.isNull(titleOverflow)) ? allTitleOverflow : titleOverflow
  const showEllipsis = itemOverflow === 'ellipsis'
  const showTitle = itemOverflow === 'title'
  const showTooltip = itemOverflow === true || itemOverflow === 'tooltip'
  const hasEllipsis = showTitle || showTooltip || showEllipsis
  const params = { data, property: field, item, $form: _vm }
  let isRequired
  if (!itemVisibleMethod && compConf && compConf.itemVisibleMethod) {
    itemVisibleMethod = compConf.itemVisibleMethod
  }
  if (rules) {
    const itemRules = rules[field]
    if (itemRules) {
      isRequired = itemRules.some(rule => rule.required)
    }
  }
  let contentVNs = []
  if (slots && slots.default) {
    contentVNs = _vm.callSlot(slots.default, params, h)
  } else if (compConf && compConf.renderItemContent) {
    contentVNs = compConf.renderItemContent.call(_vm, h, itemRender, params)
  } else if (compConf && compConf.renderItem) {
    contentVNs = compConf.renderItem.call(_vm, h, itemRender, params)
  } else if (field) {
    contentVNs = [`${XEUtils.get(data, field)}`]
  }
  const ons = showTooltip ? {
    mouseenter (evnt) {
      _vm.triggerHeaderHelpEvent(evnt, params)
    },
    mouseleave: _vm.handleTargetLeaveEvent
  } : {}
  return h('div', {
    class: ['vxe-form--item', item.id, span ? `vxe-col--${span} is--span` : null, className ? (XEUtils.isFunction(className) ? className(params) : className) : '', {
      'is--title': title,
      'is--required': isRequired,
      'is--hidden': visible === false || (folding && collapseAll),
      'is--active': !itemVisibleMethod || itemVisibleMethod(params),
      'is--error': showError
    }]
  }, [
    h('div', {
      class: 'vxe-form--item-inner'
    }, [
      title || (slots && slots.title) ? h('div', {
        class: ['vxe-form--item-title', titleAlign ? `align--${titleAlign}` : null, {
          'is--ellipsis': hasEllipsis
        }],
        style: titleWidth ? {
          width: isNaN(titleWidth) ? titleWidth : `${titleWidth}px`
        } : null,
        attrs: {
          title: showTitle ? UtilTools.getFuncText(title) : null
        },
        on: ons
      }, renderTitle(h, _vm, item)) : null,
      h('div', {
        class: ['vxe-form--item-content', align ? `align--${align}` : null]
      }, contentVNs.concat(
        [
          collapseNode ? h('div', {
            class: 'vxe-form--item-trigger-node',
            on: {
              click: _vm.toggleCollapseEvent
            }
          }, [
            h('span', {
              class: 'vxe-form--item-trigger-text'
            }, collapseAll ? GlobalConfig.i18n('vxe.form.unfolding') : GlobalConfig.i18n('vxe.form.folding')),
            h('i', {
              class: ['vxe-form--item-trigger-icon', collapseAll ? GlobalConfig.icon.FORM_FOLDING : GlobalConfig.icon.FORM_UNFOLDING]
            })
          ]) : null,
          errRule && validOpts.showMessage ? h('div', {
            class: 'vxe-form--item-valid',
            style: errRule.maxWidth ? {
              width: `${errRule.maxWidth}px`
            } : null
          }, errRule.message) : null
        ])
      )
    ])
  ])
}

export default {
  name: 'VxeFormItem',
  props,
  inject: {
    $xeform: {
      default: null
    },
    xeformgather: {
      default: null
    }
  },
  watch,
  mounted () {
    assemItem(this)
  },
  created () {
    this.itemConfig = createItem(this.$xeform, this)
  },
  destroyed () {
    destroyItem(this)
  },
  render (h) {
    const { $xeform } = this
    return $xeform && $xeform.customLayout ? renderItem(h, $xeform, this.itemConfig, this.$scopedSlots) : h('div')
  }
}
