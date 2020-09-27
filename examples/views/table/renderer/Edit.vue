<template>
  <div>
    <p class="tip">
      可编辑渲染 <table-column-api-link prop="edit-render"/>，查看 <a class="link" href="https://gitee.com/xuliangzhan_admin/vxe-table/tree/v3/examples/plugins/xtable/renderer">示例的源码</a><span class="red">（具体请自行实现，该示例仅供参考）</span><br>
      配置参数：<br>
      autofocus 自动聚焦的类名<br>
      renderHeader (h, renderOpts, <vxe-tooltip content="params: { column, columnIndex, columnIndex, $rowIndex, $table }" enterable><i class="fa fa-question-circle"></i></vxe-tooltip>params) 表头<br>
      renderEdit (h, renderOpts, <vxe-tooltip content="params: { row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $table }" enterable><i class="fa fa-question-circle"></i></vxe-tooltip>params) 表内容-编辑<br>
      renderCell (h, renderOpts, <vxe-tooltip content="params: { row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $table }" enterable><i class="fa fa-question-circle"></i></vxe-tooltip>params) 表内容-显示<br>
      renderFooter (h, renderOpts, <vxe-tooltip content="params: { column, columnIndex, $columnIndex, $rowIndex, _columnIndex, items, $table }" enterable><i class="fa fa-question-circle"></i></vxe-tooltip>params) 表尾<br>
      exportMethod (<vxe-tooltip content="params: { row, column }" enterable><i class="fa fa-question-circle"></i></vxe-tooltip>params) 单元格导出函数<br>
      footerExportMethod (<vxe-tooltip content="params: { items, _columnIndex }" enterable><i class="fa fa-question-circle"></i></vxe-tooltip>params) 表尾单元格导出函数<br>
    </p>

    <vxe-table
      border
      show-overflow
      :data="tableData"
      :edit-config="{trigger: 'click', mode: 'row'}">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="简单输入框" :edit-render="{name: 'MyInput'}"></vxe-table-column>
      <vxe-table-column field="role" title="下拉表格" :edit-render="{name: 'EditDownTable'}"></vxe-table-column>
      <vxe-table-column field="sex" title="弹窗表格" :edit-render="{name: 'EditPopupModal'}"></vxe-table-column>
      <vxe-table-column field="address" title="复杂渲染" :edit-render="{name: 'EditDownModal'}"></vxe-table-column>
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
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: 21, address: 'Shenzhen' },
        { id: 10007, name: 'Test7', role: 'Test', sex: 'Man ', age: 29, address: 'Shenzhen' },
        { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man ', age: 35, address: 'Shenzhen' }
      ],
      demoCodes: [
        `
        // 创建一个简单输入框渲染
        VXETable.renderer.add('MyInput', {
          // 可编辑激活模板
          renderEdit (h, renderOpts, { row, column }) {
            return [
              <input class="my-cell" text="text" v-model={ row[column.property] } />
            ]
          },
          // 可编辑显示模板
          renderCell (h, renderOpts, { row, column }) {
            return [
              <span>{ row[column.property] }</span>
            ]
          },
          // 导出模板，例如导出插槽中自定义的内容
          exportMethod (params) {
            const { row, column } = params
            return '自定义内容'
          }
        })
        `,
        `
        <vxe-table
          border
          show-overflow
          :data="tableData"
          :edit-config="{trigger: 'click', mode: 'row'}">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="简单输入框" :edit-render="{name: 'MyInput'}"></vxe-table-column>
          <vxe-table-column field="role" title="下拉表格" :edit-render="{name: 'EditDownTable'}"></vxe-table-column>
          <vxe-table-column field="sex" title="弹窗表格" :edit-render="{name: 'EditPopupModal'}"></vxe-table-column>
          <vxe-table-column field="address" title="复杂渲染" :edit-render="{name: 'EditDownModal'}"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: 21, address: 'Shenzhen' },
                { id: 10007, name: 'Test7', role: 'Test', sex: 'Man ', age: 29, address: 'Shenzhen' },
                { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man ', age: 35, address: 'Shenzhen' }
              ]
            }
          }
        }
        `
      ]
    }
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
}
</script>
