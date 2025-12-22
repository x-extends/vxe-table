<template>
  <div>
    <vxe-grid v-bind="gridOptions"></vxe-grid>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
const gridOptions = reactive({
  height: 400,
  floatingFilterConfig: {
    enabled: true,
    floatingFilters: true
  },
  columns: [
    { field: 'name', title: 'Name', filterRender: { name: 'VxeInput' } },
    { field: 'sex', title: 'Sex', filterRender: { name: 'VxeInput' } },
    {
      title: '分组',
      children: [
        { field: 'age', title: 'Age', filterRender: { name: 'VxeInput' } }
      ]
    }
  ],
  data: [
    {
      id: 10001,
      name: 'Test1',
      role: 'Develop',
      sex: 'Man',
      age: 28,
      address: 'test abc'
    },
    {
      id: 10002,
      name: 'Test2',
      role: 'Test',
      sex: 'Women',
      age: 22,
      address: 'Guangzhou'
    },
    {
      id: 10003,
      name: 'Test3',
      role: 'PM',
      sex: 'Man',
      age: 32,
      address: 'Shanghai'
    },
    {
      id: 10004,
      name: 'Test4',
      role: 'Designer',
      sex: 'Women',
      age: 24,
      address: 'Shanghai'
    }
  ]
})
</script>

<style scoped></style>
