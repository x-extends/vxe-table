<template>
  <div>
    <p>调用 <table-api-link prop="insert"/>、<table-api-link prop="insertAt"/> 函数插入数据</p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="$refs.xTable.insert({name: Date.now()})">在第1行插入</vxe-button>
        <vxe-button @click="insertEvent">在第3行插入并激活 Sex 单元格</vxe-button>
        <vxe-button @click="$refs.xTable.insertAt({name: Date.now()}, -1)">在最后行插入</vxe-button>
        <vxe-button @click="getInsertEvent">获取新增</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      show-overflow
      ref="xTable"
      max-height="400"
      :data.sync="tableData"
      :edit-config="{trigger: 'click', mode: 'cell'}">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" sortable :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="age" title="Age" sortable :edit-render="{name: 'input'}"></vxe-table-column>
    </vxe-table>

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
            <vxe-button @click="$refs.xTable.insert({name: Date.now()})">在第1行插入</vxe-button>
            <vxe-button @click="insertEvent">在第3行插入并激活 Sex 单元格</vxe-button>
            <vxe-button @click="$refs.xTable.insertAt({name: Date.now()}, -1)">在最后行插入</vxe-button>
            <vxe-button @click="getInsertEvent">获取新增</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          show-overflow
          ref="xTable"
          max-height="400"
          :data.sync="tableData"
          :edit-config="{trigger: 'click', mode: 'cell'}">
          <vxe-table-column type="index" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" sortable :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="age" title="Age" sortable :edit-render="{name: 'input'}"></vxe-table-column>
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
            this.tableData = window.MOCK_DATA_LIST.slice(0, 2)
          },
          methods: {
            insertEvent () {
              let record = {
                name: Date.now()
              }
              this.$refs.xTable.insertAt(record, this.tableData[2])
                .then(({ row }) => this.$refs.xTable.setActiveCell(row, 'sex'))
            },
            getInsertEvent () {
              let insertRecords = this.$refs.xTable.getInsertRecords()
              this.$XMsg.alert(insertRecords.length)
            }
          }
        }
        `
      ]
    }
  },
  created () {
    let list = window.MOCK_DATA_LIST.slice(0, 2)
    this.tableData = list
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    insertEvent () {
      let record = {
        name: Date.now()
      }
      this.$refs.xTable.insertAt(record, this.tableData[2])
        .then(({ row }) => this.$refs.xTable.setActiveCell(row, 'sex'))
    },
    getInsertEvent () {
      let insertRecords = this.$refs.xTable.getInsertRecords()
      this.$XMsg.alert(insertRecords.length)
    }
  }
}
</script>
