<template>
  <div>
    <p>数据代理：通过配置 <grid-api-link prop="proxy-config"/> 参数，如果配置了 <grid-api-link prop="pager-config"/> 分页，则默认读取响应结果中 page.total 和 result 属性，可以通过 <grid-api-link prop="props"/> 修改</p>
    <p>由 <grid-api-link prop="pager-config"/> 代理数据转换，只需要配置好数据源即可；非常简单就可以渲染一个表格</p>

    <vxe-grid
      border
      resizable
      height="530"
      :pager-config="{pageSize: 10}"
      :proxy-config="tableProxy"
      :select-config="{reserve: true}"
      :columns="tableColumn"></vxe-grid>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>
  </div>
</template>

<script>
import XEAjax from 'xe-ajax'
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tableProxy: {
        index: true, // 启用动态序号代理
        props: {
          result: 'result',
          total: 'page.total'
        },
        ajax: {
          query: ({ page }) => XEAjax.getJSON(`/api/user/page/list/${page.pageSize}/${page.currentPage}`)
        }
      },
      tableColumn: [
        { type: 'selection', width: 50 },
        { type: 'index', width: 60 },
        { field: 'name', title: 'Name' },
        { field: 'nickname', title: 'Nickname' },
        { field: 'role', title: 'Role' },
        { field: 'describe', title: 'Describe', showOverflow: true }
      ],
      demoCodes: [
        `
        <vxe-grid
          border
          resizable
          height="530"
          :pager-config="{pageSize: 10}"
          :proxy-config="tableProxy"
          :columns="tableColumn"></vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              tableProxy: {
                index: true, // 启用动态序号代理
                props: {
                  result: 'result',
                  total: 'page.total'
                },
                ajax: {
                  query: ({ page }) => XEAjax.getJSON(\`/api/user/page/list/\${page.pageSize}/\${page.currentPage}\`)
                }
              },
              tableColumn: [
                { type: 'selection', width: 50 },
                { type: 'index', width: 60 },
                { field: 'name', title: 'Name' },
                { field: 'nickname', title: 'Nickname' },
                { field: 'role', title: 'Role' },
                { field: 'describe', title: 'Describe', showOverflow: true }
              ]
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
  }
}
</script>
