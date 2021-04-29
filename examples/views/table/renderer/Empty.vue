<template>
  <div>
    <p class="tip">
      空内容渲染 <table-api-link prop="empty-render"/>，查看 <a class="link" href="https://gitee.com/xuliangzhan_admin/vxe-table/tree/master/examples/plugins/table/renderer" target="_blank">示例的源码</a><span class="red">（具体请自行实现，该示例仅供参考）</span><br>
      配置参数：<br>
      renderEmpty (renderOpts, params: { $table }) 空值时显示的内容<br>
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
      <pre-code class="typescript">{{ demoCodes[0] }}</pre-code>
      <pre-code class="xml">{{ demoCodes[1] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[2] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const tableData = ref([])

    return {
      tableData,
      demoCodes: [
        `
        import VXETable from 'vxe-table'

        // 创建一个空内容渲染
        VXETable.renderer.add('NotData', {
          // 空内容模板
          renderEmpty (renderOpts, params) {
            return [
              <span>
                <img src="/vxe-table/static/other/img1.gif"/>
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
        import { defineComponent, ref } from 'vue'

        export default defineComponent({
          setup () {
            const tableData = ref([])

            return {
              tableData
            }
          }
        })
        `
      ]
    }
  }
})
</script>
