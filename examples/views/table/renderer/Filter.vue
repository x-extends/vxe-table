<template>
  <div>
    <p class="tip">
      筛选渲染 <table-column-api-link prop="filter-render"/>，查看 <a class="link" href="https://github.com/x-extends/vxe-table/tree/master/examples/plugins/xtable/renderer">示例的源码</a><span class="red">（具体请自行实现，该示例仅供参考）</span><br>
      配置参数：<br>
      className 自定义容器的 className<br>
      isFooter 是否显示底部按钮<br>
      renderFilter (h, renderOpts, <vxe-tooltip content="{ column, columnIndex, columnIndex, $panel }" enterable><i class="fa fa-question-circle"></i></vxe-tooltip>params) 内容<br>
      filterMethod (<vxe-tooltip content="{ option, row, column }" enterable><i class="fa fa-question-circle"></i></vxe-tooltip>params) 筛选数据函数<br>
      filterResetMethod (<vxe-tooltip content="{ options, column }" enterable><i class="fa fa-question-circle"></i></vxe-tooltip>params) 筛选重置函数<br>
      $panel 对象:<br>
      &nbsp;&nbsp;<span class="orange">changeOption(event, checked, option) 更新选项的状态</span><br>
      &nbsp;&nbsp;<span class="orange">confirmFilter() 确认筛选</span><br>
      &nbsp;&nbsp;<span class="orange">resetFilter() 清除筛选条件</span>
    </p>

    <vxe-table
      border
      height="400"
      :data="tableData">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="nickname" title="Nickname" :filters="[{data: null}]" :filter-render="{name: 'FilterInput'}"></vxe-table-column>
      <vxe-table-column field="name" title="实现条件的筛选" :filters="[{data: {type: 'has', name: ''}}]" :filter-render="{name: 'FilterComplex'}"></vxe-table-column>
      <vxe-table-column field="age" title="实现内容的筛选" :filters="[{data: {vals: [], sVal: ''}}]" :filter-render="{name: 'FilterContent'}"></vxe-table-column>
      <vxe-table-column field="role" title="实现Excel复杂的筛选" sortable :filters="[{data: {vals: [], sVal: '', fMenu: '', f1Type:'', f1Val: '', fMode: 'and', f2Type: '', f2Val: ''}}]" :filter-render="{name: 'FilterExcel'}"></vxe-table-column>
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
        // 创建一个简单的输入框筛选
        VXETable.renderer.add('FilterInput', {
          // 筛选模板
          renderFilter (h, renderOpts, params) {
            return [
              <filter-input params={ params }></filter-input>
            ]
          },
          // 筛选方法
          filterMethod ({ option, row, column }) {
            const { data } = option
            const cellValue = XEUtils.get(row, column.property)
            return XEUtils.toString(cellValue).indexOf(data) > -1
          }
        })
        `,
        `
        <vxe-table
          border
          height="400"
          :data="tableData">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="nickname" title="Nickname" :filters="[{data: null}]" :filter-render="{name: 'FilterInput'}"></vxe-table-column>
          <vxe-table-column field="name" title="实现条件的筛选" :filters="[{data: {type: 'has', name: ''}}]" :filter-render="{name: 'FilterComplex'}"></vxe-table-column>
          <vxe-table-column field="age" title="实现内容的筛选" :filters="[{data: {vals: [], sVal: ''}}]" :filter-render="{name: 'FilterContent'}"></vxe-table-column>
          <vxe-table-column field="role" title="实现Excel复杂的筛选" sortable :filters="[{data: {vals: [], sVal: '', fMenu: '', f1Type:'', f1Val: '', fMode: 'and', f2Type: '', f2Val: ''}}]" :filter-render="{name: 'FilterExcel'}"></vxe-table-column>
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
            this.tableData = window.MOCK_DATA_LIST.slice(0, 15)
          }
        }
        `
      ]
    }
  },
  created () {
    this.tableData = window.MOCK_DATA_LIST.slice(0, 15)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
}
</script>
