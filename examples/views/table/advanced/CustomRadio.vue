<template>
  <div>
    <p class="tip">自定义单选框，通过插槽 <table-column-api-link prop="radio"/> 自定义模板</p>

    <vxe-table
      border
      ref="xTable"
      height="400"
      :data="tableData">
      <vxe-table-column type="radio" width="60">
        <template #radio="{ row, checked }">
          <span class="custom-radio" @click.stop="$refs.xTable.setRadioRow(row)">
            <span v-if="checked">🌝</span>
            <span v-else>🌚</span>
          </span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="role" title="Role"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="address" title="Address"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
      <pre-code class="css">{{ demoCodes[2] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { VxeTableInstance } from '../../../../types/index'

export default defineComponent({
  setup () {
    const xTable = ref({} as VxeTableInstance)
    const tableData = ref([
      { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 26, address: 'vxe-table 从入门到放弃' },
      { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 32, address: 'Shanghai' },
      { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Beijing' },
      { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃' },
      { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shenzhen' },
      { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women ', age: 21, address: 'vxe-table 从入门到放弃' },
      { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man ', age: 42, address: 'vxe-table 从入门到放弃' },
      { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man ', age: 35, address: 'vxe-table 从入门到放弃' }
    ])
    return {
      tableData,
      xTable,
      demoCodes: [
        `
        <vxe-table
          border
          ref="xTable"
          height="400"
          :data="tableData">
          <vxe-table-column type="radio" width="60">
            <template #radio="{ row, checked }">
              <span class="custom-radio" @click.stop="$refs.xTable.setRadioRow(row)">
                <span v-if="checked">🌝</span>
                <span v-else>🌚</span>
              </span>
            </template>
          </vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="role" title="Role"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
          <vxe-table-column field="address" title="Address"></vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, ref } from 'vue'
        import { VxeTableInstance } from 'vxe-table'

        export default defineComponent({
          setup () {
            const xTable = ref({} as VxeTableInstance)
            const tableData = ref([
              { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 26, address: 'vxe-table 从入门到放弃' },
              { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 32, address: 'Shanghai' },
              { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Beijing' },
              { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃' },
              { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shenzhen' },
              { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women ', age: 21, address: 'vxe-table 从入门到放弃' },
              { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man ', age: 42, address: 'vxe-table 从入门到放弃' },
              { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man ', age: 35, address: 'vxe-table 从入门到放弃' }
            ])
            return {
              tableData,
              xTable
            }
          }
        })
        `,
        `
        .custom-radio {
          font-size: 18px;
          cursor: pointer;
        }
        `
      ]
    }
  }
})
</script>

<style lang="scss" scoped>
.custom-radio {
  font-size: 18px;
  cursor: pointer;
}
</style>
