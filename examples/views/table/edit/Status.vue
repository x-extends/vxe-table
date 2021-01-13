<template>
  <div>
    <p class="tip">
      设置 <table-api-link prop="keep-source"/> 开启保持原始值状态和 <table-api-link prop="edit-config"/>={showStatus} 开启编辑状态显示功能，还可以通过 icon 自定义编辑状态的图标，例如第三方图标库：font-awesome、inconfont<br>
      对于某些需要局部保存的场景，可以在数据保存完成后调用 <table-api-link prop="reloadRow"/> 方法加载行数据并恢复到初始状态<br>
      <span class="red">（注：开启 showStatus 后如果使用自定义渲染需要配合 <table-api-link prop="updateStatus"/> 方法使用，在对应单元格的值发生改变时调用更新状态）</span>
    </p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button icon="fa fa-plus" @click="insertEvent">新增</vxe-button>
        <vxe-button @click="$refs.xTable.removeCheckboxRow()">删除选中</vxe-button>
        <vxe-button @click="getInsertEvent">获取新增</vxe-button>
        <vxe-button @click="getRemoveEvent">获取删除</vxe-button>
        <vxe-button @click="getUpdateEvent">获取修改</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      show-overflow
      keep-source
      ref="xTable"
      class="my_table_status"
      :data="tableData"
      :edit-config="{trigger: 'click', mode: 'cell', showStatus: true, icon: 'fa fa-pencil-square-o'}">
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="address" title="Address" :edit-render="{name: 'textarea'}"></vxe-table-column>
      <vxe-table-column field="date3" title="Date" formatter="formatDate"></vxe-table-column>
      <vxe-table-column title="操作" width="200">
        <template v-slot="{ row, rowIndex }">
          <template v-if="!row.date3">
            <vxe-button @click="saveEvent2(row)" :loading="row.loading">更新并替换新数据</vxe-button>
          </template>
          <template v-else-if="rowIndex % 2 === 0">
            <vxe-button @click="saveEvent(row)" :loading="row.loading">更新行数据</vxe-button>
          </template>
          <template v-else>
            <vxe-button status="primary" @click="saveEvent(row, 'name')" :loading="row.loading">更新 Name 列</vxe-button>
          </template>
        </template>
      </vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
      <pre-code class="css">{{ demoCodes[2] }}</pre-code>
    </pre>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'

export default {
  data () {
    return {
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, address: 'vxe-table 从入门到放弃' },
        { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: '0', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: '1', age: 23, address: 'vxe-table 从入门到放弃' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: '1', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: '1', age: 21, address: 'vxe-table 从入门到放弃' }
      ],
      demoCodes: [
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button icon="fa fa-plus" @click="insertEvent">新增</vxe-button>
            <vxe-button @click="$refs.xTable.removeCheckboxRow()">删除选中</vxe-button>
            <vxe-button @click="getInsertEvent">获取新增</vxe-button>
            <vxe-button @click="getRemoveEvent">获取删除</vxe-button>
            <vxe-button @click="getUpdateEvent">获取修改</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          show-overflow
          keep-source
          ref="xTable"
          class="my_table_status"
          :data="tableData"
          :edit-config="{trigger: 'click', mode: 'cell', showStatus: true, icon: 'fa fa-pencil-square-o'}">
          <vxe-table-column type="checkbox" width="60"></vxe-table-column>
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="address" title="Address" :edit-render="{name: 'textarea'}"></vxe-table-column>
          <vxe-table-column field="date3" title="Date" formatter="formatDate"></vxe-table-column>
          <vxe-table-column title="操作" width="200">
            <template v-slot="{ row, rowIndex }">
              <template v-if="!row.date3">
                <vxe-button @click="saveEvent2(row)" :loading="row.loading">更新并替换新数据</vxe-button>
              </template>
              <template v-else-if="rowIndex % 2 === 0">
                <vxe-button @click="saveEvent(row)" :loading="row.loading">更新行数据</vxe-button>
              </template>
              <template v-else>
                <vxe-button status="primary" @click="saveEvent(row, 'name')" :loading="row.loading">更新 Name 列</vxe-button>
              </template>
            </template>
          </vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, address: 'vxe-table 从入门到放弃' },
                { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: '0', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: '1', age: 23, address: 'vxe-table 从入门到放弃' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: '1', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: '1', age: 21, address: 'vxe-table 从入门到放弃' }
              ]
            }
          },
          methods: {
            insertEvent () {
              this.$refs.xTable.insert()
                .then(({ row }) => this.$refs.xTable.setActiveCell(row, 'name'))
            },
            saveEvent (row, field) {
              let xTable = this.$refs.xTable
              if (xTable.isUpdateByRow(row)) {
                row.loading = true
                this.submitSave(row).then(data => {
                  // 局部保存，并将行数据恢复到初始状态（如果 record 为空则不改动行数据，只恢复状态）
                  xTable.reloadRow(row, null, field)
                  this.$XModal.message({ message: '保存成功！', status: 'success' })
                  row.loading = false
                })
              } else {
                this.$XModal.message({ message: '数据未改动！', status: 'info' })
              }
            },
            saveEvent2 (row, field) {
              let xTable = this.$refs.xTable
              if (xTable.isUpdateByRow(row)) {
                row.loading = true
                this.submitSave(row).then(data => {
                  // 局部保存，并更新本地数据
                  xTable.reloadRow(row, data, field)
                  this.$XModal.message({ message: '保存成功！', status: 'success' })
                  row.loading = false
                })
              } else {
                this.$XModal.message({ message: '数据未改动！', status: 'info' })
              }
            },
            submitSave (row) {
              return new Promise(resolve => {
                let rest = {
                  date3: XEUtils.toDateString(new Date())
                }
                if (row.name) {
                  rest.name = row.name
                }
                if (row.sex) {
                  rest.sex = row.sex
                }
                setTimeout(() => resolve(rest), 500)
              })
            },
            getInsertEvent () {
              let insertRecords = this.$refs.xTable.getInsertRecords()
              this.$XModal.alert(insertRecords.length)
            },
            getRemoveEvent () {
              let removeRecords = this.$refs.xTable.getRemoveRecords()
              this.$XModal.alert(removeRecords.length)
            },
            getUpdateEvent () {
              let updateRecords = this.$refs.xTable.getUpdateRecords()
              this.$XModal.alert(updateRecords.length)
            }
          }
        }
        `,
        `
        .my_table_status .vxe-body--row.is--new {
          background-color: #f1fdf1;
        }
        `
      ]
    }
  },
  methods: {
    insertEvent () {
      this.$refs.xTable.insert()
        .then(({ row }) => this.$refs.xTable.setActiveCell(row, 'name'))
    },
    saveEvent (row, field) {
      const xTable = this.$refs.xTable
      if (xTable.isUpdateByRow(row)) {
        row.loading = true
        this.submitSave(row).then(() => {
          // 局部保存，并将行数据恢复到初始状态（如果 record 为空则不改动行数据，只恢复状态）
          xTable.reloadRow(row, null, field)
          this.$XModal.message({ message: '保存成功！', status: 'success' })
          row.loading = false
        })
      } else {
        this.$XModal.message({ message: '数据未改动！', status: 'info' })
      }
    },
    saveEvent2 (row, field) {
      const xTable = this.$refs.xTable
      if (xTable.isUpdateByRow(row)) {
        row.loading = true
        this.submitSave(row).then(data => {
          // 局部保存，并更新本地数据
          xTable.reloadRow(row, data, field)
          this.$XModal.message({ message: '保存成功！', status: 'success' })
          row.loading = false
        })
      } else {
        this.$XModal.message({ message: '数据未改动！', status: 'info' })
      }
    },
    submitSave (row) {
      return new Promise(resolve => {
        const rest = {
          date3: XEUtils.toDateString(new Date())
        }
        if (row.name) {
          rest.name = row.name
        }
        if (row.sex) {
          rest.sex = row.sex
        }
        setTimeout(() => resolve(rest), 500)
      })
    },
    getInsertEvent () {
      const insertRecords = this.$refs.xTable.getInsertRecords()
      this.$XModal.alert(insertRecords.length)
    },
    getRemoveEvent () {
      const removeRecords = this.$refs.xTable.getRemoveRecords()
      this.$XModal.alert(removeRecords.length)
    },
    getUpdateEvent () {
      const updateRecords = this.$refs.xTable.getUpdateRecords()
      this.$XModal.alert(updateRecords.length)
    }
  }
}
</script>

<style>
.my_table_status .vxe-body--row.is--new {
  background-color: #f1fdf1;
}
</style>
