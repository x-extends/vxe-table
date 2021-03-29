<template>
  <div>
    <p class="tip">多选表格，用户手动勾选时会触发事件 <table-api-link prop="checkbox-change"/></p>

    <vxe-toolbar>
      <template #buttons>
        <vxe-button @click="$refs.xTable1.toggleCheckboxRow(demo1.tableData[1])">切换第二行选中</vxe-button>
        <vxe-button @click="$refs.xTable1.setCheckboxRow([demo1.tableData[2], demo1.tableData[3]], true)">设置第三、四行选中</vxe-button>
        <vxe-button @click="$refs.xTable1.setAllCheckboxRow(true)">设置所有行选中</vxe-button>
        <vxe-button @click="$refs.xTable1.clearCheckboxRow()">清除所有行选中</vxe-button>
        <vxe-button @click="getSelectEvent1">获取选中</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      ref="xTable1"
      :data="demo1.tableData"
      @checkbox-all="selectAllChangeEvent1"
      @checkbox-change="selectChangeEvent1">
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
    </pre>

    <p class="tip">
      还可以通过 <table-api-link prop="checkMethod"/> 方法控制 checkbox 是否允许用户手动勾选，还可以配置 <table-api-link prop="labelField"/> 列显示属性<br>
    </p>

    <vxe-toolbar>
      <template #buttons>
        <vxe-button @click="$refs.xTable2.toggleCheckboxRow(demo2.tableData[0])">设置第一行选中（如果被禁用，不可选中）</vxe-button>
        <vxe-button @click="$refs.xTable2.toggleCheckboxRow(demo2.tableData[1])">切换第二行选中</vxe-button>
        <vxe-button @click="$refs.xTable2.setCheckboxRow([demo2.tableData[2], demo2.tableData[3]], true)">设置第三、四行选中</vxe-button>
        <vxe-button @click="$refs.xTable2.setAllCheckboxRow(true)">设置所有行选中</vxe-button>
        <vxe-button @click="$refs.xTable2.clearCheckboxRow()">清除所有行选中</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      ref="xTable2"
      :data="demo2.tableData"
      :checkbox-config="demo2.tableCheckboxConfig">
      <vxe-table-column type="checkbox" title="All"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[2] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[3] }}</pre-code>
    </pre>

    <p class="tip">当表格中不存在有效数据时列头复选框为禁用状态</p>

    <vxe-table
      border
      :data="demo3.tableData"
      :checkbox-config="demo3.tableCheckboxConfig">
      <vxe-table-column type="checkbox" title="All"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[4] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[5] }}</pre-code>
    </pre>

    <p class="tip">多选表格，通过配置 <table-api-link prop="trigger"/> 设置触发源，使用渲染最快的 <table-api-link prop="checkField"/> 属性绑定方式</p>

    <vxe-toolbar>
      <template #buttons>
        <vxe-button @click="$refs.xTable4.toggleCheckboxRow(demo4.tableData[1])">切换第二行选中</vxe-button>
        <vxe-button @click="$refs.xTable4.setCheckboxRow([demo4.tableData[2], demo4.tableData[3]], true)">设置第三、四行选中</vxe-button>
        <vxe-button @click="$refs.xTable4.setAllCheckboxRow(true)">设置所有行选中</vxe-button>
        <vxe-button @click="$refs.xTable4.clearCheckboxRow()">清除所有行选中</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      highlight-hover-row
      class="checkbox-table"
      ref="xTable4"
      :data="demo4.tableData"
      :checkbox-config="{checkField: 'checked', trigger: 'row'}">
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[6] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[7] }}</pre-code>
    </pre>

    <p class="tip">
      默认选中，通过指定 <table-api-link prop="checkRowKeys"/> 设置默认选中的行，指定默认值需要有 <table-api-link prop="row-id"/>，通过 <table-api-link prop="highlight"/> 设置高亮选中行<br>
      <span class="red">（注：默认行为只会在 reload 之后触发一次）</span>
    </p>

    <vxe-table
      border
      highlight-hover-row
      row-id="id"
      :data="demo5.tableData"
      :checkbox-config="{checkRowKeys: demo5.defaultSelecteRows5, highlight: true}"
      :radio-config="{labelField: 'name'}">
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column field="id" title="ID"></vxe-table-column>
      <vxe-table-column type="radio" width="300" title="Name"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[8] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[9] }}</pre-code>
    </pre>

    <p class="tip">通过 <table-api-link prop="checkStrictly"/> 设置父子节点不互相关联，启用后 <table-api-link prop="showHeader"/> 默认为 false</p>

    <vxe-toolbar>
      <template #buttons>
        <vxe-button @click="$refs.xTable6.setCheckboxRow(tableData6, true)">设置所有行选中</vxe-button>
        <vxe-button @click="$refs.xTable6.clearCheckboxRow()">清除所有行选中</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      highlight-hover-row
      ref="xTable6"
      :data="tableData6"
      :checkbox-config="{checkStrictly: true}">
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[10] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[11] }}</pre-code>
    </pre>

    <p class="tip">多选可单选同时使用</p>

    <vxe-table
      border
      highlight-hover-row
      :data="tableData7"
      :radio-config="{labelField: 'name'}">
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column type="radio" width="300" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[12] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[13] }}</pre-code>
    </pre>

    <p class="tip">不仅如此，还可以多种方式混合使用，通过 <table-api-link prop="range"/> 启用范围选中，通过鼠标按住复选框的列，向上或向下滑动选取，还可以同时按住 Ctrl 键局部选取</p>

    <vxe-table
      border
      resizable
      highlight-hover-row
      highlight-current-row
      height="300"
      :data="tableData8"
      :radio-config="{labelField: 'role'}"
      :checkbox-config="{labelField: 'name', highlight: true, range: true}">
      <vxe-table-column type="checkbox" title="Name"></vxe-table-column>
      <vxe-table-column type="radio" title="Role"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[14] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[15] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { VXETable } from '../../../../packages/all'
import { VxeTableInstance, VxeTableEvents, VxeTablePropTypes } from '../../../../types/index'

export default defineComponent({
  setup () {
    const demo1 = reactive({
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' }
      ]
    })

    const xTable1 = ref({} as VxeTableInstance)

    const selectAllChangeEvent1: VxeTableEvents.CheckboxAll = ({ checked, records }) => {
      console.log(checked ? '所有勾选事件' : '所有取消事件', records)
    }

    const selectChangeEvent1: VxeTableEvents.CheckboxChange = ({ checked, records }) => {
      console.log(checked ? '勾选事件' : '取消事件', records)
    }

    const getSelectEvent1 = () => {
      const $table = xTable1.value
      const selectRecords = $table.getCheckboxRecords()
      VXETable.modal.alert(`${selectRecords.length}条数据`)
    }

    const demo2 = reactive({
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' }
      ],
      tableCheckboxConfig: {
        labelField: 'name',
        checkMethod: ({ row }) => {
          return row.age > 26
        }
      } as VxeTablePropTypes.CheckboxConfig
    })

    const demo3 = reactive({
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' }
      ],
      tableCheckboxConfig: {
        labelField: 'name',
        checkMethod: () => {
          return false
        }
      } as VxeTablePropTypes.CheckboxConfig
    })

    const demo4 = reactive({
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃', checked: false },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou', checked: false },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai', checked: false },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃', checked: false },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai', checked: false }
      ]
    })

    const demo5 = reactive({
      defaultSelecteRows5: [10002, 10003],
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' }
      ]
    })

    const tableData6 = ref([
      { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
      { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
      { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
      { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃' },
      { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' }
    ])

    const tableData7 = ref([
      { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
      { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
      { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
      { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃' },
      { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' }
    ])

    const tableData8 = ref([
      { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
      { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
      { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
      { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃' },
      { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
      { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃' },
      { id: 10007, name: 'Test7', role: 'PM', sex: 'Women ', age: 38, address: 'Shanghai' },
      { id: 10008, name: 'Test8', role: 'Designer', sex: 'Man ', age: 24, address: 'vxe-table 从入门到放弃' },
      { id: 10009, name: 'Test9', role: 'Test', sex: 'Man ', age: 35, address: 'Shanghai' },
      { id: 10010, name: 'Test10', role: 'Develop', sex: 'Women ', age: 31, address: 'Shanghai' }
    ])

    return {
      demo1,
      xTable1,
      selectAllChangeEvent1,
      selectChangeEvent1,
      getSelectEvent1,
      demo2,
      demo3,
      demo4,
      demo5,
      tableData6,
      tableData7,
      tableData8,
      demoCodes: [
        `
        <vxe-toolbar>
          <template #buttons>
            <vxe-button @click="$refs.xTable1.toggleCheckboxRow(demo1.tableData[1])">切换第二行选中</vxe-button>
            <vxe-button @click="$refs.xTable1.setCheckboxRow([demo1.tableData[2], demo1.tableData[3]], true)">设置第三、四行选中</vxe-button>
            <vxe-button @click="$refs.xTable1.setAllCheckboxRow(true)">设置所有行选中</vxe-button>
            <vxe-button @click="$refs.xTable1.clearCheckboxRow()">清除所有行选中</vxe-button>
            <vxe-button @click="getSelectEvent1">获取选中</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          ref="xTable1"
          :data="demo1.tableData"
          @checkbox-all="selectAllChangeEvent1"
          @checkbox-change="selectChangeEvent1">
          <vxe-table-column type="checkbox" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
          <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive, ref } from 'vue'
        import { VXETable, VxeTableInstance, VxeTableEvents } from 'vxe-table'

        export default defineComponent({
          setup () {
            const demo1 = reactive({
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' }
              ]
            })

            const xTable1 = ref({} as VxeTableInstance)

            const selectAllChangeEvent1: VxeTableEvents.CheckboxAll = ({ checked, records }: any) => {
              console.log(checked ? '所有勾选事件' : '所有取消事件', records)
            }

            const selectChangeEvent1: VxeTableEvents.CheckboxChange = ({ checked, records }: any) => {
              console.log(checked ? '勾选事件' : '取消事件', records)
            }

            const getSelectEvent1 = () => {
              const $table = xTable1.value
              const selectRecords = $table.getCheckboxRecords()
              VXETable.modal.alert(\`\${selectRecords.length}条数据\`)
            }

            return {
              demo1,
              xTable1,
              selectAllChangeEvent1,
              selectChangeEvent1,
              getSelectEvent1
            }
          }
        })
        `,
        `
        <vxe-toolbar>
          <template #buttons>
            <vxe-button @click="$refs.xTable2.toggleCheckboxRow(demo2.tableData[0])">设置第一行选中（如果被禁用，不可选中）</vxe-button>
            <vxe-button @click="$refs.xTable2.toggleCheckboxRow(demo2.tableData[1])">切换第二行选中</vxe-button>
            <vxe-button @click="$refs.xTable2.setCheckboxRow([demo2.tableData[2], demo2.tableData[3]], true)">设置第三、四行选中</vxe-button>
            <vxe-button @click="$refs.xTable2.setAllCheckboxRow(true)">设置所有行选中</vxe-button>
            <vxe-button @click="$refs.xTable2.clearCheckboxRow()">清除所有行选中</vxe-button>
          </template>
        </vxe-toolbar>

        vxe-table
          border
          ref="xTable2"
          :data="demo2.tableData"
          :checkbox-config="demo2.tableCheckboxConfig">
          <vxe-table-column type="checkbox" title="All"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
          <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive } from 'vue'
        import { VxeTablePropTypes } from 'vxe-table'

        export default defineComponent({
          setup () {
            const demo2 = reactive({
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' }
              ],
              tableCheckboxConfig: {
                labelField: 'name',
                checkMethod: ({ row }: any) => {
                  return row.age > 26
                }
              } as VxeTablePropTypes.CheckboxConfig
            })

            return {
              demo2
            }
          }
        })
        `,
        `
        <vxe-table
          border
          :data="demo3.tableData"
          :checkbox-config="demo3.tableCheckboxConfig">
          <vxe-table-column type="checkbox" title="All"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
          <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive } from 'vue'
        import { VxeTablePropTypes } from 'vxe-table'

        export default defineComponent({
          setup () {
            const demo3 = reactive({
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' }
              ],
              tableCheckboxConfig: {
                labelField: 'name',
                checkMethod: () => {
                  return false
                }
              } as VxeTablePropTypes.CheckboxConfig
            })

            return {
              demo3
            }
          }
        })
        `,
        `
        <vxe-toolbar>
          <template #buttons>
            <vxe-button @click="$refs.xTable4.toggleCheckboxRow(demo4.tableData[1])">切换第二行选中</vxe-button>
            <vxe-button @click="$refs.xTable4.setCheckboxRow([demo4.tableData[2], demo4.tableData[3]], true)">设置第三、四行选中</vxe-button>
            <vxe-button @click="$refs.xTable4.setAllCheckboxRow(true)">设置所有行选中</vxe-button>
            <vxe-button @click="$refs.xTable4.clearCheckboxRow()">清除所有行选中</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          highlight-hover-row
          class="checkbox-table"
          ref="xTable4"
          :data="demo4.tableData"
          :checkbox-config="{checkField: 'checked', trigger: 'row'}">
          <vxe-table-column type="checkbox" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
          <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive } from 'vue'

        export default defineComponent({
          setup () {
            const demo4 = reactive({
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃', checked: false },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou', checked: false },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai', checked: false },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃', checked: false },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai', checked: false }
              ]
            })

            return {
              demo4
            }
          }
        })
        `,
        `
        <vxe-table
          border
          highlight-hover-row
          row-id="id"
          :data="demo5.tableData"
          :checkbox-config="{checkRowKeys: demo5.defaultSelecteRows5, highlight: true}"
          :radio-config="{labelField: 'name'}">
          <vxe-table-column type="checkbox" width="60"></vxe-table-column>
          <vxe-table-column field="id" title="ID"></vxe-table-column>
          <vxe-table-column type="radio" width="300" title="Name"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
          <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive } from 'vue'

        export default defineComponent({
          setup () {
            const demo5 = reactive({
              defaultSelecteRows5: [10002, 10003],
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' }
              ]
            })

            return {
              demo5
            }
          }
        })
        `,
        `
        <vxe-toolbar>
          <template #buttons>
            <vxe-button @click="$refs.xTable6.setCheckboxRow(tableData6, true)">设置所有行选中</vxe-button>
            <vxe-button @click="$refs.xTable6.clearCheckboxRow()">清除所有行选中</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          highlight-hover-row
          ref="xTable6"
          :data="tableData6"
          :checkbox-config="{checkStrictly: true}">
          <vxe-table-column type="checkbox" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
          <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, ref } from 'vue'

        export default defineComponent({
          setup () {
            const tableData6 = ref([
              { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
              { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
              { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
              { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃' },
              { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' }
            ])

            return {
              tableData6
            }
          }
        })
        `,
        `
        <vxe-table
          border
          highlight-hover-row
          :data="tableData7"
          :radio-config="{labelField: 'name'}">
          <vxe-table-column type="checkbox" width="60"></vxe-table-column>
          <vxe-table-column type="radio" width="300" title="Name"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
          <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, ref } from 'vue'

        export default defineComponent({
          setup () {
            const tableData7 = ref([
              { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
              { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
              { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
              { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃' },
              { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' }
            ])

            return {
              tableData7
            }
          }
        })
        `,
        `
        <vxe-table
          border
          resizable
          highlight-hover-row
          highlight-current-row
          height="300"
          :data="tableData8"
          :radio-config="{labelField: 'role'}"
          :checkbox-config="{labelField: 'name', highlight: true, range: true}">
          <vxe-table-column type="checkbox" title="Name"></vxe-table-column>
          <vxe-table-column type="radio" title="Role"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
          <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, ref } from 'vue'

        export default defineComponent({
          setup () {
            const tableData8 = ref([
              { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
              { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
              { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
              { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃' },
              { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
              { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃' },
              { id: 10007, name: 'Test7', role: 'PM', sex: 'Women ', age: 38, address: 'Shanghai' },
              { id: 10008, name: 'Test8', role: 'Designer', sex: 'Man ', age: 24, address: 'vxe-table 从入门到放弃' },
              { id: 10009, name: 'Test9', role: 'Test', sex: 'Man ', age: 35, address: 'Shanghai' },
              { id: 10010, name: 'Test10', role: 'Develop', sex: 'Women ', age: 31, address: 'Shanghai' }
            ])

            return {
              tableData8
            }
          }
        })
        `
      ]
    }
  }
})
</script>
