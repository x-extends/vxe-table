<template>
  <div>
    <vxe-button @click="setMerge1">设置合并1</vxe-button>
    <vxe-button @click="setMerge2">设置合并2</vxe-button>
    <vxe-button status="success" @click="saveMergeData">获取合并规则</vxe-button>

    <vxe-grid  ref="gridRef" v-bind="gridOptions"></vxe-grid>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import type { VxeGridInstance, VxeGridProps } from '../../../types'

interface RowVO {
  id: number
  name: string
  role: string
  sex: string
  age: number
  attr3: number
  attr4: number
  attr5: number
  attr6: number
  address: string
}

const gridRef = ref<VxeGridInstance<RowVO>>()

const gridOptions = reactive<VxeGridProps<RowVO>>({
  border: true,
  showCustomHeader: true,
  height: 400,
  // columnConfig: {
  //   resizable: true
  // },
  mergeHeaderCells: [
    { row: 0, col: 0, rowspan: 2, colspan: 1 },
    { row: 0, col: 1, rowspan: 2, colspan: 1 },
    { row: 0, col: 2, rowspan: 1, colspan: 2 },
    { row: 0, col: 4, rowspan: 1, colspan: 2 },
    { row: 1, col: 6, rowspan: 1, colspan: 2 },
    { row: 0, col: 8, rowspan: 2, colspan: 1 }
  ],
  columns: [
    { type: 'seq', width: 70 },
    { field: 'name', title: 'Name' },
    {
      title: 'Group1',
      field: 'group1',
      headerAlign: 'center',
      children: [
        { field: 'sex', title: 'Sex' },
        { field: 'age', title: 'Age' }
      ]
    },
    {
      field: 'group3',
      title: 'Group3',
      headerAlign: 'center',
      children: [
        { field: 'attr5', title: 'Attr5' },
        { field: 'attr6', title: 'Attr6' }
      ]
    },
    {
      field: 'group6',
      title: 'Attr3',
      children: [
        { field: 'attr3', title: 'Group8', headerAlign: 'center' }
      ]
    },
    {
      field: 'group8',
      title: 'Attr4',
      children: [
        { field: 'attr4', title: 'Attr4' }
      ]
    },
    { field: 'address', title: 'Address' }
  ],
  data: [
    { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 46, attr3: 22, attr4: 100, attr5: 66, attr6: 86, address: 'Guangzhou' },
    { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 0, attr3: 0, attr4: 0, attr5: 0, attr6: 0, address: 'Shenzheng' },
    { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 0, attr3: 22, attr4: 0, attr5: 0, attr6: 0, address: 'Shanghai' },
    { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 0, attr3: 0, attr4: 0, attr5: 0, attr6: 0, address: 'Guangzhou' },
    { id: 10005, name: 'Test5', role: 'Test', sex: 'Women', age: 0, attr3: 0, attr4: 0, attr5: 0, attr6: 0, address: 'Shenzheng' },
    { id: 10006, name: 'Test6', role: 'Develop', sex: 'Man', age: 0, attr3: 0, attr4: 0, attr5: 0, attr6: 0, address: 'Guangzhou' },
    { id: 10007, name: 'Test7', role: 'Designer', sex: 'Women', age: 0, attr3: 0, attr4: 0, attr5: 0, attr6: 0, address: 'Guangzhou' },
    { id: 10008, name: 'Test8', role: 'Test', sex: 'Man', age: 0, attr3: 0, attr4: 0, attr5: 0, attr6: 0, address: 'Guangzhou' }
  ]
})

const setMerge1 = () => {
  gridOptions.mergeHeaderCells = [
    { row: 0, col: 0, rowspan: 2, colspan: 1 },
    { row: 0, col: 1, rowspan: 2, colspan: 1 },
    { row: 0, col: 2, rowspan: 1, colspan: 2 },
    { row: 0, col: 4, rowspan: 1, colspan: 2 },
    { row: 1, col: 6, rowspan: 1, colspan: 2 },
    { row: 0, col: 8, rowspan: 2, colspan: 1 }
  ]
}

const setMerge2 = () => {
  gridOptions.mergeHeaderCells = [
    { row: 0, col: 0, rowspan: 2, colspan: 1 },
    { row: 0, col: 1, rowspan: 2, colspan: 1 },
    { row: 0, col: 2, rowspan: 1, colspan: 4 },
    { row: 1, col: 6, rowspan: 1, colspan: 3 }
  ]
}

const saveMergeData = () => {
  const $grid = gridRef.value
  if ($grid) {
    const mergeList = $grid.getMergeHeaderCells()
    console.log(mergeList)
  }
}
</script>
