<template>
  <div>
    <h1>{{ $t('app.aside.nav.interceptor') }}</h1>
    <p class="tip">通过内置事件拦截器可以很容易的处理表格事件行为与第三方组件的兼容性；比如这些插件 <a class="link" href="https://www.npmjs.com/package/vxe-table-plugin-element" target="_blank">vxe-table-plugin-element</a></p>
    <vxe-table
      resizable
      highlight-current-row
      highlight-hover-row
      highlight-current-column
      class="api-table"
      :data="tableData">
      <vxe-table-column field="name" title="app.api.title.prop" min-width="280" tree-node></vxe-table-column>
      <vxe-table-column field="desc" title="app.api.title.desc" min-width="200"></vxe-table-column>
      <vxe-table-column field="type" title="app.api.title.type" min-width="140"></vxe-table-column>
      <vxe-table-column field="enum" title="app.api.title.enum" min-width="150"></vxe-table-column>
      <vxe-table-column field="defVal" title="app.api.title.defVal" min-width="160"></vxe-table-column>
      <vxe-table-column field="version" :title="$t('app.api.title.version')" width="120">
        <template v-slot="{ row }">
          <span v-show="row.version" class="compatibility">v{{  row.version }}</span>
        </template>
      </vxe-table-column>
    </vxe-table>
    <h2>可选值</h2>
    <vxe-table
      resizable
      highlight-hover-row
      class="api-table"
      :data="typeList">
      <vxe-table-column field="name" title="app.api.title.prop" min-width="280" tree-node></vxe-table-column>
      <vxe-table-column field="desc" title="app.api.title.desc" min-width="200"></vxe-table-column>
      <vxe-table-column field="type" title="app.api.title.type" min-width="140"></vxe-table-column>
      <vxe-table-column field="enum" title="app.api.title.enum" min-width="150"></vxe-table-column>
      <vxe-table-column field="defVal" title="app.api.title.defVal" min-width="160"></vxe-table-column>
      <vxe-table-column field="version" :title="$t('app.api.title.version')" width="120">
        <template v-slot="{ row }">
          <span v-show="row.version" class="compatibility">v{{  row.version }}</span>
        </template>
      </vxe-table-column>
    </vxe-table>
    <h2>示例</h2>
    <p class="tip">
      例子：比如自定义渲染某个组件后，由于弹出层面板不在单元格之内，按键事件的交互行为存在冲突<br>
      当然还有最简单的用法，只需给弹出面板加上 class=vxe-table--ignore-clear 即可
    </p>
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
          desc: '添加一个',
          version: '',
          type: '',
          enum: '',
          defVal: 'type, callback',
          list: []
        },
        {
          name: 'mixin(map)',
          desc: '添加多个',
          version: '',
          type: '',
          enum: '',
          defVal: 'map',
          list: []
        },
        {
          name: 'delete(type)',
          desc: '删除',
          version: '',
          type: '',
          enum: '',
          defVal: 'name',
          list: []
        }
      ],
      typeList: [
        {
          name: 'created',
          desc: '表格初始化时触发',
          version: '',
          type: '',
          enum: '',
          defVal: '',
          list: []
        },
        {
          name: 'mounted',
          desc: '表格挂载时触发',
          version: '',
          type: '',
          enum: '',
          defVal: '',
          list: []
        },
        {
          name: 'activated',
          desc: '表格激活时触发',
          version: '',
          type: '',
          enum: '',
          defVal: '',
          list: []
        },
        {
          name: 'deactivated',
          desc: '表格停用时触发',
          version: '',
          type: '',
          enum: '',
          defVal: '',
          list: []
        },
        {
          name: 'beforeDestroy',
          desc: '表格销毁之前触发',
          version: '',
          type: '',
          enum: '',
          defVal: '',
          list: []
        },
        {
          name: 'destroyed',
          desc: '表格销毁时触发',
          version: '',
          type: '',
          enum: '',
          defVal: '',
          list: []
        },
        {
          name: 'event.clearActived',
          desc: '清除激活单元格之前触发，允许返回 false 阻止默认行为',
          version: '',
          type: 'Boolean',
          enum: '',
          defVal: '',
          list: []
        },
        {
          name: 'event.clearFilter',
          desc: '清除筛选面板之前触发，允许返回 false 阻止默认行为',
          version: '',
          type: 'Boolean',
          enum: '',
          defVal: '',
          list: []
        },
        {
          name: 'event.clearAreas',
          desc: '如果功能被支持，清除单元格区域之前触发，允许返回 false 阻止默认行为',
          version: '',
          type: 'Boolean',
          enum: '',
          defVal: '',
          list: []
        },
        {
          name: 'event.keydown',
          desc: '键盘按下之前触发，允许返回 false 阻止默认行为',
          version: '',
          type: 'Boolean',
          enum: '',
          defVal: '',
          list: []
        },
        {
          name: 'event.showMenu',
          desc: '显示快捷菜单之前触发，允许返回 false 阻止默认行为',
          version: '',
          type: 'Boolean',
          enum: '',
          defVal: '',
          list: []
        },
        {
          name: 'event.import',
          desc: '导入之前触发，允许返回 false 阻止默认行为',
          version: '',
          type: 'Boolean',
          enum: '',
          defVal: '',
          list: []
        },
        {
          name: 'event.export',
          desc: '导出之前触发，允许返回 false 阻止默认行为',
          version: '',
          type: 'Boolean',
          enum: '',
          defVal: '',
          list: []
        }
      ],
      demoCodes: [
        `
        VXETable.interceptor.add('event.clearActived', (params, event) => {
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
