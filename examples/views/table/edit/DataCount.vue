<template>
  <div>
    <p class="tip">
      通过 <table-column-api-link prop="slot"/>插槽（实时） 或者 <table-column-api-link prop="formatter"/> 格式化内容（值改变时），自动计算联动的行数据，如果是用原生输入框可以通过添加 <table-column-api-link prop="immediate"/> 启用实时运算<br>
      <span class="red">（具体请自行实现，该示例仅供参考）</span>
    </p>

    <vxe-table
      border
      resizable
      show-footer
      :data="tableData"
      :footer-method="footerMethod"
      :edit-config="{trigger: 'click', mode: 'cell'}">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="书名" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="amount" title="单价" :edit-render="{name: '$input', props: {type: 'number'}}"></vxe-table-column>
      <vxe-table-column field="number" title="数量" :edit-render="{name: '$input', props: {type: 'number'}}"></vxe-table-column>
      <vxe-table-column title="总价">
        <template v-slot="{ row }">
          <span>{{ countAmount(row) }} 元</span>
        </template>
      </vxe-table-column>
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
        { name: 'vxe-table 从入门到放弃', amount: 80, number: 5 },
        { name: 'JavaScript 权威指南', amount: 40, number: 3 },
        { name: 'Vue 入门到精通', amount: 90, number: 9 },
        { name: '深入现代 JavaScript 应用开发', amount: 60, number: 1 }
      ],
      demoCodes: [
        `
        <vxe-table
          border
          resizable
          show-footer
          :data="tableData"
          :footer-method="footerMethod"
          :edit-config="{trigger: 'click', mode: 'cell'}">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="书名" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="amount" title="单价" :edit-render="{name: '$input', props: {type: 'number'}}"></vxe-table-column>
          <vxe-table-column field="number" title="数量" :edit-render="{name: '$input', props: {type: 'number'}}"></vxe-table-column>
          <vxe-table-column title="总价">
            <template v-slot="{ row }">
              <span>{{ countAmount(row) }} 元</span>
            </template>
          </vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: []
            }
          },
          methods: {
            countAmount (row) {
              return XEUtils.multiply(row.amount, row.number)
            },
            countAllAmount (data) {
              return XEUtils.sum(data.map(row => this.countAmount(row)))
            },
            footerMethod ({ columns, data }) {
              return [
                columns.map((column, columnIndex) => {
                  if (columnIndex === 0) {
                    return '合计'
                  }
                  if (columnIndex === 3) {
                    return \`\${XEUtils.sum(data, 'number')} 本\`
                  } else if (columnIndex === 4) {
                    return \`共 \${this.countAllAmount(data)} 元\`
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
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    countAmount (row) {
      return XEUtils.multiply(row.amount, row.number)
    },
    countAllAmount (data) {
      return XEUtils.sum(data.map(row => this.countAmount(row)))
    },
    footerMethod ({ columns, data }) {
      return [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '合计'
          }
          if (columnIndex === 3) {
            return `${XEUtils.sum(data, 'number')} 本`
          } else if (columnIndex === 4) {
            return `共 ${this.countAllAmount(data)} 元`
          }
          return '-'
        })
      ]
    }
  }
}
</script>
