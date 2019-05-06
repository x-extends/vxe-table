<template>
  <div>
    <p>使用 vxe-table-config 配置的方式渲染表格，这对一些动态渲染的场景非常有用，完全使用数据进行配置</p>

    <vxe-table-config
      height="300"
      :columns="tableColumn"
      :data.sync="tableData"></vxe-table-config>

    <p>分组表头</p>

    <vxe-table-config
      border
      stripe
      height="300"
      :columns="tableColumn2"
      :data.sync="tableData"></vxe-table-config>

    <p>表尾合计</p>

    <vxe-table-config
      border
      stripe
      show-footer
      height="300"
      :footer-method="footerMethod"
      :columns="tableColumn3"
      :data.sync="tableData"
      @cell-click="cellClickEvent"></vxe-table-config>

    <p>快捷菜单</p>

    <vxe-table-config
      border
      stripe
      show-footer
      height="300"
      :footer-method="footerMethod"
      :columns="tableColumn3"
      :data.sync="tableData"
      :context-menu="{header: {options: headerMenus}, body: {options: bodyMenus}, footer: {options: footerMenus}}"
      @cell-click="cellClickEvent"
      @context-menu-link="contextMenuLinkEvent"></vxe-table-config>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'

export default {
  data () {
    return {
      tableColumn: [
        {
          type: 'index',
          width: 60
        },
        {
          prop: 'name',
          label: 'Name'
        },
        {
          prop: 'sex',
          label: 'Sex'
        },
        {
          prop: 'address',
          label: 'Address',
          showOverflowTooltip: true
        }
      ],
      tableColumn2: [
        {
          type: 'index',
          width: 60
        },
        {
          label: '基本信息',
          children: [
            {
              prop: 'name',
              label: 'Name'
            },
            {
              label: '其他信息',
              children: [
                {
                  prop: 'rate',
                  label: 'Rate'
                },
                {
                  prop: 'age',
                  label: 'Age'
                }
              ]
            },
            {
              prop: 'sex',
              label: 'Sex'
            }
          ]
        },
        {
          prop: 'date',
          label: 'Date'
        }
      ],
      tableColumn3: [
        {
          type: 'index',
          fixed: 'left',
          width: 60
        },
        {
          prop: 'name',
          label: 'Name',
          width: 400
        },
        {
          prop: 'age',
          label: 'Age',
          width: 300
        },
        {
          prop: 'address',
          label: 'Address',
          width: 300,
          showOverflowTooltip: true
        },
        {
          prop: 'rate',
          label: 'Rate',
          fixed: 'right',
          width: 200
        }
      ],
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
            code: 'remove',
            name: '删除'
          },
          {
            code: 'filter',
            name: '筛选'
          },
          {
            code: 'sort',
            name: '排序'
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
      ],
      tableData: []
    }
  },
  created () {
    let list = window.MOCK_DATA_LIST.slice(0, 100)
    this.tableData = list
  },
  methods: {
    cellClickEvent ({ row }) {
      console.log(row)
    },
    contextMenuLinkEvent (menu) {
      alert(menu.name)
    },
    footerMethod ({ columns, data }) {
      return [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '和值'
          }
          if (['age', 'rate'].includes(column.property)) {
            return XEUtils.sum(data, column.property)
          }
          return '-'
        })
      ]
    }
  }
}
</script>
