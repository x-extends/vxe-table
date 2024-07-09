<template>
  <div>
    <p>子路由 1</p>

    <vxe-table
      border
      show-overflow
      height="400"
      ref="tableRef"
      :loading="demo1.loading"
      :scroll-y="{enabled: true, gt: 0}">
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column field="name" title="Name"></vxe-column>
      <vxe-column field="sex" title="Sex"></vxe-column>
      <vxe-column field="address" title="Address" show-overflow></vxe-column>
    </vxe-table>
  </div>
</template>

<script lang="tsx">
import { defineComponent, reactive, ref, nextTick } from 'vue'
import { VxeTableInstance } from '../../../../types'

export default defineComponent({
  setup () {
    const tableRef = ref<VxeTableInstance>()

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
      loading: false
    })

    demo1.loading = true
    setTimeout(() => {
      demo1.loading = false
      nextTick(() => {
        const $table = tableRef.value
        if ($table) {
          $table.loadData(mockList(10000))
        }
      })
    }, 300)

    return {
      demo1,
      tableRef
    }
  }
})
</script>
