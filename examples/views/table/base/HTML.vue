<template>
  <div>
    <p class="tip">设置 <table-column-api-link prop="type"/>=<table-column-api-link prop="html"/> 显示为 HTML 标签</p>

    <vxe-table
      border
      :data="tableData">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" sortable></vxe-table-column>
      <vxe-table-column field="html1" type="html" title="HTML 标签"></vxe-table-column>
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
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tableData: [
        { name: 'xx1', html1: '<span style="color: red">HTML片段1</span>', role: 'oo1' },
        { name: 'xx2', html1: '<span style="color: blue">HTML片段2</span>', role: 'oo2' },
        { name: 'xx3', html1: '<span style="color: green">HTML片段3</span>', role: 'oo3' }
      ],
      demoCodes: [
        `
        <vxe-table
          border
          height="500"
          :data="tableData">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" sortable></vxe-table-column>
          <vxe-table-column field="html1" type="html" title="HTML 标签"></vxe-table-column>
          <vxe-table-column field="html2" type="html" title="HTML 标签与格式化" :formatter="formatRole"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { name: 'xx1', html1: '<span style="color: red">HTML片段1</span>', role: 'oo1' },
                { name: 'xx2', html1: '<span style="color: blue">HTML片段2</span>', role: 'oo2' },
                { name: 'xx3', html1: '<span style="color: green">HTML片段3</span>', role: 'oo3' }
              ]
            }
          },
          methods: {
            formatRole ({ cellValue }) {
              return \`<a href="https://github.com/xuliangzhan/vxe-table" class="link" target="_black" style="color: orange">\${cellValue}</a>\`
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
      return `<a href="https://github.com/xuliangzhan/vxe-table" class="link" target="_black" style="color: orange">${cellValue}</a>`
    }
  }
}
</script>
