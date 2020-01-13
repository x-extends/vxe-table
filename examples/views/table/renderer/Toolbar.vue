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
      ref="xGrid"
      height="300"
      :params="formData"
      :toolbar="{export: true, custom: true}"
      :toolbar-render="{ name: 'ToolbarInput' }"
      :proxy-config="tableProxy"
      :columns="tableColumn">
    </vxe-grid>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="javascript">{{ demoCodes[0] }}</code>
      <code class="xml">{{ demoCodes[1] }}</code>
      <code class="javascript">{{ demoCodes[2] }}</code>
      <code class="xml">{{ demoCodes[3] }}</code>
      <code class="javascript">{{ demoCodes[4] }}</code>
    </pre>
  </div>
</template>

<script>
import XEAjax from 'xe-ajax'
import hljs from 'highlight.js'

export default {
  data () {
    return {
      formData: {
        name: ''
      },
      tableColumn: [
        { type: 'seq', width: 50 },
        { field: 'name', title: 'Name' },
        { field: 'age', title: 'Age' },
        { field: 'sex', title: 'Sex' },
        { field: 'role', title: 'Role' }
      ],
      tableProxy: {
        ajax: {
          query: () => XEAjax.get('/api/user/list', this.formData)
        }
      },
      demoCodes: [
        `
        // 创建一个工具栏（仅用于简单示例，实际开发中应该封装成一个组件，不应该把复杂的渲染逻辑写在渲染器中）
        VXETable.renderer.add('ToolbarInput', {
          renderButtons (h, renderOpts, params, context) {
            return [
              <toolbar-input params={ params } context={ context }></toolbar-input>
            ]
          }
        })
        `,
        `
        <form v-if="params" @submit.prevent="searchEvent">
          <vxe-input v-model="params.name" placeholder="请输入名称" clearable></vxe-input>
          <vxe-button type="primary">搜索</vxe-button>
        </form>
        `,
        `
        export default {
          name: 'ToolbarInput',
          props: {
            params: Object,
            context: Object
          },
          methods: {
            searchEvent () {
              const { $grid } = this.context
              $grid.commitProxy('reload')
            }
          }
        }
        `,
        `
        <vxe-grid
          border
          resizable
          export-config
          ref="xGrid"
          height="300"
          :params="formData"
          :toolbar="{export: true, custom: true}"
          :toolbar-render="{ name: 'ToolbarInput' }"
          :proxy-config="tableProxy"
          :columns="tableColumn">
        </vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              formData: {
                name: ''
              },
              tableColumn: [
                { type: 'seq', width: 50 },
                { field: 'name', title: 'Name' },
                { field: 'age', title: 'Age' },
                { field: 'sex', title: 'Sex' },
                { field: 'role', title: 'Role' }
              ],
              tableProxy: {
                ajax: {
                  query: () => XEAjax.get('/api/user/list', this.formData)
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
