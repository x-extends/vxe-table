<template>
  <div class="table-container">
    <div
      style="
        margin-bottom: 15px;
        display: flex;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
      "
    >
      <button @click="getCurrentEvent">获取高亮行</button>
      <button @click="clearSelectEvent">清空高亮行</button>
      <button @click="selectRowEvent">设置1001-1为高亮行</button>
    </div>

    <VxeTable
      border
      ref="tableRef"
      height="300"
      :keep-source="true"
      show-overflow="title"
      :show-header-overflow="true"
      :show-footer-overflow="true"
      :column-config="{ resizable: true }"
      :row-config="{ isHover: true, keyField: 'id', isCurrent: true }"
      :cell-config="{ height: 50 }"
      :virtual-x-config="{ enabled: false, gt: 0 }"
      :virtual-y-config="{ enabled: true, gt: 0 }"
      :checkbox-config="{
        showHeader: false,
        checkStrictly: true,
        highlight: true,
      }"
      :expand-config="{ mode: 'inside' }"
      :loading="loading"
      :scroll-y="{ enabled: true, gt: 0 }"
      :tree-config="{
        lazy: true,
        transform: true,
        rowField: 'id',
        parentField: 'parentId',
        hasChild: 'hasChild',
        loadMethod: loadChildNodeMethod,
      }"
      @current-row-change="currentRowChangeEvent"
      :data="tableData"
    >
      <VxeColumn type="checkbox" width="60" fixed="left"></VxeColumn>
      <VxeColumn field="id" title="节点 ID" tree-node width="220"></VxeColumn>
      <VxeColumn field="date" title="更新时间" min-width="220"></VxeColumn>
    </VxeTable>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import {
  type TableMethods,
  type VxeTableEvents
} from '../../../types'
import {
  VxeTable,
  VxeColumn
} from '../../../packages'

const tableRef = ref<TableMethods>()
const loading = ref(false)
const tableData = ref<any>([])

let idIndex = 2000

const currentRowChangeEvent: VxeTableEvents.CurrentRowChange<any> = (row) => {
  console.log('行选中事件', row)
}

function clearSelectEvent () {
  const $table = tableRef.value
  if ($table) {
    $table.clearCurrentRow()
  }
}

const selectRowEvent = () => {
  const $table = tableRef.value
  if ($table) {
    $table.setCurrentRow($table.getRowById('1001-1'))
  }
}

const getCurrentEvent = () => {
  const $table = tableRef.value
  if ($table) {
    console.log($table.getCurrentRecord())
  }
}

// 模拟初始数据
const loadList = () => {
  const list = []
  const firstLayerItem: any[] = []
  for (let i = 0; i < 10; i++) {
    const id = `${1001 + i}`
    const firstItem = {
      id,
      name: `根节点 - ${i + 1}`,
      type: 'Folder',
      date: '2024-01-01',
      expand: true
      // hasChild: true
    }
    list.push(firstItem)
    firstLayerItem.push(firstItem)
    list.push({
      id: `${id}-1`,
      parentId: id,
      type: 'Folder',
      date: '2024-01-01',
      hasChild: true
    })
  }
  tableData.value = list
  nextTick(() => {
    firstLayerItem.forEach((t) => {
      tableRef.value!.setTreeExpand(t, true)
    })
  })
}

// 懒加载逻辑
const loadChildNodeMethod = ({ row }: any) => {
  return new Promise<any>((resolve) => {
    console.log('load', row.id)
    setTimeout(() => {
      const childList = [
        {
          id: `${++idIndex}`,
          parentId: `${row.id}`,
          name: '[新数据] 来自刷新或展开',
          type: 'File',
          date: new Date().toLocaleTimeString(),
          hasChild: true
        },
        {
          id: `${++idIndex}`,
          parentId: `${row.id}`,
          name: '[新数据] 来自刷新或展开',
          type: 'File',
          date: new Date().toLocaleTimeString(),
          hasChild: true
        }
      ]
      resolve(childList)
    }, 100)
  })
}

onMounted(async () => {
  loadList()
})
</script>

<style scoped>
.table-container {
  padding: 20px;
  font-family: Arial, sans-serif;
}

button {
  padding: 4px 12px;
  cursor: pointer;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
}

button:hover {
  background-color: #66b1ff;
}

input {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  outline: none;
}
</style>
