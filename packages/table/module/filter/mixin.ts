import XEUtils from 'xe-utils'
import { VxeUI } from '../../../ui'
import { toFilters, handleFieldOrColumn, getRefElem } from '../../src/util'
import { toCssUnit, triggerEvent, getDomNode } from '../../../ui/src/dom'
import { isEnableConf } from '../../../ui/src/utils'

import type { VxeTableConstructor, VxeTableDefines, TableReactData, TableInternalData, VxeColumnPropTypes, VxeTablePrivateMethods } from '../../../../types'

const { renderer } = VxeUI

export default {
  methods: {
    /**
     * 手动弹出筛选面板
     * @param column
     */
    _openFilter (fieldOrColumn: any) {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

      const column = handleFieldOrColumn(this, fieldOrColumn)
      if (column && column.filters) {
        const { elemStore } = this
        const { fixed } = column
        return $xeTable.scrollToColumn(column).then(() => {
          const headerWrapperElem = elemStore[`${fixed || 'main'}-header-wrapper`] || elemStore['main-header-wrapper']
          if (headerWrapperElem) {
            const filterBtnElem = headerWrapperElem.querySelector(`.vxe-header--column.${column.id} .vxe-cell--filter`)
            triggerEvent(filterBtnElem, 'click')
          }
        })
      }
      return $xeTable.$nextTick()
    },
    /**
     * 修改筛选条件列表
     * @param {ColumnInfo} fieldOrColumn 列
     * @param {Array} options 选项
     */
    _setFilter (fieldOrColumn: any, options: any, isUpdate: any) {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const reactData = $xeTable as unknown as TableReactData

      const { filterStore } = reactData
      const column = handleFieldOrColumn($xeTable, fieldOrColumn)
      if (column && column.filters) {
        column.filters = toFilters(options || [], column.id)
        if (isUpdate) {
          return $xeTable.handleColumnConfirmFilter(column, null)
        } else {
          if (filterStore.visible) {
            $xeTable.handleFilterOptions(column)
          }
        }
      }
      return $xeTable.$nextTick()
    },
    checkFilterOptions () {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const reactData = $xeTable as unknown as TableReactData

      const { filterStore } = reactData
      const { column } = filterStore
      if (column) {
        const filterOptions = (column.filters || []) as VxeTableDefines.FilterOption[]
        filterStore.isAllSelected = filterOptions.every((item) => item._checked)
        filterStore.isIndeterminate = !filterStore.isAllSelected && filterOptions.some((item) => item._checked)
      }
    },
    /**
     * 点击筛选事件
     * 当筛选图标被点击时触发
     * 更新选项是否全部状态
     * 打开筛选面板
     * @param {Event} evnt 事件
     * @param {ColumnInfo} column 列配置
     * @param {Object} params 参数
     */
    triggerFilterEvent (evnt: MouseEvent, column: VxeTableDefines.ColumnInfo, params: any) {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const $xeGrid = $xeTable.$xeGrid
      const $xeGantt = $xeTable.$xeGantt
      const reactData = $xeTable as unknown as TableReactData
      const internalData = $xeTable as unknown as TableInternalData
      const $xeGGWrapper = $xeGrid || $xeGantt

      const { initStore, filterStore } = reactData
      const { elemStore } = internalData
      if (filterStore.column === column && filterStore.visible) {
        filterStore.visible = false
      } else {
        const tableEl = $xeTable.$refs.refElem as HTMLDivElement
        const { scrollTop, scrollLeft, visibleHeight, visibleWidth } = getDomNode()
        const filterOpts = $xeTable.computeFilterOpts
        const { transfer } = filterOpts
        const tableRect = tableEl.getBoundingClientRect()
        const btnElem = evnt.currentTarget as HTMLDivElement
        const filterRender = column ? column.filterRender : null
        const compConf = filterRender && isEnableConf(filterRender) ? renderer.get(filterRender.name) : null
        $xeTable.handleFilterOptions(column)
        internalData._currFilterParams = params
        filterStore.style = null
        filterStore.visible = true
        initStore.filter = true
        $xeTable.$nextTick(() => {
          const headerScrollElem = getRefElem(elemStore['main-header-scroll'])
          if (!headerScrollElem) {
            return
          }
          const tableFilter = $xeTable.$refs.refTableFilter
          const filterWrapperElem = tableFilter ? (tableFilter as any).$el as HTMLDivElement : null
          if (!filterWrapperElem) {
            return
          }
          const btnRect = btnElem.getBoundingClientRect()
          const filterHeadElem = filterWrapperElem.querySelector<HTMLDivElement>('.vxe-table--filter-header')
          const filterFootElem = filterWrapperElem.querySelector<HTMLDivElement>('.vxe-table--filter-footer')
          const filterWidth = filterWrapperElem.offsetWidth
          const centerWidth = filterWidth / 2
          let left = 0
          let top = 0
          let maxHeight = 0
          if (transfer) {
            left = btnRect.left - centerWidth + scrollLeft
            top = btnRect.top + btnElem.clientHeight + scrollTop
            maxHeight = Math.min(Math.max(tableRect.height, Math.floor(visibleHeight / 2)), Math.max(80, visibleHeight - top - (filterHeadElem ? filterHeadElem.clientHeight : 0) - (filterFootElem ? filterFootElem.clientHeight : 0) - 28))
            if (left < 16) {
              left = 16
            } else if (left > (visibleWidth - filterWidth - 16)) {
              left = visibleWidth - filterWidth - 16
            }
          } else {
            left = btnRect.left - tableRect.left - centerWidth
            top = btnRect.top - tableRect.top + btnElem.clientHeight
            maxHeight = Math.max(40, tableEl.clientHeight - top - (filterHeadElem ? filterHeadElem.clientHeight : 0) - (filterFootElem ? filterFootElem.clientHeight : 0) - 14)
            if (left < 1) {
              left = 1
            } else if (left > (tableEl.clientWidth - filterWidth - 1)) {
              left = tableEl.clientWidth - filterWidth - 1
            }
            if ($xeGGWrapper) {
              const wrapperEl = $xeGGWrapper.$refs.refElem as HTMLDivElement
              if (wrapperEl) {
                const wrapperRect = wrapperEl.getBoundingClientRect()
                top += tableRect.top - wrapperRect.top
              }
            }
          }
          filterStore.style = {
            top: toCssUnit(top),
            left: toCssUnit(left)
          }
          // 筛选面板是自适应表格高度
          if (compConf ? !compConf.tableFilterAutoHeight : false) {
            maxHeight = 0
          }
          // 判断面板不能大于表格高度
          filterStore.maxHeight = maxHeight
        })
      }
      $xeTable.dispatchEvent('filter-visible', { column, field: column.field, property: column.field, filterList: $xeTable.getCheckedFilters(), visible: filterStore.visible }, evnt)
    },
    // （单选）筛选发生改变
    handleFilterChangeRadioOption (evnt: Event, checked: boolean, item: any) {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const reactData = $xeTable as unknown as TableReactData

      const { filterStore } = reactData
      const { column } = filterStore
      if (column) {
        const filterOptions = (column.filters || []) as VxeTableDefines.FilterOption[]
        filterOptions.forEach((option) => {
          option._checked = false
        })
        item._checked = checked
        $xeTable.checkFilterOptions()
        $xeTable.handleFilterConfirmFilter(evnt, column)
      }
    },
    // （多选）筛选发生改变
    handleFilterChangeMultipleOption (evnt: Event, checked: boolean, item: any) {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

      item._checked = checked
      $xeTable.checkFilterOptions()
    },
    // 筛选发生改变
    handleFilterChangeOption (evnt: Event, checked: boolean, item: any) {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const reactData = $xeTable as unknown as TableReactData
      const internalData = $xeTable as unknown as TableInternalData

      const { filterStore } = reactData
      const { fullColumnIdData } = internalData
      let column = filterStore.column
      if (!column) {
        const colRest = fullColumnIdData[item._colId]
        if (colRest) {
          column = colRest.column
          filterStore.column = column
        }
      }
      if (column) {
        if (column.filterMultiple) {
          $xeTable.handleFilterChangeMultipleOption(evnt, checked, item)
        } else {
          $xeTable.handleFilterChangeRadioOption(evnt, checked, item)
        }
      }
    },
    // 确认筛选
    handleFilterConfirmFilter (evnt: Event | null, column: VxeTableDefines.ColumnInfo) {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

      if (column) {
        const filterOptions = (column.filters || []) as VxeTableDefines.FilterOption[]
        filterOptions.forEach((option) => {
          option.checked = option._checked
        })
        $xeTable.confirmFilterEvent(evnt, column)
      }
    },
    _saveFilter (fieldOrColumn?: VxeColumnPropTypes.Field | VxeTableDefines.ColumnInfo | null) {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

      if (fieldOrColumn) {
        const column = handleFieldOrColumn($xeTable, fieldOrColumn)
        $xeTable.handleFilterConfirmFilter(null, column)
      }
      return $xeTable.$nextTick()
    },
    _saveFilterByEvent (evnt: Event, fieldOrColumn: VxeColumnPropTypes.Field | VxeTableDefines.ColumnInfo | null) {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

      if (fieldOrColumn) {
        const column = handleFieldOrColumn($xeTable, fieldOrColumn)
        $xeTable.handleFilterConfirmFilter(evnt, column)
      }
      return $xeTable.$nextTick()
    },
    _resetFilter (fieldOrColumn?: VxeColumnPropTypes.Field | VxeTableDefines.ColumnInfo | null) {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

      if (fieldOrColumn) {
        const column = handleFieldOrColumn($xeTable, fieldOrColumn)
        $xeTable.handleFilterResetFilter(null, column)
      }
      return $xeTable.$nextTick()
    },
    _resetFilterByEvent (evnt: Event, fieldOrColumn: VxeColumnPropTypes.Field | VxeTableDefines.ColumnInfo | null) {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

      if (fieldOrColumn) {
        const column = handleFieldOrColumn($xeTable, fieldOrColumn)
        $xeTable.handleFilterResetFilter(evnt, column)
      }
      return $xeTable.$nextTick()
    },
    _saveFilterPanel () {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const reactData = $xeTable as unknown as TableReactData

      const { filterStore } = reactData
      $xeTable.handleFilterConfirmFilter(null, filterStore.column || null)
      return $xeTable.$nextTick()
    },
    _saveFilterPanelByEvent (evnt: Event) {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const reactData = $xeTable as unknown as TableReactData

      const { filterStore } = reactData
      $xeTable.handleFilterConfirmFilter(evnt, filterStore.column || null)
      return $xeTable.$nextTick()
    },
    _resetFilterPanel () {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const reactData = $xeTable as unknown as TableReactData

      const { filterStore } = reactData
      $xeTable.handleFilterResetFilter(null, filterStore.column || null)
      return $xeTable.$nextTick()
    },
    _resetFilterPanelByEvent (evnt: Event) {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const reactData = $xeTable as unknown as TableReactData

      const { filterStore } = reactData
      $xeTable.handleFilterResetFilter(evnt, filterStore.column || null)
      return $xeTable.$nextTick()
    },
    _getCheckedFilters () {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const internalData = $xeTable as unknown as TableInternalData

      const { tableFullColumn } = internalData
      const filterList: VxeTableDefines.FilterCheckedParams[] = []
      tableFullColumn.forEach((column) => {
        const { field, filters } = column
        const filterOptions = filters || []
        const valueList: any[] = []
        const dataList: any[] = []
        if (filterOptions) {
          filterOptions.forEach((item) => {
            if (item.checked) {
              valueList.push(item.value)
              dataList.push(item.data)
            }
          })
          if (valueList.length) {
            filterList.push({ column, field, property: field, values: valueList, datas: dataList })
          }
        }
      })
      return filterList
    },
    handleColumnConfirmFilter (column: VxeTableDefines.ColumnInfo, evnt: Event | null) {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const props = $xeTable
      const reactData = $xeTable as unknown as TableReactData

      const { mouseConfig } = props
      const { scrollXLoad: oldScrollXLoad, scrollYLoad: oldScrollYLoad } = reactData
      const filterOpts = $xeTable.computeFilterOpts
      const mouseOpts = $xeTable.computeMouseOpts
      const { field, filters } = column
      const filterOptions = filters || []
      const values: any[] = []
      const datas: any[] = []
      filterOptions.forEach((item) => {
        if (item.checked) {
          values.push(item.value)
          datas.push(item.data)
        }
      })
      const filterList = $xeTable.getCheckedFilters()
      const params = { $table: $xeTable, $event: evnt as Event, column, field, property: field, values, datas, filters: filterList, filterList }
      // 如果是服务端筛选，则跳过本地筛选处理
      if (!filterOpts.remote) {
        $xeTable.handleTableData(true)
        $xeTable.checkSelectionStatus()
      }
      if (mouseConfig && mouseOpts.area && $xeTable.handleFilterEvent) {
        $xeTable.handleFilterEvent(evnt as Event, params)
      }
      if (evnt) {
        $xeTable.dispatchEvent('filter-change', params, evnt)
      }
      $xeTable.closeFilter()
      return $xeTable.updateFooter().then(() => {
        const { scrollXLoad, scrollYLoad } = reactData
        if ((oldScrollXLoad || scrollXLoad) || (oldScrollYLoad || scrollYLoad)) {
          if ((oldScrollXLoad || scrollXLoad)) {
            $xeTable.updateScrollXSpace()
          }
          if ((oldScrollYLoad || scrollYLoad)) {
            $xeTable.updateScrollYSpace()
          }
          return $xeTable.refreshScroll()
        }
      }).then(() => {
        $xeTable.updateCellAreas()
        return $xeTable.recalculate(true)
      }).then(() => {
        // 存在滚动行为未结束情况
        setTimeout(() => $xeTable.recalculate(), 50)
      })
    },
    /**
     * 确认筛选
     * 当筛选面板中的确定按钮被按下时触发
     */
    confirmFilterEvent (evnt: Event, column: VxeTableDefines.ColumnInfo) {
      const $xeTable = this

      if (column) {
        $xeTable.handleColumnConfirmFilter(column, evnt)
      }
    },
    handleClearFilter (column: any) {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

      if (column) {
        const { filters, filterRender } = column
        if (filters) {
          const compConf = isEnableConf(filterRender) ? renderer.get(filterRender.name) : null
          const filterResetMethod = column.filterResetMethod || (compConf ? (compConf.tableFilterResetMethod || compConf.filterResetMethod) : null)
          filters.forEach((item: any) => {
            item._checked = false
            item.checked = false
            if (!filterResetMethod) {
              item.data = XEUtils.clone(item.resetValue, true)
            }
          })
          if (filterResetMethod) {
            filterResetMethod({ options: filters, column, $table: $xeTable })
          }
        }
      }
    },
    /**
     * 重置筛选
     * 当筛选面板中的重置按钮被按下时触发
     * @param {Event} evnt 事件
     */
    handleFilterResetFilter (evnt: Event, column: VxeTableDefines.ColumnInfo) {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

      if (column) {
        $xeTable.handleClearFilter(column)
        $xeTable.confirmFilterEvent(evnt, column)
        if (evnt) {
          $xeTable.dispatchEvent('clear-filter', { filterList: [] }, evnt)
        }
      }
    },
    /**
     * 清空指定列的筛选条件
     * 如果为空则清空所有列的筛选条件
     * @param {String} fieldOrColumn 列
     */
    _clearFilter (fieldOrColumn: string | VxeTableDefines.ColumnInfo<any> | null | undefined) {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const reactData = $xeTable as unknown as TableReactData
      const internalData = $xeTable as unknown as TableInternalData

      const { filterStore } = reactData
      const { tableFullColumn } = internalData
      let column
      if (fieldOrColumn) {
        column = handleFieldOrColumn($xeTable, fieldOrColumn)
        if (column) {
          $xeTable.handleClearFilter(column)
        }
      } else {
        tableFullColumn.forEach($xeTable.handleClearFilter)
      }
      if (!fieldOrColumn || column !== filterStore.column) {
        Object.assign(filterStore, {
          isAllSelected: false,
          isIndeterminate: false,
          style: null,
          options: [],
          column: null,
          multiple: false,
          visible: false
        })
      }
      return $xeTable.updateData()
    },
    _updateFilterOptionStatus (item: any, checked: boolean) {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

      item._checked = checked
      item.checked = checked
      return $xeTable.$nextTick()
    }
  } as any
}
