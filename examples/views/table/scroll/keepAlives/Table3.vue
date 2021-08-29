<template>
  <div>
    <p>子路由 3</p>

    <vxe-table
      border
      show-overflow
      ref="xTable"
      height="400"
      :loading="loading">
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

<script>
export default {
  data () {
    return {
      loading: false
    }
  },
  created () {
    this.loading = true
    setTimeout(() => {
      const $table = this.$refs.xTable
      if ($table) {
        $table.loadData(this.mockList(600))
      }
      this.loading = false
    }, 300)
  },
  methods: {
    mockList (size) {
      const list = []
      for (let index = 0; index < size; index++) {
        list.push({
          name: `名称${index}`,
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
  }
}
</script>
