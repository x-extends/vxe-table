<template>
  <div>
    <p class="tip">
      默认的渲染 <table-column-api-link prop="cell-render"/>，查看 <a class="link" href="https://github.com/x-extends/vxe-table/tree/master/examples/plugins/xtable/renderer">示例的源码</a><span class="red">（具体请自行实现，该示例仅供参考）</span><br>
      配置参数：<br>
      renderHeader (h, renderOpts, <vxe-tooltip content="params: { column, columnIndex, columnIndex, $rowIndex, $table }" enterable><i class="fa fa-question-circle"></i></vxe-tooltip>params) 表头<br>
      renderDefault (h, renderOpts, <vxe-tooltip content="params: { row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $table }" enterable><i class="fa fa-question-circle"></i></vxe-tooltip>params) 表内容<br>
      renderFooter (h, renderOpts, <vxe-tooltip content="params: { column, columnIndex, $columnIndex, $rowIndex, _columnIndex, items, $table }" enterable><i class="fa fa-question-circle"></i></vxe-tooltip>params) 表尾<br>
      exportMethod (<vxe-tooltip content="params: { row, column }" enterable><i class="fa fa-question-circle"></i></vxe-tooltip>params) 单元格导出函数<br>
      footerExportMethod (<vxe-tooltip content="params: { items, _columnIndex }" enterable><i class="fa fa-question-circle"></i></vxe-tooltip>params) 表尾单元格导出函数<br>
    </p>

    <vxe-table
      border
      :data="tableData">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" :cell-render="{name: 'MyLink', events: {click: linkEvent}}"></vxe-table-column>
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
  data  () {
    return {
      tableData: [],
      demoCodes: [
        `
        // 创建一个简单的超链接渲染
        VXETable.renderer.add('MyLink', {
          // 默认显示模板
          renderDefault (h, renderOpts, params) {
            let { row, column } = params
            let { events } = renderOpts
            return [
              <a class="my-link" onClick={ () => events.click(params) }>{row[column.property]}</a>
            ]
          }
        })
        `,
        `
        <vxe-table
          border
          :data="tableData">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" :cell-render="{name: 'MyLink', events: {click: linkEvent}}"></vxe-table-column>
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
          },
          methods: {
            linkEvent ({ row }) {
              console.log(row.name)
            }
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
  },
  methods: {
    linkEvent ({ row }) {
      console.log(row.name)
    }
  }
}
</script>
