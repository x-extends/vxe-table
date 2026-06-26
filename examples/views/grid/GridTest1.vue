<template>
  <div>
    <vxe-button @click="sortEvent('name', 'asc')">Name 升序</vxe-button>
    <vxe-button @click="sortEvent('name', 'desc')">Name 降序</vxe-button>
    <vxe-button @click="clearSortEvent">清除排序</vxe-button>

    <vxe-grid ref="gridRef" v-bind="gridOptions"></vxe-grid>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { VxeGridInstance, VxeGridProps, VxeTablePropTypes, VxeColumnPropTypes } from '../../../types'

interface RowVO {
  id: number
  name: string
  role: string
  sex: string
  age: number
  num: string
  num2: string
  num3: string
  address: string
}

const gridRef = ref<VxeGridInstance<RowVO>>()

const gridOptions = reactive<VxeGridProps<RowVO>>({
  border: true,
  height: 300,
  rowConfig: {
    isHover: true
  },
  columns: [
    { type: 'seq', width: 70 },
    { field: 'name', title: 'Name', sortable: true },
    { field: 'role', title: 'Role', sortable: true },
    { field: 'age', title: 'Age', sortable: true },
    { field: 'num', title: '字符串', sortable: true, sortType: 'string' },
    { field: 'num2', title: '数值', sortable: true, sortType: 'number' },
    { field: 'num3', title: '百分比', sortable: true, sortType: 'number' },
    { field: 'address', title: 'Address', sortable: true }
  ],
  data: [
    { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, num: '3.8', num2: '3.8', num3: '9%', address: 'test abc' },
    { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, num: '511', num2: '511', num3: '98.66%', address: 'Guangzhou' },
    { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, num: '12.8', num2: '12.8', num3: '25%', address: 'Shanghai' },
    { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, num: '103', num2: '103', num3: '98%', address: 'test abc' },
    { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, num: '56', num2: '56', num3: '99.71%', address: 'Shanghai' },
    { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, num: '49', num2: '49', num3: '30.1%', address: 'test abc' },
    { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, num: '400.9', num2: '400.9', num3: '30.5%', address: 'test abc' },
    { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, num: '5000', num2: '5000', num3: '100%', address: 'test abc' }
  ]
})

const sortEvent = (field: VxeColumnPropTypes.Field, order: VxeTablePropTypes.SortOrder) => {
  const $grid = gridRef.value
  if ($grid) {
    $grid.sort({ field, order })
  }
}

const clearSortEvent = () => {
  const $grid = gridRef.value
  if ($grid) {
    $grid.clearSort()
  }
}
</script>
