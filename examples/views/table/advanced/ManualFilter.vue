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
      :loading="demo1.loading"
      :data="demo1.tableData">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column
        field="name"
        title="Name"
        sortable
        :filters="[{ label: '包含 6', value: '6' }, { label: '包含 4', value: '4' }]"
        :filter-method="filterNameMethod"></vxe-table-column>
      <vxe-table-column
        field="role"
        title="Role"
        sortable
        :filters="[{ data: '' }]"
        :filter-method="filterRoleMethod">
        <template #filter="{ $panel, column }">
          <select class="my-select" v-model="option.data" v-for="(option, index) in column.filters" :key="index" @change="$panel.changeOption($event, !!option.data, option)">
            <option v-for="(label, cIndex) in demo1.roleList" :key="cIndex" :value="label">{{ label }}</option>
          </select>
        </template>
      </vxe-table-column>
      <vxe-table-column
        field="sex"
        title="Sex"
        sortable
        :filter-multiple="false"
        :filters="[{label: 'Man', value: 'Man'}, {label: 'Women', value: 'Women'}]"></vxe-table-column>
      <vxe-table-column field="age" title="Age" :filters="[{ data: '' }]" :filter-method="filterAgeMethod" :filter-recover-method="filterAgeRecoverMethod">
        <template #filter="{ $panel, column }">
          <input class="my-input" type="type" v-for="(option, index) in column.filters" :key="index" v-model="option.data" @input="$panel.changeOption($event, !!option.data, option)" @keyup.enter="$panel.confirmFilter()" placeholder="按回车确认筛选">
        </template>
      </vxe-table-column>
      <vxe-table-column field="time" title="Time" sortable></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
      <pre-code class="css">{{ demoCodes[2] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { VxeTableInstance, VxeColumnPropTypes, VxeButtonEvents } from '../../../../types/index'
import XEUtils from 'xe-utils'

export default defineComponent({
  setup () {
    const demo1 = reactive({
      loading: false,
      tableData: [] as any[],
      roleList: ['', 'Develop', 'PM', 'Test']
    })

    const xTable = ref({} as VxeTableInstance)

    const findList = () => {
      demo1.loading = true
      return new Promise(resolve => {
        setTimeout(() => {
          demo1.tableData = [
            { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
            { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
            { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
            { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 36, address: 'Guangzhou' },
            { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 24, address: 'Shanghai' },
            { id: 10006, name: 'Test6', role: 'Designer', sex: 'Man ', age: 34, address: 'vxe-table 从入门到放弃' },
            { id: 10007, name: 'Test7', role: 'PM', sex: 'Man ', age: 32, address: 'Shanghai' },
            { id: 10008, name: 'Test8', role: 'Designer', sex: 'Man ', age: 30, address: 'Guangzhou' },
            { id: 10009, name: 'Test9', role: 'Test', sex: 'Women ', age: 28, address: 'vxe-table 从入门到放弃' },
            { id: 100010, name: 'Test10', role: 'Test', sex: 'Man ', age: 24, address: 'Shanghai' }
          ]
          demo1.loading = false
          resolve(demo1.tableData)
        }, 300)
      })
    }

    const filterNameMethod: VxeColumnPropTypes.FilterMethod = ({ value, row }) => {
      return XEUtils.toValueString(row.name).toLowerCase().indexOf(value) > -1
    }

    const filterRoleMethod: VxeColumnPropTypes.FilterMethod = ({ option, row }) => {
      return row.role === option.data
    }

    const filterAgeMethod: VxeColumnPropTypes.FilterMethod = ({ option, row }) => {
      return row.age === Number(option.data)
    }

    const filterAgeRecoverMethod: VxeColumnPropTypes.FilterRecoverMethod = ({ option }) => {
      // 如果是自定义筛选模板，当为点击确认时，该选项将被恢复为默认值
      option.data = ''
    }

    const updateNameFilterEvent: VxeButtonEvents.Click = () => {
      const $table = xTable.value
      const column = $table.getColumnByField('name')
      if (column) {
        // 修改筛选列表，并默认设置为选中状态
        $table.setFilter(column, [
          { label: '包含 0', value: '0' },
          { label: '包含 1', value: '1' },
          { label: '包含 2', value: '2', checked: true },
          { label: '包含 3', value: '3' },
          { label: '包含 4', value: '4' }
        ])
        // 修改条件之后，需要手动调用 updateData 处理表格数据
        $table.updateData()
      }
    }

    const filterNameEvent: VxeButtonEvents.Click = () => {
      const $table = xTable.value
      const column = $table.getColumnByField('name')
      if (column) {
        // 修改第二个选项为勾选状态
        const option = column.filters[1]
        option.checked = true
        // 修改条件之后，需要手动调用 updateData 处理表格数据
        $table.updateData()
      }
    }

    const filterAgeEvent: VxeButtonEvents.Click = () => {
      const $table = xTable.value
      const column = $table.getColumnByField('age')
      if (column) {
        // 修改第一个选项为勾选状态
        const option = column.filters[0]
        option.data = '32'
        option.checked = true
        // 修改条件之后，需要手动调用 updateData 处理表格数据
        $table.updateData()
      }
    }

    findList()

    return {
      demo1,
      xTable,
      filterNameMethod,
      filterRoleMethod,
      filterAgeMethod,
      filterAgeRecoverMethod,
      updateNameFilterEvent,
      filterNameEvent,
      filterAgeEvent,
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
          :loading="demo1.loading"
          :data="demo1.tableData">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column
            field="name"
            title="Name"
            sortable
            :filters="[{ label: '包含 6', value: '6' }, { label: '包含 4', value: '4' }]"
            :filter-method="filterNameMethod"></vxe-table-column>
          <vxe-table-column
            field="role"
            title="Role"
            sortable
            :filters="[{ data: '' }]"
            :filter-method="filterRoleMethod">
            <template #filter="{ $panel, column }">
              <select class="my-select" v-model="option.data" v-for="(option, index) in column.filters" :key="index" @change="$panel.changeOption($event, !!option.data, option)">
                <option v-for="(label, cIndex) in demo1.roleList" :key="cIndex" :value="label">{{ label }}</option>
              </select>
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="sex"
            title="Sex"
            sortable
            :filter-multiple="false"
            :filters="[{label: 'Man', value: 'Man'}, {label: 'Women', value: 'Women'}]"></vxe-table-column>
          <vxe-table-column field="age" title="Age" :filters="[{ data: '' }]" :filter-method="filterAgeMethod" :filter-recover-method="filterAgeRecoverMethod">
            <template #filter="{ $panel, column }">
              <input class="my-input" type="type" v-for="(option, index) in column.filters" :key="index" v-model="option.data" @input="$panel.changeOption($event, !!option.data, option)" @keyup.enter="$panel.confirmFilter()" placeholder="按回车确认筛选">
            </template>
          </vxe-table-column>
          <vxe-table-column field="time" title="Time" sortable></vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive, ref } from 'vue'
        import { VxeTableInstance, VxeButtonEvents, VxeColumnPropTypes } from 'vxe-table'
        import XEUtils from 'xe-utils'

        export default defineComponent({
          setup () {
            const demo1 = reactive({
              loading: false,
              tableData: [] as any[],
              roleList: ['', 'Develop', 'PM', 'Test']
            })

            const xTable = ref({} as VxeTableInstance)

            const findList = () => {
              demo1.loading = true
              return new Promise(resolve => {
                setTimeout(() => {
                  demo1.tableData = [
                    { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
                    { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                    { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                    { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 36, address: 'Guangzhou' },
                    { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 24, address: 'Shanghai' },
                    { id: 10006, name: 'Test6', role: 'Designer', sex: 'Man ', age: 34, address: 'vxe-table 从入门到放弃' },
                    { id: 10007, name: 'Test7', role: 'PM', sex: 'Man ', age: 32, address: 'Shanghai' },
                    { id: 10008, name: 'Test8', role: 'Designer', sex: 'Man ', age: 30, address: 'Guangzhou' },
                    { id: 10009, name: 'Test9', role: 'Test', sex: 'Women ', age: 28, address: 'vxe-table 从入门到放弃' },
                    { id: 100010, name: 'Test10', role: 'Test', sex: 'Man ', age: 24, address: 'Shanghai' }
                  ]
                  demo1.loading = false
                  resolve(demo1.tableData)
                }, 300)
              })
            }

            const filterNameMethod: VxeColumnPropTypes.FilterMethod = ({ value, row }) => {
              return XEUtils.toValueString(row.name).toLowerCase().indexOf(value) > -1
            }

            const filterRoleMethod: VxeColumnPropTypes.FilterMethod = ({ option, row }) => {
              return row.role === option.data
            }

            const filterAgeMethod: VxeColumnPropTypes.FilterMethod = ({ option, row }) => {
              return row.age === Number(option.data)
            }

            const filterAgeRecoverMethod: VxeColumnPropTypes.FilterRecoverMethod = ({ option }) => {
              // 如果是自定义筛选模板，当为点击确认时，该选项将被恢复为默认值
              option.data = ''
            }

            const updateNameFilterEvent: VxeButtonEvents.Click = () => {
              const $table = xTable.value
              const column = $table.getColumnByField('name')
              if (column) {
                // 修改筛选列表，并默认设置为选中状态
                $table.setFilter(column, [
                  { label: '包含 0', value: '0' },
                  { label: '包含 1', value: '1' },
                  { label: '包含 2', value: '2', checked: true },
                  { label: '包含 3', value: '3' },
                  { label: '包含 4', value: '4' }
                ])
                // 修改条件之后，需要手动调用 updateData 处理表格数据
                $table.updateData()
              }
            }

            const filterNameEvent: VxeButtonEvents.Click = () => {
              const $table = xTable.value
              const column = $table.getColumnByField('name')
              if (column) {
                // 修改第二个选项为勾选状态
                const option = column.filters[1]
                option.checked = true
                // 修改条件之后，需要手动调用 updateData 处理表格数据
                $table.updateData()
              }
            }

            const filterAgeEvent: VxeButtonEvents.Click = () => {
              const $table = xTable.value
              const column = $table.getColumnByField('age')
              if (column) {
                // 修改第一个选项为勾选状态
                const option = column.filters[0]
                option.data = '32'
                option.checked = true
                // 修改条件之后，需要手动调用 updateData 处理表格数据
                $table.updateData()
              }
            }

            findList()

            return {
              demo1,
              xTable,
              filterNameMethod,
              filterRoleMethod,
              filterAgeMethod,
              filterAgeRecoverMethod,
              updateNameFilterEvent,
              filterNameEvent,
              filterAgeEvent
            }
          }
        })
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
  }
})
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
