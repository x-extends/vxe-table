<template>
  <div>
    <p class="tip">
      使用自带的工具栏 <toolbar-api-link name="vxe-toolbar"/>，配合模板可以非常简单的实现强大的功能<br>
      支持显示/隐藏列、列宽拖动状态的保存功能，还可以配合 <table-api-link prop="custom"/> 事件实现显示/隐藏列的服务端保存
    </p>

    <vxe-toolbar custom print></vxe-toolbar>

    <vxe-table
      border
      height="300"
      :export-config="{}"
      :data="tableData1">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-colgroup title="分组信息">
        <vxe-table-colgroup title="基本信息">
          <vxe-table-column field="name" title="app.body.label.name"></vxe-table-column>
          <vxe-table-column field="role" title="Role"></vxe-table-column>
        </vxe-table-colgroup>
        <vxe-table-column field="sex" title="app.body.label.sex"></vxe-table-column>
      </vxe-table-colgroup>
      <vxe-table-column field="age" title="app.body.label.age"></vxe-table-column>
      <vxe-table-colgroup title="其他信息">
        <vxe-table-column field="rate" title="Rate"></vxe-table-column>
      </vxe-table-colgroup>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p class="tip">工具栏和表格默认是上下相邻关系，渲染时会自动进行关联；如果位置不是相邻关系，也可以手动调用 connect() 方法关联</p>

    <div>
      <p>工具栏位置随意放</p>
      <my-div>
        <vxe-toolbar
          custom
          print
          ref="xToolbar"
          :buttons="toolbarButtons"
          :refresh="{query: findList}">
        </vxe-toolbar>
      </my-div>
      <p>工具栏位置随意放</p>
    </div>

    <vxe-table
      border
      ref="xTable"
      height="300"
      :export-config="{}"
      :loading="loading"
      :data="tableData"
      @custom="toolbarCustomEvent">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="app.body.label.name"></vxe-table-column>
      <vxe-table-column field="role" title="Role"></vxe-table-column>
      <vxe-table-column field="sex" title="app.body.label.sex"></vxe-table-column>
      <vxe-table-column field="age" title="app.body.label.age"></vxe-table-column>
      <vxe-table-column field="rate" title="Rate"></vxe-table-column>
    </vxe-table>

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
      loading: false,
      tableData1: [],
      tableData: [],
      toolbarButtons: [
        { code: 'btn1', name: 'app.body.button.insert' },
        {
          name: '下拉按钮',
          dropdowns: [
            { name: '按钮111', code: 'btn2' },
            { name: '按钮222', code: 'btn3' }
          ]
        }
      ],
      demoCodes: [
        `
        <vxe-toolbar custom print></vxe-toolbar>

        <vxe-table
          border
          height="300"
          :export-config="{}"
          :data="tableData1">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-colgroup title="分组信息">
            <vxe-table-colgroup title="基本信息">
              <vxe-table-column field="name" title="app.body.label.name"></vxe-table-column>
              <vxe-table-column field="role" title="Role"></vxe-table-column>
            </vxe-table-colgroup>
            <vxe-table-column field="sex" title="app.body.label.sex"></vxe-table-column>
          </vxe-table-colgroup>
          <vxe-table-column field="age" title="app.body.label.age"></vxe-table-column>
          <vxe-table-colgroup title="其他信息">
            <vxe-table-column field="rate" title="Rate"></vxe-table-column>
          </vxe-table-colgroup>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData1: []
            }
          },
          created () {
            this.tableData1 = window.MOCK_DATA_LIST.slice(0, 10)
          }
        }
        `,
        `
        <vxe-table
          border
          ref="xTable"
          height="300"
          :export-config="{}"
          :loading="loading"
          :data="tableData"
          @custom="toolbarCustomEvent">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="app.body.label.name"></vxe-table-column>
          <vxe-table-column field="role" title="Role"></vxe-table-column>
          <vxe-table-column field="sex" title="app.body.label.sex"></vxe-table-column>
          <vxe-table-column field="age" title="app.body.label.age"></vxe-table-column>
          <vxe-table-column field="rate" title="Rate"></vxe-table-column>
        </vxe-table>

        <div>
          <p>工具栏位置随意放</p>
          <my-div>
            <vxe-toolbar
              custom
              print
              ref="xToolbar"
              :buttons="toolbarButtons"
              :refresh="{query: findList}">
            </vxe-toolbar>
          </my-div>
          <p>工具栏位置随意放</p>
        </div>
        `,
        `
        export default {
          data () {
            return {
              loading: false,
              tableData: [],
              toolbarButtons: [
                { code: 'btn1', name: 'app.body.button.insert' },
                {
                  name: '下拉按钮',
                  dropdowns: [
                    { name: '按钮111', code: 'btn2' },
                    { name: '按钮222', code: 'btn3' }
                  ]
                }
              ]
            }
          },
          created () {
            this.$nextTick(() => {
              // 手动将表格和工具栏进行关联
              this.$refs.xTable.connect(this.$refs.xToolbar)
            })
            this.findList()
          },
          methods: {
            findList () {
              this.loading = true
              return new Promise(resolve => {
                setTimeout(() => {
                  this.tableData = window.MOCK_DATA_LIST.slice(0, 20)
                  this.loading = false
                  resolve()
                }, 300)
              })
            },
            toolbarCustomEvent (params) {
              const visibleColumn = this.$refs.xTable.getColumns()
              switch (params.type) {
                case 'confirm': {
                  this.$XModal.message({ message: \`点击了确认，显示为 \${visibleColumn.length} 列\`, status: 'info' })
                  break
                }
                case 'reset': {
                  this.$XModal.message({ message: \`点击了重置，显示为 \${visibleColumn.length} 列\`, status: 'info' })
                  break
                }
                case 'close': {
                  this.$XModal.message({ message: \`关闭了面板，显示为 \${visibleColumn.length} 列\`, status: 'info' })
                  break
                }
              }
            }
          }
        }
        `
      ]
    }
  },
  created () {
    this.$nextTick(() => {
      // 手动将表格和工具栏进行关联
      this.$refs.xTable.connect(this.$refs.xToolbar)
    })
    this.tableData1 = window.MOCK_DATA_LIST.slice(0, 10)
    this.findList()
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    findList () {
      this.loading = true
      return new Promise(resolve => {
        setTimeout(() => {
          this.tableData = window.MOCK_DATA_LIST.slice(0, 20)
          this.loading = false
          resolve()
        }, 300)
      })
    },
    toolbarCustomEvent (params) {
      const visibleColumn = this.$refs.xTable.getColumns()
      switch (params.type) {
        case 'confirm': {
          this.$XModal.message({ message: `点击了确认，显示为 ${visibleColumn.length} 列`, status: 'info' })
          break
        }
        case 'reset': {
          this.$XModal.message({ message: `点击了重置，显示为 ${visibleColumn.length} 列`, status: 'info' })
          break
        }
        case 'close': {
          this.$XModal.message({ message: `关闭了面板，显示为 ${visibleColumn.length} 列`, status: 'info' })
          break
        }
      }
    }
  }
}
</script>
