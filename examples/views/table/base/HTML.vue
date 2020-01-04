<template>
  <div>
    <p class="tip">设置 <table-column-api-link prop="type"/>=<table-column-api-link prop="html"/> 显示为 HTML 标签</p>

    <vxe-table
      border
      :data="tableData">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" sortable></vxe-table-column>
      <vxe-table-column field="html1" type="html" title="HTML 标签" sortable></vxe-table-column>
      <vxe-table-column
        field="html1"
        title="HTML 标签与筛选"
        type="html"
        sortable
        :filters="[{label:'包含 aa', value: 'aa'}, {label:'包含 bb', value: 'bb'}]"
        :filter-method="filterMethod"></vxe-table-column>
      <vxe-table-column field="role" type="html" title="HTML 标签与格式化" :formatter="formatRole"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tableData: [
        { name: 'xx1', html1: '<span style="color: red">字母 <span style="color: blue">aa</span> -1</span>', role: 'oo1' },
        { name: 'xx2', html1: '<span style="color: blue">字母 <span style="color: green">bb</span> -2</span>', role: 'oo2' },
        { name: 'xx3', html1: '<span style="color: green">字母 <span style="color: red">cc</span> -3</span>', role: 'oo3' }
      ],
      demoCodes: [
        `
        <vxe-table
          border
          :data="tableData">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" sortable></vxe-table-column>
          <vxe-table-column field="html1" type="html" title="HTML 标签" sortable></vxe-table-column>
          <vxe-table-column
            field="html1"
            title="HTML 标签与筛选"
            type="html"
            sortable
            :filters="[{label:'包含 aa', value: 'aa'}, {label:'包含 bb', value: 'bb'}]"
            :filter-method="filterMethod"></vxe-table-column>
          <vxe-table-column field="role" type="html" title="HTML 标签与格式化" :formatter="formatRole"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { name: 'xx1', html1: '<span style="color: red">字母 <span style="color: blue">aa</span> -1</span>', role: 'oo1' },
                { name: 'xx2', html1: '<span style="color: blue">字母 <span style="color: green">bb</span> -2</span>', role: 'oo2' },
                { name: 'xx3', html1: '<span style="color: green">字母 <span style="color: red">cc</span> -3</span>', role: 'oo3' }
              ]
            }
          },
          methods: {
            formatRole ({ cellValue }) {
              return \`<a href="https://github.com/xuliangzhan/vxe-table" class="link" target="_black" style="color: orange">链接 \${cellValue}</a>\`
            },
            filterMethod ({ value, row, column }) {
              return XEUtils.toString(row.html1).indexOf(value) > -1
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
  },
  methods: {
    formatRole ({ cellValue }) {
      return `<a href="https://github.com/xuliangzhan/vxe-table" class="link" target="_black" style="color: orange">链接 ${cellValue}</a>`
    },
    filterMethod ({ value, row, column }) {
      return XEUtils.toString(row.html1).indexOf(value) > -1
    }
  }
}
</script>
