<template>
  <div>
    <p class="tip">
      通过表尾来实现合计功能，对于某些场景下如果需要频繁计算的可以手动调用 <table-api-link prop="updateFooter"/> 函数<br>
      <span class="red">（注：<table-api-link prop="footer-method"/> 表尾的数据都是自行生成的，该示例仅供参考）</span>
    </p>

    <vxe-toolbar export>
      <template #buttons>
        <vxe-button @click="insertEvent">新增</vxe-button>
        <vxe-button @click="removeEvent">删除</vxe-button>
        <vxe-button @click="saveEvent">保存</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      show-footer
      show-overflow
      highlight-hover-row
      ref="xTable"
      height="400"
      class="editable-footer"
      :export-config="{}"
      :footer-method="footerMethod"
      :footer-cell-class-name="footerCellClassName"
      :data="demo1.tableData"
      :edit-config="{trigger: 'click', mode: 'row'}">
      <vxe-column type="checkbox" width="60"></vxe-column>
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-column>
      <vxe-column field="age" title="Age" :edit-render="{name: '$input', props: {type: 'number', min: 1, max: 120}}"></vxe-column>
      <vxe-column field="date" title="Date" :edit-render="{name: 'input'}"></vxe-column>
      <vxe-column field="address" title="Address" :edit-render="{name: 'input'}"></vxe-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { VXETable } from '../../../../packages/all'
import { VxeTableInstance, VxeTablePropTypes } from '../../../../types/index'

export default defineComponent({
  setup () {
    const demo1 = reactive({
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, address: 'vxe-table 从入门到放弃' },
        { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: '0', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: '1', age: 23, address: 'vxe-table 从入门到放弃' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: '1', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: '1', age: 21, address: 'vxe-table 从入门到放弃' }
      ]
    })

    const xTable = ref({} as VxeTableInstance)

    const footerCellClassName: VxeTablePropTypes.FooterCellClassName = ({ $rowIndex, columnIndex }) => {
      if (columnIndex === 0) {
        if ($rowIndex === 0) {
          return 'col-blue'
        } else {
          return 'col-red'
        }
      }
    }

    const meanNum = (list: any[], field: string) => {
      let count = 0
      list.forEach(item => {
        count += Number(item[field])
      })
      return count / list.length
    }

    const sumNum = (list: any[], field: string) => {
      let count = 0
      list.forEach(item => {
        count += Number(item[field])
      })
      return count
    }

    const footerMethod: VxeTablePropTypes.FooterMethod = ({ columns, data }) => {
      return [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '平均'
          }
          if (['age'].includes(column.property)) {
            return meanNum(data, column.property)
          }
          return null
        }),
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '和值'
          }
          if (['age'].includes(column.property)) {
            return sumNum(data, column.property)
          }
          return null
        })
      ]
    }

    const insertEvent = async () => {
      const $table = xTable.value
      const record = {
        name: 'New name',
        age: 18
      }
      const { row: newRow } = await $table.insert(record)
      $table.setActiveCell(newRow, 'age')
    }

    const removeEvent = () => {
      const $table = xTable.value
      $table.removeCheckboxRow()
    }

    const saveEvent = () => {
      const $table = xTable.value
      const { insertRecords, removeRecords, updateRecords } = $table.getRecordset()
      VXETable.modal.alert(`insertRecords=${insertRecords.length} removeRecords=${removeRecords.length} updateRecords=${updateRecords.length}`)
    }

    return {
      demo1,
      xTable,
      footerCellClassName,
      footerMethod,
      insertEvent,
      removeEvent,
      saveEvent,
      demoCodes: [
        `
        <vxe-toolbar export>
          <template #buttons>
            <vxe-button @click="insertEvent">新增</vxe-button>
            <vxe-button @click="removeEvent">删除</vxe-button>
            <vxe-button @click="saveEvent">保存</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          show-footer
          show-overflow
          highlight-hover-row
          ref="xTable"
          height="400"
          class="editable-footer"
          :export-config="{}"
          :footer-method="footerMethod"
          :footer-cell-class-name="footerCellClassName"
          :data="demo1.tableData"
          :edit-config="{trigger: 'click', mode: 'row'}">
          <vxe-column type="checkbox" width="60"></vxe-column>
          <vxe-column type="seq" width="60"></vxe-column>
          <vxe-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-column>
          <vxe-column field="age" title="Age" :edit-render="{name: '$input', props: {type: 'number', min: 1, max: 120}}"></vxe-column>
          <vxe-column field="date" title="Date" :edit-render="{name: 'input'}"></vxe-column>
          <vxe-column field="address" title="Address" :edit-render="{name: 'input'}"></vxe-column>
        </vxe-table>
        `,
        `
        import { defineComponent, ref, reactive } from 'vue'
        import { VXETable, VxeTableInstance } from 'vxe-table'

        export default defineComponent({
          setup () {
            const demo1 = reactive({
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, address: 'vxe-table 从入门到放弃' },
                { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: '0', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: '1', age: 23, address: 'vxe-table 从入门到放弃' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: '1', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: '1', age: 21, address: 'vxe-table 从入门到放弃' }
              ]
            })

            const xTable = ref({} as VxeTableInstance)

            const footerCellClassName: VxeTablePropTypes.FooterCellClassName = ({ $rowIndex, columnIndex }) => {
              if (columnIndex === 0) {
                if ($rowIndex === 0) {
                  return 'col-blue'
                } else {
                  return 'col-red'
                }
              }
            }

            const meanNum = (list: any[], field: string) => {
              let count = 0
              list.forEach(item => {
                count += Number(item[field])
              })
              return count / list.length
            }

            const sumNum = (list: any[], field: string) => {
              let count = 0
              list.forEach(item => {
                count += Number(item[field])
              })
              return count
            }

            const footerMethod: VxeTablePropTypes.FooterMethod = ({ columns, data }) => {
              return [
                columns.map((column, columnIndex) => {
                  if (columnIndex === 0) {
                    return '平均'
                  }
                  if (['age'].includes(column.property)) {
                    return meanNum(data, column.property)
                  }
                  return null
                }),
                columns.map((column, columnIndex) => {
                  if (columnIndex === 0) {
                    return '和值'
                  }
                  if (['age'].includes(column.property)) {
                    return sumNum(data, column.property)
                  }
                  return null
                })
              ]
            }

            const insertEvent = async () => {
              const $table = xTable.value
              const record = {
                name: 'New name',
                age: 18
              }
              const { row: newRow } = await $table.insert(record)
              $table.setActiveCell(newRow, 'age')
            }

            const removeEvent = () => {
              const $table = xTable.value
              $table.removeCheckboxRow()
            }

            const saveEvent = () => {
              const $table = xTable.value
              const { insertRecords, removeRecords, updateRecords } = $table.getRecordset()
              VXETable.modal.alert(\`insertRecords=\${insertRecords.length} removeRecords=\${removeRecords.length} updateRecords=\${updateRecords.length}\`)
            }

            return {
              demo1,
              xTable,
              footerCellClassName,
              footerMethod,
              insertEvent,
              removeEvent,
              saveEvent
            }
          }
        })
        `
      ]
    }
  }
})
</script>

<style>
.editable-footer .vxe-footer--column.col-blue {
  background-color: #2db7f5;
  color: #fff;
}
.editable-footer .vxe-footer--column.col-red {
  background-color: red;
  color: #fff;
}
</style>
