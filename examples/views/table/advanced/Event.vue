<template>
  <div>
    <p class="tip">事件绑定</p>

    <vxe-table
      border
      height="500"
      highlight-hover-row
      show-overflow
      resizable
      :data="tableData"
      @header-cell-click="headerCellClickEvent"
      @header-cell-dblclick="headerCellDBLClickEvent"
      @cell-click="cellClickEvent"
      @cell-dblclick="cellDBLClickEvent"
      @cell-mouseenter="cellMouseenterEvent"
      @cell-mouseleave="cellMouseleaveEvent"
      @body-scroll="bodyScrollEvent">
      <vxe-table-column type="seq" title="序号" width="60" fixed="left"></vxe-table-column>
      <vxe-table-column field="name" title="Name" width="300"></vxe-table-column>
      <vxe-table-column field="role" title="Role" width="300"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" width="300"></vxe-table-column>
      <vxe-table-column field="date" title="Date" width="300"></vxe-table-column>
      <vxe-table-column field="address" title="Address" fixed="right" width="300"></vxe-table-column>
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
      tableData: [],
      demoCodes: [
        `
        <vxe-table
          border
          height="500"
          highlight-hover-row
          show-overflow
          resizable
          :data="tableData"
          @header-cell-click="headerCellClickEvent"
          @header-cell-dblclick="headerCellDBLClickEvent"
          @cell-click="cellClickEvent"
          @cell-dblclick="cellDBLClickEvent"
          @cell-mouseenter="cellMouseenterEvent"
          @cell-mouseleave="cellMouseleaveEvent"
          @body-scroll="bodyScrollEvent">
          <vxe-table-column type="seq" title="序号" width="60" fixed="left"></vxe-table-column>
          <vxe-table-column field="name" title="Name" width="300"></vxe-table-column>
          <vxe-table-column field="role" title="Role" width="300"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" width="300"></vxe-table-column>
          <vxe-table-column field="date" title="Date" width="300"></vxe-table-column>
          <vxe-table-column field="address" title="Address" fixed="right" width="300"></vxe-table-column>
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
            this.tableData = window.MOCK_DATA_LIST.slice(0, 20)
          },
          methods: {
            headerCellClickEvent ({ row, rowIndex, column, columnIndex }, event) {
              console.log(\`表头单元格点击\${column.title}\`)
            },
            headerCellDBLClickEvent ({ row, rowIndex, column, columnIndex }, event) {
              console.log(\`表头单元格双击\${column.title}\`)
            },
            cellClickEvent ({ row, rowIndex, column, columnIndex }, event) {
              console.log(\`单元格点击\${column.title}\`)
            },
            cellDBLClickEvent ({ row, rowIndex, column, columnIndex }, event) {
              console.log(\`单元格双击\${column.title}\`)
            },
            cellMouseenterEvent ({ row, rowIndex, column, columnIndex }, event) {
              console.log(\`鼠标进入单元格\${column.title}\`)
            },
            cellMouseleaveEvent ({ row, rowIndex, column, columnIndex }, event) {
              console.log(\`鼠标离开单元格\${column.title}\`)
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
  created () {
    let list = window.MOCK_DATA_LIST.slice(0, 20)
    this.tableData = list
  },
  methods: {
    headerCellClickEvent ({ row, rowIndex, column, columnIndex }, event) {
      console.log(`表头单元格点击${column.title}`)
    },
    headerCellDBLClickEvent ({ row, rowIndex, column, columnIndex }, event) {
      console.log(`表头单元格双击${column.title}`)
    },
    cellClickEvent ({ row, rowIndex, column, columnIndex }, event) {
      console.log(`单元格点击${column.title}`)
    },
    cellDBLClickEvent ({ row, rowIndex, column, columnIndex }, event) {
      console.log(`单元格双击${column.title}`)
    },
    cellMouseenterEvent ({ row, rowIndex, column, columnIndex }, event) {
      console.log(`鼠标进入单元格${column.title}`)
    },
    cellMouseleaveEvent ({ row, rowIndex, column, columnIndex }, event) {
      console.log(`鼠标离开单元格${column.title}`)
    },
    bodyScrollEvent ({ scrollTop, scrollLeft }, event) {
      console.log(`滚动事件scrollTop=${scrollTop} scrollLeft=${scrollLeft}`)
    }
  }
}
</script>
