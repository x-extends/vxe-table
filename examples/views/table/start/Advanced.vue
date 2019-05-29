<template>
  <div>
    <h3>高级函数</h3>
    <p>自定义渲染器 + 渲染函数</p>
    <pre>
      <code class="javascript">{{ demoCodes[0] }}</code>
      <code class="html">{{ demoCodes[1] }}</code>
    </pre>
    <p>自定义渲染器 + JSX</p>
    <pre>
      <code class="javascript">{{ demoCodes[2] }}</code>
      <code class="html">{{ demoCodes[3] }}</code>
    </pre>
    <p>内置拦截器（对于自定义渲染的组件与内部事件存在冲突时可能会使用到）</p>
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
