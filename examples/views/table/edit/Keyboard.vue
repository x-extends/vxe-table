<template>
  <div>
    <p class="tip">
      设置 <table-api-link prop="mouse-config"/>={selected: true} 启用单元格选中功能<br>
      设置 <table-api-link prop="keyboard-config"/>={isArrow: true, isDel: true, isEnter: true, isTab: true, isEdit: true} 启用按键功能及任意键编辑功能，方向键、回车键、Tab 键、Esc 键、F2 键、Del、Back 键<br>
      <span class="red">（注：isEdit 启用任意键覆盖式编辑的）</span>
    </p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button icon="fa fa-plus" @click="insertEvent()">新增</vxe-button>
        <vxe-button @click="$refs.xTable.removeSelecteds()">删除选中</vxe-button>
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
      :keyboard-config="{isArrow: true, isDel: true, isEnter: true, isTab: true, isEdit: true}"
      :edit-config="{trigger: 'dblclick', mode: 'cell'}">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="date" title="Date"></vxe-table-column>
      <vxe-table-column field="address" title="Address" :edit-render="{name: 'input'}"></vxe-table-column>
    </vxe-table>

    <pre>
      <code>
        | Arrow Up ↑ | （isArrow）移动到当前活动单元格上面的单元格 |
        | Arrow Down ↓ | （isArrow）移动到当前活动单元格下面的单元格 |
        | Arrow Left ← | （isArrow）移动到当前活动单元格左边的单元格 |
        | Arrow Right → | （isArrow）移动到当前活动单元格右边的单元格 |
        | Tab | （isTab）移动到当前选中或活动单元格的右侧单元格，如果到最后一列且存在下一行，则从下一行开始移动 |
        | Tab + Shift | （isTab）移动到当前选中或活动单元格的左侧单元格，如果到第一列且存在上一行，则从上一行开始移动 |
        | Spacebar | 如果单元格是复选框或单选框则切换勾选状态 |
        | Enter | （isEnter）取消单元格编辑并移动到当前活动单元格下面的单元格 |
        | Delete | （isDel）清空内容 |
        | Backspace | （isDel）清空内容并激活选中单元格为编辑状态 |
        | F2 | 激活单元格编辑 |
        | Esc | 取消单元格编辑 |
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
      demoCodes: [
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button icon="fa fa-plus" @click="insertEvent()">新增</vxe-button>
            <vxe-button @click="$refs.xTable.removeSelecteds()">删除选中</vxe-button>
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
          :keyboard-config="{isArrow: true, isDel: true, isEnter: true, isTab: true, isEdit: true}"
          :edit-config="{trigger: 'dblclick', mode: 'cell'}">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column type="checkbox" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="date" title="Date"></vxe-table-column>
          <vxe-table-column field="address" title="Address" :edit-render="{name: 'input'}"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: []
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
              const removeRecords = this.$refs.xTable.getCheckboxRecords()
              this.$XModal.alert(removeRecords.length)
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
      const removeRecords = this.$refs.xTable.getCheckboxRecords()
      this.$XModal.alert(removeRecords.length)
    }
  }
}
</script>
