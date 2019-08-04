<template>
  <div>
    <p>虚拟滚动渲染，加载 10 万行 1 万列，左右固定列</p>
    <p>大数据不建议使用双向绑定的 <table-api-link name="data"/> 属性（vue 监听会大数据会短暂的卡顿），建议使用 <table-api-link prop="loadData"/>/<table-api-link prop="loadColumn"/> 函数</p>
    <p>对于多选 type=<table-column-api-link prop="selection"/> 当数据量海量时应该绑定 <table-api-link prop="checkField"/> 属性渲染速度更快</p>
    <p>数据超大情况下必须使用：<table-api-link prop="show-overflow"/>，<table-api-link prop="show-header-overflow"/> 参数以及调整好 <table-api-link prop="optimization"/> ：{scrollX,scrollY} 适合的参数可以更加流畅</p>
    <p class="red">注意：如果要启用横向虚拟滚动，所有的列宽度必须一致，否则无法兼容</p>

    <vxe-grid
      border
      show-overflow
      show-header-overflow
      highlight-hover-row
      highlight-current-row
      ref="xTable"
      height="600"
      :loading="loading"
      :select-config="{checkField: 'checked'}"
      :optimization ="{scrollY: {gt: 500, oSize: 20, rSize: 60}}">
    </vxe-grid>

    <pre>
      <code>
        | Arrow Up ↑ | 匀速向上滚动数据 |
        | Arrow Down ↓ | 匀速向下滚动数据 |
        | Arrow Left ← | 匀速向左滚动数据 |
        | Arrow Right → | 匀速向右滚动数据 |
      </code>
    </pre>

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
          highlight-hover-row
          highlight-current-row
          ref="xTable"
          height="600"
          :loading="loading"
          :select-config="{checkField: 'checked'}"
          :optimization ="{scrollY: {gt: 500, oSize: 20, rSize: 60}}">
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
              let tableData = window.MOCK_DATA_LIST.slice(0, 100000)
              let tableColumn = window.MOCK_COLUMN_LIST.slice(0, 10000)
              // 阻断 vue 对大数组的双向绑定，大数据性能翻倍提升
              if (this.$refs.xTable) {
                this.$refs.xTable.loadColumn(tableColumn)
                this.$refs.xTable.loadData(tableData)
              }
              this.loading = false
            }, 300)
          }
        }
        `
      ]
    }
  },
  created () {
    this.loading = true
    setTimeout(() => {
      let tableData = window.MOCK_DATA_LIST.slice(0, 100000)
      let tableColumn = window.MOCK_COLUMN_LIST.slice(0, 10000)
      // 阻断 vue 对大数组的双向绑定，大数据性能翻倍提升
      if (this.$refs.xTable) {
        this.$refs.xTable.loadColumn(tableColumn)
        this.$refs.xTable.loadData(tableData)
      }
      this.loading = false
    }, 300)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
}
</script>
