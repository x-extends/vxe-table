<template>
  <div>
    <vxe-grid v-bind="gridOptions"></vxe-grid>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
const gridOptions = reactive({
  border: true,
  columnConfig: {
    drag: true
  },
  columnDragConfig: {
    isCrossDrag: true,
    isSelfToChildDrag: true
  },
  columns: [
    { field: 'name', title: 'Name' },
    { field: 'role', title: 'Role', dragSort: true },
    {
      title: '分组1',
      field: 'group1',
      children: [
        { field: 'sex', title: 'Sex' }
      ]
    },
    {
      title: '分组6',
      field: 'group6',
      children: [
        {
          title: '分组9',
          field: 'group9',
          children: [
            { field: 'age', title: 'Age' },
            { field: 'address', title: 'Address' }
          ]
        }
      ]
    }
  ],
  data: [
    { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
    { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
    { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
    { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
  ]
})

</script>
