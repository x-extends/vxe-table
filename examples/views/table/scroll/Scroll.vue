<template>
  <div>
    <p>如果列较多请使用 <grid-api-link name="vxe-grid"/>，使渲染性能达到最优</p>
    <p>虚拟滚动只会渲染可视区域的数据，对于海量数据的性能提升非常大</p>
    <p>相关参数说明 {seq: 序号, $rowIndex: 获取渲染中的行索引, rowIndex: 获取真实的行索引, row: 获取行数据, column: 获取列配置, columnIndex: 获取真实列索引，$columnIndex:获取渲染中的列索引}</p>

    <vxe-table
      border
      highlight-hover-row
      height="300"
      :data.sync="tableData">
      <vxe-table-column type="index" width="100"></vxe-table-column>
      <vxe-table-column field="name" title="Name" sortable></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p>高级配置项</p>
    <p>参数 <table-api-link prop="scrollX"/>: {gt: 16, oSize: 4, rSize: 10},<table-api-link prop="scrollY"/>: {gt: 200, oSize: 30, rSize: 80}，当数据量过大时请调整到适合的参数可以使渲染更快</p>
    <p>数据超大情况下必须使用：<table-api-link prop="show-overflow"/>，<table-api-link prop="show-header-overflow"/> 参数以及调整好 <table-api-link prop="optimization"/> ：{scrollX,scrollY} 适合的参数可以更加流畅</p>

    <vxe-table
      border
      show-overflow
      ref="xTable"
      height="300">
      <vxe-table-column type="index" width="100"></vxe-table-column>
      <vxe-table-column field="name" title="Name" sortable></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

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
      <code class="xml">{{ demoCodes[2] }}</code>
      <code class="javascript">{{ demoCodes[3] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tableData: [],
      demoCodes: [
        `
        <vxe-table
          border
          highlight-hover-row
          height="300"
          :data.sync="tableData">
          <vxe-table-column type="index" width="100"></vxe-table-column>
          <vxe-table-column field="name" title="Name" sortable></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
          <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: []
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 200)
          }
        }
        `,
        `
        <vxe-table
          border
          show-overflow
          ref="xTable"
          height="300">
          <vxe-table-column type="index" width="100"></vxe-table-column>
          <vxe-table-column field="name" title="Name" sortable></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
          <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          created () {
            this.$nextTick(() => {
              this.$refs.xTable.reloadData(window.MOCK_DATA_LIST.slice(0, 10000))
            })
          }
        }
        `
      ]
    }
  },
  created () {
    this.tableData = window.MOCK_DATA_LIST.slice(0, 200)
    this.$nextTick(() => {
      this.$refs.xTable.reloadData(window.MOCK_DATA_LIST.slice(0, 10000))
    })
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
}
</script>
