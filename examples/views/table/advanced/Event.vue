<template>
  <div>
    <p>事件绑定</p>

    <vxe-table
      border
      height="500"
      highlight-hover-row
      show-all-overflow
      :data.sync="tableData"
      @header-cell-click="headerCellClickEvent"
      @header-cell-dblclick="headerCellDBLClickEvent"
      @cell-click="cellClickEvent"
      @cell-dblclick="cellDBLClickEvent"
      @cell-mouseenter="cellMouseenterEvent"
      @cell-mouseleave="cellMouseleaveEvent"
      @body-scroll="bodyScrollEvent">
      <vxe-table-column type="index" label="序号" width="60" fixed="left"></vxe-table-column>
      <vxe-table-column prop="name" label="Name" width="300"></vxe-table-column>
      <vxe-table-column prop="role" label="Role" width="300"></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex" width="300"></vxe-table-column>
      <vxe-table-column prop="date" label="Date" width="300"></vxe-table-column>
      <vxe-table-column prop="address" label="Address" fixed="right" width="300"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">显示代码</p>

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
          show-all-overflow
          :data.sync="tableData"
          @header-cell-click="headerCellClickEvent"
          @header-cell-dblclick="headerCellDBLClickEvent"
          @cell-click="cellClickEvent"
          @cell-dblclick="cellDBLClickEvent"
          @cell-mouseenter="cellMouseenterEvent"
          @cell-mouseleave="cellMouseleaveEvent"
          @body-scroll="bodyScrollEvent">
          <vxe-table-column type="index" label="序号" width="60" fixed="left"></vxe-table-column>
          <vxe-table-column prop="name" label="Name" width="300"></vxe-table-column>
          <vxe-table-column prop="role" label="Role" width="300"></vxe-table-column>
          <vxe-table-column prop="sex" label="Sex" width="300"></vxe-table-column>
          <vxe-table-column prop="date" label="Date" width="300"></vxe-table-column>
          <vxe-table-column prop="address" label="Address" fixed="right" width="300"></vxe-table-column>
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
              console.log(\`表头单元格点击\${column.label}\`)
            },
            headerCellDBLClickEvent ({ row, rowIndex, column, columnIndex }, event) {
              console.log(\`表头单元格双击\${column.label}\`)
            },
            cellClickEvent ({ row, rowIndex, column, columnIndex }, event) {
              console.log(\`单元格点击\${column.label}\`)
            },
            cellDBLClickEvent ({ row, rowIndex, column, columnIndex }, event) {
              console.log(\`单元格双击\${column.label}\`)
            },
            cellMouseenterEvent ({ row, rowIndex, column, columnIndex }, event) {
              console.log(\`鼠标进入单元格\${column.label}\`)
            },
            cellMouseleaveEvent ({ row, rowIndex, column, columnIndex }, event) {
              console.log(\`鼠标离开单元格\${column.label}\`)
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
      console.log(`表头单元格点击${column.label}`)
    },
    headerCellDBLClickEvent ({ row, rowIndex, column, columnIndex }, event) {
      console.log(`表头单元格双击${column.label}`)
    },
    cellClickEvent ({ row, rowIndex, column, columnIndex }, event) {
      console.log(`单元格点击${column.label}`)
    },
    cellDBLClickEvent ({ row, rowIndex, column, columnIndex }, event) {
      console.log(`单元格双击${column.label}`)
    },
    cellMouseenterEvent ({ row, rowIndex, column, columnIndex }, event) {
      console.log(`鼠标进入单元格${column.label}`)
    },
    cellMouseleaveEvent ({ row, rowIndex, column, columnIndex }, event) {
      console.log(`鼠标离开单元格${column.label}`)
    },
    bodyScrollEvent ({ scrollTop, scrollLeft }, event) {
      console.log(`滚动事件scrollTop=${scrollTop} scrollLeft=${scrollLeft}`)
    }
  }
}
</script>
