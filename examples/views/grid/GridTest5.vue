<template>
  <div>
    X：<vxe-radio-group v-model="scrollbarConfig.xConfig.position">
      <vxe-radio-button checked-value="top" content="top"></vxe-radio-button>
      <vxe-radio-button checked-value="bottom" content="bottom"></vxe-radio-button>
    </vxe-radio-group>
    Y：<vxe-radio-group v-model="scrollbarConfig.yConfig.position">
      <vxe-radio-button checked-value="left" content="left"></vxe-radio-button>
      <vxe-radio-button checked-value="right" content="right"></vxe-radio-button>
    </vxe-radio-group>
    边距：<vxe-switch v-model="scrollbarConfig.padding"></vxe-switch>

    <vxe-grid v-bind="gridOptions"></vxe-grid>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { VxeGridProps, VxeTablePropTypes, VxeWithRequired } from '../../../types'

interface RowVO {
  id: number
  name: string
  role: string
  sex: string
  age: number
  address: string
}

const scrollbarConfig = reactive<VxeWithRequired<VxeTablePropTypes.ScrollbarConfig, 'xConfig' | 'yConfig'>>({
  padding: false,
  xConfig: {
    position: 'top'
  },
  yConfig: {
    position: 'left'
  }
})

const gridOptions = reactive<VxeGridProps<RowVO>>({
  border: true,
  height: 300,
  useScrollbar: true,
  scrollbarConfig,
  columns: [
    { field: 'seq', type: 'seq', width: 70 },
    { field: 'name', title: 'Name', minWidth: 300 },
    { field: 'sex', title: 'Sex', minWidth: 300 },
    { field: 'age', title: 'Age', minWidth: 300 },
    { field: 'address', title: 'Address', minWidth: 400 }
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
  ]
})
</script>
