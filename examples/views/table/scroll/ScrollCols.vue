<template>
  <div>
    <p>虚拟滚动渲染，加载 1 万行 1 万列</p>
    <p>大数据不建议使用双向绑定的 <table-api-link name="data"/> 属性（vue 监听会大数据会短暂的卡顿），建议使用 <table-api-link prop="loadData"/>/<table-api-link prop="loadColumn"/> 函数</p>

    <vxe-grid
      border
      resizable
      show-overflow
      show-header-overflow
      ref="xTable"
      height="300"
      :loading="loading"
      :select-config="{checkProp: 'checked'}"
      :optimization ="{scrollX: {gt: 20, oSize: 4, rSize: 10}, scrollY: {gt: 500, oSize: 10, rSize: 30}}">
    </vxe-grid>
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
      let tableData = window.MOCK_DATA_LIST.slice(0, 10000)
      let tableColumn = window.MOCK_COLUMN_LIST.slice(0, 10000).map(item => Object.assign({}, item, { fixed: undefined }))
      // 阻断 vue 对大数组的双向绑定，大数据性能翻倍提升
      if (this.$refs.xTable) {
        this.$refs.xTable.loadColumn(tableColumn)
        this.$refs.xTable.loadData(tableData)
      }
      this.loading = false
    }, 500)
  }
}
</script>
