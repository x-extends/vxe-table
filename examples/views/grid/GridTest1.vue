<template>
  <div>
    <vxe-grid v-bind="gridOptions" class="my-rdah-grid"></vxe-grid>
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
  height: 400,
  rowConfig: {
    resizable: true
  },
  resizableConfig: {
    isDblclickAutoHeight: true
  },
  columns: [
    { type: 'seq', width: 70, rowResize: true },
    { field: 'name', title: 'Name' },
    { field: 'sex', title: 'Sex' },
    { field: 'age', title: 'Age' },
    { field: 'time', title: 'Time' },
    { field: 'address', title: 'Address', width: 300 }
  ],
  data: [
    { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
    { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou Guangzhou Guangzhou Guangzhou Guangzhou Guangzhou Guangzhou Guangzhou Guangzhou Guangzhou Guangzhou Guangzhou Guangzhou Guangzhou Guangzhou Guangzhou Guangzhou  Guangzhou' },
    { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai Shanghai Shanghai Shanghai Shanghai Shanghai Shanghai Shanghai' },
    { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' },
    { id: 10005, name: 'Test5', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' },
    { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 24, address: 'shenzhen' },
    { id: 10007, name: 'Test7', role: 'Designer', sex: 'Women', age: 24, address: 'shenzhen shenzhen shenzhen shenzhen shenzhen shenzhen shenzhen shenzhen shenzhen shenzhen' },
    { id: 10008, name: 'Test8', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
  ]
})
</script>

<style lang="scss" scoped>
.my-rdah-grid {
  // 默认行高
  --vxe-ui-table-row-height-default: 60px;
}
</style>
