<template>
  <div>
    <p class="tip">
      筛选渲染 <table-column-api-link prop="filter-render"/>，查看 <a class="link" href="https://gitee.com/xuliangzhan_admin/vxe-table/tree/master/examples/plugins/table/renderer" target="_blank">示例的源码</a><span class="red">（具体请自行实现，该示例仅供参考）</span><br>
      配置参数：<br>
      className 自定义容器的 className<br>
      showFilterFooter 是否显示底部按钮<br>
      renderFilter (params: { column, columnIndex, columnIndex, $panel }) 内容<br>
      filterMethod (params: { value, option, cellValue, row, column, $table }) 筛选数据函数<br>
      filterResetMethod (params: { options, column }) 筛选重置函数<br>
      filterRecoverMethod (params: { option, column }) 筛选复原函数<br>
      $panel 对象:<br>
      &nbsp;&nbsp;<span class="orange">changeOption(event: Event | null, checked: boolean, option) 更新选项的状态</span><br>
      &nbsp;&nbsp;<span class="orange">confirmFilter(event?: Event) 确认筛选</span><br>
      &nbsp;&nbsp;<span class="orange">resetFilter(event?: Event) 清除筛选条件</span>
    </p>

    <vxe-table
      border
      height="400"
      :data="tableData">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="文本筛选" :filters="[{data: null}]" :filter-render="{name: 'FilterInput'}"></vxe-table-column>
      <vxe-table-column field="role" title="实现条件的筛选" :filters="[{data: {type: 'has', name: ''}}]" :filter-render="{name: 'FilterComplex'}"></vxe-table-column>
      <vxe-table-column field="age" title="实现内容的筛选" :filters="[{data: {vals: [], sVal: ''}}]" :filter-render="{name: 'FilterContent'}"></vxe-table-column>
      <vxe-table-column field="address" title="实现Excel复杂的筛选" sortable :filters="[{data: {vals: [], sVal: '', fMenu: '', f1Type:'', f1Val: '', fMode: 'and', f2Type: '', f2Val: ''}}]" :filter-render="{name: 'FilterExcel'}"></vxe-table-column>
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
      { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: '28', address: 'Shenzhen' },
      { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: '22', address: 'Guangzhou' },
      { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: '32', address: 'Shanghai' },
      { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: '23', address: 'Shenzhen' },
      { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: '30', address: 'Shanghai' },
      { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: '21', address: 'Shenzhen' },
      { id: 10007, name: 'Test7', role: 'Test', sex: 'Man ', age: '29', address: 'Shenzhen' },
      { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man ', age: '35', address: 'Shenzhen' }
    ])

    return {
      tableData,
      demoCodes: [
        `
        import VXETable from 'vxe-table'

        // 创建一个简单的输入框筛选
        VXETable.renderer.add('FilterInput', {
          // 筛选模板
          renderFilter (renderOpts, params) {
            return [
              <filter-input params={ params }></filter-input>
            ]
          },
          // 重置数据方法
          filterResetMethod (params) {
            const { options } = params
            options.forEach((option) => {
              option.data = ''
            })
          },
          // 重置筛选复原方法（当未点击确认时，该选项将被恢复为默认值）
          filterRecoverMethod ({ option }) {
            option.data = ''
          },
          // 筛选方法
          filterMethod (params) {
            const { option, row, column } = params
            const { data } = option
            const cellValue = row[column.property]
            if (cellValue) {
              return cellValue.indexOf(data) > -1
            }
            return false
          }
        })
        `,
        `
        <vxe-table
          border
          height="400"
          :data="tableData">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="文本筛选" :filters="[{data: null}]" :filter-render="{name: 'FilterInput'}"></vxe-table-column>
          <vxe-table-column field="role" title="实现条件的筛选" :filters="[{data: {type: 'has', name: ''}}]" :filter-render="{name: 'FilterComplex'}"></vxe-table-column>
          <vxe-table-column field="age" title="实现内容的筛选" :filters="[{data: {vals: [], sVal: ''}}]" :filter-render="{name: 'FilterContent'}"></vxe-table-column>
          <vxe-table-column field="address" title="实现Excel复杂的筛选" sortable :filters="[{data: {vals: [], sVal: '', fMenu: '', f1Type:'', f1Val: '', fMode: 'and', f2Type: '', f2Val: ''}}]" :filter-render="{name: 'FilterExcel'}"></vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, ref } from 'vue'

        export default defineComponent({
          setup  () {
            const tableData = ref([
              { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: '28', address: 'Shenzhen' },
              { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: '22', address: 'Guangzhou' },
              { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: '32', address: 'Shanghai' },
              { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: '23', address: 'Shenzhen' },
              { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: '30', address: 'Shanghai' },
              { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: '21', address: 'Shenzhen' },
              { id: 10007, name: 'Test7', role: 'Test', sex: 'Man ', age: '29', address: 'Shenzhen' },
              { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man ', age: '35', address: 'Shenzhen' }
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
