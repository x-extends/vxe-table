<template>
  <div>
    <p class="tip">
      通过调用 <table-api-link prop="validate"/> 函数校验数据，<table-api-link prop="edit-rules"/> 校验规则配置，如果第一个参数为 true 则全量校验<br>
      <span class="red">（如果不指定数据，则默认只校验临时变动的数据，例如新增或修改...等）</span>
    </p>

    <vxe-toolbar>
      <template #buttons>
        <vxe-button @click="insertEvent">新增</vxe-button>
        <vxe-button @click="$refs.xTable.removeCheckboxRow()">删除选中</vxe-button>
        <vxe-button @click="validEvent">快速校验</vxe-button>
        <vxe-button @click="fullValidEvent">完整快速校验</vxe-button>
        <vxe-button @click="validAllEvent">全量数据校验</vxe-button>
        <vxe-button @click="selectValidEvent">选中行校验</vxe-button>
        <vxe-button @click="getSelectEvent">获取选中</vxe-button>
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
      :data="tableData"
      :edit-rules="validRules"
      :edit-config="{trigger: 'click', mode: 'row', showStatus: true}">
      <vxe-table-column type="checkbox" width="80"></vxe-table-column>
      <vxe-table-column type="seq" width="80"></vxe-table-column>
      <vxe-table-column field="name" title="Name" width="400" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="age" title="Age" width="200" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="sex2" title="Sex" width="200" :edit-render="{name: '$input'}"></vxe-table-column>
      <vxe-table-column field="date" title="Date" width="300" fixed="right" :edit-render="{name: '$input', props: {type: 'date'}}"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="tsx">
import { defineComponent, ref } from 'vue'
import { VXETable } from '../../../../packages/all'
import { VxeTableInstance, VxeTablePropTypes, VxeTableDefines } from '../../../../types/index'

export default defineComponent({
  setup () {
    const xTable = ref({} as VxeTableInstance)

    const tableData = ref([
      { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, address: 'vxe-table 从入门到放弃' },
      { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, address: 'Guangzhou' },
      { id: 10003, name: 'Test3', role: 'PM', sex: '0', age: 32, address: 'Shanghai' },
      { id: 10004, name: 'Test4', role: 'Designer', sex: '1', age: 23, address: 'vxe-table 从入门到放弃' },
      { id: 10005, name: 'Test5', role: 'Develop', sex: '1', age: 30, address: 'Shanghai' },
      { id: 10006, name: 'Test6', role: 'Designer', sex: '1', age: 21, address: 'vxe-table 从入门到放弃' }
    ] as VxeTablePropTypes.Data)

    const validRules = ref({
      name: [
        {
          validator ({ cellValue }) {
            if (cellValue && !/^\w+$/.test(cellValue)) {
              return new Error('名称格式不正确，必须字母或数字')
            }
          }
        }
      ],
      sex2: [
        { required: true, message: '性别必须填写' }
      ],
      age: [
        { type: 'number', min: 10, max: 100000, message: '输入 10 ~ 100000 范围' }
      ],
      date: [
        { required: true, message: '日期必须填写' }
      ]
    } as VxeTablePropTypes.EditRules)

    const validEvent = async () => {
      const $table = xTable.value
      const errMap = await $table.validate().catch(errMap => errMap)
      if (errMap) {
        VXETable.modal.message({ status: 'error', message: '校验不通过！' })
      } else {
        VXETable.modal.message({ status: 'success', message: '校验成功！' })
      }
    }

    const fullValidEvent = async () => {
      const $table = xTable.value
      const errMap: VxeTableDefines.ValidatorErrorMapParams = await $table.fullValidate().catch(errMap => errMap)
      if (errMap) {
        const msgList: string[] = []
        Object.values(errMap).forEach(errList => {
          errList.forEach(params => {
            const { rowIndex, column, rules } = params
            rules.forEach(rule => {
              msgList.push(`第 ${rowIndex + 1} 行 ${column.title} 校验错误：${rule.message}`)
            })
          })
        })
        VXETable.modal.message({
          status: 'error',
          slots: {
            default () {
              return [
                <div class="red" style="max-height: 400px;overflow: auto;">
                  {
                    msgList.map(msg => <div>{ msg }</div>)
                  }
                </div>
              ]
            }
          }
        })
      } else {
        VXETable.modal.message({ status: 'success', message: '校验成功！' })
      }
    }

    const validAllEvent = async () => {
      const $table = xTable.value
      const errMap = await $table.validate(true).catch(errMap => errMap)
      if (errMap) {
        VXETable.modal.message({ status: 'error', message: '校验不通过！' })
      } else {
        VXETable.modal.message({ status: 'success', message: '校验成功！' })
      }
    }

    const selectValidEvent = async () => {
      const $table = xTable.value
      const selectRecords = $table.getCheckboxRecords()
      if (selectRecords.length > 0) {
        const errMap = await $table.validate(selectRecords).catch(errMap => errMap)
        if (errMap) {
          VXETable.modal.message({ status: 'error', message: '校验不通过！' })
        } else {
          VXETable.modal.message({ status: 'success', message: '校验成功！' })
        }
      } else {
        VXETable.modal.message({ status: 'warning', message: '未选中数据！' })
      }
    }

    const insertEvent = async () => {
      const $table = xTable.value
      const { row: newRow } = await $table.insert({})
      // 插入一条数据并触发校验
      const errMap = await $table.validate(newRow).catch(errMap => errMap)
      if (errMap) {

      }
    }

    const getSelectEvent = () => {
      const $table = xTable.value
      const selectRecords = $table.getCheckboxRecords()
      VXETable.modal.alert(selectRecords.length)
    }

    const getInsertEvent = () => {
      const $table = xTable.value
      const insertRecords = $table.getInsertRecords()
      VXETable.modal.alert(insertRecords.length)
    }

    const getRemoveEvent = () => {
      const $table = xTable.value
      const removeRecords = $table.getRemoveRecords()
      VXETable.modal.alert(removeRecords.length)
    }

    const getUpdateEvent = () => {
      const $table = xTable.value
      const updateRecords = $table.getUpdateRecords()
      VXETable.modal.alert(updateRecords.length)
    }

    return {
      xTable,
      tableData,
      validRules,
      validEvent,
      fullValidEvent,
      validAllEvent,
      selectValidEvent,
      insertEvent,
      getSelectEvent,
      getInsertEvent,
      getRemoveEvent,
      getUpdateEvent,
      demoCodes: [
        `
        <vxe-toolbar>
          <template #buttons>
            <vxe-button @click="insertEvent">新增</vxe-button>
            <vxe-button @click="$refs.xTable.removeCheckboxRow()">删除选中</vxe-button>
            <vxe-button @click="validEvent">快速校验</vxe-button>
            <vxe-button @click="fullValidEvent">完整快速校验</vxe-button>
            <vxe-button @click="validAllEvent">全量数量校验</vxe-button>
            <vxe-button @click="selectValidEvent">选中行校验</vxe-button>
            <vxe-button @click="getSelectEvent">获取选中</vxe-button>
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
          :data="tableData"
          :edit-rules="validRules"
          :edit-config="{trigger: 'click', mode: 'row', showStatus: true}">
          <vxe-table-column type="checkbox" width="80"></vxe-table-column>
          <vxe-table-column type="seq" width="80"></vxe-table-column>
          <vxe-table-column field="name" title="Name" width="400" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="age" title="Age" width="200" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="sex2" title="Sex" width="200" :edit-render="{name: '$input'}"></vxe-table-column>
          <vxe-table-column field="date" title="Date" width="300" fixed="right" :edit-render="{name: '$input', props: {type: 'date'}}"></vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, ref } from 'vue'
        import { VXETable, VxeTableInstance, VxeTablePropTypes, VxeTableDefines } from 'vxe-table'

        export default defineComponent({
          setup () {
            const xTable = ref({} as VxeTableInstance)

            const tableData = ref([
              { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, address: 'vxe-table 从入门到放弃' },
              { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, address: 'Guangzhou' },
              { id: 10003, name: 'Test3', role: 'PM', sex: '0', age: 32, address: 'Shanghai' },
              { id: 10004, name: 'Test4', role: 'Designer', sex: '1', age: 23, address: 'vxe-table 从入门到放弃' },
              { id: 10005, name: 'Test5', role: 'Develop', sex: '1', age: 30, address: 'Shanghai' },
              { id: 10006, name: 'Test6', role: 'Designer', sex: '1', age: 21, address: 'vxe-table 从入门到放弃' }
            ] as VxeTablePropTypes.Data)

            const validRules = ref({
              name: [
                {
                  validator ({ cellValue }) {
                    if (cellValue && !/^\\w+$/.test(cellValue)) {
                      return new Error('名称格式不正确，必须字母或数字')
                    }
                  }
                }
              ],
              sex2: [
                { required: true, message: '性别必须填写' }
              ],
              age: [
                { type: 'number', min: 10, max: 100000, message: '输入 10 ~ 100000 范围' }
              ],
              date: [
                { required: true, message: '日期必须填写' }
              ]
            } as VxeTablePropTypes.EditRules)

            const validEvent = async () => {
              const $table = xTable.value
              const errMap = await $table.validate().catch(errMap => errMap)
              if (errMap) {
                VXETable.modal.message({ status: 'error', message: '校验不通过！' })
              } else {
                VXETable.modal.message({ status: 'success', message: '校验成功！' })
              }
            }

            const fullValidEvent = async () => {
              const $table = xTable.value
              const errMap: VxeTableDefines.ValidatorErrorMapParams = await $table.fullValidate().catch(errMap => errMap)
              if (errMap) {
                const msgList: string[] = []
                Object.values(errMap).forEach(errList => {
                  errList.forEach(params => {
                    const { rowIndex, column, rules } = params
                    rules.forEach(rule => {
                      msgList.push(\`第 \${rowIndex + 1} 行 \${column.title} 校验错误：\${rule.message}\`)
                    })
                  })
                })
                VXETable.modal.message({
                  status: 'error',
                  slots: {
                    default () {
                      return [
                        <div class="red" style="max-height: 400px;overflow: auto;">
                          {
                            msgList.map(msg => <div>{ msg }</div>)
                          }
                        </div>
                      ]
                    }
                  }
                })
              } else {
                VXETable.modal.message({ status: 'success', message: '校验成功！' })
              }
            }

            const validAllEvent = async () => {
              const $table = xTable.value
              const errMap = await $table.validate(true).catch(errMap => errMap)
              if (errMap) {
                VXETable.modal.message({ status: 'error', message: '校验不通过！' })
              } else {
                VXETable.modal.message({ status: 'success', message: '校验成功！' })
              }
            }

            const selectValidEvent = async () => {
              const $table = xTable.value
              const selectRecords = $table.getCheckboxRecords()
              if (selectRecords.length > 0) {
                const errMap = await $table.validate(selectRecords).catch(errMap => errMap)
                if (errMap) {
                  VXETable.modal.message({ status: 'error', message: '校验不通过！' })
                } else {
                  VXETable.modal.message({ status: 'success', message: '校验成功！' })
                }
              } else {
                VXETable.modal.message({ status: 'warning', message: '未选中数据！' })
              }
            }

            const insertEvent = async () => {
              const $table = xTable.value
              const { row: newRow } = await $table.insert({})
              // 插入一条数据并触发校验
              const errMap = await $table.validate(newRow).catch(errMap => errMap)
              if (errMap) {

              }
            }

            const getSelectEvent = () => {
              const $table = xTable.value
              const selectRecords = $table.getCheckboxRecords()
              VXETable.modal.alert(selectRecords.length)
            }

            const getInsertEvent = () => {
              const $table = xTable.value
              const insertRecords = $table.getInsertRecords()
              VXETable.modal.alert(insertRecords.length)
            }

            const getRemoveEvent = () => {
              const $table = xTable.value
              const removeRecords = $table.getRemoveRecords()
              VXETable.modal.alert(removeRecords.length)
            }

            const getUpdateEvent = () => {
              const $table = xTable.value
              const updateRecords = $table.getUpdateRecords()
              VXETable.modal.alert(updateRecords.length)
            }

            return {
              xTable,
              tableData,
              validRules,
              validEvent,
              fullValidEvent,
              validAllEvent,
              selectValidEvent,
              insertEvent,
              getSelectEvent,
              getInsertEvent,
              getRemoveEvent,
              getUpdateEvent
            }
          }
        })
        `
      ]
    }
  }
})
</script>
