<template>
  <div>
    <p class="tip">
      行的样色、单元格样式，表头的样式、表尾的样式、全部都可以完全自定义，通过设置 <table-api-link prop="cell-class-name"/>、<table-api-link prop="header-cell-class-name"/>、<table-api-link prop="row-class-name"/> ...等参数<br>
      <span class="red">（注：当自定义样式之后可能会覆盖表格的样式，比如选中行..等，记得自行处理好相关样式）</span>
    </p>

    <vxe-table
      border
      class="mytable-style"
      :header-cell-class-name="headerCellClassName"
      :row-class-name="rowClassName"
      :cell-class-name="cellClassName"
      :data="tableData">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="attr1" title="Attr1"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
      <code class="scss">{{ demoCodes[2] }}</code>
    </pre>

    <p class="tip">通过 <table-api-link prop="cell-click"/> 事件点击改变颜色</p>

    <vxe-table
      border
      class="mytable-style"
      :cell-class-name="cellClassName2"
      :data="tableData"
      @cell-click="cellClickEvent2">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="attr1" title="Attr1"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[3] }}</code>
      <code class="javascript">{{ demoCodes[4] }}</code>
      <code class="scss">{{ demoCodes[5] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: 21, address: 'Shenzhen' },
        { id: 10007, name: 'Test7', role: 'Test', sex: 'Man ', age: 29, address: 'Shenzhen' },
        { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man ', age: 35, address: 'Shenzhen' }
      ],
      selectRow: null,
      selectColumn: null,
      demoCodes: [
        `
        <vxe-table
          border
          class="mytable-style"
          :header-cell-class-name="headerCellClassName"
          :row-class-name="rowClassName"
          :cell-class-name="cellClassName"
          :data="tableData">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
          <vxe-table-column field="attr1" title="Attr1"></vxe-table-column>
          <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
             tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: 21, address: 'Shenzhen' },
                { id: 10007, name: 'Test7', role: 'Test', sex: 'Man ', age: 29, address: 'Shenzhen' },
                { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man ', age: 35, address: 'Shenzhen' }
              ],
              selectRow: null,
              selectColumn: null
            }
          },
          methods: {
            headerCellClassName ({ column, columnIndex }) {
              if (column.property === 'name') {
                return 'col-blue'
              }
            },
            rowClassName ({ row, rowIndex }) {
              if ([2, 3, 5].includes(rowIndex)) {
                return 'row-green'
              }
            },
            cellClassName ({ row, rowIndex, column, columnIndex }) {
              if (column.property === 'sex') {
                if (row.sex >= '1') {
                  return 'col-red'
                } else if (row.age === 26) {
                  return 'col-orange'
                }
              }
            }
          }
        }
        `,
        `
        .mytable-style .vxe-body--row.row-green {
          background-color: #187;
          color: #fff;
        }
        .mytable-style .vxe-header--column.col-blue {
          background-color: #2db7f5;
          color: #fff;
        }
        .mytable-style .vxe-body--column.col-red {
          background-color: red;
          color: #fff;
        }
        .mytable-style .vxe-body--column.col-orange {
          background-color: #f60;
          color: #fff;
        }
        `,
        `
        <vxe-table
          border
          class="mytable-style"
          :cell-class-name="cellClassName"
          :data="tableData"
          @cell-click="cellClickEvent">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
          <vxe-table-column field="attr1" title="Attr1"></vxe-table-column>
          <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: 21, address: 'Shenzhen' },
                { id: 10007, name: 'Test7', role: 'Test', sex: 'Man ', age: 29, address: 'Shenzhen' },
                { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man ', age: 35, address: 'Shenzhen' }
              ],
              selectRow: null,
              selectColumn: null
            }
          },
          methods: {
            cellClassName ({ row, column }) {
              if (row === this.selectRow & column === this.selectColumn) {
                return 'col-orange'
              }
            },
            cellClickEvent ({ row, column }) {
              this.selectRow = row
              this.selectColumn = column
            }
          }
        }
        `,
        `
        .mytable-style.vxe-table .vxe-body--row.row-green {
          background-color: #187;
          color: #fff;
        }
        .mytable-style.vxe-table .vxe-header--column.col-blue {
          background-color: #2db7f5;
          color: #fff;
        }
        .mytable-style.vxe-table .vxe-body--column.col-red {
          background-color: red;
          color: #fff;
        }
        .mytable-style.vxe-table .vxe-body--column.col-orange {
          background-color: #f60;
          color: #fff;
        }
        `
      ]
    }
  },
  created () {
    this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    headerCellClassName ({ column }) {
      if (column.property === 'name') {
        return 'col-blue'
      }
    },
    rowClassName ({ rowIndex }) {
      if ([2, 3, 5].includes(rowIndex)) {
        return 'row-green'
      }
    },
    cellClassName ({ row, column }) {
      if (column.property === 'sex') {
        if (row.sex >= '1') {
          return 'col-red'
        } else if (row.age === 26) {
          return 'col-orange'
        }
      }
    },
    cellClassName2 ({ row, column }) {
      if (row === this.selectRow & column === this.selectColumn) {
        return 'col-orange'
      }
    },
    cellClickEvent2 ({ row, column }) {
      this.selectRow = row
      this.selectColumn = column
    }
  }
}
</script>

<style>
.mytable-style.vxe-table .vxe-body--row.row-green {
  background-color: #187;
  color: #fff;
}
.mytable-style.vxe-table .vxe-header--column.col-blue {
  background-color: #2db7f5;
  color: #fff;
}
.mytable-style.vxe-table .vxe-body--column.col-red {
  background-color: red;
  color: #fff;
}
.mytable-style.vxe-table .vxe-body--column.col-orange {
  background-color: #f60;
  color: #fff;
}
</style>
