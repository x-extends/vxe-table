<template>
  <div>
    <vxe-grid v-bind="gridOptions"></vxe-grid>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
const gridOptions = reactive({
  border: true,
  showOverflow: true,
  height: 600,
  scrollY: {
    enabled: true,
    gt: 0
  },
  columns: [
    { type: 'seq', width: 70 },
    { field: 'name', title: 'Name' },
    { field: 'role', title: 'Role' },
    { field: 'sex', title: 'Sex' }
  ],
  data: []
})
// 模拟行数据
const loadList = (size = 200) => {
  const dataList = []
  for (let i = 0; i < size; i++) {
    dataList.push({
      id: 10000 + i,
      name: 'Test' + i,
      role: 'Developer',
      sex: '男'
    })
  }
  gridOptions.data = dataList
}
loadList(500)

</script>
