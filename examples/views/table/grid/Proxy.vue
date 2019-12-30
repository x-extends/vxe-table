<template>
  <div>
    <p class="tip">数据代理<a class="link" href="https://github.com/xuliangzhan/vxe-table-demo/tree/master/vxe-table-by-vue-grid-proxy">（配置式代理项目示例）</a>：通过配置 <grid-api-link prop="proxy-config"/> 参数，默认直接读取结果，响应结果应该为数组；可以通过 <grid-api-link prop="props"/> 修改默认值，由 <grid-api-link prop="pager-config"/> 代理数据转换，只需要配置好数据源即可；非常简单就可以渲染一个表格，从重复写冗余的代码中解放出来</p>

    <vxe-grid
      border
      resizable
      height="530"
      :proxy-config="tableProxy"
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
        ajax: {
          // 任何支持 Promise API 的库都可以对接（fetch、jquery、axios、xe-ajax）
          query: () => XEAjax.get('/api/user/list')
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
          :proxy-config="tableProxy"
          :columns="tableColumn"></vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              tableProxy: {
                ajax: {
                  // 任何支持 Promise API 的库都可以对接（fetch、jquery、axios、xe-ajax）
                  query: () => XEAjax.get('/api/user/list')
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
