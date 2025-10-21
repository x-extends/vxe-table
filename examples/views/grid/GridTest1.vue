<template>
  <div>
    <vxe-button status="primary" @click="updateHeight(gridOptions.data[1], 80)">设置第二行=80</vxe-button>
    <vxe-button status="primary" @click="updateHeight(gridOptions.data[1], 140)">设置第二行=140</vxe-button>
    <vxe-button status="primary" @click="updateBatchHeight()">批量设置高度</vxe-button>
    <vxe-button status="success" @click="getHeight(gridOptions.data[1])">获取第二行</vxe-button>
    <vxe-button status="success" @click="getHeight(gridOptions.data[1])">获取 gridOptions.data[1]</vxe-button>

    <vxe-grid ref="gridRef" v-bind="gridOptions"></vxe-grid>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { VxeUI } from 'vxe-pc-ui'
import { VxeGridProps, VxeGridInstance } from '../../../types'

interface RowVO {
  id: number
  name: string
  role: string
  sex: string
  age: number
  address: string
}

const gridRef = ref<VxeGridInstance<RowVO>>()

const gridOptions = reactive<VxeGridProps<any> & { data: any[] }>({
  border: true,
  showOverflow: true,
  height: 80,
  rowConfig: {
    resizable: true,
    keyField: 'id'
  },
  treeConfig: {
    transform: true,
    showLine: true
  },
  columns: [
    { type: 'seq', width: 200, treeNode: true },
    { field: 'name', title: 'Name' },
    { field: 'sex', title: 'Sex' },
    { field: 'age', title: 'Age' },
    { field: 'time', title: 'Time' },
    { field: 'address', title: 'Address' }
  ],
  data: [
    // { id: 10000, parentId: null, name: 'Test1', type: 'mp3', size: 1024, date: '2020-08-01' },
    // { id: 10050, parentId: null, name: 'Test2', type: 'mp4', size: 0, date: '2021-04-01' },
    // { id: 24300, parentId: 10050, name: 'Test3', type: 'avi', size: 1024, date: '2020-03-01' },
    // { id: 20045, parentId: 24300, name: 'Test4', type: 'html', size: 600, date: '2021-04-01' },
    // { id: 10053, parentId: 24300, name: 'Test5', type: 'avi', size: 0, date: '2021-04-01' },
    // { id: 24330, parentId: 10053, name: 'Test6', type: 'txt', size: 25, date: '2021-10-01' },
    // { id: 21011, parentId: 10053, name: 'Test7', type: 'pdf', size: 512, date: '2020-01-01' },
    // { id: 22200, parentId: 10053, name: 'Test8', type: 'js', size: 1024, date: '2021-06-01' },
    // { id: 23666, parentId: null, name: 'Test9', type: 'xlsx', size: 2048, date: '2020-11-01' },
    // { id: 23677, parentId: 23666, name: 'Test10', type: 'js', size: 1024, date: '2021-06-01' },
    // { id: 23671, parentId: 23677, name: 'Test11', type: 'js', size: 1024, date: '2021-06-01' },
    // { id: 23672, parentId: 23677, name: 'Test12', type: 'js', size: 1024, date: '2021-06-01' },
    // { id: 23688, parentId: 23666, name: 'Test13', type: 'js', size: 1024, date: '2021-06-01' },
    // { id: 23681, parentId: 23688, name: 'Test14', type: 'js', size: 1024, date: '2021-06-01' },
    // { id: 23682, parentId: 23688, name: 'Test15', type: 'js', size: 1024, date: '2021-06-01' },
    // { id: 24555, parentId: null, name: 'Test16', type: 'avi', size: 224, date: '2020-10-01' },
    // { id: 24566, parentId: 24555, name: 'Test17', type: 'js', size: 1024, date: '2021-06-01' },
    // { id: 24577, parentId: 24555, name: 'Test18', type: 'js', size: 1024, date: '2021-06-01' }
  ]
})

const updateHeight = (rowOrId: RowVO | string | number, height: number) => {
  const $grid = gridRef.value
  if ($grid) {
    $grid.setRowHeight(rowOrId, height)
  }
}

const updateBatchHeight = () => {
  const $grid = gridRef.value
  if ($grid) {
    const heightConf = {
      10001: 60,
      10003: 90,
      10004: 50
    }
    $grid.setRowHeightConf(heightConf)
  }
}

const getHeight = (rowOrId: RowVO | string | number) => {
  const $grid = gridRef.value
  if ($grid) {
    VxeUI.modal.message({
      title: '获取高度',
      content: `高度：${$grid.getRowHeight(rowOrId)}px`
    })
  }
}
</script>
