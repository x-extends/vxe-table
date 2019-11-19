<template>
  <div>
    <p class="tip">
      可编辑渲染器 <table-column-api-link prop="edit-render"/><br>
      默认支持原生的：input、textarea、select<br>
      配置参数：<br>
      autofocus 自动聚焦的类名<br>
      renderEdit (h, editRender, { row, rowIndex, $rowIndex, column, columnIndex, $columnIndex }, context) 编辑的渲染函数<br>
      renderCell (h, editRender, { row, rowIndex, $rowIndex, column, columnIndex, $columnIndex }, context) 显示的渲染函数<br>
      <span class="red">（注：实际开发中应该将业务封装成一个组件，不要把复杂的渲染逻辑写在渲染器中）</span>
    </p>

    <vxe-table
      border
      :data="tableData"
      :edit-config="{trigger: 'click', mode: 'row'}">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" :edit-render="{name: 'MyInput'}"></vxe-table-column>
      <vxe-table-column field="sex" title="sex" :edit-render="{name: 'MyInput'}"></vxe-table-column>
      <vxe-table-column field="age" title="Age" :edit-render="{name: 'MyInput'}"></vxe-table-column>
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
import '@/plugins/xtable/renderer/edit'

export default {
  data  () {
    return {
      tableData: [],
      demoCodes: [
        `
        // 创建一个简单输入框渲染器
        VXETable.renderer.add('MyInput', {
          // 可编辑激活模板
          renderEdit (h, editRender, { row, column }) {
            return [
              <input class="my-cell" text="text" value={ row[column.property] } onInput={ evnt => { row[column.property] = evnt.target.value }}/>
            ]
          },
          // 可编辑显示模板
          renderCell (h, editRender, { row, column }) {
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
          <vxe-table-column type="index" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" :edit-render="{name: 'MyInput'}"></vxe-table-column>
          <vxe-table-column field="sex" title="sex" :edit-render="{name: 'MyInput'}"></vxe-table-column>
          <vxe-table-column field="age" title="Age" :edit-render="{name: 'MyInput'}"></vxe-table-column>
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
