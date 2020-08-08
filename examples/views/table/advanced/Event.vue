<template>
  <div>
    <p class="tip">表格事件绑定，通过设置 <table-api-link prop="cell-click"/>、<table-api-link prop="cell-dblclick"/> ...等常用事件</p>

    <vxe-table
      border
      context-menu
      highlight-hover-row
      show-overflow
      resizable
      height="500"
      :data="tableData"
      @header-cell-click="headerCellClickEvent"
      @header-cell-dblclick="headerCellDBLClickEvent"
      @header-cell-context-menu="headerCellContextMenuEvent"
      @cell-click="cellClickEvent"
      @cell-dblclick="cellDBLClickEvent"
      @cell-mouseenter="cellMouseenterEvent"
      @cell-mouseleave="cellMouseleaveEvent"
      @cell-context-menu="cellContextMenuEvent"
      @scroll="scrollEvent">
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
          context-menu
          highlight-hover-row
          show-overflow
          resizable
          height="500"
          :data="tableData"
          @header-cell-click="headerCellClickEvent"
          @header-cell-dblclick="headerCellDBLClickEvent"
          @header-cell-context-menu="headerCellContextMenuEvent"
          @cell-click="cellClickEvent"
          @cell-dblclick="cellDBLClickEvent"
          @cell-mouseenter="cellMouseenterEvent"
          @cell-mouseleave="cellMouseleaveEvent"
          @cell-context-menu="cellContextMenuEvent"
          @scroll="scrollEvent">
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
            headerCellClickEvent ({ column }) {
              console.log(\`表头单元格点击\${column.title}\`)
            },
            headerCellDBLClickEvent ({ column }) {
              console.log(\`表头单元格双击\${column.title}\`)
            },
            headerCellContextMenuEvent ({ column }) {
              console.log(\`右键列 \${column.title}\`)
            },
            cellClickEvent ({ column }) {
              console.log(\`单元格点击\${column.title}\`)
            },
            cellDBLClickEvent ({ column }) {
              console.log(\`单元格双击\${column.title}\`)
            },
            cellMouseenterEvent ({ column }) {
              console.log(\`鼠标进入单元格\${column.title}\`)
            },
            cellMouseleaveEvent ({ column }) {
              console.log(\`鼠标离开单元格\${column.title}\`)
            },
            cellContextMenuEvent ({ row }) {
              console.log(\`右键行 \${row.name}\`)
            },
            scrollEvent ({ scrollTop, scrollLeft }) {
              console.log(\`滚动事件scrollTop=\${scrollTop} scrollLeft=\${scrollLeft}\`)
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
    this.tableData = window.MOCK_DATA_LIST.slice(0, 20)
  },
  methods: {
    headerCellClickEvent ({ column }) {
      console.log(`表头单元格点击${column.title}`)
    },
    headerCellDBLClickEvent ({ column }) {
      console.log(`表头单元格双击${column.title}`)
    },
    headerCellContextMenuEvent ({ column }) {
      console.log(`右键列 ${column.title}`)
    },
    cellClickEvent ({ column }) {
      console.log(`单元格点击${column.title}`)
    },
    cellDBLClickEvent ({ column }) {
      console.log(`单元格双击${column.title}`)
    },
    cellMouseenterEvent ({ column }) {
      console.log(`鼠标进入单元格${column.title}`)
    },
    cellMouseleaveEvent ({ column }) {
      console.log(`鼠标离开单元格${column.title}`)
    },
    cellContextMenuEvent ({ row }) {
      console.log(`右键行 ${row.name}`)
    },
    scrollEvent ({ scrollTop, scrollLeft }) {
      console.log(`滚动事件scrollTop=${scrollTop} scrollLeft=${scrollLeft}`)
    }
  }
}
</script>
