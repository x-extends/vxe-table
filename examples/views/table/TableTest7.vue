<template>
  <div>
    缩进：<vxe-radio-group v-model="nodeIndent">
      <vxe-radio-button checked-value="20px" content="20px"></vxe-radio-button>
      <vxe-radio-button checked-value="30px" content="30px"></vxe-radio-button>
      <vxe-radio-button checked-value="40px" content="40px"></vxe-radio-button>
    </vxe-radio-group>

    <vxe-grid
      v-bind="gridOptions"
      :style="{
        '--vxe-ui-table-tree-node-indent': nodeIndent
      }"
    >
    </vxe-grid>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import type { VxeGridProps } from '../../../types'

interface RowVO {
  id: number
  parentId: number | null
  name: string
  type: string
  size: number
  date: string
}

const nodeIndent = ref('20px')

const gridOptions = reactive<VxeGridProps<RowVO>>({
  showOverflow: true,
  border: 'outer',
  stripe: true,
  rowConfig: {
    useKey: true
  },
  columnConfig: {
    resizable: true
  },
  checkboxConfig: {
    labelField: 'name'
  },
  treeConfig: {
    transform: true,
    showLine: true
  },
  columns: [
    { type: 'checkbox', treeNode: true, minWidth: 300 },
    { field: 'size', title: 'Size' },
    { field: 'type', title: 'Type' },
    { field: 'date', title: 'Date' }
  ],
  data: [
    { id: 10000, parentId: null, name: 'Test1', type: 'mp3', size: 1024, date: '2020-08-01' },
    { id: 10050, parentId: null, name: 'Test2', type: 'mp4', size: 0, date: '2021-04-01' },
    { id: 24300, parentId: 10050, name: 'Test3', type: 'avi', size: 1024, date: '2020-03-01' },
    { id: 20045, parentId: 24300, name: 'Test4', type: 'html', size: 600, date: '2021-04-01' },
    { id: 10053, parentId: 24300, name: 'Test5', type: 'avi', size: 0, date: '2021-04-01' },
    { id: 24330, parentId: 10053, name: 'Test6', type: 'txt', size: 25, date: '2021-10-01' },
    { id: 21011, parentId: 10053, name: 'Test7', type: 'pdf', size: 512, date: '2020-01-01' },
    { id: 22200, parentId: 10053, name: 'Test8', type: 'js', size: 1024, date: '2021-06-01' },
    { id: 23666, parentId: null, name: 'Test9', type: 'xlsx', size: 2048, date: '2020-11-01' },
    { id: 23677, parentId: 23666, name: 'Test10', type: 'js', size: 1024, date: '2021-06-01' },
    { id: 23671, parentId: 23677, name: 'Test11', type: 'js', size: 1024, date: '2021-06-01' },
    { id: 23672, parentId: 23677, name: 'Test12', type: 'js', size: 1024, date: '2021-06-01' },
    { id: 23688, parentId: 23666, name: 'Test13', type: 'js', size: 1024, date: '2021-06-01' },
    { id: 23681, parentId: 23688, name: 'Test14', type: 'js', size: 1024, date: '2021-06-01' },
    { id: 23682, parentId: 23688, name: 'Test15', type: 'js', size: 1024, date: '2021-06-01' },
    { id: 24555, parentId: null, name: 'Test16', type: 'avi', size: 224, date: '2020-10-01' },
    { id: 24566, parentId: 24555, name: 'Test17', type: 'js', size: 1024, date: '2021-06-01' },
    { id: 24577, parentId: 24555, name: 'Test18', type: 'js', size: 1024, date: '2021-06-01' }
  ]
})
</script>
