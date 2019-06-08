<template>
  <div>
    <h3>高级函数</h3>
    <p>通过渲染器你可以轻松实现渲染的单元格组件，可以根据不同业务实现不一样的组件，这个功能将非常实用</p>
    <p>比如这些插件 <a href="https://www.npmjs.com/package/vxe-table-plugin-element">vxe-table-plugin-element</a> 等插件都是使用渲染器实现的</p>
    <p>例子：使用 render 实现单元格组件</p>
    <pre>
      <code class="javascript">{{ demoCodes[0] }}</code>
      <code class="html">{{ demoCodes[1] }}</code>
    </pre>
    <p>例子：使用 JSX 实现单元格组件</p>
    <pre>
      <code class="javascript">{{ demoCodes[2] }}</code>
      <code class="html">{{ demoCodes[3] }}</code>
    </pre>
    <p>通过内置拦截器可以解决当表格交互与其他组件存在冲突的，可以通过拦截器去阻止默认的行为，从而可以集成其他组件互相兼容</p>
    <p>例子：比如集成某个日期组件后，由于面板不在对单元格之内，按键事件的交互行为存在冲突，对于这些场景就很有用了</p>
    <pre>
      <code class="javascript">{{ demoCodes[4] }}</code>
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
        import Vue from 'vue'
        import VXETable from 'vxe-table'
        import 'vxe-table/lib/index.css'

        VXETable.renderer.add('MyCell', {
          autofocus: '.my-cell',
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
          :edit-config="{key: 'id', trigger: 'click', mode: 'row'}">
          <vxe-table-column type="selection" width="60" fixed="left"></vxe-table-column>
          <vxe-table-column type="index" width="60" fixed="left"></vxe-table-column>
          <vxe-table-column prop="name" label="Name" :edit-render="{name: 'MyCell'}"></vxe-table-column>
        </vxe-table>
        `,
        `
        import Vue from 'vue'
        import VXETable from 'vxe-table'
        import 'vxe-table/lib/index.css'

        VXETable.renderer.add('MyCell', {
          autofocus: '.my-cell',
          renderEdit (h, editRender, { row, column }) {
            return <input class="my-cell" text="text" value={row[column.property]} on-input={val => row[column.property] = val}/>
          },
          renderCell (h, editRender, { row, column }) {
            return <span>{row[column.property]}</span>
          }
        })
        `,
        `
        <vxe-table
          border
          height="600"
          :data.sync="tableData"
          :edit-config="{key: 'id', trigger: 'click', mode: 'row'}">
          <vxe-table-column type="selection" width="60" fixed="left"></vxe-table-column>
          <vxe-table-column type="index" width="60" fixed="left"></vxe-table-column>
          <vxe-table-column prop="name" label="Name" :edit-render="{name: 'MyCell'}"></vxe-table-column>
        </vxe-table>
        `,
        `
        import Vue from 'vue'
        import VXETable from 'vxe-table'
        import 'vxe-table/lib/index.css'

        VXETable.interceptor.add('event.clear_actived', (params, event) => {
          // 比如点击了某日期组件的面板，此时被激活单元格不应该被自动关闭，通过返回 false 可以阻止默认的行为。
          if (event.target.className.indexOf('cascader-popper') > -1) {
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
