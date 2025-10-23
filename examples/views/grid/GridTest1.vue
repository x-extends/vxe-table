<template>
  <div>
    <span>x：</span>
    <vxe-radio-group v-model="scrollbarConfig.x.visible">
      <vxe-radio-button label="visible" content="显示"></vxe-radio-button>
      <vxe-radio-button label="hidden" content="隐藏"></vxe-radio-button>
    </vxe-radio-group>
    <span>y：</span>
    <vxe-radio-group v-model="scrollbarConfig.y.visible">
      <vxe-radio-button label="visible" content="显示"></vxe-radio-button>
      <vxe-radio-button label="hidden" content="隐藏"></vxe-radio-button>
    </vxe-radio-group>

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

const scrollbarConfig = reactive({
  x: {
    visible: 'hidden' as 'hidden' | 'visible'
  },
  y: {
    visible: 'hidden' as 'hidden' | 'visible'
  }
})

const gridOptions = reactive<VxeGridProps<RowVO>>({
  border: true,
  height: 300,
  showFooter: true,
  scrollbarConfig,
  columns: [
    { field: 'seq', type: 'seq', width: 70, fixed: 'left' },
    { field: 'name', title: 'Name', minWidth: 300 },
    { field: 'sex', title: 'Sex', minWidth: 200 },
    { field: 'age', title: 'Age', minWidth: 200 },
    { field: 'aa', title: 'aa', minWidth: 200 },
    { field: 'dd', title: 'bnb', minWidth: 200 },
    { field: 'address', title: 'Address', minWidth: 400, fixed: 'right' }
  ],
  data: [
    { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
    { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
    { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 24, address: 'Shanghai' },
    { id: 10004, name: 'Test4', role: 'PM', sex: 'Man', age: 19, address: 'Shanghai' },
    { id: 10005, name: 'Test5', role: 'Test', sex: 'Man', age: 18, address: 'Guangzhou' },
    { id: 10006, name: 'Test6', role: 'Develop', sex: 'Man', age: 32, address: 'Guangzhou' },
    { id: 10007, name: 'Test7', role: 'Test', sex: 'Women', age: 22, address: 'Shanghai' },
    { id: 10008, name: 'Test8', role: 'PM', sex: 'Women', age: 32, address: 'Shanghai' },
    { id: 10009, name: 'Test9', role: 'Develop', sex: 'Women', age: 44, address: 'Shanghai' },
    { id: 10010, name: 'Test10', role: 'Develop', sex: 'Man', age: 39, address: 'Shanghai' }
  ],
  footerData: [
    {}
  ]
})
</script>
