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
    let apis = [
      {
        name: 'Props',
        desc: '参数',
        type: '',
        enum: '',
        defVal: '',
        list: []
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
