<template>
  <div>
    <p class="tip">行分组，例如：按日期分组显示<span class="red">（具体请自行实现，该示例仅供参考）</span></p>

    <vxe-table
      resizable
      ref="xTable"
      height="300"
      :tree-config="{}"
      :data="tableData">
      <vxe-table-column field="name" title="Name" tree-node></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="date14" title="Date"></vxe-table-column>
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
      tableData: [],
      demoCodes: [
        `
        <vxe-table
          resizable
          ref="xTable"
          height="300"
          :tree-config="{}"
          :data="tableData">
          <vxe-table-column field="name" title="Name" tree-node></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
          <vxe-table-column field="date14" title="Date"></vxe-table-column>
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
            this.loadGroup()
          },
          methods: {
            loadGroup () {
              const list = window.MOCK_DATA_LIST.slice(0, 50)
              const result = []
              XEUtils.each(XEUtils.groupBy(list, 'date14'), (childs, key) => {
                result.push({
                  name: key,
                  children: childs
                })
              })
              this.tableData = result
            }
          }
        }
        `
      ]
    }
  },
  created () {
    this.loadGroup()
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    loadGroup () {
      const list = window.MOCK_DATA_LIST.slice(0, 50)
      const result = []
      XEUtils.each(XEUtils.groupBy(list, 'date14'), (childs, key) => {
        result.push({
          name: key,
          children: childs
        })
      })
      this.tableData = result
    }
  }
}
</script>
