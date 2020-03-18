<template>
  <div>
    <p class="tip">高亮单元格编辑，通过 <table-api-link prop="highlight-cell"/> 属性设置<span class="red">（注：仅支持部分组件）</span></p>

    <vxe-table
      border
      show-overflow
      highlight-cell
      keep-source
      max-height="400"
      :data="tableData"
      :mouse-config="{selected: true}"
      :keyboard-config="{isArrow: true, isDel: true, isEnter: true, isTab: true, isEdit: true}"
      :edit-config="{trigger: 'click', mode: 'cell', showStatus: true}">
      <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="nickname" title="Nickname" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" :edit-render="{name: '$select', options: sexList}"></vxe-table-column>
      <vxe-table-column field="age" title="Age" :edit-render="{name: '$input', props: {type: 'integer'}}"></vxe-table-column>
      <vxe-table-column field="address" title="Address" :edit-render="{name: '$input', props: {suffixIcon: 'fa fa-edit'}, events: {'click': editAddressEvent}}"></vxe-table-column>
      <vxe-table-column field="date" title="Date" :edit-render="{name: '$input', props: {type: 'date'}}"></vxe-table-column>
    </vxe-table>

    <vxe-modal v-model="showPopupEdit" title="查看&编辑" width="600" resize esc-closable mask-closable>
      <template v-if="selectRow">
        <vxe-textarea ref="xTextarea" v-model="selectRow.address" :autosize="{minRows: 8, maxRows: 20}"></vxe-textarea>
      </template>
    </vxe-modal>

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
      showPopupEdit: false,
      selectRow: null,
      tableData: [],
      sexList: [
        { label: '女', value: '0' },
        { label: '男', value: '1' }
      ],
      demoCodes: [
        `
        <vxe-table
          border
          show-overflow
          highlight-cell
          keep-source
          max-height="400"
          :data="tableData"
          :mouse-config="{selected: true}"
          :keyboard-config="{isArrow: true, isDel: true, isEnter: true, isTab: true, isEdit: true}"
          :edit-config="{trigger: 'click', mode: 'cell', showStatus: true}">
          <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="nickname" title="Nickname" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" :edit-render="{name: '$select', options: sexList}"></vxe-table-column>
          <vxe-table-column field="age" title="Age" :edit-render="{name: '$input', props: {type: 'integer'}}"></vxe-table-column>
          <vxe-table-column field="address" title="Address" :edit-render="{name: '$input', props: {suffixIcon: 'fa fa-edit'}, events: {'click': editAddressEvent}}"></vxe-table-column>
          <vxe-table-column field="date" title="Date" :edit-render="{name: '$input', props: {type: 'date'}}"></vxe-table-column>
        </vxe-table>

        <vxe-modal v-model="showPopupEdit" title="查看&编辑" width="600" resize esc-closable>
          <template v-if="selectRow">
            <vxe-textarea ref="xTextarea" v-model="selectRow.address" :autosize="{minRows: 8, maxRows: 20}"></vxe-textarea>
          </template>
        </vxe-modal>
        `,
        `
        export default {
          data () {
            return {
              showPopupEdit: false,
              selectRow: null,
              tableData: [],
              sexList: [
                { label: '女', value: '0' },
                { label: '男', value: '1' }
              ]
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 4)
          },
          methods: {
            editAddressEvent ({ row }) {
              this.selectRow = row
              this.showPopupEdit = true
            }
          }
        }
        `
      ]
    }
  },
  created () {
    this.tableData = window.MOCK_DATA_LIST.slice(0, 4)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    editAddressEvent ({ row }) {
      this.selectRow = row
      this.showPopupEdit = true
    }
  }
}
</script>
