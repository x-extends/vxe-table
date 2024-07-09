import XEUtils from 'xe-utils'
import GlobalConfig from '../../v-x-e-table/src/conf'
import VXETable from '../../v-x-e-table'
import { isEnableConf, getFuncText } from '../../tools/utils'
import { renderTitle } from './render'
import { isActivetem } from './util'
import { getSlotVNs } from '../../tools/vn'

/**
 * 配置式项
 */
const VxeFormConfigItem = {
  name: 'VxeFormConfigItem',
  props: {
    itemConfig: Object
  },
  inject: {
    $xeform: {
      default: null
    }
  },
  provide () {
    return {
      $xeformgather: null,
      $xeformiteminfo: this
    }
  },
  render (h) {
    const { _e, $xeform, itemConfig: item } = this
    const { rules, data, disabled, readonly, collapseAll, validOpts, titleAlign: allTitleAlign, titleWidth: allTitleWidth, titleColon: allTitleColon, titleAsterisk: allTitleAsterisk, titleOverflow: allTitleOverflow, vertical: allVertical } = $xeform
    const { slots, title, folding, visible, field, collapseNode, itemRender, showError, errRule, className, titleOverflow, vertical, children, showTitle, contentClassName, contentStyle, titleClassName, titleStyle } = item
    const compConf = isEnableConf(itemRender) ? VXETable.renderer.get(itemRender.name) : null
    const itemClassName = compConf ? (compConf.formItemClassName || compConf.itemClassName) : ''
    const itemStyle = compConf ? (compConf.formItemStyle || compConf.itemStyle) : null
    const itemContentClassName = compConf ? (compConf.formItemContentClassName || compConf.itemContentClassName) : ''
    const itemContentStyle = compConf ? (compConf.formItemContentStyle || compConf.itemContentStyle) : null
    const itemTitleClassName = compConf ? (compConf.formItemTitleClassName || compConf.itemTitleClassName) : ''
    const itemTitleStyle = compConf ? (compConf.formItemTitleStyle || compConf.itemTitleStyle) : null
    const span = item.span || $xeform.span
    const align = item.align || $xeform.align
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
    const params = { data, disabled, readonly, field, property: field, item, $form: $xeform, $grid: $xeform.xegrid }
    let isRequired
    if (visible === false) {
      return _e()
    }
    // 如果为项集合
    const isGather = children && children.length > 0
    if (isGather) {
      const childVNs = item.children.map((childItem, index) => {
        return h(VxeFormConfigItem, {
          key: index,
          props: {
            itemConfig: childItem
          }
        })
      })
      return childVNs.length ? h('div', {
        class: ['vxe-form--gather vxe-form--item-row', item.id, span ? `vxe-form--item-col_${span} is--span` : '', className ? (XEUtils.isFunction(className) ? className(params) : className) : '']
      }, childVNs) : _e()
    }
    if (!readonly && rules) {
      const itemRules = rules[field]
      if (itemRules) {
        isRequired = itemRules.some(rule => rule.required)
      }
    }
    let contentVNs = []
    const rfiContent = compConf ? (compConf.renderFormItemContent || compConf.renderItemContent) : null
    if (slots && slots.default) {
      contentVNs = $xeform.callSlot(slots.default, params, h)
    } else if (rfiContent) {
      contentVNs = getSlotVNs(rfiContent.call($xeform, h, itemRender, params))
    } else if (compConf && compConf.renderItem) {
      contentVNs = getSlotVNs(compConf.renderItem.call($xeform, h, itemRender, params))
    } else if (field) {
      contentVNs = [XEUtils.toValueString(XEUtils.get(data, field))]
    }
    const ons = ovTooltip ? {
      mouseenter (evnt) {
        $xeform.triggerTitleTipEvent(evnt, params)
      },
      mouseleave: $xeform.handleTitleTipLeaveEvent
    } : {}
    return h('div', {
      class: [
        'vxe-form--item',
        item.id,
        span ? `vxe-form--item-col_${span} is--span` : null,
        className ? (XEUtils.isFunction(className) ? className(params) : className) : '',
        itemClassName ? (XEUtils.isFunction(itemClassName) ? itemClassName(params) : itemClassName) : '',
        {
          'is--title': title,
          'is--colon': titleColon,
          'is--vertical': itemVertical,
          'is--asterisk': titleAsterisk,
          'is--required': isRequired,
          'is--hidden': folding && collapseAll,
          'is--active': isActivetem($xeform, item),
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
        }, renderTitle(h, $xeform, item)) : null,
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
                click: $xeform.toggleCollapseEvent
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
            }, errRule.content) : null
          ])
        )
      ])
    ])
  }
}

export default VxeFormConfigItem
