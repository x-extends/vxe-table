<template>
  <div>
    <p>数据代理：通过配置 <grid-api-link prop="proxy-config"/> 参数，默认直接读取结果，响应结果应该为数组；可以通过 <grid-api-link prop="props"/> 修改默认值</p>
    <p>由 <grid-api-link prop="page-config"/> 代理数据转换，只需要配置好数据源即可；非常简单就可以渲染一个表格，从重复写冗余的代码中解放出来</p>

    <vxe-grid
      border
      height="530"
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
          query: () => XEAjax.getJSON('/api/user/list')
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
          :proxy-config="tableProxy"
          :columns="tableColumn"></vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              tableProxy: {
                ajax: {
                  // 任何支持 Promise API 的库都可以对接
                  query: () => XEAjax.getJSON('/api/user/list')
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
