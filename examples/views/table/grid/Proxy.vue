<template>
  <div>
    <p class="tip">
      数据代理<a class="link" href="https://github.com/x-extends/vxe-table-demo/tree/master/vxe-table-by-grid">（项目示例）</a>：通过配置 <grid-api-link prop="proxy-config"/> 参数，默认直接读取结果，响应结果应该为数组；
      可以通过 <grid-api-link prop="props"/> 修改默认值，由 <grid-api-link prop="pager-config"/> 代理数据转换，只需要配置好数据源即可；非常简单就可以渲染一个表格，从重复写冗余的代码中解放出来<br>
      对接格式：使用 <a class="link" href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise">Promise API</a> ，任何支持 <a class="link" href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise">Promise</a> 的库都可以直接使用
    </p>

    <vxe-grid v-bind="gridOptions"></vxe-grid>

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
      gridOptions: {
        border: true,
        resizable: true,
        height: 400,
        proxyConfig: {
          ajax: {
            // 接收 Proise
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
                  resolve(list)
                }, 500)
              })
            }
          }
        },
        columns: [
          { type: 'checkbox', width: 50 },
          { type: 'seq', width: 60 },
          { field: 'name', title: 'Name' },
          { field: 'nickname', title: 'Nickname' },
          { field: 'role', title: 'Role' },
          { field: 'address', title: 'Address', showOverflow: true }
        ]
      },
      demoCodes: [
        `
        <vxe-grid v-bind="gridOptions"></vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              gridOptions: {
                border: true,
                resizable: true,
                height: 400,
                proxyConfig: {
                  ajax: {
                    // 接收 Proise
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
                          resolve(list)
                        }, 500)
                      })
                    }
                  }
                },
                columns: [
                  { type: 'checkbox', width: 50 },
                  { type: 'seq', width: 60 },
                  { field: 'name', title: 'Name' },
                  { field: 'nickname', title: 'Nickname' },
                  { field: 'role', title: 'Role' },
                  { field: 'address', title: 'Address', showOverflow: true }
                ]
              }
            }
          }
        }
        `
      ]
    }
  }
}
</script>
