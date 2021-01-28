<template>
  <div>
    <p class="tip">自定义筛选，可以通过设置选项状态和调用 <table-api-link prop="updateData"/> 方法更新筛选条件</p>

    <vxe-table
      border
      ref="xTable"
      height="400"
      :filter-config="{showIcon: false}"
      :loading="loading"
      :data="tableData">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-colgroup title="文本">
        <vxe-table-column field="name" :filters="[{data: ''}]" :filter-method="customStringFilterMethod">
          <template v-slot:header="{ column }">
            <vxe-input type="text" v-for="(option, index) in column.filters" :key="index" v-model="option.data" @change="filterEvent(option)" placeholder="请输入" clearable></vxe-input>
          </template>
        </vxe-table-column>
      </vxe-table-colgroup>
      <vxe-table-colgroup title="日期">
        <vxe-table-column field="date" :filters="[{data: ''}]" :filter-method="customDateFilterMethod">
          <template v-slot:header="{ column }">
            <vxe-input type="date" v-for="(option, index) in column.filters" :key="index" v-model="option.data" @change="filterEvent(option)" placeholder="请选择" clearable transfer></vxe-input>
          </template>
        </vxe-table-column>
      </vxe-table-colgroup>
      <vxe-table-colgroup title="下拉框">
        <vxe-table-column field="sex" :filters="[{data: ''}]" :filter-method="customEqualFilterMethod" :formatter="formatterSex">
          <template v-slot:header="{ column }">
            <vxe-select v-for="(option, index) in column.filters" :key="index" v-model="option.data" :options="sexList" @change="filterEvent(option)" placeholder="请选择" clearable transfer></vxe-select>
          </template>
        </vxe-table-column>
      </vxe-table-colgroup>
      <vxe-table-column field="address" title="Address" sortable></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'

export default {
  data () {
    return {
      loading: false,
      tableData: [],
      sexList: [
        { label: '女', value: '0' },
        { label: '男', value: '1' }
      ],
      demoCodes: [
        `
        <vxe-table
          border
          ref="xTable"
          height="400"
          :filter-config="{showIcon: false}"
          :loading="loading"
          :data="tableData">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-colgroup title="文本">
            <vxe-table-column field="name" :filters="[{data: ''}]" :filter-method="customStringFilterMethod">
              <template v-slot:header="{ column }">
                <vxe-input type="text" v-for="(option, index) in column.filters" :key="index" v-model="option.data" @change="filterEvent(option)" placeholder="请输入" clearable></vxe-input>
              </template>
            </vxe-table-column>
          </vxe-table-colgroup>
          <vxe-table-colgroup title="日期">
            <vxe-table-column field="date" :filters="[{data: ''}]" :filter-method="customDateFilterMethod">
              <template v-slot:header="{ column }">
                <vxe-input type="date" v-for="(option, index) in column.filters" :key="index" v-model="option.data" @change="filterEvent(option)" placeholder="请选择" clearable transfer></vxe-input>
              </template>
            </vxe-table-column>
          </vxe-table-colgroup>
          <vxe-table-colgroup title="下拉框">
            <vxe-table-column field="sex" :filters="[{data: ''}]" :filter-method="customEqualFilterMethod" :formatter="formatterSex">
              <template v-slot:header="{ column }">
                <vxe-select v-for="(option, index) in column.filters" :key="index" v-model="option.data" :options="sexList" @change="filterEvent(option)" placeholder="请选择" clearable transfer></vxe-select>
              </template>
            </vxe-table-column>
          </vxe-table-colgroup>
          <vxe-table-column field="address" title="Address" sortable></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              loading: false,
              tableData: [],
              sexList: [
                { label: '女', value: '0' },
                { label: '男', value: '1' }
              ]
            }
          },
          created () {
            this.findList()
          },
          methods: {
            findList () {
              this.loading = true
              return new Promise(resolve => {
                setTimeout(() => {
                  this.tableData = [
                    { id: 10001, name: 'Test10', role: 'Develop', sex: '0', date: '2021-11-14', age: 28, amount: 888, address: 'vxe-table 从入门到放弃' },
                    { id: 10002, name: 'Test12', role: 'Test', sex: '1', date: '2021-01-20', age: 22, amount: 666, address: 'Guangzhou' },
                    { id: 10003, name: 'Test34', role: 'PM', sex: '1', date: '2020-09-17', age: 32, amount: 89, address: 'Shanghai' },
                    { id: 10004, name: 'Test24', role: 'Designer', sex: '0', date: '2020-10-25', age: 23, amount: 1000, address: 'vxe-table 从入门到放弃' },
                    { id: 10005, name: 'Test15', role: 'Develop', sex: '0', date: '2020-12-12', age: 30, amount: 999, address: 'Shanghai' },
                    { id: 10006, name: 'Test36', role: 'Designer', sex: '0', date: '2020-08-21', age: 21, amount: 998, address: 'vxe-table 从入门到放弃' },
                    { id: 10007, name: 'Test27', role: 'Test', sex: '1', date: '2021-01-01', age: 29, amount: 2000, address: 'vxe-table 从入门到放弃' },
                    { id: 10008, name: 'Test48', role: 'Develop', sex: '1', date: '2021-02-06', age: 35, amount: 999, address: 'vxe-table 从入门到放弃' }
                  ]
                  this.loading = false
                  resolve()
                }, 300)
              })
            },
            formatterSex ({ cellValue }) {
              const item = this.sexList.find(item => item.value === cellValue)
              return item ? item.label : ''
            },
            customStringFilterMethod ({ option, row, column }) {
              if (option.data) {
                return XEUtils.toString(row[column.property]).toLowerCase().indexOf(option.data) > -1
              }
              return true
            },
            customDateFilterMethod ({ option, row, column }) {
              if (option.data) {
                return XEUtils.isDateSame(row[column.property], option.data, 'yyyy-MM-dd')
              }
              return true
            },
            customEqualFilterMethod ({ option, row, column }) {
              if (option.data) {
                return row[column.property] === option.data
              }
              return true
            },
            filterEvent (option) {
              const xTable = this.$refs.xTable
              // 设置为选中状态
              option.checked = true
              // 修改条件之后，需要手动调用 updateData 处理表格数据
              xTable.updateData()
            }
          }
        }
        `
      ]
    }
  },
  created () {
    this.findList()
  },
  methods: {
    findList () {
      this.loading = true
      return new Promise(resolve => {
        setTimeout(() => {
          this.tableData = [
            { id: 10001, name: 'Test10', role: 'Develop', sex: '0', date: '2021-11-14', age: 28, amount: 888, address: 'vxe-table 从入门到放弃' },
            { id: 10002, name: 'Test12', role: 'Test', sex: '1', date: '2021-01-20', age: 22, amount: 666, address: 'Guangzhou' },
            { id: 10003, name: 'Test34', role: 'PM', sex: '1', date: '2020-09-17', age: 32, amount: 89, address: 'Shanghai' },
            { id: 10004, name: 'Test24', role: 'Designer', sex: '0', date: '2020-10-25', age: 23, amount: 1000, address: 'vxe-table 从入门到放弃' },
            { id: 10005, name: 'Test15', role: 'Develop', sex: '0', date: '2020-12-12', age: 30, amount: 999, address: 'Shanghai' },
            { id: 10006, name: 'Test36', role: 'Designer', sex: '0', date: '2020-08-21', age: 21, amount: 998, address: 'vxe-table 从入门到放弃' },
            { id: 10007, name: 'Test27', role: 'Test', sex: '1', date: '2021-01-01', age: 29, amount: 2000, address: 'vxe-table 从入门到放弃' },
            { id: 10008, name: 'Test48', role: 'Develop', sex: '1', date: '2021-02-06', age: 35, amount: 999, address: 'vxe-table 从入门到放弃' }
          ]
          this.loading = false
          resolve()
        }, 300)
      })
    },
    formatterSex ({ cellValue }) {
      const item = this.sexList.find(item => item.value === cellValue)
      return item ? item.label : ''
    },
    customStringFilterMethod ({ option, row, column }) {
      if (option.data) {
        return XEUtils.toString(row[column.property]).toLowerCase().indexOf(option.data) > -1
      }
      return true
    },
    customDateFilterMethod ({ option, row, column }) {
      if (option.data) {
        return XEUtils.isDateSame(row[column.property], option.data, 'yyyy-MM-dd')
      }
      return true
    },
    customEqualFilterMethod ({ option, row, column }) {
      if (option.data) {
        return row[column.property] === option.data
      }
      return true
    },
    filterEvent (option) {
      const xTable = this.$refs.xTable
      // 设置为选中状态
      option.checked = true
      // 修改条件之后，需要手动调用 updateData 处理表格数据
      xTable.updateData()
    }
  }
}
</script>
