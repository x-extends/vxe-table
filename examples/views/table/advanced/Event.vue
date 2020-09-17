<template>
  <div>
    <p class="tip">表格事件绑定，通过设置 <table-api-link prop="cell-click"/>、<table-api-link prop="cell-dblclick"/> ...等常用事件</p>

    <vxe-table
      border
      context-menu
      highlight-hover-row
      show-overflow
      resizable
      height="400"
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
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: 21, address: 'vxe-table 从入门到放弃' },
        { id: 10007, name: 'Test7', role: 'Test', sex: 'Man ', age: 29, address: 'vxe-table 从入门到放弃' },
        { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man ', age: 35, address: 'vxe-table 从入门到放弃' }
      ],
      demoCodes: [
        `
        <vxe-table
          border
          context-menu
          highlight-hover-row
          show-overflow
          resizable
          height="400"
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
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: 21, address: 'vxe-table 从入门到放弃' },
                { id: 10007, name: 'Test7', role: 'Test', sex: 'Man ', age: 29, address: 'vxe-table 从入门到放弃' },
                { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man ', age: 35, address: 'vxe-table 从入门到放弃' }
              ]
            }
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
