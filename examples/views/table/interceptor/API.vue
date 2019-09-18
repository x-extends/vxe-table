<template>
  <div>
    <h2><h2>Event interceptor 事件拦截器</h2></h2>
    <p class="tip">通过内置拦截器可以处理表格事件行为与第三方组件的兼容性；比如这些插件 <a class="link" href="https://www.npmjs.com/package/vxe-table-plugin-element" target="_blank">vxe-table-plugin-element</a></p>
    <vxe-table
      resizable
      highlight-current-row
      highlight-hover-row
      highlight-current-column
      :data="tableData">
      <vxe-table-column field="name" title="app.api.title.prop" min-width="280" tree-node></vxe-table-column>
      <vxe-table-column field="desc" title="app.api.title.desc" min-width="200"></vxe-table-column>
      <vxe-table-column field="type" title="app.api.title.type" min-width="140"></vxe-table-column>
      <vxe-table-column field="enum" title="app.api.title.enum" min-width="150"></vxe-table-column>
      <vxe-table-column field="defVal" title="app.api.title.defVal" min-width="160"></vxe-table-column>
    </vxe-table>
    <h3>type 可选值</h3>
    <p class="orange">event.clear_filter（清除激活单元格之前触发，允许返回 false 阻止默认行为）</p>
    <p class="orange">event.clear_actived（清除筛选面板之前触发，允许返回 false 阻止默认行为）</p>
    <p class="orange">event.keydown（键盘按下之前触发，允许返回 false 阻止默认行为）</p>
    <p class="orange">event.show_menu（显示快捷菜单之前触发，允许返回 false 阻止默认行为）</p>
    <h3>示例</h3>
    <p>例子：比如自定义渲染某个组件后，由于弹出层面板不在单元格之内，按键事件的交互行为存在冲突，对于这些场景就很有用了</p>
    <pre>
      <code class="javascript">{{ demoCodes[0] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tableData: [
        {
          name: 'add(type, callback)',
          desc: '添加',
          type: '',
          enum: '',
          defVal: 'type, callback',
          list: []
        },
        {
          name: 'mixin(map)',
          desc: '混合多个',
          type: '',
          enum: '',
          defVal: 'map',
          list: []
        },
        {
          name: 'delete(type)',
          desc: '删除',
          type: '',
          enum: '',
          defVal: 'name',
          list: []
        }
      ],
      demoCodes: [
        `
        VXETable.interceptor.add('event.clear_actived', (params, event) => {
          // 比如点击了某个组件的弹出层面板之后，此时被激活单元格不应该被自动关闭，通过返回 false 可以阻止默认的行为。
          if (event.target.className.indexOf('other-popper') > -1) {
            return false
          }
        })
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
