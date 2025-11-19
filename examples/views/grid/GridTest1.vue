<template>
  <div>
    <vxe-button status="success" @click="resultEvent">获取数据</vxe-button>
    <vxe-table
      border
      ref="tableRef"
      :row-config="rowConfig"
      :data="tableData">
      <vxe-column field="name" title="Name"></vxe-column>
      <vxe-column field="role" title="Role" drag-sort></vxe-column>
      <vxe-column field="sex" title="Sex"></vxe-column>
      <vxe-column field="age" title="Age"></vxe-column>
      <vxe-column field="address" title="Address"></vxe-column>
    </vxe-table>
  </div>
</template>

<script>
export default {
  data () {
    const tableData = [
      { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
      { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
      { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
      { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
    ]
    const rowConfig = {
      drag: true
    }
    return {
      tableData,
      rowConfig
    }
  },
  methods: {
    resultEvent () {
      const $table = this.$refs.tableRef
      if ($table) {
        const tableData = $table.getFullData()
        console.log(tableData)
      }
    }
  }
}
</script>
