<template>
  <div>
    <p>具体兼容请查看 <a class="link" href="https://www.npmjs.com/package/vxe-table-plugin-iview" target="_blank">vxe-table-plugin-iview</a> 适配插件的 API</p>

    <vxe-table
      border
      resizable
      highlight-hover-row
      height="400"
      :data.sync="tableData">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Input" :filters="[{data: ''}]" :filter-render="{name: 'Input', props: {placeholder: '请输入名称'}}"></vxe-table-column>
      <vxe-table-column field="age" title="InputNumber" sortable :filters="[{data: 0}]" :filter-render="{name: 'InputNumber', props: {min: 0, max: 100}}"></vxe-table-column>
      <vxe-table-column field="role" title="AutoComplete" :filters="[{data: ''}]" :filter-render="{name: 'AutoComplete', props: {data: restaurants, filterMethod: roleFilterMethod, placeholder: '请输入角色名称'}}"></vxe-table-column>
      <vxe-table-column field="date3" title="DatePicker" :filters="[{data: []}]" :filter-render="{name: 'DatePicker', props: {type: 'daterange', rangeSeparator: '至', startPlaceholder: '开始日期', endPlaceholder: '结束日期'}}"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tableData: [],
      restaurants: ['前端', '后端', '开发', '测试'],
      demoCodes: [
        `
        <vxe-table
          border
          resizable
          highlight-hover-row
          height="400"
          :data.sync="tableData">
          <vxe-table-column type="index" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Input" :filters="[{data: null}]" :filter-render="{name: 'Input', props: {placeholder: '请输入名称'}}"></vxe-table-column>
          <vxe-table-column field="age" title="InputNumber" sortable :filters="[{data: 0}]" :filter-render="{name: 'InputNumber', props: {min: 0, max: 100}}"></vxe-table-column>
          <vxe-table-column field="role" title="AutoComplete" :filters="[{data: ''}]" :filter-render="{name: 'AutoComplete', props: {data: restaurants, filterMethod: roleFilterMethod, placeholder: '请输入角色名称'}}"></vxe-table-column>
          <vxe-table-column field="date3" title="DatePicker" :filters="[{data: []}]" :filter-render="{name: 'DatePicker', props: {type: 'daterange', rangeSeparator: '至', startPlaceholder: '开始日期', endPlaceholder: '结束日期'}}"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [],
              restaurants: ['前端', '后端', '开发', '测试']
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 100)
          },
          methods: {
            roleFilterMethod  (value, option) {
              return option.toUpperCase().indexOf((value || '').toUpperCase()) !== -1
            }
          }
        }
        `
      ]
    }
  },
  created () {
    this.tableData = window.MOCK_DATA_LIST.slice(0, 100)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    roleFilterMethod  (value, option) {
      return option.toUpperCase().indexOf((value || '').toUpperCase()) !== -1
    }
  }
}
</script>
