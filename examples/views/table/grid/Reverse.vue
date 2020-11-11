<template>
  <div>
    <p class="tip">反转表格，只需要将 <grid-api-link prop="columns"/> 和 <grid-api-link prop="data"/> 数据进行反转<span class="red">（具体请自行实现，该示例仅供参考）</span></p>

    <vxe-grid
      border
      class="reverse-table"
      :show-header="false"
      :columns="tableColumn"
      :data="tableData"></vxe-grid>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
      <pre-code class="css">{{ demoCodes[2] }}</pre-code>
    </pre>

    <p class="tip">更多配置<span class="red">（具体请自行实现，该示例仅供参考）</span></p>

    <vxe-grid
      border
      show-overflow
      class="reverse-table"
      height="400"
      :show-header="false"
      :columns="tableColumn2"
      :data="tableData2"></vxe-grid>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[3] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[4] }}</pre-code>
      <pre-code class="css">{{ demoCodes[5] }}</pre-code>
    </pre>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableColumn: [],
      tableData: [],
      tableColumn2: [],
      tableData2: [],
      demoCodes: [
        `
        <vxe-grid
          border
          highlight-hover-row
          class="reverse-table"
          :show-header="false"
          :columns="tableColumn"
          :data="tableData"></vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              tableColumn: [],
              tableData: []
            }
          },
          created () {
            const myColumns = [
              { field: 'name', title: 'Name' },
              { field: 'role', title: 'Role' },
              { field: 'sex', title: 'Sex' },
              { field: 'age', title: 'Age' },
              { field: 'address', title: 'Address' }
            ]
            const myData = [
              { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
              { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
              { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
              { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
              { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
              { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women ', age: 21, address: 'Shenzhen' },
              { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man ', age: 29, address: 'Shenzhen' },
              { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man ', age: 35, address: 'Shenzhen' }
            ]
            this.reverseTable(myColumns, myData)
          },
          methods: {
            // 反转函数
            reverseTable (columns, list) {
              const buildData = columns.map(column => {
                const item = { col0: column.title }
                list.forEach((row, index) => {
                  item[\`col\${index + 1}\`] = row[column.field]
                })
                return item
              })
              const buildColumns = [{
                field: 'col0',
                fixed: 'left',
                width: 80
              }]
              list.forEach((item, index) => {
                buildColumns.push({
                  field: \`col\${index + 1}\`,
                  minWidth: 120
                })
              })
              this.tableData = buildData
              this.tableColumn = buildColumns
            }
          }
        }
        `,
        `
        .reverse-table .vxe-body--row .vxe-body--column:first-child {
          background-color: #f8f8f9;
        }
        `,
        `
        <vxe-grid
          border
          show-overflow
          highlight-hover-row
          class="reverse-table"
          height="400"
          :show-header="false"
          :columns="tableColumn2"
          :data="tableData2"></vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              tableColumn2: [],
              tableData2: []
            }
          },
          created () {
            const myColumns2 = [
              { field: 'id', title: 'ID' },
              { field: 'name', title: 'Name' },
              { field: 'role', title: 'Role' },
              { field: 'sex', title: 'Sex' },
              { field: 'age', title: 'Age' },
              { field: 'address', title: 'Address' },
              { field: 'rate', title: 'Rate' },
              { field: 'date3', title: 'Date' },
              { field: 'updateTime', title: 'UpdateTime' },
              { field: 'createTime', title: 'CreateTime' }
            ]
            const myData2 = [
              { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, rate: 2, address: 'Shenzhen', date3: '20:30', updateTime: '2020-09-16', createTime: '2020-09-16' },
              { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, rate: 2, address: 'Beijin', date3: '20:30', updateTime: '2019-09-16', createTime: '2020-09-16' },
              { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, rate: 6, address: 'Shanghai', date3: '20:30', updateTime: '2020-09-16', createTime: '2021-09-16' },
              { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women ', age: 23, rate: 2, address: 'Shenzhen', date3: '20:30', updateTime: '2020-09-16', createTime: '2020-09-16' },
              { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women ', age: 30, rate: 10, address: 'Shanghai Beijin Shenzhen', date3: '20:30', updateTime: '2020-01-16', createTime: '2020-10-16' },
              { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women ', age: 21, rate: 2, address: 'Shenzhen', date3: '20:30', updateTime: '2018-09-16', createTime: '2020-09-16' },
              { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man ', age: 29, rate: 3, address: 'Shenzhen', date3: '20:30', updateTime: '2020-01-16', createTime: '2020-10-16' },
              { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man ', age: 35, rate: 2, address: 'Beijin Beijin Beijin', date3: '20:30', updateTime: '2017-09-16', createTime: '2020-09-16' },
              { id: 10009, name: 'Test9', nickname: 'T9', role: 'Test', sex: 'Man ', age: 29, rate: 3, address: 'Shenzhen', date3: '20:30', updateTime: '2020-01-16', createTime: '2020-10-16' },
              { id: 10010, name: 'Test10', nickname: 'T10', role: 'Develop', sex: 'Man ', age: 50, rate: 5, address: 'Shenzhen', date3: '20:30', updateTime: '2017-09-16', createTime: '2020-09-16' }
            ]
            this.reverseTable2(myColumns2, myData2)
          },
          methods: {
            // 反转函数
            reverseTable2 (columns, list) {
              const buildData = columns.map(column => {
                const item = { col0: column.title }
                list.forEach((row, index) => {
                  item[\`col\${index + 1}\`] = row[column.field]
                })
                return item
              })
              const buildColumns = [{
                field: 'col0',
                fixed: 'left',
                width: 80
              }]
              list.forEach((item, index) => {
                buildColumns.push({
                  field: \`col\${index + 1}\`,
                  minWidth: 120
                })
              })
              this.tableData2 = buildData
              this.tableColumn2 = buildColumns
            }
          }
        }
        `,
        `
        .reverse-table .vxe-body--row .vxe-body--column:first-child {
          background-color: #f8f8f9;
        }
        `
      ]
    }
  },
  created () {
    const myColumns = [
      { field: 'name', title: 'Name' },
      { field: 'role', title: 'Role' },
      { field: 'sex', title: 'Sex' },
      { field: 'age', title: 'Age' },
      { field: 'address', title: 'Address' }
    ]
    const myData = [
      { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
      { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
      { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
      { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
      { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
      { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women ', age: 21, address: 'Shenzhen' },
      { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man ', age: 29, address: 'Shenzhen' },
      { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man ', age: 35, address: 'Shenzhen' }
    ]
    this.reverseTable(myColumns, myData)

    const myColumns2 = [
      { field: 'id', title: 'ID' },
      { field: 'name', title: 'Name' },
      { field: 'role', title: 'Role' },
      { field: 'sex', title: 'Sex' },
      { field: 'age', title: 'Age' },
      { field: 'address', title: 'Address' },
      { field: 'rate', title: 'Rate' },
      { field: 'date3', title: 'Date' },
      { field: 'updateTime', title: 'UpdateTime' },
      { field: 'createTime', title: 'CreateTime' }
    ]
    const myData2 = [
      { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, rate: 2, address: 'Shenzhen', date3: '20:30', updateTime: '2020-09-16', createTime: '2020-09-16' },
      { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, rate: 2, address: 'Beijin', date3: '20:30', updateTime: '2019-09-16', createTime: '2020-09-16' },
      { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, rate: 6, address: 'Shanghai', date3: '20:30', updateTime: '2020-09-16', createTime: '2021-09-16' },
      { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women ', age: 23, rate: 2, address: 'Shenzhen', date3: '20:30', updateTime: '2020-09-16', createTime: '2020-09-16' },
      { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women ', age: 30, rate: 10, address: 'Shanghai Beijin Shenzhen', date3: '20:30', updateTime: '2020-01-16', createTime: '2020-10-16' },
      { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women ', age: 21, rate: 2, address: 'Shenzhen', date3: '20:30', updateTime: '2018-09-16', createTime: '2020-09-16' },
      { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man ', age: 29, rate: 3, address: 'Shenzhen', date3: '20:30', updateTime: '2020-01-16', createTime: '2020-10-16' },
      { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man ', age: 35, rate: 2, address: 'Beijin Beijin Beijin', date3: '20:30', updateTime: '2017-09-16', createTime: '2020-09-16' },
      { id: 10009, name: 'Test9', nickname: 'T9', role: 'Test', sex: 'Man ', age: 29, rate: 3, address: 'Shenzhen', date3: '20:30', updateTime: '2020-01-16', createTime: '2020-10-16' },
      { id: 10010, name: 'Test10', nickname: 'T10', role: 'Develop', sex: 'Man ', age: 50, rate: 5, address: 'Shenzhen', date3: '20:30', updateTime: '2017-09-16', createTime: '2020-09-16' }
    ]
    this.reverseTable2(myColumns2, myData2)
  },
  methods: {
    // 将行与列进行反转
    reverseTable (columns, list) {
      const buildData = columns.map(column => {
        const item = { col0: column.title }
        list.forEach((row, index) => {
          item[`col${index + 1}`] = row[column.field]
        })
        return item
      })
      const buildColumns = [{
        field: 'col0',
        fixed: 'left',
        width: 80
      }]
      list.forEach((item, index) => {
        buildColumns.push({
          field: `col${index + 1}`,
          minWidth: 120
        })
      })
      this.tableData = buildData
      this.tableColumn = buildColumns
    },
    reverseTable2 (columns, list) {
      const buildData = columns.map(column => {
        const item = { col0: column.title }
        list.forEach((row, index) => {
          item[`col${index + 1}`] = row[column.field]
        })
        return item
      })
      const buildColumns = [{
        field: 'col0',
        fixed: 'left',
        width: 80
      }]
      list.forEach((item, index) => {
        buildColumns.push({
          field: `col${index + 1}`,
          minWidth: 120
        })
      })
      this.tableData2 = buildData
      this.tableColumn2 = buildColumns
    }
  }
}
</script>

<style lang="scss">
.reverse-table .vxe-body--row .vxe-body--column:first-child {
  background-color: #f8f8f9;
}
</style>
