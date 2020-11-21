<template>
  <div>
    <p class="tip">最大高度，通过设置 <table-api-link prop="max-height"/> 启用，当数据少时自适应</p>

    <vxe-table
      border
      resizable
      show-footer
      show-overflow
      max-height="400"
      :loading="loading"
      :data="tableData1"
      :footer-method="footerMethod">
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column type="seq" width="100"></vxe-table-column>
      <vxe-table-column field="name" title="Name" sortable width="200"></vxe-table-column>
      <vxe-table-column field="age" title="Age" width="120"></vxe-table-column>
      <vxe-table-column field="rate" title="Rate" width="120"></vxe-table-column>
      <vxe-table-column field="region" title="Region" width="200"></vxe-table-column>
      <vxe-table-column field="address" title="Address" width="300" show-overflow></vxe-table-column>
      <vxe-table-column field="updateTime" title="UpdateTime" width="200"></vxe-table-column>
      <vxe-table-column field="createTime" title="CreateTime" width="200"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>

    <p class="tip">当数据超过最大高度时自动显示滚动条</p>

    <vxe-table
      border
      resizable
      show-footer
      show-overflow
      max-height="400"
      :loading="loading"
      :data="tableData2"
      :footer-method="footerMethod">
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column type="seq" width="100"></vxe-table-column>
      <vxe-table-column field="name" title="Name" sortable width="200"></vxe-table-column>
      <vxe-table-column field="age" title="Age" width="120"></vxe-table-column>
      <vxe-table-column field="rate" title="Rate" width="120"></vxe-table-column>
      <vxe-table-column field="time" title="Time" width="200"></vxe-table-column>
      <vxe-table-column field="updateTime" title="UpdateTime" width="200"></vxe-table-column>
      <vxe-table-column field="createTime" title="CreateTime" width="200"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[2] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[3] }}</pre-code>
    </pre>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'

export default {
  data () {
    return {
      loading: false,
      tableData1: [],
      tableData2: [],
      demoCodes: [
        `
        <vxe-table
          border
          resizable
          show-footer
          show-overflow
          max-height="400"
          :loading="loading"
          :data="tableData"
          :footer-method="footerMethod">
          <vxe-table-column type="checkbox" width="60"></vxe-table-column>
          <vxe-table-column type="seq" width="100"></vxe-table-column>
          <vxe-table-column field="name" title="Name" sortable width="200"></vxe-table-column>
          <vxe-table-column field="age" title="Age" width="120"></vxe-table-column>
          <vxe-table-column field="rate" title="Rate" width="120"></vxe-table-column>
          <vxe-table-column field="region" title="Region" width="200"></vxe-table-column>
          <vxe-table-column field="address" title="Address" width="300" show-overflow></vxe-table-column>
          <vxe-table-column field="updateTime" title="UpdateTime" width="200"></vxe-table-column>
          <vxe-table-column field="createTime" title="CreateTime" width="200"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              loading: false,
              tableData: []
            }
          },
          created () {
            this.loading = true
            setTimeout(() => {
              this.tableData = [
                { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, amount: 888, address: 'vxe-table 从入门到放弃' },
                { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, amount: 666, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: '1', age: 32, amount: 89, address: 'Shanghai' }
              ]
              this.loading = false
            }, 300)
          },
          methods: {
            footerMethod ({ columns, data }) {
              const footerData = [
                columns.map((column, columnIndex) => {
                  if (columnIndex === 0) {
                    return '平均'
                  }
                  if (['age', 'rate'].includes(column.property)) {
                    return XEUtils.mean(data, column.property).toFixed(2)
                  }
                  return null
                }),
                columns.map((column, columnIndex) => {
                  if (columnIndex === 0) {
                    return '和值'
                  }
                  if (['age', 'rate'].includes(column.property)) {
                    return XEUtils.sum(data, column.property)
                  }
                  return null
                })
              ]
              return footerData
            }
          }
        }
        `,
        `
        <vxe-table
          border
          resizable
          show-footer
          show-overflow
          max-height="400"
          :loading="loading"
          :data="tableData"
          :footer-method="footerMethod">
          <vxe-table-column type="checkbox" width="60"></vxe-table-column>
          <vxe-table-column type="seq" width="100"></vxe-table-column>
          <vxe-table-column field="name" title="Name" sortable width="200"></vxe-table-column>
          <vxe-table-column field="age" title="Age" width="120"></vxe-table-column>
          <vxe-table-column field="rate" title="Rate" width="120"></vxe-table-column>
          <vxe-table-column field="time" title="Time" width="200"></vxe-table-column>
          <vxe-table-column field="updateTime" title="UpdateTime" width="200"></vxe-table-column>
          <vxe-table-column field="createTime" title="CreateTime" width="200"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              loading: false,
              tableData: []
            }
          },
          created () {
            this.loading = true
            setTimeout(() => {
              this.tableData = [
                { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, amount: 888, address: 'vxe-table 从入门到放弃' },
                { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, amount: 666, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: '1', age: 32, amount: 89, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: '0', age: 23, amount: 1000, address: 'vxe-table 从入门到放弃' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: '0', age: 30, amount: 999, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: '0', age: 21, amount: 998, address: 'vxe-table 从入门到放弃' },
                { id: 10007, name: 'Test7', role: 'Test', sex: '1', age: 29, amount: 2000, address: 'vxe-table 从入门到放弃' },
                { id: 10008, name: 'Test8', role: 'Develop', sex: '1 ', age: 35, amount: 999, address: 'vxe-table 从入门到放弃' },
                { id: 10009, name: 'Test9', role: 'Test', sex: '1', age: 26, amount: 2000, address: 'vxe-table 从入门到放弃' },
                { id: 100010, name: 'Test10', role: 'Develop', sex: '1 ', age: 21, amount: 666, address: 'vxe-table 从入门到放弃' }
              ]
              this.loading = false
            }, 300)
          },
          methods: {
            footerMethod ({ columns, data }) {
              const footerData = [
                columns.map((column, columnIndex) => {
                  if (columnIndex === 0) {
                    return '平均'
                  }
                  if (['age', 'rate'].includes(column.property)) {
                    return XEUtils.mean(data, column.property).toFixed(2)
                  }
                  return null
                }),
                columns.map((column, columnIndex) => {
                  if (columnIndex === 0) {
                    return '和值'
                  }
                  if (['age', 'rate'].includes(column.property)) {
                    return XEUtils.sum(data, column.property)
                  }
                  return null
                })
              ]
              return footerData
            }
          }
        }
        `
      ]
    }
  },
  created () {
    this.loading = true
    setTimeout(() => {
      this.tableData1 = [
        { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, amount: 888, address: 'vxe-table 从入门到放弃' },
        { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, amount: 666, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: '1', age: 32, amount: 89, address: 'Shanghai' }
      ]
      this.tableData2 = [
        { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, amount: 888, address: 'vxe-table 从入门到放弃' },
        { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, amount: 666, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: '1', age: 32, amount: 89, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: '0', age: 23, amount: 1000, address: 'vxe-table 从入门到放弃' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: '0', age: 30, amount: 999, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: '0', age: 21, amount: 998, address: 'vxe-table 从入门到放弃' },
        { id: 10007, name: 'Test7', role: 'Test', sex: '1', age: 29, amount: 2000, address: 'vxe-table 从入门到放弃' },
        { id: 10008, name: 'Test8', role: 'Develop', sex: '1 ', age: 35, amount: 999, address: 'vxe-table 从入门到放弃' },
        { id: 10009, name: 'Test9', role: 'Test', sex: '1', age: 26, amount: 2000, address: 'vxe-table 从入门到放弃' },
        { id: 100010, name: 'Test10', role: 'Develop', sex: '1 ', age: 21, amount: 666, address: 'vxe-table 从入门到放弃' }
      ]
      this.loading = false
    }, 300)
  },
  methods: {
    footerMethod ({ columns, data }) {
      const footerData = [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '平均'
          }
          if (['age', 'rate'].includes(column.property)) {
            return XEUtils.mean(data, column.property).toFixed(2)
          }
          return null
        }),
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '和值'
          }
          if (['age', 'rate'].includes(column.property)) {
            return XEUtils.sum(data, column.property)
          }
          return null
        })
      ]
      return footerData
    }
  }
}
</script>
