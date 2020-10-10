<template>
  <div>
    <p class="tip">工具栏：通过 <grid-api-link prop="toolbar"/> 属性开启，还可以使用 <grid-api-link prop="slot"/> 插槽自定义模板</p>

    <vxe-grid
      border
      resizable
      keep-source
      ref="xGrid"
      height="530"
      id="toolbar_demo_2"
      :loading="loading"
      :custom-config="tableCustom"
      :data="tableData"
      :columns="tableColumn"
      :toolbar="tableToolbar"
      :edit-config="{trigger: 'click', mode: 'row', showStatus: true}">
      <template v-slot:toolbar_buttons>
        <vxe-input v-model="searchName" placeholder="搜索"></vxe-input>
        <vxe-button status="primary" @click="loadData">搜索</vxe-button>
        <vxe-button @click="loadData">刷新</vxe-button>
        <vxe-button @click="insertEvent">新增</vxe-button>
        <vxe-button @click="saveEvent">保存</vxe-button>
        <vxe-button @click="$refs.xGrid.exportData()">导出.csv</vxe-button>
      </template>
    </vxe-grid>

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
      searchName: '',
      loading: false,
      tableData: [],
      tableCustom: {
        storage: true
      },
      tableToolbar: {
        custom: true,
        slots: {
          buttons: 'toolbar_buttons'
        }
      },
      tableColumn: [
        { type: 'checkbox', width: 50 },
        { type: 'seq', width: 60 },
        { field: 'name', title: 'Name', editRender: { name: 'input' } },
        {
          title: '分类',
          children: [
            { field: 'nickname', title: 'Nickname', editRender: { name: 'input' } },
            {
              title: '子类',
              children: [
                { field: 'role', title: 'Role', editRender: { name: 'input' } }
              ]
            }
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
          height="530"
          id="toolbar_demo_2"
          :loading="loading"
          :custom-config="tableCustom"
          :data="tableData"
          :columns="tableColumn"
          :toolbar="tableToolbar"
          :edit-config="{trigger: 'click', mode: 'row', showStatus: true}">
          <template v-slot:toolbar_buttons>
            <vxe-input v-model="searchName" placeholder="搜索"></vxe-input>
            <vxe-button status="primary" @click="loadData">搜索</vxe-button>
            <vxe-button @click="loadData">刷新</vxe-button>
            <vxe-button @click="insertEvent">新增</vxe-button>
            <vxe-button @click="saveEvent">保存</vxe-button>
            <vxe-button @click="$refs.xGrid.exportData()">导出.csv</vxe-button>
          </template>
        </vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              searchName: '',
              loading: false,
              tableData: [],
              tableCustom: {
                storage: true
              },
              tableToolbar: {
                custom: true,
                slots: {
                  buttons: 'toolbar_buttons'
                }
              },
              tableColumn: [
                { type: 'checkbox', width: 50 },
                { type: 'seq', width: 60 },
                { field: 'name', title: 'Name', editRender: { name: 'input' } },
                {
                  title: '分类',
                  children: [
                    { field: 'nickname', title: 'Nickname', editRender: { name: 'input' } },
                    {
                      title: '子类',
                      children: [
                        { field: 'role', title: 'Role', editRender: { name: 'input' } }
                      ]
                    }
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
              this.loading = true
              setTimeout(() => {
                this.tableData = window.MOCK_DATA_LIST.slice(0, 15)
                this.loading = false
              }, 100)
            },
            insertEvent () {
              this.$refs.xGrid.insert({
                name: 'xxx'
              })
            },
            saveEvent () {
              setTimeout(() => {
                const { insertRecords, removeRecords, updateRecords } = this.$refs.xGrid.getRecordset()
                this.$XModal.message({ message: \`新增 \${insertRecords.length} 条，删除 \${removeRecords.length} 条，更新 \${updateRecords.length} 条\`, status: 'success' })
                this.loadData()
              }, 100)
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
      this.loading = true
      setTimeout(() => {
        this.tableData = window.MOCK_DATA_LIST.slice(0, 15)
        this.loading = false
      }, 100)
    },
    insertEvent () {
      this.$refs.xGrid.insert({
        name: 'xxx'
      })
    },
    saveEvent () {
      setTimeout(() => {
        const { insertRecords, removeRecords, updateRecords } = this.$refs.xGrid.getRecordset()
        this.$XModal.message({ message: `新增 ${insertRecords.length} 条，删除 ${removeRecords.length} 条，更新 ${updateRecords.length} 条`, status: 'success' })
        this.loadData()
      }, 100)
    }
  }
}
</script>
