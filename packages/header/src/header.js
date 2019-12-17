import XEUtils from 'xe-utils'
import { UtilTools, DomTools } from '../../tools'

const getAllColumns = (columns) => {
  const result = []
  columns.forEach((column) => {
    if (column.visible) {
      if (column.children && column.children.length && column.children.some(column => column.visible)) {
        result.push(column)
        result.push.apply(result, getAllColumns(column.children))
      } else {
        result.push(column)
      }
    }
  })
  return result
}

const convertToRows = (originColumns) => {
  let maxLevel = 1
  const traverse = (column, parent) => {
    if (parent) {
      column.level = parent.level + 1
      if (maxLevel < column.level) {
        maxLevel = column.level
      }
    }
    if (column.children && column.children.length && column.children.some(column => column.visible)) {
      let colSpan = 0
      column.children.forEach((subColumn) => {
        if (subColumn.visible) {
          traverse(subColumn, column)
          colSpan += subColumn.colSpan
        }
      })
      column.colSpan = colSpan
    } else {
      column.colSpan = 1
    }
  }

  originColumns.forEach((column) => {
    column.level = 1
    traverse(column)
  })

  const rows = []
  for (let i = 0; i < maxLevel; i++) {
    rows.push([])
  }

  const allColumns = getAllColumns(originColumns)

  allColumns.forEach((column) => {
    if (column.children && column.children.length && column.children.some(column => column.visible)) {
      column.rowSpan = 1
    } else {
      column.rowSpan = maxLevel - column.level + 1
    }
    rows[column.level - 1].push(column)
  })

  return rows
}

export default {
  name: 'VxeTableHeader',
  props: {
    tableData: Array,
    tableColumn: Array,
    visibleColumn: Array,
    collectColumn: Array,
    fixedColumn: Array,
    size: String,
    fixedType: String,
    isGroup: Boolean
  },
  data () {
    return {
      headerColumn: []
    }
  },
  watch: {
    tableColumn () {
      this.uploadColumn()
    }
  },
  created () {
    this.uploadColumn()
  },
  render (h) {
    let { $parent: $table, fixedType, headerColumn, tableColumn, fixedColumn } = this
    let {
      $listeners: tableListeners,
      resizable, border,
      overflowX,
      columnKey,
      headerRowClassName,
      headerCellClassName,
      headerRowStyle,
      headerCellStyle,
      showHeaderOverflow: allHeaderOverflow,
      showHeaderAllOverflow: oldHeaderOverflow,
      headerAlign: allHeaderAlign,
      align: allAlign,
      highlightCurrentColumn,
      currentColumn,
      tableWidth,
      scrollXLoad,
      scrollYLoad,
      scrollXStore,
      scrollbarWidth,
      getColumnMapIndex,
      sortOpts
    } = $table
    // v2.0 废弃属性，保留兼容
    let allColumnHeaderOverflow = XEUtils.isBoolean(oldHeaderOverflow) ? oldHeaderOverflow : allHeaderOverflow
    // 横向滚动渲染
    if (scrollXLoad) {
      if (fixedType) {
        tableColumn = fixedColumn
      }
      tableWidth = tableColumn.reduce((previous, column) => previous + column.renderWidth, 0)
    }
    return h('div', {
      class: ['vxe-table--header-wrapper', fixedType ? `fixed--${fixedType}-wrapper` : 'body--wrapper']
    }, [
      !fixedType && scrollXLoad ? h('div', {
        class: ['vxe-body--x-space'],
        style: {
          width: `${$table.tableWidth + scrollbarWidth}px`
        }
      }) : null,
      h('table', {
        class: 'vxe-table--header',
        attrs: {
          cellspacing: 0,
          cellpadding: 0,
          border: 0
        },
        style: {
          width: tableWidth === null ? tableWidth : `${tableWidth + scrollbarWidth}px`,
          'margin-left': fixedType ? null : `${scrollXStore.leftSpaceWidth}px`
        }
      }, [
        /**
         * 列宽
         */
        h('colgroup', tableColumn.map((column, columnIndex) => {
          let isColGroup = column.children && column.children.length
          return h('col', {
            attrs: {
              name: column.id
            },
            style: {
              width: `${column.renderWidth}px`
            },
            key: columnKey || isColGroup ? column.id : columnIndex
          })
        }).concat([
          h('col', {
            style: {
              width: `${scrollbarWidth}px`
            }
          })
        ])),
        /**
         * 头部
         */
        h('thead', headerColumn.map((cols, $rowIndex) => {
          return h('tr', {
            class: ['vxe-header--row', headerRowClassName ? XEUtils.isFunction(headerRowClassName) ? headerRowClassName({ $table, $rowIndex, fixed: fixedType }) : headerRowClassName : ''],
            style: headerRowStyle ? (XEUtils.isFunction(headerRowStyle) ? headerRowStyle({ $table, $rowIndex, fixed: fixedType }) : headerRowStyle) : null
          }, cols.map((column, $columnIndex) => {
            let { showHeaderOverflow, headerAlign, align, renderWidth, headerClassName } = column
            let isColGroup = column.children && column.children.length
            let fixedHiddenColumn = fixedType ? column.fixed !== fixedType && !isColGroup : column.fixed && overflowX
            let headOverflow = XEUtils.isUndefined(showHeaderOverflow) || XEUtils.isNull(showHeaderOverflow) ? allColumnHeaderOverflow : showHeaderOverflow
            let headAlign = headerAlign || align || allHeaderAlign || allAlign
            let showEllipsis = headOverflow === 'ellipsis'
            let showTitle = headOverflow === 'title'
            let showTooltip = headOverflow === true || headOverflow === 'tooltip'
            let hasEllipsis = showTitle || showTooltip || showEllipsis
            let thOns = {}
            let isFilter = column.filters.length
            let hasFilter = isFilter && column.filters.some(item => item.checked)
            // 确保任何情况下 columnIndex 都精准指向真实列索引
            let columnIndex = getColumnMapIndex(column)
            let params = { $table, $rowIndex, column, columnIndex, $columnIndex, fixed: fixedType, isHidden: fixedHiddenColumn, hasFilter }
            // 虚拟滚动不支持动态高度
            if ((scrollXLoad || scrollYLoad) && !hasEllipsis) {
              showEllipsis = hasEllipsis = true
            }
            if (showTitle || showTooltip) {
              thOns.mouseenter = evnt => {
                if (showTitle) {
                  DomTools.updateCellTitle(evnt)
                } else if (showTooltip) {
                  $table.triggerHeaderTooltipEvent(evnt, { $table, $rowIndex, column, columnIndex, $columnIndex, fixed: fixedType })
                }
              }
            }
            if (showTooltip) {
              thOns.mouseleave = evnt => {
                if (showTooltip) {
                  $table.handleTargetLeaveEvent(evnt)
                }
              }
            }
            if (hasEllipsis && isColGroup) {
              let childWidth = 0
              let countChild = 0
              XEUtils.eachTree(column.children, item => {
                if (!item.children || !column.children.length) {
                  countChild++
                }
                childWidth += item.renderWidth
              })
              renderWidth = childWidth - countChild
            }
            if (highlightCurrentColumn || tableListeners['header-cell-click'] || sortOpts.trigger === 'cell') {
              thOns.click = evnt => $table.triggerHeaderCellClickEvent(evnt, { $table, $rowIndex, column, columnIndex, $columnIndex, fixed: fixedType, cell: evnt.currentTarget })
            }
            if (tableListeners['header-cell-dblclick']) {
              thOns.dblclick = evnt => UtilTools.emitEvent($table, 'header-cell-dblclick', [{ $table, $rowIndex, column, columnIndex, $columnIndex, fixed: fixedType, cell: evnt.currentTarget }, evnt])
            }
            return h('th', {
              class: ['vxe-header--column', column.id, {
                [`col--${headAlign}`]: headAlign,
                [`col--${column.type}`]: column.type,
                'col--last': $columnIndex === cols.length - 1,
                'col--fixed': column.fixed,
                'col--group': isColGroup,
                'col--ellipsis': hasEllipsis,
                'fixed--hidden': fixedHiddenColumn,
                'is--sortable': column.sortable,
                'is--filter': isFilter,
                'filter--active': hasFilter,
                'col--current': currentColumn === column
              }, UtilTools.getClass(headerClassName, params), UtilTools.getClass(headerCellClassName, params)],
              attrs: {
                'data-colid': column.id,
                colspan: column.colSpan,
                rowspan: column.rowSpan
              },
              style: headerCellStyle ? (XEUtils.isFunction(headerCellStyle) ? headerCellStyle(params) : headerCellStyle) : null,
              on: thOns,
              key: columnKey || isColGroup ? column.id : columnIndex
            }, [
              h('div', {
                class: ['vxe-cell', {
                  'c--title': showTitle,
                  'c--tooltip': showTooltip,
                  'c--ellipsis': showEllipsis
                }],
                style: {
                  width: hasEllipsis ? `${border ? renderWidth - 2 : renderWidth}px` : null
                }
              }, column.renderHeader(h, params)),
              /**
               * 列宽拖动
               * 固定列不允许拖动 -> 待解决 需要处理的逻辑复杂、涉及场景较大
               */
              !fixedHiddenColumn && !isColGroup && (XEUtils.isBoolean(column.resizable) ? column.resizable : resizable) ? h('div', {
                class: ['vxe-resizable', {
                  'is--line': !border
                }],
                on: {
                  mousedown: evnt => this.resizeMousedown(evnt, params)
                }
              }) : null
            ])
          }).concat(scrollbarWidth ? [
            h('th', {
              class: ['col--gutter'],
              style: {
                width: `${scrollbarWidth}px`
              }
            })
          ] : []))
        }))
      ]),
      /**
       * 其他
       */
      h('div', {
        class: ['vxe-table--repair'],
        style: {
          width: tableWidth === null ? tableWidth : `${tableWidth}px`
        }
      })
    ])
  },
  methods: {
    uploadColumn () {
      this.headerColumn = this.isGroup ? convertToRows(this.collectColumn) : [this.$parent.scrollXLoad && this.fixedType ? this.fixedColumn : this.tableColumn]
    },
    resizeMousedown (evnt, params) {
      let { column } = params
      let { $parent: $table, $el, fixedType } = this
      let { tableBody, leftContainer, rightContainer, resizeBar: resizeBarElem } = $table.$refs
      let { target: dragBtnElem, clientX: dragClientX } = evnt
      let cell = dragBtnElem.parentNode
      let dragLeft = 0
      let minInterval = 36 // 列之间的最小间距
      let tableBodyElem = tableBody.$el
      let pos = DomTools.getOffsetPos(dragBtnElem, $el)
      let dragBtnWidth = dragBtnElem.clientWidth
      let dragMinLeft = pos.left - cell.clientWidth + dragBtnWidth + minInterval
      let dragPosLeft = pos.left + Math.floor(dragBtnWidth / 2)
      let domMousemove = document.onmousemove
      let domMouseup = document.onmouseup
      let isLeftFixed = fixedType === 'left'
      let isRightFixed = fixedType === 'right'

      // 计算左右侧固定列偏移量
      let fixedOffsetWidth = 0
      if (isLeftFixed || isRightFixed) {
        let siblingProp = isLeftFixed ? 'nextElementSibling' : 'previousElementSibling'
        let tempCellElem = cell[siblingProp]
        while (tempCellElem) {
          if (DomTools.hasClass(tempCellElem, 'fixed--hidden')) {
            break
          } else if (!DomTools.hasClass(tempCellElem, 'col--group')) {
            fixedOffsetWidth += tempCellElem.offsetWidth
          }
          tempCellElem = tempCellElem[siblingProp]
        }
        if (isRightFixed && rightContainer) {
          dragPosLeft = rightContainer.offsetLeft + fixedOffsetWidth
        }
      }

      // 处理拖动事件
      let updateEvent = function (evnt) {
        evnt.stopPropagation()
        evnt.preventDefault()
        let offsetX = evnt.clientX - dragClientX
        let left = dragPosLeft + offsetX
        let scrollLeft = fixedType ? 0 : tableBodyElem.scrollLeft
        if (isLeftFixed) {
          // 左固定列（不允许超过右侧固定列、不允许超过右边距）
          left = Math.min(left, (rightContainer ? rightContainer.offsetLeft : tableBodyElem.clientWidth) - fixedOffsetWidth - minInterval)
        } else if (isRightFixed) {
          // 右侧固定列（不允许超过左侧固定列、不允许超过左边距）
          dragMinLeft = (leftContainer ? leftContainer.clientWidth : 0) + fixedOffsetWidth + minInterval
          left = Math.min(left, dragPosLeft + cell.clientWidth - minInterval)
        }
        dragLeft = Math.max(left, dragMinLeft)
        resizeBarElem.style.left = `${dragLeft - scrollLeft}px`
      }
      resizeBarElem.style.display = 'block'
      document.onmousemove = updateEvent
      document.onmouseup = function (evnt) {
        document.onmousemove = domMousemove
        document.onmouseup = domMouseup
        column.resizeWidth = column.renderWidth + (isRightFixed ? dragPosLeft - dragLeft : dragLeft - dragPosLeft)
        resizeBarElem.style.display = 'none'
        $table._lastResizeTime = Date.now()
        $table.analyColumnWidth()
        $table.recalculate(true)
        if ($table.$toolbar) {
          $table.$toolbar.updateResizable()
        }
        UtilTools.emitEvent($table, 'resizable-change', [params])
      }
      updateEvent(evnt)
    }
  }
}
