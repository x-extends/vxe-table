<template>
  <div>
    <vxe-button status="success" @click="resultEvent1">获取数据1</vxe-button>
    <vxe-grid ref="gridRef1" v-bind="gridOptions1"></vxe-grid>

    <vxe-button status="success" @click="resultEvent2">获取数据2</vxe-button>
    <vxe-grid ref="gridRef2" v-bind="gridOptions2"></vxe-grid>

    <vxe-button status="success" @click="resultEvent3">获取数据3</vxe-button>
    <vxe-grid ref="gridRef3" v-bind="gridOptions3"></vxe-grid>
  </div>
</template>

<script>
import { VxeUI } from 'vxe-pc-ui'

export default {
  data () {
    const gridOptions1 = {
      border: true,
      height: 300,
      rowConfig: {
        drag: true,
        keyField: 'id'
      },
      rowDragConfig: {
        isCrossDrag: true, // 允许跨级
        isCrossTableDrag: true // 允许跨表
      },
      treeConfig: {
        transform: true,
        rowField: 'id',
        parentField: 'parentId'
      },
      columns: [
        { type: 'seq', width: 70 },
        { field: 'name', title: 'Name', minWidth: 300, treeNode: true, dragSort: true },
        { field: 'size', title: 'Size' },
        { field: 'type', title: 'Type' },
        { field: 'date', title: 'Date' }
      ],
      data: [
        { id: 110000, parentId: null, name: 'Test101', type: 'mp3', size: 1024, date: '2020-08-01' },
        { id: 110050, parentId: null, name: 'Test102', type: 'mp4', size: 0, date: '2021-04-01' },
        { id: 124300, parentId: 110050, name: 'Test103', type: 'avi', size: 1024, date: '2020-03-01' },
        { id: 120045, parentId: 124300, name: 'Test104', type: 'html', size: 600, date: '2021-04-01' },
        { id: 110053, parentId: 124300, name: 'Test105', type: 'avi', size: 0, date: '2021-04-01' },
        { id: 124330, parentId: 110053, name: 'Test106', type: 'txt', size: 25, date: '2021-10-01' },
        { id: 121011, parentId: 110053, name: 'Test107', type: 'pdf', size: 512, date: '2020-01-01' },
        { id: 122200, parentId: 110053, name: 'Test108', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 123666, parentId: null, name: 'Test109', type: 'xlsx', size: 2048, date: '2020-11-01' },
        { id: 123677, parentId: 123666, name: 'Test110', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 123671, parentId: 123677, name: 'Test111', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 123672, parentId: 123677, name: 'Test112', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 123688, parentId: 123666, name: 'Test113', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 123681, parentId: 123688, name: 'Test114', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 123682, parentId: 123688, name: 'Test115', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 124555, parentId: null, name: 'Test116', type: 'avi', size: 224, date: '2020-10-01' },
        { id: 124566, parentId: 124555, name: 'Test117', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 124577, parentId: 124555, name: 'Test118', type: 'js', size: 1024, date: '2021-06-01' }
      ]
    }

    const gridOptions2 = {
      border: true,
      height: 300,
      rowConfig: {
        drag: true,
        keyField: 'id'
      },
      rowDragConfig: {
        isCrossDrag: true, // 允许跨级
        isCrossTableDrag: true // 允许跨表
      },
      treeConfig: {
        transform: true,
        rowField: 'id',
        parentField: 'parentId'
      },
      columns: [
        { type: 'seq', width: 70 },
        { field: 'name', title: 'Name', minWidth: 300, treeNode: true, dragSort: true },
        { field: 'size', title: 'Size' },
        { field: 'type', title: 'Type' },
        { field: 'date', title: 'Date' }
      ],
      data: [
        { id: 210000, parentId: null, name: 'Test201', type: 'mp3', size: 1024, date: '2020-08-01' },
        { id: 210050, parentId: null, name: 'Test202', type: 'mp4', size: 0, date: '2021-04-01' },
        { id: 224300, parentId: 210050, name: 'Test203', type: 'avi', size: 1024, date: '2020-03-01' },
        { id: 220045, parentId: 224300, name: 'Test204', type: 'html', size: 600, date: '2021-04-01' },
        { id: 210053, parentId: 224300, name: 'Test205', type: 'avi', size: 0, date: '2021-04-01' },
        { id: 224330, parentId: 210053, name: 'Test206', type: 'txt', size: 25, date: '2021-10-01' },
        { id: 221011, parentId: 210053, name: 'Test207', type: 'pdf', size: 512, date: '2020-01-01' },
        { id: 222200, parentId: 210053, name: 'Test208', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 223666, parentId: null, name: 'Test209', type: 'xlsx', size: 2048, date: '2020-11-01' },
        { id: 223677, parentId: 223666, name: 'Test210', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 223671, parentId: 223677, name: 'Test211', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 223672, parentId: 223677, name: 'Test212', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 223688, parentId: 223666, name: 'Test213', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 223681, parentId: 223688, name: 'Test214', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 223682, parentId: 223688, name: 'Test215', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 224555, parentId: null, name: 'Test216', type: 'avi', size: 224, date: '2020-10-01' },
        { id: 224566, parentId: 224555, name: 'Test217', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 224577, parentId: 224555, name: 'Test218', type: 'js', size: 1024, date: '2021-06-01' }
      ]
    }

    const gridOptions3 = {
      border: true,
      height: 300,
      rowConfig: {
        drag: true,
        keyField: 'id'
      },
      rowDragConfig: {
        isCrossDrag: true, // 允许跨级
        isCrossTableDrag: true // 允许跨表
      },
      treeConfig: {
        transform: true,
        rowField: 'id',
        parentField: 'parentId'
      },
      columns: [
        { type: 'seq', width: 70 },
        { field: 'name', title: 'Name', minWidth: 300, treeNode: true, dragSort: true },
        { field: 'size', title: 'Size' },
        { field: 'type', title: 'Type' },
        { field: 'date', title: 'Date' }
      ],
      data: [
        { id: 310000, parentId: null, name: 'Test301', type: 'mp3', size: 1024, date: '2020-08-01' },
        { id: 310050, parentId: null, name: 'Test302', type: 'mp4', size: 0, date: '2021-04-01' },
        { id: 324300, parentId: 310050, name: 'Test303', type: 'avi', size: 1024, date: '2020-03-01' },
        { id: 320045, parentId: 324300, name: 'Test304', type: 'html', size: 600, date: '2021-04-01' },
        { id: 310053, parentId: 324300, name: 'Test305', type: 'avi', size: 0, date: '2021-04-01' },
        { id: 324330, parentId: 310053, name: 'Test306', type: 'txt', size: 25, date: '2021-10-01' },
        { id: 321011, parentId: 310053, name: 'Test307', type: 'pdf', size: 512, date: '2020-01-01' },
        { id: 322200, parentId: 310053, name: 'Test308', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 323666, parentId: null, name: 'Test309', type: 'xlsx', size: 2048, date: '2020-11-01' },
        { id: 323677, parentId: 323666, name: 'Test310', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 323671, parentId: 323677, name: 'Test311', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 323672, parentId: 323677, name: 'Test312', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 323688, parentId: 323666, name: 'Test313', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 323681, parentId: 323688, name: 'Test314', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 323682, parentId: 323688, name: 'Test315', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 324555, parentId: null, name: 'Test316', type: 'avi', size: 224, date: '2020-10-01' },
        { id: 324566, parentId: 324555, name: 'Test317', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 324577, parentId: 234555, name: 'Test318', type: 'js', size: 1024, date: '2021-06-01' }
      ]
    }

    return {
      gridOptions1,
      gridOptions2,
      gridOptions3
    }
  },
  methods: {
    resultEvent1 () {
      const $grid = this.$refs.gridRef1
      if ($grid) {
        const { insertRecords, removeRecords } = $grid.getRecordset()
        const tableData = $grid.getFullData()
        VxeUI.modal.message({
          content: `新增：${insertRecords.length} 删除：${removeRecords.length} 现有：${tableData.length}`,
          status: 'success'
        })
      }
    },
    resultEvent2 () {
      const $grid = this.$refs.gridRef2
      if ($grid) {
        const { insertRecords, removeRecords } = $grid.getRecordset()
        const tableData = $grid.getFullData()
        VxeUI.modal.message({
          content: `新增：${insertRecords.length} 删除：${removeRecords.length} 现有：${tableData.length}`,
          status: 'success'
        })
      }
    },
    resultEvent3 () {
      const $grid = this.$refs.gridRef3
      if ($grid) {
        const { insertRecords, removeRecords } = $grid.getRecordset()
        const tableData = $grid.getFullData()
        VxeUI.modal.message({
          content: `新增：${insertRecords.length} 删除：${removeRecords.length} 现有：${tableData.length}`,
          status: 'success'
        })
      }
    }
  }
}
</script>
