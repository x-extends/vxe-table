import { CreateElement } from 'vue'
import XEUtils from 'xe-utils'
import { VxeUI } from '../../ui'
import { getClass } from '../../ui/src/utils'
import { updateCellTitle, setScrollLeft } from '../../ui/src/dom'

const renderType = 'footer'

const { renderer } = VxeUI

function mergeFooterMethod (mergeFooterList: any, _rowIndex: any, _columnIndex: any) {
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

export default {
  name: 'VxeTableFooter',
  props: {
    footerTableData: Array,
    tableColumn: Array,
    fixedColumn: Array,
    fixedType: String,
    size: String
  },
  mounted (this: any) {
    const { $parent: $xetable, $el, $refs, fixedType } = this
    const { elemStore } = $xetable
    const prefix = `${fixedType || 'main'}-footer-`
    elemStore[`${prefix}wrapper`] = $el
    elemStore[`${prefix}table`] = $refs.table
    elemStore[`${prefix}colgroup`] = $refs.colgroup
    elemStore[`${prefix}list`] = $refs.tfoot
    elemStore[`${prefix}xSpace`] = $refs.xSpace
  },
  destroyed () {
    const { $parent: $xetable, fixedType } = this
    const { elemStore } = $xetable
    const prefix = `${fixedType || 'main'}-footer-`
    elemStore[`${prefix}wrapper`] = null
    elemStore[`${prefix}table`] = null
    elemStore[`${prefix}colgroup`] = null
    elemStore[`${prefix}list`] = null
    elemStore[`${prefix}xSpace`] = null
  },
  render (h: CreateElement) {
    let { _e, $parent: $xetable, fixedType, fixedColumn, tableColumn, footerTableData } = this
    const {
      $listeners: tableListeners,
      tId,
      footerRowClassName,
      footerCellClassName,
      footerRowStyle,
      footerCellStyle,
      footerAlign: allFooterAlign,
      mergeFooterList,
      footerSpanMethod,
      align: allAlign,
      scrollXLoad,
      columnKey,
      columnOpts,
      showFooterOverflow: allColumnFooterOverflow,
      currentColumn,
      overflowX,
      scrollbarWidth,
      tooltipOpts,
      visibleColumn,
      expandColumn
    } = $xetable
    // 如果是使用优化模式
    if (fixedType) {
      // 如果存在展开行使用全量渲染
      if (!expandColumn && (scrollXLoad || allColumnFooterOverflow)) {
        if (!mergeFooterList.length || !footerSpanMethod) {
          tableColumn = fixedColumn
        } else {
          tableColumn = visibleColumn
        }
      } else {
        tableColumn = visibleColumn
      }
    }
    return h('div', {
      class: ['vxe-table--footer-wrapper', fixedType ? `fixed-${fixedType}--wrapper` : 'body--wrapper'],
      attrs: {
        xid: tId
      },
      on: {
        scroll: this.scrollEvent
      }
    }, [
      fixedType
        ? _e()
        : h('div', {
          class: 'vxe-body--x-space',
          ref: 'xSpace'
        }),
      h('table', {
        class: 'vxe-table--footer',
        attrs: {
          xid: tId,
          cellspacing: 0,
          cellpadding: 0,
          border: 0
        },
        ref: 'table'
      }, [
        /**
         * 列宽
         */
        h('colgroup', {
          ref: 'colgroup'
        }, tableColumn.map((column: any, $columnIndex: any) => {
          return h('col', {
            attrs: {
              name: column.id
            },
            key: $columnIndex
          })
        }).concat(scrollbarWidth
          ? [
              h('col', {
                attrs: {
                  name: 'col_gutter'
                }
              })
            ]
          : [])),
        /**
         * 底部
         */
        h('tfoot', {
          ref: 'tfoot'
        }, footerTableData.map((list: any, _rowIndex: any) => {
          const $rowIndex = _rowIndex
          const rowParams = { $table: $xetable, row: list, _rowIndex, $rowIndex, fixed: fixedType, type: renderType }
          return h('tr', {
            class: ['vxe-footer--row', footerRowClassName ? XEUtils.isFunction(footerRowClassName) ? footerRowClassName(rowParams) : footerRowClassName : ''],
            style: footerRowStyle ? (XEUtils.isFunction(footerRowStyle) ? footerRowStyle(rowParams) : footerRowStyle) : null
          }, tableColumn.map((column: any, $columnIndex: any) => {
            const { type, showFooterOverflow, footerAlign, align, footerClassName, editRender, cellRender } = column
            const renderOpts = editRender || cellRender
            const compConf = renderOpts ? renderer.get(renderOpts.name) : null
            const showAllTip = tooltipOpts.showAll || tooltipOpts.enabled
            const isColGroup = column.children && column.children.length
            const fixedHiddenColumn = fixedType ? column.fixed !== fixedType && !isColGroup : column.fixed && overflowX
            const footOverflow = XEUtils.isUndefined(showFooterOverflow) || XEUtils.isNull(showFooterOverflow) ? allColumnFooterOverflow : showFooterOverflow
            const footAlign = footerAlign || (compConf ? compConf.tableFooterCellAlign : '') || allFooterAlign || align || (compConf ? compConf.tableCellAlign : '') || allAlign
            let showEllipsis = footOverflow === 'ellipsis'
            const showTitle = footOverflow === 'title'
            const showTooltip = footOverflow === true || footOverflow === 'tooltip'
            let hasEllipsis = showTitle || showTooltip || showEllipsis
            const attrs: any = { colid: column.id }
            const tfOns: any = {}
            const columnIndex = $xetable.getColumnIndex(column)
            const _columnIndex = $xetable.getVTColumnIndex(column)
            const itemIndex = _columnIndex
            const cellParams = {
              $table: $xetable,
              $grid: $xetable.xegrid,
              row: list,
              _rowIndex,
              $rowIndex,
              column,
              columnIndex,
              $columnIndex,
              _columnIndex,
              itemIndex,
              items: list,
              fixed: fixedType,
              type: renderType,
              data: footerTableData
            }
            // 虚拟滚动不支持动态高度
            if (scrollXLoad && !hasEllipsis) {
              showEllipsis = hasEllipsis = true
            }
            if (showTitle || showTooltip || showAllTip) {
              tfOns.mouseenter = (evnt: any) => {
                if (showTitle) {
                  updateCellTitle(evnt.currentTarget, column)
                } else if (showTooltip || showAllTip) {
                  $xetable.triggerFooterTooltipEvent(evnt, cellParams)
                }
              }
            }
            if (showTooltip || showAllTip) {
              tfOns.mouseleave = (evnt: any) => {
                if (showTooltip || showAllTip) {
                  $xetable.handleTargetLeaveEvent(evnt)
                }
              }
            }
            if (tableListeners['footer-cell-click']) {
              tfOns.click = (evnt: any) => {
                $xetable.emitEvent('footer-cell-click', Object.assign({ cell: evnt.currentTarget }, cellParams), evnt)
              }
            }
            if (tableListeners['footer-cell-dblclick']) {
              tfOns.dblclick = (evnt: any) => {
                $xetable.emitEvent('footer-cell-dblclick', Object.assign({ cell: evnt.currentTarget }, cellParams), evnt)
              }
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
              const { rowspan = 1, colspan = 1 } = footerSpanMethod(cellParams) || {}
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
              }, getClass(footerClassName, cellParams), getClass(footerCellClassName, cellParams)],
              attrs,
              style: footerCellStyle ? (XEUtils.isFunction(footerCellStyle) ? footerCellStyle(cellParams) : footerCellStyle) : null,
              on: tfOns,
              key: columnKey || columnOpts.useKey ? column.id : $columnIndex
            }, [
              h('div', {
                class: ['vxe-cell', {
                  'c--title': showTitle,
                  'c--tooltip': showTooltip,
                  'c--ellipsis': showEllipsis
                }]
              }, column.renderFooter(h, cellParams))
            ])
          }).concat(scrollbarWidth
            ? [
                h('td', {
                  class: 'vxe-footer--gutter col--gutter'
                })
              ]
            : []))
        }))
      ])
    ])
  },
  methods: {
    /**
     * 滚动处理
     * 如果存在列固定左侧，同步更新滚动状态
     * 如果存在列固定右侧，同步更新滚动状态
     */
    scrollEvent (evnt: any) {
      const { $parent: $xeTable, fixedType } = this
      const { $refs } = $xeTable
      const { tableHeader, tableBody, tableFooter } = $refs
      const headerElem = tableHeader ? tableHeader.$el : null
      const footerElem = tableFooter ? tableFooter.$el : null
      const bodyElem = tableBody.$el
      const scrollLeft = footerElem ? footerElem.scrollLeft : 0
      const xHandleEl = $refs.refScrollXHandleElem
      if (xHandleEl) {
        xHandleEl.scrollLeft = scrollLeft
      } else {
        const isRollX = true
        const isRollY = false
        const scrollTop = bodyElem.scrollTop
        $xeTable.lastScrollLeft = scrollLeft
        $xeTable.lastScrollTime = Date.now()
        setScrollLeft(headerElem, scrollLeft)
        setScrollLeft(bodyElem, scrollLeft)
        $xeTable.handleScrollEvent(evnt, isRollY, isRollX, scrollTop, scrollLeft, {
          type: renderType,
          fixed: fixedType
        })
      }
    }
  } as any
} as any
