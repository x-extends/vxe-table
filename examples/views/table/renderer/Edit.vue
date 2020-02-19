<template>
  <div>
    <p class="tip">
      可编辑渲染器 <table-column-api-link prop="edit-render"/>，查看 <a class="link" href="https://github.com/xuliangzhan/vxe-table/tree/master/examples/plugins/xtable/renderer">示例的源码</a><br>
      默认支持原生的：input、textarea、select<br>
      配置参数：<br>
      autofocus 自动聚焦的类名<br>
      renderHeader (h, renderOpts, <vxe-tooltip content="{ column, columnIndex }" enterable><i class="fa fa-question-circle"></i></vxe-tooltip>params, context) 表头<br>
      renderEdit (h, renderOpts, <vxe-tooltip content="{ row, rowIndex, column, columnIndex }" enterable><i class="fa fa-question-circle"></i></vxe-tooltip>params, context) 表内容-编辑<br>
      renderCell (h, renderOpts, <vxe-tooltip content="{ row, rowIndex, column, columnIndex }" enterable><i class="fa fa-question-circle"></i></vxe-tooltip>params, context) 表内容-显示<br>
      renderFooter (h, renderOpts, <vxe-tooltip content="{ column, columnIndex, items, itemIndex }" enterable><i class="fa fa-question-circle"></i></vxe-tooltip>params, context) 表尾<br>
      editCellExportMethod (<vxe-tooltip content="{ row, column }" enterable><i class="fa fa-question-circle"></i></vxe-tooltip>params) 单元格导出函数<br>
      footerCellExportMethod (<vxe-tooltip content="{ items, itemIndex }" enterable><i class="fa fa-question-circle"></i></vxe-tooltip>params) 表尾单元格导出函数<br>
      <span class="red">（注：实际开发中应该将业务封装成一个组件，不要把复杂的渲染逻辑写在渲染器中）</span>
    </p>

    <vxe-table
      border
      :data="tableData"
      :edit-config="{trigger: 'click', mode: 'row'}">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" :edit-render="{name: 'MyInput'}"></vxe-table-column>
      <vxe-table-column field="sex" title="sex" :edit-render="{name: 'MyInput'}"></vxe-table-column>
      <vxe-table-column field="age" title="Age" :edit-render="{name: 'input', attrs: { type:'number'}}"></vxe-table-column>
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
        // 创建一个简单输入框渲染器
        VXETable.renderer.add('MyInput', {
          // 可编辑激活模板
          renderEdit (h, renderOpts, { row, column }) {
            return [
              <input class="my-cell" text="text" value={ row[column.property] } onInput={ evnt => { row[column.property] = evnt.target.value }}/>
            ]
          },
          // 可编辑显示模板
          renderCell (h, renderOpts, { row, column }) {
            return [
              <span>{ row[column.property] }</span>
            ]
          }
        })
        `,
        `
        <vxe-table
          border
          :data="tableData"
          :edit-config="{trigger: 'click', mode: 'row'}">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" :edit-render="{name: 'MyInput'}"></vxe-table-column>
          <vxe-table-column field="sex" title="sex" :edit-render="{name: 'MyInput'}"></vxe-table-column>
          <vxe-table-column field="age" title="Age" :edit-render="{name: 'input', attrs: { type:'number'}}"></vxe-table-column>
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
