import { defineComponent, h, inject, provide, PropType, createCommentVNode } from 'vue'
import XEUtils from 'xe-utils'
import GlobalConfig from '../../v-x-e-table/src/conf'
import { VXETable } from '../../v-x-e-table'
import { getFuncText, isEnableConf } from '../../tools/utils'
import { getSlotVNs } from '../../tools/vn'
import { renderTitle } from './render'
import { isActivetem } from './util'

import { VxeFormConstructor, VxeFormDefines, VxeFormPrivateMethods, SlotVNodeType } from '../../../types/all'

const VxeFormConfigItem = defineComponent({
  name: 'VxeFormConfigItem',
  props: {
    itemConfig: Object as PropType<VxeFormDefines.ItemInfo>
  },
  setup (props) {
    const $xeform = inject('$xeform', {} as VxeFormConstructor & VxeFormPrivateMethods)
    const xeformiteminfo = { itemConfig: props.itemConfig }

    provide('$xeformiteminfo', xeformiteminfo)
    provide('$xeformgather', null)

    const renderVN = () => {
      const { reactData } = $xeform
      const { data, rules, span: allSpan, align: allAlign, titleAlign: allTitleAlign, titleWidth: allTitleWidth, titleColon: allTitleColon, titleAsterisk: allTitleAsterisk, titleOverflow: allTitleOverflow, vertical: allVertical } = $xeform.props
      const { computeValidOpts } = $xeform.getComputeMaps()
      const item = props.itemConfig as VxeFormDefines.ItemInfo
      const { collapseAll } = reactData
      const validOpts = computeValidOpts.value
      const { slots, title, visible, folding, field, collapseNode, itemRender, showError, errRule, className, titleOverflow, vertical, children, showTitle, contentClassName, contentStyle, titleClassName, titleStyle } = item
      const compConf = isEnableConf(itemRender) ? VXETable.renderer.get(itemRender.name) : null
      const itemClassName = compConf ? compConf.itemClassName : ''
      const itemStyle = compConf ? compConf.itemStyle : null
      const itemContentClassName = compConf ? compConf.itemContentClassName : ''
      const itemContentStyle = compConf ? compConf.itemContentStyle : null
      const itemTitleClassName = compConf ? compConf.itemTitleClassName : ''
      const itemTitleStyle = compConf ? compConf.itemTitleStyle : null
      const defaultSlot = slots ? slots.default : null
      const titleSlot = slots ? slots.title : null
      const span = item.span || allSpan
      const align = item.align || allAlign
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
      const params = { data, field, property: field, item, $form: $xeform, $grid: $xeform.xegrid }
      if (visible === false) {
        return createCommentVNode()
      }
      let isRequired = false
      if (rules) {
        const itemRules = rules[field]
        if (itemRules) {
          isRequired = itemRules.some((rule) => rule.required)
        }
      }
      // 如果为项集合
      const isGather = children && children.length > 0
      if (isGather) {
        const childVNs = children.map((childItem, index) => {
          return h(VxeFormConfigItem, {
            key: index,
            itemConfig: childItem
          })
        })
        return childVNs.length ? h('div', {
          class: ['vxe-form--gather vxe-form--item-row', item.id, span ? `vxe-form--item-col_${span} is--span` : '', className ? (XEUtils.isFunction(className) ? className(params) : className) : '']
        }, childVNs) : createCommentVNode()
      }
      let contentVNs: SlotVNodeType[] = []
      if (defaultSlot) {
        contentVNs = $xeform.callSlot(defaultSlot, params)
      } else if (compConf && compConf.renderItemContent) {
        contentVNs = getSlotVNs(compConf.renderItemContent(itemRender, params))
      } else if (field) {
        contentVNs = [XEUtils.toValueString(XEUtils.get(data, field))]
      }
      if (collapseNode) {
        contentVNs.push(
          h('div', {
            class: 'vxe-form--item-trigger-node',
            onClick: $xeform.toggleCollapseEvent
          }, [
            h('span', {
              class: 'vxe-form--item-trigger-text'
            }, collapseAll ? GlobalConfig.i18n('vxe.form.unfolding') : GlobalConfig.i18n('vxe.form.folding')),
            h('i', {
              class: ['vxe-form--item-trigger-icon', collapseAll ? GlobalConfig.icon.FORM_FOLDING : GlobalConfig.icon.FORM_UNFOLDING]
            })
          ])
        )
      }
      if (errRule && validOpts.showMessage) {
        contentVNs.push(
          h('div', {
            class: 'vxe-form--item-valid',
            style: errRule.maxWidth ? {
              width: `${errRule.maxWidth}px`
            } : null
          }, errRule.content)
        )
      }
      const ons = ovTooltip ? {
        onMouseenter (evnt: MouseEvent) {
          $xeform.triggerTitleTipEvent(evnt, params)
        },
        onMouseleave: $xeform.handleTitleTipLeaveEvent
      } : {}
      return h('div', {
        class: [
          'vxe-form--item',
          item.id,
          span ? `vxe-form--item-col_${span} is--span` : '',
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
          (showTitle !== false) && (title || titleSlot) ? h('div', {
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
                width: isNaN(titleWidth as number) ? titleWidth : `${titleWidth}px`
              } : null
            ),
            title: ovTitle ? getFuncText(title) : null,
            ...ons
          }, renderTitle($xeform, item)) : null,
          h('div', {
            class: [
              'vxe-form--item-content',
              align ? `align--${align}` : '',
              itemContentClassName ? (XEUtils.isFunction(itemContentClassName) ? itemContentClassName(params) : itemContentClassName) : '',
              contentClassName ? (XEUtils.isFunction(contentClassName) ? contentClassName(params) : contentClassName) : ''
            ],
            style: Object.assign({}, XEUtils.isFunction(itemContentStyle) ? itemContentStyle(params) : itemContentStyle, XEUtils.isFunction(contentStyle) ? contentStyle(params) : contentStyle)
          }, contentVNs)
        ])
      ])
    }

    const $xeformconfigitem = {
      renderVN
    }

    return $xeformconfigitem
  },
  render () {
    return this.renderVN()
  }
})

export default VxeFormConfigItem
