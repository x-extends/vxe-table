<template>
  <div>
    <p>使用 edit slot 自定义渲染任意 Vue 组件</p>

    <vxe-table
      border
      :data.sync="tableData"
      :edit-config="{trigger: 'click', mode: 'cell'}">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column prop="name" label="Name" :edit-render="{type: 'default'}">
        <template v-slot:edit="{ row }">
          <input type="text" v-model="row.name">
        </template>
      </vxe-table-column>
      <vxe-table-column prop="age" label="Age" :edit-render="{type: 'default'}">
        <template v-slot:edit="{ row }">
          <input type="number" v-model="row.age">
        </template>
      </vxe-table-column>
      <vxe-table-column prop="date3" label="Date" :edit-render="{type: 'default'}">
        <template v-slot:edit="{ row }">
          <input type="date" v-model="row.date3">
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
