<template>
  <div>
    <vxe-grid v-bind="gridOptions"></vxe-grid>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
const gridOptions = reactive({
  height: 300,
  treeConfig: {
    transform: true
  },
  virtualYConfig: {
    enabled: true,
    gt: 0
  },
  virtualXConfig: {
    enabled: true
  },
  columns: [
    { type: 'checkbox', width: 50 },
    { type: 'seq', width: 70 },
    { field: 'name', treeNode: true, title: 'Name' },
    { field: 'sex', title: 'Sex' }
  ],
  data: [
    { id: 1001, name: 'Test1', sex: '111' },
    { id: 1002, name: 'Test1', sex: '111' },
    { id: 1003, name: 'Test1', sex: '111' },
    { id: 1004, name: 'Test1', sex: '111' },
    { id: 1005, name: 'Test1', sex: '111' },
    { id: 10001, name: 'Test1', sex: '111' },
    { id: 10002, parentId: 10001, name: 'Test2', sex: '222' },
    { id: 10006, parentId: 10001, name: 'Test6', sex: '222' },
    { id: 10007, parentId: 10006, name: 'Test7', sex: '111' },
    { id: 10008, parentId: 10006, name: 'Test8', sex: '111' },
    { id: 10009, parentId: 10008, name: 'Test8', sex: '111' },
    { id: 100010, parentId: 10008, name: 'Test8', sex: '111' },
    { id: 100011, parentId: 10008, name: 'Test8', sex: '111' },
    { id: 100012, parentId: 100011, name: 'Test8', sex: '111' },
    { id: 100013, parentId: 100012, name: 'Test8', sex: '111' },
    { id: 100014, parentId: 100013, name: 'Test8', sex: '111' }
  ]
})
</script>

<style scoped></style>
