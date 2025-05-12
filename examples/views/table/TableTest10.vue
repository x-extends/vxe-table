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
  { id: '1#2', name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
  { id: '2', name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
  { id: '3#2', name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
  { id: 'B1_WHC-XXX#前模镶件#B1_WHC-XXX', name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
  { id: 'B1_WHC-XXX#前模镶件#B1_WHC-XXX', name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' }
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
