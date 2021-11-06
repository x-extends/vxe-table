<template>
  <div>
    <p class="tip">
      通过 <grid-api-link prop="toolbar-config"/> 属性配置 <grid-api-link prop="zoom"/> 开启全屏缩放按钮或者直接调用相关方法，按 Esc 可退出全屏<br>
      还可以手动调用 <grid-api-link prop="maximize"/> 方法最大化表格、<grid-api-link prop="revert"/> 方法还原表格
    </p>

    <vxe-grid
      border
      resizable
      keep-source
      show-overflow
      show-footer
      ref="xGrid"
      height="530"
      :pager-config="tablePage"
      :proxy-config="tableProxy"
      :columns="tableColumn"
      :toolbar-config="tableToolbar"
      :footer-method="footerMethod">
      <template #toolbar_buttons>
        <vxe-button @click="$refs.xGrid.maximize()">表格最大化</vxe-button>
        <vxe-button @click="$refs.xGrid.revert()">表格还原</vxe-button>
        <vxe-button @click="$refs.xGrid.zoom()">切换表格最大化/还原</vxe-button>
      </template>
    </vxe-grid>

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
      tablePage: {
        pageSize: 20,
        perfect: true
      },
      tableProxy: {
        props: {
          result: 'result', // 配置响应结果列表字段
          total: 'page.total' // 配置响应结果总页数字段
        },
        ajax: {
          query: () => {
            return new Promise(resolve => {
              setTimeout(() => {
                const list = [
                  { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: '0', sex2: ['0'], num1: 40, age: 28, address: 'Shenzhen', date12: '', date13: '' },
                  { id: 10002, name: 'Test2', nickname: 'T2', role: 'Designer', sex: '1', sex2: ['0', '1'], num1: 44, age: 22, address: 'Guangzhou', date12: '', date13: '2020-08-20' },
                  { id: 10003, name: 'Test3', nickname: 'T3', role: 'Test', sex: '0', sex2: ['1'], num1: 200, age: 32, address: 'test abc', date12: '2020-09-10', date13: '' },
                  { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: '1', sex2: ['1'], num1: 30, age: 23, address: 'Shenzhen', date12: '', date13: '2020-12-04' },
                  { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: '0', sex2: ['1', '0'], num1: 20, age: 30, address: 'Shanghai', date12: '2020-09-20', date13: '' },
                  { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: '1', sex2: ['0'], num1: 10, age: 21, address: 'Shenzhen', date12: '', date13: '' },
                  { id: 10007, name: 'Test7', nickname: 'T7', role: 'Develop', sex: '0', sex2: ['0'], num1: 5, age: 29, address: 'test abc', date12: '2020-01-02', date13: '2020-09-20' },
                  { id: 10008, name: 'Test8', nickname: 'T8', role: 'PM', sex: '1', sex2: ['0'], num1: 2, age: 35, address: 'Shenzhen', date12: '', date13: '' }
                ]
                resolve({
                  result: list,
                  page: {
                    total: 120
                  }
                })
              }, 500)
            })
          }
        }
      },
      tableToolbar: {
        perfect: true,
        refresh: true,
        zoom: true,
        custom: true,
        slots: {
          buttons: 'toolbar_buttons'
        }
      },
      tableColumn: [
        { type: 'checkbox', width: 100 },
        { type: 'seq', width: 100 },
        { field: 'name', title: 'Name', minWidth: 300 },
        { field: 'nickname', title: 'Nickname', minWidth: 300 },
        { field: 'role', title: 'Role', minWidth: 300 },
        { field: 'rate', title: 'Rate', minWidth: 300 },
        { field: 'describe', title: 'Describe', minWidth: 300 },
        { field: 'createTime', title: 'Update Date', minWidth: 300 },
        { field: 'updateTime', title: 'Create Date', minWidth: 300 }
      ],
      demoCodes: [
        `
        <vxe-grid
          border
          resizable
          keep-source
          show-overflow
          show-footer
          ref="xGrid"
          height="530"
          :pager-config="tablePage"
          :proxy-config="tableProxy"
          :columns="tableColumn"
          :toolbar-config="tableToolbar"
          :footer-method="footerMethod">
          <template #toolbar_buttons>
            <vxe-button @click="$refs.xGrid.maximize()">表格最大化</vxe-button>
            <vxe-button @click="$refs.xGrid.revert()">表格还原</vxe-button>
            <vxe-button @click="$refs.xGrid.zoom()">切换表格最大化/还原</vxe-button>
          </template>
        </vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              tablePage: {
                pageSize: 20,
                perfect: true
              },
              tableProxy: {
                props: {
                  result: 'result', // 配置响应结果列表字段
                  total: 'page.total' // 配置响应结果总页数字段
                },
                ajax: {
                  query: () => {
                    return new Promise(resolve => {
                      const list = [
                        { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: '0', sex2: ['0'], num1: 40, age: 28, address: 'Shenzhen', date12: '', date13: '' },
                        { id: 10002, name: 'Test2', nickname: 'T2', role: 'Designer', sex: '1', sex2: ['0', '1'], num1: 44, age: 22, address: 'Guangzhou', date12: '', date13: '2020-08-20' },
                        { id: 10003, name: 'Test3', nickname: 'T3', role: 'Test', sex: '0', sex2: ['1'], num1: 200, age: 32, address: 'test abc', date12: '2020-09-10', date13: '' },
                        { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: '1', sex2: ['1'], num1: 30, age: 23, address: 'Shenzhen', date12: '', date13: '2020-12-04' },
                        { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: '0', sex2: ['1', '0'], num1: 20, age: 30, address: 'Shanghai', date12: '2020-09-20', date13: '' },
                        { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: '1', sex2: ['0'], num1: 10, age: 21, address: 'Shenzhen', date12: '', date13: '' },
                        { id: 10007, name: 'Test7', nickname: 'T7', role: 'Develop', sex: '0', sex2: ['0'], num1: 5, age: 29, address: 'test abc', date12: '2020-01-02', date13: '2020-09-20' },
                        { id: 10008, name: 'Test8', nickname: 'T8', role: 'PM', sex: '1', sex2: ['0'], num1: 2, age: 35, address: 'Shenzhen', date12: '', date13: '' }
                      ]
                      resolve({
                        result: list,
                        page: {
                          total: 120
                        }
                      })
                    })
                  }
                }
              },
              tableToolbar: {
                perfect: true,
                refresh: true,
                zoom: true,
                custom: true,
                slots: {
                  buttons: 'toolbar_buttons'
                }
              },
              tableColumn: [
                { type: 'checkbox', width: 100 },
                { type: 'seq', width: 100 },
                { field: 'name', title: 'Name', minWidth: 300 },
                { field: 'nickname', title: 'Nickname', minWidth: 300 },
                { field: 'role', title: 'Role', minWidth: 300 },
                { field: 'rate', title: 'Rate', minWidth: 300 },
                { field: 'describe', title: 'Describe', minWidth: 300 },
                { field: 'createTime', title: 'Update Date', minWidth: 300 },
                { field: 'updateTime', title: 'Create Date', minWidth: 300 }
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
              const sums = []
              columns.forEach((column, columnIndex) => {
                if (columnIndex === 0) {
                  sums.push('和值')
                } else {
                  if (column.property === 'rate') {
                    sums.push(this.sumNum(data, column.property))
                  } else {
                    sums.push('-')
                  }
                }
              })
              // 返回一个二维数组的表尾合计
              return [sums]
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
      const sums = []
      columns.forEach((column, columnIndex) => {
        if (columnIndex === 0) {
          sums.push('和值')
        } else {
          if (column.property === 'rate') {
            sums.push(this.sumNum(data, column.property))
          } else {
            sums.push('-')
          }
        }
      })
      // 返回一个二维数组的表尾合计
      return [sums]
    }
  }
}
</script>
