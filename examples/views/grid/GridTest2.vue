<template>
  <div>
    <div>
      <vxe-button @click="expandAllEvent">展开所有</vxe-button>
      <vxe-button @click="clearExpandEvent">收起所有</vxe-button>
    </div>

    <vxe-grid ref="gridRef" v-bind="gridOptions"></vxe-grid>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import type { VxeGridInstance, VxeGridProps } from '../../../types'

interface RowVO {
  id: number
  parentId: number | null
  name: string
}

const gridRef = ref<VxeGridInstance<RowVO>>()

const gridOptions = reactive<VxeGridProps<RowVO>>({
  border: true,
  showOverflow: true,
  showHeaderOverflow: true,
  showFooterOverflow: true,
  height: 800,
  loading: false,
  treeConfig: {
    transform: true,
    showLine: true
  },
  virtualYConfig: {
    enabled: true,
    gt: 0
  },
  columns: [
    { type: 'checkbox', width: 60 },
    { type: 'seq', width: 300, treeNode: true },
    { field: 'id', title: 'Id' },
    { field: 'name', title: 'Name' }
  ],
  data: []
})

const loadList = () => {
  gridOptions.loading = true
  fetch('https://vxeui.com/resource/json/provinces_list.json').then(res => res.json()).then((data: RowVO[]) => {
    gridOptions.data = data
    gridOptions.loading = false
  })
}

const expandAllEvent = () => {
  const $grid = gridRef.value
  if ($grid) {
    $grid.setAllTreeExpand(true)
  }
}

const clearExpandEvent = () => {
  const $grid = gridRef.value
  if ($grid) {
    $grid.clearTreeExpand()
  }
}

loadList()
</script>
