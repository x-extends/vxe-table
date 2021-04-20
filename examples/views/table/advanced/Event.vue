<template>
  <div>
    <p class="tip">
      表格事件绑定，通过设置 <table-api-link prop="cell-click"/>、<table-api-link prop="cell-dblclick"/> ...等常用事件<br>
      <span class="red">（注：部分特殊事件需要开启对应的参数后才能有效）</span>
    </p>

    <vxe-table
      border
      highlight-hover-row
      resizable
      height="400"
      :tooltip-config="{}"
      :menu-config="{}"
      :data="tableData"
      @header-cell-click="headerCellClickEvent"
      @header-cell-dblclick="headerCellDblclickEvent"
      @header-cell-menu="headerCellContextMenuEvent"
      @cell-click="cellClickEvent"
      @cell-dblclick="cellDBLClickEvent"
      @cell-mouseenter="cellMouseenterEvent"
      @cell-mouseleave="cellMouseleaveEvent"
      @cell-menu="cellContextMenuEvent"
      @footer-cell-click="footerCellClickEvent"
      @footer-cell-dblclick="footerCellDblclickEvent"
      @footer-cell-menu="footerCellContextMenuEvent"
      @scroll="scrollEvent">
      <vxe-table-column type="seq" title="序号" width="60" fixed="left"></vxe-table-column>
      <vxe-table-column field="name" title="Name" width="300"></vxe-table-column>
      <vxe-table-colgroup title="Role" width="300">
        <vxe-table-column field="role" title="Role" width="300"></vxe-table-column>
      </vxe-table-colgroup>
      <vxe-table-column field="sex" title="Sex" width="300"></vxe-table-column>
      <vxe-table-column field="date" title="Date" width="300"></vxe-table-column>
      <vxe-table-column field="address" title="Address" fixed="right" width="300"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { VxeTableEvents } from '../../../../types/index'

export default defineComponent({
  setup () {
    const tableData = ref([
      { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
      { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
      { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
      { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃' },
      { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
      { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: 21, address: 'vxe-table 从入门到放弃' },
      { id: 10007, name: 'Test7', role: 'Test', sex: 'Man ', age: 29, address: 'vxe-table 从入门到放弃' },
      { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man ', age: 35, address: 'vxe-table 从入门到放弃' }
    ])

    const headerCellClickEvent: VxeTableEvents.HeaderCellClick = ({ column }) => {
      console.log(`表头单元格点击${column.title}`)
    }

    const headerCellDblclickEvent: VxeTableEvents.HeaderCellDblclick = ({ column }) => {
      console.log(`表头单元格双击${column.title}`)
    }

    const headerCellContextMenuEvent: VxeTableEvents.HeaderCellMenu = ({ column }) => {
      console.log(`表头单元格右键 ${column.title}`)
    }

    const cellClickEvent: VxeTableEvents.CellClick = ({ column }) => {
      console.log(`单元格点击${column.title}`)
    }

    const cellDBLClickEvent: VxeTableEvents.CellDblclick = ({ column }) => {
      console.log(`单元格双击${column.title}`)
    }

    const cellMouseenterEvent: VxeTableEvents.CellMouseenter = ({ column }) => {
      console.log(`单元格鼠标进入${column.title}`)
    }

    const cellMouseleaveEvent: VxeTableEvents.CellMouseleave = ({ column }) => {
      console.log(`单元格鼠标离开${column.title}`)
    }

    const cellContextMenuEvent: VxeTableEvents.CellMenu = ({ row }) => {
      console.log(`单元格右键行 ${row.name}`)
    }

    const footerCellClickEvent: VxeTableEvents.FooterCellClick = ({ column }) => {
      console.log(`表尾单元格点击${column.title}`)
    }

    const footerCellDblclickEvent: VxeTableEvents.FooterCellDblclick = ({ column }) => {
      console.log(`表尾单元格双击${column.title}`)
    }

    const footerCellContextMenuEvent: VxeTableEvents.FooterCellMenu = ({ column }) => {
      console.log(`表尾单元格右键 ${column.title}`)
    }

    const scrollEvent: VxeTableEvents.Scroll = ({ scrollTop, scrollLeft }) => {
      console.log(`滚动事件scrollTop=${scrollTop} scrollLeft=${scrollLeft}`)
    }

    return {
      tableData,
      headerCellClickEvent,
      headerCellDblclickEvent,
      headerCellContextMenuEvent,
      cellClickEvent,
      cellDBLClickEvent,
      cellMouseenterEvent,
      cellMouseleaveEvent,
      cellContextMenuEvent,
      footerCellClickEvent,
      footerCellDblclickEvent,
      footerCellContextMenuEvent,
      scrollEvent,
      demoCodes: [
        `
        <vxe-table
          border
          highlight-hover-row
          resizable
          height="400"
          :tooltip-config="{}"
          :menu-config="{}"
          :data="tableData"
          @header-cell-click="headerCellClickEvent"
          @header-cell-dblclick="headerCellDblclickEvent"
          @header-cell-menu="headerCellContextMenuEvent"
          @cell-click="cellClickEvent"
          @cell-dblclick="cellDBLClickEvent"
          @cell-mouseenter="cellMouseenterEvent"
          @cell-mouseleave="cellMouseleaveEvent"
          @cell-menu="cellContextMenuEvent"
          @footer-cell-click="footerCellClickEvent"
          @footer-cell-dblclick="footerCellDblclickEvent"
          @footer-cell-menu="footerCellContextMenuEvent"
          @scroll="scrollEvent">
          <vxe-table-column type="seq" title="序号" width="60" fixed="left"></vxe-table-column>
          <vxe-table-column field="name" title="Name" width="300"></vxe-table-column>
          <vxe-table-colgroup title="Role" width="300">
            <vxe-table-column field="role" title="Role" width="300"></vxe-table-column>
          </vxe-table-colgroup>
          <vxe-table-column field="sex" title="Sex" width="300"></vxe-table-column>
          <vxe-table-column field="date" title="Date" width="300"></vxe-table-column>
          <vxe-table-column field="address" title="Address" fixed="right" width="300"></vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, ref } from 'vue'
        import { VxeTableEvents } from 'vxe-table'

        export default defineComponent({
          setup () {
            const tableData = ref([
              { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
              { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
              { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
              { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃' },
              { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
              { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: 21, address: 'vxe-table 从入门到放弃' },
              { id: 10007, name: 'Test7', role: 'Test', sex: 'Man ', age: 29, address: 'vxe-table 从入门到放弃' },
              { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man ', age: 35, address: 'vxe-table 从入门到放弃' }
            ])

            const headerCellClickEvent: VxeTableEvents.HeaderCellClick = ({ column }) => {
              console.log(\`表头单元格点击\${column.title}\`)
            }

            const headerCellDblclickEvent: VxeTableEvents.HeaderCellDblclick = ({ column }) => {
              console.log(\`表头单元格双击\${column.title}\`)
            }

            const headerCellContextMenuEvent: VxeTableEvents.HeaderCellMenu = ({ column }) => {
              console.log(\`表头单元格右键 \${column.title}\`)
            }

            const cellClickEvent: VxeTableEvents.CellClick = ({ column }) => {
              console.log(\`单元格点击\${column.title}\`)
            }

            const cellDBLClickEvent: VxeTableEvents.CellDblclick = ({ column }) => {
              console.log(\`单元格双击\${column.title}\`)
            }

            const cellMouseenterEvent: VxeTableEvents.CellMouseenter = ({ column }) => {
              console.log(\`单元格鼠标进入\${column.title}\`)
            }

            const cellMouseleaveEvent: VxeTableEvents.CellMouseleave = ({ column }) => {
              console.log(\`单元格鼠标离开\${column.title}\`)
            }

            const cellContextMenuEvent: VxeTableEvents.CellMenu = ({ row }) => {
              console.log(\`单元格右键行 \${row.name}\`)
            }

            const footerCellClickEvent: VxeTableEvents.FooterCellClick = ({ column }) => {
              console.log(\`表尾单元格点击\${column.title}\`)
            }

            const footerCellDblclickEvent: VxeTableEvents.FooterCellDblclick = ({ column }) => {
              console.log(\`表尾单元格双击\${column.title}\`)
            }

            const footerCellContextMenuEvent: VxeTableEvents.FooterCellMenu = ({ column }) => {
              console.log(\`表尾单元格右键 \${column.title}\`)
            }

            const scrollEvent: VxeTableEvents.Scroll = ({ scrollTop, scrollLeft }) => {
              console.log(\`滚动事件scrollTop=\${scrollTop} scrollLeft=\${scrollLeft}\`)
            }

            return {
              tableData,
              headerCellClickEvent,
              headerCellDblclickEvent,
              headerCellContextMenuEvent,
              cellClickEvent,
              cellDBLClickEvent,
              cellMouseenterEvent,
              cellMouseleaveEvent,
              cellContextMenuEvent,
              footerCellClickEvent,
              footerCellDblclickEvent,
              footerCellContextMenuEvent,
              scrollEvent
            }
          }
        })
        `
      ]
    }
  }
})
</script>
