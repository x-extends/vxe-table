<template>
  <div>
    <p>右键快捷菜单，支持表头菜单、内容菜单、表尾菜单</p>
    <p>配置项 {header, body, footer}</p>

    <vxe-table
      border
      show-footer
      highlight-hover-row
      :footer-method="footerMethod"
      :data.sync="tableData"
      :context-menu="{header: {options: headerMenus}, body: {options: bodyMenus}, footer: {options: footerMenus}}"
      @context-menu-link="contextMenuLinkEvent">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column prop="name" label="Name" sortable></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
      <vxe-table-column prop="date" label="Date"></vxe-table-column>
      <vxe-table-column prop="time" label="Time"></vxe-table-column>
    </vxe-table>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'

export default {
  data () {
    return {
      tableData: [],
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
          }
        ],
        [
          {
            code: 'remove',
            name: '删除'
          },
          {
            code: 'filter',
            name: '筛选',
            children: [
              {
                code: 'clearFilter',
                name: '清除筛选'
              },
              {
                code: 'filterSelect',
                name: '按所选单元格的值筛选'
              }
            ]
          },
          {
            code: 'sort',
            name: '排序',
            children: [
              {
                code: 'clearSort',
                name: '清除排序'
              },
              {
                code: 'sortAsc',
                name: '升序'
              },
              {
                code: 'sortDesc',
                name: '倒序'
              }
            ]
          },
          {
            code: 'print',
            name: '打印',
            disabled: true
          }
        ]
      ],
      footerMenus: [
        [
          {
            code: 'clearAll',
            name: '清空数据'
          }
        ]
      ]
    }
  },
  created () {
    let list = window.CACHE_DATA_LIST.slice(0, 6)
    this.tableData = list
  },
  methods: {
    contextMenuLinkEvent (menu) {
      alert(menu.name)
    },
    footerMethod ({ columns, data }) {
      return [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '平均'
          }
          if (['age', 'rate'].includes(column.property)) {
            return XEUtils.mean(data, column.property)
          }
          return '-'
        })
      ]
    }
  }
}
</script>
