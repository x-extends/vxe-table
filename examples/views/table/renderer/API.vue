<template>
  <div>
    <h2>Renderer 渲染器</h2>
    <p class="tip">通过渲染器你可以轻松实现筛选、单元格的复用，可以根据不同业务实现不一样的渲染器，这个功能将非常实用；比如这些插件 <a class="link" href="https://www.npmjs.com/package/vxe-table-plugin-element" target="_blank">vxe-table-plugin-element</a></p>
    <h3>渲染器和插槽对比</h3>
    <p class="orange">渲染器：抽象一切可复用的功能（类似组件的概念），实现非常简单的可配置化；</p>
    <p class="orange">插槽：自定义程度高，但需要重复写冗余代码，比较繁琐；</p>
    <p class="red">建议通过 JSX 实现更加简单，可维护性更好</p>
    <vxe-table
      resizable
      highlight-current-row
      highlight-hover-row
      highlight-current-column
      :data.sync="tableData">
      <vxe-table-column field="name" title="app.api.title.prop" min-width="280" tree-node></vxe-table-column>
      <vxe-table-column field="desc" title="app.api.title.desc" min-width="200"></vxe-table-column>
      <vxe-table-column field="type" title="app.api.title.type" min-width="140"></vxe-table-column>
      <vxe-table-column field="enum" title="app.api.title.enum" min-width="150"></vxe-table-column>
      <vxe-table-column field="defVal" title="app.api.title.defVal" min-width="160"></vxe-table-column>
    </vxe-table>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tableData: [
        {
          name: 'add(name, options)',
          desc: '添加',
          type: '',
          enum: '',
          defVal: 'name, options',
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
          name: 'delete(name)',
          desc: '删除',
          type: '',
          enum: '',
          defVal: 'name',
          list: []
        }
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
