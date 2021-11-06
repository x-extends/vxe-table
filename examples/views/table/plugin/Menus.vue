<template>
  <div>
    <p class="tip">
      具体兼容请查看 <a class="link" href="https://github.com/x-extends/vxe-table-plugin-menus/tree/v2" target="_blank">vxe-table-plugin-menus</a> 插件的 API<br>
      <span class="red">（注：该示例仅供参考，具体逻辑请自行实现）</span>
    </p>

    <vxe-table
      border
      resizable
      highlight-hover-row
      show-footer
      :footer-method="footerMethod"
      :data="tableData"
      :menu-config="tableMenu"
      :mouse-config="{selected: true}"
      :keyboard-config="{isArrow: true, isDel: true, isEnter: true, isTab: true, isEdit: true}"
      :edit-config="{trigger: 'dblclick', mode: 'cell'}">
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column field="name" title="Name" width="300" sortable :edit-render="{name: 'input'}"></vxe-column>
      <vxe-column field="role" title="Role" width="300" sortable :edit-render="{name: 'input'}"></vxe-column>
      <vxe-colgroup title="基本信息">
        <vxe-column field="sex" title="sex" width="180" :edit-render="{name: 'input'}"></vxe-column>
        <vxe-colgroup title="详细详细">
          <vxe-column field="age" title="Age" width="180" sortable :filters="[{ data: [] }]" :filter-render="{name: 'input'}" :edit-render="{name: 'input'}"></vxe-column>
        </vxe-colgroup>
      </vxe-colgroup>
      <vxe-column field="rate" title="Rate" width="180" sortable></vxe-column>
      <vxe-colgroup title="其他信息">
        <vxe-column field="date13" title="Date" width="250"></vxe-column>
      </vxe-colgroup>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'test abc' },
        { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'test abc' },
        { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc' }
      ],
      tableMenu: {
        header: {
          options: [
            [
              { code: 'HIDDEN_COLUMN', name: '隐藏' },
              { code: 'RESET_COLUMN', name: '取消隐藏' },
              { code: 'FIXED_LEFT_COLUMN', name: '固定到左侧' },
              { code: 'FIXED_RIGHT_COLUMN', name: '固定到右侧' },
              { code: 'CLEAR_FIXED_COLUMN', name: '取消固定' },
              { code: 'RESET_ALL', name: '重置个性化数据', prefixIcon: 'fa fa-undo' }
            ],
            [
              { code: 'PRINT_ALL', name: '打印', prefixIcon: 'fa fa-print' },
              { code: 'EXPORT_ALL', name: '导出.html', prefixIcon: 'fa fa-download', params: { type: 'html' } }
            ]
          ]
        },
        body: {
          options: [
            [
              { code: 'INSERT_AT_ACTIVED_ROW', name: '插入' },
              { code: 'DELETE_ROW', name: 'app.body.label.delete' },
              { code: 'CLEAR_CELL', name: '清除内容' }
            ],
            [
              {
                name: 'app.body.label.filter',
                prefixIcon: 'fa fa-filter',
                children: [
                  { code: 'CLEAR_FILTER', name: '清除筛选' },
                  { code: 'CLEAR_ALL_FILTER', name: '重置所有筛选' },
                  { code: 'FILTER_CELL', name: '按所选单元格的值筛选' }
                ]
              },
              {
                name: 'app.body.label.sort',
                children: [
                  { code: 'SORT_ASC', name: '升序', prefixIcon: 'fa fa-sort-alpha-desc' },
                  { code: 'SORT_DESC', name: '倒序', prefixIcon: 'fa fa-sort-alpha-desc' },
                  { code: 'CLEAR_SORT', name: '清除排序' }
                ]
              }
            ],
            [
              { code: 'PRINT_ALL', name: '打印', prefixIcon: 'fa fa-print', params: { columns: [{ field: 'name' }, { field: 'age' }, { field: 'rate' }] } },
              { code: 'EXPORT_ALL', name: '导出.csv', prefixIcon: 'fa fa-download', params: { columns: [{ field: 'name' }, { field: 'age' }, { field: 'rate' }], type: 'csv' } }
            ]
          ]
        },
        footer: {
          options: [
            [
              { code: 'EXPORT_ALL', name: '导出.xml', prefixIcon: 'fa fa-download', params: { columns: [{ field: 'name' }, { field: 'role' }, { field: 'sex' }], type: 'xml' } },
              { code: 'PRINT_ALL', name: '打印', prefixIcon: 'fa fa-print', params: { columns: [{ field: 'name' }, { field: 'role' }, { field: 'sex' }] } }
            ]
          ]
        }
      },
      demoCodes: [
        `
        <vxe-table
          border
          resizable
          highlight-hover-row
          show-footer
          :footer-method="footerMethod"
          :data="tableData"
          :menu-config="tableMenu"
          :mouse-config="{selected: true}"
          :keyboard-config="{isArrow: true, isDel: true, isEnter: true, isTab: true, isEdit: true}"
          :edit-config="{trigger: 'dblclick', mode: 'cell'}">
          <vxe-column type="seq" width="60"></vxe-column>
          <vxe-column field="name" title="Name" width="300" sortable :edit-render="{name: 'input'}"></vxe-column>
          <vxe-column field="role" title="Role" width="300" sortable :edit-render="{name: 'input'}"></vxe-column>
          <vxe-colgroup title="基本信息">
            <vxe-column field="sex" title="sex" width="180" :edit-render="{name: 'input'}"></vxe-column>
            <vxe-colgroup title="详细详细">
              <vxe-column field="age" title="Age" width="180" sortable :filters="[{ data: [] }]" :filter-render="{name: 'input'}" :edit-render="{name: 'input'}"></vxe-column>
            </vxe-colgroup>
          </vxe-colgroup>
          <vxe-column field="rate" title="Rate" width="180" sortable></vxe-column>
          <vxe-colgroup title="其他信息">
            <vxe-column field="date13" title="Date" width="250"></vxe-column>
          </vxe-colgroup>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'test abc' },
                { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'test abc' },
                { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc' }
              ],
              tableMenu: {
                header: {
                  options: [
                    [
                      { code: 'HIDDEN_COLUMN', name: '隐藏' },
                      { code: 'RESET_COLUMN', name: '取消隐藏' },
                      { code: 'FIXED_LEFT_COLUMN', name: '固定到左侧' },
                      { code: 'FIXED_RIGHT_COLUMN', name: '固定到右侧' },
                      { code: 'CLEAR_FIXED_COLUMN', name: '取消固定' },
                      { code: 'RESET_ALL', name: '重置个性化数据', prefixIcon: 'fa fa-undo' }
                    ],
                    [
                      { code: 'PRINT_ALL', name: '打印', prefixIcon: 'fa fa-print' },
                      { code: 'EXPORT_ALL', name: '导出.html', prefixIcon: 'fa fa-download', params: { type: 'html' } }
                    ]
                  ]
                },
                body: {
                  options: [
                    [
                      { code: 'INSERT_AT_ACTIVED_ROW', name: '插入' },
                      { code: 'DELETE_ROW', name: 'app.body.label.delete' },
                      { code: 'CLEAR_CELL', name: '清除内容' }
                    ],
                    [
                      {
                        name: 'app.body.label.filter',
                        prefixIcon: 'fa fa-filter',
                        children: [
                          { code: 'CLEAR_FILTER', name: '清除筛选' },
                          { code: 'CLEAR_ALL_FILTER', name: '重置所有筛选' },
                          { code: 'FILTER_CELL', name: '按所选单元格的值筛选' }
                        ]
                      },
                      {
                        name: 'app.body.label.sort',
                        children: [
                          { code: 'SORT_ASC', name: '升序', prefixIcon: 'fa fa-sort-alpha-desc' },
                          { code: 'SORT_DESC', name: '倒序', prefixIcon: 'fa fa-sort-alpha-desc' },
                          { code: 'CLEAR_SORT', name: '清除排序' }
                        ]
                      }
                    ],
                    [
                      { code: 'PRINT_ALL', name: '打印', prefixIcon: 'fa fa-print', params: { columns: [{ field: 'name' }, { field: 'age' }, { field: 'rate' }] } },
                      { code: 'EXPORT_ALL', name: '导出.csv', prefixIcon: 'fa fa-download', params: { columns: [{ field: 'name' }, { field: 'age' }, { field: 'rate' }], type: 'csv' } }
                    ]
                  ]
                },
                footer: {
                  options: [
                    [
                      { code: 'EXPORT_ALL', name: '导出.xml', prefixIcon: 'fa fa-download', params: { columns: [{ field: 'name' }, { field: 'role' }, { field: 'sex' }], type: 'xml' } },
                      { code: 'PRINT_ALL', name: '打印', prefixIcon: 'fa fa-print', params: { columns: [{ field: 'name' }, { field: 'role' }, { field: 'sex' }] } }
                    ]
                  ]
                }
              }
            }
          },
          methods: {
            sumNum (list, field) {
              let count = 0
              list.forEach(item => {
                count += Number(item[field])
              })
              return count
            },
            footerMethod ({ columns, data }) {
              return [
                columns.map((column, columnIndex) => {
                  if (columnIndex === 0) {
                    return '和值'
                  }
                  if (['age', 'rate'].includes(column.property)) {
                    return this.sumNum(data, column.property)
                  }
                  return null
                })
              ]
            }
          }
        }
        `
      ]
    }
  },
  methods: {
    sumNum (list, field) {
      let count = 0
      list.forEach(item => {
        count += Number(item[field])
      })
      return count
    },
    footerMethod ({ columns, data }) {
      return [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '和值'
          }
          if (['age', 'rate'].includes(column.property)) {
            return this.sumNum(data, column.property)
          }
          return null
        })
      ]
    }
  }
}
</script>
