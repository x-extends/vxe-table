<template>
  <div>
    <vxe-radio-group v-model="customConfig.mode">
      <vxe-radio-button checked-value="default" content="默认"></vxe-radio-button>
      <vxe-radio-button checked-value="modal" content="弹窗"></vxe-radio-button>
      <vxe-radio-button checked-value="drawer" content="抽屉"></vxe-radio-button>
    </vxe-radio-group>
    <vxe-button @click="customEvent">恢复</vxe-button>

    <vxe-grid ref="gridRef" v-bind="gridOptions"></vxe-grid>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import type { VxeGridInstance, VxeGridProps, VxeTablePropTypes } from '../../../types'

interface RowVO {
  id: number
  name: string
  role: string
  sex: string
  age: number
  address: string
}

const gridRef = ref<VxeGridInstance>()

const customConfig = reactive<VxeTablePropTypes.CustomConfig<RowVO>>({
  storage: true,
  mode: 'default',
  immediate: true
})

const gridOptions = reactive<VxeGridProps<RowVO>>({
  border: true,
  id: 'myCustomStorage2',
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
  columnDragConfig: {
    isPeerDrag: true,
    isCrossDrag: true,
    isToChildDrag: true
  },
  columns: [
    { field: 'seq', type: 'seq', width: 90 },
    { field: 'name', title: 'Name' },
    {
      title: '分组1',
      field: 'group1',
      children: [
        { field: 'nickname', title: 'Nickname' },
        { field: 'role', title: 'role' }
      ]
    },
    {
      title: '分组3',
      field: 'group3',
      children: [
        { field: 'sex', title: 'Sex' },
        { field: 'attr1', title: 'Attr1' },
        {
          title: '分组4',
          field: 'group4',
          children: [
            { field: 'age', title: 'Age' },
            { field: 'attr4', title: 'Attr4' },
            { field: 'attr8', title: 'Attr8' }
          ]
        }
      ]
    },
    { field: 'address', title: 'address' }
  ],
  data: [
    { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
    { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
    { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
    { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
  ]
})

const customEvent = () => {
  const $grid = gridRef.value
  if ($grid) {
    debugger
    $grid.setCustomStoreData({
      fixedData: {
        group1: 'left'
      }
    })
  }
}
</script>
