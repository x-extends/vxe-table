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
      :data="tableData"
      :mouse-config="{selected: true}"
      :checkbox-config="{range: true}"
      :menu-config="tableMenu"
      :keyboard-config="{isArrow: true, isDel: true, isEnter: true, isTab: true, isEdit: true, isChecked: true}"
      :edit-config="{trigger: 'dblclick', mode: 'cell'}">
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column type="checkbox" width="60"></vxe-column>
      <vxe-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-column>
      <vxe-column field="role" title="Role" :edit-render="{name: '$input'}"></vxe-column>
      <vxe-column field="num" title="Number" :edit-render="{name: '$input', props: {type: 'number'}}"></vxe-column>
      <vxe-column field="address" title="Address" :edit-render="{name: 'input'}"></vxe-column>
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
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'test abc' },
        { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'test abc' },
        { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc' }
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
      },
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
          :data="tableData"
          :mouse-config="{selected: true}"
          :checkbox-config="{range: true}"
          :menu-config="tableMenu"
          :keyboard-config="{isArrow: true, isDel: true, isEnter: true, isTab: true, isEdit: true, isChecked: true}"
          :edit-config="{trigger: 'dblclick', mode: 'cell'}">
          <vxe-column type="seq" width="60"></vxe-column>
          <vxe-column type="checkbox" width="60"></vxe-column>
          <vxe-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-column>
          <vxe-column field="role" title="Role" :edit-render="{name: '$input'}"></vxe-column>
          <vxe-column field="num" title="Number" :edit-render="{name: '$input', props: {type: 'number'}}"></vxe-column>
          <vxe-column field="address" title="Address" :edit-render="{name: 'input'}"></vxe-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'test abc' },
                { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'test abc' },
                { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc' }
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
              }
            }
          },
          methods: {
            async insertEvent () {
              const $table = this.$refs.xTable
              const record = {
                sex: '1'
              }
              const { row: newRow } = await $table.insertAt(record)
              await $table.setActiveCell(newRow, 'name')
            },
            getInsertEvent () {
              const $table = this.$refs.xTable
              const insertRecords = $table.getInsertRecords()
              this.$XModal.alert(insertRecords.length)
            },
            getSelectionEvent () {
              const $table = this.$refs.xTable
              const selectRecords = $table.getCheckboxRecords()
              this.$XModal.alert(selectRecords.length)
            }
          }
        }
        `
      ]
    }
  },
  methods: {
    async insertEvent () {
      const $table = this.$refs.xTable
      const record = {
        sex: '1'
      }
      const { row: newRow } = await $table.insertAt(record)
      await $table.setActiveCell(newRow, 'name')
    },
    getInsertEvent () {
      const $table = this.$refs.xTable
      const insertRecords = $table.getInsertRecords()
      this.$XModal.alert(insertRecords.length)
    },
    getSelectionEvent () {
      const $table = this.$refs.xTable
      const selectRecords = $table.getCheckboxRecords()
      this.$XModal.alert(selectRecords.length)
    }
  }
}
</script>
