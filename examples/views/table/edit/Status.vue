<template>
  <div>
    <p>设置 edit-config={trigger: 'click', mode: 'cell', showStatus: false} 关闭编辑状态显示功能</p>

    <vxe-table
      ref="xTable"
      border
      :data.sync="tableData"
      :edit-config="{trigger: 'click', mode: 'cell', showStatus: false}">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column prop="name" label="Name" :edit-render="{type: 'default'}"></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex" :edit-render="{type: 'default'}"></vxe-table-column>
      <vxe-table-column prop="date" label="Date" :edit-render="{type: 'default'}"></vxe-table-column>
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
  }
}
</script>
