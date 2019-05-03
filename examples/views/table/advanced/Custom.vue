<template>
  <div>
    <p>自定义列通过 customs 来初始化绑定内部列变量，prop:属性,visible:默认是否显示；</p>
    <p>该功能对于列比较多的表格非常有用，可以轻松实现强大的个性化列配置功能</p>

    <label v-for="(column,index) in allColumnList" :key="index">
      <input type="checkbox" v-model="column.visible">
      <span>{{ column.label }}</span>
    </label>

    <vxe-table
      border
      height="400"
      :data.sync="tableData"
      :customs.sync="customColumns">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column prop="name" label="Name"></vxe-table-column>
      <vxe-table-column prop="role" label="Role"></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
      <vxe-table-column prop="date" label="Date"></vxe-table-column>
    </vxe-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      customColumns: []
    }
  },
  computed: {
    allColumnList () {
      return this.customColumns.filter(item => item.property)
    }
  },
  created () {
    let list = window.CACHE_DATA_LIST.slice(0, 20)
    this.tableData = list
  }
}
</script>
