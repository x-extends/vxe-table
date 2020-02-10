<template>
  <div>
    <p class="tip">
      空内容渲染器 <table-api-link prop="empty-render"/><br>
      配置参数：<br>
      renderEmpty (h, renderOpts, params, context) 空内容<br>
      <span class="green">参数说明 params = {}</span><br>
      <span class="red">（注：实际开发中应该将业务封装成一个组件，不要把复杂的渲染逻辑写在渲染器中）</span>
    </p>

    <vxe-table
      border
      resizable
      height="400"
      :empty-render="{name: 'NotData'}">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="javascript">{{ demoCodes[0] }}</code>
      <code class="xml">{{ demoCodes[1] }}</code>
      <code class="javascript">{{ demoCodes[2] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tableData: [],
      demoCodes: [
        `
        // 创建一个空内容渲染器
        VXETable.renderer.add('NotData', {
          // 空内容模板
          renderEmpty (h, renderOpts) {
            return [
              <span>
                <img src="static/other/img1.gif"/>
                <p>亲，没有更多数据了！</p>
              </span>
            ]
          }
        })
        `,
        `
        <vxe-table
          border
          resizable
          height="400"
          :empty-render="{name: 'NotData'}">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="sex" title="sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: []
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
