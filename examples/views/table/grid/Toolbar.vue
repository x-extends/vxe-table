<template>
  <div>
    <p class="tip">工具栏：通过 <grid-api-link prop="toolbar"/> 属性配置，支持显示/隐藏列、列宽拖动状态的保存功能，可以通过表格的 <table-api-link prop="custom-config"/> 参数开启将列个性化的设置状态保存到本地</p>

    <vxe-grid
      border
      resizable
      export-config
      import-config
      keep-source
      ref="xGrid"
      id="toolbar_demo_1"
      height="530"
      :columns="tableColumn"
      :toolbar="tableToolbar"
      :data="tableData"
      :custom-config="{storage: true}"
      :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
      @toolbar-button-click="toolbarButtonClickEvent"></vxe-grid>

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
      tableToolbar: {
        buttons: [
          { code: 'myInsert', name: '新增' },
          { code: 'mySave', name: 'app.body.button.save', status: 'success' },
          { code: 'myExport', name: '导出数据', type: 'text', status: 'warning' },
          {
            name: '禁用按钮',
            disabled: false,
            dropdowns: [
              { code: 'other1', name: '下拉的按钮1', type: 'text', disabled: false },
              { code: 'other2', name: '下拉的按钮2', type: 'text', disabled: true },
              { code: 'other3', name: '下拉的按钮3', type: 'text', disabled: false }
            ]
          }
        ],
        import: true,
        export: true,
        print: true,
        zoom: true,
        custom: true
      },
      tableColumn: [
        { type: 'checkbox', width: 50 },
        { type: 'seq', width: 60 },
        { field: 'name', title: 'Name', editRender: { name: 'input' } },
        {
          title: '分类',
          children: [
            { field: 'nickname', title: 'Nickname', editRender: { name: 'input' } },
            { field: 'role', title: 'Role', editRender: { name: 'input' } }
          ]
        },
        { field: 'describe', title: 'Describe', showOverflow: true, editRender: { name: 'input' } }
      ],
      demoCodes: [
        `
        <vxe-grid
          border
          resizable
          export-config
          import-config
          keep-source
          ref="xGrid"
          id="toolbar_demo_1"
          height="530"
          :columns="tableColumn"
          :toolbar="tableToolbar"
          :data="tableData"
          :custom-config="{storage: true}"
          :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
          @toolbar-button-click="toolbarButtonClickEvent"></vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              tableData: [],
              tableToolbar: {
                buttons: [
                  { code: 'myInsert', name: '新增' },
                  { code: 'mySave', name: 'app.body.button.save', status: 'success' },
                  { code: 'myExport', name: '导出数据', type: 'text', status: 'warning' },
                  {
                    name: '禁用按钮',
                    disabled: false,
                    dropdowns: [
                      { code: 'other1', name: '下拉的按钮1', type: 'text', disabled: false },
                      { code: 'other2', name: '下拉的按钮2', type: 'text', disabled: true },
                      { code: 'other3', name: '下拉的按钮3', type: 'text', disabled: false }
                    ]
                  }
                ],
                refresh: true,
                import: true,
                export: true,
                print: true,
                zoom: true,
                custom: true
              },
              tableColumn: [
                { type: 'checkbox', width: 50 },
                { type: 'seq', width: 60 },
                { field: 'name', title: 'Name', editRender: { name: 'input' } },
                {
                  title: '分类',
                  children: [
                    { field: 'nickname', title: 'Nickname', editRender: { name: 'input' } },
                    { field: 'role', title: 'Role', editRender: { name: 'input' } }
                  ]
                },
                { field: 'describe', title: 'Describe', showOverflow: true, editRender: { name: 'input' } }
              ]
            }
          },
          created () {
            this.loadData()
          },
          methods: {
            loadData () {
              this.tableData = window.MOCK_DATA_LIST.slice(0, 15)
            },
            toolbarButtonClickEvent ({ code }) {
              switch (code) {
                case 'myInsert':
                  this.$refs.xGrid.insert({
                    name: 'xxx'
                  })
                  break
                case 'mySave':
                  setTimeout(() => {
                    const { insertRecords, removeRecords, updateRecords } = this.$refs.xGrid.getRecordset()
                    this.$XModal.message({ message: \`新增 \${insertRecords.length} 条，删除 \${removeRecords.length} 条，更新 \${updateRecords.length} 条\`, status: 'success' })
                    this.loadData()
                  }, 100)
                  break
                case 'myExport':
                  this.$refs.xGrid.exportData({
                    type: 'csv'
                  })
                  break
              }
            }
          }
        }
        `
      ]
    }
  },
  created () {
    this.loadData()
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    loadData () {
      this.tableData = window.MOCK_DATA_LIST.slice(0, 15)
    },
    toolbarButtonClickEvent ({ code }) {
      switch (code) {
        case 'myInsert':
          this.$refs.xGrid.insert({
            name: 'xxx'
          })
          break
        case 'mySave':
          setTimeout(() => {
            const { insertRecords, removeRecords, updateRecords } = this.$refs.xGrid.getRecordset()
            this.$XModal.message({ message: `新增 ${insertRecords.length} 条，删除 ${removeRecords.length} 条，更新 ${updateRecords.length} 条`, status: 'success' })
            this.loadData()
          }, 100)
          break
        case 'myExport':
          this.$refs.xGrid.exportData({
            type: 'csv'
          })
          break
      }
    }
  }
}
</script>
