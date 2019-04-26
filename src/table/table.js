import XEUtils from 'xe-utils'
import TableBody from './body'
import TableHeader from './header'
import Tools from './tools'

function renderFixed (h, $table, fixedType) {
  let { tableData, tableColumn, collectColumn, isGroup, height, headerHeight, tableHeight, scrollYWidth, scrollXHeight, scrollRightToLeft, scrollLeftToRight, columnStore } = $table
  let customHeight = isNaN(height) ? 0 : parseFloat(height)
  let isRightFixed = fixedType === 'right'
  let style = {
    height: `${(customHeight || tableHeight) + headerHeight - scrollXHeight}px`,
    width: `${columnStore[`${fixedType}List`].reduce((previous, column) => previous + column.renderWidth, isRightFixed ? scrollYWidth + 1 : 0)}px`
  }
  return h('div', {
    class: [`vxe-table--fixed-${fixedType}-wrapper`, {
      'scrolling--middle': isRightFixed ? scrollRightToLeft : scrollLeftToRight
    }],
    style,
    ref: `fixedTable`
  }, [
    h('table-header', {
      props: {
        fixedType,
        tableData,
        tableColumn,
        collectColumn,
        isGroup
      },
      ref: `${fixedType}Header`
    }),
    h('table-body', {
      style: {
        top: `${headerHeight}px`
      },
      props: {
        fixedType,
        tableData,
        tableColumn,
        collectColumn,
        isGroup
      },
      ref: `${fixedType}Body`
    })
  ])
}

export default {
  name: 'VxeTable',
  props: {
    /** 基本属性 */
    // 数据
    data: Array,
    // 表格的高度
    height: String,
    // 是否带有斑马纹
    stripe: Boolean,
    // 是否带有纵向边框
    border: Boolean,
    // 是否显示默认效果
    animat: { type: Boolean, default: true },
    // 表格的尺寸
    size: String,
    // 列的宽度是否自撑开
    fit: { type: Boolean, default: true },
    // 表格是否加载中
    loading: Boolean,
    // 是否显示表头
    showHeader: { type: Boolean, default: true },
    // 是否要高亮当前选中行
    highlightCurrentRow: Boolean,
    // 鼠标移到行是否要高亮显示
    highlightHoverRow: { type: Boolean, default: true },
    // 初始化绑定动态列
    customs: Array,

    /** 高级属性 */
    // 行数据的 Key
    rowKey: [String, Number],
    // 列宽是否自动响应计算
    autoWidth: { type: Boolean, default: true }
  },
  components: {
    TableBody,
    TableHeader
  },
  provide () {
    return {
      $table: this
    }
  },
  data () {
    return {
      id: XEUtils.uniqueId(),
      // 完整列配置
      collectColumn: [],
      // 渲染的列
      tableColumn: [],
      // 渲染的数据
      tableData: [],
      // 表格宽度
      tableWidth: 0,
      // 表格高度
      tableHeight: 0,
      // 表头高度
      headerHeight: 0,
      // 是否存在纵向滚动条
      overflowY: true,
      // 是否存在横向滚动条
      overflowX: false,
      // 纵向滚动条的宽度
      scrollYWidth: 0,
      // 横向滚动条的高度
      scrollXHeight: 0,
      // 左侧固定列是否向右滚动了
      scrollLeftToRight: false,
      // 右侧固定列是否向左滚动了
      scrollRightToLeft: false,
      // 是否全选
      isAllSelected: false,
      // 多选属性，有选中且非全选状态
      isIndeterminate: false,
      // 多选属性，已选中的列
      selection: [],
      // 单选属性
      selectRow: null,
      // 当前 hover 行
      hoverRow: null,
      // 存放列相关的信息
      columnStore: {
        leftList: [],
        centerList: [],
        rightList: [],
        pxList: [],
        pxMinList: [],
        scaleList: [],
        scaleMinList: [],
        autoList: []
      }
    }
  },
  computed: {
    // 是否使用了分组表头
    isGroup () {
      return this.collectColumn.some(column => column.children && column.children.length)
    },
    visibleColumn () {
      return this.tableColumn.filter(column => column.visible)
    }
  },
  watch: {
    data (value) {
      this.reload(value)
    },
    customs (value) {
      if (!this.isUpdateCustoms) {
        this.mergeCustomColumn(value)
      }
      this.isUpdateCustoms = false
    },
    tableColumn () {
      this.analyColumnWidth()
    },
    visibleColumn () {
      this.$nextTick(() => this.computeWidth())
    }
  },
  created () {
    this.reload(this.data).then(() => {
      this.tableColumn = Tools.getColumnList(this.collectColumn)
      if (this.customs) {
        this.mergeCustomColumn(this.customs)
      }
      this.refreshColumn()
      this.$nextTick(() => this.computeWidth(true))
    })
  },
  render (h) {
    let { tableData, tableColumn, collectColumn, isGroup, animat, border, stripe, highlightHoverRow, size, columnStore } = this
    let { leftList, rightList } = columnStore
    let renderBody = [
      h('div', {
        class: ['vxe-table-hidden-column'],
        ref: 'hideColumn'
      }, this.$slots.default)
    ]
    /**
     * 渲染表头
     */
    if (this.showHeader) {
      renderBody.push(
        h('table-header', {
          ref: 'tableHeader',
          props: {
            tableData,
            tableColumn,
            collectColumn,
            isGroup
          }
        })
      )
    }
    /**
     * 渲染内容
     */
    renderBody.push(
      h('table-body', {
        ref: 'tableBody',
        props: {
          tableData,
          tableColumn,
          collectColumn,
          isGroup
        }
      })
    )
    /**
     * 渲染左侧固定列
     */
    if (leftList && leftList.length) {
      renderBody.push(
        renderFixed(h, this, 'left')
      )
    }
    /**
     * 渲染右侧固定列
     */
    if (rightList && rightList.length) {
      renderBody.push(
        renderFixed(h, this, 'right')
      )
    }
    return h('div', {
      class: ['vxe-table', size ? `t--size-${size}` : '', {
        't--animat': animat,
        't--stripe': stripe,
        't--border': border,
        't--highlight': highlightHoverRow
      }]
    }, renderBody)
  },
  methods: {
    clearSelection () {
      this.isAllSelected = false
      this.isIndeterminate = false
      this.selection = []
    },
    clearSelectRow () {
      this.selectRow = null
      this.hoverRow = null
    },
    clearSort () {
      this.tableColumn.forEach(column => {
        column.order = null
      })
      this.tableData = this.data || []
    },
    reload (data) {
      this.clearSelection()
      this.clearSelectRow()
      this.clearSort()
      this.tableData = data || []
      let rest = this.$nextTick()
      if (this.autoWidth) {
        return rest.then(this.computeWidth)
      }
      return rest
    },
    /**
     * 动态列处理
     */
    mergeCustomColumn (customColumns) {
      this.isUpdateCustoms = true
      this.tableColumn.map(column => {
        let item = customColumns.find(item => column.property && item.prop === column.property)
        column.visible = item ? !!item.visible : true
      })
      this.$emit('update:customs', this.tableColumn)
    },
    /**
     * 刷新列信息
     * 将固定的列左边、右边分别靠边
     * 如果使用了分组表头，固定列必须在左侧或者右侧
     */
    refreshColumn () {
      let isColspan
      let letIndex = 0
      let leftList = []
      let rightIndex = 0
      let centerList = []
      let rightList = []
      this.tableColumn.forEach((column, columnIndex) => {
        if (column.fixed === 'left') {
          if (!isColspan) {
            if (columnIndex - letIndex !== 0) {
              isColspan = true
            } else {
              letIndex++
            }
          }
          leftList.push(column)
        } else if (column.fixed === 'right') {
          if (!isColspan) {
            if (!rightIndex) {
              rightIndex = columnIndex
            }
            if (columnIndex - rightIndex !== 0) {
              isColspan = true
            } else {
              rightIndex++
            }
          }
          rightList.push(column)
        } else {
          centerList.push(column)
        }
      })
      this.tableColumn = leftList.concat(centerList).concat(rightList)
      Object.assign(this.columnStore, { leftList, centerList, rightList })
      if ((isColspan && this.isGroup) || (rightIndex && rightIndex !== this.tableColumn.length)) {
        throw new Error('[vxe-table] Fixed column must to the left and right sides.')
      }
    },
    /**
     * 指定列宽的列进行拆分
     */
    analyColumnWidth () {
      let pxList = []
      let pxMinList = []
      let scaleList = []
      let scaleMinList = []
      let autoList = []
      this.tableColumn.forEach(column => {
        if (column.visible) {
          if (Tools.isScale(column.width)) {
            scaleList.push(column)
          } else if (Tools.isPx(column.width)) {
            pxList.push(column)
          } else if (Tools.isScale(column.minWidth)) {
            scaleMinList.push(column)
          } else if (Tools.isPx(column.minWidth)) {
            pxMinList.push(column)
          } else {
            autoList.push(column)
          }
        }
      })
      Object.assign(this.columnStore, { pxList, pxMinList, scaleList, scaleMinList, autoList })
    },
    /**
     * 计算单元格列宽，动态分配可用剩余空间
     * 支持 width=? width=?px width=?% min-width=? min-width=?px min-width=?%
     */
    computeWidth (refull) {
      let tableBody = this.$refs.tableBody
      let tableHeader = this.$refs.tableHeader
      if (tableBody) {
        let bodyElem = tableBody.$el
        let headerElem = tableHeader ? tableHeader.$el : null
        let bodyWidth = bodyElem.clientWidth
        let tableWidth = this.autoCellWidth(headerElem, bodyElem, bodyWidth)
        if (refull === true) {
          // 初始化时需要在列计算之后再执行优化运算，达到最优显示效果
          this.$nextTick(() => {
            bodyWidth = bodyElem.clientWidth
            if (bodyWidth !== tableWidth) {
              this.autoCellWidth(headerElem, bodyElem, bodyWidth)
            }
          })
        }
      }
    },
    // 列宽计算
    autoCellWidth (headerElem, bodyElem, bodyWidth) {
      let meanWidth
      let tableWidth = 0
      let minCellWidth = 40 // 列宽最少限制 40px
      let remainWidth = bodyWidth
      let { fit, columnStore } = this
      let { pxMinList, pxList, scaleList, scaleMinList, autoList } = columnStore
      // 固定宽
      pxMinList.forEach(column => {
        let minWidth = parseInt(column.minWidth)
        tableWidth += minWidth
        column.renderWidth = minWidth
      })
      // 最小百分比
      meanWidth = remainWidth / 100
      scaleMinList.forEach(column => {
        let scaleWidth = Math.floor(parseInt(column.minWidth) * meanWidth)
        tableWidth += scaleWidth
        column.renderWidth = scaleWidth
      })
      // 固定百分比
      scaleList.forEach(column => {
        let scaleWidth = Math.floor(parseInt(column.width) * meanWidth)
        tableWidth += scaleWidth
        column.renderWidth = scaleWidth
      })
      // 最小宽
      pxList.forEach(column => {
        let width = parseInt(column.width)
        tableWidth += width
        column.renderWidth = width
      })
      remainWidth -= tableWidth
      meanWidth = remainWidth > 0 ? Math.max(Math.floor(remainWidth / (scaleMinList.length + pxMinList.length + autoList.length)), minCellWidth) : minCellWidth
      if (fit) {
        if (remainWidth > 0) {
          scaleMinList.concat(pxMinList).forEach(column => {
            tableWidth += meanWidth
            column.renderWidth += meanWidth
          })
        }
      } else {
        meanWidth = minCellWidth
      }
      // 自适应
      autoList.forEach((column, index) => {
        column.renderWidth = meanWidth
        tableWidth += meanWidth
        if (fit && index === autoList.length - 1) {
          // 如果所有列足够放的情况下，修补列之间的误差
          let odiffer = bodyWidth - tableWidth
          if (odiffer > 0) {
            column.renderWidth += odiffer
            tableWidth = bodyWidth
          }
        }
      })
      let tableHeight = bodyElem.offsetHeight
      this.scrollYWidth = bodyElem.offsetWidth - bodyWidth
      this.scrollXHeight = tableHeight - bodyElem.clientHeight - 1
      this.overflowY = this.scrollYWidth > 0
      this.overflowX = tableWidth > bodyWidth
      this.tableWidth = tableWidth
      this.tableHeight = tableHeight
      if (headerElem) {
        this.headerHeight = headerElem.offsetHeight
      }
      if (this.overflowX) {
        this.checkScrolling()
      }
      return tableWidth
    },
    /**
     * 处理固定列的显示状态
     */
    checkScrolling () {
      let { tableBody, leftBody, rightBody } = this.$refs
      let bodyElem = tableBody.$el
      if (leftBody) {
        this.scrollLeftToRight = bodyElem.scrollLeft > 0
      }
      if (rightBody) {
        this.scrollRightToLeft = bodyElem.clientWidth < bodyElem.scrollWidth - bodyElem.scrollLeft
      }
    },
    /**
     * 多选，行选中事件
     */
    checkRowEvent (evnt, { row, column }) {
      let value = event.target.checked
      let { property } = column
      if (property) {
        XEUtils.set(row, property, value)
        this.isAllSelected = this.tableData.every(item => XEUtils.get(item, property))
        this.isIndeterminate = !this.isAllSelected && this.tableData.some(item => XEUtils.get(item, property))
      } else {
        if (value) {
          this.selection.push(row)
        } else {
          XEUtils.remove(this.selection, item => item === row)
        }
        this.isAllSelected = this.tableData.length === this.selection.length
        this.isIndeterminate = !this.isAllSelected && this.selection.length
      }
    },
    /**
     * 多选，选中所有事件
     */
    checkAllEvent (evnt) {
      let value = event.target.checked
      let column = this.tableColumn.find(column => column.type === 'selection')
      let property = column.property
      if (property) {
        this.tableData.forEach(item => {
          XEUtils.set(item, property, value)
        })
      }
      this.selection = value ? Array.from(this.tableData) : []
      this.isAllSelected = value
      Tools.emitEvent(this, 'select-all', [this.selection])
    },
    /**
     * 单选，行选中事件
     */
    redioRowEvent (evnt, { row, column }) {
      this.selectRow = row
    },
    /**
     * 行 hover 事件
     */
    rowHoverEvent (evnt, { row }) {
      this.hoverRow = row
    },
    /**
     * 列点击事件
     */
    colClickEvent (evnt, params) {
      if (this.highlightCurrentRow) {
        this.selectRow = params.row
      }
      Tools.emitEvent(this, 'cell-click', [params, evnt])
    },
    /**
     * 列双击点击事件
     */
    colDblclickEvent (evnt, params) {
      Tools.emitEvent(this, 'cell-dblclick', [params, evnt])
    },
    /**
     * 排序事件
     */
    rowSortEvent (evnt, { column }, order) {
      let prop = column.property
      let rest = XEUtils.sortBy(this.tableData, prop)
      column.order = order
      this.tableData = order === 'desc' ? rest.reverse() : rest
      Tools.emitEvent(this, 'sort-change', [{ column, prop, order }])
    }
  }
}
