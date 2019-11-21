<template>
  <div>
    <p class="tip">设置 <table-api-link prop="edit-config"/> 的 <table-api-link prop="activeMethod"/> 方法判断单元格是否禁用</p>

    <vxe-grid
      border
      show-overflow
      :columns="tableColumn"
      :data="tableData"
      :edit-config="{trigger: 'click', mode: 'cell', activeMethod: activeCellMethod}"
      @edit-disabled="editDisabledEvent">
    </vxe-grid>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p class="tip">禁用第二行编辑</p>

    <vxe-grid
      border
      show-overflow
      :columns="tableColumn2"
      :data="tableData"
      :edit-config="{trigger: 'click', mode: 'cell', activeMethod: activeRowMethod}"
      @edit-disabled="editDisabledEvent">
    </vxe-grid>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[2] }}</code>
      <code class="javascript">{{ demoCodes[3] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tableData: [],
      tableColumn: [
        { type: 'index', width: 50 },
        { field: 'name', title: 'app.body.label.name', editRender: { name: 'input' } },
        { field: 'sex', title: 'app.body.label.sex', editRender: { name: 'input' } },
        { field: 'age', title: 'Age', editRender: { name: 'input' } },
        { field: 'address', title: 'Address', editRender: { name: 'input' } }
      ],
      tableColumn2: [
        { type: 'index', width: 50 },
        { field: 'name', title: 'app.body.label.name', editRender: { name: 'input' } },
        { field: 'sex', title: 'app.body.label.sex', editRender: { name: 'input' } },
        { field: 'age', title: 'Age', editRender: { name: 'input' } },
        { field: 'address', title: 'Address', editRender: { name: 'input' } }
      ],
      demoCodes: [
        `
        <vxe-grid
          border
          show-overflow
          :columns="tableColumn"
          :data="tableData"
          :edit-config="{trigger: 'click', mode: 'cell', activeMethod: activeCellMethod}"
          @edit-disabled="editDisabledEvent">
        </vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              tableData: [],
              tableColumn: [
                { type: 'index', width: 50 },
                { field: 'name', title: 'app.body.label.name', editRender: { name: 'input' } },
                { field: 'sex', title: 'app.body.label.sex', editRender: { name: 'input' } },
                { field: 'age', title: 'Age', editRender: { name: 'input' } },
                { field: 'address', title: 'Address', editRender: { name: 'input' } }
              ]
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
          },
          methods: {
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
        <vxe-grid
          border
          show-overflow
          :columns="tableColumn"
          :data="tableData"
          :edit-config="{trigger: 'click', mode: 'cell', activeMethod: activeRowMethod}"
          @edit-disabled="editDisabledEvent">
        </vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              tableData: [],
              tableColumn: [
                { type: 'index', width: 50 },
                { field: 'name', title: 'app.body.label.name', editRender: { name: 'input' } },
                { field: 'sex', title: 'app.body.label.sex', editRender: { name: 'input' } },
                { field: 'age', title: 'Age', editRender: { name: 'input' } },
                { field: 'address', title: 'Address', editRender: { name: 'input' } }
              ]
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
          },
          methods: {
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
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    activeCellMethod ({ column, columnIndex }) {
      if (columnIndex === 1) {
        return false
      }
      return true
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
</script>
