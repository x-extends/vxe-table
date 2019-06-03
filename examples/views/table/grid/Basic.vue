<template>
  <div>
    <p>使用 <grid-api-link name="vxe-grid"/> 配置的方式渲染表格，这对一些动态渲染的场景非常有用，完全使用数据进行配置</p>

    <vxe-grid
      border
      height="300"
      :columns="tableColumn"
      :data.sync="tableData"></vxe-grid>

    <p class="demo-code">显示代码</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p>分组表头、底部合计</p>

    <vxe-grid
      border
      stripe
      show-footer
      height="500"
      :footer-method="footerMethod"
      :columns="tableColumn2"
      :data.sync="tableData"></vxe-grid>

    <p class="demo-code">显示代码</p>

    <pre>
      <code class="xml">{{ demoCodes[2] }}</code>
      <code class="javascript">{{ demoCodes[3] }}</code>
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
        { type: 'index', width: 50 },
        { prop: 'name', label: 'Name' },
        { prop: 'sex', label: 'Sex', showHeaderOverflow: true },
        { prop: 'address', label: 'Address', showOverflow: true }
      ],
      tableColumn2: [
        { type: 'index', width: 50 },
        {
          label: '基本信息',
          children: [
            { prop: 'name', label: 'Name' },
            {
              label: '其他信息',
              children: [
                { prop: 'rate', label: 'Rate' },
                { prop: 'age', label: 'Age' }
              ]
            },
            { prop: 'sex', label: 'Sex' }
          ]
        },
        { prop: 'address', label: 'Address', showOverflow: true }
      ],
      tableData: [],
      demoCodes: [
        `
        <vxe-grid
          border
          height="300"
          :columns="tableColumn"
          :data.sync="tableData"></vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              tableColumn: [
                { type: 'index', width: 50 },
                { prop: 'name', label: 'Name' },
                { prop: 'sex', label: 'Sex', showHeaderOverflow: true },
                { prop: 'address', label: 'Address', showOverflow: true }
              ]
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 100)
          }
        }
        `,
        `
        <vxe-grid
          border
          stripe
          show-footer
          height="500"
          :footer-method="footerMethod"
          :columns="tableColumn2"
          :data.sync="tableData"></vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              tableColumn2: [
                { type: 'index', width: 50 },
                {
                  label: '基本信息',
                  children: [
                    { prop: 'name', label: 'Name' },
                    {
                      label: '其他信息',
                      children: [
                        { prop: 'rate', label: 'Rate' },
                        { prop: 'age', label: 'Age' }
                      ]
                    },
                    { prop: 'sex', label: 'Sex' }
                  ]
                },
                { prop: 'address', label: 'Address', showOverflow: true }
              ]
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 100)
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
                  return '-'
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
    let list = window.MOCK_DATA_LIST.slice(0, 100)
    this.tableData = list
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
          return '-'
        })
      ]
    }
  }
}
</script>
