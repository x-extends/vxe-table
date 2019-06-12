<template>
  <div>
    <p>设置 <table-api-link prop="edit-config"/>={key: 'id', trigger: 'manual', mode: 'row'} 启用行编辑的功能</p>
    <p class="red">必须指定 <table-api-link prop="row-key"/> 或者 ( <table-api-link prop="select-config"/>、<table-api-link prop="tree-config"/>、<table-api-link prop="expand-config"/>、<table-api-link prop="edit-config"/> ) 中的 key 任意配置一个即可</p>

    <vxe-table
      ref="xTable"
      border
      resizable
      show-all-overflow
      :data.sync="tableData"
      :edit-config="{key: 'id', trigger: 'manual', mode: 'row'}">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column prop="name" label="Name" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column prop="date" label="Date" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column prop="address" label="Address" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column label="操作">
        <template v-slot="{ row }">
          <template v-if="$refs.xTable.hasActiveRow(row)">
            <vxe-button @click="saveRowEvent(row)">保存</vxe-button>
            <vxe-button @click="cancelRowEvent(row)">取消</vxe-button>
          </template>
          <template v-else>
            <vxe-button @click="editRowEvent(row)">编辑</vxe-button>
          </template>
        </template>
      </vxe-table-column>
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
        <vxe-table
          ref="xTable"
          border
          resizable
          show-all-overflow
          :data.sync="tableData"
          :edit-config="{key: 'id', trigger: 'manual', mode: 'row'}">
          <vxe-table-column type="index" width="60"></vxe-table-column>
          <vxe-table-column prop="name" label="Name" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column prop="sex" label="Sex" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column prop="date" label="Date" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column prop="address" label="Address" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column label="操作">
            <template v-slot="{ row }">
              <template v-if="$refs.xTable.hasActiveRow(row)">
                <vxe-button @click="saveRowEvent(row)">保存</vxe-button>
                <vxe-button @click="cancelRowEvent(row)">取消</vxe-button>
              </template>
              <template v-else>
                <vxe-button @click="editRowEvent(row)">编辑</vxe-button>
              </template>
            </template>
          </vxe-table-column>
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
            this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
          },
          methods: {
            editRowEvent (row) {
              this.$refs.xTable.setActiveRow(row)
            },
            saveRowEvent (row) {
              console.log('success')
              this.cancelRowEvent()
            },
            cancelRowEvent (row) {
              this.$refs.xTable.clearActived()
            }
          }
        }
        `
      ]
    }
  },
  created () {
    this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    editRowEvent (row) {
      this.$refs.xTable.setActiveRow(row)
    },
    saveRowEvent (row) {
      console.log('success')
      this.$refs.xTable.clearActived()
    },
    cancelRowEvent (row) {
      this.$refs.xTable.clearActived()
    }
  }
}
</script>
