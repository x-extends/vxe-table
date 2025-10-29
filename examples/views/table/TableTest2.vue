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
  type: string
  size: number
  date: string
  children?: RowVO[]
}

const gridOptions = reactive<VxeGridProps<RowVO>>({
  border: true,
  treeConfig: {
    rowField: 'id',
    childrenField: 'children',
    showLine: true
  },
  columns: [
    { type: 'seq', width: 70 },
    { field: 'name', title: 'Name', minWidth: 300, treeNode: true },
    { field: 'size', title: 'Size' },
    { field: 'type', title: 'Type' },
    { field: 'date', title: 'Date' }
  ],
  data: [
    { id: 10000, name: 'Test1', type: 'mp3', size: 1024, date: '2020-08-01' },
    {
      id: 10050,
      name: 'Test2',
      type: 'mp4',
      size: 0,
      date: '2021-04-01',
      children: [
        {
          id: 24300,
          name: 'Test3',
          type: 'avi',
          size: 1024,
          date: '2020-03-01',
          children: [
            { id: 20045, name: 'Test4', type: 'html', size: 600, date: '2021-04-01' },
            {
              id: 10053,
              name: 'Test5',
              type: 'avi',
              size: 0,
              date: '2021-04-01',
              children: [
                { id: 24330, name: 'Test6', type: 'txt', size: 25, date: '2021-10-01' },
                { id: 21011, name: 'Test7', type: 'pdf', size: 512, date: '2020-01-01' },
                { id: 22200, name: 'Test8', type: 'js', size: 1024, date: '2021-06-01' }]
            }
          ]
        }]
    },
    {
      id: 23666,
      name: 'Test9',
      type: 'xlsx',
      size: 2048,
      date: '2020-11-01',
      children: [
        {
          id: 23677,
          name: 'Test10',
          type: 'js',
          size: 1024,
          date: '2021-06-01',
          children: [
            { id: 23671, name: 'Test11', type: 'js', size: 1024, date: '2021-06-01' },
            { id: 23672, name: 'Test12', type: 'js', size: 1024, date: '2021-06-01' }]
        },
        {
          id: 23688,
          name: 'Test13',
          type: 'js',
          size: 1024,
          date: '2021-06-01',
          children: [
            { id: 23681, name: 'Test14', type: 'js', size: 1024, date: '2021-06-01' },
            { id: 23682, name: 'Test15', type: 'js', size: 1024, date: '2021-06-01' }]
        }
      ]
    },
    {
      id: 24555,
      name: 'Test16',
      type: 'avi',
      size: 224,
      date: '2020-10-01',
      children: [
        { id: 24566, name: 'Test17', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 24577, name: 'Test18', type: 'js', size: 1024, date: '2021-06-01' }]
    }
  ]
})
</script>
