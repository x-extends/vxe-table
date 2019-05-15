<template>
  <div>
    <p>使用 vxe-grid 配置的方式渲染表格，这对一些动态渲染的场景非常有用，完全使用数据进行配置</p>

    <vxe-grid
      height="300"
      :columns="tableColumn"
      :data.sync="tableData"></vxe-grid>

    <p>分组表头</p>

    <vxe-grid
      border
      stripe
      height="300"
      :columns="tableColumn2"
      :data.sync="tableData"></vxe-grid>

    <p>表尾合计</p>

    <vxe-grid
      border
      stripe
      show-footer
      height="300"
      :footer-method="footerMethod"
      :columns="tableColumn3"
      :data.sync="tableData"
      @cell-click="cellClickEvent"></vxe-grid>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'
import XEAjax from 'xe-ajax'

export default {
  data () {
    return {
      dataConfig: {
        data: () => XEAjax.getJSON('/api')
      },
      pageConfig: {
        pageSize: 10,
        pageSizes: [10, 15, 20, 50, 100]
      },
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
          showOverflow: true
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
          prop: 'address',
          label: 'Address',
          showOverflow: true
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
          showOverflow: true
        },
        {
          prop: 'rate',
          label: 'Rate',
          fixed: 'right',
          width: 200
        }
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
