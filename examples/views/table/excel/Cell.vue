<template>
  <div>
    <p>使用 vxe-excel 渲染 Excel 表格</p>

    <vxe-excel
      max-height="600"
      :columns="columns"
      :data.sync="tableData">
    </vxe-excel>

    <p>调用代码</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  data () {
    let columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P']
    return {
      columns: [
        {
          type: 'index',
          width: 50,
          fixed: 'left',
          align: 'center',
          headerAlign: 'center'
        }
      ].concat(columns.map(name => {
        return {
          prop: name.toLowerCase(),
          label: name,
          width: 76,
          headerAlign: 'center',
          editRender: {
            name: 'input'
          }
        }
      })),
      tableData: Array.from(new Array(20)).map(() => {
        let item = {}
        columns.forEach(name => {
          item[name.toLowerCase()] = ''
        })
        return item
      }),
      demoCodes: [
        `
        <vxe-excel
          max-height="600"
          :columns="columns"
          :data.sync="tableData">
        </vxe-excel
        `
      ]
    }
  },
  mounted () {
    this.$el.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
}
</script>
