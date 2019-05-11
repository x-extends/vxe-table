<template>
  <div>
    <p>使用 template 自定义模板；可以实现自定义任意内容及 html 元素</p>

    <vxe-table
      border
      :data.sync="tableData">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column prop="name" label="Name" sortable>
        <template v-slot="{ row }">
          <a href="https://github.com/xuliangzhan/vxe-table">{{ row.name }}</a>
        </template>
      </vxe-table-column>
      <vxe-table-column prop="sex" label="Sex">
        <template v-slot:header="{ column }">
          <span style="color: red;">自定义头</span>
        </template>
      </vxe-table-column>
      <vxe-table-column prop="time" label="Time"></vxe-table-column>
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
    let list = window.MOCK_DATA_LIST.slice(0, 6)
    this.tableData = list
  }
}
</script>
