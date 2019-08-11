<template>
  <div>
    <p>手动触发筛选</p>
    <p>通过调用 <table-api-link prop="filter"/> 和 <table-api-link prop="updateData"/> 方法来处理手动筛选</p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="filterNameEvent">筛选 Name</vxe-button>
        <vxe-button @click="filterAgeEvent">筛选 Age</vxe-button>
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
      :data.sync="tableData">
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
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  data () {
    return {
      loading: false,
      tableData: [],
      demoCodes: [
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button @click="filterNameEvent">筛选 Name</vxe-button>
            <vxe-button @click="filterAgeEvent">筛选 Age</vxe-button>
            <vxe-button @click="$refs.xTable.clearFilter()">清除筛选所有条件</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          highlight-hover-row
          ref="xTable"
          height="400"
          :loading="loading"
          :data.sync="tableData">
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
              loading: false,
              tableData: []
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
              return row.id >= value
            },
            filterAgeMethod ({ option, row }) {
              return row.age === Number(option.data)
            },
            filterNameEvent () {
              let xTable = this.$refs.xTable
              let column = xTable.getColumnByField('name')
              xTable.filter(column)
                .then(options => {
                  // 处理条件并设置选中的选项
                  let option = options[1]
                  option.checked = true
                })
                .then(() => {
                  // 手动修改条件之后，需要调用 updateData 更新表格数据
                  xTable.updateData()
                })
            },
            filterAgeEvent () {
              let xTable = this.$refs.xTable
              let column = xTable.getColumnByField('age')
              xTable.filter(column)
                .then(options => {
                  // 处理条件并设置选中的选项
                  let option = options[0]
                  option.data = '26'
                  option.checked = true
                })
                .then(() => {
                  // 手动修改条件之后，需要调用 updateData 更新表格数据
                  xTable.updateData()
                })
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
    filterNameMethod ({ value, row, column }) {
      return row.id >= value
    },
    filterAgeMethod ({ option, row }) {
      return row.age === Number(option.data)
    },
    filterNameEvent () {
      let xTable = this.$refs.xTable
      let column = xTable.getColumnByField('name')
      xTable.filter(column)
        .then(options => {
          // 处理条件并设置选中的选项
          let option = options[1]
          option.checked = true
        })
        .then(() => {
          // 手动修改条件之后，需要调用 updateData 更新表格数据
          xTable.updateData()
        })
    },
    filterAgeEvent () {
      let xTable = this.$refs.xTable
      let column = xTable.getColumnByField('age')
      xTable.filter(column)
        .then(options => {
          // 处理条件并设置选中的选项
          let option = options[0]
          option.data = '26'
          option.checked = true
        })
        .then(() => {
          // 手动修改条件之后，需要调用 updateData 更新表格数据
          xTable.updateData()
        })
    }
  }
}
</script>
