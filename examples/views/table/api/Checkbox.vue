<template>
  <div>
    <vxe-table
      highlight-hover-row
      :data="tableData"
      :tree-config="{key: 'id', children: 'list', expandRowKeys: defaultExpandRowKeys, trigger: 'cell'}">
      <vxe-table-column prop="name" label="属性" width="280" tree-node></vxe-table-column>
      <vxe-table-column prop="desc" label="说明"></vxe-table-column>
      <vxe-table-column prop="type" label="类型" width="140"></vxe-table-column>
      <vxe-table-column prop="enum" label="可选值" width="180"></vxe-table-column>
      <vxe-table-column prop="defVal" label="默认值或参数" width="180"></vxe-table-column>
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
            name: 'value,v-model',
            desc: '绑定值',
            type: '',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'disabled',
            desc: '是否禁用',
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
        list: [
          {
            name: 'change',
            desc: '在值发生改变时触发该事件',
            type: '',
            enum: '',
            defVal: 'value',
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
        list: []
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
