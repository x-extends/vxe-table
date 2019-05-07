<template>
  <div>
    <p>设置 show-footer 和 footerMethod 自定义表尾合计</p>

    <vxe-table
      class="mytable-footer"
      border
      highlight-hover-row
      show-footer
      height="300"
      :footer-method="footerMethod"
      :data.sync="tableData">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column prop="name" label="Name" sortable></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
      <vxe-table-column prop="age" label="Age"></vxe-table-column>
      <vxe-table-column prop="rate" label="Rate"></vxe-table-column>
    </vxe-table>

    <p>还可以配合 footerCellClassName 自定义不同列颜色</p>

    <vxe-table
      class="mytable-footer"
      border
      show-footer
      height="300"
      :footer-method="footerMethod"
      :footer-cell-class-name="footerCellClassName"
      :data.sync="tableData">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column prop="name" label="Name" sortable></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
      <vxe-table-column prop="age" label="Age"></vxe-table-column>
      <vxe-table-column prop="rate" label="Rate"></vxe-table-column>
    </vxe-table>

    <p>还可以固定列</p>

    <vxe-table
      class="mytable-footer"
      border
      show-footer
      height="300"
      :footer-method="footerMethod"
      :footer-cell-class-name="footerCellClassName"
      :data.sync="tableData">
      <vxe-table-column type="index" width="60" fixed="left"></vxe-table-column>
      <vxe-table-column prop="name" label="Name" min-width="600" sortable></vxe-table-column>
      <vxe-table-column prop="age" label="Age" min-width="600"></vxe-table-column>
      <vxe-table-column prop="date" label="Date" min-width="600"></vxe-table-column>
      <vxe-table-column prop="rate" label="Rate" width="200" fixed="right"></vxe-table-column>
    </vxe-table>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'

export default {
  data () {
    return {
      tableData: []
    }
  },
  created () {
    let list = window.MOCK_DATA_LIST.slice(0, 6)
    this.tableData = list
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
          }
          if (['age', 'rate'].includes(column.property)) {
            return XEUtils.mean(data, column.property)
          }
          return '-'
        }),
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '和值'
          }
          if (['age', 'rate'].includes(column.property)) {
            return XEUtils.sum(data, column.property)
          }
          return '-'
        })
      ]
    }
  }
}
</script>

<style>
.mytable-footer .vxe-footer--column.col-blue {
  background-color: #2db7f5;
  color: #fff;
}
.mytable-footer .vxe-footer--column.col-red {
  background-color: red;
  color: #fff;
}
</style>
