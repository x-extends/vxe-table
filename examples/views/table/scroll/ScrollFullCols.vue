<template>
  <div>
    <p>加载 10 万行 1 万列，左右固定列，表尾合计</p>
    <p>大数据不建议使用双向绑定的 data 属性（vue 监听会大数据会短暂的卡顿），建议使用 loadData/reloadData 函数</p>
    <p>对于多选 type="selection" 当数据量海量时应该绑定 checkProp 属性渲染速度可以提升n倍以上</p>
    <p>数据超大情况下必须使用：show-all-overflow,show-header-all-overflow 参数以及调整好 optimization ：{scrollX,scrollY} 适合的参数可以更加流畅</p>

    <vxe-grid
      ref="xTable"
      border
      resizable
      show-footer
      show-all-overflow
      show-header-all-overflow
      height="600"
      :footer-method="footerMethod"
      :footer-cell-class-name="footerCellClassName"
      :loading="loading"
      :columns="tableColumn"
      :select-config="{checkProp: 'checked'}"
      :optimization ="{scrollX: {gt: 20, oSize: 4, rSize: 8}, scrollY: {gt: 500, oSize: 20, rSize: 60}}">
    </vxe-grid>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'

export default {
  data () {
    return {
      loading: false,
      tableColumn: []
    }
  },
  created () {
    this.loading = true
    this.$nextTick(() => {
      this.$refs.xTable.reloadData([])
      setTimeout(() => {
        if (this.$refs.xTable) {
          this.tableData = window.MOCK_DATA_LIST.slice(0, 100000)
          this.tableColumn = window.MOCK_COLUMN_LIST.slice(0, 10000)
          this.$refs.xTable.reloadData(this.tableData)
        }
        this.loading = false
      }, 300)
    })
  },
  methods: {
    footerCellClassName ({ rowIndex, column, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex === 0) {
          return 'col-blue'
        } else {
          return 'col-red'
        }
      }
    },
    footerMethod ({ columns, data }) {
      return [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '平均'
          } else if (column.property === 'age') {
            return `${parseInt(XEUtils.mean(data, column.property))} 岁`
          } else if (column.property === 'rate') {
            return `${parseInt(XEUtils.mean(data, column.property))} 分`
          }
          return '-'
        }),
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '和值'
          } else if (column.property === 'rate') {
            return `总分 ${XEUtils.sum(data, column.property)}`
          }
          return '-'
        }),
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '统计'
          }
          if (column.property === 'sex') {
            let rest = XEUtils.groupBy(data, column.property)
            return `男 ${rest[1] ? rest[1].length : 0} 人，女 ${rest[0] ? rest[0].length : 0} 人`
          }
          return '-'
        })
      ]
    }
  }
}
</script>
