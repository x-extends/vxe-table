<template>
  <div>
    <p class="tip">
      筛选高级用法、动态更改筛选条件、自定义更加复杂的模板事件，通过调用 <table-api-link prop="setFilter"/> 和 <table-api-link prop="updateData"/> 方法来处理复杂场景的筛选逻辑<br>
      进阶用法：<router-link class="link" :to="{name: 'RendererFilter'}">查看渲染器的使用</router-link><br>
      context 对象:<br>
      &nbsp;&nbsp;<span class="orange">changeOption(event, checked, option) 更新选项的状态</span><br>
      &nbsp;&nbsp;<span class="orange">confirmFilter() 确认筛选</span><br>
      &nbsp;&nbsp;<span class="orange">resetFilter() 清除筛选条件</span>
    </p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="filterNameEvent">筛选 Name</vxe-button>
        <vxe-button @click="filterAgeEvent">筛选 Age</vxe-button>
        <vxe-button @click="updateNameFilterEvent">更改 Name 的筛选条件</vxe-button>
        <vxe-button @click="$refs.xTable.clearFilter('age')">清除 Age 的筛选条件</vxe-button>
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
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column
        field="name"
        title="Name"
        sortable
        :filters="[{ label: '包含 z', value: 'z' }]"
        :filter-method="filterNameMethod"></vxe-table-column>
      <vxe-table-column
        field="role"
        title="Role"
        sortable
        :filters="[{ data: '' }]"
        :filter-method="filterRoleMethod">
        <template v-slot:filter="{ $panel, column }">
          <select class="my-select" v-model="option.data" v-for="(option, index) in column.filters" :key="index" @change="$panel.changeOption($event, !!option.data, option)">
            <option v-for="(label, cIndex) in roleList" :key="cIndex" :value="label">{{ label }}</option>
          </select>
        </template>
      </vxe-table-column>
      <vxe-table-column
        field="sex"
        title="Sex"
        sortable
        :filter-multiple="false"
        :filters="[{label: 'Man', value: '1'}, {label: 'Woman', value: '0'}]"></vxe-table-column>
      <vxe-table-column field="age" title="Age" :filters="[{ data: '' }]" :filter-method="filterAgeMethod">
        <template v-slot:filter="{ $panel, column }">
          <template v-for="(option, index) in column.filters">
            <input class="my-input" type="type" :key="index" v-model="option.data" @input="$panel.changeOption($event, !!option.data, option)" @keyup.enter="$panel.confirmFilter()" placeholder="按回车确认筛选">
          </template>
        </template>
      </vxe-table-column>
      <vxe-table-column field="time" title="Time" sortable></vxe-table-column>
      <vxe-table-column
        field="nickname"
        title="实现复杂的筛选"
        :filters="[{data: {type: 'has', isCase: true, name: ''}}]"
        :filter-render="{name: 'FilterComplex'}">
      </vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
      <code class="css">{{ demoCodes[2] }}</code>
    </pre>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'
import hljs from 'highlight.js'

export default {
  data () {
    return {
      loading: false,
      tableData: [],
      roleList: ['', '前端', '后端', '设计师'],
      demoCodes: [
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button @click="filterNameEvent">筛选 Name</vxe-button>
            <vxe-button @click="filterAgeEvent">筛选 Age</vxe-button>
            <vxe-button @click="updateNameFilterEvent">更改 Name 的筛选条件</vxe-button>
            <vxe-button @click="$refs.xTable.clearFilter('age')">清除 Age 的筛选条件</vxe-button>
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
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column
            field="name"
            title="Name"
            sortable
            :filters="[{ label: '包含 z', value: 'z' }]"
            :filter-method="filterNameMethod"></vxe-table-column>
          <vxe-table-column
            field="role"
            title="Role"
            sortable
            :filters="[{ data: '' }]"
            :filter-method="filterRoleMethod">
            <template v-slot:filter="{ $panel, column }">
              <select class="my-select" v-model="option.data" v-for="(option, index) in column.filters" :key="index" @change="$panel.changeOption($event, !!option.data, option)">
                <option v-for="(label, cIndex) in roleList" :key="cIndex" :value="label">{{ label }}</option>
              </select>
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="sex"
            title="Sex"
            sortable
            :filter-multiple="false"
            :filters="[{label: 'Man', value: '1'}, {label: 'Woman', value: '0'}]"></vxe-table-column>
          <vxe-table-column field="age" title="Age" :filters="[{ data: '' }]" :filter-method="filterAgeMethod">
            <template v-slot:filter="{ $panel, column }">
              <template v-for="(option, index) in column.filters">
                <input class="my-input" type="type" :key="index" v-model="option.data" @input="$panel.changeOption($event, !!option.data, option)" @keyup.enter="$panel.confirmFilter()" placeholder="按回车确认筛选">
              </template>
            </template>
          </vxe-table-column>
          <vxe-table-column field="time" title="Time" sortable></vxe-table-column>
          <vxe-table-column
            field="nickname"
            title="实现复杂的筛选"
            :filters="[{data: {type: 'has', isCase: true, name: ''}}]"
            :filter-render="{name: 'FilterComplex'}">
          </vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              loading: false,
              tableData: [],
              roleList: ['', '前端', '后端', '设计师']
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
                  this.tableData = window.MOCK_DATA_LIST.slice(0, 50)
                  this.loading = false
                  resolve()
                }, 300)
              })
            },
            filterNameMethod ({ value, row, column }) {
              return XEUtils.toString(row.name).toLowerCase().indexOf(value) > -1
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
                { label: '包含 a', value: 'a' },
                { label: '包含 b', value: 'b' },
                { label: '包含 c', value: 'c', checked: true },
                { label: '包含 h', value: 'h' },
                { label: '包含 j', value: 'j' }
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
              option.data = '26'
              option.checked = true
              // 修改条件之后，需要手动调用 updateData 处理表格数据
              xTable.updateData()
            }
          }
        }
        `,
        `
        .my-select {
          width: 100px;
          height: 32px;
        }
        .my-input {
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
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    findList () {
      this.loading = true
      return new Promise(resolve => {
        setTimeout(() => {
          this.tableData = window.MOCK_DATA_LIST.slice(0, 50)
          this.loading = false
          resolve()
        }, 300)
      })
    },
    filterNameMethod ({ value, row }) {
      return XEUtils.toString(row.name).toLowerCase().indexOf(value) > -1
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
        { label: '包含 a', value: 'a' },
        { label: '包含 b', value: 'b' },
        { label: '包含 c', value: 'c', checked: true },
        { label: '包含 h', value: 'h' },
        { label: '包含 j', value: 'j' }
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
      option.data = '26'
      option.checked = true
      // 修改条件之后，需要手动调用 updateData 处理表格数据
      xTable.updateData()
    }
  }
}
</script>

<style scoped>
.my-select {
  width: 100px;
  height: 32px;
}
.my-input {
  width: 140px;
  height: 32px;
}
</style>
