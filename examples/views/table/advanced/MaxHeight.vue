<template>
  <div>
    <p class="tip">最大高度，通过设置 <table-api-link prop="max-height"/> 启用，当数据少时自适应</p>

    <vxe-table
      border
      resizable
      show-footer
      show-overflow
      max-height="400"
      :loading="demo1.loading"
      :data="demo1.tableData"
      :footer-method="footerMethod">
      <vxe-column type="checkbox" width="60"></vxe-column>
      <vxe-column type="seq" width="100"></vxe-column>
      <vxe-column field="name" title="Name" sortable width="200"></vxe-column>
      <vxe-column field="age" title="Age" width="120"></vxe-column>
      <vxe-column field="rate" title="Rate" width="120"></vxe-column>
      <vxe-column field="region" title="Region" width="200"></vxe-column>
      <vxe-column field="address" title="Address" width="300" show-overflow></vxe-column>
      <vxe-column field="updateTime" title="UpdateTime" width="200"></vxe-column>
      <vxe-column field="createTime" title="CreateTime" width="200"></vxe-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
    </pre>

    <p class="tip">当数据超过最大高度时自动显示滚动条</p>

    <vxe-table
      border
      resizable
      show-footer
      show-overflow
      max-height="400"
      :loading="demo2.loading"
      :data="demo2.tableData"
      :footer-method="footerMethod">
      <vxe-column type="checkbox" width="60"></vxe-column>
      <vxe-column type="seq" width="100"></vxe-column>
      <vxe-column field="name" title="Name" sortable width="200"></vxe-column>
      <vxe-column field="age" title="Age" width="120"></vxe-column>
      <vxe-column field="rate" title="Rate" width="120"></vxe-column>
      <vxe-column field="time" title="Time" width="200"></vxe-column>
      <vxe-column field="updateTime" title="UpdateTime" width="200"></vxe-column>
      <vxe-column field="createTime" title="CreateTime" width="200"></vxe-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[2] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[3] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { VxeTablePropTypes } from '../../../../types/index'

export default defineComponent({
  setup () {
    const demo1 = reactive({
      loading: false,
      tableData: [] as any[]
    })

    demo1.loading = true
    setTimeout(() => {
      demo1.tableData = [
        { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, amount: 888, address: 'vxe-table 从入门到放弃' },
        { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, amount: 666, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: '1', age: 32, amount: 89, address: 'Shanghai' }
      ]
      demo1.loading = false
    }, 500)

    const demo2 = reactive({
      loading: false,
      tableData: [] as any[]
    })

    demo2.loading = true
    setTimeout(() => {
      demo2.tableData = [
        { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, amount: 888, address: 'vxe-table 从入门到放弃' },
        { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, amount: 666, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: '1', age: 32, amount: 89, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: '0', age: 23, amount: 1000, address: 'vxe-table 从入门到放弃' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: '0', age: 30, amount: 999, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: '0', age: 21, amount: 998, address: 'vxe-table 从入门到放弃' },
        { id: 10007, name: 'Test7', role: 'Test', sex: '1', age: 29, amount: 2000, address: 'vxe-table 从入门到放弃' },
        { id: 10008, name: 'Test8', role: 'Develop', sex: '1', age: 35, amount: 999, address: 'vxe-table 从入门到放弃' },
        { id: 10009, name: 'Test9', role: 'Test', sex: '1', age: 26, amount: 2000, address: 'vxe-table 从入门到放弃' },
        { id: 100010, name: 'Test10', role: 'Develop', sex: '1', age: 21, amount: 666, address: 'vxe-table 从入门到放弃' }
      ]
      demo2.loading = false
    }, 500)

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

    const footerMethod: VxeTablePropTypes.FooterMethod = ({ columns, data }) => {
      const footerData = [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '平均'
          }
          if (['age', 'rate'].includes(column.property)) {
            return meanNum(data, column.property).toFixed(2)
          }
          return null
        }),
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '和值'
          }
          if (['age', 'rate'].includes(column.property)) {
            return sumNum(data, column.property)
          }
          return null
        })
      ]
      return footerData
    }

    return {
      demo1,
      demo2,
      footerMethod,
      demoCodes: [
        `
        <vxe-table
          border
          resizable
          show-footer
          show-overflow
          max-height="400"
          :loading="demo1.loading"
          :data="demo1.tableData"
          :footer-method="footerMethod">
          <vxe-column type="checkbox" width="60"></vxe-column>
          <vxe-column type="seq" width="100"></vxe-column>
          <vxe-column field="name" title="Name" sortable width="200"></vxe-column>
          <vxe-column field="age" title="Age" width="120"></vxe-column>
          <vxe-column field="rate" title="Rate" width="120"></vxe-column>
          <vxe-column field="region" title="Region" width="200"></vxe-column>
          <vxe-column field="address" title="Address" width="300" show-overflow></vxe-column>
          <vxe-column field="updateTime" title="UpdateTime" width="200"></vxe-column>
          <vxe-column field="createTime" title="CreateTime" width="200"></vxe-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive } from 'vue'
        import { VxeTablePropTypes } from 'vxe-table'

        export default defineComponent({
          setup () {
            const demo1 = reactive({
              loading: false,
              tableData: [] as any[]
            })

            demo1.loading = true
            setTimeout(() => {
              demo1.tableData = [
                { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, amount: 888, address: 'vxe-table 从入门到放弃' },
                { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, amount: 666, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: '1', age: 32, amount: 89, address: 'Shanghai' }
              ]
              demo1.loading = false
            }, 500)

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

            const footerMethod: VxeTablePropTypes.FooterMethod = ({ columns, data }) => {
              const footerData = [
                columns.map((column, columnIndex) => {
                  if (columnIndex === 0) {
                    return '平均'
                  }
                  if (['age', 'rate'].includes(column.property)) {
                    return meanNum(data, column.property).toFixed(2)
                  }
                  return null
                }),
                columns.map((column, columnIndex) => {
                  if (columnIndex === 0) {
                    return '和值'
                  }
                  if (['age', 'rate'].includes(column.property)) {
                    return sumNum(data, column.property)
                  }
                  return null
                })
              ]
              return footerData
            }

            return {
              demo1,
              footerMethod
            }
          }
        })
        `,
        `
        <vxe-table
          border
          resizable
          show-footer
          show-overflow
          max-height="400"
          :loading="demo2.loading"
          :data="demo2.tableData"
          :footer-method="footerMethod">
          <vxe-column type="checkbox" width="60"></vxe-column>
          <vxe-column type="seq" width="100"></vxe-column>
          <vxe-column field="name" title="Name" sortable width="200"></vxe-column>
          <vxe-column field="age" title="Age" width="120"></vxe-column>
          <vxe-column field="rate" title="Rate" width="120"></vxe-column>
          <vxe-column field="time" title="Time" width="200"></vxe-column>
          <vxe-column field="updateTime" title="UpdateTime" width="200"></vxe-column>
          <vxe-column field="createTime" title="CreateTime" width="200"></vxe-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive } from 'vue'
        import { VxeTablePropTypes } from 'vxe-table'

        export default defineComponent({
          setup () {
            const demo2 = reactive({
              loading: false,
              tableData: [] as any[]
            })

            demo2.loading = true
            setTimeout(() => {
              demo2.tableData = [
                { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, amount: 888, address: 'vxe-table 从入门到放弃' },
                { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, amount: 666, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: '1', age: 32, amount: 89, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: '0', age: 23, amount: 1000, address: 'vxe-table 从入门到放弃' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: '0', age: 30, amount: 999, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: '0', age: 21, amount: 998, address: 'vxe-table 从入门到放弃' },
                { id: 10007, name: 'Test7', role: 'Test', sex: '1', age: 29, amount: 2000, address: 'vxe-table 从入门到放弃' },
                { id: 10008, name: 'Test8', role: 'Develop', sex: '1', age: 35, amount: 999, address: 'vxe-table 从入门到放弃' },
                { id: 10009, name: 'Test9', role: 'Test', sex: '1', age: 26, amount: 2000, address: 'vxe-table 从入门到放弃' },
                { id: 100010, name: 'Test10', role: 'Develop', sex: '1', age: 21, amount: 666, address: 'vxe-table 从入门到放弃' }
              ]
              demo2.loading = false
            }, 500)

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

            const footerMethod: VxeTablePropTypes.FooterMethod = ({ columns, data }) => {
              const footerData = [
                columns.map((column, columnIndex) => {
                  if (columnIndex === 0) {
                    return '平均'
                  }
                  if (['age', 'rate'].includes(column.property)) {
                    return meanNum(data, column.property).toFixed(2)
                  }
                  return null
                }),
                columns.map((column, columnIndex) => {
                  if (columnIndex === 0) {
                    return '和值'
                  }
                  if (['age', 'rate'].includes(column.property)) {
                    return sumNum(data, column.property)
                  }
                  return null
                })
              ]
              return footerData
            }

            return {
              demo2,
              footerMethod
            }
          }
        })
        `
      ]
    }
  }
})
</script>
