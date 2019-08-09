<template>
  <div>
    <p>默认的渲染器 <table-column-api-link prop="cell-render"/></p>
    <h3>配置参数：</h3>
    <p class="green">renderDefault (h, cellRender, { row, rowIndex, $rowIndex, column, columnIndex, $columnIndex }) 渲染函数</p>

    <vxe-table
      border
      :data.sync="tableData">
      <vxe-table-column type="index" width="60"></vxe-table-column>
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
import '../../../plugins/renderer/default'

export default {
  data  () {
    return {
      tableData: [],
      demoCodes: [
        `
        // 创建一个超链接渲染器
        VXETable.renderer.add('MyLink', {
          // 默认显示模板
          renderDefault (h, cellRender, params) {
            let { row, column } = params
            let { events } = cellRender
            return [
              <a class="my-link" onClick={ () => events.click(params) }>{row[column.property]}</a>
            ]
          }
        })
        `,
        `
        <vxe-table
          border
          :data.sync="tableData">
          <vxe-table-column type="index" width="60"></vxe-table-column>
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
