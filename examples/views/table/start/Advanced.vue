<template>
  <div>
    <h2>Renderer 渲染器</h2>
    <h3>内置的渲染</h3>
    <p>默认只带三个原生的渲染函数 input、textarea、select，你也可以根据不同业务去实现对应的渲染器</p>
    <h3>渲染器和插槽对比</h3>
    <p>渲染器：抽象一切可复用的功能，实现简单的可配置化；</p>
    <p>插槽：自定义程度高，但需要重复写冗余代码，局限性较大；</p>
    <h3>简单示例</h3>
    <p>通过渲染器你可以轻松实现筛选模板、单元格模板，可以根据不同业务实现不一样的组件，这个功能将非常实用</p>
    <p>比如这些插件 <a class="link" href="https://www.npmjs.com/package/vxe-table-plugin-element" target="_blank">vxe-table-plugin-element</a> 等插件都是使用渲染器实现的</p>
    <p>添加单个 renderer.add(name, options)</p>
    <p>混合多个 renderer.mixin(opts)</p>
    <p>删除 renderer.delete(name)</p>
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
    <h2>事件拦截器</h2>
    <p>通过内置拦截器可以解决当表格交互与其他组件存在冲突的，可以通过返回 false 阻止默认的行为，从而可以集成其他组件互相兼容</p>
    <p>添加单个 interceptor.add(name, handle)</p>
    <p>event.clear_filter（清除筛选面板时触发）</p>
    <p>event.clear_actived（清除激活单元格时触发）</p>
    <p>例子：比如自定义渲染某个组件后，由于弹出层面板不在单元格之内，按键事件的交互行为存在冲突，对于这些场景就很有用了</p>
    <pre>
      <code class="javascript">{{ demoCodes[6] }}</code>
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
        VXETable.renderer.mixin({
          MyFilter: {
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
          <vxe-table-column field="name" title="Name" :cell-render="{name: 'MyCell'}"></vxe-table-column>
          <vxe-table-column field="role" title="Role" :edit-render="{name: 'MyCell'}"></vxe-table-column>
        </vxe-table>
        `,
        `
        VXETable.renderer.add('MyCell', {
          autofocus: '.my-cell',
          // 编辑模板
          renderEdit (h, editRender, { row, column }) {
            return [
              <input class="my-cell" text="text" value={ row[column.property] } onInput={ val => { row[column.property] = val }}/>
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
          <vxe-table-column field="name" title="Name" :cell-render="{name: 'MyCell'}"></vxe-table-column>
          <vxe-table-column field="role" title="Role" :edit-render="{name: 'MyCell'}"></vxe-table-column>
        </vxe-table>
        `,
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
