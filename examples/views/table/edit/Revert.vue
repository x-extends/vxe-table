<template>
  <div>
    <p>调用 revert 还原数据</p>

    <button class="btn" @click="$refs.xTable.revert()">还原全部</button>
    <vxe-table
      ref="xTable"
      border
      :data.sync="tableData"
      :edit-config="{trigger: 'click', mode: 'cell'}">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column prop="name" label="Name" :edit-render="{type: 'default'}"></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex" :edit-render="{type: 'default'}"></vxe-table-column>
      <vxe-table-column prop="date" label="Date" :edit-render="{type: 'default'}"></vxe-table-column>
      <vxe-table-column label="操作">
        <template v-slot="{ row }">
          <button class="btn" @click="$refs.xTable.revert(row)">还原行</button>
        </template>
      </vxe-table-column>
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
