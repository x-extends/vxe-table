<template>
  <div>
    <p class="tip">
      工具栏渲染器 <grid-api-link prop="toolbar-render"/><br>
      配置参数：<br>
      renderButtons (h, renderOpts, context) 按钮列表<br>
      renderTools (h, renderOpts, context) 右侧工具列表<br>
      <span class="red">（注：实际开发中应该将业务封装成一个组件，不要把复杂的渲染逻辑写在渲染器中）</span>
    </p>

    <vxe-grid
      border
      resizable
      export-config
      ref="xGrid"
      height="300"
      :toolbar="{export: true, custom: true}"
      :toolbar-render="{ name: 'myToolbar' }"
      :columns="tableColumn"
      :data="tableData">
    </vxe-grid>

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
      tableColumn: [
        { type: 'seq', width: 50 },
        { field: 'name', title: 'Name' },
        { field: 'age', title: 'Age' },
        { field: 'address', title: 'Address' }
      ],
      demoCodes: [
        `
        VXETable.renderer.add('myToolbar', {
          renderButtons (h, renderOpts, { $grid }) {
            return [
              <vxe-button onClick={ e => $grid.print() }>打印</vxe-button>
            ]
          }
        })
        `,
        `
        <vxe-grid
          border
          resizable
          export-config
          ref="xGrid"
          height="300"
          :toolbar="{export: true, custom: true}"
          :toolbar-render="{ name: 'myToolbar' }"
          :columns="tableColumn"
          :data="tableData">
        </vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              tableData: [],
              tableColumn: [
                { type: 'seq', width: 50 },
                { field: 'name', title: 'Name' },
                { field: 'age', title: 'Age' },
                { field: 'address', title: 'Address' }
              ]
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
          }
        }
        `
      ]
    }
  },
  created () {
    this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
}
</script>
