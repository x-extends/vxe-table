<template>
  <div>
    <p class="tip">
      使用自定义模板渲染，通过 <table-column-api-link prop="slots"/> 属性编写 <a class="link" href="https://cn.vuejs.org/v2/guide/render-function.html#JSX" target="_blank">JSX</a> 模板或 <a class="link" href="https://cn.vuejs.org/v2/guide/render-function.html#%E8%99%9A%E6%8B%9F-DOM" target="_blank">VNode</a><br>
    </p>

    <vxe-grid
      border
      resizable
      show-overflow
      ref="xGrid"
      height="400"
      :loading="loading"
      :toolbar="tableToolbar"
      :columns="tableColumn"
      :edit-config="{trigger: 'click', mode: 'cell'}">
    </vxe-grid>

    <vxe-modal v-model="showDetails" title="查看详情" width="800" height="400" resize>
      <template>
        <div v-if="selectRow" v-html="selectRow.html3"></div>
      </template>
    </vxe-modal>

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
      loading: false,
      showDetails: false,
      selectRow: null,
      tableColumn: [
        { type: 'seq', width: 50 },
        {
          field: 'name',
          title: 'Name',
          slots: {
            default: ({ row, column }) => {
              return [
                <span style="color: red;">{ row.name }</span>,
                <button onClick={ () => this.showDetailEvent(row, column) }>弹框</button>
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
            default: ({ row }) => {
              return [
                <a class="link" href="https://xuliangzhan.github.io/vxe-table/">我是超链接：{ row.sex }</a>
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
            filter: ({ column, $panel }) => {
              return column.filters.map(option => {
                return <input type="type" v-model={ option.data } onInput={ evnt => this.changeFilterEvent(evnt, option, $panel) }/>
              })
            },
            edit: ({ row }) => {
              return [
                <input type="text" v-model={ row.sex } />
              ]
            }
          }
        },
        {
          field: 'address',
          title: 'Address',
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
        },
        {
          field: 'html2',
          title: 'Html片段',
          slots: {
            default: ({ row }) => {
              return [
                <span domPropsInnerHTML={ row.html2 }></span>
              ]
            }
          }
        },
        {
          field: 'img1',
          title: '图片路径',
          slots: {
            default: ({ row }) => {
              return [
                row.img1 ? <img src={ row.img1 } style="height: 40px;"/> : <span>无</span>
              ]
            }
          }
        }
      ],
      tableToolbar: {
        custom: true,
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
      demoCodes: [
        `
        <vxe-grid
          border
          resizable
          show-overflow
          ref="xGrid"
          height="400"
          :loading="loading"
          :toolbar="tableToolbar"
          :columns="tableColumn"
          :edit-config="{trigger: 'click', mode: 'cell'}">
        </vxe-grid>

        <vxe-modal v-model="showDetails" title="查看详情" width="800" height="400" resize>
          <template>
            <div v-if="selectRow" v-html="selectRow.html3"></div>
          </template>
        </vxe-modal>
        `,
        `
        export default {
          data () {
            return {
              loading: false,
              showDetails: false,
              selectRow: null,
              tableColumn: [
                { type: 'seq', width: 50 },
                {
                  field: 'name',
                  title: 'Name',
                  slots: {
                    default: ({ row, column }) => {
                      return [
                        <span style="color: red;">{ row.name }</span>,
                        <button onClick={ () => this.showDetailEvent(row, column) }>弹框</button>
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
                        <a class="link" href="https://xuliangzhan.github.io/vxe-table/">我是超链接：{ row.sex }</a>
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
                    filter: ({ column, $panel }) => {
                      return column.filters.map(option => {
                        return <input type="type" v-model={ option.data } onInput={ evnt => this.changeFilterEvent(evnt, option, $panel) }/>
                      })
                    },
                    edit: ({ row }) => {
                      return [
                        <input type="text" v-model={ row.sex } />
                      ]
                    }
                  }
                },
                {
                  field: 'address',
                  title: 'Address',
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
                },
                {
                  field: 'html2',
                  title: 'Html片段',
                  slots: {
                    default: ({ row }, h) => {
                      return [
                        <span domPropsInnerHTML={ row.html2 }></span>
                      ]
                    }
                  }
                },
                {
                  field: 'img1',
                  title: '图片路径',
                  slots: {
                    default: ({ row }, h) => {
                      return [
                        row.img1 ? <img src={ row.img1 } style="width: 100px;"/> : <span>无</span>
                      ]
                    }
                  }
                }
              ],
              tableToolbar: {
                custom: true,
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
            this.loading = true
            setTimeout(() => {
              let tableData = window.MOCK_DATA_LIST.slice(0, 600)
              // 使用函数式加载，阻断 vue 对大数组的双向绑定，大数据性能翻倍提升
              if (this.$refs.xGrid) {
                this.$refs.xGrid.loadData(tableData)
              }
              this.loading = false
            }, 500)
          },
          methods: {
            showDetailEvent (row) {
              this.selectRow = row
              this.showDetails = true
            },
            headerClickEvent (evnt) {
              this.$XModal.alert('头部点击事件')
            },
            addressClickEvent (row) {
              this.$XModal.alert(\`address点击事件：\${row.address}\`)
            },
            filterSexMethod ({ option, row }) {
              return row.sex === option.data
            },
            changeFilterEvent (evnt, option, $panel) {
              $panel.changeOption(evnt, !!option.data, option)
            }
          }
        }
        `
      ]
    }
  },
  created () {
    this.loading = true
    setTimeout(() => {
      // 使用函数式加载，阻断 vue 对大数组的监听
      if (this.$refs.xGrid) {
        this.$refs.xGrid.loadData(window.MOCK_DATA_LIST.slice(0, 600))
      }
      this.loading = false
    }, 500)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    showDetailEvent (row) {
      this.selectRow = row
      this.showDetails = true
    },
    headerClickEvent () {
      this.$XModal.alert('头部点击事件')
    },
    addressClickEvent (row) {
      this.$XModal.alert(`address点击事件：${row.address}`)
    },
    filterSexMethod ({ option, row }) {
      return row.sex === option.data
    },
    changeFilterEvent (evnt, option, $panel) {
      $panel.changeOption(evnt, !!option.data, option)
    }
  }
}
</script>
