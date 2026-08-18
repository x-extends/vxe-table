<template>
  <div>
    <vxe-grid v-bind="gridOptions"></vxe-grid>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import type { VxeGridProps } from '../../../types'

interface RowVO {
  id: number
  name: string
  nickname: string
  role: string
  sex: string
  age: number
  date: string
  address: string
}

const gridOptions = reactive<VxeGridProps<RowVO>>({
  border: true,
  showOverflow: true,
  showHeaderOverflow: true,
  showFooterOverflow: true,
  height: 1000,
  virtualYConfig: {
    enabled: true,
    gt: 0
  },
  columns: [
    { type: 'seq', width: 70 },
    { field: 'name', title: 'Name' },
    { field: 'nickname', title: 'Nickname', width: 'auto' },
    { field: 'role', title: 'Role' },
    { field: 'sex', title: 'Sex' },
    { field: 'age', title: 'Age' },
    { field: 'date', title: 'date' },
    { field: 'address', title: 'Address' }
  ],
  data: []
})

// 模拟行数据
const loadList = (size = 200) => {
  const dataList: RowVO[] = []
  for (let i = 0; i < size; i++) {
    dataList.push({
      id: 10000 + i,
      name: 'Test' + i,
      nickname: i === 100 ? 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' : 'Name' + i,
      role: 'Developer',
      sex: '男',
      age: 18,
      date: '2018-01-01',
      address: 'address'
    })
  }
  gridOptions.data = dataList
}

loadList(500)
</script>
