<template>
  <div>
    <p class="tip">
      具体兼容请查看 <a class="link" href="https://github.com/x-extends/vxe-table-plugin-export-pdf" target="_blank">vxe-table-plugin-export-pdf</a> 插件的 API<span class="red">（建议使用后端导出）</span><br>
      <span class="red">（注：该示例仅供参考，默认是不支持中文字体的，可以通过设置 <a class="link" href="https://github.com/x-extends/vxe-table-plugin-export-pdf#font" target="_blank">字体</a> 解决）</span>
    </p>

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
      <vxe-table-column field="orderNo" title="Order NO"></vxe-table-column>
      <vxe-table-column field="productNo" title="Product NO"></vxe-table-column>
      <vxe-table-column field="productName" title="Product name"></vxe-table-column>
      <vxe-table-column field="realNum" title="Real quantity"></vxe-table-column>
      <vxe-table-column field="plannedNum" title="Planned quantity"></vxe-table-column>
      <vxe-table-column field="describe" title="Describe"></vxe-table-column>
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
          <vxe-table-column field="orderNo" title="Order NO"></vxe-table-column>
          <vxe-table-column field="productNo" title="Product NO"></vxe-table-column>
          <vxe-table-column field="productName" title="Product name"></vxe-table-column>
          <vxe-table-column field="realNum" title="Real quantity"></vxe-table-column>
          <vxe-table-column field="plannedNum" title="Planned quantity"></vxe-table-column>
          <vxe-table-column field="describe" title="Describe"></vxe-table-column>
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
                  { orderNo: 'X02514645652', productNo: 'SX001', productName: 'XXX', realNum: 34, plannedNum: 20, describe: '' },
                  { orderNo: 'X02456765765', productNo: 'Sk001', productName: 'Mouse', realNum: 64, plannedNum: 80, describe: 'Account paid' },
                  { orderNo: 'X05672556765', productNo: 'SX002', productName: 'Keyboard', realNum: 127, plannedNum: 90, describe: '' }
                ]
                this.loading = false
              }, 100)
            },
            exportDataEvent () {
              this.$refs.xTable.exportData({
                filename: 'Order details',
                sheetName: 'Order details ( X02514645652 )',
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
          { orderNo: 'X02514645652', productNo: 'SX001', productName: 'XXX', realNum: 34, plannedNum: 20, describe: '' },
          { orderNo: 'X02456765765', productNo: 'Sk001', productName: 'Mouse', realNum: 64, plannedNum: 80, describe: 'Account paid' },
          { orderNo: 'X05672556765', productNo: 'SX002', productName: 'Keyboard', realNum: 127, plannedNum: 90, describe: '' }
        ]
        this.loading = false
      }, 100)
    },
    exportDataEvent () {
      this.$refs.xTable.exportData({
        filename: 'Order details',
        sheetName: 'Order details ( X02514645652 )',
        type: 'pdf'
      })
    }
  }
}
</script>
