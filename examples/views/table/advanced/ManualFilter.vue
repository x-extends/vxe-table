<template>
  <div>
    <p class="tip">
      筛选高级用法、动态更改筛选条件、自定义更加复杂的模板事件，通过调用 <table-api-link prop="setFilter"/> 和 <table-api-link prop="updateData"/> 方法来处理复杂场景的筛选逻辑<span class="red">（具体请自行实现，该示例仅供参考）</span><br>
      当自定义筛选时，在值发生改变时需要调用 $panel.changeOption(event, checked, option) 更新状态<br>
      进阶用法：<router-link class="link" :to="{name: 'RendererFilter'}">查看渲染器的使用</router-link><br>
    </p>

    <vxe-toolbar>
      <template #buttons>
        <vxe-button @click="filterNameEvent">筛选 Name</vxe-button>
        <vxe-button @click="filterAgeEvent">筛选 Age</vxe-button>
        <vxe-button @click="updateNameFilterEvent">更改 Name 的筛选条件</vxe-button>
        <vxe-button @click="$refs.xTable.clearFilter($refs.xTable.getColumnByField('age'))">清除 Age 的筛选条件</vxe-button>
        <vxe-button @click="$refs.xTable.clearFilter()">清除所有的筛选条件</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      highlight-hover-row
      ref="xTable"
      height="400"
      :loading="loading"
      :data="tableData">
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column
        field="name"
        title="Name"
        sortable
        :filters="[{ label: '包含 6', value: '6' }, { label: '包含 4', value: '4' }]"
        :filter-method="filterNameMethod"></vxe-column>
      <vxe-column
        field="role"
        title="Role"
        sortable
        :filters="[{ data: '' }]"
        :filter-method="filterRoleMethod">
        <template #filter="{ $panel, column }">
          <select class="my-select" v-model="option.data" v-for="(option, index) in column.filters" :key="index" @change="$panel.changeOption($event, !!option.data, option)">
            <option v-for="(label, cIndex) in roleList" :key="cIndex" :value="label">{{ label }}</option>
          </select>
        </template>
      </vxe-column>
      <vxe-column
        field="sex"
        title="Sex"
        sortable
        :filter-multiple="false"
        :filters="[{label: 'Man', value: '1'}, {label: 'Woman', value: '0'}]"></vxe-column>
      <vxe-column field="age" title="Age" :filters="[{ data: '' }]" :filter-method="filterAgeMethod" :filter-recover-method="filterAgeRecoverMethod">
        <template #filter="{ $panel, column }">
          <template v-for="(option, index) in column.filters">
            <input class="my-input" type="type" :key="index" v-model="option.data" @input="$panel.changeOption($event, !!option.data, option)" @keyup.enter="$panel.confirmFilter()" placeholder="按回车确认筛选">
          </template>
        </template>
      </vxe-column>
      <vxe-column field="amount" title="Amount" sortable></vxe-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
      <pre-code class="css">{{ demoCodes[2] }}</pre-code>
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
      roleList: ['', 'Develop', 'PM', 'Test'],
      demoCodes: [
        `
        <vxe-toolbar>
          <template #buttons>
            <vxe-button @click="filterNameEvent">筛选 Name</vxe-button>
            <vxe-button @click="filterAgeEvent">筛选 Age</vxe-button>
            <vxe-button @click="updateNameFilterEvent">更改 Name 的筛选条件</vxe-button>
            <vxe-button @click="$refs.xTable.clearFilter($refs.xTable.getColumnByField('age'))">清除 Age 的筛选条件</vxe-button>
            <vxe-button @click="$refs.xTable.clearFilter()">清除所有的筛选条件</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          highlight-hover-row
          ref="xTable"
          height="400"
          :loading="loading"
          :data="tableData">
          <vxe-column type="seq" width="60"></vxe-column>
          <vxe-column
            field="name"
            title="Name"
            sortable
            :filters="[{ label: '包含 6', value: '6' }, { label: '包含 4', value: '4' }]"
            :filter-method="filterNameMethod"></vxe-column>
          <vxe-column
            field="role"
            title="Role"
            sortable
            :filters="[{ data: '' }]"
            :filter-method="filterRoleMethod">
            <template #filter="{ $panel, column }">
              <select class="my-select" v-model="option.data" v-for="(option, index) in column.filters" :key="index" @change="$panel.changeOption($event, !!option.data, option)">
                <option v-for="(label, cIndex) in roleList" :key="cIndex" :value="label">{{ label }}</option>
              </select>
            </template>
          </vxe-column>
          <vxe-column
            field="sex"
            title="Sex"
            sortable
            :filter-multiple="false"
            :filters="[{label: 'Man', value: '1'}, {label: 'Woman', value: '0'}]"></vxe-column>
          <vxe-column field="age" title="Age" :filters="[{ data: '' }]" :filter-method="filterAgeMethod" :filter-recover-method="filterAgeRecoverMethod">
            <template #filter="{ $panel, column }">
              <template v-for="(option, index) in column.filters">
                <input class="my-input" type="type" :key="index" v-model="option.data" @input="$panel.changeOption($event, !!option.data, option)" @keyup.enter="$panel.confirmFilter()" placeholder="按回车确认筛选">
              </template>
            </template>
          </vxe-column>
          <vxe-column field="amount" title="Amount" sortable></vxe-column>
        </vxe-table>
        `,
        `
        import XEUtils from 'xe-utils'
        
        export default {
          data () {
            return {
              loading: false,
              tableData: [],
              roleList: ['', 'Develop', 'PM', 'Test']
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
                    { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, amount: 888, address: 'test abc' },
                    { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, amount: 666, address: 'Guangzhou' },
                    { id: 10003, name: 'Test3', role: 'PM', sex: '1', age: 32, amount: 89, address: 'Shanghai' },
                    { id: 10004, name: 'Test4', role: 'Designer', sex: '0', age: 23, amount: 1000, address: 'test abc' },
                    { id: 10005, name: 'Test5', role: 'Develop', sex: '0', age: 30, amount: 999, address: 'Shanghai' },
                    { id: 10006, name: 'Test6', role: 'Designer', sex: '0', age: 21, amount: 998, address: 'test abc' },
                    { id: 10007, name: 'Test7', role: 'Test', sex: '1', age: 29, amount: 2000, address: 'test abc' },
                    { id: 10008, name: 'Test8', role: 'Develop', sex: '1', age: 35, amount: 999, address: 'test abc' }
                  ]
                  this.loading = false
                  resolve()
                }, 300)
              })
            },
            filterNameMethod ({ value, row, column }) {
              return XEUtils.toValueString(row.name).toLowerCase().indexOf(value) > -1
            },
            filterRoleMethod ({ option, row }) {
              return row.role === option.data
            },
            filterAgeMethod ({ option, row }) {
              return row.age === Number(option.data)
            },
            updateNameFilterEvent () {
              const xTable = this.$refs.xTable
              const column = xTable.getColumnByField('name')
              // 修改筛选列表，并默认设置为选中状态
              xTable.setFilter(column, [
                { label: '包含 0', value: '0' },
                { label: '包含 1', value: '1' },
                { label: '包含 2', value: '2', checked: true },
                { label: '包含 3', value: '3' },
                { label: '包含 4', value: '4' }
              ])
              // 修改条件之后，需要手动调用 updateData 处理表格数据
              xTable.updateData()
            },
            filterNameEvent () {
              const xTable = this.$refs.xTable
              const column = xTable.getColumnByField('name')
              // 修改第二个选项为勾选状态
              const option = column.filters[1]
              option.checked = true
              // 修改条件之后，需要手动调用 updateData 处理表格数据
              xTable.updateData()
            },
            filterAgeEvent () {
              const xTable = this.$refs.xTable
              const column = xTable.getColumnByField('age')
              // 修改第一个选项为勾选状态
              const option = column.filters[0]
              option.data = '32'
              option.checked = true
              // 修改条件之后，需要手动调用 updateData 处理表格数据
              xTable.updateData()
            },
            filterAgeRecoverMethod ({ option }) {
              // 如果是自定义筛选模板，当为点击确认时，该选项将被恢复为默认值
              option.data = ''
            }
          }
        }
        `,
        `
        .my-select {
          margin: 10px;
          width: 100px;
          height: 32px;
        }
        .my-input {
          margin: 10px;
          width: 140px;
          height: 32px;
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
            { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, amount: 888, address: 'test abc' },
            { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, amount: 666, address: 'Guangzhou' },
            { id: 10003, name: 'Test3', role: 'PM', sex: '1', age: 32, amount: 89, address: 'Shanghai' },
            { id: 10004, name: 'Test4', role: 'Designer', sex: '0', age: 23, amount: 1000, address: 'test abc' },
            { id: 10005, name: 'Test5', role: 'Develop', sex: '0', age: 30, amount: 999, address: 'Shanghai' },
            { id: 10006, name: 'Test6', role: 'Designer', sex: '0', age: 21, amount: 998, address: 'test abc' },
            { id: 10007, name: 'Test7', role: 'Test', sex: '1', age: 29, amount: 2000, address: 'test abc' },
            { id: 10008, name: 'Test8', role: 'Develop', sex: '1', age: 35, amount: 999, address: 'test abc' }
          ]
          this.loading = false
          resolve()
        }, 300)
      })
    },
    filterNameMethod ({ value, row }) {
      return XEUtils.toValueString(row.name).toLowerCase().indexOf(value) > -1
    },
    filterRoleMethod ({ option, row }) {
      return row.role === option.data
    },
    filterAgeMethod ({ option, row }) {
      return row.age === Number(option.data)
    },
    updateNameFilterEvent () {
      const xTable = this.$refs.xTable
      const column = xTable.getColumnByField('name')
      // 修改筛选列表，并默认设置为选中状态
      xTable.setFilter(column, [
        { label: '包含 0', value: '0' },
        { label: '包含 1', value: '1' },
        { label: '包含 2', value: '2', checked: true },
        { label: '包含 3', value: '3' },
        { label: '包含 4', value: '4' }
      ])
      // 修改条件之后，需要手动调用 updateData 处理表格数据
      xTable.updateData()
    },
    filterNameEvent () {
      const xTable = this.$refs.xTable
      const column = xTable.getColumnByField('name')
      // 修改第二个选项为勾选状态
      const option = column.filters[1]
      option.checked = true
      // 修改条件之后，需要手动调用 updateData 处理表格数据
      xTable.updateData()
    },
    filterAgeEvent () {
      const xTable = this.$refs.xTable
      const column = xTable.getColumnByField('age')
      // 修改第一个选项为勾选状态
      const option = column.filters[0]
      option.data = '32'
      option.checked = true
      // 修改条件之后，需要手动调用 updateData 处理表格数据
      xTable.updateData()
    },
    filterAgeRecoverMethod ({ option }) {
      // 如果是自定义筛选模板，当为点击确认时，该选项将被恢复为默认值
      option.data = ''
    }
  }
}
</script>

<style scoped>
.my-select {
  margin: 10px;
  width: 100px;
  height: 32px;
}
.my-input {
  margin: 10px;
  width: 140px;
  height: 32px;
}
</style>
