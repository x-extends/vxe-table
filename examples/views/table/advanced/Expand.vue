<template>
  <div>
    <p>通过设置 type="expand" 和 slot 可以开启展开行功能</p>

    <button class="btn" @click="$refs.xTable.toggleRowExpansion(tableData[1])">切换第二行展开</button>
    <button class="btn" @click="$refs.xTable.setExpandRow([tableData[2], tableData[3]], true)">设置第三、四行展开</button>
    <button class="btn" @click="$refs.xTable.setExpandRow(tableData, true)">设置所有行展开</button>
    <button class="btn" @click="$refs.xTable.clearExpand()">关闭所有行展开</button>
    <vxe-table
      ref="xTable"
      border
      :data.sync="tableData">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column type="expand" width="60">
        <template v-slot="{ row }">
          <ul>
            <li>
              <span>ID：</span>
              <span>{{ row.id }}</span>
            </li>
            <li>
              <span>Name：</span>
              <span>{{ row.name }}</span>
            </li>
            <li>
              <span>UpdateTime：</span>
              <span>{{ row.updateTime }}</span>
            </li>
            <li>
              <span>CreateTime：</span>
              <span>{{ row.createTime }}</span>
            </li>
          </ul>
        </template>
      </vxe-table-column>
      <vxe-table-column prop="name" label="Name"></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
      <vxe-table-column prop="age" label="Age"></vxe-table-column>
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
