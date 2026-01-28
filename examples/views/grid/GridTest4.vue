<template>
  <div>
    <vxe-grid v-bind="gridOptions">
      <template #expand_content="{ row }">
        <vxe-grid v-bind="subGridOptions" :data="row.subList"></vxe-grid>
      </template>
    </vxe-grid>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import type { VxeGridProps } from '../../../types'
import XEUtils from 'xe-utils'

interface RowVO {
  id: number
  name: string
  role: string
  sex: string
  age: number
  subList: any[]
}

const gridOptions = reactive<VxeGridProps<RowVO>>({
  border: true,
  showOverflow: true,
  showHeaderOverflow: true,
  showFooterOverflow: true,
  height: 800,
  expandConfig: {
    padding: true
  },
  virtualYConfig: {
    enabled: true,
    gt: 0
  },
  columns: [
    { type: 'seq', fixed: 'left', width: 70 },
    { type: 'expand', width: 60, fixed: 'left', slots: { content: 'expand_content' } },
    { field: 'name', title: 'Name', minWidth: 400 },
    { field: 'role', title: 'Role', minWidth: 300 },
    { field: 'age', title: 'Age', width: 200 },
    { field: 'attr1', title: 'Attr1', width: 260 },
    { field: 'attr2', title: 'Attr2', width: 400 },
    { field: 'attr3', title: 'Attr3', width: 360 },
    { field: 'sex', title: 'Sex', width: 100, fixed: 'right' }
  ],
  data: []
})

const subGridOptions = reactive<VxeGridProps<RowVO>>({
  border: true,
  showOverflow: true,
  columns: [
    { field: 'birthday', title: 'Birthday' },
    { field: 'city', title: 'City' },
    { field: 'address', title: 'Address' }
  ]
})

// 模拟行数据
const loadList = (size = 200) => {
  const dataList: RowVO[] = []
  for (let i = 0; i < size; i++) {
    const subList: any[] = []
    for (let i = 0; i < XEUtils.random(0, 6); i++) {
      subList.push({
        birthday: '2025-01-01',
        city: '深圳市',
        address: '深圳市南山区'
      })
    }
    dataList.push({
      id: 10000 + i,
      name: '名称 Test' + i,
      role: 'Developer',
      sex: '男',
      age: 18,
      subList
    })
  }
  gridOptions.data = dataList
}

loadList(500)
</script>
