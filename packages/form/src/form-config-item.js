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
    const { rules, data, collapseAll, validOpts, titleAlign: allTitleAlign, titleWidth: allTitleWidth, titleColon: allTitleColon, titleAsterisk: allTitleAsterisk, titleOverflow: allTitleOverflow } = $xeform
    const { slots, title, folding, visible, field, collapseNode, itemRender, showError, errRule, className, titleOverflow, children } = item
    const compConf = isEnableConf(itemRender) ? VXETable.renderer.get(itemRender.name) : null
    const itemClassName = compConf ? compConf.itemClassName : ''
    const span = item.span || $xeform.span
    const align = item.align || $xeform.align
    const titleAlign = XEUtils.eqNull(item.titleAlign) ? allTitleAlign : item.titleAlign
    const titleWidth = XEUtils.eqNull(item.titleWidth) ? allTitleWidth : item.titleWidth
    const titleColon = XEUtils.eqNull(item.titleColon) ? allTitleColon : item.titleColon
    const titleAsterisk = XEUtils.eqNull(item.titleAsterisk) ? allTitleAsterisk : item.titleAsterisk
    const itemOverflow = (XEUtils.isUndefined(titleOverflow) || XEUtils.isNull(titleOverflow)) ? allTitleOverflow : titleOverflow
    const showEllipsis = itemOverflow === 'ellipsis'
    const showTitle = itemOverflow === 'title'
    const showTooltip = itemOverflow === true || itemOverflow === 'tooltip'
    const hasEllipsis = showTitle || showTooltip || showEllipsis
    const params = { data, field, property: field, item, $form: $xeform }
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
        class: ['vxe-form--gather vxe-row', item.id, span ? `vxe-col--${span} is--span` : '', className ? (XEUtils.isFunction(className) ? className(params) : className) : '']
      }, childVNs) : _e()
    }
    if (rules) {
      const itemRules = rules[field]
      if (itemRules) {
        isRequired = itemRules.some(rule => rule.required)
      }
    }
    let contentVNs = []
    if (slots && slots.default) {
      contentVNs = $xeform.callSlot(slots.default, params, h)
    } else if (compConf && compConf.renderItemContent) {
      contentVNs = getSlotVNs(compConf.renderItemContent.call($xeform, h, itemRender, params))
    } else if (compConf && compConf.renderItem) {
      contentVNs = getSlotVNs(compConf.renderItem.call($xeform, h, itemRender, params))
    } else if (field) {
      contentVNs = [XEUtils.toValueString(XEUtils.get(data, field))]
    }
    const ons = showTooltip ? {
      mouseenter (evnt) {
        $xeform.triggerTitleTipEvent(evnt, params)
      },
      mouseleave: $xeform.handleTitleTipLeaveEvent
    } : {}
    return h('div', {
      class: [
        'vxe-form--item',
        item.id,
        span ? `vxe-col--${span} is--span` : null,
        className ? (XEUtils.isFunction(className) ? className(params) : className) : '',
        itemClassName ? (XEUtils.isFunction(itemClassName) ? itemClassName(params) : itemClassName) : '',
        {
          'is--title': title,
          'is--colon': titleColon,
          'is--asterisk': titleAsterisk,
          'is--required': isRequired,
          'is--hidden': folding && collapseAll,
          'is--active': isActivetem($xeform, item),
          'is--error': showError
        }
      ],
      props: {
        itemConfig: item
      },
      key: item.id
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
            title: showTitle ? getFuncText(title) : null
          },
          on: ons
        }, renderTitle(h, $xeform, item)) : null,
        h('div', {
          class: ['vxe-form--item-content', align ? `align--${align}` : null]
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
