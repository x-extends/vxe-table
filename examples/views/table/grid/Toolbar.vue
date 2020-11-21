<template>
  <div>
    <p class="tip">工具栏：通过 <grid-api-link prop="toolbar-config"/> 属性配置，支持显示/隐藏列、列宽拖动状态的保存功能，可以通过表格的 <table-api-link prop="custom-config"/> 参数开启将列个性化的设置状态保存到本地</p>

    <vxe-grid
      border
      resizable
      keep-source
      ref="xGrid"
      id="toolbar_demo_1"
      height="500"
      :print-config="{}"
      :import-config="{}"
      :export-config="{}"
      :columns="tableColumn"
      :toolbar-config="tableToolbar"
      :data="tableData"
      :custom-config="{storage: true}"
      :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
      @toolbar-button-click="toolbarButtonClickEvent"></vxe-grid>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script>
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
          keep-source
          ref="xGrid"
          id="toolbar_demo_1"
          height="500"
          :print-config="{}"
          :import-config="{}"
          :export-config="{}"
          :columns="tableColumn"
          :toolbar-config="tableToolbar"
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
              this.tableData = [
                { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
                { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
                { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women ', age: 21, address: 'Shenzhen' },
                { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man ', age: 29, address: 'Guangzhou' },
                { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man ', age: 35, address: 'Shenzhen' },
                { id: 10009, name: 'Test9', nickname: 'T9', role: 'Test', sex: 'Man ', age: 24, address: 'Shenzhen' },
                { id: 100010, name: 'Test10', nickname: 'T10', role: 'Develop', sex: 'Man ', age: 20, address: 'Guangzhou' }
              ]
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
  methods: {
    loadData () {
      this.tableData = [
        { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
        { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
        { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women ', age: 21, address: 'Shenzhen' },
        { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man ', age: 29, address: 'Guangzhou' },
        { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man ', age: 35, address: 'Shenzhen' },
        { id: 10009, name: 'Test9', nickname: 'T9', role: 'Test', sex: 'Man ', age: 24, address: 'Shenzhen' },
        { id: 100010, name: 'Test10', nickname: 'T10', role: 'Develop', sex: 'Man ', age: 20, address: 'Guangzhou' }
      ]
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
