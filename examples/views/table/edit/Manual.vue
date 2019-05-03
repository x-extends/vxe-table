<template>
  <div>
    <p>设置 edit-config={trigger: 'manual', mode: 'cell'} 启用单元格编辑的功能</p>

    <vxe-table
      border
      :data.sync="tableData"
      :edit-config="{trigger: 'manual', mode: 'cell'}">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column prop="name" label="Name" edit-render></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex" edit-render></vxe-table-column>
      <vxe-table-column prop="date" label="Date" edit-render></vxe-table-column>
    </vxe-table>

    <p>设置 edit-config={trigger: 'manual', mode: 'row'} 启用行编辑的功能</p>

    <vxe-table
      border
      :data.sync="tableData"
      :edit-config="{trigger: 'manual', mode: 'row'}">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column prop="name" label="Name" edit-render></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex" edit-render></vxe-table-column>
      <vxe-table-column prop="date" label="Date" edit-render></vxe-table-column>
      <vxe-table-column prop="address" label="Address" show-overflow-tooltip></vxe-table-column>
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
    let list = window.CACHE_DATA_LIST.slice(0, 6)
    this.tableData = list
  }
}
</script>
