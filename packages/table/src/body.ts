import { createCommentVNode, defineComponent, h, ref, Ref, PropType, inject, nextTick, ComputedRef, onBeforeUnmount } from 'vue'
import XEUtils from 'xe-utils'
import GlobalConfig from '../../v-x-e-table/src/conf'
import { VXETable } from '../../v-x-e-table'
import { mergeBodyMethod, getRowid, getPropClass } from './util'
import { browse, updateCellTitle } from '../../tools/dom'
import { isEnableConf } from '../../tools/utils'

import { VxeTablePrivateMethods, VxeTableConstructor, VxeTableDefines, VxeTableMethods, VxeGlobalRendererHandles, VxeColumnPropTypes, SizeType } from '../../../types/all'

const renderType = 'body'

const lineOffsetSizes = {
  mini: 3,
  small: 2,
  medium: 1
}

interface XEBodyScrollElement extends HTMLDivElement {
  _onscroll: ((evnt: Event) => void) | null;
}

export default defineComponent({
  name: 'VxeTableBody',
  props: {
    tableData: Array as PropType<any[]>,
    tableColumn: Array as PropType<VxeTableDefines.ColumnInfo[]>,
    fixedColumn: Array as PropType<VxeTableDefines.ColumnInfo[]>,
    fixedType: { type: String as PropType<VxeColumnPropTypes.Fixed>, default: null }
  },
  setup (props) {
    const $xetable = inject('$xetable', {} as VxeTableConstructor & VxeTableMethods & VxeTablePrivateMethods)

    const xesize = inject('xesize', null as ComputedRef<SizeType> | null)

    const { xID, props: tableProps, context: tableContext, reactData: tableReactData, internalData: tableInternalData } = $xetable
    const { refTableHeader, refTableBody, refTableFooter, refTableLeftBody, refTableRightBody, refValidTooltip } = $xetable.getRefMaps()
    const { computeEditOpts, computeMouseOpts, computeSYOpts, computeEmptyOpts, computeKeyboardOpts, computeTooltipOpts, computeRadioOpts, computeTreeOpts, computeCheckboxOpts, computeValidOpts } = $xetable.getComputeMaps()

    const refElem = ref() as Ref<XEBodyScrollElement>
    const refBodyTable = ref() as Ref<HTMLTableElement>
    const refBodyColgroup = ref() as Ref<HTMLTableColElement>
    const refBodyTBody = ref() as Ref<HTMLTableSectionElement>
    const refBodyXSpace = ref() as Ref<HTMLDivElement>
    const refBodyYSpace = ref() as Ref<HTMLDivElement>
    const refBodyEmptyBlock = ref() as Ref<HTMLDivElement>

    const getOffsetSize = () => {
      if (xesize) {
        const vSize = xesize.value
        if (vSize) {
          return lineOffsetSizes[vSize] || 0
        }
      }
      return 0
    }

    const countTreeExpand = (prevRow: any, params: any) => {
      const treeOpts = computeTreeOpts.value
      const rowChildren = prevRow[treeOpts.children]
      let count = 1
      if ($xetable.isTreeExpandByRow(prevRow)) {
        for (let index = 0; index < rowChildren.length; index++) {
          count += countTreeExpand(rowChildren[index], params)
        }
      }
      return count
    }

    const calcTreeLine = (params: any, items: any[]) => {
      const { $rowIndex } = params
      let expandSize = 1
      if ($rowIndex) {
        expandSize = countTreeExpand(items[$rowIndex - 1], params)
      }
      return tableReactData.rowHeight * expandSize - ($rowIndex ? 1 : (12 - getOffsetSize()))
    }

    // 滚动、拖动过程中不需要触发
    const isOperateMouse = () => {
      const { delayHover } = tableProps
      const { lastScrollTime, _isResize } = tableInternalData
      return _isResize || (lastScrollTime && Date.now() < lastScrollTime + (delayHover as number))
    }

    const renderLine = (rowLevel: number, items: any[], params: any) => {
      const { column } = params
      const { treeConfig } = tableProps
      const treeOpts = computeTreeOpts.value
      const { slots, treeNode } = column
      if (slots && slots.line) {
        return $xetable.callSlot(slots.line, params)
      }
      if (treeConfig && treeNode && treeOpts.line) {
        return [
          h('div', {
            class: 'vxe-tree--line-wrapper'
          }, [
            h('div', {
              class: 'vxe-tree--line',
              style: {
                height: `${calcTreeLine(params, items)}px`,
                left: `${(rowLevel * treeOpts.indent) + (rowLevel ? 2 - getOffsetSize() : 0) + 16}px`
              }
            })
          ])
        ]
      }
      return []
    }

    /**
     * 渲染列
     */
    const renderColumn = ($seq: string, seq: number, rowid: string, fixedType: any, rowLevel: number, row: any, rowIndex: number, $rowIndex: number, _rowIndex: number, column: any, $columnIndex: number, columns: any, items: any[]) => {
      const { columnKey, height, showOverflow: allColumnOverflow, cellClassName, cellStyle, align: allAlign, spanMethod, mouseConfig, editConfig, editRules, tooltipConfig } = tableProps
      const { tableData, overflowX, scrollXLoad, scrollYLoad, currentColumn, mergeList, editStore, validStore, isAllOverflow } = tableReactData
      const { afterFullData } = tableInternalData
      const validOpts = computeValidOpts.value
      const checkboxOpts = computeCheckboxOpts.value
      const editOpts = computeEditOpts.value
      const tooltipOpts = computeTooltipOpts.value
      const { type, cellRender, editRender, align, showOverflow, className, treeNode } = column
      const { actived } = editStore
      const showAllTip = tooltipOpts.showAll
      const columnIndex = $xetable.getColumnIndex(column)
      const _columnIndex = $xetable.getVTColumnIndex(column)
      const isEdit = isEnableConf(editRender)
      let fixedHiddenColumn = fixedType ? column.fixed !== fixedType : column.fixed && overflowX
      const cellOverflow = (XEUtils.isUndefined(showOverflow) || XEUtils.isNull(showOverflow)) ? allColumnOverflow : showOverflow
      let showEllipsis = cellOverflow === 'ellipsis'
      const showTitle = cellOverflow === 'title'
      const showTooltip = cellOverflow === true || cellOverflow === 'tooltip'
      let hasEllipsis = showTitle || showTooltip || showEllipsis
      let isDirty
      const tdOns: any = {}
      const cellAlign = align || allAlign
      const hasValidError = validStore.row === row && validStore.column === column
      const showValidTip = editRules && validOpts.showMessage && (validOpts.message === 'default' ? (height || tableData.length > 1) : validOpts.message === 'inline')
      const attrs: any = { colid: column.id }
      const params: VxeTableDefines.CellRenderBodyParams = { $table: $xetable, $seq, seq, rowid, row, rowIndex, $rowIndex, _rowIndex, column, columnIndex, $columnIndex, _columnIndex, fixed: fixedType, type: renderType, isHidden: fixedHiddenColumn, level: rowLevel, visibleData: afterFullData, data: tableData, items }
      // 虚拟滚动不支持动态高度
      if ((scrollXLoad || scrollYLoad) && !hasEllipsis) {
        showEllipsis = hasEllipsis = true
      }
      // hover 进入事件
      if (showTitle || showTooltip || showAllTip || tooltipConfig) {
        tdOns.onMouseenter = (evnt: MouseEvent) => {
          if (isOperateMouse()) {
            return
          }
          if (showTitle) {
            updateCellTitle(evnt.currentTarget, column)
          } else if (showTooltip || showAllTip) {
            // 如果配置了显示 tooltip
            $xetable.triggerBodyTooltipEvent(evnt, params)
          }
          $xetable.dispatchEvent('cell-mouseenter', Object.assign({ cell: evnt.currentTarget }, params), evnt)
        }
      }
      // hover 退出事件
      if (showTooltip || showAllTip || tooltipConfig) {
        tdOns.onMouseleave = (evnt: MouseEvent) => {
          if (isOperateMouse()) {
            return
          }
          if (showTooltip || showAllTip) {
            $xetable.handleTargetLeaveEvent(evnt)
          }
          $xetable.dispatchEvent('cell-mouseleave', Object.assign({ cell: evnt.currentTarget }, params), evnt)
        }
      }
      // 按下事件处理
      if (checkboxOpts.range || mouseConfig) {
        tdOns.onMousedown = (evnt: MouseEvent) => {
          $xetable.triggerCellMousedownEvent(evnt, params)
        }
      }
      // 点击事件处理
      tdOns.onClick = (evnt: MouseEvent) => {
        $xetable.triggerCellClickEvent(evnt, params)
      }
      // 双击事件处理
      tdOns.onDblclick = (evnt: MouseEvent) => {
        $xetable.triggerCellDblclickEvent(evnt, params)
      }
      // 合并行或列
      if (mergeList.length) {
        const spanRest = mergeBodyMethod(mergeList, _rowIndex, _columnIndex)
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
      } else if (spanMethod) {
        // 自定义合并行或列的方法
        const { rowspan = 1, colspan = 1 } = spanMethod(params) || {}
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
      // 如果被合并不可隐藏
      if (fixedHiddenColumn && mergeList) {
        if (attrs.colspan > 1 || attrs.rowspan > 1) {
          fixedHiddenColumn = false
        }
      }
      // 如果编辑列开启显示状态
      if (!fixedHiddenColumn && editConfig && (editRender || cellRender) && (editOpts.showStatus || editOpts.showUpdateStatus)) {
        isDirty = $xetable.isUpdateByRow(row, column.property)
      }
      const tdVNs = []
      if (fixedHiddenColumn && (allColumnOverflow ? isAllOverflow : allColumnOverflow)) {
        tdVNs.push(
          h('div', {
            class: ['vxe-cell', {
              'c--title': showTitle,
              'c--tooltip': showTooltip,
              'c--ellipsis': showEllipsis
            }]
          })
        )
      } else {
        // 渲染单元格
        tdVNs.push(
          ...renderLine(rowLevel, items, params),
          h('div', {
            class: ['vxe-cell', {
              'c--title': showTitle,
              'c--tooltip': showTooltip,
              'c--ellipsis': showEllipsis
            }],
            title: showTitle ? $xetable.getCellLabel(row, column) : null
          }, column.renderCell(params))
        )
        if (showValidTip && hasValidError) {
          tdVNs.push(
            h('div', {
              class: 'vxe-cell--valid',
              style: validStore.rule && validStore.rule.maxWidth ? {
                width: `${validStore.rule.maxWidth}px`
              } : null
            }, [
              h('span', {
                class: 'vxe-cell--valid-msg'
              }, validStore.content)
            ])
          )
        }
      }

      return h('td', {
        class: ['vxe-body--column', column.id, {
          [`col--${cellAlign}`]: cellAlign,
          [`col--${type}`]: type,
          'col--last': $columnIndex === columns.length - 1,
          'col--tree-node': treeNode,
          'col--edit': isEdit,
          'col--ellipsis': hasEllipsis,
          'fixed--hidden': fixedHiddenColumn,
          'col--dirty': isDirty,
          'col--actived': editConfig && isEdit && (actived.row === row && (actived.column === column || editOpts.mode === 'row')),
          'col--valid-error': hasValidError,
          'col--current': currentColumn === column
        }, getPropClass(className, params), getPropClass(cellClassName, params)],
        key: columnKey ? column.id : $columnIndex,
        ...attrs,
        style: cellStyle ? (XEUtils.isFunction(cellStyle) ? cellStyle(params) : cellStyle) : null,
        ...tdOns
      }, tdVNs)
    }

    const renderRows = ($seq: string, rowLevel: any, fixedType: any, tableData: any, tableColumn: any) => {
      const { stripe, rowKey, highlightHoverRow, rowClassName, rowStyle, showOverflow: allColumnOverflow, editConfig, treeConfig } = tableProps
      const { hasFixedColumn, treeExpandeds, scrollYLoad, editStore, rowExpandeds, expandColumn, selectRow } = tableReactData
      const { scrollYStore } = tableInternalData
      const checkboxOpts = computeCheckboxOpts.value
      const radioOpts = computeRadioOpts.value
      const treeOpts = computeTreeOpts.value
      const editOpts = computeEditOpts.value
      const rows: any[] = []
      tableData.forEach((row: any, $rowIndex: any) => {
        const trOn: any = {}
        let rowIndex = $rowIndex
        let seq = rowIndex + 1
        if (scrollYLoad) {
          seq += scrollYStore.startIndex
        }
        const _rowIndex = $xetable.getVTRowIndex(row)
        // 确保任何情况下 rowIndex 都精准指向真实 data 索引
        rowIndex = $xetable.getRowIndex(row)
        // 事件绑定
        if (highlightHoverRow) {
          trOn.onMouseenter = (evnt: any) => {
            if (isOperateMouse()) {
              return
            }
            $xetable.triggerHoverEvent(evnt, { row, rowIndex })
          }
          trOn.onMouseleave = () => {
            if (isOperateMouse()) {
              return
            }
            $xetable.clearHoverRow()
          }
        }
        const rowid = getRowid($xetable, row)
        const params = { $table: $xetable, $seq, seq, rowid, fixed: fixedType, type: renderType, level: rowLevel, row, rowIndex, $rowIndex, _rowIndex }
        let isNewRow = false
        if (editConfig) {
          isNewRow = $xetable.findRowIndexOf(editStore.insertList, row) > -1
        }
        rows.push(
          h('tr', {
            class: ['vxe-body--row', {
              'row--stripe': stripe && ($xetable.getVTRowIndex(row) + 1) % 2 === 0,
              'is--new': isNewRow,
              'row--new': isNewRow && (editOpts.showStatus || editOpts.showInsertStatus),
              'row--radio': radioOpts.highlight && selectRow === row,
              'row--checked': checkboxOpts.highlight && $xetable.isCheckedByCheckboxRow(row)
            }, rowClassName ? (XEUtils.isFunction(rowClassName) ? rowClassName(params) : rowClassName) : ''],
            rowid: rowid,
            style: rowStyle ? (XEUtils.isFunction(rowStyle) ? rowStyle(params) : rowStyle) : null,
            key: rowKey || treeConfig ? rowid : $rowIndex,
            ...trOn
          }, tableColumn.map((column: any, $columnIndex: any) => {
            return renderColumn($seq, seq, rowid, fixedType, rowLevel, row, rowIndex, $rowIndex, _rowIndex, column, $columnIndex, tableColumn, tableData)
          }))
        )
        // 如果行被展开了
        if (expandColumn && rowExpandeds.length && $xetable.findRowIndexOf(rowExpandeds, row) > -1) {
          let cellStyle
          if (treeConfig) {
            cellStyle = {
              paddingLeft: `${(rowLevel * treeOpts.indent) + 30}px`
            }
          }
          const { showOverflow } = expandColumn
          const hasEllipsis = (XEUtils.isUndefined(showOverflow) || XEUtils.isNull(showOverflow)) ? allColumnOverflow : showOverflow
          const expandParams = { $table: $xetable, $seq, seq, column: expandColumn, fixed: fixedType, type: renderType, level: rowLevel, row, rowIndex, $rowIndex, _rowIndex }
          rows.push(
            h('tr', {
              class: 'vxe-body--expanded-row',
              key: `expand_${rowid}`,
              style: rowStyle ? (XEUtils.isFunction(rowStyle) ? rowStyle(expandParams) : rowStyle) : null,
              ...trOn
            }, [
              h('td', {
                class: ['vxe-body--expanded-column', {
                  'fixed--hidden': fixedType && !hasFixedColumn,
                  'col--ellipsis': hasEllipsis
                }],
                colspan: tableColumn.length
              }, [
                h('div', {
                  class: 'vxe-body--expanded-cell',
                  style: cellStyle
                }, [
                  expandColumn.renderData(expandParams)
                ])
              ])
            ])
          )
        }
        // 如果是树形表格
        if (treeConfig && treeExpandeds.length) {
          const rowChildren = row[treeOpts.children]
          if (rowChildren && rowChildren.length && $xetable.findRowIndexOf(treeExpandeds, row) > -1) {
            rows.push(...renderRows($seq ? `${$seq}.${seq}` : `${seq}`, rowLevel + 1, fixedType, rowChildren, tableColumn))
          }
        }
      })
      return rows
    }

    /**
     * 同步滚动条
     */
    let scrollProcessTimeout: any
    const syncBodyScroll = (scrollTop: number, elem1?: XEBodyScrollElement | null, elem2?: XEBodyScrollElement | null) => {
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
        }, 300)
      }
    }

    /**
     * 滚动处理
     * 如果存在列固定左侧，同步更新滚动状态
     * 如果存在列固定右侧，同步更新滚动状态
     */
    const scrollEvent = (evnt: Event) => {
      const { fixedType } = props
      const { highlightHoverRow } = tableProps
      const { scrollXLoad, scrollYLoad } = tableReactData
      const { lastScrollTop, lastScrollLeft } = tableInternalData
      const tableHeader = refTableHeader.value
      const tableBody = refTableBody.value
      const tableFooter = refTableFooter.value
      const leftBody = refTableLeftBody.value
      const rightBody = refTableRightBody.value
      const validTip = refValidTooltip.value
      const scrollBodyElem = refElem.value
      const headerElem = tableHeader ? tableHeader.$el as HTMLDivElement : null
      const footerElem = tableFooter ? tableFooter.$el as HTMLDivElement : null
      const bodyElem = tableBody.$el as XEBodyScrollElement
      const leftElem = leftBody ? leftBody.$el as XEBodyScrollElement : null
      const rightElem = rightBody ? rightBody.$el as XEBodyScrollElement : null
      let scrollTop = scrollBodyElem.scrollTop
      const scrollLeft = bodyElem.scrollLeft
      const isRollX = scrollLeft !== lastScrollLeft
      const isRollY = scrollTop !== lastScrollTop
      tableInternalData.lastScrollTop = scrollTop
      tableInternalData.lastScrollLeft = scrollLeft
      tableInternalData.lastScrollTime = Date.now()
      if (highlightHoverRow) {
        $xetable.clearHoverRow()
      }
      if (leftElem && fixedType === 'left') {
        scrollTop = leftElem.scrollTop
        syncBodyScroll(scrollTop, bodyElem, rightElem)
      } else if (rightElem && fixedType === 'right') {
        scrollTop = rightElem.scrollTop
        syncBodyScroll(scrollTop, bodyElem, leftElem)
      } else {
        if (isRollX) {
          if (headerElem) {
            headerElem.scrollLeft = bodyElem.scrollLeft
          }
          if (footerElem) {
            footerElem.scrollLeft = bodyElem.scrollLeft
          }
        }
        if (leftElem || rightElem) {
          $xetable.checkScrolling()
          if (isRollY) {
            syncBodyScroll(scrollTop, leftElem, rightElem)
          }
        }
      }
      if (scrollXLoad && isRollX) {
        $xetable.triggerScrollXEvent(evnt)
      }
      if (scrollYLoad && isRollY) {
        $xetable.triggerScrollYEvent(evnt)
      }
      if (isRollX && validTip && validTip.reactData.visible) {
        validTip.updatePlacement()
      }
      $xetable.dispatchEvent('scroll', { type: renderType, fixed: fixedType, scrollTop, scrollLeft, isX: isRollX, isY: isRollY }, evnt)
    }

    let wheelTime: any
    let wheelYSize = 0
    let wheelYInterval = 0
    let wheelYTotal = 0
    let isPrevWheelTop = false

    const handleWheel = (evnt: WheelEvent, isTopWheel: boolean, deltaTop: number, isRollX: boolean, isRollY: boolean) => {
      const tableBody = refTableBody.value
      const leftBody = refTableLeftBody.value
      const rightBody = refTableRightBody.value
      const leftElem = leftBody ? leftBody.$el as HTMLDivElement : null
      const rightElem = rightBody ? rightBody.$el as HTMLDivElement : null
      const bodyElem = tableBody.$el as HTMLDivElement
      const remainSize = isPrevWheelTop === isTopWheel ? Math.max(0, wheelYSize - wheelYTotal) : 0
      isPrevWheelTop = isTopWheel
      wheelYSize = Math.abs(isTopWheel ? deltaTop - remainSize : deltaTop + remainSize)
      wheelYInterval = 0
      wheelYTotal = 0
      clearTimeout(wheelTime)
      const handleSmooth = () => {
        if (wheelYTotal < wheelYSize) {
          const { fixedType } = props
          wheelYInterval = Math.max(5, Math.floor(wheelYInterval * 1.5))
          wheelYTotal = wheelYTotal + wheelYInterval
          if (wheelYTotal > wheelYSize) {
            wheelYInterval = wheelYInterval - (wheelYTotal - wheelYSize)
          }
          const { scrollTop, clientHeight, scrollHeight } = bodyElem
          const targerTop = scrollTop + (wheelYInterval * (isTopWheel ? -1 : 1))
          bodyElem.scrollTop = targerTop
          if (leftElem) {
            leftElem.scrollTop = targerTop
          }
          if (rightElem) {
            rightElem.scrollTop = targerTop
          }
          if (isTopWheel ? targerTop < scrollHeight - clientHeight : targerTop >= 0) {
            wheelTime = setTimeout(handleSmooth, 10)
          }
          $xetable.dispatchEvent('scroll', { type: renderType, fixed: fixedType, scrollTop: bodyElem.scrollTop, scrollLeft: bodyElem.scrollLeft, isX: isRollX, isY: isRollY }, evnt)
        }
      }
      handleSmooth()
    }

    /**
     * 滚轮处理
     */
    const wheelEvent = (evnt: WheelEvent) => {
      const { deltaY, deltaX } = evnt
      const { highlightHoverRow } = tableProps
      const { scrollYLoad } = tableReactData
      const { lastScrollTop, lastScrollLeft } = tableInternalData
      const tableBody = refTableBody.value
      const scrollBodyElem = refElem.value
      const bodyElem = tableBody.$el as HTMLDivElement

      const deltaTop = browse.firefox ? deltaY * 40 : deltaY
      const deltaLeft = browse.firefox ? deltaX * 40 : deltaX
      const isTopWheel = deltaTop < 0
      // 如果滚动位置已经是顶部或底部，则不需要触发
      if (isTopWheel ? scrollBodyElem.scrollTop <= 0 : scrollBodyElem.scrollTop >= scrollBodyElem.scrollHeight - scrollBodyElem.clientHeight) {
        return
      }

      const scrollTop = scrollBodyElem.scrollTop + deltaTop
      const scrollLeft = bodyElem.scrollLeft + deltaLeft
      const isRollX = scrollLeft !== lastScrollLeft
      const isRollY = scrollTop !== lastScrollTop

      // 用于鼠标纵向滚轮处理
      if (isRollY) {
        evnt.preventDefault()
        tableInternalData.lastScrollTop = scrollTop
        tableInternalData.lastScrollLeft = scrollLeft
        tableInternalData.lastScrollTime = Date.now()
        if (highlightHoverRow) {
          $xetable.clearHoverRow()
        }
        handleWheel(evnt, isTopWheel, deltaTop, isRollX, isRollY)
        if (scrollYLoad) {
          $xetable.triggerScrollYEvent(evnt)
        }
      }
    }

    nextTick(() => {
      const { fixedType } = props
      const { elemStore } = tableInternalData
      const prefix = `${fixedType || 'main'}-body-`
      const el = refElem.value
      elemStore[`${prefix}wrapper`] = refElem.value
      elemStore[`${prefix}table`] = refBodyTable.value
      elemStore[`${prefix}colgroup`] = refBodyColgroup.value
      elemStore[`${prefix}list`] = refBodyTBody.value
      elemStore[`${prefix}xSpace`] = refBodyXSpace.value
      elemStore[`${prefix}ySpace`] = refBodyYSpace.value
      elemStore[`${prefix}emptyBlock`] = refBodyEmptyBlock.value
      el.onscroll = scrollEvent
      el._onscroll = scrollEvent
    })

    onBeforeUnmount(() => {
      const el = refElem.value
      clearTimeout(wheelTime)
      el._onscroll = null
      el.onscroll = null
    })

    const renderVN = () => {
      let { fixedColumn, fixedType, tableColumn } = props
      const { keyboardConfig, showOverflow: allColumnOverflow, spanMethod, mouseConfig } = tableProps
      const { tableData, mergeList, scrollXLoad, scrollYLoad, isAllOverflow } = tableReactData
      const { slots } = tableContext
      const sYOpts = computeSYOpts.value
      const emptyOpts = computeEmptyOpts.value
      const keyboardOpts = computeKeyboardOpts.value
      const mouseOpts = computeMouseOpts.value
      // 如果是使用优化模式
      if (fixedType) {
        if ((!mergeList.length && !spanMethod && !(keyboardConfig && keyboardOpts.isMerge)) && (scrollXLoad || scrollYLoad || (allColumnOverflow ? isAllOverflow : allColumnOverflow))) {
          tableColumn = fixedColumn
        }
      }
      let emptyContent: string | VxeGlobalRendererHandles.RenderResult
      if (slots.empty) {
        emptyContent = $xetable.callSlot(slots.empty, { $table: $xetable })
      } else {
        const compConf = emptyOpts.name ? VXETable.renderer.get(emptyOpts.name) : null
        const renderEmpty = compConf ? compConf.renderEmpty : null
        if (renderEmpty) {
          emptyContent = renderEmpty(emptyOpts, { $table: $xetable })
        } else {
          emptyContent = tableProps.emptyText || GlobalConfig.i18n('vxe.table.emptyText')
        }
      }
      return h('div', {
        ref: refElem,
        class: ['vxe-table--body-wrapper', fixedType ? `fixed-${fixedType}--wrapper` : 'body--wrapper'],
        xid: xID,
        ...(scrollYLoad && sYOpts.mode === 'wheel' ? { onWheel: wheelEvent } : {})
      }, [
        fixedType ? createCommentVNode() : h('div', {
          ref: refBodyXSpace,
          class: 'vxe-body--x-space'
        }),
        h('div', {
          ref: refBodyYSpace,
          class: 'vxe-body--y-space'
        }),
        h('table', {
          ref: refBodyTable,
          class: 'vxe-table--body',
          xid: xID,
          cellspacing: 0,
          cellpadding: 0,
          border: 0
        }, [
          /**
           * 列宽
           */
          h('colgroup', {
            ref: refBodyColgroup
          }, (tableColumn as any[]).map((column, $columnIndex) => {
            return h('col', {
              name: column.id,
              key: $columnIndex
            })
          })),
          /**
           * 内容
           */
          h('tbody', {
            ref: refBodyTBody
          }, renderRows('', 0, fixedType, tableData, tableColumn))
        ]),
        h('div', {
          class: 'vxe-table--checkbox-range'
        }),
        mouseConfig && mouseOpts.area ? h('div', {
          class: 'vxe-table--cell-area'
        }, [
          h('span', {
            class: 'vxe-table--cell-main-area'
          }, mouseOpts.extension ? [
            h('span', {
              class: 'vxe-table--cell-main-area-btn',
              onMousedown (evnt: any) {
                $xetable.triggerCellExtendMousedownEvent(evnt, { $table: $xetable, fixed: fixedType, type: renderType })
              }
            })
          ] : []),
          h('span', {
            class: 'vxe-table--cell-copy-area'
          }),
          h('span', {
            class: 'vxe-table--cell-extend-area'
          }),
          h('span', {
            class: 'vxe-table--cell-multi-area'
          }),
          h('span', {
            class: 'vxe-table--cell-active-area'
          })
        ]) : null,
        !fixedType ? h('div', {
          class: 'vxe-table--empty-block',
          ref: refBodyEmptyBlock
        }, [
          h('div', {
            class: 'vxe-table--empty-content'
          }, emptyContent)
        ]) : null
      ])
    }

    return renderVN
  }
})
