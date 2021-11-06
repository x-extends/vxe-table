<template>
  <div>
    <p class="tip">
      设置 <table-api-link prop="keep-source"/> 开启保持原始值状态和 <table-api-link prop="edit-config"/>={showStatus, showUpdateStatus, showInsertStatus} 开启编辑状态显示功能，还可以通过 icon 自定义编辑状态的图标，例如第三方图标库：font-awesome、inconfont<br>
      对于某些需要局部保存的场景，可以在数据保存完成后调用 <table-api-link prop="reloadRow"/> 方法加载行数据并恢复到初始状态<br>
      <span class="red">（注：开启 showStatus 后如果使用自定义渲染需要配合 <table-api-link prop="updateStatus"/> 方法使用，在对应单元格的值发生改变时调用更新状态）</span>
    </p>

    <vxe-toolbar>
      <template #buttons>
        <vxe-button icon="fa fa-plus" @click="insertEvent">新增</vxe-button>
        <vxe-button @click="$refs.xTable.removeCheckboxRow()">删除选中</vxe-button>
        <vxe-button @click="getInsertEvent">获取新增</vxe-button>
        <vxe-button @click="getRemoveEvent">获取删除</vxe-button>
        <vxe-button @click="getUpdateEvent">获取修改</vxe-button>
        <vxe-button @click="saveEvent">保存</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      show-overflow
      keep-source
      ref="xTable"
      :loading="loading"
      :data="tableData"
      :edit-config="{trigger: 'click', mode: 'cell', showStatus: true, icon: 'fa fa-pencil-square-o'}">
      <vxe-column type="checkbox" width="60"></vxe-column>
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column field="name" title="Name" :edit-render="{autofocus: '.myinput'}">
        <template #edit="scope">
          <input type="text" class="myinput" v-model="scope.row.name" @input="$refs.xTable.updateStatus(scope)"/>
        </template>
      </vxe-column>
      <vxe-column field="sex" title="Sex" :edit-render="{autofocus: '.myinput'}">
        <template #edit="scope">
          <input type="text" class="myinput" v-model="scope.row.sex" @input="$refs.xTable.updateStatus(scope)"/>
        </template>
      </vxe-column>
      <vxe-column field="address" title="Address" :edit-render="{}">
        <template #edit="scope">
          <input type="text" v-model="scope.row.address" @input="$refs.xTable.updateStatus(scope)"/>
        </template>
      </vxe-column>
      <vxe-column field="date3" title="Date" formatter="formatDate">
        <template #edit="scope">
          <input type="date" v-model="scope.row.date3" @input="$refs.xTable.updateStatus(scope)"/>
        </template>
      </vxe-column>
      <vxe-column title="操作" width="200">
        <template #default="{ row }">
          <template v-if="$refs.xTable.isUpdateByRow(row)">
            <vxe-button @click="saveUpdateEvent(row)" :loading="row.loading">局部保存</vxe-button>
          </template>
        </template>
      </vxe-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, address: 'test abc' },
        { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: '0', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: '1', age: 23, address: 'test abc' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: '1', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: '1', age: 21, address: 'test abc' }
      ],
      demoCodes: [
        `
        <vxe-toolbar>
          <template #buttons>
            <vxe-button icon="fa fa-plus" @click="insertEvent">新增</vxe-button>
            <vxe-button @click="$refs.xTable.removeCheckboxRow()">删除选中</vxe-button>
            <vxe-button @click="getInsertEvent">获取新增</vxe-button>
            <vxe-button @click="getRemoveEvent">获取删除</vxe-button>
            <vxe-button @click="getUpdateEvent">获取修改</vxe-button>
            <vxe-button @click="saveEvent">保存</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          show-overflow
          keep-source
          ref="xTable"
          :loading="loading"
          :data="tableData"
          :edit-config="{trigger: 'click', mode: 'cell', showStatus: true, icon: 'fa fa-pencil-square-o'}">
          <vxe-column type="checkbox" width="60"></vxe-column>
          <vxe-column type="seq" width="60"></vxe-column>
          <vxe-column field="name" title="Name" :edit-render="{autofocus: '.myinput'}">
            <template #edit="scope">
              <input type="text" class="myinput" v-model="scope.row.name" @input="$refs.xTable.updateStatus(scope)"/>
            </template>
          </vxe-column>
          <vxe-column field="sex" title="Sex" :edit-render="{autofocus: '.myinput'}">
            <template #edit="scope">
              <input type="text" class="myinput" v-model="scope.row.sex" @input="$refs.xTable.updateStatus(scope)"/>
            </template>
          </vxe-column>
          <vxe-column field="address" title="Address" :edit-render="{}">
            <template #edit="scope">
              <input type="text" v-model="scope.row.address" @input="$refs.xTable.updateStatus(scope)"/>
            </template>
          </vxe-column>
          <vxe-column field="date3" title="Date" formatter="formatDate">
            <template #edit="scope">
              <input type="date" v-model="scope.row.date3" @input="$refs.xTable.updateStatus(scope)"/>
            </template>
          </vxe-column>
          <vxe-column title="操作" width="200">
            <template #default="{ row }">
              <template v-if="$refs.xTable.isUpdateByRow(row)">
                <vxe-button @click="saveUpdateEvent(row)" :loading="row.loading">局部保存</vxe-button>
              </template>
            </template>
          </vxe-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              loading: false,
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, address: 'test abc' },
                { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: '0', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: '1', age: 23, address: 'test abc' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: '1', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: '1', age: 21, address: 'test abc' }
              ]
            }
          },
          methods: {
            insertEvent () {
              const $table = this.$refs.xTable
              $table.insert().then(({ row }) => {
                $table.setActiveCell(row, 'name')
              })
            },
            saveUpdateEvent (row) {
              const $table = this.$refs.xTable
              if ($table.isUpdateByRow(row)) {
                row.loading = true
                // 模拟异步
                setTimeout(() => {
                  row.loading = false
                  // 保存完成后将行恢复到初始状态
                  $table.reloadRow(row, {})
                  this.$XModal.message({ content: '保存成功！', status: 'success' })
                }, 300)
              } else {
                this.$XModal.message({ content: '数据未改动！', status: 'info' })
              }
            },
            saveEvent () {
              this.loading = true
              // 默认异步
              setTimeout(() => {
                this.loading = false
                // 保存完成后重新刷新数据
                this.tableData = [
                  { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, address: 'test abc' },
                  { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, address: 'Guangzhou' },
                  { id: 10003, name: 'Test3', role: 'PM', sex: '0', age: 32, address: 'Shanghai' },
                  { id: 10004, name: 'Test4', role: 'Designer', sex: '1', age: 23, address: 'test abc' },
                  { id: 10005, name: 'Test5', role: 'Develop', sex: '1', age: 30, address: 'Shanghai' },
                  { id: 10006, name: 'Test6', role: 'Designer', sex: '1', age: 21, address: 'test abc' }
                ]
              }, 300)
            },
            getInsertEvent () {
              const $table = this.$refs.xTable
              const insertRecords = $table.getInsertRecords()
              this.$XModal.alert(insertRecords.length)
            },
            getRemoveEvent () {
              const $table = this.$refs.xTable
              const removeRecords = $table.getRemoveRecords()
              this.$XModal.alert(removeRecords.length)
            },
            getUpdateEvent () {
              const $table = this.$refs.xTable
              const updateRecords = $table.getUpdateRecords()
              this.$XModal.alert(updateRecords.length)
            }
          }
        }
        `
      ]
    }
  },
  methods: {
    insertEvent () {
      const $table = this.$refs.xTable
      $table.insert().then(({ row }) => {
        $table.setActiveCell(row, 'name')
      })
    },
    saveUpdateEvent (row) {
      const $table = this.$refs.xTable
      if ($table.isUpdateByRow(row)) {
        row.loading = true
        // 模拟异步
        setTimeout(() => {
          row.loading = false
          // 保存完成后将行恢复到初始状态
          $table.reloadRow(row, {})
          this.$XModal.message({ content: '保存成功！', status: 'success' })
        }, 300)
      } else {
        this.$XModal.message({ content: '数据未改动！', status: 'info' })
      }
    },
    saveEvent () {
      this.loading = true
      // 默认异步
      setTimeout(() => {
        this.loading = false
        // 保存完成后重新刷新数据
        this.tableData = [
          { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, address: 'test abc' },
          { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, address: 'Guangzhou' },
          { id: 10003, name: 'Test3', role: 'PM', sex: '0', age: 32, address: 'Shanghai' },
          { id: 10004, name: 'Test4', role: 'Designer', sex: '1', age: 23, address: 'test abc' },
          { id: 10005, name: 'Test5', role: 'Develop', sex: '1', age: 30, address: 'Shanghai' },
          { id: 10006, name: 'Test6', role: 'Designer', sex: '1', age: 21, address: 'test abc' }
        ]
      }, 300)
    },
    getInsertEvent () {
      const $table = this.$refs.xTable
      const insertRecords = $table.getInsertRecords()
      this.$XModal.alert(insertRecords.length)
    },
    getRemoveEvent () {
      const $table = this.$refs.xTable
      const removeRecords = $table.getRemoveRecords()
      this.$XModal.alert(removeRecords.length)
    },
    getUpdateEvent () {
      const $table = this.$refs.xTable
      const updateRecords = $table.getUpdateRecords()
      this.$XModal.alert(updateRecords.length)
    }
  }
}
</script>
