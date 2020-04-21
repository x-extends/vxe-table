<template>
  <div>
    <p class="tip">
      使用自定义模板渲染，通过 <table-column-api-link prop="slots"/> 属性使用自定义插槽来编写模板或 <a class="link" href="https://cn.vuejs.org/v2/guide/render-function.html#JSX" target="_blank">JSX</a> 渲染函数或 <a class="link" href="https://cn.vuejs.org/v2/guide/render-function.html#%E8%99%9A%E6%8B%9F-DOM" target="_blank">VNode</a><span class="red">（注：返回数组格式）</span><br>
      <grid-api-link prop="form"/>：自定义表单模板<br>
      <grid-api-link prop="toolbar"/>：自定义工具栏模板<br>
      <grid-api-link prop="top"/>：自定义顶部模板<br>
      <grid-api-link prop="bottom"/>：自定义底部模板<br>
    </p>

    <vxe-grid
      border
      resizable
      form-config
      show-footer
      height="600"
      ref="xGrid"
      class="my-grid66"
      :footer-method="footerMethod"
      :toolbar="tableToolbar"
      :pager-config="tablePage"
      :columns="tableColumn"
      :data="tableData"
      :edit-config="{trigger: 'click', mode: 'cell', icon: 'fa fa-pencil-square-o'}"
      @checkbox-change="checkboxChangeEvent"
      @checkbox-all="checkboxChangeEvent">
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
          <span class="alert-message-content">
            <marquee direction="left" scrollamount="4" width="100%" onmouseover="this.stop();" onmouseout="this.start();">前方高能！！！ 顶部模板！！！ 顶部模板！！！ 顶部模板！！！前方高能！！！ 顶部模板！！！ 顶部模板！！！ 顶部模板！！！</marquee>
          </span>
        </div>
      </template>

      <!--自定义插槽 toolbar_buttons 插槽-->
      <template v-slot:toolbar_buttons>
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
      <template v-slot:num_footer="{ items, _columnIndex }">
        <span style="color: red">合计：{{ items[_columnIndex] }}</span>
      </template>

      <!--自定义插槽 name_default-->
      <template v-slot:name_default="{ row, column }">
        <span>
          <span style="color: red;">{{ row.name }}</span>
          <button @click="showDetailEvent(row, column)">弹框</button>
        </span>
      </template>

      <!--使用 bottom 插槽-->
      <template v-slot:bottom>
        <div class="alert-message">
          <i class="fa fa-exclamation-circle alert-message-icon"></i>
          <span class="alert-message-content">
            <marquee direction="right" scrollamount="4" width="100%" onmouseover="this.stop();" onmouseout="this.start();">前方高能！！！ 底部模板！！！ 底部模板！！！ 底部模板！！！前方高能！！！ 底部模板！！！ 底部模板！！！ 底部模板！！！</marquee>
          </span>
        </div>
      </template>

      <!--自定义插槽 pager_left-->
      <template v-slot:pager_left>
        <span class="page-left">
          <vxe-checkbox v-model="isAllChecked" :indeterminate="isIndeterminate" @change="changeAllEvent"></vxe-checkbox>
          <span class="select-count">已选中 {{ selectRecords.length }} 条</span>
          <vxe-button>修改</vxe-button>
          <vxe-button>管理</vxe-button>
          <vxe-button>删除</vxe-button>
          <vxe-button size="small">
            <template>更多操作</template>
            <template v-slot:dropdowns>
              <vxe-button type="text">批量修改</vxe-button>
              <vxe-button type="text">批量管理</vxe-button>
              <vxe-button type="text">批量删除</vxe-button>
            </template>
          </vxe-button>
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
      isAllChecked: false,
      isIndeterminate: false,
      selectRecords: [],
      formData: {
        name: '',
        nickname: '',
        sex: ''
      },
      tablePage: {
        perfect: true,
        total: 0,
        currentPage: 1,
        pageSize: 10,
        slots: {
          // 使用自定义插槽
          left: 'pager_left',
          // 使用 JSX 渲染
          right: () => {
            return [
              <span>
                <img src="static/other/img1.gif" style="height: 30px;" />
                <img src="static/other/img1.gif" style="height: 30px;" />
                <img src="static/other/img2.gif" style="height: 30px;" />
                <img src="static/other/img1.gif" style="height: 30px;" />
                <img src="static/other/img1.gif" style="height: 30px;" />
              </span>
            ]
          }
        }
      },
      tableData: [],
      tableColumn: [
        { type: 'checkbox', width: 60 },
        // 对应自定义插槽的名称
        { type: 'seq', width: 100, resizable: false, slots: { header: 'seq_header' } },
        { field: 'name', title: 'Name', slots: { default: 'name_default' } },
        {
          field: 'num1',
          title: 'Money',
          showHeaderOverflow: true,
          editRender: { type: 'default', autofocus: '.my-input' },
          slots: {
            // 使用 JSX 渲染
            default: ({ row }) => {
              return [
                <span>￥{ row.num1 }元</span>
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
            footer: ({ items, _columnIndex }) => {
              return [
                <span>累计：{ items[_columnIndex] }</span>
              ]
            },
            filter: ({ column, $panel }) => {
              return column.filters.map(option => {
                return <input type="type" v-model={ option.data } onInput={ evnt => this.changeFilterEvent(evnt, option, $panel) }/>
              })
            },
            edit: ({ row }) => {
              return [
                <input type="number" class="my-input" v-model={ row.num1 } />
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
            // 使用渲染函数
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
            // 使用 JSX 渲染
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
            // 使用 JSX 渲染
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
          // 使用自定义插槽
          buttons: 'toolbar_buttons',
          // 使用 JSX 渲染
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
          height="600"
          ref="xGrid"
          class="my-grid66"
          :footer-method="footerMethod"
          :toolbar="tableToolbar"
          :pager-config="tablePage"
          :columns="tableColumn"
          :data="tableData"
          :edit-config="{trigger: 'click', mode: 'cell', icon: 'fa fa-pencil-square-o'}"
          @checkbox-change="checkboxChangeEvent"
          @checkbox-all="checkboxChangeEvent">
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
              <span class="alert-message-content">
                <marquee direction="left" scrollamount="4" width="100%" onmouseover="this.stop();" onmouseout="this.start();">前方高能！！！ 顶部模板！！！ 顶部模板！！！ 顶部模板！！！前方高能！！！ 顶部模板！！！ 顶部模板！！！ 顶部模板！！！</marquee>
              </span>
            </div>
          </template>

          <!--自定义插槽 toolbar_buttons 插槽-->
          <template v-slot:toolbar_buttons>
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
          <template v-slot:num_footer="{ items, _columnIndex }">
            <span style="color: red">合计：{{ items[_columnIndex] }}</span>
          </template>

          <!--自定义插槽 name_default-->
          <template v-slot:name_default="{ row, column }">
            <span>
              <span style="color: red;">{{ row.name }}</span>
              <button @click="showDetailEvent(row, column)">弹框</button>
            </span>
          </template>

          <!--使用 bottom 插槽-->
          <template v-slot:bottom>
            <div class="alert-message">
              <i class="fa fa-exclamation-circle alert-message-icon"></i>
              <span class="alert-message-content">
                <marquee direction="right" scrollamount="4" width="100%" onmouseover="this.stop();" onmouseout="this.start();">前方高能！！！ 底部模板！！！ 底部模板！！！ 底部模板！！！前方高能！！！ 底部模板！！！ 底部模板！！！ 底部模板！！！</marquee>
              </span>
            </div>
          </template>

          <!--自定义插槽 pager_left-->
          <template v-slot:pager_left>
            <span class="page-left">
              <vxe-checkbox v-model="isAllChecked" :indeterminate="isIndeterminate" @change="changeAllEvent"></vxe-checkbox>
              <span class="select-count">已选中 {{ selectRecords.length }} 条</span>
              <vxe-button>修改</vxe-button>
              <vxe-button>管理</vxe-button>
              <vxe-button>删除</vxe-button>
              <vxe-button size="small">
                <template>更多操作</template>
                <template v-slot:dropdowns>
                  <vxe-button type="text">批量修改</vxe-button>
                  <vxe-button type="text">批量管理</vxe-button>
                  <vxe-button type="text">批量删除</vxe-button>
                </template>
              </vxe-button>
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
              isAllChecked: false,
              isIndeterminate: false,
              selectRecords: [],
              formData: {
                name: '',
                nickname: '',
                sex: ''
              },
              tablePage: {
                perfect: true,
                total: 0,
                currentPage: 1,
                pageSize: 10,
                slots: {
                  // 使用自定义插槽
                  left: 'pager_left',
                  // 使用 JSX 渲染
                  right: () => {
                    return [
                      <span>
                        <img src="static/other/img1.gif" style="height: 30px;" />
                        <img src="static/other/img1.gif" style="height: 30px;" />
                        <img src="static/other/img2.gif" style="height: 30px;" />
                        <img src="static/other/img1.gif" style="height: 30px;" />
                        <img src="static/other/img1.gif" style="height: 30px;" />
                      </span>
                    ]
                  }
                }
              },
              tableData: [],
              tableColumn: [
                { type: 'checkbox', width: 60 },
                // 对应自定义插槽的名称
                { type: 'seq', width: 100, resizable: false, slots: { header: 'seq_header' } },
                { field: 'name', title: 'Name', slots: { default: 'name_default' } },
                {
                  field: 'num1',
                  title: 'Money',
                  showHeaderOverflow: true,
                  editRender: { type: 'default', autofocus: '.my-input' },
                  slots: {
                    // 使用 JSX 渲染
                    default: ({ row }) => {
                      return [
                        <span>￥{ row.num1 }元</span>
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
                    footer: ({ items, _columnIndex }) => {
                      return [
                        <span>累计：{ items[_columnIndex] }</span>
                      ]
                    },
                    filter: ({ column, $panel }) => {
                      return column.filters.map(option => {
                        return <input type="type" v-model={ option.data } onInput={ evnt => this.changeFilterEvent(evnt, option, $panel) }/>
                      })
                    },
                    edit: ({ row }) => {
                      return [
                        <input type="number" class="my-input" v-model={ row.num1 } />
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
                    // 使用渲染函数
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
                    // 使用 JSX 渲染
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
                    // 使用 JSX 渲染
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
                  // 使用自定义插槽
                  buttons: 'toolbar_buttons',
                  // 使用 JSX 渲染
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
            this.tableData = window.MOCK_DATA_LIST.slice(0, 8)
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
            changeFilterEvent (evnt, option, $panel) {
              $panel.changeOption(evnt, !!option.data, option)
            },
            checkboxChangeEvent ({ records }) {
              this.isAllChecked = this.$refs.xGrid.isAllCheckboxChecked()
              this.isIndeterminate = this.$refs.xGrid.isCheckboxIndeterminate()
              this.selectRecords = records
            },
            changeAllEvent () {
              this.$refs.xGrid.setAllCheckboxRow(this.isAllChecked)
            },
            footerMethod ({ columns, data }) {
              return [
                columns.map((column, columnIndex) => {
                  if (['num1', 'num'].includes(column.property)) {
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
        .my-grid66 .alert-message {
          height: 40px;
          display: flex;
          align-items: center;
          margin: 10px 0;
          border-radius: 4px;
          background-color: #e6f7ff;
          border: 1px solid #91d5ff;
        }
        .my-grid66 .alert-message-icon {
          width: 30px;
          text-align: center;
          color: #409eff;
          margin-right: 8px;
        }
        .my-grid66 .alert-message-content {
          flex-grow: 1;
          padding-right: 20px;
        }
        .my-grid66 .page-left {
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
        }
        .my-grid66 .select-count {
          display: inline-block;
          vertical-align: middle;
        }
        .my-grid66 .my-input {
          width: 100%;
        }
        .my-grid66 .first-col {
          position: relative;
          height: 20px;
        }
        .my-grid66 .first-col:before {
          content: "";
          position: absolute;
          left: -15px;
          top: 10px;
          width: 110px;
          height: 1px;
          transform: rotate(28deg);
          background-color: #e8eaec;
        }
        .my-grid66 .first-col .first-col-top {
          position: absolute;
          right: 4px;
          top: -10px;
        }
        .my-grid66 .first-col .first-col-bottom {
          position: absolute;
          left: 4px;
          bottom: -10px;
        }
        `
      ]
    }
  },
  created () {
    this.tableData = window.MOCK_DATA_LIST.slice(0, 8)
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
    changeFilterEvent (evnt, option, $panel) {
      $panel.changeOption(evnt, !!option.data, option)
    },
    checkboxChangeEvent ({ records }) {
      this.isAllChecked = this.$refs.xGrid.isAllCheckboxChecked()
      this.isIndeterminate = this.$refs.xGrid.isCheckboxIndeterminate()
      this.selectRecords = records
    },
    changeAllEvent () {
      this.$refs.xGrid.setAllCheckboxRow(this.isAllChecked)
    },
    footerMethod ({ columns, data }) {
      return [
        columns.map((column) => {
          if (['num1', 'num'].includes(column.property)) {
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
.my-grid66 .alert-message {
  height: 40px;
  display: flex;
  align-items: center;
  margin: 10px 0;
  border-radius: 4px;
  background-color: #e6f7ff;
  border: 1px solid #91d5ff;
}
.my-grid66 .alert-message-icon {
  width: 30px;
  text-align: center;
  color: #409eff;
  margin-right: 8px;
}
.my-grid66 .alert-message-content {
  flex-grow: 1;
  padding-right: 20px;
}
.my-grid66 .page-left {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}
.my-grid66 .select-count {
  display: inline-block;
  vertical-align: middle;
}
.my-grid66 .my-input {
  width: 100%;
}
.my-grid66 .first-col {
  position: relative;
  height: 20px;
}
.my-grid66 .first-col:before {
  content: "";
  position: absolute;
  left: -15px;
  top: 10px;
  width: 110px;
  height: 1px;
  transform: rotate(28deg);
  background-color: #e8eaec;
}
.my-grid66 .first-col .first-col-top {
  position: absolute;
  right: 4px;
  top: -10px;
}
.my-grid66 .first-col .first-col-bottom {
  position: absolute;
  left: 4px;
  bottom: -10px;
}
</style>
