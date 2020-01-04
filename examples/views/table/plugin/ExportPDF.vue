<template>
  <div>
    <p class="tip">
      具体兼容请查看 <a class="link" href="https://www.npmjs.com/package/vxe-table-plugin-export-pdf" target="_blank">vxe-table-plugin-export-pdf</a> 插件的 API<br>
      <span class="red">（注：默认是不支持中文字体的，会显示成乱码，可自行引入字体库解决）</span>
    </p>

    <vxe-toolbar custom export>
      <template v-slot:buttons>
        <vxe-button @click="exportDataEvent">导出数据</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      ref="xTable"
      height="400"
      :loading="loading"
      :export-config="tableExport"
      :data="tableData">
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="role" title="Role"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="rate" title="Rate"></vxe-table-column>
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
      loading: false,
      tableData: [],
      tableExport: {
        // 默认选中类型
        type: 'pdf',
        // 自定义类型
        types: ['pdf', 'csv', 'html', 'xml', 'txt']
      },
      demoCodes: [
        `
        <vxe-toolbar custom :export="tableExport">
          <template v-slot:buttons>
            <vxe-button @click="exportDataEvent">导出数据</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          ref="xTable"
          height="400"
          :loading="loading"
          :export-config="tableExport"
          :data="tableData">
          <vxe-table-column type="checkbox" width="60"></vxe-table-column>
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="role" title="Role"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
          <vxe-table-column field="rate" title="Rate"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              loading: false,
              tableData: [],
              tableExport: {
                // 默认选中类型
                type: 'pdf',
                // 自定义类型
                types: ['pdf', 'csv', 'html', 'xml', 'txt']
              }
            }
          },
          created () {
            this.findList()
          },
          methods: {
            findList () {
              this.loading = true
              setTimeout(() => {
                this.tableData = [
                  { name: 'name1', role: 'role1', sex: '0', age: 22, rate: 5 },
                  { name: 'name2', role: 'role2', sex: '1', age: 32, rate: 1 },
                  { name: 'name3', role: 'role3', sex: '1', age: 26, rate: 1 },
                  { name: 'name4', role: 'role4', sex: '0', age: 28, rate: 4 },
                  { name: 'name5', role: 'role5', sex: '1', age: 24, rate: 3 }
                ]
                this.loading = false
              }, 100)
            },
            exportDataEvent () {
              this.$refs.xTable.exportData({
                filename: '导出',
                type: 'pdf'
              })
            }
          }
        }
        `
      ]
    }
  },
  created () {
    this.findList()
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    findList () {
      this.loading = true
      setTimeout(() => {
        this.tableData = [
          { name: 'name1', role: 'role1', sex: '0', age: 22, rate: 5 },
          { name: 'name2', role: 'role2', sex: '1', age: 32, rate: 1 },
          { name: 'name3', role: 'role3', sex: '1', age: 26, rate: 1 },
          { name: 'name4', role: 'role4', sex: '0', age: 28, rate: 4 },
          { name: 'name5', role: 'role5', sex: '1', age: 24, rate: 3 },
          { name: 'name6', role: 'role6', sex: '1', age: 19, rate: 3 },
          { name: 'name7', role: 'role7', sex: '1', age: 18, rate: 3 },
          { name: 'name8', role: 'role8', sex: '2', age: 29, rate: 3 },
          { name: 'name9', role: 'role9', sex: '1', age: 21, rate: 3 }
        ]
        this.loading = false
      }, 100)
    },
    exportDataEvent () {
      this.$refs.xTable.exportData({
        filename: '导出',
        type: 'pdf'
      })
    }
  }
}
</script>
