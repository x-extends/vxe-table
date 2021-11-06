<template>
  <div>
    <p class="tip">
      使用自定义模板渲染，通过 <table-column-api-link prop="slots"/> 属性编写 <a class="link" href="https://cn.vuejs.org/v2/guide/render-function.html#JSX" target="_blank">JSX</a> 模板或 <a class="link" href="https://cn.vuejs.org/v2/guide/render-function.html#%E8%99%9A%E6%8B%9F-DOM" target="_blank">VNode</a><br>
    </p>

    <vxe-grid
      border
      resizable
      show-overflow
      class="my-grid88"
      ref="xGrid"
      height="400"
      :loading="loading"
      :toolbar-config="tableToolbar"
      :columns="tableColumn"
      :edit-config="{trigger: 'click', mode: 'cell'}">
      <template #name_header>
        <div class="first-col">
          <div class="first-col-top">名称</div>
          <div class="first-col-bottom">类型</div>
        </div>
      </template>

      <template #default_name="{ row, column }">
        <span style="color: red;">{{ row.name }}</span>,
        <button @click="showDetailEvent(row, column)">弹框</button>
      </template>
    </vxe-grid>

    <vxe-modal v-model="showDetails" title="查看详情" width="800" height="400" resize>
      <template #default>
        <div v-if="selectRow" v-html="selectRow.address"></div>
      </template>
    </vxe-modal>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
      <pre-code class="css">{{ demoCodes[2] }}</pre-code>
    </pre>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      showDetails: false,
      selectRow: null,
      tableColumn: [
        { type: 'seq', width: 50 },
        { field: 'name', title: 'Name', width: 200, resizable: false, slots: { header: 'name_header', default: 'default_name' } },
        {
          field: 'sex',
          title: 'Sex',
          showHeaderOverflow: true,
          filters: [{ data: '' }],
          filterMethod: this.filterSexMethod,
          editRender: {},
          slots: {
            default: ({ row }) => {
              return [
                <a class="link" href="https://x-extends.github.io/vxe-table/">我是超链接：{ row.sex }</a>
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
            default: ({ row }) => {
              return [
                <span style="color: blue" onClick={ () => this.addressClickEvent(row) }>{ row.address }</span>
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
          class="my-grid88"
          ref="xGrid"
          height="400"
          :loading="loading"
          :toolbar-config="tableToolbar"
          :columns="tableColumn"
          :edit-config="{trigger: 'click', mode: 'cell'}">
          <template #name_header>
            <div class="first-col">
              <div class="first-col-top">名称</div>
              <div class="first-col-bottom">类型</div>
            </div>
          </template>

          <template #default_name="{ row, column }">
            <span style="color: red;">{{ row.name }}</span>,
            <button @click="showDetailEvent(row, column)">弹框</button>
          </template>
        </vxe-grid>

        <vxe-modal v-model="showDetails" title="查看详情" width="800" height="400" resize>
          <template #default>
            <div v-if="selectRow" v-html="selectRow.address"></div>
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
                { field: 'name', title: 'Name', width: 200, resizable: false, slots: { header: 'name_header', default: 'default_name' } },
                {
                  field: 'sex',
                  title: 'Sex',
                  showHeaderOverflow: true,
                  filters: [{ data: '' }],
                  filterMethod: this.filterSexMethod,
                  editRender: {},
                  slots: {
                    default: ({ row, column }) => {
                      return [
                        <a class="link" href="https://x-extends.github.io/vxe-table/">我是超链接：{ row.sex }</a>
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
                    default: ({ row }) => {
                      return [
                        <span style="color: blue" onClick={ () => this.addressClickEvent(row) }>{ row.address }</span>
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
              this.mockList(400).then(data => {
                // 使用函数式加载
                if (this.$refs.xGrid) {
                  this.$refs.xGrid.loadData(data)
                }
                this.loading = false
              })
            }, 500)
          },
          methods: {
            mockList (size) {
              return new Promise(resolve => {
                const list = []
                for (let index = 0; index < size; index++) {
                  list.push({
                    name: \`名称\${index}\`,
                    sex: '0',
                    num: 123,
                    age: 18,
                    num2: 234,
                    rate: 3,
                    img1: '/vxe-table/static/other/img1.gif',
                    html2: \`<span style="color:red">HTML标签\${index}</span>\`,
                    address: \`test abc系列\${index}\`
                  })
                }
                resolve(list)
              })
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
              $panel.changeOption(evnt, !!option.data, option)
            }
          }
        }
        `,
        `
        .my-grid88 .first-col {
          position: relative;
          height: 20px;
        }
        .my-grid88 .first-col:before {
          content: "";
          position: absolute;
          left: -14px;
          top: 10px;
          width: 204px;
          height: 1px;
          transform: rotate(13deg);
          background-color: #e8eaec;
        }
        .my-grid88 .first-col .first-col-top {
          position: absolute;
          right: 4px;
          top: -10px;
        }
        .my-grid88 .first-col .first-col-bottom {
          position: absolute;
          left: 4px;
          bottom: -10px;
        }
        `
      ]
    }
  },
  created () {
    this.loading = true
    setTimeout(() => {
      this.mockList(400).then(data => {
        // 使用函数式加载
        if (this.$refs.xGrid) {
          this.$refs.xGrid.loadData(data)
        }
        this.loading = false
      })
    }, 500)
  },
  methods: {
    mockList (size) {
      return new Promise(resolve => {
        const list = []
        for (let index = 0; index < size; index++) {
          list.push({
            name: `名称${index}`,
            sex: '0',
            num: 123,
            age: 18,
            num2: 234,
            rate: 3,
            img1: '/vxe-table/static/other/img1.gif',
            html2: `<span style="color:red">HTML标签${index}</span>`,
            address: `test abc系列${index}`
          })
        }
        resolve(list)
      })
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
      $panel.changeOption(evnt, !!option.data, option)
    }
  }
}
</script>

<style lang="scss" scoped>
.my-grid88 .first-col {
  position: relative;
  height: 20px;
}
.my-grid88 .first-col:before {
  content: "";
  position: absolute;
  left: -14px;
  top: 10px;
  width: 204px;
  height: 1px;
  transform: rotate(13deg);
  background-color: #e8eaec;
}
.my-grid88 .first-col .first-col-top {
  position: absolute;
  right: 4px;
  top: -10px;
}
.my-grid88 .first-col .first-col-bottom {
  position: absolute;
  left: 4px;
  bottom: -10px;
}
</style>
