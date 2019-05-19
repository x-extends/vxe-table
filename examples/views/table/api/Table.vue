<template>
  <div>
    <vxe-table
      border
      highlight-hover-row
      :data="tableData"
      :tree-config="{key: 'id', children: 'list'}">
      <vxe-table-column prop="name" label="属性" width="220" tree-node></vxe-table-column>
      <vxe-table-column prop="desc" label="说明"></vxe-table-column>
      <vxe-table-column prop="type" label="类型"></vxe-table-column>
      <vxe-table-column prop="enum" label="可选值"></vxe-table-column>
      <vxe-table-column prop="defVal" label="默认值"></vxe-table-column>
    </vxe-table>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'

export default {
  data () {
    return {
      tableData: []
    }
  },
  created () {
    let contextMenuApi = [
      {
        name: 'disabled',
        desc: '是否禁用右键',
        type: 'Boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'options',
        desc: '菜单配置',
        type: 'Array<Array>',
        enum: '',
        defVal: '',
        list: [
          {
            name: 'code',
            desc: '菜单键值',
            type: 'String',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'name',
            desc: '菜单名称',
            type: 'String',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'prefixIcon',
            desc: '前缀图标 className',
            type: 'String',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'suffixIcon',
            desc: '后缀图标 className',
            type: 'String',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'disabled ',
            desc: '是否禁用',
            type: 'Boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'children ',
            desc: '二级菜单（最多只允许有二级）',
            type: 'Array',
            enum: '',
            defVal: '',
            list: [
              {
                name: 'code',
                desc: '菜单键值',
                type: 'String',
                enum: '',
                defVal: '',
                list: []
              },
              {
                name: 'name',
                desc: '菜单名称',
                type: 'String',
                enum: '',
                defVal: '',
                list: []
              },
              {
                name: 'prefixIcon',
                desc: '前缀图标 className',
                type: 'String',
                enum: '',
                defVal: '',
                list: []
              },
              {
                name: 'disabled ',
                desc: '是否禁用',
                type: 'Boolean',
                enum: '',
                defVal: 'false',
                list: []
              }
            ]
          }
        ]
      },
      {
        name: 'visibleMethod',
        desc: '该函数 Function({row, rowIndex, column, columnIndex}, event) 的返回值用来决定是否允许显示右键菜单',
        type: 'Function',
        enum: '',
        defVal: '',
        list: []
      }
    ]
    let apis = [
      {
        name: 'Props',
        desc: '参数',
        type: '',
        enum: '',
        defVal: '',
        list: [
          {
            name: 'data',
            desc: '显示的数据',
            type: 'Array',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'customs',
            desc: '初始化绑定动态列',
            type: 'Array',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'height',
            desc: '表格的高度',
            type: 'Number,String',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'max-height',
            desc: '表格的最大高度',
            type: 'Number,String',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'resizable',
            desc: '是否允许拖动列宽调整大小',
            type: 'Boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'stripe',
            desc: '是否带有斑马纹',
            type: 'Boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'border',
            desc: '是否带有纵向边框',
            type: 'Boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'size',
            desc: '表格的尺寸',
            type: 'String',
            enum: 'medium,small,mini',
            defVal: '',
            list: []
          },
          {
            name: 'fit',
            desc: '列的宽度是否自撑开',
            type: 'Boolean',
            enum: '',
            defVal: 'true',
            list: []
          },
          {
            name: 'loading',
            desc: '表格是否显示加载中',
            type: 'Boolean',
            enum: '',
            defVal: 'true',
            list: []
          },
          {
            name: 'show-header',
            desc: '是否显示表头',
            type: 'Boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'highlight-current-row',
            desc: '是否要高亮当前选中行',
            type: 'Boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'highlight-hover-row',
            desc: '鼠标移到行是否要高亮显示',
            type: 'Boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'row-class-name',
            desc: '给行附加 className，也可以是函数 Function({seq, row, rowIndex})',
            type: 'String,Function',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'cell-class-name',
            desc: '给单元格附加 className，也可以是函数 Function({seq, row, rowIndex, column, columnIndex})',
            type: 'String,Function',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'header-row-class-name',
            desc: '给表头的行附加 className，也可以是函数 Function({headIndex})',
            type: 'String,Function',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'header-cell-class-name',
            desc: '给表头的单元格附加 className，也可以是函数 Function({headIndex, column, columnIndex})',
            type: 'String,Function',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'footer-row-class-name',
            desc: '给表尾的行附加 className，也可以是函数 Function({footIndex})',
            type: 'String,Function',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'footer-cell-class-name',
            desc: '给表尾的单元格附加 className，也可以是函数 Function({footIndex, column, columnIndex})',
            type: 'String,Function',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'show-footer',
            desc: '是否显示表尾合计',
            type: 'Boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'footer-method',
            desc: '表尾合计的计算方法 Function({columns, data})',
            type: 'Function',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'span-method',
            desc: '合并行或列，该函数 Function({seq, row, rowIndex, column, columnIndex, data}) 返回计算后的值',
            type: 'Object',
            enum: '',
            defVal: '{ rowspan: 1, colspan: 1}',
            list: []
          },
          {
            name: 'tooltip-theme',
            desc: '列 tooltip 的主题，可选值为 dark 或 light',
            type: 'String',
            enum: '',
            defVal: 'dark',
            list: []
          },
          {
            name: 'show-all-overflow',
            desc: '设置所有内容过长时显示为省略号（如果是固定列建议设置该值，提升渲染速度）',
            type: 'Boolean,String',
            enum: 'ellipsis,title,tooltip',
            defVal: '',
            list: []
          },
          {
            name: 'show-header-all-overflow',
            desc: '设置表头所有内容过长时显示为省略号',
            type: 'Boolean,String',
            enum: 'ellipsis,title,tooltip',
            defVal: '',
            list: []
          },
          {
            name: 'row-key',
            desc: '行数据的 Key，Vue 虚拟 DOM 中 key 属性',
            type: 'Number,String',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'auto-resize',
            desc: '是否自动根据父容器大小调整表格宽度',
            type: 'Boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'auto-width',
            desc: '是否自动计算列宽（如果关闭了需要手动调用 recalculate 函数）',
            type: 'Boolean',
            enum: '',
            defVal: 'true',
            list: []
          },
          {
            name: 'tree-config',
            desc: '树形结构配置项',
            type: 'Object',
            enum: '',
            defVal: '',
            list: [
              {
                name: 'key',
                desc: '树节点数据中的唯一主键',
                type: 'String',
                enum: '',
                defVal: '',
                list: []
              },
              {
                name: 'children',
                desc: '树子节点的属性',
                type: 'String',
                enum: '',
                defVal: 'children',
                list: []
              },
              {
                name: 'indent',
                desc: '树节点的缩进',
                type: 'Number',
                enum: '',
                defVal: '16',
                list: []
              }
            ]
          },
          {
            name: 'context-menu',
            desc: '快捷菜单配置项',
            type: 'Object',
            enum: '',
            defVal: '',
            list: [
              {
                name: 'header',
                desc: '表头的快捷菜单',
                type: 'Object',
                enum: '',
                defVal: '',
                list: contextMenuApi
              },
              {
                name: 'body',
                desc: '内容的快捷菜单',
                type: 'Object',
                enum: '',
                defVal: '',
                list: contextMenuApi
              },
              {
                name: 'footer',
                desc: '表尾的快捷菜单',
                type: 'Object',
                enum: '',
                defVal: '',
                list: contextMenuApi
              }
            ]
          }
        ]
      },
      {
        name: 'Slots',
        desc: '插槽',
        type: '',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'Events',
        desc: '事件',
        type: '',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'Methods',
        desc: '方法',
        type: '',
        enum: '',
        defVal: '',
        list: []
      }
    ]
    let index = 1
    XEUtils.eachTree(apis, item => {
      item.id = index++
    })
    this.tableData = apis
  }
}
</script>
