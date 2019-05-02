<template>
  <div>
    <p>合并列</p>

    <vxe-table
      border
      max-height="300"
      :span-method="colspanMethod"
      :data.sync="tableData">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column prop="name" label="Name" sortable></vxe-table-column>
      <vxe-table-column prop="role" label="Role" sortable></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
      <vxe-table-column prop="date" label="Date"></vxe-table-column>
    </vxe-table>

    <p>合并行</p>

    <vxe-table
      border
      max-height="300"
      :span-method="rowspanMethod"
      :data.sync="tableData">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column prop="key" label="Key"></vxe-table-column>
      <vxe-table-column prop="language" label="Language" :filters="[{label: '中文', value: 'zh_CN'}, {label: 'English', value: 'en_US'}]"></vxe-table-column>
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
    let list = window.CACHE_DATA_LIST.slice(0, 20)
    this.tableData = list
  },
  methods: {
    colspanMethod ({ row, rowIndex, column, columnIndex }) {
      if (rowIndex % 2 === 0) {
        if (columnIndex === 2) {
          return {
            rowspan: 1,
            colspan: 2
          }
        } else if (columnIndex === 3) {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    rowspanMethod ({ row, rowIndex, column, columnIndex, data }) {
      let prevRow = data[rowIndex - 1]
      let nextRow = data[rowIndex + 1]
      if (column.property === 'key') {
        if (prevRow && prevRow.key === row.key) {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
        if (nextRow && nextRow.key === row.key) {
          return {
            rowspan: 2,
            colspan: 1
          }
        }
      }
    }
  }
}
</script>
