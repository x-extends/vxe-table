import { createCommentVNode, defineComponent, h, ref, Ref, PropType, inject, nextTick } from 'vue'
import XEUtils from 'xe-utils/ctor'
import { UtilTools, DomTools } from '../../tools'

import { VxeTablePrivateMethods, VxeTableConstructor, VxeTableMethods } from '../../../types/vxe-table'

const renderType = 'footer'

function mergeFooterMethod (mergeFooterList: any[], _rowIndex: number, _columnIndex: number) {
  for (let mIndex = 0; mIndex < mergeFooterList.length; mIndex++) {
    const { row: mergeRowIndex, col: mergeColIndex, rowspan: mergeRowspan, colspan: mergeColspan } = mergeFooterList[mIndex]
    if (mergeColIndex > -1 && mergeRowIndex > -1 && mergeRowspan && mergeColspan) {
      if (mergeRowIndex === _rowIndex && mergeColIndex === _columnIndex) {
        return { rowspan: mergeRowspan, colspan: mergeColspan }
      }
      if (_rowIndex >= mergeRowIndex && _rowIndex < mergeRowIndex + mergeRowspan && _columnIndex >= mergeColIndex && _columnIndex < mergeColIndex + mergeColspan) {
        return { rowspan: 0, colspan: 0 }
      }
    }
  }
}

export default defineComponent({
  name: 'VxeTableFooter',
  props: {
    footerData: { type: Array as PropType<any[]>, default: () => [] },
    tableColumn: { type: Array as PropType<any[]>, default: () => [] },
    fixedColumn: { type: Array as PropType<any[]>, default: () => [] },
    fixedType: String
  },
  setup (props) {
    const $xetable = inject('$xetable', {} as VxeTableConstructor & VxeTableMethods & VxeTablePrivateMethods)

    const { xID, props: tableProps, reactData: tableReactData, internalData: tableInternalData, refMaps: tableRefMaps, computeMaps: tableComputeMaps } = $xetable
    const { refTableHeader, refTableBody, refValidTooltip } = tableRefMaps
    const { computeTooltipOpts } = tableComputeMaps

    const refElem = ref() as Ref<HTMLDivElement>
    const refFooterTable = ref() as Ref<HTMLTableElement>
    const refFooterColgroup = ref() as Ref<HTMLTableColElement>
    const refFooterTFoot = ref() as Ref<HTMLTableSectionElement>
    const refFooterXSpace = ref() as Ref<HTMLDivElement>

    /**
     * 滚动处理
     * 如果存在列固定左侧，同步更新滚动状态
     * 如果存在列固定右侧，同步更新滚动状态
     */
    const scrollEvent = (evnt: Event) => {
      const { fixedType } = props
      const { scrollXLoad } = tableReactData
      const { lastScrollLeft } = tableInternalData
      const validTip = refValidTooltip.value
      const tableHeader = refTableHeader.value
      const tableBody = refTableBody.value
      const headerElem = tableHeader ? tableHeader.$el as HTMLDivElement : null
      const footerElem = refElem.value
      const bodyElem = tableBody.$el as HTMLDivElement
      const scrollLeft = footerElem.scrollLeft
      const isX = scrollLeft !== lastScrollLeft
      tableInternalData.lastScrollLeft = scrollLeft
      tableInternalData.lastScrollTime = Date.now()
      if (headerElem) {
        headerElem.scrollLeft = scrollLeft
      }
      if (bodyElem) {
        bodyElem.scrollLeft = scrollLeft
      }
      if (scrollXLoad && isX) {
        $xetable.triggerScrollXEvent(evnt)
      }
      if (isX && validTip && validTip.reactData.visible) {
        validTip.updatePlacement()
      }
      $xetable.dispatchEvent('scroll', { type: renderType, fixed: fixedType, scrollTop: bodyElem.scrollTop, scrollLeft, isX, isY: false }, evnt)
    }

    nextTick(() => {
      const { fixedType } = props
      const { elemStore } = tableInternalData
      const prefix = `${fixedType || 'main'}-footer-`
      elemStore[`${prefix}wrapper`] = refElem.value
      elemStore[`${prefix}table`] = refFooterTable.value
      elemStore[`${prefix}colgroup`] = refFooterColgroup.value
      elemStore[`${prefix}list`] = refFooterTFoot.value
      elemStore[`${prefix}xSpace`] = refFooterXSpace.value
    })

    const renderVN = () => {
      let { fixedType, fixedColumn, tableColumn, footerData } = props
      const { footerRowClassName, footerCellClassName, footerRowStyle, footerCellStyle, footerAlign: allFooterAlign, footerSpanMethod, align: allAlign, columnKey, showFooterOverflow: allColumnFooterOverflow } = tableProps
      const { scrollXLoad, overflowX, scrollbarWidth, currentColumn, mergeFooterList } = tableReactData
      const tooltipOpts = computeTooltipOpts.value
      // 如果是使用优化模式
      if (!mergeFooterList.length || !footerSpanMethod) {
        if (fixedType && allColumnFooterOverflow) {
          tableColumn = fixedColumn
        } else if (scrollXLoad) {
          if (fixedType) {
            tableColumn = fixedColumn
          }
        }
      }
      return h('div', {
        ref: refElem,
        class: ['vxe-table--footer-wrapper', fixedType ? `fixed-${fixedType}--wrapper` : 'body--wrapper'],
        xid: xID,
        onScroll: scrollEvent
      }, [
        fixedType ? createCommentVNode() : h('div', {
          ref: refFooterXSpace,
          class: 'vxe-body--x-space'
        }),
        h('table', {
          ref: refFooterTable,
          class: 'vxe-table--footer',
          xid: xID,
          cellspacing: 0,
          cellpadding: 0,
          border: 0
        }, [
          /**
           * 列宽
           */
          h('colgroup', {
            ref: refFooterColgroup
          }, tableColumn.map((column: any, $columnIndex: any) => {
            return h('col', {
              name: column.id,
              key: $columnIndex
            })
          }).concat(scrollbarWidth ? [
            h('col', {
              name: 'col_gutter'
            })
          ] : [])),
          /**
           * 底部
           */
          h('tfoot', {
            ref: refFooterTFoot
          }, footerData.map((list: any, _rowIndex: any) => {
            const $rowIndex = _rowIndex
            return h('tr', {
              class: ['vxe-footer--row', footerRowClassName ? XEUtils.isFunction(footerRowClassName) ? footerRowClassName({ $table: $xetable, _rowIndex, $rowIndex, fixed: fixedType, type: renderType }) : footerRowClassName : ''],
              style: footerRowStyle ? (XEUtils.isFunction(footerRowStyle) ? footerRowStyle({ $table: $xetable, _rowIndex, $rowIndex, fixed: fixedType, type: renderType }) : footerRowStyle) : null
            }, tableColumn.map((column: any, $columnIndex: any) => {
              const { type, showFooterOverflow, footerAlign, align, footerClassName } = column
              const showAllTip = tooltipOpts.showAll
              const isColGroup = column.children && column.children.length
              const fixedHiddenColumn = fixedType ? column.fixed !== fixedType && !isColGroup : column.fixed && overflowX
              const footOverflow = XEUtils.isUndefined(showFooterOverflow) || XEUtils.isNull(showFooterOverflow) ? allColumnFooterOverflow : showFooterOverflow
              const footAlign = footerAlign || align || allFooterAlign || allAlign
              let showEllipsis = footOverflow === 'ellipsis'
              const showTitle = footOverflow === 'title'
              const showTooltip = footOverflow === true || footOverflow === 'tooltip'
              let hasEllipsis = showTitle || showTooltip || showEllipsis
              const attrs: any = { colid: column.id }
              const tfOns: any = {}
              const columnIndex = $xetable.getColumnIndex(column)
              const _columnIndex = $xetable.getVTColumnIndex(column)
              const itemIndex = _columnIndex
              const params = { $table: $xetable, _rowIndex, $rowIndex, column, columnIndex, $columnIndex, _columnIndex, itemIndex, items: list, fixed: fixedType, type: renderType, data: footerData }
              // 虚拟滚动不支持动态高度
              if (scrollXLoad && !hasEllipsis) {
                showEllipsis = hasEllipsis = true
              }
              if (showTitle || showTooltip || showAllTip) {
                tfOns.onMouseenter = (evnt: any) => {
                  if (showTitle) {
                    DomTools.updateCellTitle(evnt.currentTarget, column)
                  } else if (showTooltip || showAllTip) {
                    $xetable.triggerFooterTooltipEvent(evnt, params)
                  }
                }
              }
              if (showTooltip || showAllTip) {
                tfOns.onMouseleave = () => {
                  if (showTooltip || showAllTip) {
                    $xetable.handleTargetLeaveEvent()
                  }
                }
              }
              tfOns.onClick = (evnt: any) => {
                $xetable.dispatchEvent('footer-cell-click', Object.assign({ cell: evnt.currentTarget }, params), evnt)
              }
              tfOns.onDblclick = (evnt: any) => {
                $xetable.dispatchEvent('footer-cell-dblclick', Object.assign({ cell: evnt.currentTarget }, params), evnt)
              }
              // 合并行或列
              if (mergeFooterList.length) {
                const spanRest = mergeFooterMethod(mergeFooterList, _rowIndex, _columnIndex)
                if (spanRest) {
                  const { rowspan, colspan } = spanRest
                  if (!rowspan || !colspan) {
                    return null
                  }
                  if (rowspan > 1) {
                    attrs.rowspan = rowspan
                  }
                  if (colspan > 1) {
                    attrs.colspan = colspan
                  }
                }
              } else if (footerSpanMethod) {
                // 自定义合并方法
                const { rowspan = 1, colspan = 1 } = footerSpanMethod(params) || {}
                if (!rowspan || !colspan) {
                  return null
                }
                if (rowspan > 1) {
                  attrs.rowspan = rowspan
                }
                if (colspan > 1) {
                  attrs.colspan = colspan
                }
              }
              return h('td', {
                class: ['vxe-footer--column', column.id, {
                  [`col--${footAlign}`]: footAlign,
                  [`col--${type}`]: type,
                  'col--last': $columnIndex === tableColumn.length - 1,
                  'fixed--hidden': fixedHiddenColumn,
                  'col--ellipsis': hasEllipsis,
                  'col--current': currentColumn === column
                }, UtilTools.getClass(footerClassName, params), UtilTools.getClass(footerCellClassName, params)],
                ...attrs,
                style: footerCellStyle ? (XEUtils.isFunction(footerCellStyle) ? footerCellStyle(params) : footerCellStyle) : null,
                ...tfOns,
                key: columnKey ? column.id : $columnIndex
              }, [
                h('div', {
                  class: ['vxe-cell', {
                    'c--title': showTitle,
                    'c--tooltip': showTooltip,
                    'c--ellipsis': showEllipsis
                  }]
                }, column.renderFooter(params))
              ])
            }).concat(scrollbarWidth ? [
              h('td', {
                class: 'vxe-footer--gutter col--gutter'
              })
            ] : []))
          }))
        ])
      ])
    }

    return renderVN
  }
})
