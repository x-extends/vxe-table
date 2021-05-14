<template>
  <div>
    <p>子路由 3</p>

    <vxe-table
      border
      show-overflow
      height="400"
      :loading="demo1.loading"
      :data="demo1.tableData">
      <vxe-column type="checkbox" width="60"></vxe-column>
      <vxe-column field="name" title="Name"></vxe-column>
      <vxe-column field="sex" title="Sex"></vxe-column>
      <vxe-column field="age" title="Age"></vxe-column>
      <vxe-column field="num" title="Num"></vxe-column>
      <vxe-column field="num2" title="Num2"></vxe-column>
      <vxe-column field="rate" title="Rate"></vxe-column>
    </vxe-table>
  </div>
</template>

<script lang="tsx">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup () {
    const mockList = (size: number) => {
      const list: any[] = []
      for (let index = 0; index < size; index++) {
        list.push({
          name: `名称${index}`,
          role: `角色${index}`,
          sex: '0',
          num: 123,
          age: 18,
          num2: 234,
          rate: 3,
          address: 'shenzhen'
        })
      }
      return list
    }

    const demo1 = reactive({
      loading: false,
      tableData: [] as any[]
    })

    demo1.loading = true
    setTimeout(() => {
      demo1.tableData = mockList(600)
      demo1.loading = false
    }, 300)

    return {
      demo1
    }
  }
})
</script>
