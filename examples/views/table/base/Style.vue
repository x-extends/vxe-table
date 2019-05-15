<template>
  <div>
    <p>行的样色、单元格样式，表头的样式、表尾的样式、全部都可以完全自定义</p>

    <vxe-table
      border
      class="mytable-style"
      :header-cell-class-name="headerCellClassName"
      :row-class-name="rowClassName"
      :cell-class-name="cellClassName"
      :data.sync="tableData">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column prop="name" label="Name"></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
      <vxe-table-column prop="age" label="Age"></vxe-table-column>
      <vxe-table-column prop="age" label="Age"></vxe-table-column>
      <vxe-table-column prop="address" label="Address" show-overflow></vxe-table-column>
    </vxe-table>
  </div>
</template>

<script>
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
    headerCellClassName ({ column, columnIndex }) {
      if (column.property === 'name') {
        return 'col-blue'
      }
    },
    rowClassName ({ row, rowIndex }) {
      if ([2, 3, 5].includes(rowIndex)) {
        return 'row-green'
      }
    },
    cellClassName ({ row, rowIndex, column, columnIndex }) {
      if (column.property === 'sex') {
        if (row.sex >= '1') {
          return 'col-red'
        } else if (row.age === 26) {
          return 'col-orange'
        }
      }
    }
  }
}
</script>

<style>
.mytable-style .vxe-body--row.row-green {
  background-color: #187;
  color: #fff;
}
.mytable-style .vxe-header--column.col-blue {
  background-color: #2db7f5;
  color: #fff;
}
.mytable-style .vxe-body--column.col-red {
  background-color: red;
  color: #fff;
}
.mytable-style .vxe-body--column.col-orange {
  background-color: #f60;
  color: #fff;
}
</style>
