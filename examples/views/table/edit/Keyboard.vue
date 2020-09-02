<template>
  <div>
    <p class="tip">
      设置 <table-api-link prop="mouse-config"/>={selected: true} 启用单元格选中功能<span class="red">（只能用于 <table-api-link prop="edit-config"/>.<table-api-link prop="mode"/>=cell 有效）</span><br>
      设置 <table-api-link prop="keyboard-config"/>={isArrow: true, isDel: true, isEnter: true, isTab: true, isEdit: true} 启用按键功能及任意键编辑功能，方向键、回车键、Tab 键、Esc 键、F2 键、Del、Back 键<br>
      <span class="red">（注：isEdit 启用任意键覆盖式编辑的）</span>
    </p>

    <vxe-toolbar>
      <template v-slot:buttons>
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
      :context-menu="tableMenu"
      :keyboard-config="{isArrow: true, isDel: true, isEnter: true, isTab: true, isEdit: true}"
      :edit-config="{trigger: 'dblclick', mode: 'cell'}">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="role" title="Role" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="num" title="Number" :edit-render="{name: '$input', props: {type: 'number'}}"></vxe-table-column>
      <vxe-table-column field="address" title="Address" :edit-render="{name: 'input'}"></vxe-table-column>
    </vxe-table>

    <pre>
      <code>
        mouse-config 鼠标配置：
          | Mouse + Left | (area) 鼠标选取指定范围的单元格 |
          | Mouse + Right | (area) 鼠标选取选中位置的单元格 |
          | Mouse + Left + Ctrl | (area) 鼠标选取多区域的单元格 |
          | Mouse + Left | (extension) 鼠标左键按住右下角延伸按钮，将区域横向或纵向扩大 |
        keyboard-config 按键配置：
          | Ctrl + X | (isClip) 将单元格标记为剪贴状态并将内容复制到剪贴板，支持 Excel 和 WPS |
          | Ctrl + C | (isClip) 将单元格标记为复制状态并将内容复制到剪贴板，支持 Excel 和 WPS |
          | Ctrl + V | (isClip) 将剪贴板的内容粘贴到指定区域中，支持 Excel 和 WPS |
          | Ctrl + M | (isMerge) 将选取的单元格合并或取消合并 |
          | Ctrl + F | (isFNR) 查找数据，全表或查找指定区域数据 |
          | Ctrl + H | (isFNR) 替换数据，全表或替换指定区域数据 |
          | Arrow Up ↑ | （isArrow）如果存在，则移动到上面的单元格 |
          | Arrow Down ↓ | （isArrow）如果存在，则移动到下面的单元格 |
          | Arrow Left ← | （isArrow）如果存在，则移动到左边的单元格 |
          | Arrow Right → | （isArrow）如果存在，则移动到右边的单元格 |
          | Tab | （isTab）如果存在，则移动到右边单元格；如果存在区域，则在指定区域内移动；如果移动到最后一列，则从下一行开始移到，以此循环 |
          | Tab + Shift | （isTab）如果存在，则移动到左边单元格，则在指定区域内移动；如果移动到第一列，则从上一行开始移到，以此循环 |
          | Spacebar | (isChecked) 如果选取的区域存在复选框，则切换勾选状态 |
          | Enter | （isEnter）如果存在，取消单元格编辑并移动到下面的单元格，则在指定区域内移动；如果移动到最后一行，则从下一列开始移到，以此循环 |
          | Enter + Shift | （isEnter）如果存在，取消单元格编辑并移动到上面的单元格，则在指定区域内移动；如果移动到第一行，则从上一列开始移到，以此循环 |
          | Delete | （isDel）清空单元格内容 |
          | Backspace | （isDel）清空单元格内容并激活为编辑状态 |
          | F2 | 如果存在，激活单元格为编辑状态 |
          | Esc | 如果存在，取消单元格编辑状态 |
          | * | （isEdit）按下除功能键之外的任意键激活覆盖式单元格编辑 |
      </code>
    </pre>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tableData: [],
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
          <template v-slot:buttons>
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
          :context-menu="tableMenu"
          :keyboard-config="{isArrow: true, isDel: true, isEnter: true, isTab: true, isEdit: true}"
          :edit-config="{trigger: 'dblclick', mode: 'cell'}">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column type="checkbox" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="role" title="Role" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="num" title="Number" :edit-render="{name: '$input', props: {type: 'number'}}"></vxe-table-column>
          <vxe-table-column field="address" title="Address" :edit-render="{name: 'input'}"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [],
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
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 20)
          },
          methods: {
            async insertEvent () {
              const record = {
                sex: '1'
              }
              const { row: newRow } = await this.$refs.xTable.insertAt(record)
              await this.$refs.xTable.setActiveCell(newRow, 'name')
            },
            getInsertEvent () {
              const insertRecords = this.$refs.xTable.getInsertRecords()
              this.$XModal.alert(insertRecords.length)
            },
            getSelectionEvent () {
              const selectRecords = this.$refs.xTable.getCheckboxRecords()
              this.$XModal.alert(selectRecords.length)
            }
          }
        }
        `
      ]
    }
  },
  created () {
    this.tableData = window.MOCK_DATA_LIST.slice(0, 20)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    async insertEvent () {
      const record = {
        sex: '1'
      }
      const { row: newRow } = await this.$refs.xTable.insertAt(record)
      await this.$refs.xTable.setActiveCell(newRow, 'name')
    },
    getInsertEvent () {
      const insertRecords = this.$refs.xTable.getInsertRecords()
      this.$XModal.alert(insertRecords.length)
    },
    getSelectionEvent () {
      const selectRecords = this.$refs.xTable.getCheckboxRecords()
      this.$XModal.alert(selectRecords.length)
    }
  }
}
</script>
