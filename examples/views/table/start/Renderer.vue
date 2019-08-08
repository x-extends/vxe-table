<template>
  <div>
    <h2>Renderer 渲染器</h2>
    <p>通过渲染器你可以轻松实现筛选模板、单元格模板，可以根据不同业务实现不一样的组件，这个功能将非常实用；比如这些插件 <a class="link" href="https://www.npmjs.com/package/vxe-table-plugin-element" target="_blank">vxe-table-plugin-element</a></p>
    <h3>内置的渲染</h3>
    <p>默认自带的原生渲染器 input、textarea、select，你也可以根据不同业务去实现对应的渲染器</p>
    <h3>渲染器和插槽对比</h3>
    <p class="orange">渲染器：抽象一切可复用的功能，实现简单的可配置化；</p>
    <p class="orange">插槽：自定义程度高，但需要重复写冗余代码，比较繁琐；</p>
    <h3>API</h3>
    <p class="green">添加渲染器 renderer.add(name, options)</p>
    <p class="green">混合多个渲染器 renderer.mixin(renderMap)</p>
    <p class="green">删除渲染器 renderer.delete(name)</p>
    <h3>简单示例</h3>
    <h4>例子：实现一个简单的筛选渲染</h4>
    <pre>
      <code class="javascript">{{ demoCodes[0] }}</code>
      <code class="html">{{ demoCodes[1] }}</code>
    </pre>
    <h4>例子：实现一个简单的单元格渲染</h4>
    <pre>
      <code class="javascript">{{ demoCodes[2] }}</code>
      <code class="html">{{ demoCodes[3] }}</code>
    </pre>
    <h4>例子：（推荐）通过 JSX 实现更加简单，可维护性好</h4>
    <pre>
      <code class="javascript">{{ demoCodes[4] }}</code>
      <code class="html">{{ demoCodes[5] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  data () {
    return {
      demoCodes: [
        `
        // 定义一个筛选渲染器
        VXETable.renderer.add('MyFilter', {
          // 筛选模板
          renderFilter (h, filterRender, params, context) {
            let { column } = params
            return column.filters.map(item => {
              return h('input', {
                attrs: {
                  type: 'text'
                },
                domProps: {
                  value: item.data
                },
                on: {
                  input (evnt) {
                    item.data = evnt.target.value
                  }
                }
              })
            })
          },
          // 筛选方法
          filterMethod ({ option, row, column }) {
            let { data } = option
            let cellValue = XEUtils.get(row, column.property)
            return cellValue === data
          }
        })
        `,
        `
        <vxe-table
          border
          height="600"
          :data.sync="tableData"
          :edit-config="{trigger: 'click', mode: 'row'}">
          <vxe-table-column type="selection" width="60" fixed="left"></vxe-table-column>
          <vxe-table-column type="index" width="60" fixed="left"></vxe-table-column>
          <vxe-table-column field="age" title="Age" :filters="[{data: null}]" :filter-render="{name: 'MyFilter'}"></vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
        </vxe-table>
        `,
        `
        // 定义一个输入框渲染器
        VXETable.renderer.add('MyCell', {
          autofocus: '.my-cell',
          // 编辑模板
          renderEdit (h, editRender, params) {
            let { row, column } = params
            return [
              h('input', {
                class: 'my-cell',
                attrs: {
                  type: 'text'
                },
                domProps: {
                  value: row[column.property]
                },
                on: {
                  input (evnt) {
                    row[column.property] = evnt.target.value
                  }
                }
              })
            ]
          },
          // 显示模板
          renderCell (h, editRender, params) {
            let { row, column } = params
            return [
              h('span', row[column.property])
            ]
          }
        })

        // 定义一个链接渲染器
        VXETable.renderer.add('MyLink', {
          // 显示模板
          renderCell (h, editRender, params) {
            let { row, column } = params
            let { events } = editRender
            return [
              <a class="my-link" onClick="{ () => events.click(params) }">{row[column.property]}</a>
            ]
          }
        })
        `,
        `
        <vxe-table
          border
          height="600"
          :data.sync="tableData"
          :edit-config="{trigger: 'click', mode: 'row'}">
          <vxe-table-column type="selection" width="60" fixed="left"></vxe-table-column>
          <vxe-table-column type="index" width="60" fixed="left"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
          <vxe-table-column field="name" title="Name" :cell-render="{name: 'MyLink', events: {click: linkEvent}}"></vxe-table-column>
          <vxe-table-column field="role" title="Role" :edit-render="{name: 'MyCell'}"></vxe-table-column>
        </vxe-table>
        `,
        `
        // 定义一个输入框渲染器
        VXETable.renderer.add('MyCell', {
          autofocus: '.my-cell',
          // 编辑模板
          renderEdit (h, editRender, { row, column }) {
            return [
              <input class="my-cell" text="text" value={ row[column.property] } onInput={ evnt => { row[column.property] = evnt.target.value }}/>
            ]
          },
          // 显示模板
          renderCell (h, editRender, { row, column }) {
            return [
              <span>{row[column.property]}</span>
            ]
          }
        })
        `,
        `
        <vxe-table
          border
          height="600"
          :data.sync="tableData"
          :edit-config="{trigger: 'click', mode: 'row'}">
          <vxe-table-column type="selection" width="60" fixed="left"></vxe-table-column>
          <vxe-table-column type="index" width="60" fixed="left"></vxe-table-column>
          <vxe-table-column field="name" title="Name" :cell-render="{name: 'MyLink'}"></vxe-table-column>
          <vxe-table-column field="role" title="Role" :edit-render="{name: 'MyCell'}"></vxe-table-column>
        </vxe-table>
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
