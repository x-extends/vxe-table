<template>
  <div>
    <p class="tip">
      表单-项渲染 <grid-api-link prop="itemRender"/>，查看 <a class="link" href="https://github.com/x-extends/vxe-table/tree/master/examples/plugins/xtable/renderer">示例的源码</a><span class="red">（具体请自行实现，该示例仅供参考）</span><br>
      配置参数：<br>
      renderItem (h, renderOpts, <vxe-tooltip content="params: { data, property, $form }" enterable><i class="fa fa-question-circle"></i></vxe-tooltip>params) 项<br>
      itemVisibleMethod (<vxe-tooltip content="params: { data, property }" enterable><i class="fa fa-question-circle"></i></vxe-tooltip>params) 项可视函数<br>
      itemResetMethod (<vxe-tooltip content="params: { data, property }" enterable><i class="fa fa-question-circle"></i></vxe-tooltip>params) 项重置函数<br>
    </p>

    <vxe-grid
      border
      resizable
      export-config
      height="400"
      :toolbar="{export: true, custom: true}"
      :form-config="tableForm"
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
      tableForm: {
        items: [
          { field: 'name', title: '名称', itemRender: { name: 'FormItemInput', props: { clearable: true, placeholder: '请输入名称' } } },
          { field: 'age', title: '年龄', itemRender: { name: 'FormItemInput', props: { type: 'number', clearable: true, placeholder: '请输入年龄' } } },
          { itemRender: { name: 'input', attrs: { type: 'submit', value: '查询' } } },
          { itemRender: { name: 'input', attrs: { type: 'reset', value: '重置' } } }
        ]
      },
      tableProxy: {
        form: true,
        ajax: {
          query: ({ form }) => XEAjax.get('/api/user/list', form)
        }
      },
      demoCodes: [
        `
        // 创建一个简单的表单-输入框渲染
        VXETable.renderer.add('FormItemInput', {
          // 项显示模板
          renderItem (h, renderOpts, params) {
            const { data, property } = params
            const props = renderOpts.props || {}
            return [
              <vxe-input v-model={ data[property] } { ...{ props } }></vxe-input>
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
          :toolbar="{export: true, custom: true}"
          :form-config="tableForm"
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
              tableForm: {
                items: [
                  { field: 'name', title: '名称', itemRender: { name: 'FormItemInput', props: { clearable: true, placeholder: '请输入名称' } } },
                  { field: 'age', title: '年龄', itemRender: { name: 'FormItemInput', props: { type: 'number', clearable: true, placeholder: '请输入年龄' } } },
                  { itemRender: { name: 'input', attrs: { type: 'submit', value: '查询' } } },
                  { itemRender: { name: 'input', attrs: { type: 'reset', value: '重置' } } }
                ]
              },
              tableProxy: {
                form: true,
                ajax: {
                  query: ({ form }) => XEAjax.get('/api/user/list', form)
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
