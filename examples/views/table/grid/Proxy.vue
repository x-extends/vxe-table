<template>
  <div>
    <p>数据代理：通过配置 proxy 实现更加简化数据加载</p>
    <p>默认读取属性：{page: {total: 0}, result: []}</p>

    <vxe-grid
      border
      height="530"
      :page-config="{pageSize: 10}"
      :proxy-config="tableProxy"
      :columns="tableColumn"></vxe-grid>

    <p class="demo-code">显示代码</p>

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
        ajax: {
          query: ({ page }) => XEAjax.getJSON(`/api/user/page/list/${page.pageSize}/${page.currentPage}`)
        }
      },
      tableColumn: [
        { type: 'selection', width: 50 },
        { type: 'index', width: 60 },
        { prop: 'name', label: 'Name' },
        { prop: 'nickname', label: 'Nickname' },
        { prop: 'role', label: 'Role' },
        { prop: 'describe', label: 'Describe', showOverflow: true }
      ],
      demoCodes: [
        `
        <vxe-grid
          border
          height="530"
          :page-config="{pageSize: 10}"
          :proxy-config="tableProxy"
          :columns="tableColumn"></vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              tableProxy: {
                ajax: {
                  query: ({ page }) => XEAjax.getJSON(\`/api/user/page/list/\${page.pageSize}/\${page.currentPage}\`)
                }
              },
              tableColumn: [
                { type: 'selection', width: 50 },
                { type: 'index', width: 60 },
                { prop: 'name', label: 'Name' },
                { prop: 'nickname', label: 'Nickname' },
                { prop: 'role', label: 'Role' },
                { prop: 'describe', label: 'Describe', showOverflow: true }
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
