<template>
  <div>
    <p class="tip">
      设置 <table-api-link prop="edit-config"/> 的 <table-api-link prop="activeMethod"/> 方法判断单元格是否禁用<br>
      <span class="red">（具体请自行实现，该示例仅供参考）</span>
    </p>

    <vxe-table
      border
      show-overflow
      :data="tableData"
      :edit-config="{trigger: 'click', mode: 'cell', activeMethod: activeCellMethod}"
      @edit-disabled="editDisabledEvent">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" :edit-render="{name: '$select', options: sexList}"></vxe-table-column>
      <vxe-table-column field="date" title="Date" :edit-render="{name: '$input', props: {type: 'date'}}"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p class="tip">配合  <table-api-link prop="edit-actived"/> 事件，使用组件方式禁用编辑</p>

    <vxe-table
      border
      show-overflow
      :data="tableData"
      :edit-config="{trigger: 'click', mode: 'cell'}"
      @edit-actived="editActivedEvent">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" :edit-render="{name: 'input', attrs: {disabled: nameDisabled}}"></vxe-table-column>
      <vxe-table-column title="分组">
        <vxe-table-column field="sex" title="Sex" :edit-render="{name: '$select', props: {disabled: sexDisabled}, options: sexList}"></vxe-table-column>
        <vxe-table-column field="date" title="Date" :edit-render="{name: '$input', props: {type: 'date', disabled: dateDisabled}}"></vxe-table-column>
      </vxe-table-column>
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
      nameDisabled: false,
      sexDisabled: false,
      dateDisabled: false,
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
          <vxe-table-column field="date" title="Date" :edit-render="{name: '$input', props: {type: 'date'}}"></vxe-table-column>
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
              this.$XModal.message({ message: '禁止编辑', status: 'error' })
            }
          }
        }
        `,
        `
        <vxe-table
          border
          show-overflow
          :data="tableData"
          :edit-config="{trigger: 'click', mode: 'cell'}"
          @edit-actived="editActivedEvent">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" :edit-render="{name: 'input', attrs: {disabled: nameDisabled}}"></vxe-table-column>
          <vxe-table-column title="分组">
            <vxe-table-column field="sex" title="Sex" :edit-render="{name: '$select', props: {disabled: sexDisabled}, options: sexList}"></vxe-table-column>
            <vxe-table-column field="date" title="Date" :edit-render="{name: '$input', props: {type: 'date', disabled: dateDisabled}}"></vxe-table-column>
          </vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              nameDisabled: false,
              sexDisabled: false,
              dateDisabled: false,
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
            editActivedEvent ({ rowIndex, row }) {
              this.nameDisabled = rowIndex === 1
              this.sexDisabled = row.sex === '1'
              this.dateDisabled = !!row.date
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
    editDisabledEvent () {
      this.$XModal.message({ message: '禁止编辑', status: 'error' })
    },
    editActivedEvent ({ rowIndex, row }) {
      this.nameDisabled = rowIndex === 1
      this.sexDisabled = row.sex === '1'
      this.dateDisabled = !!row.date
    }
  }
}
</script>
