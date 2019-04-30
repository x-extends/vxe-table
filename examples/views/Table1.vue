<template>
  <div>

    <!-- <vxe-table
      height="200"
      border
      :data.sync="tableData"
      :customs.sync="customColumns">
      <vxe-table-column type="index"></vxe-table-column>
      <vxe-table-column prop="address" label="地址"></vxe-table-column>
      <vxe-table-column prop="phone" label="手机"></vxe-table-column>
      <vxe-table-column prop="name" label="名称"></vxe-table-column>
      <vxe-table-column prop="age" label="年龄"></vxe-table-column>
      <vxe-table-column prop="address" label="地址"></vxe-table-column>
    </vxe-table> -->

    <!-- <vxe-table
      height="300"
      border
      :highlight-hover-row="false"
      :headerCellClassName="headerCellClassName"
      :rowClassName="rowClassName"
      :cellClassName="cellClassName"
      :data.sync="tableData"
      :customs.sync="customColumns">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column type="selection" prop="checked" width="60"></vxe-table-column>
      <vxe-table-column prop="name" label="名称" min-width="200"></vxe-table-column>
      <vxe-table-column prop="date" label="日期" sortable min-width="200"></vxe-table-column>
      <vxe-table-column prop="age" label="年龄" sortable width="200" :filters="[{label: '30', value: 30}, {label: 28, value: 28}, {label: 27, value: 27}, {label: 26, value: 26}]" :filterMethod="filterMethod"></vxe-table-column>
      <vxe-table-column prop="sex" label="性别" width="200" :filters="[{label: '男', value: '1'}, {label: '女', value: '0'}]"></vxe-table-column>
      <vxe-table-column prop="address" label="地址" width="300" fixed="right"></vxe-table-column>
    </vxe-table> -->

    <!-- <vxe-table
      height="300"
      border
      highlight-hover-row
      :loading="loading"
      :data.sync="tableData"
      :customs.sync="customColumns">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column type="selection" prop="checked" width="60"></vxe-table-column>
      <vxe-table-column prop="name" label="名称" min-width="200"></vxe-table-column>
      <vxe-table-column prop="date" label="日期" sortable min-width="200"></vxe-table-column>
      <vxe-table-column prop="age" label="年龄" sortable width="200" :filters="[{label: '30', value: 30}, {label: 28, value: 28}, {label: 27, value: 27}, {label: 26, value: 26}]" :filterMethod="filterMethod"></vxe-table-column>
      <vxe-table-column prop="sex" label="性别" width="200" :filters="[{label: '男', value: '1'}, {label: '女', value: '0'}]"></vxe-table-column>
      <vxe-table-column prop="address" label="地址" width="300" fixed="right"></vxe-table-column>
    </vxe-table> -->

    <button @click="$refs.vTable.exportCsv()">导出</button>
    <vxe-table
      ref="vTable"
      max-height="300"
      border
      resizable
      highlight-hover-row
      :loading="loading"
      :data.sync="tableData"
      :customs.sync="customColumns"
      :context-menu="{header: {options: headerMenus}, body: {options: bodyMenus}}"
      @select-change="selectChangeEvent"
      @context-menu-link="contextMenuLinkEvent">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column type="selection" prop="checked" width="60"></vxe-table-column>
      <vxe-table-column prop="name" label="名称" min-width="200"></vxe-table-column>
      <vxe-table-column prop="date" label="日期" sortable min-width="200"></vxe-table-column>
      <vxe-table-column prop="age" label="年龄" sortable width="200" :filters="[{label: '30', value: 30}, {label: 28, value: 28}, {label: 27, value: 27}, {label: 26, value: 26}]" :filterMethod="filterMethod"></vxe-table-column>
      <vxe-table-column prop="sex" label="性别" width="200" :filters="[{label: '男', value: '1'}, {label: '女', value: '0'}]"></vxe-table-column>
      <vxe-table-column prop="address" label="地址" width="300" fixed="right"></vxe-table-column>
    </vxe-table>

    <!-- <vxe-table
      height="300"
      border
      :data.sync="tableData"
      :context-menu="{header: {options: headerMenus}, body: {options: bodyMenus}}"
      @select-change="selectChangeEvent"
      @context-menu-link="contextMenuLinkEvent">
      <vxe-table-column label="分组">
        <vxe-table-column prop="name" label="名称" min-width="200" fixed="left"></vxe-table-column>
        <vxe-table-column prop="date" label="日期" min-width="200"></vxe-table-column>
        <vxe-table-column label="分组2">
          <vxe-table-column prop="name" label="名称" min-width="200"></vxe-table-column>
          <vxe-table-column prop="date" label="日期" min-width="400"></vxe-table-column>
        </vxe-table-column>
      </vxe-table-column>
      <vxe-table-column prop="age" label="年龄" width="200"></vxe-table-column>
      <vxe-table-column label="分组3">
        <vxe-table-column prop="name" label="名称" min-width="200"></vxe-table-column>
        <vxe-table-column prop="date" label="日期" min-width="200"></vxe-table-column>
      </vxe-table-column>
      <vxe-table-column prop="sex" label="性别" width="200"></vxe-table-column>
    </vxe-table> -->

    <vxe-table
      border
      highlight-hover-row
      height="400"
      :data.sync="tableData">
      <vxe-table-column type="index" width="60" fixed="left"></vxe-table-column>
      <vxe-table-column type="radio" width="60"></vxe-table-column>
      <vxe-table-column type="selection" prop="checked" width="60"></vxe-table-column>
      <vxe-table-column prop="name" label="名称" width="400"></vxe-table-column>
      <vxe-table-column prop="age" label="年龄" width="400"></vxe-table-column>
      <vxe-table-column prop="sex" label="性别" width="400"></vxe-table-column>
      <vxe-table-column prop="rate" label="评分" width="400" :filters="[]"></vxe-table-column>
      <vxe-table-column prop="date" label="日期" width="400" sortable></vxe-table-column>
      <vxe-table-column prop="address" label="地址" width="300" fixed="right">
        <template v-slot="{ row }">
          <span>{{ row.address }}</span>
        </template>
      </vxe-table-column>
    </vxe-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      tableData: [],
      customColumns: [],
      headerMenus: [
        [
          {
            code: 'exportAll',
            name: '导出所有.cvs'
          }
        ]
      ],
      bodyMenus: [
        [
          {
            code: 'copy',
            name: '复制'
          },
          {
            code: 'paste',
            name: '粘贴'
          },
          {
            name: '更多功能',
            children: [
              {
                code: 'paste',
                name: '粘贴'
              },
              {
                code: 'paste',
                name: '粘贴'
              }
            ]
          }
        ],
        [
          {
            code: 'export',
            name: '导出行'
          },
          {
            code: 'print',
            name: '打印',
            disabled: true
          }
        ]
      ]
    }
  },
  created () {
    window.test = this
    this.loading = true
    setTimeout(() => {
      let list = window.CACHE_DATA_LIST.slice(0, 8)
      this.tableData = list
      this.loading = false
    }, 1000)
  },
  methods: {
    formatterPhone ({ cellValue }) {
      return `formatter_${cellValue}`
    },
    indexMethod ({ rowIndex }) {
      return rowIndex * 2
    },
    dblclickEvent (params) {

    },
    changeEvnet (params) {

    },
    filterMethod ({ value, row, column }) {
      return row.age === value
    },
    headerCellClassName ({ column, columnIndex }) {
      if (column.property === 'name') {
        return 'col-blue'
      }
    },
    rowClassName ({ row, rowIndex }) {
      if ([2, 3, 5, 9, 20, 21].includes(rowIndex)) {
        return 'row-green'
      }
    },
    cellClassName ({ row, rowIndex, column, columnIndex }) {
      if (column.property === 'age') {
        if (row.age >= 30) {
          return 'col-red'
        } else if (row.age === 26) {
          return 'col-orange'
        }
      }
    },
    selectChangeEvent ({ row, selection, checked }) {
      console.log(selection)
    },
    contextMenuLinkEvent (menu, event) {

    },
    colspanMethod ({ row, rowIndex, column, columnIndex }) {
      if (rowIndex % 2 === 0) {
        if (columnIndex === 4) {
          return {
            rowspan: 1,
            colspan: 2
          }
        } else if (columnIndex === 5) {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    rowspanMethod ({ row, rowIndex, column, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    }
  }
}
</script>

<style>
.vxe-table .vxe-body--row.row-green {
  background-color: #187;
  color: #fff;
}
.vxe-table .vxe-header-column.col-blue {
  background-color: #2db7f5;
  color: #fff;
}
.vxe-table .vxe-body--column.col-red {
  background-color: red;
  color: #fff;
}
.vxe-table .vxe-body--column.col-orange {
  background-color: #f60;
  color: #fff;
}
</style>
