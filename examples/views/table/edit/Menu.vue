<template>
  <div>
    <p class="tip">通过快捷菜单增删改查<span class="red">（具体请自行实现，该示例仅供参考）</span></p>

    <vxe-toolbar>
      <template #buttons>
        <vxe-button @click="getInsertEvent">获取新增</vxe-button>
        <vxe-button @click="getRemoveEvent">获取删除</vxe-button>
        <vxe-button @click="getUpdateEvent">获取修改</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      resizable
      show-overflow
      keep-source
      ref="xTable"
      height="400"
      :loading="demo1.loading"
      :data="demo1.tableData"
      :menu-config="demo1.tableMenu"
      :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
      @menu-click="contextMenuClickEvent">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="age" title="Age" :edit-render="{name: 'input'}"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { VXETable } from '../../../../packages/all'
import { VxeTableInstance, VxeTablePropTypes, VxeTableEvents } from '../../../../types/index'
import XEClipboard from 'xe-clipboard'

export default defineComponent({
  setup () {
    const xTable = ref({} as VxeTableInstance)

    const demo1 = reactive({
      loading: false,
      tableData: [] as any[],
      tableMenu: {
        header: {
          options: [
            [
              { code: 'hideColumn', name: '隐藏列', disabled: false },
              { code: 'showAllColumn', name: '取消所有隐藏列', disabled: false }
            ]
          ]
        },
        body: {
          options: [
            [
              { code: 'copy', name: '复制', prefixIcon: 'fa fa-copy', disabled: false },
              { code: 'reload', name: '刷新', disabled: false },
              { code: 'insertAt', name: '插入', disabled: false },
              { code: 'remove', name: '删除', disabled: false },
              { code: 'save', name: '保存', prefixIcon: 'fa fa-save', disabled: false }
            ]
          ]
        },
        visibleMethod ({ options, column }) {
          const isDisabled = !column
          options.forEach(list => {
            list.forEach(item => {
              item.disabled = isDisabled
            })
          })
          return true
        }
      } as VxeTablePropTypes.MenuConfig
    })

    const findList = () => {
      demo1.loading = true
      demo1.tableData = []
      setTimeout(() => {
        const list = [
          { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: '0', sex2: ['0'], num1: 40, age: 28, address: 'Shenzhen', date12: '', date13: '' },
          { id: 10002, name: 'Test2', nickname: 'T2', role: 'Designer', sex: '1', sex2: ['0', '1'], num1: 20, age: 22, address: 'Guangzhou', date12: '', date13: '2020-08-20' },
          { id: 10003, name: 'Test3', nickname: 'T3', role: 'Test', sex: '0', sex2: ['1'], num1: 200, age: 32, address: 'Shanghai', date12: '2020-09-10', date13: '' },
          { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: '1', sex2: ['0'], num1: 30, age: 23, address: 'Shenzhen', date12: '', date13: '2020-12-04' },
          { id: 10005, name: 'Test5', nickname: 'T5', role: 'Designer', sex: '1', sex2: ['1'], num1: 18, age: 26, address: 'Shenzhen', date12: '', date13: '' },
          { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: '1', sex2: ['1'], num1: 35, age: 28, address: 'BeiJing', date12: '', date13: '2020-09-04' },
          { id: 10007, name: 'Test7', nickname: 'T7', role: 'Designer', sex: '1', sex2: ['1'], num1: 11, age: 24, address: 'BeiJing', date12: '2020-08-10', date13: '2020-04-22' },
          { id: 10008, name: 'Test8', nickname: 'T8', role: 'Designer', sex: '0', sex2: ['1'], num1: 30, age: 21, address: 'Shenzhen', date12: '', date13: '' },
          { id: 10009, name: 'Test9', nickname: 'T9', role: 'Designer', sex: '1', sex2: ['0'], num1: 25, age: 31, address: 'Guangzhou', date12: '', date13: '2020-04-10' },
          { id: 100010, name: 'Test10', nickname: 'T10', role: 'Designer', sex: '1', sex2: ['1'], num1: 30, age: 29, address: 'BeiJing', date12: '2020-04-18', date13: '2020-04-10' }
        ]
        demo1.tableData = list
        demo1.loading = false
      }, 500)
    }

    const contextMenuClickEvent: VxeTableEvents.MenuClick = ({ menu, row, column }) => {
      const $table = xTable.value
      switch (menu.code) {
        case 'hideColumn':
          $table.hideColumn(column)
          break
        case 'showAllColumn':
          $table.resetColumn(true)
          break
        case 'copy':
          if (XEClipboard.copy(row[column.property])) {
            VXETable.modal.message({ content: '已复制到剪贴板！', status: 'success' })
          }
          break
        case 'reload':
          findList()
          break
        case 'insertAt':
          $table.insertAt({}, row || -1).then(({ row }) => {
            $table.setActiveCell(row, column || 'name')
          })
          break
        case 'remove':
          $table.remove(row)
          break
        case 'save':
          VXETable.modal.message({ content: '保存成功', status: 'success' })
          findList()
          break
      }
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

    findList()

    return {
      demo1,
      xTable,
      contextMenuClickEvent,
      getInsertEvent,
      getRemoveEvent,
      getUpdateEvent,
      demoCodes: [
        `
        <vxe-toolbar>
          <template #buttons>
            <vxe-button @click="getInsertEvent">获取新增</vxe-button>
            <vxe-button @click="getRemoveEvent">获取删除</vxe-button>
            <vxe-button @click="getUpdateEvent">获取修改</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          resizable
          show-overflow
          keep-source
          ref="xTable"
          height="400"
          :loading="demo1.loading"
          :data="demo1.tableData"
          :menu-config="demo1.tableMenu"
          :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
          @menu-click="contextMenuClickEvent">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="age" title="Age" :edit-render="{name: 'input'}"></vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive, ref } from 'vue'
        import { VXETable, VxeTableInstance, VxeTablePropTypes, VxeTableEvents } from 'vxe-table'
        import XEClipboard from 'xe-clipboard'

        export default defineComponent({
          setup () {
            const xTable = ref({} as VxeTableInstance)

            const demo1 = reactive({
              loading: false,
              tableData: [] as any[],
              tableMenu: {
                header: {
                  options: [
                    [
                      { code: 'hideColumn', name: '隐藏列', disabled: false },
                      { code: 'showAllColumn', name: '取消所有隐藏列', disabled: false }
                    ]
                  ]
                },
                body: {
                  options: [
                    [
                      { code: 'copy', name: '复制', prefixIcon: 'fa fa-copy', disabled: false },
                      { code: 'reload', name: '刷新', disabled: false },
                      { code: 'insertAt', name: '插入', disabled: false },
                      { code: 'remove', name: '删除', disabled: false },
                      { code: 'save', name: '保存', prefixIcon: 'fa fa-save', disabled: false }
                    ]
                  ]
                },
                visibleMethod ({ options, column }) {
                  const isDisabled = !column
                  options.forEach(list => {
                    list.forEach(item => {
                      item.disabled = isDisabled
                    })
                  })
                  return true
                }
              } as VxeTablePropTypes.MenuConfig
            })

            const findList = () => {
              demo1.loading = true
              demo1.tableData = []
              setTimeout(() => {
                const list = [
                  { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: '0', sex2: ['0'], num1: 40, age: 28, address: 'Shenzhen', date12: '', date13: '' },
                  { id: 10002, name: 'Test2', nickname: 'T2', role: 'Designer', sex: '1', sex2: ['0', '1'], num1: 20, age: 22, address: 'Guangzhou', date12: '', date13: '2020-08-20' },
                  { id: 10003, name: 'Test3', nickname: 'T3', role: 'Test', sex: '0', sex2: ['1'], num1: 200, age: 32, address: 'Shanghai', date12: '2020-09-10', date13: '' },
                  { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: '1', sex2: ['0'], num1: 30, age: 23, address: 'Shenzhen', date12: '', date13: '2020-12-04' },
                  { id: 10005, name: 'Test5', nickname: 'T5', role: 'Designer', sex: '1', sex2: ['1'], num1: 18, age: 26, address: 'Shenzhen', date12: '', date13: '' },
                  { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: '1', sex2: ['1'], num1: 35, age: 28, address: 'BeiJing', date12: '', date13: '2020-09-04' },
                  { id: 10007, name: 'Test7', nickname: 'T7', role: 'Designer', sex: '1', sex2: ['1'], num1: 11, age: 24, address: 'BeiJing', date12: '2020-08-10', date13: '2020-04-22' },
                  { id: 10008, name: 'Test8', nickname: 'T8', role: 'Designer', sex: '0', sex2: ['1'], num1: 30, age: 21, address: 'Shenzhen', date12: '', date13: '' },
                  { id: 10009, name: 'Test9', nickname: 'T9', role: 'Designer', sex: '1', sex2: ['0'], num1: 25, age: 31, address: 'Guangzhou', date12: '', date13: '2020-04-10' },
                  { id: 100010, name: 'Test10', nickname: 'T10', role: 'Designer', sex: '1', sex2: ['1'], num1: 30, age: 29, address: 'BeiJing', date12: '2020-04-18', date13: '2020-04-10' }
                ]
                demo1.tableData = list
                demo1.loading = false
              }, 500)
            }

            const contextMenuClickEvent: VxeTableEvents.MenuClick = ({ menu, row, column }) => {
              const $table = xTable.value
              switch (menu.code) {
                case 'hideColumn':
                  $table.hideColumn(column)
                  break
                case 'showAllColumn':
                  $table.resetColumn(true)
                  break
                case 'copy':
                  if (XEClipboard.copy(row[column.property])) {
                    VXETable.modal.message({ content: '已复制到剪贴板！', status: 'success' })
                  }
                  break
                case 'reload':
                  findList()
                  break
                case 'insertAt':
                  $table.insertAt({}, row || -1).then(({ row }) => {
                    $table.setActiveCell(row, column || 'name')
                  })
                  break
                case 'remove':
                  $table.remove(row)
                  break
                case 'save':
                  VXETable.modal.message({ content: '保存成功', status: 'success' })
                  findList()
                  break
              }
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

            findList()

            return {
              demo1,
              xTable,
              contextMenuClickEvent,
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
