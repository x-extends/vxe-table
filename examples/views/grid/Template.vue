<template>
  <div>
    <p class="tip">
      使用自定义模板渲染，通过 <table-column-api-link prop="slots"/> 属性使用自定义插槽来编写模板或 <a class="link" href="https://cn.vuejs.org/v2/guide/render-function.html#JSX" target="_blank">JSX</a> 渲染函数或 <a class="link" href="https://cn.vuejs.org/v2/guide/render-function.html#%E8%99%9A%E6%8B%9F-DOM" target="_blank">VNode</a><span class="red">（注：返回数组格式）</span><br>
      <grid-api-link prop="form"/>：自定义表单模板<br>
      <grid-api-link prop="toolbar"/>：自定义工具栏模板<br>
      <grid-api-link prop="top"/>：自定义顶部模板<br>
      <grid-api-link prop="bottom"/>：自定义底部模板<br>
      <grid-api-link prop="pager"/>：自定义分页模板<br>
    </p>

    <vxe-grid
      ref="xGrid"
      class="my-grid66"
      v-bind="gridOptions"
      @checkbox-change="checkboxChangeEvent"
      @checkbox-all="checkboxChangeEvent">
      <!--使用 form 插槽-->
      <template #form>
        <vxe-form :data="demo1.formData" @submit="searchEvent">
          <vxe-form-item title="名称" field="name">
            <template #default>
              <vxe-input v-model="demo1.formData.name" placeholder="请输入名称" clearable></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item title="昵称" field="nickname">
            <template #default>
              <vxe-input v-model="demo1.formData.nickname" placeholder="请输入昵称" clearable></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item title="性别" field="sex">
            <template #default>
              <vxe-select v-model="demo1.formData.sex" placeholder="请选择性别" clearable>
                <vxe-option value="1" label="女"></vxe-option>
                <vxe-option value="2" label="男"></vxe-option>
              </vxe-select>
            </template>
          </vxe-form-item>
          <vxe-form-item>
            <template #default>
              <vxe-button status="primary">查询</vxe-button>
            </template>
          </vxe-form-item>
        </vxe-form>
      </template>

      <!--自定义插槽 toolbar buttons 插槽-->
      <template #toolbar_buttons>
        <vxe-form>
          <vxe-form-item>
            <template #default>
              <vxe-input placeholder="搜索"></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item>
            <template #default>
              <vxe-button status="primary">查询</vxe-button>
            </template>
          </vxe-form-item>
        </vxe-form>
      </template>

      <!--自定义插槽 toolbar tools 插槽-->
      <template #toolbar_tools>
        <vxe-input placeholder="搜索"></vxe-input>
      </template>

      <!--使用 top 插槽-->
      <template #top>
        <div class="alert-message">
          <i class="fa fa-exclamation-circle alert-message-icon"></i>
          <span class="alert-message-content">
            <div>自定义模板</div>
          </span>
        </div>
      </template>

      <!--自定义插槽-->
      <template #name_header>
        <div class="first-col">
          <div class="first-col-top">名称</div>
          <div class="first-col-bottom">类型</div>
        </div>
      </template>

      <template #num_default="{ row, rowIndex }">
        <template v-if="rowIndex === 2">
          <vxe-switch v-model="row.flag"></vxe-switch>
        </template>
        <template v-else-if="rowIndex === 3">
          <vxe-switch v-model="row.flag" open-label="开" close-label="关"></vxe-switch>
        </template>
        <template v-else>
          <span>{{ row.num1 }}</span>
        </template>
      </template>
      <template #num_footer="{ items, _columnIndex }">
        <span style="color: red">合计：{{ items[_columnIndex] }}</span>
      </template>

      <template #num1_default="{ row }">
        <span>￥{{ row.num1 }}元</span>
      </template>

      <template #num1_header="{ column }">
        <span>
          <i>@</i>
          <span style="color: red;" @click="headerClickEvent">{{ column.title }}</span>
        </span>
      </template>

      <template #num1_footer="{ items, _columnIndex }">
        <span>
          <vxe-button status="primary" size="mini">按钮</vxe-button>
          <span>累计：{{ items[_columnIndex] }}</span>
        </span>
      </template>

      <template #num1_filter="{ column, $panel }">
        <div>
          <div v-for="(option, index) in column.filters" :key="index">
            <input type="type" v-model="option.data" @input="changeFilterEvent(evnt, option, $panel)"/>
          </div>
        </div>
      </template>

      <template #num1_edit="{ row }">
        <input type="number" class="my-input" v-model="row.num1" />
      </template>

      <template #img1_default="{ row }">
        <img v-if="row.img1" :src="row.img1" style="width: 100px;"/>
        <span v-else>无</span>
      </template>

      <!--使用 bottom 插槽-->
      <template #bottom>
        <div class="alert-message">
          <i class="fa fa-exclamation-circle alert-message-icon"></i>
          <span class="alert-message-content">
            <div>自定义模板</div>
          </span>
        </div>
      </template>

      <!--自定义插槽 pager 插槽-->
      <template #pager>
        <vxe-pager
          perfect
          v-model:current-page="demo1.tablePage.currentPage"
          v-model:page-size="demo1.tablePage.pageSize"
          :total="demo1.tablePage.totalResult">
          <template #left>
            <span class="page-left">
              <vxe-checkbox v-model="demo1.isAllChecked" :indeterminate="demo1.isIndeterminate" @change="changeAllEvent"></vxe-checkbox>
              <span class="select-count">已选中 {{ demo1.selectRecords.length }} 条</span>
              <vxe-button>修改</vxe-button>
              <vxe-button>管理</vxe-button>
              <vxe-button>删除</vxe-button>
              <vxe-button size="small">
                <template #default>更多操作</template>
                <template #dropdowns>
                  <vxe-button type="text">批量修改</vxe-button>
                  <vxe-button type="text">批量管理</vxe-button>
                  <vxe-button type="text">批量删除</vxe-button>
                </template>
              </vxe-button>
            </span>
          </template>
          <template #right>
            <span>
              <img src="/vxe-table/static/other/img1.gif" style="height: 30px;" />
              <img src="/vxe-table/static/other/img1.gif" style="height: 30px;" />
              <img src="/vxe-table/static/other/img2.gif" style="height: 30px;" />
              <img src="/vxe-table/static/other/img1.gif" style="height: 30px;" />
              <img src="/vxe-table/static/other/img1.gif" style="height: 30px;" />
            </span>
          </template>
        </vxe-pager>
      </template>
    </vxe-grid>

    <vxe-modal v-model="demo1.showDetails" title="查看详情" width="800" height="400" resize>
      <template #default>
        <div v-if="demo1.selectRow" v-html="demo1.selectRow.html3"></div>
      </template>
    </vxe-modal>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
      <pre-code class="css">{{ demoCodes[2] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="tsx">
import { defineComponent, reactive, ref } from 'vue'
import { VXETable } from '../../../packages/all'
import { VxeGridInstance, VxeGridProps, VxeTableEvents } from '../../../types/index'
import XEUtils from 'xe-utils'

export default defineComponent({
  setup () {
    const xGrid = ref({} as VxeGridInstance)

    const addressClickEvent = (row: any) => {
      VXETable.modal.alert(`address点击事件：${row.address}`)
    }

    const demo1 = reactive({
      searchVal1: '',
      searchVal2: '',
      showDetails: false,
      selectRow: null,
      isAllChecked: false,
      isIndeterminate: false,
      selectRecords: [] as any[],
      formData: {
        name: '',
        nickname: '',
        sex: ''
      },
      tablePage: {
        totalResult: 8,
        currentPage: 1,
        pageSize: 10
      }
    })

    const gridOptions = reactive({
      border: true,
      resizable: true,
      showFooter: true,
      height: 600,
      editConfig: {
        trigger: 'click',
        mode: 'cell',
        icon: 'fa fa-pencil-square-o'
      },
      data: [
        { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', num1: '222', sex: 'Man', age: 28, address: 'Shenzhen', img1: '/vxe-table/static/other/img1.gif' },
        { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', num1: '536', sex: 'Women', age: 22, address: 'Guangzhou', img1: '/vxe-table/static/other/img2.gif' },
        { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', num1: '1000', sex: 'Man', age: 32, address: 'Shanghai', img1: '/vxe-table/static/other/img1.gif' },
        { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', num1: '424323', sex: 'Women ', age: 23, address: 'Shenzhen', img1: '' },
        { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', num1: '253', sex: 'Women ', age: 30, address: 'Shanghai', img1: '/vxe-table/static/other/img1.gif' },
        { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', num1: '555', sex: 'Women ', age: 21, address: 'Shenzhen', img1: '/vxe-table/static/other/img2.gif' },
        { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', num1: '11', sex: 'Man ', age: 29, address: 'Shenzhen', img1: '' },
        { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', num1: '998', sex: 'Man ', age: 35, address: 'Shenzhen', img1: '/vxe-table/static/other/img1.gif' }
      ],
      toolbarConfig: {
        custom: true,
        slots: {
          buttons: 'toolbar_buttons',
          tools: 'toolbar_tools'
        }
      },
      columns: [
        { type: 'checkbox', width: 60 },
        { field: 'name', title: 'Name', width: 200, resizable: false, slots: { header: 'name_header' } },
        { field: 'age', title: 'Age', width: 100 },
        {
          field: 'num1',
          title: 'Num1',
          showHeaderOverflow: true,
          filters: [{ data: '' }],
          editRender: {
            name: 'input',
            autofocus: '.my-input'
          },
          slots: {
            // 使用插槽模板渲染
            default: 'num1_default',
            header: 'num1_header',
            footer: 'num1_footer',
            filter: 'num1_filter',
            edit: 'num1_edit'
          }
        },
        {
          field: 'address',
          title: 'Address',
          showOverflow: true,
          slots: {
            // 使用渲染函数
            default: ({ row }) => {
              return [
                <span style="color: blue" onClick={ () => addressClickEvent(row) }>自定义模板内容</span>
              ]
            }
          }
        },
        { field: 'img1', title: '图片路径', slots: { default: 'img1_default' } }
      ],
      footerMethod ({ columns, data }) {
        return [
          columns.map((column, index) => {
            if (index === 0) {
              return '平均'
            } else if (['num1', 'age'].includes(column.property)) {
              return XEUtils.mean(data, column.property)
            }
            return null
          })
        ]
      }
    } as VxeGridProps)

    const searchEvent = () => {
      VXETable.modal.alert('查询')
    }

    const headerClickEvent = () => {
      VXETable.modal.alert('头部点击事件')
    }

    const changeFilterEvent = (evnt: Event, option: any, $panel: any) => {
      $panel.changeOption(evnt, !!option.data, option)
    }

    const showDetailEvent = (row: any) => {
      demo1.selectRow = row
      demo1.showDetails = true
    }

    const checkboxChangeEvent: VxeTableEvents.CheckboxChange = ({ records }) => {
      const $grid = xGrid.value
      demo1.isAllChecked = $grid.isAllCheckboxChecked()
      demo1.isIndeterminate = $grid.isCheckboxIndeterminate()
      demo1.selectRecords = records
    }

    const changeAllEvent = () => {
      const $grid = xGrid.value
      $grid.setAllCheckboxRow(demo1.isAllChecked)
      demo1.selectRecords = $grid.getCheckboxRecords()
    }

    return {
      xGrid,
      demo1,
      gridOptions,
      searchEvent,
      headerClickEvent,
      changeFilterEvent,
      showDetailEvent,
      checkboxChangeEvent,
      changeAllEvent,
      demoCodes: [
        `
        <vxe-grid
          ref="xGrid"
          class="my-grid66"
          v-bind="gridOptions"
          @checkbox-change="checkboxChangeEvent"
          @checkbox-all="checkboxChangeEvent">
          <!--使用 form 插槽-->
          <template #form>
            <vxe-form :data="demo1.formData" @submit="searchEvent">
              <vxe-form-item title="名称" field="name">
                <template #default>
                  <vxe-input v-model="demo1.formData.name" placeholder="请输入名称" clearable></vxe-input>
                </template>
              </vxe-form-item>
              <vxe-form-item title="昵称" field="nickname">
                <template #default>
                  <vxe-input v-model="demo1.formData.nickname" placeholder="请输入昵称" clearable></vxe-input>
                </template>
              </vxe-form-item>
              <vxe-form-item title="性别" field="sex">
                <template #default>
                  <vxe-select v-model="demo1.formData.sex" placeholder="请选择性别" clearable>
                    <vxe-option value="1" label="女"></vxe-option>
                    <vxe-option value="2" label="男"></vxe-option>
                  </vxe-select>
                </template>
              </vxe-form-item>
              <vxe-form-item>
                <template #default>
                  <vxe-button status="primary">查询</vxe-button>
                </template>
              </vxe-form-item>
            </vxe-form>
          </template>

          <!--自定义插槽 toolbar buttons 插槽-->
          <template #toolbar_buttons>
            <vxe-form>
              <vxe-form-item>
                <template #default>
                  <vxe-input placeholder="搜索"></vxe-input>
                </template>
              </vxe-form-item>
              <vxe-form-item>
                <template #default>
                  <vxe-button status="primary">查询</vxe-button>
                </template>
              </vxe-form-item>
            </vxe-form>
          </template>

          <!--自定义插槽 toolbar tools 插槽-->
          <template #toolbar_tools>
            <vxe-input placeholder="搜索"></vxe-input>
          </template>

          <!--使用 top 插槽-->
          <template #top>
            <div class="alert-message">
              <i class="fa fa-exclamation-circle alert-message-icon"></i>
              <span class="alert-message-content">
                <div>自定义模板</div>
              </span>
            </div>
          </template>

          <!--自定义插槽-->
          <template #name_header>
            <div class="first-col">
              <div class="first-col-top">名称</div>
              <div class="first-col-bottom">类型</div>
            </div>
          </template>

          <template #num_default="{ row, rowIndex }">
            <template v-if="rowIndex === 2">
              <vxe-switch v-model="row.flag"></vxe-switch>
            </template>
            <template v-else-if="rowIndex === 3">
              <vxe-switch v-model="row.flag" open-label="开" close-label="关"></vxe-switch>
            </template>
            <template v-else>
              <span>{{ row.num1 }}</span>
            </template>
          </template>
          <template #num_footer="{ items, _columnIndex }">
            <span style="color: red">合计：{{ items[_columnIndex] }}</span>
          </template>

          <template #num1_default="{ row }">
            <span>￥{{ row.num1 }}元</span>
          </template>

          <template #num1_header="{ column }">
            <span>
              <i>@</i>
              <span style="color: red;" @click="headerClickEvent">{{ column.title }}</span>
            </span>
          </template>

          <template #num1_footer="{ items, _columnIndex }">
            <span>
              <vxe-button status="primary" size="mini">按钮</vxe-button>
              <span>累计：{{ items[_columnIndex] }}</span>
            </span>
          </template>

          <template #num1_filter="{ column, $panel }">
            <div>
              <div v-for="(option, index) in column.filters" :key="index">
                <input type="type" v-model="option.data" @input="changeFilterEvent(evnt, option, $panel)"/>
              </div>
            </div>
          </template>

          <template #num1_edit="{ row }">
            <input type="number" class="my-input" v-model="row.num1" />
          </template>

          <template #img1_default="{ row }">
            <img v-if="row.img1" :src="row.img1" style="width: 100px;"/>
            <span v-else>无</span>
          </template>

          <!--使用 bottom 插槽-->
          <template #bottom>
            <div class="alert-message">
              <i class="fa fa-exclamation-circle alert-message-icon"></i>
              <span class="alert-message-content">
                <div>自定义模板</div>
              </span>
            </div>
          </template>

          <!--自定义插槽 pager 插槽-->
          <template #pager>
            <vxe-pager
              perfect
              v-model:current-page="demo1.tablePage.currentPage"
              v-model:page-size="demo1.tablePage.pageSize"
              :total="demo1.tablePage.totalResult">
              <template #left>
                <span class="page-left">
                  <vxe-checkbox v-model="demo1.isAllChecked" :indeterminate="demo1.isIndeterminate" @change="changeAllEvent"></vxe-checkbox>
                  <span class="select-count">已选中 {{ demo1.selectRecords.length }} 条</span>
                  <vxe-button>修改</vxe-button>
                  <vxe-button>管理</vxe-button>
                  <vxe-button>删除</vxe-button>
                  <vxe-button size="small">
                    <template #default>更多操作</template>
                    <template #dropdowns>
                      <vxe-button type="text">批量修改</vxe-button>
                      <vxe-button type="text">批量管理</vxe-button>
                      <vxe-button type="text">批量删除</vxe-button>
                    </template>
                  </vxe-button>
                </span>
              </template>
              <template #right>
                <span>
                  <img src="/vxe-table/static/other/img1.gif" style="height: 30px;" />
                  <img src="/vxe-table/static/other/img1.gif" style="height: 30px;" />
                  <img src="/vxe-table/static/other/img2.gif" style="height: 30px;" />
                  <img src="/vxe-table/static/other/img1.gif" style="height: 30px;" />
                  <img src="/vxe-table/static/other/img1.gif" style="height: 30px;" />
                </span>
              </template>
            </vxe-pager>
          </template>
        </vxe-grid>

        <vxe-modal v-model="demo1.showDetails" title="查看详情" width="800" height="400" resize>
          <template #default>
            <div v-if="demo1.selectRow" v-html="demo1.selectRow.html3"></div>
          </template>
        </vxe-modal>
        `,
        `
        import { defineComponent, reactive, ref } from 'vue'
        import { VXETable, VxeGridInstance, VxeGridProps, VxeTableEvents } from 'vxe-table'
        import XEUtils from 'xe-utils'

        export default defineComponent({
          setup () {
            const xGrid = ref({} as VxeGridInstance)

            const addressClickEvent = (row: any) => {
              VXETable.modal.alert(\`address点击事件：\${row.address}\`)
            }

            const demo1 = reactive({
              searchVal1: '',
              searchVal2: '',
              showDetails: false,
              selectRow: null,
              isAllChecked: false,
              isIndeterminate: false,
              selectRecords: [] as any[],
              formData: {
                name: '',
                nickname: '',
                sex: ''
              },
              tablePage: {
                totalResult: 8,
                currentPage: 1,
                pageSize: 10
              }
            })

            const gridOptions = reactive({
              border: true,
              resizable: true,
              showFooter: true,
              height: 600,
              editConfig: {
                trigger: 'click',
                mode: 'cell',
                icon: 'fa fa-pencil-square-o'
              },
              data: [
                { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', num1: '222', sex: 'Man', age: 28, address: 'Shenzhen', img1: '/vxe-table/static/other/img1.gif' },
                { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', num1: '536', sex: 'Women', age: 22, address: 'Guangzhou', img1: '/vxe-table/static/other/img2.gif' },
                { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', num1: '1000', sex: 'Man', age: 32, address: 'Shanghai', img1: '/vxe-table/static/other/img1.gif' },
                { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', num1: '424323', sex: 'Women ', age: 23, address: 'Shenzhen', img1: '' },
                { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', num1: '253', sex: 'Women ', age: 30, address: 'Shanghai', img1: '/vxe-table/static/other/img1.gif' },
                { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', num1: '555', sex: 'Women ', age: 21, address: 'Shenzhen', img1: '/vxe-table/static/other/img2.gif' },
                { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', num1: '11', sex: 'Man ', age: 29, address: 'Shenzhen', img1: '' },
                { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', num1: '998', sex: 'Man ', age: 35, address: 'Shenzhen', img1: '/vxe-table/static/other/img1.gif' }
              ],
              toolbarConfig: {
                custom: true,
                slots: {
                  buttons: 'toolbar_buttons',
                  tools: 'toolbar_tools'
                }
              },
              columns: [
                { type: 'checkbox', width: 60 },
                { field: 'name', title: 'Name', width: 200, resizable: false, slots: { header: 'name_header' } },
                { field: 'age', title: 'Age', width: 100 },
                {
                  field: 'num1',
                  title: 'Num1',
                  showHeaderOverflow: true,
                  filters: [{ data: '' }],
                  editRender: {
                    name: 'input',
                    autofocus: '.my-input'
                  },
                  slots: {
                    // 使用插槽模板渲染
                    default: 'num1_default',
                    header: 'num1_header',
                    footer: 'num1_footer',
                    filter: 'num1_filter',
                    edit: 'num1_edit'
                  }
                },
                {
                  field: 'address',
                  title: 'Address',
                  showOverflow: true,
                  slots: {
                    // 使用 JSX 渲染
                    default: ({ row }) => {
                      return [
                        <span style="color: blue" onClick={ () => addressClickEvent(row) }>自定义模板内容</span>
                      ]
                    }
                  }
                },
                { field: 'img1', title: '图片路径', slots: { default: 'img1_default' } }
              ],
              footerMethod ({ columns, data }) {
                return [
                  columns.map((column, index) => {
                    if (index === 0) {
                      return '平均'
                    } else if (['num1', 'age'].includes(column.property)) {
                      return XEUtils.mean(data, column.property)
                    }
                    return null
                  })
                ]
              }
            } as VxeGridProps)

            const searchEvent = () => {
              VXETable.modal.alert('查询')
            }

            const headerClickEvent = () => {
              VXETable.modal.alert('头部点击事件')
            }

            const changeFilterEvent = (evnt: Event, option: any, $panel: any) => {
              $panel.changeOption(evnt, !!option.data, option)
            }

            const showDetailEvent = (row: any) => {
              demo1.selectRow = row
              demo1.showDetails = true
            }

            const checkboxChangeEvent: VxeTableEvents.CheckboxChange = ({ records }) => {
              const $grid = xGrid.value
              demo1.isAllChecked = $grid.isAllCheckboxChecked()
              demo1.isIndeterminate = $grid.isCheckboxIndeterminate()
              demo1.selectRecords = records
            }

            const changeAllEvent = () => {
              const $grid = xGrid.value
              $grid.setAllCheckboxRow(demo1.isAllChecked)
              demo1.selectRecords = $grid.getCheckboxRecords()
            }

            return {
              xGrid,
              demo1,
              gridOptions,
              searchEvent,
              headerClickEvent,
              changeFilterEvent,
              showDetailEvent,
              checkboxChangeEvent,
              changeAllEvent
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
          left: -14px;
          top: 10px;
          width: 204px;
          height: 1px;
          transform: rotate(13deg);
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
  }
})
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
  left: -14px;
  top: 10px;
  width: 204px;
  height: 1px;
  transform: rotate(13deg);
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
