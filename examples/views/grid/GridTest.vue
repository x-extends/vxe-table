<template>
  <div>
    <vxe-button status="success" @click="revertAllEvent">恢复全部</vxe-button>
    <vxe-button status="success" @click="revertRow(tableData[1])">恢复Test2</vxe-button>
    <vxe-table
      border
      show-overflow
      keep-source
      height="400"
      ref="tableRef"
      :edit-config="editConfig"
      :data="tableData">
      <vxe-column type="seq" width="70"></vxe-column>
      <vxe-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-column>
      <vxe-column field="sex" title="Sex" :edit-render="{name: 'input'}"></vxe-column>
      <vxe-column field="age" title="Age" :edit-render="{name: 'input'}"></vxe-column>
      <vxe-column field="action" title="操作" width="240">
        <template #default="{ row }">
          <vxe-button mode="text" status="primary" @click="updateRow1(row)">修改1</vxe-button>
          <vxe-button mode="text" status="primary" @click="updateRow2(row)">修改2</vxe-button>
          <vxe-button mode="text" status="error" @click="removeRow(row)">删除</vxe-button>
          <vxe-button mode="text" status="success" @click="revertRow(row)">恢复</vxe-button>
        </template>
      </vxe-column>
    </vxe-table>
  </div>
</template>

<script>
import { VxeUI } from '../../../packages'
export default {
  data () {
    const tableData = [
      { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
      { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
      { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
      { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
    ]
    const editConfig = {
      trigger: 'click',
      mode: 'cell',
      showStatus: true
    }
    return {
      tableData,
      editConfig
    }
  },
  methods: {
    async removeRow (row) {
      const $table = this.$refs.tableRef
      if ($table) {
        $table.remove(row)
        VxeUI.modal.message({
          content: '数据已删除',
          status: 'success'
        })
      }
    },
    updateRow1 (row) {
      row.name = `Name_${new Date().getTime()}`
    },
    updateRow2 (row) {
      row.age++
    },
    revertRow (row) {
      const $table = this.$refs.tableRef
      if ($table) {
        if ($table.isUpdateByRow(row) || $table.isRemoveByRow(row)) {
          $table.revertData(row)
          VxeUI.modal.message({
            content: '数据已恢复',
            status: 'success'
          })
        } else {
          VxeUI.modal.message({
            content: '数据未改动',
            status: 'info'
          })
        }
      }
    },
    revertAllEvent () {
      const $table = this.$refs.tableRef
      if ($table) {
        const updateRecords = $table.getUpdateRecords()
        const removeRecords = $table.getRemoveRecords()
        if (updateRecords.length > 0 || removeRecords.length > 0) {
          $table.revertData()
          VxeUI.modal.message({
            content: '数据已恢复',
            status: 'success'
          })
        } else {
          VxeUI.modal.message({
            content: '数据未改动',
            status: 'info'
          })
        }
      }
    }
  }
}
</script>
