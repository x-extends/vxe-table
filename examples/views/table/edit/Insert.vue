<template>
  <div>
    <p>调用 insert、insertAt 函数插入数据</p>

    <button class="btn" @click="$refs.xTable.insert({name: Date.now()})">在第1行插入</button>
    <button class="btn" @click="$refs.xTable.insertAt({name: Date.now()}, tableData[2])">在第3行插入</button>
    <button class="btn" @click="$refs.xTable.insertAt({name: Date.now()}, -1)">在最后行插入</button>
    <vxe-table
      ref="xTable"
      border
      :data.sync="tableData"
      :edit-config="{trigger: 'click', mode: 'cell'}">
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
    let list = window.CACHE_DATA_LIST.slice(0, 6)
    this.tableData = list
  }
}
</script>
