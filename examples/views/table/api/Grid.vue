<template>
  <div>
    <vxe-table
      highlight-hover-row
      :data="tableData"
      :tree-config="{key: 'id', children: 'list', expandRowKeys: defaultExpandRowKeys, trigger: 'cell'}">
      <vxe-table-column prop="name" label="属性" width="280" tree-node></vxe-table-column>
      <vxe-table-column prop="desc" label="说明"></vxe-table-column>
      <vxe-table-column prop="type" label="类型 / 返回类型" width="160"></vxe-table-column>
      <vxe-table-column prop="enum" label="可选值" width="180"></vxe-table-column>
      <vxe-table-column prop="defVal" label="默认值 / 参数" width="180"></vxe-table-column>
    </vxe-table>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'

export default {
  data () {
    return {
      tableData: [],
      defaultExpandRowKeys: []
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
            name: 'toolbar',
            desc: '工具栏配置',
            type: 'Object',
            enum: '',
            defVal: '',
            list: [
              {
                name: 'size',
                desc: '尺寸',
                type: 'String',
                enum: 'medium,small,mini',
                defVal: '',
                list: []
              },
              {
                name: 'buttons',
                desc: '按钮列表',
                type: 'Array',
                enum: '',
                defVal: '',
                list: [
                  {
                    name: 'code',
                    desc: '按钮编码',
                    type: 'String',
                    enum: '',
                    defVal: 'reload,query,insert,pending,delete,save,export',
                    list: []
                  },
                  {
                    name: 'name',
                    desc: '显示名称',
                    type: 'String',
                    enum: '',
                    defVal: '',
                    list: []
                  }
                ]
              }
            ]
          },
          {
            name: 'page-config',
            desc: '分页配置项',
            type: 'Object',
            enum: '',
            defVal: '',
            list: [
              {
                name: 'size',
                desc: '尺寸',
                type: 'String',
                enum: 'medium,small,mini',
                defVal: '',
                list: []
              },
              {
                name: 'current-page',
                desc: '当前页',
                type: 'Number',
                enum: '',
                defVal: '1',
                list: []
              },
              {
                name: 'page-size',
                desc: '每页大小',
                type: 'Number',
                enum: '',
                defVal: '10',
                list: []
              },
              {
                name: 'total',
                desc: '总条数',
                type: 'Number',
                enum: '',
                defVal: '0',
                list: []
              },
              {
                name: 'pager-count',
                desc: '显示页码按钮的数量',
                type: 'Number',
                enum: '',
                defVal: '7',
                list: []
              },
              {
                name: 'page-sizes',
                desc: '每页大小选项列表',
                type: 'Array',
                enum: '',
                defVal: '[10,15,20,50,100]',
                list: []
              },
              {
                name: 'background',
                desc: '带背景颜色',
                type: 'Boolean',
                enum: '',
                defVal: 'false',
                list: []
              }
            ]
          },
          {
            name: 'proxy-config',
            desc: '数据代理配置项',
            type: 'Object',
            enum: '',
            defVal: '',
            list: [
              {
                name: 'autoLoad',
                desc: '是否自动加载查询数据',
                type: 'Boolean',
                enum: '',
                defVal: 'true',
                list: []
              },
              {
                name: 'props',
                desc: '获取的属性配置',
                type: 'Object',
                enum: '',
                defVal: '',
                list: [
                  {
                    name: 'data',
                    desc: '响应结果中获取数据列表的属性',
                    type: 'String',
                    enum: '',
                    defVal: 'result',
                    list: []
                  },
                  {
                    name: 'page',
                    desc: '响应结果中获取分页的属性',
                    type: 'String',
                    enum: '',
                    defVal: 'page.total',
                    list: []
                  }
                ]
              },
              {
                name: 'ajax',
                desc: '数据响应配置',
                type: 'Object',
                enum: '',
                defVal: '',
                list: [
                  {
                    name: 'query',
                    desc: '查询方法 Function({ page })，默认处理的数据结构 {page: {total: 0}, result: []}',
                    type: 'Promise',
                    enum: '',
                    defVal: '',
                    list: []
                  },
                  {
                    name: 'delete',
                    desc: '删除方法 Function({ body })，提交的参数 { removeRecords }',
                    type: 'Promise',
                    enum: '',
                    defVal: '',
                    list: []
                  },
                  {
                    name: 'save',
                    desc: '保存方法 Function({ body })，提交的参数 { insertRecords, updateRecords, removeRecords, pendingRecords}',
                    type: 'Promise',
                    enum: '',
                    defVal: '',
                    list: []
                  }
                ]
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
        list: [
          {
            name: 'current-page-change',
            desc: '当前页发生改变时会触发该事件',
            type: '',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'page-size-change',
            desc: '每页大小发生改变时会触发该事件',
            type: '',
            enum: '',
            defVal: '',
            list: []
          }
        ]
      },
      {
        name: 'Methods',
        desc: '方法',
        type: '',
        enum: '',
        defVal: '',
        list: [
          {
            name: 'commitProxy(code)',
            desc: '提交给代理去处理数据',
            type: '',
            enum: 'reload,query,delete,save',
            defVal: '',
            list: []
          }
        ]
      }
    ]
    let index = 1
    XEUtils.eachTree(apis, item => {
      item.id = index++
    })
    this.defaultExpandRowKeys = apis.filter(item => item.list && item.list.length).map(item => item.id)
    this.tableData = apis
  }
}
</script>
