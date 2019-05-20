<template>
  <div>
    <p>加载 10 万行 1 万列，左右固定列，表尾合计</p>
    <p>实际渲染速度受以下影响：多选、固定列、底部合计、数据运算量、任何双向的数据或函数都会影响加载速度</p>

    <vxe-table
      ref="xTable"
      border
      resizable
      show-footer
      show-all-overflow
      show-header-all-overflow
      height="600"
      :footer-method="footerMethod"
      :footer-cell-class-name="footerCellClassName"
      :loading="loading">
      <vxe-table-column type="index" width="100" fixed="left"></vxe-table-column>
      <vxe-table-column v-for="(item, index) in tableColumn" :key="index" prop="name" :label="`column_${index}`" width="200"></vxe-table-column>
      <vxe-table-column prop="rate" label="Rate" width="200" fixed="right"></vxe-table-column>
    </vxe-table>
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
      this.$refs.xTable.reload([])
      setTimeout(() => {
        let list = window.MOCK_DATA_LIST.slice(0, 100000)
        this.tableColumn = window.MOCK_DATA_LIST.slice(0, 10000)
        this.$nextTick(() => this.$refs.xTable.reload(list))
        this.loading = false
      }, 500)
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
