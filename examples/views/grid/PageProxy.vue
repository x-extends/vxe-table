<template>
  <div>
    <p class="tip">
      数据代理：通过配置 <grid-api-link prop="proxy-config"/> 启用数据代理将不需要再主动发送请求，由表格代理增删改查的相关调用逻辑，只需要配好对应的接口即可自动渲染<br>
      通过配置 <grid-api-link prop="pager-config"/> 参数开启分页功能，对于分页场景下，如果要实现分页动态序号，可以通过 <table-api-link prop="seq-config"/>={<table-api-link prop="startIndex"/>} 属性设置起始值<br>
      分页情况下则默认读取响应结果中 page.total 和 result 属性，可以通过 <grid-api-link prop="props"/> 修改<br>
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
      height: 530,
      rowId: 'id',
      checkboxConfig: {
        reserve: true
      },
      pagerConfig: {
        pageSize: 10
      },
      columns: [
        { type: 'checkbox', width: 50 },
        { type: 'seq', width: 60 },
        { field: 'name', title: 'Name' },
        { field: 'nickname', title: 'Nickname' },
        { field: 'role', title: 'Role' },
        { field: 'address', title: 'Address', showOverflow: true }
      ],
      proxyConfig: {
        seq: true, // 启用动态序号代理（分页之后索引自动计算为当前页的起始序号）
        props: {
          result: 'result',
          total: 'page.total'
        },
        ajax: {
          // 接收 Promise
          query: ({ page }) => {
            return new Promise(resolve => {
              setTimeout(() => {
                const list = [
                  { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
                  { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                  { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                  { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
                  { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
                  { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women ', age: 21, address: 'Shenzhen' },
                  { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man ', age: 29, address: 'vxe-table 从入门到放弃' },
                  { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man ', age: 35, address: 'Shenzhen' },
                  { id: 10009, name: 'Test9', nickname: 'T9', role: 'Develop', sex: 'Man ', age: 35, address: 'Shenzhen' },
                  { id: 100010, name: 'Test10', nickname: 'T10', role: 'Develop', sex: 'Man ', age: 35, address: 'Guangzhou' },
                  { id: 100011, name: 'Test11', nickname: 'T11', role: 'Test', sex: 'Women ', age: 26, address: 'vxe-table 从入门到放弃' },
                  { id: 100012, name: 'Test12', nickname: 'T12', role: 'Develop', sex: 'Man ', age: 34, address: 'Guangzhou' },
                  { id: 100013, name: 'Test13', nickname: 'T13', role: 'Test', sex: 'Women ', age: 22, address: 'Shenzhen' }
                ]
                resolve({
                  page: {
                    total: list.length
                  },
                  result: list.slice((page.currentPage - 1) * page.pageSize, page.currentPage * page.pageSize)
                })
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
              height: 530,
              rowId: 'id',
              checkboxConfig: {
                reserve: true
              },
              pagerConfig: {
                pageSize: 10
              },
              columns: [
                { type: 'checkbox', width: 50 },
                { type: 'seq', width: 60 },
                { field: 'name', title: 'Name' },
                { field: 'nickname', title: 'Nickname' },
                { field: 'role', title: 'Role' },
                { field: 'address', title: 'Address', showOverflow: true }
              ],
              proxyConfig: {
                seq: true, // 启用动态序号代理（分页之后索引自动计算为当前页的起始序号）
                props: {
                  result: 'result',
                  total: 'page.total'
                },
                ajax: {
                  // 接收 Promise
                  query: ({ page }) => {
                    return new Promise(resolve => {
                      setTimeout(() => {
                        const list = [
                          { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
                          { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                          { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                          { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
                          { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
                          { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women ', age: 21, address: 'Shenzhen' },
                          { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man ', age: 29, address: 'vxe-table 从入门到放弃' },
                          { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man ', age: 35, address: 'Shenzhen' },
                          { id: 10009, name: 'Test9', nickname: 'T9', role: 'Develop', sex: 'Man ', age: 35, address: 'Shenzhen' },
                          { id: 100010, name: 'Test10', nickname: 'T10', role: 'Develop', sex: 'Man ', age: 35, address: 'Guangzhou' },
                          { id: 100011, name: 'Test11', nickname: 'T11', role: 'Test', sex: 'Women ', age: 26, address: 'vxe-table 从入门到放弃' },
                          { id: 100012, name: 'Test12', nickname: 'T12', role: 'Develop', sex: 'Man ', age: 34, address: 'Guangzhou' },
                          { id: 100013, name: 'Test13', nickname: 'T13', role: 'Test', sex: 'Women ', age: 22, address: 'Shenzhen' }
                        ]
                        resolve({
                          page: {
                            total: list.length
                          },
                          result: list.slice((page.currentPage - 1) * page.pageSize, page.currentPage * page.pageSize)
                        })
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
