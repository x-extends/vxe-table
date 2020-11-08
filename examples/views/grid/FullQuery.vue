<template>
  <div>
    <p class="tip">数据代理、固定列、服务端排序、服务端筛选、服务端分页，导出不分页的所有数据，对于分页场景下，如果想要保留选中状态，可以通过设置 <table-api-link prop="radio-config"/> 的 <table-api-link prop="reserve"/> 属性</p>

    <vxe-grid ref="xGrid" v-bind="gridOptions">

      <!--将表单放在工具栏中-->
      <template #toolbar_buttons>
        <vxe-form :data="formData" @submit="searchEvent" @reset="searchEvent">
          <vxe-form-item field="name" :item-render="{name: 'input', attrs: {placeholder: '请输入名称'}}"></vxe-form-item>
          <vxe-form-item :item-render="{ name: '$buttons', children: [{ props: { type: 'submit', content: 'app.body.label.search', status: 'primary' } }, { props: { type: 'reset', content: 'app.body.label.reset' } }] }"></vxe-form-item>
        </vxe-form>
      </template>

      <!--自定义空数据模板-->
      <template #empty>
        <span style="color: red;">
          <img src="/vxe-table/static/other/img1.gif">
          <p>没有更多数据了！</p>
        </span>
      </template>
    </vxe-grid>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, Ref } from 'vue'
import { VxeGridInstance, VxeGridOptions } from '../../../types/vxe-table'
import XEUtils from 'xe-utils'
import XEAjax from 'xe-ajax'

export default defineComponent({
  setup () {
    const xGrid = ref() as Ref<VxeGridInstance>

    const searchEvent = () => {
      const $grid = xGrid.value
      $grid.commitProxy('reload')
    }

    const formData = reactive({
      name: ''
    })

    const gridOptions = reactive({
      resizable: true,
      showOverflow: true,
      border: 'inner',
      height: 548,
      rowId: 'id',
      printConfig: {
        columns: [
          { field: 'name' },
          { field: 'email' },
          { field: 'nickname' },
          { field: 'age' },
          { field: 'amount' }
        ]
      },
      sortConfig: {
        trigger: 'cell',
        remote: true,
        defaultSort: {
          field: 'name',
          order: 'desc'
        }
      },
      filterConfig: {
        remote: true
      },
      pagerConfig: {
        pageSize: 15,
        pageSizes: [5, 15, 20, 50, 100, 200, 500, 1000]
      },
      exportConfig: {
        // 默认选中类型
        type: 'xlsx',
        // 局部自定义类型
        types: ['xlsx', 'csv', 'html', 'xml', 'txt'],
        // 自定义数据量列表
        modes: ['current', 'all']
      },
      radioConfig: {
        labelField: 'id',
        reserve: true,
        highlight: true
      },
      proxyConfig: {
        seq: true, // 启用动态序号代理
        sort: true, // 启用排序代理
        filter: true, // 启用筛选代理
        props: {
          result: 'result', // 配置响应结果列表字段
          total: 'page.total' // 配置响应结果总页数字段
        },
        ajax: {
          // 接收 Promise 对象
          query: ({ page, sort, filters }) => {
            // 处理排序条件
            const queryParams: any = Object.assign({
              sort: sort.property,
              order: sort.order
            }, formData)
            // 处理筛选条件
            filters.forEach(({ field, values }) => {
              queryParams[field] = values.join(',')
            })
            return XEAjax.get(`https://api.xuliangzhan.com:10443/api/pub/page/list/${page.pageSize}/${page.currentPage}`, queryParams)
          },
          // 被某些特殊功能所触发，例如：导出数据 mode=all 时，会触发该方法并对返回的数据进行导出
          queryAll: () => XEAjax.get('https://api.xuliangzhan.com:10443/api/pub/all')
        }
      },
      toolbarConfig: {
        export: true,
        print: true,
        custom: true,
        slots: {
          buttons: 'toolbar_buttons'
        }
      },
      columns: [
        { type: 'seq', width: 60, fixed: 'left' },
        { type: 'radio', title: 'ID', width: 120, fixed: 'left' },
        { field: 'name', title: 'Name', minWidth: 160, sortable: true },
        { field: 'email', title: 'Email', minWidth: 160, editRender: { name: 'input' } },
        { field: 'nickname', title: 'Nickname', sortable: true, minWidth: 160 },
        { field: 'age', title: 'Age', visible: false, sortable: true, width: 100 },
        {
          field: 'role',
          title: 'Role',
          sortable: true,
          minWidth: 160,
          filters: [
            { label: '前端开发', value: '前端' },
            { label: '后端开发', value: '后端' },
            { label: '测试', value: '测试' },
            { label: '程序员鼓励师', value: '程序员鼓励师' }
          ],
          filterMultiple: false
        },
        {
          field: 'amount',
          title: 'Amount',
          width: 140,
          formatter ({ cellValue }) {
            return cellValue ? `￥${XEUtils.commafy(XEUtils.toNumber(cellValue), { digits: 2 })}` : ''
          }
        },
        {
          field: 'updateDate',
          title: 'Update Date',
          visible: false,
          width: 160,
          sortable: true,
          formatter ({ cellValue }) {
            return XEUtils.toDateString(cellValue, 'yyyy-MM-dd HH:ss:mm')
          }
        },
        {
          field: 'createDate',
          title: 'Create Date',
          visible: false,
          width: 160,
          sortable: true,
          formatter ({ cellValue }) {
            return XEUtils.toDateString(cellValue, 'yyyy-MM-dd')
          }
        }
      ]
    } as VxeGridOptions)

    return {
      xGrid,
      formData,
      gridOptions,
      searchEvent,
      demoCodes: [
        `
        <vxe-grid ref="xGrid" v-bind="gridOptions">

          <!--将表单放在工具栏中-->
          <template #toolbar_buttons>
            <vxe-form :data="formData" @submit="searchEvent" @reset="searchEvent">
              <vxe-form-item field="name" :item-render="{name: 'input', attrs: {placeholder: '请输入名称'}}"></vxe-form-item>
              <vxe-form-item :item-render="{ name: '$buttons', children: [{ props: { type: 'submit', content: 'app.body.label.search', status: 'primary' } }, { props: { type: 'reset', content: 'app.body.label.reset' } }] }"></vxe-form-item>
            </vxe-form>
          </template>

          <!--自定义空数据模板-->
          <template #empty>
            <span style="color: red;">
              <img src="/vxe-table/static/other/img1.gif">
              <p>没有更多数据了！</p>
            </span>
          </template>
        </vxe-grid>
        `,
        `
        import { defineComponent, reactive, ref, Ref } from 'vue'
        import { VxeGridInstance, VxeGridOptions } from 'vxe-table'
        import XEUtils from 'xe-utils'
        import XEAjax from 'xe-ajax'

        export default defineComponent({
          setup () {
            const xGrid = ref() as Ref<VxeGridInstance>

            const searchEvent = () => {
              const $grid = xGrid.value
              $grid.commitProxy('reload')
            }

            const formData = reactive({
              name: ''
            })

            const gridOptions = reactive({
              resizable: true,
              showOverflow: true,
              border: 'inner',
              height: 548,
              rowId: 'id',
              printConfig: {
                columns: [
                  { field: 'name' },
                  { field: 'email' },
                  { field: 'nickname' },
                  { field: 'age' },
                  { field: 'amount' }
                ]
              },
              sortConfig: {
                trigger: 'cell',
                remote: true,
                defaultSort: {
                  field: 'name',
                  order: 'desc'
                }
              },
              filterConfig: {
                remote: true
              },
              pagerConfig: {
                pageSize: 15,
                pageSizes: [5, 15, 20, 50, 100, 200, 500, 1000]
              },
              exportConfig: {
                // 默认选中类型
                type: 'xlsx',
                // 局部自定义类型
                types: ['xlsx', 'csv', 'html', 'xml', 'txt'],
                // 自定义数据量列表
                modes: ['current', 'all']
              },
              radioConfig: {
                labelField: 'id',
                reserve: true,
                highlight: true
              },
              proxyConfig: {
                seq: true, // 启用动态序号代理
                sort: true, // 启用排序代理
                filter: true, // 启用筛选代理
                props: {
                  result: 'result', // 配置响应结果列表字段
                  total: 'page.total' // 配置响应结果总页数字段
                },
                ajax: {
                  // 接收 Promise 对象
                  query: ({ page, sort, filters }) => {
                    // 处理排序条件
                    const queryParams = Object.assign({
                      sort: sort.property,
                      order: sort.order
                    }, formData)
                    // 处理筛选条件
                    filters.forEach(({ field, values }) => {
                      queryParams[field] = values.join(',')
                    })
                    return XEAjax.get(\`https://api.xuliangzhan.com:10443/api/pub/page/list/\${page.pageSize}/\${page.currentPage}\`, queryParams)
                  },
                  // 被某些特殊功能所触发，例如：导出数据 mode=all 时，会触发该方法并对返回的数据进行导出
                  queryAll: () => XEAjax.get('https://api.xuliangzhan.com:10443/api/pub/all')
                }
              },
              toolbarConfig: {
                export: true,
                print: true,
                custom: true,
                slots: {
                  buttons: 'toolbar_buttons'
                }
              },
              columns: [
                { type: 'seq', width: 60, fixed: 'left' },
                { type: 'radio', title: 'ID', width: 120, fixed: 'left' },
                { field: 'name', title: 'Name', minWidth: 160, sortable: true },
                { field: 'email', title: 'Email', minWidth: 160, editRender: { name: 'input' } },
                { field: 'nickname', title: 'Nickname', sortable: true, minWidth: 160 },
                { field: 'age', title: 'Age', visible: false, sortable: true, width: 100 },
                {
                  field: 'role',
                  title: 'Role',
                  sortable: true,
                  minWidth: 160,
                  filters: [
                    { label: '前端开发', value: '前端' },
                    { label: '后端开发', value: '后端' },
                    { label: '测试', value: '测试' },
                    { label: '程序员鼓励师', value: '程序员鼓励师' }
                  ],
                  filterMultiple: false
                },
                {
                  field: 'amount',
                  title: 'Amount',
                  width: 140,
                  formatter ({ cellValue }) {
                    return cellValue ? \`￥\${XEUtils.commafy(XEUtils.toNumber(cellValue), { digits: 2 })}\` : ''
                  }
                },
                {
                  field: 'updateDate',
                  title: 'Update Date',
                  visible: false,
                  width: 160,
                  sortable: true,
                  formatter ({ cellValue }) {
                    return XEUtils.toDateString(cellValue, 'yyyy-MM-dd HH:ss:mm')
                  }
                },
                {
                  field: 'createDate',
                  title: 'Create Date',
                  visible: false,
                  width: 160,
                  sortable: true,
                  formatter ({ cellValue }) {
                    return XEUtils.toDateString(cellValue, 'yyyy-MM-dd')
                  }
                }
              ]
            } as VxeGridOptions)
            
            return {
              xGrid,
              formData,
              gridOptions,
              searchEvent
            }
          }
        }
        `
      ]
    }
  }
})
</script>
