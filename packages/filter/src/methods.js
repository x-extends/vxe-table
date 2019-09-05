import XEUtils from 'xe-utils/methods/xe-utils'
import GlobalConfig from '../../conf'
import { UtilTools, DomTools } from '../../tools'

export default {
  filter (field, callback) {
    let column = this.getColumnByField(field)
    let filters = column.filters
    if (callback) {
      let rest = callback(filters)
      if (XEUtils.isArray(rest)) {
        column.filters = UtilTools.getFilters(rest)
      }
    }
    return Promise.resolve(filters)
  },
  /**
   * 点击筛选事件
   */
  triggerFilterEvent (evnt, column, params) {
    let { $refs, filterStore } = this
    if (filterStore.column === column && filterStore.visible) {
      filterStore.visible = false
    } else {
      let targetElem = evnt.target
      let filterWrapper = $refs.filterWrapper
      let { top, left } = DomTools.getAbsolutePos(targetElem)
      Object.assign(filterStore, {
        args: params,
        multiple: column.filterMultiple,
        options: column.filters,
        column: column,
        style: {
          zIndex: GlobalConfig.tooltip.zIndex,
          top: `${top + targetElem.clientHeight + 6}px`,
          left: `${left}px`
        },
        visible: true
      })
      filterStore.isAllSelected = filterStore.options.every(item => item.checked)
      filterStore.isIndeterminate = !filterStore.isAllSelected && filterStore.options.some(item => item.checked)
      this.$nextTick(() => {
        let filterWrapperElem = filterWrapper.$el
        filterStore.style.top = `${top + targetElem.clientHeight + 6}px`
        filterStore.style.left = `${left - filterWrapperElem.clientWidth / 2 + 10}px`
      })
    }
  },
  // 确认筛选
  confirmFilterEvent (evnt) {
    let { visibleColumn, filterStore, remoteFilter, scrollXLoad, scrollYLoad } = this
    let { column } = filterStore
    let { property } = column
    let values = []
    let datas = []
    column.filters.forEach(item => {
      if (item.checked) {
        values.push(item.value)
        datas.push(item.data)
      }
    })
    filterStore.visible = false
    // 如果是服务端筛选，则跳过本地筛选处理
    if (!remoteFilter) {
      this.handleTableData(true)
    }
    let filterList = []
    visibleColumn.filter(column => {
      let { property, filters } = column
      let valueList = []
      let dataList = []
      if (filters && filters.length) {
        filters.forEach(item => {
          if (item.checked) {
            valueList.push(item.value)
            dataList.push(item.data)
          }
        })
        // 在 v3.0 中废弃 prop
        filterList.push({ column, property, field: property, prop: property, values: valueList, datas: dataList })
      }
    })
    // 在 v3.0 中废弃 prop
    UtilTools.emitEvent(this, 'filter-change', [{ column, property, field: property, prop: property, values, datas, filters: filterList, $table: this }])
    this.updateFooter()
    if (scrollXLoad || scrollYLoad) {
      this.clearScroll()
      if (scrollYLoad) {
        this.updateScrollYSpace()
      }
    }
    this.closeFilter()
    this.$nextTick(this.recalculate)
  },
  // 重置筛选
  resetFilterEvent (evnt) {
    this.filterStore.options.forEach(item => {
      item.checked = false
      item.data = item._data
    })
    this.confirmFilterEvent(evnt)
  },
  clearFilter (field) {
    let column = arguments.length ? this.getColumnByField(field) : null
    let filterStore = this.filterStore
    let handleClear = column => {
      let { filters } = column
      if (filters && filters.length) {
        filters.forEach(item => {
          item.checked = false
          item.data = item._data
        })
      }
    }
    if (column) {
      handleClear(column)
    } else {
      this.visibleColumn.forEach(handleClear)
    }
    if (!column || column !== filterStore.column) {
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
  }
}
