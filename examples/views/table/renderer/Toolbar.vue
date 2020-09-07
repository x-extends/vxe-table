<template>
  <div>
    <p class="tip">
      工具栏-按钮渲染 <grid-api-link prop="buttonRender"/>，查看 <a class="link" href="https://github.com/x-extends/vxe-table/tree/master/examples/plugins/xtable/renderer">示例的源码</a><span class="red">（具体请自行实现，该示例仅供参考）</span><br>
      配置参数：<br>
      renderButton (h, renderOpts, <vxe-tooltip content="params: { button, $table }" enterable><i class="fa fa-question-circle"></i></vxe-tooltip>params) 按钮<br>
    </p>

    <vxe-grid
      border
      resizable
      export-config
      ref="xGrid"
      height="400"
      :toolbar="tableToolbar"
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
          { name: '刷新', code: 'reload', icon: 'fa fa-refresh' },
          { code: 'query', buttonRender: { name: 'ToolbarButtonRefresh', events: { click: this.btnClickEvent } } }
        ]
      },
      tableProxy: {
        ajax: {
          query: () => XEAjax.get('/api/user/list')
        }
      },
      demoCodes: [
        `
        // 创建一个简单的工具栏-按钮渲染
        VXETable.renderer.add('ToolbarButtonRefresh', {
          renderButton (h, renderOpts, params) {
            const { events } = renderOpts
            const { button } = params
            return [
              <vxe-button onClick={ e => { events.click(button) } }>自定义按钮</vxe-button>
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
          height="400"
          :toolbar="tableToolbar"
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
                  { name: '刷新', code: 'reload', icon: 'fa fa-refresh' },
                  { code: 'query', buttonRender: { name: 'ToolbarButtonRefresh', events: { click: this.btnClickEvent } } }
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
            btnClickEvent (button) {
              switch (button.code) {
                case 'query':
                  this.$refs.xGrid.commitProxy(button.code)
                  break
              }
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
    btnClickEvent (button) {
      switch (button.code) {
        case 'query':
          this.$refs.xGrid.commitProxy(button.code)
          break
      }
    }
  }
}
</script>
