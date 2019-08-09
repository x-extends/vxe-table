<template>
  <div>
    <p>使用自定义模板渲染，通过 <table-column-api-link prop="slots"/> 属性编写 <a class="link" href="https://cn.vuejs.org/v2/guide/render-function.html#JSX" target="_blank">JSX</a> 模板或 <a class="link" href="https://cn.vuejs.org/v2/guide/render-function.html#%E8%99%9A%E6%8B%9F-DOM" target="_blank">VNode</a></p>
    <p>列：</p>
    <p><table-column-api-link prop="default"/>：自定义内容模板（提前格式化好数据 > <table-column-api-link prop="formatter"/> > <table-column-api-link prop="slots"/>）</p>
    <p><table-column-api-link prop="header"/>：自定义表头模板</p>
    <p><table-column-api-link prop="filter"/>：自定义筛选模板（建议使用<router-link :to="{name: 'RendererAPI'}">渲染器</router-link>，可以更好的复用）</p>
    <p><table-column-api-link prop="edit"/>：自定义可编辑模板（建议使用<router-link :to="{name: 'RendererAPI'}">渲染器</router-link>，可以更好的复用）</p>
    <p>工具栏：</p>
    <p><table-column-api-link prop="buttons"/>：自定义按钮模板</p>

    <vxe-grid
      border
      resizable
      height="400"
      :toolbar="toolbar"
      :columns="tableColumn"
      :data.sync="tableData"
      :edit-config="{trigger: 'click', mode: 'cell'}">
    </vxe-grid>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="vue">{{ demoCodes[1] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tableColumn: [
        { type: 'index', width: 50 },
        {
          field: 'name',
          title: 'Name',
          slots: {
            default: ({ row, column }) => {
              return [
                <span style="color: red;">{ row.name }</span>,
                <button onClick={ () => this.clickEvent(row, column) }>按钮</button>
              ]
            }
          }
        },
        {
          field: 'sex',
          title: 'Sex',
          showHeaderOverflow: true,
          filters: [{ data: '' }],
          filterMethod: this.filterSexMethod,
          editRender: { type: 'default' },
          slots: {
            default: ({ row, column }) => {
              return [
                <a class="link" href="https://xuliangzhan.github.io/vxe-table/">链接：{ row.sex }</a>
              ]
            },
            header: ({ column }) => {
              return [
                <span>
                  <i>@</i>
                  <span style="color: red;" onClick={ this.headerClickEvent }>{ column.title }</span>
                </span>
              ]
            },
            filter: ({ column, context }) => {
              return column.filters.map(option => {
                return <input type="type" value={ option.data } onInput={ evnt => this.changeFilterEvent(evnt, option, context) }/>
              })
            },
            edit: ({ row }) => {
              return [
                <input type="text" value={ row.sex } onInput={ evnt => { row.sex = evnt.target.value } }/>
              ]
            }
          }
        },
        {
          field: 'address',
          title: 'Address',
          showOverflow: true,
          slots: {
            default: ({ row }, h) => {
              return [
                h('span', {
                  style: {
                    color: 'blue'
                  },
                  on: {
                    click: () => this.addressClickEvent(row)
                  }
                }, row.address)
              ]
            }
          }
        }
      ],
      toolbar: {
        setting: {
          storage: false
        },
        slots: {
          buttons: () => {
            return [
              <button>按钮</button>,
              <input type="text"/>,
              <vxe-button>按钮1</vxe-button>,
              <vxe-button>按钮2</vxe-button>
            ]
          }
        }
      },
      tableData: [],
      demoCodes: [
        `
        <vxe-grid
          border
          resizable
          height="400"
          :columns="tableColumn"
          :data.sync="tableData"
          :edit-config="{trigger: 'click', mode: 'cell'}">
        </vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              tableColumn: [
                { type: 'index', width: 50 },
                {
                  field: 'name',
                  title: 'Name',
                  slots: {
                    default: ({ row }) => {
                      return [
                        <span style="color: red;">{ row.name }</span>,
                        <button onClick={ () => this.clickEvent(row, column) }>按钮</button>
                      ]
                    }
                  }
                },
                {
                  field: 'sex',
                  title: 'Sex',
                  showHeaderOverflow: true,
                  filters: [{ data: '' }],
                  filterMethod: this.filterSexMethod,
                  editRender: { type: 'default' },
                  slots: {
                    default: ({ row, column }) => {
                      return [
                        <a class="link" href="https://xuliangzhan.github.io/vxe-table/">链接：{ row.sex }</a>
                      ]
                    },
                    header: ({ column }) => {
                      return [
                        <span>
                          <i>@</i>
                          <span style="color: red;" onClick={ this.headerClickEvent }>{ column.title }</span>
                        </span>
                      ]
                    },
                    filter: ({ column, context }) => {
                      return column.filters.map(option => {
                        return <input type="type" value={ option.data } onInput={ evnt => this.changeFilterEvent(evnt, option, context) }/>
                      })
                    },
                    edit: ({ row }) => {
                      return [
                        <input type="text" value={ row.sex } onInput={ evnt => { row.sex = evnt.target.value } }/>
                      ]
                    }
                  }
                },
                {
                  field: 'address',
                  title: 'Address',
                  showOverflow: true,
                  slots: {
                    default: ({ row }, h) => {
                      return [
                        h('span', {
                          style: {
                            color: 'blue'
                          },
                          on: {
                            click: () => this.addressClickEvent(row)
                          }
                        }, row.address)
                      ]
                    }
                  }
                }
              ],
              toolbar: {
                setting: {
                  storage: false
                },
                slots: {
                  buttons: () => {
                    return [
                      <button>按钮</button>,
                      <input type="text"/>,
                      <vxe-button>按钮1</vxe-button>,
                      <vxe-button>按钮2</vxe-button>
                    ]
                  }
                }
              },
              tableData: []
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 100)
          },
          methods: {
            clickEvent (row, column) {
              this.$XMsg.alert(\`\${column.title}点击事件\`)
            },
            headerClickEvent (evnt) {
              this.$XMsg.alert('头部点击事件')
            },
            addressClickEvent (row) {
              this.$XMsg.alert(\`address点击事件：\${row.row}\`)
            },
            filterSexMethod ({ option, row }) {
              return row.sex === option.data
            },
            changeFilterEvent (evnt, option, context) {
              option.data = evnt.target.value
              context.changeMultipleOption(evnt, !!option.data, option)
            }
          }
        }
        `
      ]
    }
  },
  created () {
    let list = window.MOCK_DATA_LIST.slice(0, 100)
    this.tableData = list
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    clickEvent (row, column) {
      this.$XMsg.alert(`${column.title}点击事件`)
    },
    headerClickEvent (evnt) {
      this.$XMsg.alert('头部点击事件')
    },
    addressClickEvent (row) {
      this.$XMsg.alert(`address点击事件：${row.row}`)
    },
    filterSexMethod ({ option, row }) {
      return row.sex === option.data
    },
    changeFilterEvent (evnt, option, context) {
      option.data = evnt.target.value
      context.changeMultipleOption(evnt, !!option.data, option)
    }
  }
}
</script>
