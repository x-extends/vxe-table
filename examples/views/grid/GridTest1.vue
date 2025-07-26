<template>
  <div>
    <vxe-button @click="handleSort('role', 'desc')">只修改 role 倒序</vxe-button>
    <vxe-button @click="handleSort('role', 'asc')">只修改 role 升序</vxe-button>
    <vxe-button @click="handleUpdateSort($event, 'role', 'desc')">修改并触发 role 倒序</vxe-button>
    <vxe-button @click="handleUpdateSort($event, 'role', 'asc')">修改并触发 role 升序</vxe-button>
    <vxe-button @click="clearSortEvent">清除排序</vxe-button>
    <vxe-grid ref="gridRef" v-bind="gridOptions" v-on="gridEvents"></vxe-grid>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { VxeTablePropTypes, VxeGridProps, VxeGridInstance, VxeColumnPropTypes } from '../../../types'
import { VxeButtonEvents } from 'vxe-pc-ui'
import XEUtils from 'xe-utils'

interface RowVO {
  id: number
  name: string
  role: string
  sex: string
  age: number
  num: string
  num2: string
  address: string
}

const gridRef = ref<VxeGridInstance<RowVO>>()

const gridOptions = reactive<VxeGridProps<RowVO>>({
  border: true,
  loading: false,
  height: 400,
  sortConfig: {
    remote: true,
    multiple: true
  },
  columns: [
    { type: 'seq', width: 70 },
    { field: 'name', title: 'Name' },
    { field: 'role', title: 'Role', sortable: true },
    { field: 'sex', title: 'Sex', sortable: true },
    { field: 'age', title: 'Age', sortable: true },
    { field: 'address', title: 'Address', sortable: true }
  ],
  data: []
})

const findList = (field?: VxeColumnPropTypes.Field, order?: VxeTablePropTypes.SortOrder) => {
  gridOptions.loading = true
  // 模拟接口
  return new Promise<RowVO[]>(resolve => {
    setTimeout(() => {
      gridOptions.loading = false
      const mockList = [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, num: '3.8', num2: '3.8', address: 'test abc' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, num: '511', num2: '511', address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, num: '12.8', num2: '12.8', address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, num: '103', num2: '103', address: 'test abc' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, num: '56', num2: '56', address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, num: '49', num2: '49', address: 'test abc' },
        { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, num: '400.9', num2: '400.9', address: 'test abc' },
        { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, num: '5000', num2: '5000', address: 'test abc' }
      ]
      if (field && order) {
        const rest = XEUtils.orderBy(mockList, { field, order })
        gridOptions.data = rest
        resolve(rest)
      } else {
        gridOptions.data = mockList
        resolve(mockList)
      }
    }, 300)
  })
}

const gridEvents: any = {
  sortChange ({ field, order }: any) {
    findList(field, order)
  },
  clearAllSort () {
    findList('', null)
  }
}

const handleSort = (field: string, order: 'asc' | 'desc') => {
  const $grid = gridRef.value
  if ($grid) {
    $grid.setSort({ field, order })
  }
}

const handleUpdateSort = (params: any, field: string, order: 'asc' | 'desc') => {
  const $grid = gridRef.value
  if ($grid) {
    $grid.setSortByEvent(params.$event, { field, order })
  }
}

const clearSortEvent: VxeButtonEvents.Click = ({ $event }) => {
  const $grid = gridRef.value
  if ($grid) {
    // 清除排序，调用该方法会自动触发 clear-sort 事件
    $grid.clearSortByEvent($event)
  }
}

findList()
</script>
