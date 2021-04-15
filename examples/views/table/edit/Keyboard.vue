<template>
  <div>
    <p class="tip">
      设置 <table-api-link prop="mouse-config"/>={selected: true} 启用单元格选中功能<span class="red">（只能用于 <table-api-link prop="edit-config"/>.<table-api-link prop="mode"/>=cell 有效）</span><br>
      设置 <table-api-link prop="keyboard-config"/>={isArrow: true, isDel: true, isEnter: true, isTab: true, isEdit: true, isChecked: true} 启用按键功能及任意键编辑功能，方向键、回车键、Tab 键、Esc 键、F2 键、Del、Back 键<br>
      <span class="red">（注：isEdit 启用任意键覆盖式编辑的）</span>
    </p>

    <vxe-toolbar>
      <template #buttons>
        <vxe-button icon="fa fa-plus" @click="insertEvent()">新增</vxe-button>
        <vxe-button @click="$refs.xTable.removeCheckboxRow()">删除选中</vxe-button>
        <vxe-button @click="getSelectionEvent">获取选中</vxe-button>
        <vxe-button icon="fa fa-save" @click="getInsertEvent">获取新增</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      show-overflow
      ref="xTable"
      height="500"
      :data="demo1.tableData"
      :mouse-config="{selected: true}"
      :checkbox-config="{range: true}"
      :menu-config="demo1.tableMenu"
      :keyboard-config="{isArrow: true, isDel: true, isEnter: true, isTab: true, isEdit: true, isChecked: true}"
      :edit-config="{trigger: 'dblclick', mode: 'cell'}">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="role" title="Role" :edit-render="{name: '$input'}"></vxe-table-column>
      <vxe-table-column field="num" title="Number" :edit-render="{name: '$input', props: {type: 'number'}}"></vxe-table-column>
      <vxe-table-column field="address" title="Address" :edit-render="{name: 'input'}"></vxe-table-column>
    </vxe-table>

    <pre>
      <pre-code>
        mouse-config 鼠标配置：
          | MouseLeft | (area) 鼠标选取指定范围的单元格 |
          | MouseRight | (area) 鼠标选取选中位置的单元格 |
          | Ctrl + MouseLeft | (area) 鼠标选取多区域的单元格 |
          | Shift + MouseLeft | (area) 鼠标点选活动单元格与选中单元格之间的区域 |
          | MouseLeft | (extension) 鼠标左键按住区域内右下角扩展按钮，将区域横向或纵向扩大 |
        keyboard-config 按键配置：
          | Ctrl + X | (isClip) 将单元格标记为剪贴状态并将内容复制到剪贴板，支持 Excel 和 WPS |
          | Ctrl + C | (isClip) 将单元格标记为复制状态并将内容复制到剪贴板，支持 Excel 和 WPS |
          | Ctrl + V | (isClip) 将剪贴板的内容粘贴到指定区域中，支持 Excel 和 WPS |
          | Ctrl + M | (isMerge) 将选取的单元格合并或取消合并 |
          | Ctrl + F | (isFNR) 查找单元格数据，全表或查找指定区域单元格数据 |
          | Ctrl + H | (isFNR) 替换单元格数据，全表或替换指定区域单元格数据 |
          | ArrowUp | （isArrow）如果存在，则移动到上面的单元格 |
          | Shift + ArrowUp | （isArrow）如果存在，则往上面扩展单元格区域 |
          | ArrowDown | （isArrow）如果存在，则移动到下面的单元格 |
          | Shift + ArrowDown | （isArrow）如果存在，则往下面扩展单元格区域 |
          | ArrowLeft | （isArrow）如果存在，则移动到左边的单元格 |
          | Shift + ArrowLeft | （isArrow）如果存在，则往左边扩展单元格区域 |
          | ArrowRight | （isArrow）如果存在，则移动到右边的单元格 |
          | Shift + ArrowRight | （isArrow）如果存在，则往右边扩展单元格区域 |
          | Tab | （isTab）如果存在，则移动到右边单元格；如果存在区域，则在指定区域内移动；如果移动到最后一列，则从下一行开始移到，以此循环 |
          | Tab + Shift | （isTab）如果存在，则移动到左边单元格，则在指定区域内移动；如果移动到第一列，则从上一行开始移到，以此循环 |
          | Spacebar | (isChecked) 如果选选中复选框或单选框，则切换勾选状态 |
          | Enter | （isEnter）如果存在，取消单元格编辑并移动到下面的单元格，则在指定区域内移动；如果移动到最后一行，则从下一列开始移到，以此循环 |
          | Enter + Shift | （isEnter）如果存在，取消单元格编辑并移动到上面的单元格，则在指定区域内移动；如果移动到第一行，则从上一列开始移到，以此循环 |
          | Delete | （isDel）清空单元格内容 |
          | Backspace | （isDel）清空单元格内容并激活为编辑状态 |
          | F2 | 如果存在，激活单元格为编辑状态 |
          | Escape | 如果存在，取消单元格编辑状态 |
          | * | （isEdit）按下除功能键之外的任意键激活覆盖式单元格编辑 |
      </pre-code>
    </pre>

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
import { VxeTableInstance, VxeTablePropTypes } from '../../../../types/index'

export default defineComponent({
  setup () {
    const demo1 = reactive({
      tableData: [
        { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: '0', sex2: ['0'], num1: 40, age: 28, address: 'Shenzhen', date12: '', date13: '' },
        { id: 10002, name: 'Test2', nickname: 'T2', role: 'Designer', sex: '1', sex2: ['0', '1'], num1: 20, age: 22, address: 'Guangzhou', date12: '', date13: '2020-08-20' },
        { id: 10003, name: 'Test3', nickname: 'T3', role: 'Test', sex: '0', sex2: ['1'], num1: 200, age: 32, address: 'Shanghai', date12: '2020-09-10', date13: '' },
        { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: '1', sex2: ['0'], num1: 30, age: 23, address: 'Shenzhen', date12: '', date13: '2020-12-04' },
        { id: 10005, name: 'Test5', nickname: 'T5', role: 'Designer', sex: '1', sex2: ['1'], num1: 18, age: 26, address: 'Shenzhen', date12: '', date13: '' },
        { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: '1', sex2: ['1'], num1: 35, age: 28, address: 'BeiJing', date12: '', date13: '2020-09-04' },
        { id: 10007, name: 'Test7', nickname: 'T7', role: 'Designer', sex: '1', sex2: ['1'], num1: 11, age: 24, address: 'BeiJing', date12: '2020-08-10', date13: '2020-04-22' },
        { id: 10008, name: 'Test8', nickname: 'T8', role: 'Designer', sex: '0', sex2: ['1'], num1: 30, age: 21, address: 'Shenzhen', date12: '', date13: '' },
        { id: 10009, name: 'Test9', nickname: 'T9', role: 'Designer', sex: '1', sex2: ['0'], num1: 25, age: 31, address: 'Guangzhou', date12: '', date13: '2020-04-10' },
        { id: 100010, name: 'Test10', nickname: 'T10', role: 'Designer', sex: '1', sex2: ['1'], num1: 30, age: 29, address: 'BeiJing', date12: '2020-04-18', date13: '2020-04-10' },
        { id: 100011, name: 'Test11', nickname: 'T11', role: 'Designer', sex: '0', sex2: ['1'], num1: 33, age: 30, address: 'Shenzhen', date12: '', date13: '' },
        { id: 100012, name: 'Test12', nickname: 'T12', role: 'Designer', sex: '1', sex2: ['1'], num1: 22, age: 20, address: 'Guangzhou', date12: '', date13: '2020-04-11' },
        { id: 100013, name: 'Test13', nickname: 'T13', role: 'Designer', sex: '1', sex2: ['1'], num1: 19, age: 34, address: 'BeiJing', date12: '', date13: '2020-01-10' }
      ],
      tableMenu: {
        body: {
          options: [
            [
              { code: 'copy', name: '复制', prefixIcon: 'fa fa-copy', disabled: false },
              { code: 'remove', name: '删除', disabled: false },
              { code: 'save', name: '保存', prefixIcon: 'fa fa-save', disabled: false }
            ]
          ]
        }
      } as VxeTablePropTypes.MenuConfig
    })

    const xTable = ref({} as VxeTableInstance)

    const insertEvent = async () => {
      const $table = xTable.value
      const record = {
        sex: '1'
      }
      const { row: newRow } = await $table.insert(record)
      await $table.setActiveCell(newRow, 'name')
    }

    const getInsertEvent = () => {
      const $table = xTable.value
      const insertRecords = $table.getInsertRecords()
      VXETable.modal.alert(insertRecords.length)
    }

    const getSelectionEvent = () => {
      const $table = xTable.value
      const selectRecords = $table.getCheckboxRecords()
      VXETable.modal.alert(selectRecords.length)
    }

    return {
      demo1,
      xTable,
      insertEvent,
      getInsertEvent,
      getSelectionEvent,
      demoCodes: [
        `
        <vxe-toolbar>
          <template #buttons>
            <vxe-button icon="fa fa-plus" @click="insertEvent()">新增</vxe-button>
            <vxe-button @click="$refs.xTable.removeCheckboxRow()">删除选中</vxe-button>
            <vxe-button @click="getSelectionEvent">获取选中</vxe-button>
            <vxe-button icon="fa fa-save" @click="getInsertEvent">获取新增</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          show-overflow
          ref="xTable"
          height="500"
          :data="demo1.tableData"
          :mouse-config="{selected: true}"
          :checkbox-config="{range: true}"
          :menu-config="demo1.tableMenu"
          :keyboard-config="{isArrow: true, isDel: true, isEnter: true, isTab: true, isEdit: true, isChecked: true}"
          :edit-config="{trigger: 'dblclick', mode: 'cell'}">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column type="checkbox" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="role" title="Role" :edit-render="{name: '$input'}"></vxe-table-column>
          <vxe-table-column field="num" title="Number" :edit-render="{name: '$input', props: {type: 'number'}}"></vxe-table-column>
          <vxe-table-column field="address" title="Address" :edit-render="{name: 'input'}"></vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive, ref } from 'vue'
        import { VXETable, VxeTableInstance, VxeTablePropTypes } from 'vxe-table'

        export default defineComponent({
          setup () {
            const demo1 = reactive({
              tableData: [
                { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: '0', sex2: ['0'], num1: 40, age: 28, address: 'Shenzhen', date12: '', date13: '' },
                { id: 10002, name: 'Test2', nickname: 'T2', role: 'Designer', sex: '1', sex2: ['0', '1'], num1: 20, age: 22, address: 'Guangzhou', date12: '', date13: '2020-08-20' },
                { id: 10003, name: 'Test3', nickname: 'T3', role: 'Test', sex: '0', sex2: ['1'], num1: 200, age: 32, address: 'Shanghai', date12: '2020-09-10', date13: '' },
                { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: '1', sex2: ['0'], num1: 30, age: 23, address: 'Shenzhen', date12: '', date13: '2020-12-04' },
                { id: 10005, name: 'Test5', nickname: 'T5', role: 'Designer', sex: '1', sex2: ['1'], num1: 18, age: 26, address: 'Shenzhen', date12: '', date13: '' },
                { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: '1', sex2: ['1'], num1: 35, age: 28, address: 'BeiJing', date12: '', date13: '2020-09-04' },
                { id: 10007, name: 'Test7', nickname: 'T7', role: 'Designer', sex: '1', sex2: ['1'], num1: 11, age: 24, address: 'BeiJing', date12: '2020-08-10', date13: '2020-04-22' },
                { id: 10008, name: 'Test8', nickname: 'T8', role: 'Designer', sex: '0', sex2: ['1'], num1: 30, age: 21, address: 'Shenzhen', date12: '', date13: '' },
                { id: 10009, name: 'Test9', nickname: 'T9', role: 'Designer', sex: '1', sex2: ['0'], num1: 25, age: 31, address: 'Guangzhou', date12: '', date13: '2020-04-10' },
                { id: 100010, name: 'Test10', nickname: 'T10', role: 'Designer', sex: '1', sex2: ['1'], num1: 30, age: 29, address: 'BeiJing', date12: '2020-04-18', date13: '2020-04-10' },
                { id: 100011, name: 'Test11', nickname: 'T11', role: 'Designer', sex: '0', sex2: ['1'], num1: 33, age: 30, address: 'Shenzhen', date12: '', date13: '' },
                { id: 100012, name: 'Test12', nickname: 'T12', role: 'Designer', sex: '1', sex2: ['1'], num1: 22, age: 20, address: 'Guangzhou', date12: '', date13: '2020-04-11' },
                { id: 100013, name: 'Test13', nickname: 'T13', role: 'Designer', sex: '1', sex2: ['1'], num1: 19, age: 34, address: 'BeiJing', date12: '', date13: '2020-01-10' }
              ],
              tableMenu: {
                body: {
                  options: [
                    [
                      { code: 'copy', name: '复制', prefixIcon: 'fa fa-copy', disabled: false },
                      { code: 'remove', name: '删除', disabled: false },
                      { code: 'save', name: '保存', prefixIcon: 'fa fa-save', disabled: false }
                    ]
                  ]
                }
              } as VxeTablePropTypes.MenuConfig
            })

            const xTable = ref({} as VxeTableInstance)

            const insertEvent = async () => {
              const $table = xTable.value
              const record = {
                sex: '1'
              }
              const { row: newRow } = await $table.insert(record)
              await $table.setActiveCell(newRow, 'name')
            }

            const getInsertEvent = () => {
              const $table = xTable.value
              const insertRecords = $table.getInsertRecords()
              VXETable.modal.alert(insertRecords.length)
            }

            const getSelectionEvent = () => {
              const $table = xTable.value
              const selectRecords = $table.getCheckboxRecords()
              VXETable.modal.alert(selectRecords.length)
            }

            return {
              demo1,
              xTable,
              insertEvent,
              getInsertEvent,
              getSelectionEvent
            }
          }
        })
        `
      ]
    }
  }
})
</script>
