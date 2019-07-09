<template>
  <div>
    <p>虚拟滚动渲染，加载 1 万行 1 万列</p>
    <p>大数据不建议使用双向绑定的 <table-api-link name="data"/> 属性（vue 监听会大数据会短暂的卡顿），建议使用 <table-api-link prop="loadData"/>/<table-api-link prop="loadColumn"/> 函数</p>
    <p class="red">注意：如果要启用横向虚拟滚动，所有的列宽度必须一致，否则无法兼容</p>

    <vxe-grid
      border
      show-overflow
      show-header-overflow
      ref="xTable"
      height="300"
      :loading="loading"
      :select-config="{checkField: 'checked'}"
      :optimization ="{scrollY: {gt: 500, oSize: 10, rSize: 30}}">
    </vxe-grid>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  data () {
    return {
      loading: false,
      demoCodes: [
        `
        <vxe-grid
          border
          show-overflow
          show-header-overflow
          ref="xTable"
          height="300"
          :loading="loading"
          :select-config="{checkField: 'checked'}"
          :optimization ="{scrollY: {gt: 500, oSize: 10, rSize: 30}}">
        </vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              tableData: []
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
        `
      ]
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
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
}
</script>
