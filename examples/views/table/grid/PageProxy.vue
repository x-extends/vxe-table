<template>
  <div>
    <p class="tip">
      数据代理<a class="link" href="https://github.com/xuliangzhan/vxe-table-demo/tree/master/vxe-table-by-vue-grid-proxy">（配置式代理项目示例）</a>：通过配置 <grid-api-link prop="proxy-config"/> 启用数据代理将不需要再主动发送请求，由表格代理增删改查的相关调用逻辑，只需要配好对应的接口即可自动渲染<br>
      通过配置 <grid-api-link prop="pager-config"/> 参数开启分页功能，对于分页场景下，如果要实现分页动态序号，可以通过 <table-api-link prop="seq-config"/>={<table-api-link prop="startIndex"/>} 属性设置起始值<br>
      分页情况下则默认读取响应结果中 page.total 和 result 属性，可以通过 <grid-api-link prop="props"/> 修改
    </p>

    <vxe-grid
      border
      resizable
      height="530"
      row-id="id"
      :pager-config="{pageSize: 10}"
      :proxy-config="tableProxy"
      :checkbox-config="{reserve: true}"
      :columns="tableColumn"></vxe-grid>

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
      tableProxy: {
        seq: true, // 启用动态序号代理（分页之后索引自动计算为当前页的起始序号）
        props: {
          result: 'result',
          total: 'page.total'
        },
        ajax: {
          // 任何支持 Promise API 的库都可以对接（fetch、jquery、axios、xe-ajax）
          query: ({ page }) => this.$ajax.get(`/api/user/page/list/${page.pageSize}/${page.currentPage}`)
        }
      },
      tableColumn: [
        { type: 'checkbox', width: 50 },
        { type: 'seq', width: 60 },
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
          row-id="id"
          :pager-config="{pageSize: 10}"
          :proxy-config="tableProxy"
          :checkbox-config="{reserve: true}"
          :columns="tableColumn"></vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              tableProxy: {
                seq: true, // 启用动态序号代理
                props: {
                  result: 'result',
                  total: 'page.total'
                },
                ajax: {
                  // 任何支持 Promise API 的库都可以对接（fetch、jquery、axios、xe-ajax）
                  query: ({ page }) => this.$ajax.get(\`/api/user/page/list/\${page.pageSize}/\${page.currentPage}\`)
                }
              },
              tableColumn: [
                { type: 'checkbox', width: 50 },
                { type: 'seq', width: 60 },
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
