<template>
  <div>
    <p class="tip">设置 <table-api-link prop="edit-config"/> 的 <table-api-link prop="activeMethod"/> 方法判断单元格是否禁用，例如：限制第二行不允许编辑</p>

    <vxe-grid v-bind="gridOptions1" @edit-disabled="editDisabledEvent"></vxe-grid>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
    </pre>

    <p class="tip">配合  <table-api-link prop="edit-actived"/> 事件，实现行编辑中对列的权限控制，例如：限制 age 小于 27 或者 name 为 'x' 开头的列禁止编辑</p>

    <vxe-grid ref="xGrid2" v-bind="gridOptions2" @edit-actived="editActivedEvent"></vxe-grid>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[2] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[3] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { VxeGridProps, VxeGridInstance, VxeGridEvents } from '../../../types/index'

export default defineComponent({
  setup () {
    const gridOptions1 = reactive({
      border: true,
      showOverflow: true,
      editConfig: {
        trigger: 'click',
        mode: 'row',
        activeMethod ({ rowIndex }) {
          if (rowIndex === 1) {
            return false
          }
          return true
        }
      },
      columns: [
        { type: 'seq', width: 50 },
        { field: 'name', title: 'app.body.label.name', editRender: { name: 'input' } },
        { field: 'sex', title: 'app.body.label.sex', editRender: { name: 'input' } },
        { field: 'age', title: 'Age', editRender: { name: 'input' } },
        { field: 'address', title: 'Address', editRender: { name: 'input' } }
      ],
      data: [
        { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
        { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
        { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' }
      ]
    } as VxeGridProps)

    const editDisabledEvent: VxeGridEvents.EditDisabled = () => {
      console.log('禁止编辑')
    }

    const xGrid2 = ref({} as VxeGridInstance)

    const gridOptions2 = reactive({
      border: true,
      showOverflow: true,
      editConfig: {
        trigger: 'click',
        mode: 'row'
      },
      columns: [
        { type: 'seq', width: 50 },
        { field: 'name', title: 'app.body.label.name', editRender: { name: 'input', attrs: { disabled: false } } },
        { field: 'sex', title: 'app.body.label.sex', editRender: { name: 'input', attrs: { disabled: false } } },
        { field: 'age', title: 'Age', editRender: { name: 'input', attrs: { disabled: false } } },
        { field: 'address', title: 'Address', editRender: { name: 'input' } }
      ],
      data: [
        { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
        { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'xest3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
        { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' }
      ]
    } as VxeGridProps)

    const editActivedEvent: VxeGridEvents.EditDisabled = ({ row }) => {
      const $grid = xGrid2.value
      const nameColumn = $grid.getColumnByField('name')
      const ageColumn = $grid.getColumnByField('age')
      const sexColumn = $grid.getColumnByField('sex')
      // name 为 'x' 开头的列禁止编辑
      const isNameDisabled = (row.name || '').indexOf('x') === 0
      // age 小于 27 的列禁止编辑
      const isAgeDisabled = row.age < 27
      // sex 值编辑为 1 的列禁止编辑
      const isSexDisabled = row.sex === '1'

      if (nameColumn && nameColumn.editRender.attrs) {
        nameColumn.editRender.attrs.disabled = isNameDisabled
      }
      if (ageColumn && ageColumn.editRender.attrs) {
        ageColumn.editRender.attrs.disabled = isAgeDisabled
      }
      if (sexColumn && sexColumn.editRender.attrs) {
        sexColumn.editRender.attrs.disabled = isSexDisabled
      }
    }

    return {
      gridOptions1,
      editDisabledEvent,
      xGrid2,
      gridOptions2,
      editActivedEvent,
      demoCodes: [
        `
        <vxe-grid v-bind="gridOptions1" @edit-disabled="editDisabledEvent"></vxe-grid>
        `,
        `
        import { defineComponent, reactive } from 'vue'
        import { VxeGridProps, VxeGridEvents } from 'vxe-table'

        export default defineComponent({
          setup () {
            const gridOptions1 = reactive({
              border: true,
              showOverflow: true,
              editConfig: {
                trigger: 'click',
                mode: 'row',
                activeMethod ({ rowIndex }) {
                  if (rowIndex === 1) {
                    return false
                  }
                  return true
                }
              },
              columns: [
                { type: 'seq', width: 50 },
                { field: 'name', title: 'app.body.label.name', editRender: { name: 'input' } },
                { field: 'sex', title: 'app.body.label.sex', editRender: { name: 'input' } },
                { field: 'age', title: 'Age', editRender: { name: 'input' } },
                { field: 'address', title: 'Address', editRender: { name: 'input' } }
              ],
              data: [
                { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
                { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
                { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' }
              ]
            } as VxeGridProps)

            const editDisabledEvent: VxeGridEvents.EditDisabled = () => {
              console.log('禁止编辑')
            }

            return {
              gridOptions1,
              editDisabledEvent
            }
          }
        })
        `,
        `
        <vxe-grid ref="xGrid2" v-bind="gridOptions2" @edit-actived="editActivedEvent"></vxe-grid>
        `,
        `
        import { defineComponent, reactive, ref } from 'vue'
        import { VxeGridProps, VxeGridInstance, VxeGridEvents } from 'vxe-table'

        export default defineComponent({
          setup () {
            const xGrid2 = ref({} as VxeGridInstance)

            const gridOptions2 = reactive({
              border: true,
              showOverflow: true,
              editConfig: {
                trigger: 'click',
                mode: 'row'
              },
              columns: [
                { type: 'seq', width: 50 },
                { field: 'name', title: 'app.body.label.name', editRender: { name: 'input', attrs: { disabled: false } } },
                { field: 'sex', title: 'app.body.label.sex', editRender: { name: 'input', attrs: { disabled: false } } },
                { field: 'age', title: 'Age', editRender: { name: 'input', attrs: { disabled: false } } },
                { field: 'address', title: 'Address', editRender: { name: 'input' } }
              ],
              data: [
                { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
                { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'xest3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
                { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' }
              ]
            } as VxeGridProps)

            const editActivedEvent: VxeGridEvents.EditDisabled = ({ row }) => {
              const $grid = xGrid2.value
              const nameColumn = $grid.getColumnByField('name')
              const ageColumn = $grid.getColumnByField('age')
              const sexColumn = $grid.getColumnByField('sex')
              // name 为 'x' 开头的列禁止编辑
              const isNameDisabled = (row.name || '').indexOf('x') === 0
              // age 小于 27 的列禁止编辑
              const isAgeDisabled = row.age < 27
              // sex 值编辑为 1 的列禁止编辑
              const isSexDisabled = row.sex === '1'

              if (nameColumn && nameColumn.editRender.attrs) {
                nameColumn.editRender.attrs.disabled = isNameDisabled
              }
              if (ageColumn && ageColumn.editRender.attrs) {
                ageColumn.editRender.attrs.disabled = isAgeDisabled
              }
              if (sexColumn && sexColumn.editRender.attrs) {
                sexColumn.editRender.attrs.disabled = isSexDisabled
              }
            }

            return {
              xGrid2,
              gridOptions2,
              editActivedEvent
            }
          }
        })
        `
      ]
    }
  }
})
</script>
