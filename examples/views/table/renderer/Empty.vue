<template>
  <div>
    <p class="tip">
      空内容渲染 <table-api-link prop="empty-render"/>，查看 <a class="link" href="https://github.com/x-extends/vxe-table/tree/master/examples/plugins/xtable/renderer">示例的源码</a><span class="red">（具体请自行实现，该示例仅供参考）</span><br>
      配置参数：<br>
      renderEmpty (h, renderOpts, <vxe-tooltip content="params: { $table }" enterable><i class="fa fa-question-circle"></i></vxe-tooltip>params) 空内容<br>
    </p>

    <vxe-table
      border
      resizable
      height="400"
      :empty-render="{name: 'NotData'}"
      :data="tableData">
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
        // 创建一个空内容渲染
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
          :empty-render="{name: 'NotData'}"
          :data="tableData">
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
