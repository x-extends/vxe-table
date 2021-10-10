<template>
  <div>
    <p class="tip">增删改查完整示例</p>

    <vxe-toolbar ref="xToolbar" :loading="loading">
      <template #buttons>
        <vxe-button status="primary" content="临时新增" @click="insertEvent"></vxe-button>
        <vxe-button status="warning" content="临时删除" @click="removeSelectEvent"></vxe-button>
        <vxe-button status="danger" content="直接删除" @click="deleteSelectEvent"></vxe-button>
        <vxe-button content="提交（将临时操作持久化）" @click="saveEvent"></vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      resizable
      show-overflow
      keep-source
      ref="xTable"
      height="500"
      :loading="loading"
      :data="tableData"
      :edit-rules="validRules"
      :edit-config="{trigger: 'click', mode: 'row', showUpdateStatus: true, showInsertStatus: true}">
      <vxe-column type="checkbox" width="60"></vxe-column>
      <vxe-column field="name" title="Name" :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-column>
      <vxe-column field="nickname" title="Nickname" :edit-render="{name: 'input', attrs: {type: 'text', placeholder: '请输入昵称'}}"></vxe-column>
      <vxe-column field="sex" title="Sex" :edit-render="{name: '$select', options: sexList}"></vxe-column>
      <vxe-column field="amount" title="Amount" :edit-render="{name: '$input', props: {type: 'float', digits: 2}}"></vxe-column>
      <vxe-column field="updateDate" title="Date" :edit-render="{name: '$input', props: {type: 'date', placeholder: '请选择日期'}}"></vxe-column>
      <vxe-column title="操作" width="240">
        <template #default="{ row }">
          <vxe-button status="warning" content="临时删除" @click="removeRowEvent(row)"></vxe-button>
          <vxe-button status="danger" content="直接删除" @click="deleteRowEvent(row)"></vxe-button>
        </template>
      </vxe-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>

  </div>
</template>

<script>
import XEAjax from 'xe-ajax'

export default {
  data () {
    return {
      loading: false,
      tableData: [],
      validRules: {
        name: [
          { required: true, message: '名称必须填写' }
        ]
      },
      sexList: [
        { label: '男', value: '1' },
        { label: '女', value: '0' }
      ],
      demoCodes: [
        `
        <vxe-toolbar ref="xToolbar" :loading="loading">
          <template #buttons>
            <vxe-button status="primary" content="临时新增" @click="insertEvent"></vxe-button>
            <vxe-button status="warning" content="临时删除" @click="removeSelectEvent"></vxe-button>
            <vxe-button status="danger" content="直接删除" @click="deleteSelectEvent"></vxe-button>
            <vxe-button content="提交（将临时操作持久化）" @click="saveEvent"></vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          resizable
          show-overflow
          keep-source
          ref="xTable"
          height="500"
          :loading="loading"
          :data="tableData"
          :edit-rules="validRules"
          :edit-config="{trigger: 'click', mode: 'cell', showUpdateStatus: true, showInsertStatus: true}">
          <vxe-column type="checkbox" width="60"></vxe-column>
          <vxe-column field="name" title="Name" :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-column>
          <vxe-column field="nickname" title="Nickname" :edit-render="{name: 'input', attrs: {type: 'text', placeholder: '请输入昵称'}}"></vxe-column>
          <vxe-column field="sex" title="Sex" :edit-render="{name: '$select', options: sexList}"></vxe-column>
          <vxe-column field="amount" title="Amount" :edit-render="{name: '$input', props: {type: 'float', digits: 2}}"></vxe-column>
          <vxe-column field="updateDate" title="Date" :edit-render="{name: '$input', props: {type: 'date', placeholder: '请选择日期'}}"></vxe-column>
          <vxe-column title="操作" width="240">
            <template #default="{ row }">
              <vxe-button status="warning" content="临时删除" @click="removeRowEvent(row)"></vxe-button>
              <vxe-button status="danger" content="直接删除" @click="deleteRowEvent(row)"></vxe-button>
            </template>
          </vxe-column>
        </vxe-table>
        `,
        `
        import XEAjax from 'xe-ajax'

        export default {
          data () {
            return {
              loading: false,
              tableData: [],
              validRules: {
                name: [
                  { required: true, message: '名称必须填写' }
                ]
              },
              sexList: [
                { label: '男', value: '1' },
                { label: '女', value: '0' }
              ]
            }
          },
          created () {
            this.$nextTick(() => {
              // 将表格和工具栏进行关联
              const $table = this.$refs.xTable
              $table.connect(this.$refs.xToolbar)
            })
            this.loadList()
          },
          methods: {
            async loadList () {
              this.loading = true
              try {
                const res = await fetch('https://api.xuliangzhan.com:10443/demo/api/pub/all').then(response => response.json())
                this.tableData = res
              } catch (e) {
                this.tableData = []
              }
              this.loading = false
            },
            async insertEvent () {
              const $table = this.$refs.xTable
              const newRecord = {}
              const { row: newRow } = await $table.insert(newRecord)
              await $table.setActiveRow(newRow)
            },
            async removeSelectEvent () {
              const $table = this.$refs.xTable
              await $table.removeCheckboxRow()
            },
            async deleteSelectEvent () {
              const type = await this.$XModal.confirm('您确定要删除选中的数据?')
              if (type !== 'confirm') {
                return
              }
              const $table = this.$refs.xTable
              const checkboxRecords = $table.getCheckboxRecords()
              this.loading = true
              try {
                const body = { removeRecords: checkboxRecords }
                await XEAjax.post('https://api.xuliangzhan.com:10443/demo/api/pub/save', body)
                await this.loadList()
              } catch (e) {}
              this.loading = false
            },
            async removeRowEvent (row) {
              const $table = this.$refs.xTable
              await $table.remove(row)
            },
            async deleteRowEvent (row) {
              const type = await this.$XModal.confirm('您确定要删除该数据?')
              if (type !== 'confirm') {
                return
              }
              this.loading = true
              try {
                const body = { removeRecords: [row] }
                await XEAjax.post('https://api.xuliangzhan.com:10443/demo/api/pub/save', body)
                await this.loadList()
              } catch (e) {}
            },
            async saveEvent () {
              const $table = this.$refs.xTable
              const { insertRecords, removeRecords, updateRecords } = $table.getRecordset()
              if (insertRecords.length <= 0 && removeRecords.length <= 0 && updateRecords.length <= 0) {
                this.$XModal.message({ content: '数据未改动！', status: 'warning' })
                return
              }
              const errMap = await $table.validate().catch(errMap => errMap)
              if (errMap) {
                return
              }
              this.loading = true
              try {
                const body = { insertRecords, removeRecords, updateRecords }
                await XEAjax.post('https://api.xuliangzhan.com:10443/demo/api/pub/save', body)
                await this.loadList()
                this.$XModal.message({ content: \`操作成功，新增 \${insertRecords.length} 条，更新 \${updateRecords.length} 条，删除 \${removeRecords.length} 条\`, status: 'success' })
              } catch (e) {
                if (e && e.message) {
                  this.$XModal.message({ content: e.message, status: 'error' })
                }
              }
              this.loading = false
            }
          }
        }
        `
      ]
    }
  },
  created () {
    this.$nextTick(() => {
      // 将表格和工具栏进行关联
      const $table = this.$refs.xTable
      $table.connect(this.$refs.xToolbar)
    })
    this.loadList()
  },
  methods: {
    async loadList () {
      this.loading = true
      try {
        const res = await fetch('https://api.xuliangzhan.com:10443/demo/api/pub/all').then(response => response.json())
        this.tableData = res
      } catch (e) {
        this.tableData = []
      }
      this.loading = false
    },
    async insertEvent () {
      const $table = this.$refs.xTable
      const newRecord = {}
      const { row: newRow } = await $table.insert(newRecord)
      await $table.setActiveRow(newRow)
    },
    async removeSelectEvent () {
      const $table = this.$refs.xTable
      await $table.removeCheckboxRow()
    },
    async deleteSelectEvent () {
      const type = await this.$XModal.confirm('您确定要删除选中的数据?')
      if (type !== 'confirm') {
        return
      }
      const $table = this.$refs.xTable
      const checkboxRecords = $table.getCheckboxRecords()
      this.loading = true
      try {
        const body = { removeRecords: checkboxRecords }
        await XEAjax.post('https://api.xuliangzhan.com:10443/demo/api/pub/save', body)
        await this.loadList()
      } catch (e) {}
      this.loading = false
    },
    async removeRowEvent (row) {
      const $table = this.$refs.xTable
      await $table.remove(row)
    },
    async deleteRowEvent (row) {
      const type = await this.$XModal.confirm('您确定要删除该数据?')
      if (type !== 'confirm') {
        return
      }
      this.loading = true
      try {
        const body = { removeRecords: [row] }
        await XEAjax.post('https://api.xuliangzhan.com:10443/demo/api/pub/save', body)
        await this.loadList()
      } catch (e) {}
    },
    async saveEvent () {
      const $table = this.$refs.xTable
      const { insertRecords, removeRecords, updateRecords } = $table.getRecordset()
      if (insertRecords.length <= 0 && removeRecords.length <= 0 && updateRecords.length <= 0) {
        this.$XModal.message({ content: '数据未改动！', status: 'warning' })
        return
      }
      const errMap = await $table.validate().catch(errMap => errMap)
      if (errMap) {
        return
      }
      this.loading = true
      try {
        const body = { insertRecords, removeRecords, updateRecords }
        await XEAjax.post('https://api.xuliangzhan.com:10443/demo/api/pub/save', body)
        await this.loadList()
        this.$XModal.message({ content: `操作成功，新增 ${insertRecords.length} 条，更新 ${updateRecords.length} 条，删除 ${removeRecords.length} 条`, status: 'success' })
      } catch (e) {
        if (e && e.message) {
          this.$XModal.message({ content: e.message, status: 'error' })
        }
      }
      this.loading = false
    }
  }
}
</script>
