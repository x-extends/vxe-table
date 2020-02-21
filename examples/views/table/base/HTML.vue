<template>
  <div>
    <p class="tip">
      设置 <table-column-api-link prop="type"/>=<table-column-api-link prop="html"/> 显示为 HTML 标签<br>
      <span class="red">（动态渲染任意 HTML 是非常危险的，很容易导致 <a class="link" href="https://zh.wikipedia.org/wiki/%E8%B7%A8%E7%B6%B2%E7%AB%99%E6%8C%87%E4%BB%A4%E7%A2%BC">XSS</a> 攻击，请确保内容是可信的）</span>
    </p>

    <vxe-table
      border
      :data="tableData">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" sortable></vxe-table-column>
      <vxe-table-column
        field="describeHtml"
        title="HTML 标签与筛选"
        type="html"
        sortable
        :filters="[{label:'包含 aa', value: 'aa'}, {label:'包含 bb', value: 'bb'}]"
        :filter-method="filterDescribeMethod"
        :sort-method="sortDescribeMethod"></vxe-table-column>
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
        { name: 'xx1', describe: '字母 aa -1', describeHtml: '<span style="color: red">字母 <span style="color: blue">aa</span> -1</span>', role: 'oo1' },
        { name: 'xx2', describe: '字母 bb -2', describeHtml: '<span style="color: blue">字母 <span style="color: green">bb</span> -2</span>', role: 'oo2' },
        { name: 'xx3', describe: '字母 cc -3', describeHtml: '<span style="color: green">字母 <span style="color: red">cc</span> -3</span>', role: 'oo3' },
        { name: 'xx4', describe: '字母 dd -4', describeHtml: '<span style="color: blue">字母 <span style="color: green">dd</span> -4</span>', role: 'oo4' }
      ],
      demoCodes: [
        `
        <vxe-table
          border
          :data="tableData">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" sortable></vxe-table-column>
          <vxe-table-column field="describeHtml" type="html" title="HTML 标签"></vxe-table-column>
          <vxe-table-column
            field="describeHtml"
            title="HTML 标签与筛选"
            type="html"
            sortable
            :filters="[{label:'包含 aa', value: 'aa'}, {label:'包含 bb', value: 'bb'}]"
            :filter-method="filterDescribeMethod"
            :sort-method="sortDescribeMethod"></vxe-table-column>
          <vxe-table-column field="role" type="html" title="HTML 标签与格式化" :formatter="formatRole"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { name: 'xx1', describe: '字母 aa -1', describeHtml: '<span style="color: red">字母 <span style="color: blue">aa</span> -1</span>', role: 'oo1' },
                { name: 'xx2', describe: '字母 bb -2', describeHtml: '<span style="color: blue">字母 <span style="color: green">bb</span> -2</span>', role: 'oo2' },
                { name: 'xx3', describe: '字母 cc -3', describeHtml: '<span style="color: green">字母 <span style="color: red">cc</span> -3</span>', role: 'oo3' },
                { name: 'xx4', describe: '字母 dd -4', describeHtml: '<span style="color: blue">字母 <span style="color: green">dd</span> -4</span>', role: 'oo4' }
              ]
            }
          },
          methods: {
            formatRole ({ cellValue }) {
              return \`<a href="https://github.com/xuliangzhan/vxe-table" class="link" target="_black" style="color: orange">链接 \${cellValue}</a>\`
            },
            sortDescribeMethod (a, b) {
              // 由于 HTML 是无法排序的，使用自定义排序
              var v1 = a.describe
              var v2 = b.describe
              return v1 < v2 ? -1 : v1 > v2 ? 1 : 0
            },
            filterDescribeMethod ({ value, row, column }) {
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
    sortDescribeMethod (a, b) {
      // 由于 HTML 是无法排序的，使用自定义排序
      const v1 = a.describe
      const v2 = b.describe
      return v1 < v2 ? -1 : v1 > v2 ? 1 : 0
    },
    filterDescribeMethod ({ value, row }) {
      return XEUtils.toString(row.html1).indexOf(value) > -1
    }
  }
}
</script>
