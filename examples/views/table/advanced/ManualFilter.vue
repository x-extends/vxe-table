<template>
  <div>
    <p class="tip">
      筛选高级用法、动态更改筛选条件、自定义更加复杂的模板事件，通过调用 <table-api-link prop="filter"/> 和 <table-api-link prop="updateData"/> 方法来处理复杂场景的筛选逻辑<br>
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
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column
        field="role"
        title="Role"
        sortable
        :filters="[{ data: '' }]"
        :filter-method="filterRoleMethod">
        <template v-slot:filter="{ column, context }">
          <select class="my-select" v-model="option.data" v-for="(option, index) in column.filters" :key="index" @change="context.changeOption($event, !!option.data, option)">
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
        <template v-slot:filter="{ column, context }">
          <template v-for="(option, index) in column.filters">
            <input class="my-input" type="type" :key="index" v-model="option.data" @input="context.changeOption($event, !!option.data, option)" @keyup.enter="context.confirmFilter()" placeholder="按回车确认筛选">
          </template>
        </template>
      </vxe-table-column>
      <vxe-table-column field="time" title="Time" sortable></vxe-table-column>
      <vxe-table-column
        field="name"
        title="渲染器（实现复杂的筛选）"
        width="240"
        :filters="[{data: {type: 'has', isCase: true, name: ''}}]"
        :filter-render="{name: 'MyComplexFilter'}"></vxe-table-column>
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
          <vxe-table-column type="index" width="60"></vxe-table-column>
          <vxe-table-column
            field="role"
            title="Role"
            sortable
            :filters="[{ data: '' }]"
            :filter-method="filterRoleMethod">
            <template v-slot:filter="{ column, context }">
              <select class="my-select" v-model="option.data" v-for="(option, index) in column.filters" :key="index" @change="context.changeOption($event, !!option.data, option)">
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
            <template v-slot:filter="{ column, context }">
              <template v-for="(option, index) in column.filters">
                <input class="my-input" type="type" :key="index" v-model="option.data" @input="context.changeOption($event, !!option.data, option)" @keyup.enter="context.confirmFilter()" placeholder="按回车确认筛选">
              </template>
            </template>
          </vxe-table-column>
          <vxe-table-column field="time" title="Time" sortable></vxe-table-column>
          <vxe-table-column
            field="name"
            title="渲染器（实现复杂的筛选）"
            width="240"
            :filters="[{data: {type: 'has', isCase: true, name: ''}}]"
            :filter-render="{name: 'MyComplexFilter'}"></vxe-table-column>
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
              return row.id >= value
            },
            filterRoleMethod ({ option, row }) {
              return row.role === option.data
            },
            filterAgeMethod ({ option, row }) {
              return row.age === Number(option.data)
            },
            updateNameFilterEvent () {
              let xTable = this.$refs.xTable
              xTable.filter('name', options => {
                // 修改筛选列表
                return [
                  {
                    label: 'id大于10',
                    value: 10
                  },
                  {
                    label: 'id大于20',
                    value: 20
                  },
                  {
                    label: 'id大于30',
                    value: 30,
                    checked: true // 设置为选中状态
                  },
                  {
                    label: 'id大于40',
                    value: 40
                  }
                ]
              }).then(() => {
                // 修改条件之后，需要手动调用 updateData 处理表格数据
                xTable.updateData()
              })
            },
            filterNameEvent () {
              let xTable = this.$refs.xTable
              xTable.filter('name')
                .then(options => {
                  // 处理条件并设置选中的选项
                  if (options.length) {
                    let option = options[1]
                    option.checked = true
                  }
                })
                .then(() => {
                  // 修改条件之后，需要手动调用 updateData 处理表格数据
                  xTable.updateData()
                })
            },
            filterAgeEvent () {
              let xTable = this.$refs.xTable
              xTable.filter('age')
                .then(options => {
                  // 处理条件并设置选中的选项
                  if (options.length) {
                    let option = options[0]
                    option.data = '26'
                    option.checked = true
                  }
                })
                .then(() => {
                  // 修改条件之后，需要手动调用 updateData 处理表格数据
                  xTable.updateData()
                })
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
    filterNameMethod ({ value, row, column }) {
      return row.id >= value
    },
    filterRoleMethod ({ option, row }) {
      return row.role === option.data
    },
    filterAgeMethod ({ option, row }) {
      return row.age === Number(option.data)
    },
    updateNameFilterEvent () {
      let xTable = this.$refs.xTable
      xTable.filter('name', options => {
        // 修改筛选列表
        return [
          {
            label: 'id大于10',
            value: 10
          },
          {
            label: 'id大于20',
            value: 20
          },
          {
            label: 'id大于30',
            value: 30,
            checked: true // 设置为选中状态
          },
          {
            label: 'id大于40',
            value: 40
          }
        ]
      }).then(() => {
        // 修改条件之后，需要手动调用 updateData 处理表格数据
        xTable.updateData()
      })
    },
    filterNameEvent () {
      let xTable = this.$refs.xTable
      xTable.filter('name')
        .then(options => {
          // 处理条件并设置选中的选项
          if (options.length) {
            let option = options[1]
            option.checked = true
          }
        })
        .then(() => {
          // 修改条件之后，需要手动调用 updateData 处理表格数据
          xTable.updateData()
        })
    },
    filterAgeEvent () {
      let xTable = this.$refs.xTable
      xTable.filter('age')
        .then(options => {
          // 处理条件并设置选中的选项
          if (options.length) {
            let option = options[0]
            option.data = '26'
            option.checked = true
          }
        })
        .then(() => {
          // 修改条件之后，需要手动调用 updateData 处理表格数据
          xTable.updateData()
        })
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
