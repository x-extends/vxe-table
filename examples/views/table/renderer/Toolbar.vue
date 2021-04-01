<template>
  <div>
    <p class="tip">
      工具栏-按钮渲染 <grid-api-link prop="buttonRender"/>，查看 <a class="link" href="https://gitee.com/xuliangzhan_admin/vxe-table/tree/v3/examples/plugins/table/renderer">示例的源码</a><span class="red">（具体请自行实现，该示例仅供参考）</span><br>
      配置参数：<br>
      renderToolbarButton (h, renderOpts, <vxe-tooltip content="params: { button, $table }" enterable><i class="fa fa-question-circle"></i></vxe-tooltip>params) 按钮<br>
    </p>

    <vxe-grid
      border
      resizable
      ref="xGrid"
      height="400"
      :export-config="{}"
      :toolbar-config="tableToolbar"
      :proxy-config="tableProxy"
      :columns="tableColumn">
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
import XEAjax from 'xe-ajax'
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tableColumn: [
        { type: 'seq', width: 50 },
        { field: 'name', title: 'Name' },
        { field: 'age', title: 'Age' },
        { field: 'sex', title: 'Sex' },
        { field: 'role', title: 'Role' }
      ],
      tableToolbar: {
        export: true,
        custom: true,
        buttons: [
          { name: '自定义1', code: 'custom1', icon: 'fa fa-bell' },
          { buttonRender: { name: 'ToolbarButtonDownload', events: { click: this.btnDownEvent } } }
        ]
      },
      tableProxy: {
        ajax: {
          query: () => XEAjax.get('/api/user/list')
        }
      },
      demoCodes: [
        `
        // 创建一个简单的工具栏-左侧按钮渲染
        VXETable.renderer.add('ToolbarButtonDownload', {
          renderToolbarButton (h, renderOpts, params) {
            const { events = {} } = renderOpts
            const { button } = params
            return [
              <vxe-button circle icon="fa fa-cloud-download" onClick={
                () => {
                  events.click(button)
                }
              }></vxe-button>
            ]
          }
        })
        `,
        `
        <vxe-grid
          border
          resizable
          ref="xGrid"
          height="400"
          :export-config="{}"
          :toolbar-config="tableToolbar"
          :proxy-config="tableProxy"
          :columns="tableColumn">
        </vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              tableColumn: [
                { type: 'seq', width: 50 },
                { field: 'name', title: 'Name' },
                { field: 'age', title: 'Age' },
                { field: 'sex', title: 'Sex' },
                { field: 'role', title: 'Role' }
              ],
              tableToolbar: {
                export: true,
                custom: true,
                buttons: [
                  { name: '自定义1', code: 'custom1', icon: 'fa fa-bell' },
                  { buttonRender: { name: 'ToolbarButtonDownload', events: { click: this.btnDownEvent } } }
                ]
              },
              tableProxy: {
                ajax: {
                  query: () => XEAjax.get('/api/user/list')
                }
              }
            }
          },
          methods: {
            btnDownEvent () {
              this.$refs.xGrid.exportData()
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
    btnDownEvent () {
      this.$refs.xGrid.exportData()
    }
  }
}
</script>
