<template>
  <div>
    <p class="tip">
      通过 <grid-api-link prop="toolbar"/> 属性配置 <grid-api-link prop="zoom"/> 开启全屏缩放按钮或者直接调用相关方法，按 Esc 可退出全屏<br>
      还可以手动调用 <grid-api-link prop="maximize"/> 方法最大化表格、<grid-api-link prop="revert"/> 方法还原表格
    </p>

    <vxe-grid
      border
      resizable
      keep-source
      show-overflow
      show-footer
      ref="xGrid"
      height="530"
      :pager-config="tablePage"
      :proxy-config="tableProxy"
      :columns="tableColumn"
      :toolbar="tableToolbar"
      :footer-method="footerMethod">
      <template v-slot:toolbar_buttons>
        <vxe-button @click="$refs.xGrid.maximize()">表格最大化</vxe-button>
        <vxe-button @click="$refs.xGrid.revert()">表格还原</vxe-button>
        <vxe-button @click="$refs.xGrid.zoom()">切换表格最大化/还原</vxe-button>
      </template>
    </vxe-grid>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'
import XEAjax from 'xe-ajax'
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tablePage: {
        pageSize: 20,
        perfect: true
      },
      tableProxy: {
        props: {
          result: 'result', // 配置响应结果列表字段
          total: 'page.total' // 配置响应结果总页数字段
        },
        ajax: {
          query: ({ page }) => XEAjax.get(`/api/user/page/list/${page.pageSize}/${page.currentPage}`)
        }
      },
      tableToolbar: {
        perfect: true,
        refresh: true,
        zoom: true,
        custom: true,
        slots: {
          buttons: 'toolbar_buttons'
        }
      },
      tableColumn: [
        { type: 'checkbox', width: 100 },
        { type: 'seq', width: 100 },
        { field: 'name', title: 'Name', minWidth: 300 },
        { field: 'nickname', title: 'Nickname', minWidth: 300 },
        { field: 'role', title: 'Role', minWidth: 300 },
        { field: 'rate', title: 'Rate', minWidth: 300 },
        { field: 'describe', title: 'Describe', minWidth: 300 },
        { field: 'createTime', title: 'Update Date', minWidth: 300 },
        { field: 'updateTime', title: 'Create Date', minWidth: 300 }
      ],
      demoCodes: [
        `
        <vxe-grid
          border
          resizable
          keep-source
          show-overflow
          show-footer
          ref="xGrid"
          height="530"
          :pager-config="tablePage"
          :proxy-config="tableProxy"
          :columns="tableColumn"
          :toolbar="tableToolbar"
          :footer-method="footerMethod">
          <template v-slot:toolbar_buttons>
            <vxe-button @click="$refs.xGrid.maximize()">表格最大化</vxe-button>
            <vxe-button @click="$refs.xGrid.revert()">表格还原</vxe-button>
            <vxe-button @click="$refs.xGrid.zoom()">切换表格最大化/还原</vxe-button>
          </template>
        </vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              tablePage: {
                pageSize: 20,
                perfect: true
              },
              tableProxy: {
                props: {
                  result: 'result', // 配置响应结果列表字段
                  total: 'page.total' // 配置响应结果总页数字段
                },
                ajax: {
                  query: ({ page }) => XEAjax.get(\`/api/user/page/list/\${page.pageSize}/\${page.currentPage}\`)
                }
              },
              tableToolbar: {
                perfect: true,
                refresh: true,
                zoom: true,
                custom: true,
                slots: {
                  buttons: 'toolbar_buttons'
                }
              },
              tableColumn: [
                { type: 'checkbox', width: 100 },
                { type: 'seq', width: 100 },
                { field: 'name', title: 'Name', minWidth: 300 },
                { field: 'nickname', title: 'Nickname', minWidth: 300 },
                { field: 'role', title: 'Role', minWidth: 300 },
                { field: 'rate', title: 'Rate', minWidth: 300 },
                { field: 'describe', title: 'Describe', minWidth: 300 },
                { field: 'createTime', title: 'Update Date', minWidth: 300 },
                { field: 'updateTime', title: 'Create Date', minWidth: 300 }
              ]
            }
          },
          methods: {
            footerMethod ({ columns, data }) {
              const sums = []
              columns.forEach((column, columnIndex) => {
                if (columnIndex === 0) {
                  sums.push('和值')
                } else {
                  if (column.property === 'rate') {
                    sums.push(XEUtils.sum(data, column.property))
                  } else {
                    sums.push('-')
                  }
                }
              })
              // 返回一个二维数组的表尾合计
              return [sums]
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
    footerMethod ({ columns, data }) {
      const sums = []
      columns.forEach((column, columnIndex) => {
        if (columnIndex === 0) {
          sums.push('和值')
        } else {
          if (column.property === 'rate') {
            sums.push(XEUtils.sum(data, column.property))
          } else {
            sums.push('-')
          }
        }
      })
      // 返回一个二维数组的表尾合计
      return [sums]
    }
  }
}
</script>
