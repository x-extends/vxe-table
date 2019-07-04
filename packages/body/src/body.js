import XEUtils from 'xe-utils'
import GlobalConfig from '../../conf'
import { UtilTools } from '../../tools'

// 处理选中位置
// function handleLocation (obj, rows, columns, row, column) {
//   let rowIndex = rows.indexOf(row)
//   let columnIndex = columns.indexOf(column)
//   obj.active = rowIndex > -1 && columnIndex > -1
//   obj.top = rowIndex === 0 && columnIndex > -1
//   obj.bottom = rowIndex === rows.length - 1 && columnIndex > -1
//   obj.left = rowIndex > -1 && columnIndex === 0
//   obj.right = rowIndex > -1 && columnIndex === columns.length - 1
// }

/**
 * 渲染列
 */
function renderColumn (h, _vm, $table, $seq, seq, fixedType, rowLevel, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex) {
  let {
    _e,
    $listeners: tableListeners,
    tableData,
    overflowX,
    scrollXLoad,
    scrollYLoad,
    // border,
    highlightCurrentRow,
    // highlightCurrentColumn,
    showOverflow: allColumnOverflow,
    // selectColumn,
    cellClassName,
    spanMethod,
    keyboardConfig = {},
    selectConfig = {},
    treeConfig = {},
    mouseConfig = {},
    editConfig,
    editRules,
    validConfig = {},
    editStore,
    validStore
  } = $table
  let {
    editRender,
    align,
    showOverflow,
    // renderWidth,
    columnKey
  } = column
  let {
    // checked,
    // selected,
    actived
    // copyed
  } = editStore
  // let isMouseSelected = mouseConfig && mouseConfig.selected
  let isMouseChecked = mouseConfig.checked
  let isKeyboardCut = keyboardConfig.isCut
  let fixedHiddenColumn = fixedType ? column.fixed !== fixedType : column.fixed && overflowX
  let cellOverflow = XEUtils.isUndefined(showOverflow) || XEUtils.isNull(showOverflow) ? allColumnOverflow : showOverflow
  let showEllipsis = cellOverflow === 'ellipsis'
  let showTitle = cellOverflow === 'title'
  let showTooltip = cellOverflow === true || cellOverflow === 'tooltip'
  let hasEllipsis = showTitle || showTooltip || showEllipsis
  let isDirty
  let tdOns = {}
  // let checkedLocat = {}
  // let checkedTLocat = {}
  // let copyedLocat = {}
  let validError = validStore.row === row && validStore.column === column
  let hasDefaultTip = editRules && (!validConfig.message || validConfig.message === 'default')
  let attrs = { 'data-index': columnIndex }
  let triggerDblclick = (editRender && editConfig && editConfig.trigger === 'dblclick')
  let params = { $table, $seq, seq, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, fixed: fixedType, isHidden: fixedHiddenColumn, level: rowLevel, data: tableData }
  // 滚动的渲染不支持动态行高
  if ((scrollXLoad || scrollYLoad) && !hasEllipsis) {
    // showEllipsis = hasEllipsis = true
    showEllipsis = true
  }
  // hover 进入事件
  if (showTooltip || tableListeners['cell-mouseenter']) {
    tdOns.mouseenter = evnt => {
      let evntParams = { $table, seq, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, fixed: fixedType, isHidden: fixedHiddenColumn, level: rowLevel, cell: evnt.currentTarget }
      // 如果配置了显示 tooltip
      if (showTooltip) {
        $table.triggerTooltipEvent(evnt, evntParams)
      }
      UtilTools.emitEvent($table, 'cell-mouseenter', [evntParams, evnt])
    }
  }
  // hover 退出事件
  if (showTooltip || tableListeners['cell-mouseleave']) {
    tdOns.mouseleave = evnt => {
      $table.clostTooltip()
      UtilTools.emitEvent($table, 'cell-mouseleave', [{ $table, seq, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, fixed: fixedType, isHidden: fixedHiddenColumn, level: rowLevel, cell: evnt.currentTarget }, evnt])
    }
  }
  // 按下事件处理
  if (mouseConfig.checked || mouseConfig.selected) {
    tdOns.mousedown = evnt => {
      $table.triggerCellMousedownEvent(evnt, { $table, seq, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, fixed: fixedType, isHidden: fixedHiddenColumn, level: rowLevel, cell: evnt.currentTarget })
    }
  }
  // 点击事件处理
  if (highlightCurrentRow ||
    tableListeners['cell-click'] ||
    mouseConfig.checked ||
    (editRender && editConfig) ||
    (selectConfig.trigger === 'row' || (column.type === 'selection' && selectConfig.trigger === 'cell')) ||
    (treeConfig.trigger === 'row' || (column.treeNode && treeConfig.trigger === 'cell'))) {
    tdOns.click = evnt => {
      $table.triggerCellClickEvent(evnt, { $table, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, fixed: fixedType, isHidden: fixedHiddenColumn, level: rowLevel, cell: evnt.currentTarget })
    }
  }
  // 双击事件处理
  if (triggerDblclick || tableListeners['cell-dblclick']) {
    tdOns.dblclick = evnt => {
      $table.triggerCellDBLClickEvent(evnt, { $table, seq, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, fixed: fixedType, isHidden: fixedHiddenColumn, level: rowLevel, cell: evnt.currentTarget })
    }
  }
  // 合并行或列
  if (spanMethod) {
    let { rowspan = 1, colspan = 1 } = spanMethod(params) || {}
    if (!rowspan || !colspan) {
      return null
    }
    attrs.rowspan = rowspan
    attrs.colspan = colspan
  }
  // 如果显示状态
  if (!fixedHiddenColumn && editConfig && editConfig.showStatus) {
    isDirty = $table.hasRowChange(row, column.property)
  }
  // 批量选中处理
  if (!fixedHiddenColumn && !fixedType) {
    // if (isMouseChecked) {
    //   handleLocation(checkedLocat, checked.rows, checked.columns, row, column)
    //   handleLocation(checkedTLocat, checked.tRows, checked.tColumns, row, column)
    // }
    // if (isKeyboardCut) {
    //   handleLocation(copyedLocat, copyed.rows, copyed.columns, row, column)
    // }
  }
  return h('td', {
    class: ['vxe-body--column', column.id, {
      [`col--${align}`]: align,
      'col--edit': editRender,
      // 'col--checked': checkedLocat.active,
      // 'col--checked-top': checkedLocat.top,
      // 'col--checked-bottom': checkedLocat.bottom,
      // 'col--checked-left': checkedLocat.left,
      // 'col--checked-right': checkedLocat.right,
      // 'col--checked-temp': checkedTLocat.active,
      // 'col--checked-temp-top': checkedTLocat.top,
      // 'col--checked-temp-bottom': checkedTLocat.bottom,
      // 'col--checked-temp-left': checkedTLocat.left,
      // 'col--checked-temp-right': checkedTLocat.right,
      // 'col--selected': isMouseSelected && editRender && selected.row === row && selected.column === column,
      // 'col--copyed': copyedLocat.active,
      // 'col--copyed-top': copyedLocat.top,
      // 'col--copyed-bottom': copyedLocat.bottom,
      // 'col--copyed-left': copyedLocat.left,
      // 'col--copyed-right': copyedLocat.right,
      'col--actived': editConfig && editRender && (actived.row === row && (actived.column === column || editConfig.mode === 'row')),
      'col--dirty': isDirty,
      'col--index': column.type === 'index',
      'col--valid-error': validError,
      'col--ellipsis': hasEllipsis,
      // 'col--current': selectColumn === column,
      'edit--visible': editRender && editRender.type === 'visible',
      'fixed--hidden': fixedHiddenColumn
    }, cellClassName ? XEUtils.isFunction(cellClassName) ? cellClassName(params) : cellClassName : ''],
    key: columnKey || columnIndex,
    attrs,
    on: tdOns
  }, allColumnOverflow && fixedHiddenColumn ? [] : [
    h('div', {
      class: ['vxe-cell', {
        'c--title': showTitle,
        'c--tooltip': showTooltip,
        'c--ellipsis': showEllipsis
      }],
      attrs: {
        title: showTitle ? UtilTools.getCellLabel(row, column, params) : null
      }
      // style: {
      //   // width: hasEllipsis ? `${border ? renderWidth - 1 : renderWidth}px` : null
      // }
    }, column.renderCell(h, params)),
    isMouseChecked ? h('div', {
      class: 'vxe-cell--checked-line'
    }) : null,
    isKeyboardCut ? h('div', {
      class: 'vxe-cell--copyed-line'
    }) : null,
    hasDefaultTip ? validError && tableData.length >= 2 ? h('div', {
      class: 'vxe-cell--valid',
      style: validStore.rule && validStore.rule.width ? {
        width: `${validStore.rule.width}px`
      } : null
    }, [
      h('span', {
        class: 'vxe-cell--valid-msg'
      }, validStore.content)
    ]) : _e() : null
    // isMouseChecked && !fixedType ? h('span', {
    //   class: 'vxe-body--column-checked-lt'
    // }) : null,
    // isMouseChecked && !fixedType ? h('span', {
    //   class: 'vxe-body--column-checked-rb'
    // }) : null,
    // isKeyboardCut && !fixedType ? h('span', {
    //   class: 'vxe-body--column-copyed-lt'
    // }) : null,
    // isKeyboardCut && !fixedType ? h('span', {
    //   class: 'vxe-body--column-copyed-rb'
    // }) : null
    // checkedLocat.bottom && checkedLocat.right ? h('span', {
    //   class: 'vxe-body--column-checked-corner',
    //   on: {
    //     mousedown (evnt) {
    //       $table.triggerCornerMousedownEvent({ $table, seq, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, fixed: fixedType, level: rowLevel, cell: evnt.target.parentNode }, evnt)
    //     }
    //   }
    // }) : null
  ])
}

function renderRows (h, _vm, $table, $seq, rowLevel, fixedType, tableData, tableColumn) {
  let {
    highlightHoverRow,
    rowClassName,
    // selectRow,
    // hoverRow,
    treeConfig,
    treeExpandeds,
    scrollYLoad,
    // overflowX,
    // columnStore,
    scrollYStore,
    editStore,
    expandeds,
    getRowMapIndex,
    getColumnMapIndex } = $table
  // let { leftList, rightList } = columnStore
  let rows = []
  tableData.forEach((row, $rowIndex) => {
    let trOn = {}
    let rowIndex = $rowIndex
    let seq = rowIndex + 1
    if (scrollYLoad) {
      seq += scrollYStore.startIndex
    }
    // 确保任何情况下 rowIndex 都精准指向真实 data 索引
    rowIndex = getRowMapIndex(row)
    // 事件绑定
    if (highlightHoverRow) {
      trOn.mouseenter = evnt => {
        // if (row !== hoverRow) {
        $table.triggerHoverEvent(evnt, { row, rowIndex })
        // }
      }
      // trOn.mouseleave = evnt => {
      //   $table.hoverRow = null
      // }
    }
    let rowId = UtilTools.getRowId($table, row, rowIndex)
    rows.push(
      h('tr', {
        class: ['vxe-body--row', {
          [`row--level-${rowLevel}`]: treeConfig,
          // 'row--current': row === selectRow,
          // 'row--hover': row === hoverRow,
          'row--new': editStore.insertList.indexOf(row) > -1
        }, rowClassName ? XEUtils.isFunction(rowClassName) ? rowClassName({ $table, seq, row, rowIndex }) : rowClassName : ''],
        attrs: {
          'data-rowid': rowId
        },
        key: rowId,
        on: trOn
      }, tableColumn.map((column, $columnIndex) => {
        let columnIndex = getColumnMapIndex(column)
        return renderColumn(h, _vm, $table, $seq, seq, fixedType, rowLevel, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex)
      }))
    )
    if (treeConfig && treeExpandeds.length) {
      // 如果是树形表格
      let rowChildren = row[treeConfig.children]
      if (rowChildren && rowChildren.length && treeExpandeds.indexOf(row) > -1) {
        rows.push.apply(rows, renderRows(h, _vm, $table, $seq ? `${$seq}.${seq}` : `${seq}`, rowLevel + 1, fixedType, rowChildren, tableColumn))
      }
    } else if (expandeds.length) {
      // 如果行被展开了
      if (expandeds.indexOf(row) > -1) {
        let column = tableColumn.find(column => column.type === 'expand')
        let columnIndex = getColumnMapIndex(column)
        if (column) {
          rows.push(
            h('tr', {
              class: ['vxe-body--expanded-row'],
              key: `expand_${rowIndex}`,
              on: trOn
            }, [
              h('td', {
                class: ['vxe-body--expanded-column'],
                attrs: {
                  colspan: tableColumn.length
                }
              }, [
                h('div', {
                  class: ['vxe-body--expanded-cell']
                }, [
                  column.renderData(h, { $table, seq, row, rowIndex, column, columnIndex, fixed: fixedType, level: rowLevel })
                ])
              ])
            ])
          )
        }
      }
    }
  })
  return rows
}

/**
 * 同步滚动条
 * scroll 方式：可以使固定列与内容保持一致的滚动效果，处理相对麻烦
 * mousewheel 方式：对于同步滚动效果就略差了，左右滚动，内容跟随即可
 */
var scrollProcessTimeout
// var updateLeftScrollingTimeput
function syncBodyScroll (scrollTop, elem1, elem2) {
  if (elem1 || elem2) {
    if (elem1) {
      elem1.onscroll = null
      elem1.scrollTop = scrollTop
    }
    if (elem2) {
      elem2.onscroll = null
      elem2.scrollTop = scrollTop
    }
    clearTimeout(scrollProcessTimeout)
    scrollProcessTimeout = setTimeout(function () {
      if (elem1) {
        elem1.onscroll = elem1._onscroll
      }
      if (elem2) {
        elem2.onscroll = elem2._onscroll
      }
    }, 100)
  }
}

export default {
  name: 'VxeTableBody',
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
  mounted () {
    let { $parent: $table, $el, $refs, fixedType } = this
    let { elemStore } = $table
    let prefix = `${fixedType || 'main'}-body-`
    elemStore[`${prefix}wrapper`] = $el
    elemStore[`${prefix}table`] = $refs.table
    elemStore[`${prefix}colgroup`] = $refs.colgroup
    elemStore[`${prefix}list`] = $refs.tbody
    elemStore[`${prefix}xSpace`] = $refs.xSpace
    elemStore[`${prefix}ySpace`] = $refs.ySpace
    this.$el.onscroll = this.scrollEvent
    this.$el._onscroll = this.scrollEvent
  },
  beforeDestroy () {
    this.$el._onscroll = null
    this.$el.onscroll = null
  },
  render (h) {
    let {
      _e,
      $parent: $table,
      fixedColumn,
      fixedType
    } = this
    let {
      // maxHeight,
      // height,
      // parentHeight,
      // loading,
      tableData,
      tableColumn,
      // headerHeight,
      // showFooter,
      showOverflow: allColumnOverflow,
      // footerHeight,
      // tableHeight,
      // tableWidth,
      // overflowY,
      // scrollXHeight,
      // scrollYWidth,
      // scrollXStore,
      scrollXLoad
      // scrollYStore
      // scrollYLoad
    } = $table
    // let customHeight = height === 'auto' ? parentHeight : XEUtils.toNumber(height)
    // let style = {}
    // if (customHeight > 0) {
    //   style.height = `${fixedType ? (customHeight > 0 ? customHeight - headerHeight - footerHeight : tableHeight) - (showFooter ? 0 : scrollXHeight) : customHeight - headerHeight - footerHeight}px`
    // } else if (maxHeight) {
    //   maxHeight = XEUtils.toNumber(maxHeight)
    //   style['max-height'] = `${fixedType ? maxHeight - headerHeight - (showFooter ? 0 : scrollXHeight) : maxHeight - headerHeight}px`
    // }
    // 如果是固定列与设置了超出隐藏
    if (fixedType && allColumnOverflow) {
      tableColumn = fixedColumn
      // tableWidth = tableColumn.reduce((previous, column) => previous + column.renderWidth, 0)
    } else if (scrollXLoad) {
      if (fixedType) {
        tableColumn = fixedColumn
      }
      // tableWidth = tableColumn.reduce((previous, column) => previous + column.renderWidth, 0)
    }
    // let tableStyle = {
    //   width: tableWidth ? `${tableWidth}px` : tableWidth,
    //   marginLeft: fixedType ? null : `${scrollXStore.leftSpaceWidth}px`
    // }
    // // 兼容火狐滚动条
    // if (overflowY && fixedType && DomTools.browse['-moz']) {
    //   tableStyle.paddingRight = `${scrollYWidth}px`
    // }
    return h('div', {
      class: ['vxe-table--body-wrapper', fixedType ? `fixed-${fixedType}--wrapper` : 'body--wrapper'],
      attrs: {
        fixed: fixedType
      },
      // style,
      on: {
        mouseleave: $table.clearHoverRow
      }
    }, [
      fixedType ? _e() : h('div', {
        class: ['vxe-body--x-space'],
        // style: {
        // width: `${$table.tableWidth}px`
        // },
        ref: 'xSpace'
      }),
      h('div', {
        class: ['vxe-body--y-space'],
        // style: {
        // height: `${scrollYStore.bodyHeight}px`
        // },
        ref: 'ySpace'
      }),
      // h('div', {
      //   class: ['vxe-body--top-space'],
      //   // style: {
      //   // height: `${scrollYStore.topSpaceHeight}px`
      //   // },
      //   ref: 'topSpace'
      // }),
      h('table', {
        class: ['vxe-table--body'],
        attrs: {
          cellspacing: 0,
          cellpadding: 0,
          border: 0
        },
        // style: tableStyle,
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
              // width: column.renderWidth
            },
            key: columnIndex
          })
        })),
        /**
         * 内容
         */
        h('tbody', {
          ref: 'tbody'
        }, renderRows(h, this, $table, '', 0, fixedType, tableData, tableColumn))
      ]),
      !fixedType && !tableData.length ? h('div', {
        class: 'vxe-table--empty-block'
      }, [
        h('span', {
          class: 'vxe-table--empty-text'
        }, $table.$slots.empty || GlobalConfig.i18n('vxe.table.emptyText'))
      ]) : null
      // scrollYLoad ? h('div', {
      //   class: ['vxe-body--bottom-space'],
      //   style: {
      //     height: `${scrollYStore.bottomSpaceHeight}px`
      //   }
      // }) : null
    ])
  },
  methods: {
    /**
     * 滚动处理
     * 如果存在列固定左侧，同步更新滚动状态
     * 如果存在列固定右侧，同步更新滚动状态
     */
    scrollEvent (evnt) {
      let { $parent: $table, fixedType } = this
      let { $refs, scrollXLoad, scrollYLoad, lastScrollTop, lastScrollLeft } = $table
      let { tableHeader, tableBody, leftBody, rightBody } = $refs
      let headerElem = tableHeader ? tableHeader.$el : null
      let bodyElem = tableBody.$el
      let leftElem = leftBody ? leftBody.$el : null
      let rightElem = rightBody ? rightBody.$el : null
      let scrollTop = bodyElem.scrollTop
      let scrollLeft = bodyElem.scrollLeft
      let isX = scrollLeft !== lastScrollLeft
      let isY = scrollTop !== lastScrollTop
      $table.lastScrollTop = scrollTop
      $table.lastScrollLeft = scrollLeft
      if (leftElem && fixedType === 'left') {
        scrollTop = leftElem.scrollTop
        syncBodyScroll(scrollTop, bodyElem, rightElem)
      } else if (rightElem && fixedType === 'right') {
        scrollTop = rightElem.scrollTop
        syncBodyScroll(scrollTop, bodyElem, leftElem)
      } else {
        if (isX && headerElem) {
          headerElem.scrollLeft = bodyElem.scrollLeft
        }
        // 缓解 IE 卡顿
        if (leftElem || rightElem) {
          // clearTimeout(updateLeftScrollingTimeput)
          // updateLeftScrollingTimeput = setTimeout($table.checkScrolling, DomTools.browse.msie ? 100 : 20)
          $table.checkScrolling()
          if (isY) {
            syncBodyScroll(scrollTop, leftElem, rightElem)
          }
        }
      }
      if (scrollXLoad && isX) {
        $table.triggerScrollXEvent(evnt)
      } else if (scrollYLoad && isY) {
        $table.triggerScrollYEvent(evnt)
      }
      UtilTools.emitEvent($table, 'scroll', [{ type: 'body', fixed: fixedType, scrollTop, scrollLeft, isX, isY, $table }, evnt])
    }
  }
}
