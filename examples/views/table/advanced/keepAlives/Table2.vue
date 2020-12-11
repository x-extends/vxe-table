<template>
  <div>
    <p>子路由 2</p>

    <vxe-table
      border
      height="400"
      :loading="demo1.loading"
      :data="demo1.tableData">
      <vxe-table-column type="radio" width="60"></vxe-table-column>
      <vxe-table-column field="role" title="Rolw"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="amount" title="Amount"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
    </vxe-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup () {
    const demo1 = reactive({
      loading: false,
      tableData: [] as any[]
    })

    demo1.loading = true
    setTimeout(() => {
      demo1.tableData = [
        { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, amount: 888, address: 'vxe-table 从入门到放弃' },
        { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, amount: 666, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: '1', age: 32, amount: 89, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: '0', age: 23, amount: 1000, address: 'vxe-table 从入门到放弃' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: '0', age: 30, amount: 999, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: '0', age: 21, amount: 998, address: 'vxe-table 从入门到放弃' }
      ]
      demo1.loading = false
    }, 500)

    return {
      demo1
    }
  }
})
</script>
