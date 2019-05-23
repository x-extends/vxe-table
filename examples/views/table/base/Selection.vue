<template>
  <div>
    <p>多选表格，基础方式</p>

    <button class="btn" @click="$refs.xTable1.toggleRowSelection(tableData[1])">切换第二行选中</button>
    <button class="btn" @click="$refs.xTable1.setSelection([tableData[2], tableData[3]], true)">设置第三、四行选中</button>
    <button class="btn" @click="$refs.xTable1.setAllSelection(true)">设置所有行选中</button>
    <button class="btn" @click="$refs.xTable1.clearSelection()">清除所有行选中</button>
    <vxe-table
      ref="xTable1"
      border
      height="300"
      :data.sync="tableData">
      <vxe-table-column type="selection" width="60"></vxe-table-column>
      <vxe-table-column prop="name" label="Name"></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
      <vxe-table-column prop="age" label="Age"></vxe-table-column>
      <vxe-table-column prop="address" label="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p>还可以通过 selectMethod 方法控制是否允许点击 CheckBox 勾选</p>

    <button class="btn" @click="$refs.xTable2.toggleRowSelection(tableData[1])">切换第二行选中</button>
    <button class="btn" @click="$refs.xTable2.setSelection([tableData[2], tableData[3]], true)">设置第三、四行选中</button>
    <button class="btn" @click="$refs.xTable2.setAllSelection(true)">设置所有行选中</button>
    <button class="btn" @click="$refs.xTable2.clearSelection()">清除所有行选中</button>
    <vxe-table
      ref="xTable2"
      border
      height="300"
      :data.sync="tableData"
      :select-config="{selectMethod}">
      <vxe-table-column type="selection" width="60"></vxe-table-column>
      <vxe-table-column prop="name" label="Name"></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
      <vxe-table-column prop="age" label="Age"></vxe-table-column>
      <vxe-table-column prop="address" label="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p>多选表格，通过配置 select-config 参数，使用渲染最快的属性绑定方式</p>

    <button class="btn" @click="$refs.xTable3.toggleRowSelection(tableData[1])">切换第二行选中</button>
    <button class="btn" @click="$refs.xTable3.setSelection([tableData[2], tableData[3]], true)">设置第三、四行选中</button>
    <button class="btn" @click="$refs.xTable3.setAllSelection(true)">设置所有行选中</button>
    <button class="btn" @click="$refs.xTable3.clearSelection()">清除所有行选中</button>
    <vxe-table
      ref="xTable3"
      border
      height="300"
      :data.sync="tableData"
      :select-config="{checkProp: 'checked'}">
      <vxe-table-column type="selection" width="60"></vxe-table-column>
      <vxe-table-column prop="name" label="Name"></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
      <vxe-table-column prop="age" label="Age"></vxe-table-column>
      <vxe-table-column prop="address" label="Address" show-overflow></vxe-table-column>
    </vxe-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: []
    }
  },
  created () {
    let list = window.MOCK_DATA_LIST.slice(0, 10)
    this.tableData = list
  },
  methods: {
    selectMethod ({ row }) {
      return row.age > 26
    }
  }
}
</script>
