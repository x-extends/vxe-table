<template>
  <div>
    <p>子路由 3</p>

    <vxe-table
      border
      show-overflow
      ref="tableRef"
      height="400"
      :loading="demo1.loading"
      :scroll-y="{enabled: true, gt: 0}">
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

<script lang="ts">
import Vue from 'vue'
import { VxeTableInstance } from '../../../../types'

export default Vue.extend({
  data () {
    return {
      demo1: {
        loading: false
      }
    }
  },
  methods: {
    mockList (size: number) {
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
  },
  created () {
    this.demo1.loading = true
    setTimeout(() => {
      this.demo1.loading = false
      this.$nextTick(() => {
        const $table = this.$refs.tableRef as VxeTableInstance
        if ($table) {
          $table.loadData(this.mockList(10000))
        }
      })
    }, 300)
  }
})
</script>
