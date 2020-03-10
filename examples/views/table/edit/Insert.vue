<template>
  <div>
    <p class="tip">调用 <table-api-link prop="insert"/>、<table-api-link prop="insertAt"/> 函数插入临时数据，还可以通过 <table-api-link prop="icon"/> 自定义编辑状态的图标<br></p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button icon="fa fa-plus" @click="insertEvent()">新增</vxe-button>
        <vxe-button @click="insertEvent(tableData[2])">在第3行插入并激活 Sex 单元格</vxe-button>
        <vxe-button @click="insertEvent(-1)">在最后行插入</vxe-button>
        <vxe-button @click="$refs.xTable.removeCheckboxRow()">删除选中</vxe-button>
        <vxe-button @click="getSelectionEvent">获取选中</vxe-button>
        <vxe-button @click="getInsertEvent">获取新增</vxe-button>
        <vxe-button icon="fa fa-save" @click="saveEvent">保存</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      show-overflow
      ref="xTable"
      class="my_table_insert"
      max-height="400"
      :data="tableData"
      :edit-config="{trigger: 'click', mode: 'cell', icon: 'fa fa-pencil'}">
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" sortable :edit-render="{name: 'input', defaultValue: '默认的名字'}"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" :edit-render="{name: '$select', options: sexList}"></vxe-table-column>
      <vxe-table-column field="age" title="Age" sortable :edit-render="{name: 'input', defaultValue: 18}"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
      <code class="css">{{ demoCodes[2] }}</code>
    </pre>
  </div>
</template>

<script>
import XEAjax from 'xe-ajax'
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tableData: [],
      sexList: [],
      demoCodes: [
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button icon="fa fa-plus" @click="insertEvent()">新增</vxe-button>
            <vxe-button @click="insertEvent(tableData[2])">在第3行插入并激活 Sex 单元格</vxe-button>
            <vxe-button @click="insertEvent(-1)">在最后行插入</vxe-button>
            <vxe-button @click="$refs.xTable.removeCheckboxRow()">删除选中</vxe-button>
            <vxe-button @click="getSelectionEvent">获取选中</vxe-button>
            <vxe-button @click="getInsertEvent">获取新增</vxe-button>
            <vxe-button icon="fa fa-save" @click="saveEvent">保存</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          show-overflow
          ref="xTable"
          class="my_table_insert"
          max-height="400"
          :data="tableData"
          :edit-config="{trigger: 'click', mode: 'cell', icon: 'fa fa-pencil'}">
          <vxe-table-column type="checkbox" width="60"></vxe-table-column>
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" sortable :edit-render="{name: 'input', defaultValue: '默认的名字'}"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="age" title="Age" sortable :edit-render="{name: 'input', defaultValue: 18}"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [],
              sexList: []
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 4)
            this.findSexList()
          },
          methods: {
            async findSexList () {
              this.sexList = await XEAjax.get('/api/conf/sex/list')
            },
            async insertEvent (row) {
              let record = {
                sex: '1'
              }
              let { row: newRow } = await this.$refs.xTable.insertAt(record, row)
              await this.$refs.xTable.setActiveCell(newRow, 'sex')
            },
            getInsertEvent () {
              let insertRecords = this.$refs.xTable.getInsertRecords()
              this.$XModal.alert(insertRecords.length)
            },
            getSelectionEvent () {
              let selectRecords = this.$refs.xTable.getCheckboxRecords()
              this.$XModal.alert(selectRecords.length)
            },
            saveEvent () {
              const { insertRecords, removeRecords, updateRecords } = this.$refs.xTable.getRecordset()
              this.$XModal.alert(\`insertRecords=\${insertRecords.length} removeRecords=\${removeRecords.length} updateRecords=\${updateRecords.length}\`)
            }
          }
        }
        `,
        `
        .my_table_insert .vxe-body--row.is--new {
          background-color: #f1fdf1;
        }
        `
      ]
    }
  },
  created () {
    this.tableData = window.MOCK_DATA_LIST.slice(0, 4)
    this.findSexList()
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    async findSexList () {
      this.sexList = await XEAjax.get('/api/conf/sex/list')
    },
    async insertEvent (row) {
      const record = {
        sex: '1'
      }
      const { row: newRow } = await this.$refs.xTable.insertAt(record, row)
      await this.$refs.xTable.setActiveCell(newRow, 'sex')
    },
    getInsertEvent () {
      const insertRecords = this.$refs.xTable.getInsertRecords()
      this.$XModal.alert(insertRecords.length)
    },
    getSelectionEvent () {
      const selectRecords = this.$refs.xTable.getCheckboxRecords()
      this.$XModal.alert(selectRecords.length)
    },
    saveEvent () {
      const { insertRecords, removeRecords, updateRecords } = this.$refs.xTable.getRecordset()
      this.$XModal.alert(`insertRecords=${insertRecords.length} removeRecords=${removeRecords.length} updateRecords=${updateRecords.length}`)
    }
  }
}
</script>

<style>
.my_table_insert .vxe-body--row.is--new {
  background-color: #f1fdf1;
}
</style>
