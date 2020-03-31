<template>
  <div>
    <h1>{{ $t('app.aside.nav.formats') }}</h1>
    <p class="tip">你可以很简单的将单元格的格式化函数注册成全局可复用，通过 <table-column-api-link prop="formatter"/> 调用</p>
    <vxe-table
      resizable
      highlight-current-row
      highlight-hover-row
      highlight-current-column
      :data="tableData">
      <vxe-table-column field="name" title="app.api.title.prop" min-width="280" tree-node></vxe-table-column>
      <vxe-table-column field="desc" title="app.api.title.desc" min-width="200"></vxe-table-column>
      <vxe-table-column field="type" title="app.api.title.type" min-width="140"></vxe-table-column>
      <vxe-table-column field="enum" title="app.api.title.enum" min-width="150"></vxe-table-column>
      <vxe-table-column field="defVal" title="app.api.title.defVal" min-width="160"></vxe-table-column>
    </vxe-table>
    <h2>示例</h2>
    <pre>
      <code class="javascript">{{ demoCodes[0] }}</code>
      <code class="html">{{ demoCodes[1] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tableData: [
        {
          name: 'add(code, callback)',
          desc: '添加一个',
          version: '',
          type: '',
          enum: '',
          defVal: 'code, callback',
          list: []
        },
        {
          name: 'mixin(map)',
          desc: '添加多个',
          version: '',
          type: '',
          enum: '',
          defVal: 'map',
          list: []
        },
        {
          name: 'delete(code)',
          desc: '删除',
          version: '',
          type: '',
          enum: '',
          defVal: 'name',
          list: []
        }
      ],
      demoCodes: [
        `
        <vxe-table
          border
          :data="tableData">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="num" title="默认两位小数" formatter="myAmount"></vxe-table-column>
          <vxe-table-column field="num" title="保留3位小数" :formatter="['myAmount', 3]"></vxe-table-column>
        </vxe-table>
        `,
        `
        // 格式金额，默认2位数
        VXETable.formats.add('myAmount', ({ cellValue }, digits) => {
          return XEUtils.commafy(cellValue, { digits: digits || 2 })
        })

        export default {
          data () {
            return {
              tableData: []
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
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
  }
}
</script>
