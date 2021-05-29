<template>
  <div>
    <p>子路由 2</p>

    <vxe-grid v-bind="gridOptions"></vxe-grid>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, nextTick } from 'vue'
import { VxeGridProps } from '../../../../types/index'

export default defineComponent({
  setup () {
    const gridOptions = reactive({
      border: true,
      height: 400,
      loading: false,
      columns: [
        { type: 'radio', width: 50 },
        { field: 'name', title: 'app.body.label.name' },
        { field: 'amount', title: 'Amount' },
        { field: 'age', title: 'Age' },
        { field: 'role', title: 'Role' }
      ],
      data: []
    } as VxeGridProps)

    nextTick(() => {
      gridOptions.loading = true
      setTimeout(() => {
        gridOptions.data = [
          { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, amount: 888, address: 'vxe-table 从入门到放弃' },
          { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, amount: 666, address: 'Guangzhou' },
          { id: 10003, name: 'Test3', role: 'PM', sex: '1', age: 32, amount: 89, address: 'Shanghai' },
          { id: 10004, name: 'Test4', role: 'Designer', sex: '0', age: 23, amount: 1000, address: 'vxe-table 从入门到放弃' },
          { id: 10005, name: 'Test5', role: 'Develop', sex: '0', age: 30, amount: 999, address: 'Shanghai' },
          { id: 10006, name: 'Test6', role: 'Designer', sex: '0', age: 21, amount: 998, address: 'vxe-table 从入门到放弃' }
        ]
        gridOptions.loading = false
      }, 300)
    })

    return {
      gridOptions
    }
  }
})
</script>
