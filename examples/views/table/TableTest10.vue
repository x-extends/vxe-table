<template>
  <div>
    <vxe-button content="设置选中" @click="setSelected"></vxe-button>
    <vxe-table
      show-overflow
      height="300"
      ref="xTable"
      :tree-config="{
        transform: true,
        parentField: 'pid',
        expandAll: true,
        reserve: true,
      }"
      :scroll-y="{ enabled: true }"
      :data="tableData"
    >
      <vxe-column type="seq" width="100"></vxe-column>
      <vxe-column
        type="checkbox"
        title="选择"
        width="150"
        tree-node
      ></vxe-column>
      <vxe-column field="name" title="名称"></vxe-column>
    </vxe-table>
  </div>
</template>

<script>
import tableData from './data.json'
export default {
  components: {},
  data () {
    return {
      tableData
    }
  },
  methods: {
    setSelected () {
      const { fullData } = this.$refs.xTable.getTableData()
      const checkedList = [];
      (function temp (array) {
        array.forEach((item) => {
          if (item.children && item.children.length) {
            temp(item.children)
          }
          if (!item.isParent) {
            checkedList.push(item)
          }
        })
      })(fullData)
      this.$refs.xTable.setCheckboxRow(checkedList, true)
    }
  }
}
</script>
