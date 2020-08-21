<template>
  <div>
    <p class="tip">
      设置 <table-api-link prop="keep-source"/> 开启保持原始值状态，通过调用 <table-api-link prop="revertData"/> 还原数据<br>
      <span class="red">（注：开启 keep-source 将会影响性能，具体取决于数据量）</span>
    </p>

    <vxe-toolbar perfect>
      <template v-slot:buttons>
        <vxe-button icon="fa fa-plus" status="perfect" @click="insertEvent">新增</vxe-button>
        <vxe-button icon="fa fa-trash-o" status="perfect" @click="removeEvent">移除</vxe-button>
        <vxe-button icon="fa fa-save" status="perfect" @click="saveEvent">保存</vxe-button>
        <vxe-button icon="fa fa-mail-reply" status="perfect" @click="revertEvent">还原</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      ref="xTable"
      border
      show-overflow
      keep-source
      :data="tableData"
      :edit-config="{trigger: 'click', mode: 'cell', showStatus: true}">
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="age" title="Age" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column title="操作">
        <template v-slot="{ row }">
          <vxe-button v-if="!$refs.xTable.isInsertByRow(row)" @click="$refs.xTable.revertData(row)">还原</vxe-button>
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
        <vxe-toolbar perfect>
          <template v-slot:buttons>
            <vxe-button icon="fa fa-plus" status="perfect" @click="insertEvent">新增</vxe-button>
            <vxe-button icon="fa fa-trash-o" status="perfect" @click="removeEvent">移除</vxe-button>
            <vxe-button icon="fa fa-save" status="perfect" @click="saveEvent">保存</vxe-button>
            <vxe-button icon="fa fa-mail-reply" status="perfect" @click="revertEvent">还原</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          ref="xTable"
          border
          show-overflow
          keep-source
          :data="tableData"
          :edit-config="{trigger: 'click', mode: 'cell', showStatus: true}">
          <vxe-table-column type="checkbox" width="60"></vxe-table-column>
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="age" title="Age" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column title="操作">
            <template v-slot="{ row }">
              <vxe-button v-if="!$refs.xTable.isInsertByRow(row)" @click="$refs.xTable.revertData(row)">还原</vxe-button>
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
            insertEvent () {
              const record = {
                sex: '1'
              }
              this.$refs.xTable.insert(record).then(({ row }) => {
                this.$refs.xTable.setActiveCell(row, 'sex')
              })
            },
            removeEvent () {
              const selectRecords = this.$refs.xTable.getCheckboxRecords()
              if (selectRecords.length) {
                this.$XModal.confirm('您确定要删除选中的数据吗?').then(type => {
                  if (type === 'confirm') {
                    this.$refs.xTable.removeCheckboxRow()
                  }
                })
              } else {
                this.$XModal.message({ message: '请至少选择一条数据', status: 'error' })
              }
            },
            revertEvent () {
              this.$XModal.confirm('您确定要还原数据吗?').then(type => {
                if (type === 'confirm') {
                  this.$refs.xTable.revertData()
                }
              })
            },
            saveEvent () {
              const { insertRecords, removeRecords, updateRecords } = this.$refs.xTable.getRecordset()
              this.$XModal.alert(\`insertRecords=\${insertRecords.length} removeRecords=\${removeRecords.length} updateRecords=\${updateRecords.length}\`)
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
    insertEvent () {
      const record = {
        sex: '1'
      }
      this.$refs.xTable.insert(record).then(({ row }) => {
        this.$refs.xTable.setActiveCell(row, 'sex')
      })
    },
    removeEvent () {
      const selectRecords = this.$refs.xTable.getCheckboxRecords()
      if (selectRecords.length) {
        this.$XModal.confirm('您确定要删除选中的数据吗?').then(type => {
          if (type === 'confirm') {
            this.$refs.xTable.removeCheckboxRow()
          }
        })
      } else {
        this.$XModal.message({ message: '请至少选择一条数据', status: 'error' })
      }
    },
    revertEvent () {
      this.$XModal.confirm('您确定要还原数据吗?').then(type => {
        if (type === 'confirm') {
          this.$refs.xTable.revertData()
        }
      })
    },
    saveEvent () {
      const { insertRecords, removeRecords, updateRecords } = this.$refs.xTable.getRecordset()
      this.$XModal.alert(`insertRecords=${insertRecords.length} removeRecords=${removeRecords.length} updateRecords=${updateRecords.length}`)
    }
  }
}
</script>
