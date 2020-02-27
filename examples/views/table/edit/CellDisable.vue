<template>
  <div>
    <p class="tip">设置 <table-api-link prop="edit-config"/> 的 <table-api-link prop="activeMethod"/> 方法判断单元格是否禁用</p>

    <vxe-table
      border
      show-overflow
      :data="tableData"
      :edit-config="{trigger: 'click', mode: 'cell', activeMethod: activeCellMethod}"
      @edit-disabled="editDisabledEvent">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" :edit-render="{name: '$select', options: sexList}"></vxe-table-column>
      <vxe-table-column field="date12" title="Date" :edit-render="{name: 'input'}"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p class="tip">禁用第二行编辑</p>

    <vxe-table
      border
      show-overflow
      :data="tableData"
      :edit-config="{trigger: 'click', mode: 'cell', activeMethod: activeRowMethod}"
      @edit-disabled="editDisabledEvent">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" :edit-render="{name: '$select', options: sexList}"></vxe-table-column>
      <vxe-table-column field="date12" title="Date" :edit-render="{name: 'input'}"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[2] }}</code>
      <code class="javascript">{{ demoCodes[3] }}</code>
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
          :data="tableData"
          :edit-config="{trigger: 'click', mode: 'cell', activeMethod: activeCellMethod}"
          @edit-disabled="editDisabledEvent">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" :edit-render="{name: '$select', options: sexList}"></vxe-table-column>
          <vxe-table-column field="date12" title="Date" :edit-render="{name: 'input'}"></vxe-table-column>
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
            activeCellMethod ({ column, columnIndex }) {
              if (columnIndex === 1) {
                return false
              }
              return true
            },
            editDisabledEvent ({ row, column }) {
              alert('禁止编辑')
            }
          }
        }
        `,
        `
        <vxe-table
          border
          show-overflow
          :data="tableData"
          :edit-config="{trigger: 'click', mode: 'cell', activeMethod: activeRowMethod}"
          @edit-disabled="editDisabledEvent">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" :edit-render="{name: '$select', options: sexList}"></vxe-table-column>
          <vxe-table-column field="date12" title="Date" :edit-render="{name: 'input'}"></vxe-table-column>
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
            activeRowMethod ({ row, rowIndex }) {
              if (rowIndex === 1) {
                return false
              }
              return true
            },
            editDisabledEvent ({ row, column }) {
              this.$XModal.alert('禁止编辑')
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
    activeCellMethod ({ columnIndex }) {
      if (columnIndex === 1) {
        return false
      }
      return true
    },
    activeRowMethod ({ rowIndex }) {
      if (rowIndex === 1) {
        return false
      }
      return true
    },
    editDisabledEvent () {
      this.$XModal.alert('禁止编辑')
    }
  }
}
</script>
