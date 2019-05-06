<template>
  <div>
    <p>通过设置 filters 属性和 filterMethod 方法可以支持列筛选功能</p>

    <vxe-table
      border
      highlight-hover-row
      height="400"
      :data.sync="tableData">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column prop="name" label="Name" sortable :filters="[{label: 'id大于10', value: 10}, {label: 'id大于40', value: 40}]" :filterMethod="filterMethod"></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex" sortable :filters="[{label: 'Man', value: '1'}, {label: 'Woman', value: '0'}]"></vxe-table-column>
      <vxe-table-column prop="date" label="Date"></vxe-table-column>
      <vxe-table-column prop="time" label="Time" sortable></vxe-table-column>
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
    let list = window.MOCK_DATA_LIST.slice(0, 50)
    this.tableData = list
  },
  methods: {
    filterMethod ({ value, row, column }) {
      return row.id >= value
    }
  }
}
</script>
