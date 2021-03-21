<template>
  <div>
    <p class="tip">
      通过表尾来实现合计功能<br>
      <span class="red">（注：<table-api-link prop="footer-method"/> 表尾的数据都是自行生成的，该示例仅供参考）</span>
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
    const meanNum = (list: any[], field: string) => {
      let count = 0
      list.forEach(item => {
        count += Number(item[field])
      })
      return count / list.length
    }

    const sumNum = (list: any[], field: string) => {
      let count = 0
      list.forEach(item => {
        count += Number(item[field])
      })
      return count
    }

    const gridOptions = reactive({
      border: true,
      stripe: true,
      resizable: true,
      showFooter: true,
      height: 400,
      exportConfig: {},
      toolbarConfig: {
        export: true,
        zoom: true
      },
      columns: [
        { type: 'seq', width: 60 },
        { field: 'name', title: 'app.body.label.name' },
        { field: 'sex', title: 'app.body.label.sex' },
        { field: 'age', title: 'Age', sortable: true },
        { field: 'rate', title: 'Rate' }
      ],
      data: [
        { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, rate: 6, address: 'Shenzhen' },
        { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, rate: 5, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, rate: 4, address: 'Shanghai' },
        { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women ', age: 23, rate: 1, address: 'Shenzhen' },
        { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women ', age: 30, rate: 5, address: 'Shanghai' },
        { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women ', age: 21, rate: 2, address: 'Shenzhen' },
        { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man ', age: 29, rate: 7, address: 'Shenzhen' },
        { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man ', age: 35, rate: 5, address: 'Shenzhen' }
      ],
      footerMethod ({ columns, data }) {
        return [
          columns.map((column, columnIndex) => {
            if (columnIndex === 0) {
              return '和值'
            }
            if (['age', 'rate'].includes(column.property)) {
              return sumNum(data, column.property)
            }
            return ''
          }),
          columns.map((column, columnIndex) => {
            if (columnIndex === 0) {
              return '平均'
            }
            if (['age', 'rate'].includes(column.property)) {
              return meanNum(data, column.property)
            }
            return ''
          })
        ]
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
            const meanNum = (list: any[], field: string) => {
              let count = 0
              list.forEach(item => {
                count += Number(item[field])
              })
              return count / list.length
            }

            const sumNum = (list: any[], field: string) => {
              let count = 0
              list.forEach(item => {
                count += Number(item[field])
              })
              return count
            }

            const gridOptions = reactive({
              border: true,
              stripe: true,
              resizable: true,
              showFooter: true,
              height: 400,
              exportConfig: {},
              toolbarConfig: {
                export: true,
                zoom: true
              },
              columns: [
                { type: 'seq', width: 60 },
                { field: 'name', title: 'app.body.label.name' },
                { field: 'sex', title: 'app.body.label.sex' },
                { field: 'age', title: 'Age', sortable: true },
                { field: 'rate', title: 'Rate' }
              ],
              data: [
                { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, rate: 6, address: 'Shenzhen' },
                { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, rate: 5, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, rate: 4, address: 'Shanghai' },
                { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women ', age: 23, rate: 1, address: 'Shenzhen' },
                { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women ', age: 30, rate: 5, address: 'Shanghai' },
                { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women ', age: 21, rate: 2, address: 'Shenzhen' },
                { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man ', age: 29, rate: 7, address: 'Shenzhen' },
                { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man ', age: 35, rate: 5, address: 'Shenzhen' }
              ],
              footerMethod ({ columns, data }) {
                return [
                  columns.map((column, columnIndex) => {
                    if (columnIndex === 0) {
                      return '和值'
                    }
                    if (['age', 'rate'].includes(column.property)) {
                      return sumNum(data, column.property)
                    }
                    return ''
                  }),
                  columns.map((column, columnIndex) => {
                    if (columnIndex === 0) {
                      return '平均'
                    }
                    if (['age', 'rate'].includes(column.property)) {
                      return meanNum(data, column.property)
                    }
                    return ''
                  })
                ]
              }
            } as VxeGridProps)

            return {
              gridOptions
              ]
            }
          }
        })
        `
      ]
    }
  }
})
</script>
