<template>
  <div>
    <p class="tip">
      使用自定义模板渲染，通过 <table-column-api-link prop="slots"/> 属性使用自定义插槽来编写模板或 <a class="link" href="https://cn.vuejs.org/v2/guide/render-function.html#JSX" target="_blank">JSX</a> 渲染函数或 <a class="link" href="https://cn.vuejs.org/v2/guide/render-function.html#%E8%99%9A%E6%8B%9F-DOM" target="_blank">VNode</a><br>
      列：<br>
      <table-column-api-link prop="default"/>：自定义内容模板（提前格式化好数据 > <table-column-api-link prop="formatter"/> > <table-column-api-link prop="slots"/>）<br>
      <table-column-api-link prop="header"/>：自定义表头模板<br>
      <table-column-api-link prop="footer"/>：自定义表尾模板<br>
      <table-column-api-link prop="filter"/>：自定义筛选模板（建议使用<router-link class="link" :to="{name: 'RendererFilter'}">渲染器</router-link>，可以更好的复用）<br>
      <table-column-api-link prop="edit"/>：自定义可编辑模板（建议使用<router-link class="link" :to="{name: 'RendererEdit'}">渲染器</router-link>，可以更好的复用）<br>
      工具栏：<br>
      <grid-api-link prop="buttons"/>：自定义按钮模板（建议使用<router-link class="link" :to="{name: 'RendererToolbar'}">渲染器</router-link>，可以更好的复用）<br>
      <grid-api-link prop="tools"/>：自定义右侧按钮模板（建议使用<router-link class="link" :to="{name: 'RendererToolbar'}">渲染器</router-link>，可以更好的复用）<br>
      顶部：<br>
      <grid-api-link prop="top"/>：自定义顶部模板<br>
      底部：<br>
      <grid-api-link prop="bottom"/>：自定义底部模板<br>
    </p>

    <vxe-grid
      border
      resizable
      form-config
      show-footer
      height="500"
      :footer-method="footerMethod"
      :toolbar="tableToolbar"
      :columns="tableColumn"
      :data="tableData"
      :edit-config="{trigger: 'click', mode: 'cell', icon: 'fa fa-pencil-square-o'}">
      <!--使用 form 插槽-->
      <template v-slot:form>
        <vxe-form :data="formData" @submit="searchEvent">
          <vxe-form-item title="名称" field="name">
            <vxe-input v-model="formData.name" placeholder="请输入名称" clearable></vxe-input>
          </vxe-form-item>
          <vxe-form-item title="昵称" field="nickname">
            <vxe-input v-model="formData.nickname" placeholder="请输入昵称" clearable></vxe-input>
          </vxe-form-item>
          <vxe-form-item title="性别" field="sex">
            <vxe-select v-model="formData.sex" placeholder="请选择性别" clearable>
              <vxe-option value="1" label="女"></vxe-option>
              <vxe-option value="2" label="男"></vxe-option>
            </vxe-select>
          </vxe-form-item>
          <vxe-form-item>
            <vxe-button status="primary">查询</vxe-button>
          </vxe-form-item>
        </vxe-form>
      </template>

      <!--使用 top 插槽-->
      <template v-slot:top>
        <div class="alert-message">
          <i class="fa fa-exclamation-circle alert-message-icon"></i>
          <span>可以在这里自定义顶部模板</span>
        </div>
      </template>

      <!--使用 buttons 插槽-->
      <template v-slot:buttons>
        <vxe-form>
          <vxe-form-item>
            <vxe-input placeholder="搜索"></vxe-input>
          </vxe-form-item>
          <vxe-form-item>
            <vxe-button status="primary">查询</vxe-button>
          </vxe-form-item>
        </vxe-form>
      </template>

      <!--自定义插槽 seq_header-->
      <template v-slot:seq_header>
        <div class="first-col">
          <div class="first-col-top">名称</div>
          <div class="first-col-bottom">序号</div>
        </div>
      </template>

      <!--自定义插槽 num_footer-->
      <template v-slot:num_footer="{ items, itemIndex }">
        <span style="color: red">合计：{{ items[itemIndex] }}</span>
      </template>

      <!--自定义插槽 name_default-->
      <template v-slot:name_default="{ row, column }">
        <span>
          <span style="color: red;">{{ row.name }}</span>
          <button @click="showDetailEvent(row, column)">弹框</button>
        </span>
      </template>
    </vxe-grid>

    <vxe-modal v-model="showDetails" title="查看详情" width="800" height="400" resize>
      <div v-if="selectRow" v-html="selectRow.html3"></div>
    </vxe-modal>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
      <code class="css">{{ demoCodes[2] }}</code>
    </pre>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'
import hljs from 'highlight.js'

export default {
  data () {
    return {
      showDetails: false,
      selectRow: null,
      formData: {
        name: '',
        nickname: '',
        sex: ''
      },
      tableData: [],
      tableColumn: [
        {
          type: 'seq',
          width: 100,
          resizable: false,
          slots: {
            // 对应自定义插槽的名称
            header: 'seq_header'
          }
        },
        {
          field: 'name',
          title: 'Name',
          slots: {
            // 对应自定义插槽的名称
            default: 'name_default'
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
            // 使用 JSX 渲染函数
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
            footer: ({ items, itemIndex }) => {
              return [
                <span>累计：{ items[itemIndex] }</span>
              ]
            },
            filter: ({ column, $panel }) => {
              return column.filters.map(option => {
                return <input type="type" value={ option.data } onInput={ evnt => this.changeFilterEvent(evnt, option, $panel) }/>
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
          field: 'num',
          title: 'Number',
          slots: {
            // 对应自定义插槽的名称
            footer: 'num_footer'
          }
        },
        {
          field: 'address',
          title: 'Address',
          showOverflow: true,
          slots: {
            // 使用 JSX 渲染函数
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
          field: 'html1',
          title: 'Html片段',
          showOverflow: true,
          slots: {
            // 使用 JSX 渲染函数
            default: ({ row }) => {
              return [
                <span domPropsInnerHTML={ row.html1 }></span>
              ]
            }
          }
        },
        {
          field: 'img1',
          title: '图片路径',
          slots: {
            // 使用 JSX 渲染函数
            default: ({ row }) => {
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
          // 使用 JSX 渲染函数
          tools: () => {
            return [
              <vxe-input placeholder="搜索"></vxe-input>
            ]
          }
        }
      },
      demoCodes: [
        `
        <vxe-grid
          border
          resizable
          form-config
          show-footer
          height="500"
          :footer-method="footerMethod"
          :toolbar="tableToolbar"
          :columns="tableColumn"
          :data="tableData"
          :edit-config="{trigger: 'click', mode: 'cell', icon: 'fa fa-pencil-square-o'}">
          <!--使用 form 插槽-->
          <template v-slot:form>
            <vxe-form :data="formData" @submit="searchEvent">
              <vxe-form-item title="名称" field="name">
                <vxe-input v-model="formData.name" placeholder="请输入名称" clearable></vxe-input>
              </vxe-form-item>
              <vxe-form-item title="昵称" field="nickname">
                <vxe-input v-model="formData.nickname" placeholder="请输入昵称" clearable></vxe-input>
              </vxe-form-item>
              <vxe-form-item title="性别" field="sex">
                <vxe-select v-model="formData.sex" placeholder="请选择性别" clearable>
                  <vxe-option value="1" label="女"></vxe-option>
                  <vxe-option value="2" label="男"></vxe-option>
                </vxe-select>
              </vxe-form-item>
              <vxe-form-item>
                <vxe-button status="primary">查询</vxe-button>
              </vxe-form-item>
            </vxe-form>
          </template>

          <!--使用 top 插槽-->
          <template v-slot:top>
            <div class="alert-message">
              <i class="fa fa-exclamation-circle alert-message-icon"></i>
              <span>可以在这里自定义顶部模板</span>
            </div>
          </template>

          <!--使用 buttons 插槽-->
          <template v-slot:buttons>
            <vxe-form>
              <vxe-form-item>
                <vxe-input placeholder="搜索"></vxe-input>
              </vxe-form-item>
              <vxe-form-item>
                <vxe-button status="primary">查询</vxe-button>
              </vxe-form-item>
            </vxe-form>
          </template>

          <!--自定义插槽 seq_header-->
          <template v-slot:seq_header>
            <div class="first-col">
              <div class="first-col-top">名称</div>
              <div class="first-col-bottom">序号</div>
            </div>
          </template>

          <!--自定义插槽 num_footer-->
          <template v-slot:num_footer="{ items, itemIndex }">
            <span style="color: red">合计：{{ items[itemIndex] }}</span>
          </template>

          <!--自定义插槽 name_default-->
          <template v-slot:name_default="{ row, column }">
            <span>
              <span style="color: red;">{{ row.name }}</span>
              <button @click="showDetailEvent(row, column)">弹框</button>
            </span>
          </template>
        </vxe-grid>

        <vxe-modal v-model="showDetails" title="查看详情" width="800" height="400" resize>
          <div v-if="selectRow" v-html="selectRow.html3"></div>
        </vxe-modal>
        `,
        `
        export default {
          data () {
            return {
              showDetails: false,
              selectRow: null,
              formData: {
                name: '',
                nickname: '',
                sex: ''
              },
              tableData: [],
              tableColumn: [
                {
                  type: 'seq',
                  width: 100,
                  resizable: false,
                  slots: {
                    // 对应自定义插槽的名称
                    header: 'seq_header'
                  }
                },
                {
                  field: 'name',
                  title: 'Name',
                  slots: {
                    // 对应自定义插槽的名称
                    default: 'name_default'
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
                    // 使用 JSX 渲染函数
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
                    footer: ({ items, itemIndex }) => {
                      return [
                        <span>累计：{ items[itemIndex] }</span>
                      ]
                    },
                    filter: ({ column, $panel }) => {
                      return column.filters.map(option => {
                        return <input type="type" value={ option.data } onInput={ evnt => this.changeFilterEvent(evnt, option, $panel) }/>
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
                  field: 'num',
                  title: 'Number',
                  slots: {
                    // 对应自定义插槽的名称
                    footer: 'num_footer'
                  }
                },
                {
                  field: 'address',
                  title: 'Address',
                  showOverflow: true,
                  slots: {
                    // 使用 JSX 渲染函数
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
                  field: 'html1',
                  title: 'Html片段',
                  showOverflow: true,
                  slots: {
                    // 使用 JSX 渲染函数
                    default: ({ row }, h) => {
                      return [
                        <span domPropsInnerHTML={ row.html1 }></span>
                      ]
                    }
                  }
                },
                {
                  field: 'img1',
                  title: '图片路径',
                  slots: {
                    // 使用 JSX 渲染函数
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
                  // 使用 JSX 渲染函数
                  tools: () => {
                    return [
                      <vxe-input placeholder="搜索"></vxe-input>
                    ]
                  }
                }
              }
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 100)
          },
          methods: {
            searchEvent () {
              this.$XModal.alert('查询')
            },
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
              option.data = evnt.target.value
              $panel.changeMultipleOption(evnt, !!option.data, option)
            },
            footerMethod ({ columns, data }) {
              return [
                columns.map((column, columnIndex) => {
                  if (['sex', 'num'].includes(column.property)) {
                    return XEUtils.sum(data, column.property)
                  }
                  return null
                })
              ]
            }
          }
        }
        `,
        `
        .alert-message {
          padding: 8px 15px;
          border-radius: 4px;
          background-color: #e6f7ff;
          border: 1px solid #91d5ff;
        }
        .alert-message-icon {
          color: #409eff;
          margin-right: 8px;
        }
        .first-col {
          position: relative;
          height: 20px;
        }
        .first-col:before {
          content: "";
          position: absolute;
          left: -15px;
          top: 10px;
          width: 110px;
          height: 1px;
          transform: rotate(28deg);
          background-color: #e8eaec;
        }
        .first-col .first-col-top {
          position: absolute;
          right: 4px;
          top: -10px;
        }
        .first-col .first-col-bottom {
          position: absolute;
          left: 4px;
          bottom: -10px;
        }
        `
      ]
    }
  },
  created () {
    this.tableData = window.MOCK_DATA_LIST.slice(0, 100)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    searchEvent () {
      this.$XModal.alert('查询')
    },
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
      option.data = evnt.target.value
      $panel.changeMultipleOption(evnt, !!option.data, option)
    },
    footerMethod ({ columns, data }) {
      return [
        columns.map((column) => {
          if (['sex', 'num'].includes(column.property)) {
            return XEUtils.sum(data, column.property)
          }
          return null
        })
      ]
    }
  }
}
</script>

<style scoped>
.alert-message {
  padding: 8px 15px;
  border-radius: 4px;
  background-color: #e6f7ff;
  border: 1px solid #91d5ff;
}
.alert-message-icon {
  color: #409eff;
  margin-right: 8px;
}
.first-col {
  position: relative;
  height: 20px;
}
.first-col:before {
  content: "";
  position: absolute;
  left: -15px;
  top: 10px;
  width: 110px;
  height: 1px;
  transform: rotate(28deg);
  background-color: #e8eaec;
}
.first-col .first-col-top {
  position: absolute;
  right: 4px;
  top: -10px;
}
.first-col .first-col-bottom {
  position: absolute;
  left: 4px;
  bottom: -10px;
}
</style>
