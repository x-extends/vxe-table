<template>
  <div>
    <p class="tip">
      通过 <grid-api-link prop="toolbar"/> 属性配置 <grid-api-link prop="zoom"/> 开启全屏缩放按钮或者直接调用相关方法，按 Esc 可退出全屏<br>
      还可以手动调用 <grid-api-link prop="maximize"/> 方法最大化表格、<grid-api-link prop="revert"/> 方法还原表格
    </p>

    <vxe-grid ref="xGrid" v-bind="gridOptions">
      <template #toolbar_buttons>
        <vxe-button @click="maximizeEvent">表格最大化</vxe-button>
        <vxe-button @click="revertEvent">表格还原</vxe-button>
        <vxe-button @click="zoomEvent">切换表格最大化/还原</vxe-button>
      </template>
    </vxe-grid>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { VxeGridInstance, VxeGridProps } from '../../../types/index'
import XEUtils from 'xe-utils'

export default defineComponent({
  setup () {
    const xGrid = ref({} as VxeGridInstance)

    const findList = (): Promise<any> => {
      return new Promise(resolve => {
        setTimeout(() => {
          const list = [
            { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
            { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
            { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
            { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
            { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
            { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women ', age: 21, address: 'Shenzhen' },
            { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man ', age: 29, address: 'Shenzhen' },
            { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man ', age: 35, address: 'Shenzhen' }
          ]
          const rest = {
            page: {
              total: 200
            },
            result: list
          }
          resolve(rest)
        }, 500)
      })
    }

    const maximizeEvent = () => {
      const $grid = xGrid.value
      $grid.maximize()
    }

    const revertEvent = () => {
      const $grid = xGrid.value
      $grid.revert()
    }

    const zoomEvent = () => {
      const $grid = xGrid.value
      $grid.zoom()
    }

    const gridOptions = reactive({
      border: true,
      resizable: true,
      showOverflow: true,
      showFooter: true,
      height: 530,
      pagerConfig: {
        pageSize: 20,
        perfect: true
      },
      toolbarConfig: {
        perfect: true,
        refresh: true,
        zoom: true,
        custom: true,
        slots: {
          // 自定义插槽模板
          buttons: 'toolbar_buttons'
        }
      },
      proxyConfig: {
        props: {
          result: 'result', // 配置响应结果列表字段
          total: 'page.total' // 配置响应结果总页数字段
        },
        ajax: {
          query: () => findList()
        }
      },
      columns: [
        { type: 'seq', width: 60 },
        { type: 'checkbox', width: 100 },
        { field: 'name', title: 'Name' },
        { field: 'age', title: 'Age' },
        { field: 'role', title: 'Role' },
        { field: 'address', title: 'Address' }
      ],
      footerMethod ({ columns, data }) {
        const sums: any[] = []
        columns.forEach((column, columnIndex) => {
          if (columnIndex === 0) {
            sums.push('平均')
          } else {
            if (column.property === 'age') {
              sums.push(XEUtils.mean(data, 'age'))
            } else {
              sums.push('-')
            }
          }
        })
        // 返回一个二维数组的表尾合计
        return [sums]
      }
    } as VxeGridProps)

    return {
      xGrid,
      gridOptions,
      maximizeEvent,
      revertEvent,
      zoomEvent,
      demoCodes: [
        `
        <vxe-grid ref="xGrid" v-bind="gridOptions">
          <template #toolbar_buttons>
            <vxe-button @click="maximizeEvent">表格最大化</vxe-button>
            <vxe-button @click="revertEvent">表格还原</vxe-button>
            <vxe-button @click="zoomEvent">切换表格最大化/还原</vxe-button>
          </template>
        </vxe-grid>
        `,
        `
        import { defineComponent, reactive, ref } from 'vue'
        import { VxeGridInstance, VxeGridProps } from 'vxe-table'
        import XEUtils from 'xe-utils'

        export default defineComponent({
          setup () {
            const xGrid = ref({} as VxeGridInstance)

            const findList = () => {
              return new Promise(resolve => {
                setTimeout(() => {
                  const list = [
                    { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
                    { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                    { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                    { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
                    { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
                    { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women ', age: 21, address: 'Shenzhen' },
                    { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man ', age: 29, address: 'Shenzhen' },
                    { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man ', age: 35, address: 'Shenzhen' }
                  ]
                  const rest = {
                    page: {
                      total: 200
                    },
                    result: list
                  }
                  resolve(rest)
                }, 500)
              })
            }

            const maximizeEvent = () => {
              const $grid = xGrid.value
              $grid.maximize()
            }

            const revertEvent = () => {
              const $grid = xGrid.value
              $grid.revert()
            }

            const zoomEvent = () => {
              const $grid = xGrid.value
              $grid.zoom()
            }

            const gridOptions = reactive({
              border: true,
              resizable: true,
              showOverflow: true,
              showFooter: true,
              height: 530,
              pagerConfig: {
                pageSize: 20,
                perfect: true
              },
              toolbarConfig: {
                perfect: true,
                refresh: true,
                zoom: true,
                custom: true,
                slots: {
                  // 自定义插槽模板
                  buttons: 'toolbar_buttons'
                }
              },
              proxyConfig: {
                props: {
                  result: 'result', // 配置响应结果列表字段
                  total: 'page.total' // 配置响应结果总页数字段
                },
                ajax: {
                  query: () => findList()
                }
              },
              columns: [
                { type: 'seq', width: 60 },
                { type: 'checkbox', width: 100 },
                { field: 'name', title: 'Name' },
                { field: 'age', title: 'Age' },
                { field: 'role', title: 'Role' },
                { field: 'address', title: 'Address' }
              ],
              footerMethod ({ columns, data }) {
                const sums: any[] = []
                columns.forEach((column, columnIndex) => {
                  if (columnIndex === 0) {
                    sums.push('平均')
                  } else {
                    if (column.property === 'age') {
                      sums.push(XEUtils.mean(data, 'age'))
                    } else {
                      sums.push('-')
                    }
                  }
                })
                // 返回一个二维数组的表尾合计
                return [sums]
              }
            } as VxeGridProps)

            return {
              xGrid,
              gridOptions,
              maximizeEvent,
              revertEvent,
              zoomEvent
            }
          }
        }
        `
      ]
    }
  }
})
</script>
