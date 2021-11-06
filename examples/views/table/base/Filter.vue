<template>
  <div>
    <p class="tip">
      通过设置 <table-column-api-link prop="filters"/> 属性和 <table-column-api-link prop="filter-method"/> 方法可以开启列筛选功能，通过 <table-column-api-link prop="filter-multiple"/>=false 设置为单选<br>
      如果是服务端筛选，只需加上 <table-api-link prop="filter-config"/>={<table-api-link prop="remote"/>: true} 和 <table-api-link prop="filter-change"/> 事件就可以实现<br>
      如果是动态数据请通过 <table-api-link prop="setFilter"/> 方法更新，参数 <table-column-api-link prop="filters"/> 不支持动态数据<br>
      $panel 对象（<router-link  class="link" :to="{name: 'TableManualFilter'}">查看高级用法</router-link>）:<br>
      &nbsp;&nbsp;<span class="orange">changeOption(event, checked, option) 更新选项的状态</span><br>
      &nbsp;&nbsp;<span class="orange">confirmFilter() 确认筛选</span><br>
      &nbsp;&nbsp;<span class="orange">resetFilter() 清除筛选条件</span>
    </p>

    <vxe-table
      border
      highlight-hover-row
      ref="xTable1"
      :data="tableData"
      @filter-visible="filterVisibleEvent"
      @filter-change="filterChangeEvent">
      <vxe-column field="id" title="ID"></vxe-column>
      <vxe-column field="name" title="Name" sortable :filters="[]" :filter-method="filterNameMethod"></vxe-column>
      <vxe-column field="sex" title="Sex" sortable :filters="[{label: 'Man', value: '1'}, {label: 'Woman', value: '0'}]" :filter-multiple="false"></vxe-column>
      <vxe-column field="age" title="Age" :filters="[{ data: '' }]" :filter-method="filterAgeMethod">
        <template #filter="{ $panel, column }">
          <input type="type" v-for="(option, index) in column.filters" :key="index" v-model="option.data" @input="$panel.changeOption($event, !!option.data, option)">
        </template>
      </vxe-column>
      <vxe-column field="time" title="Time" sortable></vxe-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>

    <p class="tip">默认的筛选，通过 <table-column-api-link prop="checked"/> 属性设置默认的选中的选项</p>

    <vxe-table
      border
      highlight-hover-row
      :data="tableData">
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-colgroup title="基本信息">
        <vxe-column field="name" title="Name" sortable :filters="[{label: 'id大于10003', value: 10002}, {label: 'id大于10003', value: 10003, checked: true},{label: 'id大于10004', value: 10004},{label: 'id大于10005', value: 10005},{label: 'id大于10006', value: 10006},{label: 'id大于10007', value: 10007}]" :filter-method="filterNameMethod"></vxe-column>
        <vxe-column field="sex" title="Sex" sortable :filters="[{label: 'Man', value: '1'}, {label: 'Woman', value: '0'}]"></vxe-column>
      </vxe-colgroup>
      <vxe-colgroup title="其他">
        <vxe-colgroup title="详细信息">
          <vxe-colgroup field="age" title="Age" :filters="[{ data: '30' }]" :filter-method="filterAgeMethod">
            <template #filter="{ $panel, column }">
              <input type="type" v-for="(option, index) in column.filters" :key="index" v-model="option.data" @input="$panel.changeOption($event, !!option.data, option)">
            </template>
          </vxe-colgroup>
        </vxe-colgroup>
      </vxe-colgroup>
      <vxe-column field="time" title="Time" sortable :filters="[{label: '本周', value: '1'}, {label: '上周', value: '2'}]"></vxe-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[2] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[3] }}</pre-code>
    </pre>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, address: 'test abc' },
        { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: '0', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Test', sex: '1', age: 24, address: 'Shanghai' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: '0', age: 32, address: 'Shenzhen' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: '0', age: 28, address: 'Shanghai' }
      ],
      demoCodes: [
        `
        <vxe-table
          border
          highlight-hover-row
          ref="xTable1"
          :data="tableData"
          @filter-visible="filterVisibleEvent"
          @filter-change="filterChangeEvent">
          <vxe-column field="id" title="ID"></vxe-column>
          <vxe-column field="name" title="Name" sortable :filters="[]" :filter-method="filterNameMethod"></vxe-column>
          <vxe-column field="sex" title="Sex" sortable :filters="[{label: 'Man', value: '1'}, {label: 'Woman', value: '0'}]" :filter-multiple="false"></vxe-column>
          <vxe-column field="age" title="Age" :filters="[{ data: '' }]" :filter-method="filterAgeMethod">
            <template #filter="{ $panel, column }">
              <input type="type" v-for="(option, index) in column.filters" :key="index" v-model="option.data" @input="$panel.changeOption($event, !!option.data, option)">
            </template>
          </vxe-column>
          <vxe-column field="time" title="Time" sortable></vxe-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, address: 'test abc' },
                { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: '0', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: '1', age: 24, address: 'Shanghai' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: '0', age: 32, address: 'Shenzhen' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: '0', age: 28, address: 'Shanghai' }
              ]
            }
          },
          mounted () {
            // 异步加载筛选数据
            setTimeout(() => {
              const $table = this.$refs.xTable1
              if ($table) {
                const nameColumn = $table.getColumnByField('name')
                if (nameColumn) {
                  $table.setFilter(nameColumn, [
                    { label: 'id大于10002', value: 10002 },
                    { label: 'id大于10003', value: 10003 }
                  ])
                }
              }
            }, 500)
          },
          methods: {
            filterVisibleEvent ({ column, visible }) {
              console.log(\`\${column.property} \${visible ? '打开' : '关闭'}筛选面板\`)
            },
            filterChangeEvent ({ column }) {
              console.log(\`\${column.property} 筛选了数据\`)
            },
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
          :data="tableData">
          <vxe-column type="seq" width="60"></vxe-column>
          <vxe-colgroup title="基本信息">
            <vxe-column field="name" title="Name" sortable :filters="[{label: 'id大于10003', value: 10002}, {label: 'id大于10003', value: 10003, checked: true},{label: 'id大于10004', value: 10004},{label: 'id大于10005', value: 10005},{label: 'id大于10006', value: 10006},{label: 'id大于10007', value: 10007}]" :filter-method="filterNameMethod"></vxe-column>
            <vxe-column field="sex" title="Sex" sortable :filters="[{label: 'Man', value: '1'}, {label: 'Woman', value: '0'}]"></vxe-column>
          </vxe-colgroup>
          <vxe-colgroup title="其他">
            <vxe-colgroup title="详细信息">
              <vxe-colgroup field="age" title="Age" :filters="[{ data: '30' }]" :filter-method="filterAgeMethod">
                <template #filter="{ $panel, column }">
                  <input type="type" v-for="(option, index) in column.filters" :key="index" v-model="option.data" @input="$panel.changeOption($event, !!option.data, option)">
                </template>
              </vxe-colgroup>
            </vxe-colgroup>
          </vxe-colgroup>
          <vxe-column field="time" title="Time" sortable :filters="[{label: '本周', value: '1'}, {label: '上周', value: '2'}]"></vxe-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, address: 'test abc' },
                { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: '0', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: '1', age: 24, address: 'Shanghai' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: '0', age: 32, address: 'Shenzhen' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: '0', age: 28, address: 'Shanghai' }
              ]
            }
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
  mounted () {
    // 异步加载筛选数据
    setTimeout(() => {
      const $table = this.$refs.xTable1
      if ($table) {
        const nameColumn = $table.getColumnByField('name')
        if (nameColumn) {
          $table.setFilter(nameColumn, [
            { label: 'id大于10002', value: 10002 },
            { label: 'id大于10003', value: 10003 }
          ])
        }
      }
    }, 500)
  },
  methods: {
    filterVisibleEvent ({ column, visible }) {
      console.log(`${column.property} ${visible ? '打开' : '关闭'}筛选面板`)
    },
    filterChangeEvent ({ column }) {
      console.log(`${column.property} 筛选了数据`)
    },
    filterNameMethod ({ value, row }) {
      return row.id >= value
    },
    filterAgeMethod ({ option, row }) {
      return row.age === Number(option.data)
    }
  }
}
</script>
