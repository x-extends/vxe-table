<template>
  <div>
    <p>加载 10 万行，左右固定列，表尾合计</p>
    <p>实际渲染速度受以下影响：固定列、底部合计、数据运算量、任何双向的数据或函数都会影响加载速度</p>

    <vxe-table
      ref="xTable"
      border
      resizable
      show-footer
      height="600"
      :footer-method="footerMethod"
      :footer-cell-class-name="footerCellClassName"
      :loading="loading"
      :optimized="{overflow: 'tooltip'}">
      <vxe-table-column type="selection" width="100" fixed="left"></vxe-table-column>
      <vxe-table-column type="index" width="100" fixed="left"></vxe-table-column>
      <vxe-table-column prop="name" label="Name" sortable width="200"></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex" width="200"></vxe-table-column>
      <vxe-table-column prop="rate" label="Rate" width="200"></vxe-table-column>
      <vxe-table-column prop="region" label="Region" width="200"></vxe-table-column>
      <vxe-table-column prop="time" label="Time" width="200"></vxe-table-column>
      <vxe-table-column prop="address" label="Address" width="300"></vxe-table-column>
      <vxe-table-column prop="updateTime" label="UpdateTime" width="200"></vxe-table-column>
      <vxe-table-column prop="createTime" label="CreateTime" width="200"></vxe-table-column>
      <vxe-table-column prop="attr1" label="Attr1" width="200"></vxe-table-column>
      <vxe-table-column prop="attr2" label="Attr2" width="200"></vxe-table-column>
      <vxe-table-column prop="attr3" label="Attr3" width="200"></vxe-table-column>
      <vxe-table-column prop="attr4" label="Attr4" width="200"></vxe-table-column>
      <vxe-table-column prop="attr5" label="Attr5" width="200"></vxe-table-column>
      <vxe-table-column prop="attr6" label="Attr6" width="200"></vxe-table-column>
      <vxe-table-column prop="attr7" label="Attr7" width="200"></vxe-table-column>
      <vxe-table-column prop="attr8" label="Attr8" width="200"></vxe-table-column>
      <vxe-table-column prop="attr9" label="Attr9" width="200"></vxe-table-column>
      <vxe-table-column prop="createTime" label="CreateTime" width="200"></vxe-table-column>
      <vxe-table-column prop="age" label="Age" width="200" fixed="right"></vxe-table-column>
    </vxe-table>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'

export default {
  data () {
    return {
      loading: false
    }
  },
  created () {
    this.loading = true
    this.$nextTick(() => {
      this.$refs.xTable.reload([])
      setTimeout(() => {
        let list = window.MOCK_DATA_LIST.slice(0, 100000)
        this.$refs.xTable.reload(list)
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
