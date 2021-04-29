<template>
  <div>
    <p class="tip">
      可编辑渲染 <table-column-api-link prop="edit-render"/>，查看 <a class="link" href="https://gitee.com/xuliangzhan_admin/vxe-table/tree/master/examples/plugins/table/renderer" target="_blank">示例的源码</a><span class="red">（具体请自行实现，该示例仅供参考）</span><br>
      配置参数：<br>
      autofocus 自动聚焦的类名<br>
      renderHeader (renderOpts, params: { column, columnIndex, columnIndex, $rowIndex, $table }) 表头单元格显示内容<br>
      renderEdit (renderOpts, params: { row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $table }) 单元格-编辑内容<br>
      renderCell (renderOpts, params: { row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $table }) 单元格-显示内容<br>
      renderFooter (renderOpts, params: { column, columnIndex, $columnIndex, $rowIndex, _columnIndex, items, $table }) 表尾单元格显示内容<br>
      exportMethod (params: { row, column }) 单元格导出函数<br>
      footerExportMethod (params: { items, _columnIndex }) 表尾单元格导出函数<br>
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
      <pre-code class="typescript">{{ demoCodes[0] }}</pre-code>
      <pre-code class="xml">{{ demoCodes[1] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[2] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup  () {
    const tableData = ref([
      { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
      { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
      { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
      { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
      { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
      { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: 21, address: 'Shenzhen' },
      { id: 10007, name: 'Test7', role: 'Test', sex: 'Man ', age: 29, address: 'Shenzhen' },
      { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man ', age: 35, address: 'Shenzhen' }
    ])

    return {
      tableData,
      demoCodes: [
        `
        import VXETable from 'vxe-table'

        // 创建一个简单输入框渲染
        VXETable.renderer.add('MyInput', {
          // 可编辑激活模板
          renderEdit (renderOpts, params) {
            let { row, column } = params
            return [
              <input class="my-cell" text="text" v-model={ row[column.property] } />
            ]
          },
          // 可编辑显示模板
          renderCell (renderOpts, params) {
            let { row, column } = params
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
        import { defineComponent, ref } from 'vue'

        export default defineComponent({
          setup  () {
            const tableData = ref([
              { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
              { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
              { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
              { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
              { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
              { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: 21, address: 'Shenzhen' },
              { id: 10007, name: 'Test7', role: 'Test', sex: 'Man ', age: 29, address: 'Shenzhen' },
              { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man ', age: 35, address: 'Shenzhen' }
            ])
    
            return {
              tableData
            }
          }
        })
        `
      ]
    }
  }
})
</script>
