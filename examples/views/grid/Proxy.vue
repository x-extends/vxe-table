<template>
  <div>
    <p class="tip">
      数据代理<a class="link" href="https://github.com/x-extends/vxe-table-demo/tree/master/vxe-table-by-grid">（项目示例）</a>：通过配置 <grid-api-link prop="proxy-config"/> 参数，默认直接读取结果，响应结果应该为数组；
      可以通过 <grid-api-link prop="props"/> 修改默认值，由 <grid-api-link prop="pager-config"/> 代理数据转换，只需要配置好数据源即可；非常简单就可以渲染一个表格，从重复写冗余的代码中解放出来<br>
      对接格式：接收一个 <a class="link" href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise">Promise</a>
    </p>

    <vxe-grid v-bind="gridOptions"></vxe-grid>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { VxeGridProps } from '../../../types/index'

export default defineComponent({
  setup () {
    const gridOptions = reactive({
      border: true,
      resizable: false,
      height: 400,
      columns: [
        { type: 'checkbox', width: 50 },
        { type: 'seq', width: 60 },
        { field: 'name', title: 'Name' },
        { field: 'nickname', title: 'Nickname' },
        { field: 'role', title: 'Role' },
        { field: 'address', title: 'Address', showOverflow: true }
      ],
      proxyConfig: {
        ajax: {
          // 接收 Promise
          query: () => {
            return new Promise(resolve => {
              setTimeout(() => {
                const list = [
                  { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
                  { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                  { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                  { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃' },
                  { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
                  { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women ', age: 21, address: 'Shenzhen' },
                  { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man ', age: 29, address: 'Shenzhen' },
                  { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man ', age: 35, address: 'vxe-table 从入门到放弃' },
                  { id: 10009, name: 'Test9', nickname: 'T9', role: 'Develop', sex: 'Man ', age: 35, address: 'Shenzhen' },
                  { id: 100010, name: 'Test10', nickname: 'T10', role: 'Develop', sex: 'Man ', age: 35, address: 'Guangzhou' }
                ]
                resolve(list)
              }, 100)
            })
          }
        }
      }
    } as VxeGridProps)

    return {
      gridOptions,
      demoCodes: [
        `
        <vxe-grid v-bind="gridOptions"></vxe-grid>
        `,
        `
        import { defineComponent, reactive } from 'vue'
        import { VxeGridProps } from 'vxe-table'

        export default defineComponent({
          setup () {
            const gridOptions = reactive({
              border: true,
              resizable: false,
              height: 400,
              columns: [
                { type: 'checkbox', width: 50 },
                { type: 'seq', width: 60 },
                { field: 'name', title: 'Name' },
                { field: 'nickname', title: 'Nickname' },
                { field: 'role', title: 'Role' },
                { field: 'address', title: 'Address', showOverflow: true }
              ],
              proxyConfig: {
                ajax: {
                  // 接收 Promise
                  query: () => {
                    return new Promise(resolve => {
                      setTimeout(() => {
                        const list = [
                          { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
                          { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                          { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                          { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃' },
                          { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
                          { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women ', age: 21, address: 'Shenzhen' },
                          { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man ', age: 29, address: 'Shenzhen' },
                          { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man ', age: 35, address: 'vxe-table 从入门到放弃' },
                          { id: 10009, name: 'Test9', nickname: 'T9', role: 'Develop', sex: 'Man ', age: 35, address: 'Shenzhen' },
                          { id: 100010, name: 'Test10', nickname: 'T10', role: 'Develop', sex: 'Man ', age: 35, address: 'Guangzhou' }
                        ]
                        resolve(list)
                      }, 100)
                    })
                  }
                }
              }
            } as VxeGridProps)

            return {
              gridOptions
            }
          }
        })
        `
      ]
    }
  }
})
</script>
