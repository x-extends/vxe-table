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
      <label>要刷新的节点 ID:</label>
      <input
        v-model="targetId"
        type="number"
        placeholder="请输入 ID"
        style="width: 100px; padding: 4px"
      />
      <button @click="refreshNodeById">刷新指定节点</button>
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
      :data="tableData"
    >
      <VxeColumn field="id" title="节点 ID" tree-node width="220"></VxeColumn>
      <VxeColumn field="date" title="更新时间" min-width="220"></VxeColumn>
    </VxeTable>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import {
  type TableMethods
} from '../../../types'

const tableRef = ref<TableMethods>({} as TableMethods)
const loading = ref(false)
const tableData = ref<any>([])
const targetId = ref(2003) // 默认填入第一个 ID

let idIndex = 2000

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

const refreshNodeById = async () => {
  const $table = tableRef.value
  if (!$table) return

  // 1. 直接获取字符串 ID
  const searchId = String(targetId.value).trim()

  // 2. 这里的 getRowById 现在会按字符串严格匹配
  const row = $table.getRowById(searchId)

  if (row) {
    try {
      loading.value = true
      // 执行刷新
      await $table.reloadTreeExpand(row)
    } finally {
      loading.value = false
    }
  } else {
    console.warn(`未找到字符串 ID: "${searchId}"`)
  }
}

onMounted(async () => {
  loadList();
  (async () => {
    await nextTick()
    await tableRef.value.setTreeExpand(
      tableRef.value.getRowById('1001-1'),
      true
    )
    await tableRef.value.setTreeExpand(tableRef.value.getRowById('2001'), true)
    await tableRef.value.setTreeExpand(tableRef.value.getRowById('2003'), true)
    await tableRef.value.setTreeExpand(tableRef.value.getRowById('2005'), true)
  })()
})
</script>

<style>
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
