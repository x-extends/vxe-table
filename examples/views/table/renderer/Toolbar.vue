<template>
  <div>
    <p class="tip">
      工具栏渲染器 <grid-api-link prop="toolbar-render"/><br>
      配置参数：<br>
      renderButtons (h, renderOpts, params, context) 按钮列表<br>
      renderTools (h, renderOpts, params, context) 右侧工具列表<br>
      <span class="red">（注：实际开发中应该将业务封装成一个组件，不要把复杂的渲染逻辑写在渲染器中）</span>
    </p>

    <vxe-grid
      border
      resizable
      export-config
      height="400"
      :toolbar="tableToolbar"
      :toolbar-render="{ name: 'ToolbarInput' }"
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
        data: {
          name: ''
        }
      },
      tableProxy: {
        ajax: {
          query: () => XEAjax.get('/api/user/list', this.tableToolbar.data)
        }
      },
      demoCodes: [
        `
        // 创建一个表单（仅用于简单示例，实际开发中应该封装成一个组件，不应该把复杂的渲染逻辑写在渲染器中）
        VXETable.renderer.add('FormSimple', {
          renderForm (h, renderOpts, params, context) {
            return [
              <form-simple formData={ params.data } params={ params } context={ context }></form-simple>
            ]
          }
        })
        `,
        `
        <vxe-grid
          border
          resizable
          export-config
          height="400"
          :toolbar="tableToolbar"
          :toolbar-render="{ name: 'ToolbarInput' }"
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
                data: {
                  name: ''
                }
              },
              tableProxy: {
                ajax: {
                  query: () => XEAjax.get('/api/user/list', this.tableToolbar.data)
                }
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
  }
}
</script>
