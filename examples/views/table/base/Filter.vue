<template>
  <div>
    <p class="tip">
      通过设置 <table-column-api-link prop="filters"/> 属性和 <table-column-api-link prop="filter-method"/> 方法可以支持列筛选功能<br>
      如果是服务端筛选，只需加上 <table-api-link prop="remote-filter"/> 和 <table-api-link prop="filter-change"/> 事件就可以实现<br>
      还可以使用 slot <table-column-api-link prop="filter"/> 和 context.changeOption(event, checked, option) 方法来自定义筛选模板
    </p>

    <vxe-table
      border
      highlight-hover-row
      height="400"
      :data="tableData">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" sortable :filters="[{label: 'id大于10', value: 10}, {label: 'id大于40', value: 40}]" :filter-method="filterNameMethod"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" sortable :filters="[{label: 'Man', value: '1'}, {label: 'Woman', value: '0'}]"></vxe-table-column>
      <vxe-table-column field="age" title="Age" :filters="[{ data: '' }]" :filter-method="filterAgeMethod">
        <template v-slot:filter="{ column, context }">
          <input type="type" v-for="(option, index) in column.filters" :key="index" v-model="option.data" @input="context.changeOption($event, !!option.data, option)">
        </template>
      </vxe-table-column>
      <vxe-table-column field="time" title="Time" sortable></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p class="tip">默认的筛选，通过 <table-column-api-link prop="checked"/> 属性设置默认的选中的选项</p>

    <vxe-table
      border
      highlight-hover-row
      height="400"
      :data="tableData">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" sortable :filters="[{label: 'id大于10', value: 10}, {label: 'id大于40', value: 40, checked: true}]" :filter-method="filterNameMethod"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" sortable :filters="[{label: 'Man', value: '1'}, {label: 'Woman', value: '0'}]"></vxe-table-column>
      <vxe-table-column field="age" title="Age" :filters="[{ data: '30', checked: true }]" :filter-method="filterAgeMethod">
        <template v-slot:filter="{ column, context }">
          <input type="type" v-for="(option, index) in column.filters" :key="index" v-model="option.data" @input="context.changeOption($event, !!option.data, option)">
        </template>
      </vxe-table-column>
      <vxe-table-column field="time" title="Time" sortable></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[2] }}</code>
      <code class="javascript">{{ demoCodes[3] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tableData: [],
      demoCodes: [
        `
        <vxe-table
          border
          highlight-hover-row
          height="400"
          :data="tableData">
          <vxe-table-column type="index" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" sortable :filters="[{label: 'id大于10', value: 10}, {label: 'id大于40', value: 40}]" :filter-method="filterNameMethod"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" sortable :filters="[{label: 'Man', value: '1'}, {label: 'Woman', value: '0'}]"></vxe-table-column>
          <vxe-table-column field="age" title="Age" :filters="[{ data: '' }]" :filter-method="filterAgeMethod">
            <template v-slot:filter="{ column, context }">
              <input type="type" v-for="(option, index) in column.filters" :key="index" v-model="option.data" @input="context.changeOption($event, !!option.data, option)">
            </template>
          </vxe-table-column>
          <vxe-table-column field="time" title="Time" sortable></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: []
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 50)
          },
          methods: {
            filterNameMethod ({ value, row, column }) {
              return row.id >= value
            },
            filterAgeMethod ({ option, row }) {
              return row.age === Number(option.data)
            }
          }
        }
        `,
        `
        <vxe-table
          border
          highlight-hover-row
          height="400"
          :data="tableData">
          <vxe-table-column type="index" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" sortable :filters="[{label: 'id大于10', value: 10}, {label: 'id大于40', value: 40, checked: true}]" :filter-method="filterNameMethod"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" sortable :filters="[{label: 'Man', value: '1'}, {label: 'Woman', value: '0'}]"></vxe-table-column>
          <vxe-table-column field="age" title="Age" :filters="[{ data: '26', checked: true }]" :filter-method="filterAgeMethod">
            <template v-slot:filter="{ column, context }">
              <input type="type" v-for="(option, index) in column.filters" :key="index" v-model="option.data" @input="context.changeOption($event, !!option.data, option)">
            </template>
          </vxe-table-column>
          <vxe-table-column field="time" title="Time" sortable></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: []
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 50)
          },
          methods: {
            filterNameMethod ({ value, row, column }) {
              return row.id >= value
            },
            filterAgeMethod ({ option, row }) {
              return row.age === Number(option.data)
            }
          }
        }
        `
      ]
    }
  },
  created () {
    this.tableData = window.MOCK_DATA_LIST.slice(0, 50)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    filterNameMethod ({ value, row, column }) {
      return row.id >= value
    },
    filterAgeMethod ({ option, row }) {
      return row.age === Number(option.data)
    }
  }
}
</script>
