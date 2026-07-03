<template>
  <div>
    <vxe-radio-group v-model="customConfig.mode">
      <vxe-radio-button checked-value="default" content="默认"></vxe-radio-button>
      <vxe-radio-button checked-value="modal" content="弹窗"></vxe-radio-button>
      <vxe-radio-button checked-value="drawer" content="抽屉"></vxe-radio-button>
    </vxe-radio-group>

    <vxe-grid v-bind="gridOptions" class="my-table111"></vxe-grid>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import type { VxeGridProps, VxeTablePropTypes } from '../../../types'

interface RowVO {
  id: number
  name: string
  role: string
  sex: string
  age: number
  address: string
}

const customConfig = reactive<VxeTablePropTypes.CustomConfig<RowVO>>({
  storage: true,
  mode: 'modal',
  modalOptions: {
    transfer: true
  }
})

const gridOptions = reactive<VxeGridProps<RowVO>>({
  border: true,
  id: 'myCustomStorage1',
  rowConfig: {
    keyField: 'id'
  },
  toolbarConfig: {
    custom: true
  },
  customConfig,
  columnConfig: {
    drag: true,
    resizable: true
  },
  columns: [
    { field: 'seq', type: 'seq', width: 90 },
    { field: 'name', title: 'Name' },
    { field: 'role', title: 'role' },
    { field: 'sex', title: 'Sex' },
    { field: 'age', title: 'Age' },
    { field: 'address', title: 'address' }
  ],
  data: [
    { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
    { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
    { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
    { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
  ]
})
</script>

<style lang="scss" scoped>
.my-table111 {
  --vxe-ui-vxe-table-custom-column-width-width: 300px;
}
</style>
