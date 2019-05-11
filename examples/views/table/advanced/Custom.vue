<template>
  <div>
    <p>通过 customs 来初始化绑定内部列变量，prop:属性,visible:默认是否显示；</p>
    <p>该功能对于列比较多的表格非常有用，可以轻松实现强大的显示/隐藏列的配置功能</p>

    <div class="table-oper">
      <span class="menu-btn">
        <i class="icon-menu"></i>
        <div class="menu-wrapper">
          <label v-for="(column,index) in allColumnList" :key="index">
            <input type="checkbox" v-model="column.visible">
            <span>{{ column.label }}</span>
          </label>
        </div>
      </span>
    </div>

    <vxe-table
      border
      height="400"
      :data.sync="tableData"
      :customs.sync="customColumns">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column prop="name" label="Name"></vxe-table-column>
      <vxe-table-column prop="role" label="Role"></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
      <vxe-table-column prop="age" label="Age"></vxe-table-column>
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
    let list = window.MOCK_DATA_LIST.slice(0, 20)
    this.tableData = list
  }
}
</script>

<style lang="scss" scoped>
.table-oper {
  height: 20px;
  width: 100%;
}
.menu-btn {
  position: relative;
  width: 20px;
  height: 20px;
  float: right;
  &:hover {
    .menu-wrapper {
      display: block;
    }
  }
}
.menu-wrapper {
  display: none;
  position: absolute;
  width: 60px;
  top: 16px;
  right: 0;
  z-index: 9;
  background-color: #fff;
  font-size: 14px;
  user-select: none;
  > label {
    display: block;
    line-height: 20px;
    cursor: pointer;
    > input {
      vertical-align: middle;
      margin-right: 4px;
    }
  }
}
.icon-menu {
  width: 16px;
  height: 0px;
  display: inline-block;
  margin-bottom: 16px;
  box-shadow: 0 6px 0 2px #606266, 0 0 0 2px #606266, 0 12px 0 2px #606266;
}
</style>
