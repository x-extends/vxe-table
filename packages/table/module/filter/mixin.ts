import XEUtils from 'xe-utils'
import { VxeUI } from '../../../ui'
import { toFilters, handleFieldOrColumn, getRefElem } from '../../src/util'
import { toCssUnit, triggerEvent } from '../../../ui/src/dom'
import { isEnableConf } from '../../../ui/src/utils'

import type { VxeTableConstructor, VxeTableDefines, TableReactData, TableInternalData } from '../../../../types'

const { renderer } = VxeUI

export default {
  methods: {
    /**
     * 手动弹出筛选面板
     * @param column
     */
    _openFilter (fieldOrColumn: any) {
      const column = handleFieldOrColumn(this, fieldOrColumn)
      if (column && column.filters) {
        const { elemStore } = this
        const { fixed } = column
        return this.scrollToColumn(column).then(() => {
          const headerWrapperElem = elemStore[`${fixed || 'main'}-header-wrapper`] || elemStore['main-header-wrapper']
          if (headerWrapperElem) {
            const filterBtnElem = headerWrapperElem.querySelector(`.vxe-header--column.${column.id} .vxe-cell--filter`)
            triggerEvent(filterBtnElem, 'click')
          }
        })
      }
      return this.$nextTick()
    },
    /**
     * 修改筛选条件列表
     * @param {ColumnInfo} fieldOrColumn 列
     * @param {Array} options 选项
     */
    _setFilter (fieldOrColumn: any, options: any, isUpdate: any) {
      const $xeTable = this

      const column = handleFieldOrColumn(this, fieldOrColumn)
      if (column && column.filters) {
        column.filters = toFilters(options || [])
        if (isUpdate) {
          return $xeTable.handleColumnConfirmFilter(column, new Event('click'))
        }
      }
      return $xeTable.$nextTick()
    },
    checkFilterOptions () {
      const { filterStore } = this
      filterStore.isAllSelected = filterStore.options.every((item: any) => item._checked)
      filterStore.isIndeterminate = !filterStore.isAllSelected && filterStore.options.some((item: any) => item._checked)
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
    triggerFilterEvent (evnt: any, column: any, params: any) {
      const $xeTable = this as VxeTableConstructor
      const reactData = $xeTable as unknown as TableReactData
      const internalData = $xeTable as unknown as TableInternalData

      const { filterStore } = this
      if (filterStore.column === column && filterStore.visible) {
        filterStore.visible = false
      } else {
        const { initStore, filterStore } = reactData
        const { elemStore } = internalData
        if (filterStore.column === column && filterStore.visible) {
          filterStore.visible = false
        } else {
          const el = $xeTable.$refs.refElem as HTMLDivElement
          const tableRect = el.getBoundingClientRect()
          const btnElem = evnt.currentTarget as HTMLDivElement
          const { filters, filterMultiple, filterRender } = column
          const compConf = isEnableConf(filterRender) ? renderer.get(filterRender.name) : null
          const frMethod = column.filterRecoverMethod || (compConf ? (compConf.tableFilterRecoverMethod || compConf.filterRecoverMethod) : null)
          internalData._currFilterParams = params
          Object.assign(filterStore, {
            multiple: filterMultiple,
            options: filters,
            column,
            style: null
          })
          // 复原状态
          filterStore.options.forEach((option: any) => {
            const { _checked, checked } = option
            option._checked = checked
            if (!checked && _checked !== checked) {
              if (frMethod) {
                frMethod({ option, column, $table: $xeTable })
              }
            }
          })
          this.checkFilterOptions()
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
            const filterWidth = filterWrapperElem.offsetWidth
            const filterHeadElem = filterWrapperElem.querySelector<HTMLDivElement>('.vxe-table--filter-header')
            const filterFootElem = filterWrapperElem.querySelector<HTMLDivElement>('.vxe-table--filter-footer')
            const centerWidth = filterWidth / 2
            const left = btnRect.left - tableRect.left - centerWidth
            const top = btnRect.top - tableRect.top + btnElem.clientHeight
            // 判断面板不能大于表格高度
            const maxHeight = Math.max(40, el.clientHeight - top - (filterHeadElem ? filterHeadElem.clientHeight : 0) - (filterFootElem ? filterFootElem.clientHeight : 0) - 14)
            filterStore.style = {
              top: toCssUnit(top),
              left: toCssUnit(left)
            }
            filterStore.maxHeight = maxHeight
          })
        }
        $xeTable.dispatchEvent('filter-visible', { column, field: column.field, property: column.field, filterList: $xeTable.getCheckedFilters(), visible: filterStore.visible }, evnt)
      }
    },
    handleFilterConfirmFilter (evnt: Event | null) {
      const $xeTable = this
      const reactData = $xeTable

      const { filterStore } = reactData
      filterStore.options.forEach((option: any) => {
        option.checked = option._checked
      })
      $xeTable.confirmFilterEvent(evnt)
    },
    _saveFilterPanel () {
      const $xeTable = this

      $xeTable.handleFilterConfirmFilter(null)
      return $xeTable.$nextTick()
    },
    _resetFilterPanel () {
      const $xeTable = this

      $xeTable.handleFilterResetFilter(null)
      return $xeTable.$nextTick()
    },
    _getCheckedFilters () {
      const { tableFullColumn } = this
      const filterList: any[] = []
      tableFullColumn.forEach((column: any) => {
        const { field, filters } = column
        const valueList: any[] = []
        const dataList : any[] = []
        if (filters && filters.length) {
          filters.forEach((item: any) => {
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
      const $xeTable = this
      const props = $xeTable
      const reactData = $xeTable

      const { mouseConfig } = props
      const { scrollXLoad: oldScrollXLoad, scrollYLoad: oldScrollYLoad } = reactData
      const filterOpts = $xeTable.computeFilterOpts
      const mouseOpts = $xeTable.computeMouseOpts
      const { field } = column
      const values: any[] = []
      const datas: any[] = []
      column.filters.forEach((item: any) => {
        if (item.checked) {
          values.push(item.value)
          datas.push(item.data)
        }
      })
      const filterList = this.getCheckedFilters()
      const params = { $table: this, $event: evnt, column, field, property: field, values, datas, filters: filterList, filterList }
      // 如果是服务端筛选，则跳过本地筛选处理
      if (!filterOpts.remote) {
        this.handleTableData(true)
        this.checkSelectionStatus()
      }
      if (mouseConfig && mouseOpts.area && this.handleFilterEvent) {
        $xeTable.handleFilterEvent(evnt, params)
      }
      if (evnt) {
        $xeTable.emitEvent('filter-change', params, evnt)
      }
      $xeTable.closeFilter()
      return $xeTable.updateFooter().then(() => {
        const { scrollXLoad, scrollYLoad } = this
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
     * @param {Event} evnt 事件
     */
    confirmFilterEvent (evnt: any) {
      const $xeTable = this
      const reactData = $xeTable

      const { filterStore } = reactData
      const { column } = filterStore
      $xeTable.handleColumnConfirmFilter(column, evnt)
    },
    handleClearFilter (column: any) {
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
            filterResetMethod({ options: filters, column, $table: this })
          }
        }
      }
    },
    /**
     * 重置筛选
     * 当筛选面板中的重置按钮被按下时触发
     * @param {Event} evnt 事件
     */
    handleFilterResetFilter (evnt: any) {
      this.handleClearFilter(this.filterStore.column)
      this.confirmFilterEvent(evnt)
    },
    /**
     * 清空指定列的筛选条件
     * 如果为空则清空所有列的筛选条件
     * @param {String} fieldOrColumn 列
     */
    _clearFilter (fieldOrColumn: any) {
      const { filterStore } = this
      let column
      if (fieldOrColumn) {
        column = handleFieldOrColumn(this, fieldOrColumn)
        if (column) {
          this.handleClearFilter(column)
        }
      } else {
        this.visibleColumn.forEach(this.handleClearFilter)
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
      return this.updateData()
    },
    _updateFilterOptionStatus (item: any, checked: any) {
      item._checked = checked
      item.checked = checked
      return this.$nextTick()
    }
  } as any
}
