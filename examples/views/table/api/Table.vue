<template>
  <div>
    <el-table
      :data="list"
      border
      row-key="id">
      <el-table-column
        prop="name"
        label="属性">
      </el-table-column>
      <el-table-column
        prop="desc"
        label="说明">
      </el-table-column>
      <el-table-column
        prop="type"
        label="类型">
      </el-table-column>
      <el-table-column
        prop="enum"
        label="可选值">
      </el-table-column>
      <el-table-column
        prop="default"
        label="默认值">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'

export default {
  data () {
    return {
      list: []
    }
  },
  created () {
    let apis = [
      {
        name: 'vxe-table',
        desc: '',
        type: '',
        enum: '',
        defVal: '',
        children: [
          {
            name: 'Props',
            desc: '',
            type: '',
            enum: '',
            defVal: '',
            children: [
              {
                name: 'data',
                desc: '显示的数据',
                type: 'Array',
                enum: '',
                defVal: '',
                children: []
              },
              {
                name: 'customs',
                desc: '初始化绑定动态列',
                type: 'Array',
                enum: '',
                defVal: '',
                children: []
              },
              {
                name: 'height',
                desc: '表格的高度',
                type: 'Number,String',
                enum: '',
                defVal: '',
                children: []
              },
              {
                name: 'max-height',
                desc: '表格的最大高度',
                type: 'Number,String',
                enum: '',
                defVal: '',
                children: []
              },
              {
                name: 'resizable',
                desc: '是否允许拖动列宽调整大小',
                type: 'Boolean',
                enum: '',
                defVal: 'false',
                children: []
              },
              {
                name: 'stripe',
                desc: '是否带有斑马纹',
                type: 'Boolean',
                enum: '',
                defVal: 'false',
                children: []
              },
              {
                name: 'border',
                desc: '是否带有纵向边框',
                type: 'Boolean',
                enum: '',
                defVal: 'false',
                children: []
              },
              {
                name: 'size',
                desc: '表格的尺寸',
                type: 'String',
                enum: 'medium,small,mini',
                defVal: '',
                children: []
              },
              {
                name: 'fit',
                desc: '列的宽度是否自撑开',
                type: 'Boolean',
                enum: '',
                defVal: 'true',
                children: []
              },
              {
                name: 'loading',
                desc: '表格是否显示加载中',
                type: 'Boolean',
                enum: '',
                defVal: 'false',
                children: []
              }
            ]
          },
          {
            name: 'Slots',
            desc: '',
            type: '',
            enum: '',
            defVal: '',
            children: []
          },
          {
            name: 'Events',
            desc: '',
            type: '',
            enum: '',
            defVal: '',
            children: []
          },
          {
            name: 'Methods',
            desc: '',
            type: '',
            enum: '',
            defVal: '',
            children: []
          }
        ]
      }
    ]
    let index = 1
    XEUtils.eachTree(apis, item => {
      item.id = index++
    })
    this.list = apis
  }
}
</script>
