<template>
  <div>
    <vxe-grid ref="gridRef" v-bind="gridOptions">
      <template #action="{ row }">
        <vxe-button mode="text" status="primary" @click="saveRow(row)"
          >保存</vxe-button
        >
      </template></vxe-grid
    >
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
const gridRef = ref()
// 模拟后台
const fetchChildListApi = (parentRow) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const childs = [
        {
          id: parentRow.id + 1000000,
          parentId: parentRow.id,
          name: parentRow.name + 'Test111111111111',
          type: 'mp4',
          size: 0,
          date: '2021-10-03',
          hasChild: true
        },
        {
          id: parentRow.id + 1500000,
          parentId: parentRow.id,
          name: parentRow.name + 'Test222222222222',
          type: 'mp3',
          size: 0,
          date: '2021-07-09',
          hasChild: false
        }
      ]
      resolve(childs)
    }, 500)
  })
}
const gridOptions = reactive({
  border: true,
  columnConfig: {
    resizable: true
  },
  rowConfig: {
    keyField: 'id'
  },
  keepSource: true,
  editConfig: {
    trigger: 'click',
    mode: 'cell',
    showStatus: true
  },
  treeConfig: {
    transform: true,
    rowField: 'id',
    parentField: 'parentId',
    lazy: true,
    hasChild: 'hasChild',
    loadMethod ({ row }) {
      // 异步加载子节点
      return fetchChildListApi(row)
    }
  },
  columns: [
    { type: 'seq', width: 70 },
    { field: 'name', title: 'Name', width: 400, treeNode: true },
    {
      field: 'size',
      title: 'Size',
      editRender: {
        name: 'VxeInput',
        props: {
          style: { width: '100%' },
          controls: false
        }
      }
    },
    { field: 'type', title: 'Type' },
    { field: 'date', title: 'Date' },
    {
      field: 'action',
      title: '操作',
      width: 140,
      slots: { default: 'action' }
    }
  ],
  data: [
    {
      id: 10050,
      parentId: null,
      name: 'Test2',
      type: 'mp4',
      size: 0,
      date: '2021-04-01',
      hasChild: true
    },
    {
      id: 23666,
      parentId: null,
      name: 'Test23',
      type: 'mp4',
      size: 0,
      date: '2021-01-02',
      hasChild: true
    },
    {
      id: 24555,
      parentId: null,
      name: 'test abc9',
      type: 'avi',
      size: 224,
      date: '2020-10-01',
      hasChild: true
    }
  ]
})
const expandEvent1 = () => {
  const $grid = gridRef.value
  if ($grid) {
    $grid.toggleTreeExpand(gridOptions.data[1])
  }
}
const expandEvent2 = () => {
  const $grid = gridRef.value
  if ($grid) {
    $grid.setTreeExpand([gridOptions.data[1], gridOptions.data[3]], true)
  }
}
const expandEvent3 = () => {
  const $grid = gridRef.value
  if ($grid) {
    $grid.setAllTreeExpand(true)
  }
}
const expandEvent4 = () => {
  const $grid = gridRef.value
  if ($grid) {
    $grid.clearTreeExpand()
  }
}

const saveRow = (row) => {
  const $grid = gridRef.value
  $grid.reloadRow(row, {})
}
</script>
