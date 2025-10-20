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
  showFooter: true,
  height: 400,
  scrollbarConfig: {
    x: {
      visible: 'visible',
      overscrollBehavior: 'contain'
    },
    y: {
      visible: 'visible',
      overscrollBehavior: 'contain'
    }
  },
  columns: [
    { type: 'seq', width: 200, fixed: 'left' },
    { field: 'name', title: 'Name', width: 400 },
    { field: 'sex', title: 'Sex', width: 400 },
    { field: 'age', title: 'Age', width: 400 },
    { field: 'time', title: 'Time', width: 400 },
    { field: 'address', title: 'Address', width: 200, fixed: 'right' }
  ],
  data: [
    { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
    { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
    { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' }
  ],
  footerData: [
    { seq: '合计', name: '222', age: '555', attr2: '555', role: '111' }
  ]
})
</script>
