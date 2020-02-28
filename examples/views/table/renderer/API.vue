<template>
  <div>
    <h1>Renderer 渲染器</h1>
    <p class="tip">
      通过渲染器你可以轻松实现筛选、单元格的复用，可以根据不同业务实现不一样的渲染器，这个功能将非常实用；比如这些插件 <a class="link" href="https://www.npmjs.com/package/vxe-table-plugin-element" target="_blank">vxe-table-plugin-element</a><br>
      <span class="orange">渲染器：抽象一切可复用的功能（类似组件的概念），实现非常简单的可配置化；</span><br>
      <span class="orange">插槽：自定义程度高，但需要重复写冗余代码，比较繁琐；</span><br>
      <span class="red">建议通过 JSX 实现更加简单，可维护性更好</span><br>
      <span class="red">（注：实际开发中应该将业务封装成一个组件，不要把复杂的渲染逻辑写在渲染器中，渲染器只负责表格与自定义组件之间的对接关系）</span>
    </p>
    <h2>API</h2>
    <vxe-table
      resizable
      highlight-hover-row
      :data="tableData">
      <vxe-table-column field="name" title="app.api.title.prop" min-width="280" tree-node></vxe-table-column>
      <vxe-table-column field="desc" title="app.api.title.desc" min-width="200"></vxe-table-column>
      <vxe-table-column field="type" title="app.api.title.type" min-width="140"></vxe-table-column>
      <vxe-table-column field="enum" title="app.api.title.enum" min-width="150"></vxe-table-column>
      <vxe-table-column field="defVal" title="app.api.title.defVal" min-width="160"></vxe-table-column>
    </vxe-table>
    <h2>原生渲染器</h2>
    <vxe-table
      resizable
      highlight-hover-row
      :data="nativeRenderList">
      <vxe-table-column field="name" title="渲染器名称" min-width="200"></vxe-table-column>
      <vxe-table-column field="desc" title="描述说明" min-width="280"></vxe-table-column>
    </vxe-table>
    <h2>内置渲染器</h2>
    <vxe-table
      resizable
      highlight-hover-row
      :data="xRenderList">
      <vxe-table-column field="name" title="渲染器名称" min-width="200"></vxe-table-column>
      <vxe-table-column field="desc" title="描述说明" min-width="280"></vxe-table-column>
    </vxe-table>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  data () {
    return {
      nativeRenderList: [
        {
          name: 'input',
          desc: '原生-输入框'
        },
        {
          name: 'textarea',
          desc: '原生-文本域'
        },
        {
          name: '$select',
          desc: '原生-下拉框'
        }
      ],
      xRenderList: [
        {
          name: '$button',
          desc: '模块-按钮'
        },
        {
          name: '$buttons',
          desc: '模块-按钮列表'
        },
        {
          name: '$input',
          desc: '模块-输入框'
        },
        {
          name: '$select',
          desc: '模块-下拉框'
        },
        {
          name: '$radio',
          desc: '模块-单选列表'
        },
        {
          name: '$checkbox',
          desc: '模块-复选列表'
        }
      ],
      tableData: [
        {
          name: 'add(name, options)',
          desc: '添加',
          version: '',
          type: '',
          enum: '',
          defVal: 'name, options',
          list: []
        },
        {
          name: 'mixin(map)',
          desc: '混合多个',
          version: '',
          type: '',
          enum: '',
          defVal: 'map',
          list: []
        },
        {
          name: 'delete(name)',
          desc: '删除',
          version: '',
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
