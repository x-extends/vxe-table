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
      :data="demo1.tableData">
      <vxe-table-column field="id" title="ID"></vxe-table-column>
      <vxe-table-column field="name" title="Name" sortable :filters="[{label: 'id大于10002', value: 10002}, {label: 'id大于10003', value: 10003}]" :filter-method="filterNameMethod"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" sortable :filters="[{label: 'Man', value: '1'}, {label: 'Woman', value: '0'}]" :filter-multiple="false"></vxe-table-column>
      <vxe-table-column field="age" title="Age" :filters="[{ data: '' }]" :filter-method="filterAgeMethod">
        <template #filter="{ $panel, column }">
          <input type="type" v-for="(option, index) in column.filters" :key="index" v-model="option.data" @input="$panel.changeOption($event, !!option.data, option)">
        </template>
      </vxe-table-column>
      <vxe-table-column field="time" title="Time" sortable></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
    </pre>

    <p class="tip">默认的筛选，通过 <table-column-api-link prop="checked"/> 属性设置默认的选中的选项</p>

    <vxe-table
      border
      highlight-hover-row
      :data="demo2.tableData">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-colgroup title="基本信息">
        <vxe-table-column field="name" title="Name" sortable :filters="[{label: 'id大于10003', value: 10002}, {label: 'id大于10003', value: 10003, checked: true}]" :filter-method="filterNameMethod"></vxe-table-column>
        <vxe-table-column field="sex" title="Sex" sortable :filters="[{label: 'Man', value: '1'}, {label: 'Woman', value: '0'}]"></vxe-table-column>
      </vxe-table-colgroup>
      <vxe-table-colgroup title="其他">
        <vxe-table-colgroup title="详细信息">
          <vxe-table-colgroup field="age" title="Age" :filters="[{ data: '30' }]" :filter-method="filterAgeMethod">
            <template #filter="{ $panel, column }">
              <input type="type" v-for="(option, index) in column.filters" :key="index" v-model="option.data" @input="$panel.changeOption($event, !!option.data, option)">
            </template>
          </vxe-table-colgroup>
        </vxe-table-colgroup>
      </vxe-table-colgroup>
      <vxe-table-column field="time" title="Time" sortable :filters="[{label: '本周', value: '1'}, {label: '上周', value: '2'}]"></vxe-table-column>
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
import { VxeColumnPropTypes } from '../../../../types/index'

export default defineComponent({
  setup () {
    const demo1 = reactive({
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, address: 'vxe-table 从入门到放弃' },
        { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: '0', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: '1', age: 24, address: 'Shanghai' }
      ]
    })

    const demo2 = reactive({
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, address: 'vxe-table 从入门到放弃' },
        { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: '0', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: '1', age: 24, address: 'Shanghai' }
      ]
    })

    const filterNameMethod: VxeColumnPropTypes.FilterMethod = ({ value, row }) => {
      return row.id >= value
    }

    const filterAgeMethod: VxeColumnPropTypes.FilterMethod = ({ option, row }) => {
      return row.age === Number(option.data)
    }

    return {
      demo1,
      demo2,
      filterNameMethod,
      filterAgeMethod,
      demoCodes: [
        `
        <vxe-table
          border
          highlight-hover-row
          :data="demo1.tableData">
          <vxe-table-column field="id" title="ID"></vxe-table-column>
          <vxe-table-column field="name" title="Name" sortable :filters="[{label: 'id大于10002', value: 10002}, {label: 'id大于10003', value: 10003}]" :filter-method="filterNameMethod"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" sortable :filters="[{label: 'Man', value: '1'}, {label: 'Woman', value: '0'}]" :filter-multiple="false"></vxe-table-column>
          <vxe-table-column field="age" title="Age" :filters="[{ data: '' }]" :filter-method="filterAgeMethod">
            <template #filter="{ $panel, column }">
              <input type="type" v-for="(option, index) in column.filters" :key="index" v-model="option.data" @input="$panel.changeOption($event, !!option.data, option)">
            </template>
          </vxe-table-column>
          <vxe-table-column field="time" title="Time" sortable></vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive } from 'vue'
        import { VxeColumnPropTypes } from '../../../../types/index'

        export default defineComponent({
          setup () {
            const demo1 = reactive({
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, address: 'vxe-table 从入门到放弃' },
                { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: '0', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: '1', age: 24, address: 'Shanghai' }
              ]
            })

            const filterNameMethod: VxeColumnPropTypes.FilterMethod = ({ value, row }) => {
              return row.id >= value
            }

            const filterAgeMethod: VxeColumnPropTypes.FilterMethod = ({ option, row }) => {
              return row.age === Number(option.data)
            }

            return {
              demo1,
              filterNameMethod,
              filterAgeMethod
            }
          }
        })
        `,
        `
        <vxe-table
          border
          highlight-hover-row
          :data="demo2.tableData">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-colgroup title="基本信息">
            <vxe-table-column field="name" title="Name" sortable :filters="[{label: 'id大于10003', value: 10002}, {label: 'id大于10003', value: 10003, checked: true}]" :filter-method="filterNameMethod"></vxe-table-column>
            <vxe-table-column field="sex" title="Sex" sortable :filters="[{label: 'Man', value: '1'}, {label: 'Woman', value: '0'}]"></vxe-table-column>
          </vxe-table-colgroup>
          <vxe-table-colgroup title="其他">
            <vxe-table-colgroup title="详细信息">
              <vxe-table-colgroup field="age" title="Age" :filters="[{ data: '30' }]" :filter-method="filterAgeMethod">
                <template #filter="{ $panel, column }">
                  <input type="type" v-for="(option, index) in column.filters" :key="index" v-model="option.data" @input="$panel.changeOption($event, !!option.data, option)">
                </template>
              </vxe-table-colgroup>
            </vxe-table-colgroup>
          </vxe-table-colgroup>
          <vxe-table-column field="time" title="Time" sortable :filters="[{label: '本周', value: '1'}, {label: '上周', value: '2'}]"></vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive } from 'vue'
        import { VxeColumnPropTypes } from 'vxe-table'

        export default defineComponent({
          setup () {
            const demo1 = reactive({
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, address: 'vxe-table 从入门到放弃' },
                { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: '0', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: '1', age: 24, address: 'Shanghai' }
              ]
            })

            const filterNameMethod: VxeColumnPropTypes.FilterMethod = ({ value, row }) => {
              return row.id >= value
            }

            const filterAgeMethod: VxeColumnPropTypes.FilterMethod = ({ option, row }) => {
              return row.age === Number(option.data)
            }

            return {
              demo1,
              filterNameMethod,
              filterAgeMethod
            }
          }
        })
        `
      ]
    }
  }
})
</script>
