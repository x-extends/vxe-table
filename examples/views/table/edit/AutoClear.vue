<template>
  <div>
    <p class="tip">
      通过设置 <table-api-link prop="edit-config"/>.<table-api-link prop="autoClear"/> 关闭默认的单元格清除激活行为<br>
      <span class="red">（注：如果设置为手动模式则不会自动关闭激活状态，需要手动调用 clearActived 关闭编辑状态）</span>
    </p>

    <vxe-table
      border
      show-overflow
      keep-source
      ref="xTable"
      :data="tableData"
      :edit-config="{ trigger: 'manual', mode: 'row', autoClear: false}">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" :edit-render="{name: 'input', immediate: true}"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" :edit-render="{name: 'select', options: sexList}"></vxe-table-column>
      <vxe-table-column field="date" title="Date" :edit-render="{name: 'input', immediate: true, attrs: { type: 'date' }}"></vxe-table-column>
      <vxe-table-column field="num" title="Num" :edit-render="{name: 'input', immediate: true, attrs: {type: 'number'}}"></vxe-table-column>
      <vxe-table-column field="address" title="Address" :edit-render="{name: 'textarea'}"></vxe-table-column>
      <vxe-table-column title="操作">
        <template v-slot="{ row }">
          <template v-if="$refs.xTable.isActiveByRow(row)">
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
import XEAjax from 'xe-ajax'
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tableData: [],
      sexList: [],
      demoCodes: [
        `
        <vxe-table
          border
          show-overflow
          keep-source
          ref="xTable"
          :data="tableData"
          :edit-config="{ trigger: 'manual', mode: 'row', autoClear: false}">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" :edit-render="{name: 'input', immediate: true}"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" :edit-render="{name: 'select', options: sexList}"></vxe-table-column>
          <vxe-table-column field="date" title="Date" :edit-render="{name: 'input', immediate: true, attrs: { type: 'date' }}"></vxe-table-column>
          <vxe-table-column field="num" title="Num" :edit-render="{name: 'input', immediate: true, attrs: {type: 'number'}}"></vxe-table-column>
          <vxe-table-column field="address" title="Address" :edit-render="{name: 'textarea'}"></vxe-table-column>
          <vxe-table-column title="操作">
            <template v-slot="{ row }">
              <template v-if="$refs.xTable.isActiveByRow(row)">
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
              tableData: [],
              sexList: []
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
            this.findSexList()
          },
          methods: {
            findSexList () {
              return XEAjax.get('/api/conf/sex/list').then(data => {
                this.sexList = data
              })
            },
            editRowEvent (row) {
              this.$refs.xTable.setActiveRow(row)
            },
            saveRowEvent (row) {
              this.$refs.xTable.clearActived().then(() => {
                this.$XModal.alert('success')
              })
            },
            cancelRowEvent (row) {
              let xTable = this.$refs.xTable
              xTable.clearActived()
                .then(() => xTable.revertData(row))
            }
          }
        }
        `
      ]
    }
  },
  created () {
    this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
    this.findSexList()
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    findSexList () {
      return XEAjax.get('/api/conf/sex/list').then(data => {
        this.sexList = data
      })
    },
    editRowEvent (row) {
      this.$refs.xTable.setActiveRow(row)
    },
    saveRowEvent () {
      this.$refs.xTable.clearActived().then(() => {
        this.$XModal.alert('success')
      })
    },
    cancelRowEvent (row) {
      const xTable = this.$refs.xTable
      xTable.clearActived()
        .then(() => xTable.revertData(row))
    }
  }
}
</script>
