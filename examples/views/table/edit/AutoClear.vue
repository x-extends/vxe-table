<template>
  <div>
    <p class="tip">
      通过设置 <table-api-link prop="edit-config"/>.<table-api-link prop="autoClear"/> 关闭默认的单元格清除激活行为<br>
      <span class="red">（注：如果设置为手动模式则不会自动关闭激活状态，需要手动调用 clearActived 关闭编辑状态）</span>
    </p>

    <vxe-table
      border
      show-overflow
      keep-source
      ref="xTable"
      :data="tableData"
      :edit-config="{ trigger: 'manual', mode: 'row', autoClear: false}">
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column field="name" title="Name" :edit-render="{name: 'input', immediate: true}"></vxe-column>
      <vxe-column field="sex" title="Sex" :edit-render="{name: 'select', options: sexList}"></vxe-column>
      <vxe-column field="date" title="Date" :edit-render="{name: 'input', immediate: true, attrs: { type: 'date' }}"></vxe-column>
      <vxe-column field="num" title="Num" :edit-render="{name: 'input', immediate: true, attrs: {type: 'number'}}"></vxe-column>
      <vxe-column field="address" title="Address" :edit-render="{name: 'textarea'}"></vxe-column>
      <vxe-column title="操作">
        <template #default="{ row }">
          <template v-if="$refs.xTable.isActiveByRow(row)">
            <vxe-button @click="saveRowEvent(row)">保存</vxe-button>
            <vxe-button @click="cancelRowEvent(row)">取消</vxe-button>
          </template>
          <template v-else>
            <vxe-button @click="editRowEvent(row)">编辑</vxe-button>
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
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, address: 'test abc' },
        { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: '0', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: '1', age: 23, address: 'test abc' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: '1', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: '1', age: 21, address: 'test abc' }
      ],
      sexList: [
        { label: '女', value: '0' },
        { label: '男', value: '1' }
      ],
      demoCodes: [
        `
        <vxe-table
          border
          show-overflow
          keep-source
          ref="xTable"
          :data="tableData"
          :edit-config="{ trigger: 'manual', mode: 'row', autoClear: false}">
          <vxe-column type="seq" width="60"></vxe-column>
          <vxe-column field="name" title="Name" :edit-render="{name: 'input', immediate: true}"></vxe-column>
          <vxe-column field="sex" title="Sex" :edit-render="{name: 'select', options: sexList}"></vxe-column>
          <vxe-column field="date" title="Date" :edit-render="{name: 'input', immediate: true, attrs: { type: 'date' }}"></vxe-column>
          <vxe-column field="num" title="Num" :edit-render="{name: 'input', immediate: true, attrs: {type: 'number'}}"></vxe-column>
          <vxe-column field="address" title="Address" :edit-render="{name: 'textarea'}"></vxe-column>
          <vxe-column title="操作">
            <template #default="{ row }">
              <template v-if="$refs.xTable.isActiveByRow(row)">
                <vxe-button @click="saveRowEvent(row)">保存</vxe-button>
                <vxe-button @click="cancelRowEvent(row)">取消</vxe-button>
              </template>
              <template v-else>
                <vxe-button @click="editRowEvent(row)">编辑</vxe-button>
              </template>
            </template>
          </vxe-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, address: 'test abc' },
                { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: '0', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: '1', age: 23, address: 'test abc' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: '1', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: '1', age: 21, address: 'test abc' }
              ],
              sexList: [
                { label: '女', value: '0' },
                { label: '男', value: '1' }
              ]
            }
          },
          methods: {
            editRowEvent (row) {
              const $table = this.$refs.xTable
              $table.setActiveRow(row)
            },
            saveRowEvent () {
              const $table = this.$refs.xTable
              $table.clearActived().then(() => {
                this.$XModal.alert('success')
              })
            },
            cancelRowEvent (row) {
              const $table = this.$refs.xTable
              $table.clearActived()
                .then(() => $table.revertData(row))
            }
          }
        }
        `
      ]
    }
  },
  methods: {
    editRowEvent (row) {
      const $table = this.$refs.xTable
      $table.setActiveRow(row)
    },
    saveRowEvent () {
      const $table = this.$refs.xTable
      $table.clearActived().then(() => {
        this.$XModal.alert('success')
      })
    },
    cancelRowEvent (row) {
      const $table = this.$refs.xTable
      $table.clearActived()
        .then(() => $table.revertData(row))
    }
  }
}
</script>
