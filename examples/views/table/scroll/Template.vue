<template>
  <div>
    <p class="tip">
      使用自定义模板渲染，通过 <table-column-api-link prop="slots"/> 属性编写 <a class="link" href="https://cn.vuejs.org/v2/guide/render-function.html#JSX" target="_blank">JSX</a> 模板或 <a class="link" href="https://cn.vuejs.org/v2/guide/render-function.html#%E8%99%9A%E6%8B%9F-DOM" target="_blank">VNode</a><br>
      列：<br>
      &nbsp;&nbsp;<table-column-api-link prop="default"/>：自定义内容模板（提前格式化好数据 > <table-column-api-link prop="formatter"/> > <table-column-api-link prop="slots"/>）<br>
      &nbsp;&nbsp;<table-column-api-link prop="header"/>：自定义表头模板<br>
      &nbsp;&nbsp;<table-column-api-link prop="filter"/>：自定义筛选模板（建议使用<router-link :to="{name: 'RendererAPI'}">渲染器</router-link>，可以更好的复用）<br>
      &nbsp;&nbsp;<table-column-api-link prop="edit"/>：自定义可编辑模板（建议使用<router-link :to="{name: 'RendererAPI'}">渲染器</router-link>，可以更好的复用）<br>
      工具栏：<br>
      &nbsp;&nbsp;<table-column-api-link prop="buttons"/>：自定义按钮模板<br>
      <span class="red">注意：请处理好单元格显示的内容，虚拟滚动无法支持动态行高</span>
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
        { type: 'index', width: 50 },
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
                row.img1 ? <img src={ row.img1 } style="height: 40px;"/> : <span>无</span>
              ]
            }
          }
        }
      ],
      tableToolbar: {
        setting: true,
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
                { type: 'index', width: 50 },
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
                setting: true,
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
              this.$XModal.alert(\`address点击事件：\${row.row}\`)
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
    headerClickEvent (evnt) {
      this.$XModal.alert('头部点击事件')
    },
    addressClickEvent (row) {
      this.$XModal.alert(`address点击事件：${row.row}`)
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
