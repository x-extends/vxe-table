<template>
  <div>
    <vxe-button status="success" @click="getSelectEvent">获取已选</vxe-button>
    <vxe-grid ref="gridRef" v-bind="gridOptions" v-on="gridEvents"></vxe-grid>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { VxeUI } from '../../../packages'
import { VxeGridInstance, VxeGridProps, VxeGridListeners } from '../../../types'

interface RowVO {
  id: number
  name: string
  role: string
  sex: string
  age: number
  address: string
}

const gridRef = ref<VxeGridInstance<RowVO>>()

const allList = [
  { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
  { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
  { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
  { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
  { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
  { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women', age: 21, address: 'Shenzhen' },
  { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man', age: 29, address: 'Shenzhen' },
  { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc' },
  { id: 10009, name: 'Test9', nickname: 'T9', role: 'Develop', sex: 'Man', age: 35, address: 'Shenzhen' },
  { id: 100010, name: 'Test10', nickname: 'T10', role: 'Develop', sex: 'Man', age: 35, address: 'Guangzhou' },
  { id: 100011, name: 'Test11', nickname: 'T11', role: 'Develop', sex: 'Man', age: 49, address: 'Guangzhou' },
  { id: 100012, name: 'Test12', nickname: 'T12', role: 'Develop', sex: 'Women', age: 45, address: 'Shanghai' },
  { id: 100013, name: 'Test13', nickname: 'T13', role: 'Test', sex: 'Women', age: 35, address: 'Guangzhou' },
  { id: 100014, name: 'Test14', nickname: 'T14', role: 'Test', sex: 'Man', age: 29, address: 'Shanghai' },
  { id: 100015, name: 'Test15', nickname: 'T15', role: 'Develop', sex: 'Man', age: 39, address: 'Guangzhou' },
  { id: 100016, name: 'Test16', nickname: 'T16', role: 'Test', sex: 'Women', age: 35, address: 'Guangzhou' },
  { id: 100017, name: 'Test17', nickname: 'T17', role: 'Test', sex: 'Man', age: 39, address: 'Shanghai' },
  { id: 100018, name: 'Test18', nickname: 'T18', role: 'Develop', sex: 'Man', age: 44, address: 'Guangzhou' },
  { id: 100019, name: 'Test19', nickname: 'T19', role: 'Develop', sex: 'Man', age: 39, address: 'Guangzhou' },
  { id: 100020, name: 'Test20', nickname: 'T20', role: 'Test', sex: 'Women', age: 35, address: 'Guangzhou' },
  { id: 100021, name: 'Test21', nickname: 'T21', role: 'Test', sex: 'Man', age: 39, address: 'Shanghai' },
  { id: 100022, name: 'Test22', nickname: 'T22', role: 'Develop', sex: 'Man', age: 44, address: 'Guangzhou' }
]

// 模拟前端分页
const handlePageData = () => {
  gridOptions.loading = true
  setTimeout(() => {
    const { pageSize, currentPage } = gridOptions.pagerConfig
    gridOptions.pagerConfig.total = allList.length
    gridOptions.data = allList.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    gridOptions.loading = false
  }, 100)
}

const gridOptions = reactive<VxeGridProps<RowVO> & {
  pagerConfig: {
    total: number
    currentPage: number
    pageSize: number
  }
}>({
  showOverflow: true,
  border: true,
  loading: false,
  height: 500,
  rowConfig: {
    keyField: 'id'
  },
  checkboxConfig: {
    reserve: true,
    showReserveStatus: true
  },
  pagerConfig: {
    total: 0,
    currentPage: 1,
    pageSize: 10
  },
  columns: [
    { type: 'checkbox', width: 60 },
    { field: 'name', title: 'Name', minWidth: 160 },
    { field: 'email', title: 'Email', minWidth: 160 },
    { field: 'nickname', title: 'Nickname', minWidth: 160 },
    { field: 'age', title: 'Age', width: 100 },
    { field: 'role', title: 'Role', minWidth: 160 },
    { field: 'amount', title: 'Amount', width: 140 },
    { field: 'updateDate', title: 'Update Date', visible: false },
    { field: 'createDate', title: 'Create Date', visible: false }
  ],
  data: []
})

const gridEvents: VxeGridListeners = {
  pageChange ({ pageSize, currentPage }) {
    gridOptions.pagerConfig.currentPage = currentPage
    gridOptions.pagerConfig.pageSize = pageSize
    handlePageData()
  }
}

const getSelectEvent = () => {
  const $grid = gridRef.value
  if ($grid) {
    const selectRecords = $grid.getCheckboxRecords()
    const selectReserveRecords = $grid.getCheckboxReserveRecords()
    VxeUI.modal.message({
      content: `总共勾选： ${selectRecords.length + selectReserveRecords.length} 条，当前页勾选：${selectRecords.length} 条，已保留勾选：${selectReserveRecords.length} 条`,
      status: 'success'
    })
  }
}

handlePageData()
</script>
