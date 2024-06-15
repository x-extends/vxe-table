import XEUtils from 'xe-utils'
import GlobalConfig from '../../v-x-e-table/src/conf'
import VXETable from '../../v-x-e-table'
import { isEnableConf, getFuncText } from '../../tools/utils'
import { createItem, destroyItem, assemItem, isActivetem } from './util'
import { renderTitle } from './render'
import { getSlotVNs } from '../../tools/vn'

const props = {
  title: String,
  field: String,
  size: String,
  span: [String, Number],
  align: String,
  titleAlign: {
    type: String,
    default: null
  },
  titleWidth: {
    type: [String, Number],
    default: null
  },
  titleColon: {
    type: Boolean,
    default: null
  },
  titleAsterisk: {
    type: Boolean,
    default: null
  },
  showTitle: {
    type: Boolean,
    default: true
  },
  vertical: {
    type: Boolean,
    default: null
  },
  className: [String, Function],
  contentClassName: [String, Function],
  contentStyle: [Object, Function],
  titleClassName: [String, Function],
  titleStyle: [Object, Function],
  titleOverflow: {
    type: [Boolean, String],
    default: null
  },
  titlePrefix: Object,
  titleSuffix: Object,
  resetValue: { default: null },
  visible: { type: Boolean, default: null },
  visibleMethod: Function,
  folding: Boolean,
  collapseNode: Boolean,
  itemRender: Object,
  rules: Array
}

const watch = {}
Object.keys(props).forEach(name => {
  watch[name] = function (value) {
    this.itemConfig.update(name, value)
  }
})

const renderItem = (h, _vm, item, slots) => {
  const { _e, rules, data, collapseAll, validOpts, titleAlign: allTitleAlign, titleWidth: allTitleWidth, titleColon: allTitleColon, titleAsterisk: allTitleAsterisk, titleOverflow: allTitleOverflow, vertical: allVertical } = _vm
  const { title, folding, visible, field, collapseNode, itemRender, showError, errRule, className, titleOverflow, vertical, showTitle, contentClassName, contentStyle, titleClassName, titleStyle } = item
  const compConf = isEnableConf(itemRender) ? VXETable.renderer.get(itemRender.name) : null
  const itemClassName = compConf ? (compConf.formItemClassName || compConf.itemClassName) : ''
  const itemStyle = compConf ? (compConf.formItemStyle || compConf.itemStyle) : null
  const itemContentClassName = compConf ? (compConf.formItemContentClassName || compConf.itemContentClassName) : ''
  const itemContentStyle = compConf ? (compConf.formItemContentStyle || compConf.itemContentStyle) : null
  const itemTitleClassName = compConf ? (compConf.formItemTitleClassName || compConf.itemTitleClassName) : ''
  const itemTitleStyle = compConf ? (compConf.formItemTitleStyle || compConf.itemTitleStyle) : null
  const span = item.span || _vm.span
  const align = item.align || _vm.align
  const titleAlign = XEUtils.eqNull(item.titleAlign) ? allTitleAlign : item.titleAlign
  const titleWidth = XEUtils.eqNull(item.titleWidth) ? allTitleWidth : item.titleWidth
  const titleColon = XEUtils.eqNull(item.titleColon) ? allTitleColon : item.titleColon
  const titleAsterisk = XEUtils.eqNull(item.titleAsterisk) ? allTitleAsterisk : item.titleAsterisk
  const itemOverflow = (XEUtils.isUndefined(titleOverflow) || XEUtils.isNull(titleOverflow)) ? allTitleOverflow : titleOverflow
  const itemVertical = (XEUtils.isUndefined(vertical) || XEUtils.isNull(vertical)) ? allVertical : vertical
  const ovEllipsis = itemOverflow === 'ellipsis'
  const ovTitle = itemOverflow === 'title'
  const ovTooltip = itemOverflow === true || itemOverflow === 'tooltip'
  const hasEllipsis = ovTitle || ovTooltip || ovEllipsis
  const params = { data, field, property: field, item, $form: _vm, $grid: _vm.xegrid }
  let isRequired
  if (visible === false) {
    return _e()
  }
  if (rules) {
    const itemRules = rules[field]
    if (itemRules) {
      isRequired = itemRules.some(rule => rule.required)
    }
  }
  let contentVNs = []
  const rfiContent = compConf ? (compConf.renderFormItemContent || compConf.renderItemContent) : null
  if (slots && slots.default) {
    contentVNs = _vm.callSlot(slots.default, params, h)
  } else if (rfiContent) {
    contentVNs = getSlotVNs(rfiContent.call(_vm, h, itemRender, params))
  } else if (compConf && compConf.renderItem) {
    contentVNs = getSlotVNs(compConf.renderItem.call(_vm, h, itemRender, params))
  } else if (field) {
    contentVNs = [`${XEUtils.get(data, field)}`]
  }
  const ons = ovTooltip ? {
    mouseenter (evnt) {
      _vm.triggerTitleTipEvent(evnt, params)
    },
    mouseleave: _vm.handleTitleTipLeaveEvent
  } : {}
  return h('div', {
    class: [
      'vxe-form--item',
      item.id,
      span ? `vxe-col--${span} is--span` : '',
      className ? (XEUtils.isFunction(className) ? className(params) : className) : '',
      itemClassName ? (XEUtils.isFunction(itemClassName) ? itemClassName(params) : itemClassName) : '',
      {
        'is--title': title,
        'is--colon': titleColon,
        'is--vertical': itemVertical,
        'is--asterisk': titleAsterisk,
        'is--required': isRequired,
        'is--hidden': folding && collapseAll,
        'is--active': isActivetem(_vm, item),
        'is--error': showError
      }
    ],
    style: XEUtils.isFunction(itemStyle) ? itemStyle(params) : itemStyle
  }, [
    h('div', {
      class: 'vxe-form--item-inner'
    }, [
      (showTitle !== false) && (title || (slots && slots.title)) ? h('div', {
        class: [
          'vxe-form--item-title',
          titleAlign ? `align--${titleAlign}` : '',
          hasEllipsis ? 'is--ellipsis' : '',
          itemTitleClassName ? (XEUtils.isFunction(itemTitleClassName) ? itemTitleClassName(params) : itemTitleClassName) : '',
          titleClassName ? (XEUtils.isFunction(titleClassName) ? titleClassName(params) : titleClassName) : ''
        ],
        style: Object.assign(
          {},
          XEUtils.isFunction(itemTitleStyle) ? itemTitleStyle(params) : itemTitleStyle,
          XEUtils.isFunction(titleStyle) ? titleStyle(params) : titleStyle,
          titleWidth ? {
            width: isNaN(titleWidth) ? titleWidth : `${titleWidth}px`
          } : null
        ),
        attrs: {
          title: ovTitle ? getFuncText(title) : null
        },
        on: ons
      }, renderTitle(h, _vm, item)) : null,
      h('div', {
        class: [
          'vxe-form--item-content',
          align ? `align--${align}` : '',
          itemContentClassName ? (XEUtils.isFunction(itemContentClassName) ? itemContentClassName(params) : itemContentClassName) : '',
          contentClassName ? (XEUtils.isFunction(contentClassName) ? contentClassName(params) : contentClassName) : ''
        ],
        style: Object.assign({}, XEUtils.isFunction(itemContentStyle) ? itemContentStyle(params) : itemContentStyle, XEUtils.isFunction(contentStyle) ? contentStyle(params) : contentStyle)
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
    $xeformgather: {
      default: null
    }
  },
  provide () {
    return {
      $xeformitem: this,
      $xeformiteminfo: this
    }
  },
  data () {
    return {
      itemConfig: null
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
