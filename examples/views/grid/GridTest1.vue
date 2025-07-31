<template>
  <div>
    <vxe-grid v-bind="gridOptions"></vxe-grid>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import type { VxeGridProps } from '../../../types'

interface RowVO {
  id: number
  name: string
  role: string
  sex: string
  age: number
  address: string
}

const gridOptions = reactive<VxeGridProps<RowVO>>({
  border: true,
  id: 'myCustomStorage',
  toolbarConfig: {
    custom: true
  },
  customConfig: {
    storage: true
  },
  columnConfig: {
    drag: true,
    resizable: true
  },
  columnDragConfig: {
    showGuidesStatus: true,
    isCrossDrag: true,
    isSelfToChildDrag: true,
    isToChildDrag: true
  },
  columns: [
    { field: 'name', title: 'Name' },
    { field: 'role', title: 'role' },
    {
      title: '分组1',
      field: 'group1',
      children: [
        {
          title: '分组2',
          field: 'group2',
          children: [
            { field: 'sex', title: 'Sex' },
            { field: 'age', title: 'Age' }
          ]
        },
        { field: 'address', title: 'address' }
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
