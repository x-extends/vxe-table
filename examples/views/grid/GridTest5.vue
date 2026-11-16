<template>
  <div>
    <div>
      连接线：<vxe-switch v-model="gridOptions.treeConfig.showLine"></vxe-switch>
      <vxe-button @click="expandAllEvent">展开所有</vxe-button>
      <vxe-button @click="clearExpandEvent">收起所有</vxe-button>
    </div>

    <vxe-grid ref="gridRef" v-bind="gridOptions"></vxe-grid>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import type { VxeGridInstance, VxeGridProps, VxeWithRequired } from '../../../types'

interface RowVO {
  id: number
  parentId: number | null
  alias: string
  name: string
  describe: string
  startTime: string
  endTime: string
}

const gridRef = ref<VxeGridInstance<RowVO>>()

const gridOptions = reactive<VxeWithRequired<VxeGridProps<RowVO>, 'treeConfig'>>({
  border: true,
  showOverflow: true,
  showHeaderOverflow: true,
  showFooterOverflow: true,
  height: 800,
  loading: false,
  columnConfig: {
    resizable: true
  },
  rowConfig: {
    useKey: true
  },
  treeConfig: {
    transform: true,
    showLine: true
  },
  virtualXConfig: {
    enabled: true,
    gt: 0
  },
  virtualYConfig: {
    enabled: true,
    gt: 0
  },
  columns: [
    { type: 'checkbox', width: 60 },
    { type: 'seq', width: 60 },
    { field: 'name', title: 'Name', minWidth: 300, treeNode: true },
    { field: 'id', title: 'Id', width: 100 },
    { field: 'parentId', title: 'Parent Id', width: 100 },
    { field: 'describe', title: 'Describe', width: 400 },
    { field: 'startTime', title: 'Start Time', width: 320 },
    { field: 'endTime', title: 'End Time', width: 320 },
    { field: 'attr1', title: 'Attr1', width: 320 },
    { field: 'attr2', title: 'Attr2', width: 220 },
    { field: 'attr3', title: 'Attr3', width: 240 },
    { field: 'attr4', title: 'Attr4', width: 180 },
    { field: 'attr5', title: 'Attr5', width: 240 },
    { field: 'attr6', title: 'Attr6', width: 400 },
    { field: 'attr7', title: 'Attr7', width: 380 },
    { field: 'attr8', title: 'Attr8', width: 260 },
    { field: 'attr9', title: 'Attr9', width: 300 },
    { field: 'attr10', title: 'Attr10', width: 150 },
    { field: 'attr11', title: 'Attr11', width: 290 },
    { field: 'attr12', title: 'Attr12', width: 300 },
    { field: 'attr13', title: 'Attr13', width: 200 },
    { field: 'attr14', title: 'Attr14', width: 500 },
    { field: 'attr15', title: 'Attr15', width: 360 },
    { field: 'attr16', title: 'Attr16', width: 140 },
    { field: 'attr17', title: 'Attr17', width: 100 },
    { field: 'attr18', title: 'Attr18', width: 450 },
    { field: 'attr19', title: 'Attr19', width: 270 },
    { field: 'attr20', title: 'Attr20', width: 180 }
  ],
  data: []
})

const loadList = () => {
  gridOptions.loading = true
  fetch('https://vxeui.com/resource/json/provinces_list.json').then(res => res.json()).then((data: RowVO[]) => {
    gridOptions.data = data.map((item, i) => {
      return {
        ...item,
        describe: `describe ${i}`,
        startTime: `startTime ${i}`,
        endTime: `endTime ${i}`,
        attr1: `1 ${i}`,
        attr2: `2 ${i}`,
        attr3: `3 ${i}`,
        attr4: `4 ${i}`,
        attr5: `5 ${i}`,
        attr6: `6 ${i}`,
        attr7: `7 ${i}`,
        attr8: `8 ${i}`,
        attr9: `9 ${i}`,
        attr10: `10 ${i}`,
        attr11: `11 ${i}`,
        attr12: `12 ${i}`,
        attr13: `13 ${i}`,
        attr14: `14 ${i}`,
        attr15: `15 ${i}`,
        attr16: `16 ${i}`,
        attr17: `17 ${i}`,
        attr18: `18 ${i}`,
        attr19: `19 ${i}`,
        attr20: `20 ${i}`
      }
    })
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
