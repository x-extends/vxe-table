<template>
  <div>
    <p class="tip">
      内容渲染 <table-column-api-link prop="content-render"/>，查看 <a class="link" href="https://github.com/x-extends/vxe-table/tree/master/examples/plugins/xtable/renderer">示例的源码</a><span class="red">（具体请自行实现，该示例仅供参考）</span><br>
      配置参数：<br>
      renderExpand (h, renderOpts, <vxe-tooltip content="params: { row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $table }" enterable><i class="fa fa-question-circle"></i></vxe-tooltip>params) 展开内容<br>
    </p>

    <vxe-table
      border
      resizable
      :empty-render="{name: 'NotData'}"
      :data="tableData">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column type="expand" width="80" :content-render="{name: 'MyExpand'}"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="javascript">{{ demoCodes[0] }}</code>
      <code class="xml">{{ demoCodes[1] }}</code>
      <code class="javascript">{{ demoCodes[2] }}</code>
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
        // 创建一个简单的展开内容渲染
        VXETable.renderer.add('MyExpand', {
          renderExpand (h, renderOpts, params) {
            const { row } = params
            return [
              <ul>
                <li>
                  <span>ID：</span>
                  <span>{ row.id }</span>
                </li>
                <li>
                  <span>Name：</span>
                  <span>{ row.name }</span>
                </li>
                <li>
                  <span>UpdateTime：</span>
                  <span>{ row.updateTime }</span>
                </li>
                <li>
                  <span>CreateTime：</span>
                  <span>{ row.createTime }</span>
                </li>
              </ul>
            ]
          }
        })
        `,
        `
        <vxe-table
          border
          resizable
          :empty-render="{name: 'NotData'}"
          :data="tableData">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column type="expand" width="80" :content-render="{name: 'MyExpand'}"></vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="sex" title="sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
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
            this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
          }
        }
        `
      ]
    }
  },
  created () {
    this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
}
</script>
