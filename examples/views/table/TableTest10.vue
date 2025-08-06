<template>
  <div>
    <vxe-button @click="reload">reload</vxe-button>
    <vxe-button @click="reset">reset</vxe-button>
    <vxe-grid v-bind="gridOptions" ref="gridRef"></vxe-grid>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { VxeGridProps } from '../../../types'

interface RowVO {
  id: number
  name: string
  role: string
  sex: string
  age: number
  address: string
}

const remoteData = [{ id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
  { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
  { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
  { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }]

const gridOptions = reactive<VxeGridProps<RowVO>>({
  border: true,
  columnConfig: {
    drag: true
  },
  editConfig: {
    mode: 'row',
    trigger: 'click',
    showStatus: true
  },
  keepSource: true,
  columnDragConfig: {
    isCrossDrag: true,
    animation: false
  },
  rowConfig: {
    keyField: 'id'
  },
  columns: [
    { field: 'name', title: 'Name', editRender: { name: 'input' } },
    { field: 'nickname', title: 'Nickname' },
    {
      title: '分组1',
      field: 'group1',
      children: [
        { field: 'role', title: 'Role' },
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
  data: remoteData
})

const gridRef = ref()
const reload = () => {
  gridRef.value.loadData(remoteData)
}
const reset = () => {
  gridRef.value.revertData()
}
</script>
