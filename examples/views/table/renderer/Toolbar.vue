<template>
  <div>
    <p class="tip">
      工具栏-左侧按钮 <grid-api-link prop="buttonRender"/>，查看 <a class="link" href="https://gitee.com/xuliangzhan_admin/vxe-table/tree/v3/examples/plugins/table/renderer" target="_blank">示例的源码</a><span class="red">（具体请自行实现，该示例仅供参考）</span><br>
      配置参数：<br>
      renderToolbarButton (h, renderOpts: any, params: { button, $table }) 左侧按钮<br>
      renderToolbarTool (h, renderOpts: any, params: { tool, $table }) 右侧工具<br>
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
      <pre-code class="javascript">{{ demoCodes[0] }}</pre-code>
      <pre-code class="xml">{{ demoCodes[1] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[2] }}</pre-code>
    </pre>
  </div>
</template>

<script>
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
          { name: '自定义1', code: 'custom1', icon: 'fa fa-bell' },
          { buttonRender: { name: 'ToolbarButtonDownload', events: { click: this.btnDownEvent } } }
        ],
        tools: [
          { name: '自定义2', code: 'custom2', icon: 'fa fa-bug' },
          { toolRender: { name: 'ToolbarToolPrint' } }
        ]
      },
      tableProxy: {
        ajax: {
          query: () => {
            return new Promise(resolve => {
              const list = [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'Shenzhen' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'Shenzhen' },
                { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'Shenzhen' },
                { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'Shenzhen' }
              ]
              resolve(list)
            })
          }
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

        // 创建一个简单的工具栏-右侧工具渲染
        VXETable.renderer.add('ToolbarToolPrint', {
          renderToolbarTool (h, renderOpts, params) {
            const { $table } = params
            return [
              <vxe-button circle icon="fa fa-print" onClick={
                () => {
                  $table.print()
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
                  { name: '刷新', code: 'reload', icon: 'fa fa-refresh' },
                  { name: '自定义1', code: 'custom1', icon: 'fa fa-bell' },
                  { buttonRender: { name: 'ToolbarButtonDownload', events: { click: this.btnDownEvent } } }
                ],
                tools: [
                  { name: '自定义2', code: 'custom2', icon: 'fa fa-bug' },
                  { toolRender: { name: 'ToolbarToolPrint' } }
                ]
              },
              tableProxy: {
                ajax: {
                  query: () => {
                    return new Promise(resolve => {
                      const list = [
                        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
                        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'Shenzhen' },
                        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
                        { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'Shenzhen' },
                        { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'Shenzhen' },
                        { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'Shenzhen' }
                      ]
                      resolve(list)
                    })
                  }
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
  methods: {
    btnDownEvent () {
      this.$refs.xGrid.exportData()
    }
  }
}
</script>
