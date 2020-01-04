<template>
  <div>
    <p class="tip">
      <span class="orange">虚拟滚动的取舍：牺牲提前编译数据的耗时，用来换取使用时的绝对流畅</span><span class="red">（最大可以支撑 1w 列、20w 行）</span><br>
      如果列较多请使用 <grid-api-link name="vxe-grid"/>，使渲染性能达到最优，虚拟滚动只会渲染可视区域的数据，对于海量数据的性能提升非常大<br>
      数据超大情况下必须使用：<table-api-link prop="show-overflow"/>，<table-api-link prop="show-header-overflow"/> 参数<br>
    </p>

    <vxe-table
      border
      show-overflow
      highlight-hover-row
      height="300"
      :sort-config="{trigger: 'cell'}"
      :data="tableData">
      <vxe-table-column type="seq" width="100"></vxe-table-column>
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

    <p class="tip">
      手动调优，默认自动优化（<span class="red">注：默认的优化一般情况下是最流畅的，如果某些场景下需要手动调优就自行去更改参数即可，至于流不流畅取决于渲染参数</span>）<br>
      通过指定 <table-api-link prop="optimization"/> ：{<table-api-link prop="scrollX"/>:40,<table-api-link prop="scrollY"/>:200} 适合的参数可以手动调优<br>
      数据超大情况下必须使用：<table-api-link prop="show-overflow"/>，<table-api-link prop="show-header-overflow"/> 参数
    </p>

    <vxe-table
      border
      show-overflow
      ref="xTable"
      height="300"
      :sort-config="{trigger: 'cell'}"
      :optimization="{scrollX: {gt: 40}, scrollY: {gt: 200}}">
      <vxe-table-column type="seq" width="100"></vxe-table-column>
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
        | Spacebar | 翻页滚动 |
        | ctrl + Home | 滚动到顶部 |
        | ctrl + End | 滚动到底部 |
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
import XEAjax from 'xe-ajax'
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tableData: [],
      demoCodes: [
        `
        <vxe-table
          border
          show-overflow
          highlight-hover-row
          height="300"
          :sort-config="{trigger: 'cell'}"
          :data="tableData">
          <vxe-table-column type="seq" width="100"></vxe-table-column>
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
            XEAjax.mockList(600).then(data => {
              this.tableData = data
            })
          }
        }
        `,
        `
        <vxe-table
          border
          show-overflow
          ref="xTable"
          height="300"
          :sort-config="{trigger: 'cell'}"
          :optimization="{scrollX: {gt: 40}, scrollY: {gt: 200}}">
          <vxe-table-column type="seq" width="100"></vxe-table-column>
          <vxe-table-column field="name" title="Name" sortable></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
          <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          created () {
            XEAjax.mockList(1000).then(data => {
              this.$refs.xTable.reloadData(data)
            })
          }
        }
        `
      ]
    }
  },
  created () {
    XEAjax.mockList(600).then(data => {
      this.tableData = data
    })
    XEAjax.mockList(1000).then(data => {
      this.$refs.xTable.reloadData(data)
    })
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
}
</script>
