<template>
  <div>
    <p class="tip">
      通过表尾来实现合计功能<br>
      <span class="red">（注：<table-api-link prop="footer-method"/> 表尾的数据都是自行生成的，该示例仅供参考）</span>
    </p>

    <vxe-grid
      border
      stripe
      resizable
      show-footer
      height="500"
      :export-config="{}"
      :toolbar="tableToolbar"
      :footer-method="footerMethod"
      :columns="tableColumn"
      :data="tableData"></vxe-grid>

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
      tableColumn: [
        { type: 'seq', width: 60 },
        { field: 'name', title: 'app.body.label.name' },
        { field: 'sex', title: 'app.body.label.sex' },
        { field: 'age', title: 'Age' },
        { field: 'rate', title: 'Rate' }
      ],
      tableToolbar: {
        export: true,
        zoom: true
      },
      tableData: [],
      demoCodes: [
        `
        <vxe-grid
          border
          stripe
          resizable
          show-footer
          height="500"
          :export-config="{}"
          :toolbar="tableToolbar"
          :footer-method="footerMethod"
          :columns="tableColumn"
          :data="tableData"></vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              tableColumn: [
                { type: 'seq', width: 60 },
                { field: 'name', title: 'app.body.label.name' },
                { field: 'sex', title: 'app.body.label.sex' },
                { field: 'age', title: 'Age' },
                { field: 'rate', title: 'Rate' }
              ],
              tableToolbar: {
                export: true,
                zoom: true
              },
              tableData: []
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 15)
          },
          methods: {
            footerMethod ({ columns, data }) {
              return [
                columns.map((column, columnIndex) => {
                  if (columnIndex === 0) {
                    return '和值'
                  }
                  if (['age', 'rate'].includes(column.property)) {
                    return XEUtils.sum(data, column.property)
                  }
                  return null
                }),
                columns.map((column, columnIndex) => {
                  if (columnIndex === 0) {
                    return '平均'
                  }
                  if (['age', 'rate'].includes(column.property)) {
                    return XEUtils.mean(data, column.property)
                  }
                  return null
                })
              ]
            }
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
  },
  methods: {
    footerMethod ({ columns, data }) {
      return [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '和值'
          }
          if (['age', 'rate'].includes(column.property)) {
            return XEUtils.sum(data, column.property)
          }
          return null
        }),
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '平均'
          }
          if (['age', 'rate'].includes(column.property)) {
            return XEUtils.mean(data, column.property)
          }
          return null
        })
      ]
    }
  }
}
</script>
