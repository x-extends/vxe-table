<template>
  <div>
    <vxe-table
      border
      :data="tableData"
      :tree-config="{key: 'id', children: 'list'}">
      <vxe-table-column prop="name" label="属性" tree-node></vxe-table-column>
      <vxe-table-column prop="desc" label="说明"></vxe-table-column>
      <vxe-table-column prop="type" label="类型"></vxe-table-column>
      <vxe-table-column prop="enum" label="可选值"></vxe-table-column>
      <vxe-table-column prop="default" label="默认值"></vxe-table-column>
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
            defVal: 'false',
            list: []
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
