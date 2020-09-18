import XEUtils from 'xe-utils/ctor'
import { UtilTools, DomTools } from '../../tools'

const cellType = 'footer'

function mergeFooterMethod (mergeFooterList, _rowIndex, _columnIndex) {
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
    footerData: Array,
    tableColumn: Array,
    visibleColumn: Array,
    fixedColumn: Array,
    size: String,
    fixedType: String
  },
  mounted () {
    const { $parent: $xetable, $el, $refs, fixedType } = this
    const { elemStore } = $xetable
    const prefix = `${fixedType || 'main'}-footer-`
    elemStore[`${prefix}wrapper`] = $el
    elemStore[`${prefix}table`] = $refs.table
    elemStore[`${prefix}colgroup`] = $refs.colgroup
    elemStore[`${prefix}list`] = $refs.tfoot
    elemStore[`${prefix}xSpace`] = $refs.xSpace
  },
  render (h) {
    let { _e, $parent: $xetable, fixedType, fixedColumn, tableColumn, footerData } = this
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
      showFooterOverflow: allColumnFooterOverflow,
      currentColumn,
      overflowX,
      scrollbarWidth,
      tooltipOpts
    } = $xetable
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
      class: ['vxe-table--footer-wrapper', fixedType ? `fixed-${fixedType}--wrapper` : 'body--wrapper'],
      attrs: {
        'data-tid': tId
      },
      on: {
        scroll: this.scrollEvent
      }
    }, [
      fixedType ? _e() : h('div', {
        class: 'vxe-body--x-space',
        ref: 'xSpace'
      }),
      h('table', {
        class: 'vxe-table--footer',
        attrs: {
          'data-tid': tId,
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
        }, tableColumn.map((column, columnIndex) => {
          return h('col', {
            attrs: {
              name: column.id
            },
            key: columnIndex
          })
        }).concat(scrollbarWidth ? [
          h('col', {
            attrs: {
              name: 'col_gutter'
            }
          })
        ] : [])),
        /**
         * 底部
         */
        h('tfoot', {
          ref: 'tfoot'
        }, footerData.map((list, _rowIndex) => {
          const $rowIndex = _rowIndex
          return h('tr', {
            class: ['vxe-footer--row', footerRowClassName ? XEUtils.isFunction(footerRowClassName) ? footerRowClassName({ $table: $xetable, _rowIndex, $rowIndex, fixed: fixedType, type: cellType }) : footerRowClassName : ''],
            style: footerRowStyle ? (XEUtils.isFunction(footerRowStyle) ? footerRowStyle({ $table: $xetable, _rowIndex, $rowIndex, fixed: fixedType, type: cellType }) : footerRowStyle) : null
          }, tableColumn.map((column, $columnIndex) => {
            const { showFooterOverflow, footerAlign, align, footerClassName } = column
            const { enabled } = tooltipOpts
            const isColGroup = column.children && column.children.length
            const fixedHiddenColumn = fixedType ? column.fixed !== fixedType && !isColGroup : column.fixed && overflowX
            const footOverflow = XEUtils.isUndefined(showFooterOverflow) || XEUtils.isNull(showFooterOverflow) ? allColumnFooterOverflow : showFooterOverflow
            const footAlign = footerAlign || align || allFooterAlign || allAlign
            let showEllipsis = footOverflow === 'ellipsis'
            const showTitle = footOverflow === 'title'
            const showTooltip = footOverflow === true || footOverflow === 'tooltip'
            let hasEllipsis = showTitle || showTooltip || showEllipsis
            const attrs = { 'data-colid': column.id }
            const tfOns = {}
            const columnIndex = $xetable.getColumnIndex(column)
            const _columnIndex = $xetable._getColumnIndex(column)
            const itemIndex = _columnIndex
            const params = { $table: $xetable, _rowIndex, $rowIndex, column, columnIndex, $columnIndex, _columnIndex, itemIndex, items: list, fixed: fixedType, type: cellType, data: footerData }
            // 虚拟滚动不支持动态高度
            if (scrollXLoad && !hasEllipsis) {
              showEllipsis = hasEllipsis = true
            }
            if (showTitle || showTooltip || enabled) {
              tfOns.mouseenter = evnt => {
                if (showTitle) {
                  DomTools.updateCellTitle(evnt.currentTarget, column)
                } else if (showTooltip || enabled) {
                  $xetable.triggerFooterTooltipEvent(evnt, params)
                }
              }
            }
            if (showTooltip || enabled) {
              tfOns.mouseleave = evnt => {
                if (showTooltip || enabled) {
                  $xetable.handleTargetLeaveEvent(evnt)
                }
              }
            }
            if (tableListeners['footer-cell-click']) {
              tfOns.click = evnt => {
                $xetable.emitEvent('footer-cell-click', Object.assign({ cell: evnt.currentTarget }, params), evnt)
              }
            }
            if (tableListeners['footer-cell-dblclick']) {
              tfOns.dblclick = evnt => {
                $xetable.emitEvent('footer-cell-dblclick', Object.assign({ cell: evnt.currentTarget }, params), evnt)
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
              // 自定义合并函数
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
            const type = column.type === 'seq' || column.type === 'index' ? 'seq' : column.type
            return h('td', {
              class: ['vxe-footer--column', column.id, {
                [`col--${footAlign}`]: footAlign,
                [`col--${type}`]: type,
                'col--last': $columnIndex === tableColumn.length - 1,
                'fixed--hidden': fixedHiddenColumn,
                'col--ellipsis': hasEllipsis,
                'col--current': currentColumn === column
              }, UtilTools.getClass(footerClassName, params), UtilTools.getClass(footerCellClassName, params)],
              attrs,
              style: footerCellStyle ? (XEUtils.isFunction(footerCellStyle) ? footerCellStyle(params) : footerCellStyle) : null,
              on: tfOns,
              key: columnKey ? column.id : $columnIndex
            }, [
              h('div', {
                class: ['vxe-cell', {
                  'c--title': showTitle,
                  'c--tooltip': showTooltip,
                  'c--ellipsis': showEllipsis
                }]
              }, column.renderFooter(h, params))
            ])
          }).concat(scrollbarWidth ? [
            h('td', {
              class: 'col--gutter'
            })
          ] : []))
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
    scrollEvent (evnt) {
      const { $parent: $xetable, fixedType } = this
      const { $refs, scrollXLoad, triggerScrollXEvent, lastScrollLeft } = $xetable
      const { tableHeader, tableBody, tableFooter, validTip } = $refs
      const headerElem = tableHeader ? tableHeader.$el : null
      const footerElem = tableFooter ? tableFooter.$el : null
      const bodyElem = tableBody.$el
      const scrollLeft = footerElem.scrollLeft
      const isX = scrollLeft !== lastScrollLeft
      $xetable.lastScrollLeft = scrollLeft
      $xetable.lastScrollTime = Date.now()
      if (headerElem) {
        headerElem.scrollLeft = scrollLeft
      }
      if (bodyElem) {
        bodyElem.scrollLeft = scrollLeft
      }
      if (scrollXLoad && isX) {
        triggerScrollXEvent(evnt)
      }
      if (isX && validTip && validTip.visible) {
        validTip.updatePlacement()
      }
      $xetable.emitEvent('scroll', { type: cellType, fixed: fixedType, scrollTop: bodyElem.scrollTop, scrollLeft, isX, isY: false }, evnt)
    }
  }
}
