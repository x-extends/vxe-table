<template>
  <div>
    <p class="tip">多选表格，用户手动勾选时会触发事件 <table-api-link prop="checkbox-change"/></p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="$refs.xTable1.toggleCheckboxRow(tableData[1])">切换第二行选中</vxe-button>
        <vxe-button @click="$refs.xTable1.setCheckboxRow([tableData[2], tableData[3]], true)">设置第三、四行选中</vxe-button>
        <vxe-button @click="$refs.xTable1.setAllCheckboxRow(true)">设置所有行选中</vxe-button>
        <vxe-button @click="$refs.xTable1.clearCheckboxRow()">清除所有行选中</vxe-button>
        <vxe-button @click="getSelectEvent1">获取选中</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      ref="xTable1"
      :data="tableData"
      @checkbox-all="selectAllEvent"
      @checkbox-change="selectChangeEvent">
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p class="tip">
      还可以通过 <table-api-link prop="checkMethod"/> 方法控制 checkbox 是否允许用户手动勾选，还可以配置 <table-api-link prop="labelField"/> 列显示属性<br>
    </p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="$refs.xTable2.toggleCheckboxRow(tableData[0])">设置第一行选中（如果被禁用，不可选中）</vxe-button>
        <vxe-button @click="$refs.xTable2.toggleCheckboxRow(tableData[1])">切换第二行选中</vxe-button>
        <vxe-button @click="$refs.xTable2.setCheckboxRow([tableData[2], tableData[3]], true)">设置第三、四行选中</vxe-button>
        <vxe-button @click="$refs.xTable2.setAllCheckboxRow(true)">设置所有行选中</vxe-button>
        <vxe-button @click="$refs.xTable2.clearCheckboxRow()">清除所有行选中</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      ref="xTable2"
      :data="tableData"
      :checkbox-config="{labelField: 'name', checkMethod: checCheckboxkMethod2}">
      <vxe-table-column type="checkbox" title="All"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[2] }}</code>
      <code class="javascript">{{ demoCodes[3] }}</code>
    </pre>

    <p class="tip">还可以通过 <table-api-link prop="strict"/> 设置为严格模式，当表格中不存在有效数据时列头复选框为禁用状态</p>

    <vxe-table
      border
      :data="tableData"
      :checkbox-config="{labelField: 'name', strict: true, checkMethod:checCheckboxkMethod3}">
      <vxe-table-column type="checkbox" title="All"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[4] }}</code>
      <code class="javascript">{{ demoCodes[5] }}</code>
    </pre>

    <p class="tip">多选表格，通过配置 <table-api-link prop="trigger"/> 设置触发源，使用渲染最快的 <table-api-link prop="checkField"/> 属性绑定方式</p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="$refs.xTable4.toggleCheckboxRow(tableData[1])">切换第二行选中</vxe-button>
        <vxe-button @click="$refs.xTable4.setCheckboxRow([tableData[2], tableData[3]], true)">设置第三、四行选中</vxe-button>
        <vxe-button @click="$refs.xTable4.setAllCheckboxRow(true)">设置所有行选中</vxe-button>
        <vxe-button @click="$refs.xTable4.clearCheckboxRow()">清除所有行选中</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      highlight-hover-row
      class="checkbox-table"
      ref="xTable4"
      :data="tableData"
      :checkbox-config="{checkField: 'checked', trigger: 'row'}">
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[6] }}</code>
      <code class="javascript">{{ demoCodes[7] }}</code>
    </pre>

    <p class="tip">
      默认选中，通过指定 <table-api-link prop="checkRowKeys"/> 设置默认选中的行，指定默认值需要有 <table-api-link prop="row-id"/>，通过 <table-api-link prop="highlight"/> 设置高亮选中行<br>
      <span class="red">（注：默认行为只会在 reload 之后触发一次）</span>
    </p>

    <vxe-table
      border
      highlight-hover-row
      row-id="id"
      :data="tableData"
      :checkbox-config="{checkRowKeys: defaultSelecteRows, highlight: true}"
      :radio-config="{labelField: 'name'}">
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column field="id" title="ID"></vxe-table-column>
      <vxe-table-column type="radio" width="300" title="Name"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[8] }}</code>
      <code class="javascript">{{ demoCodes[9] }}</code>
    </pre>

    <p class="tip">通过 <table-api-link prop="checkStrictly"/> 设置父子节点不互相关联，启用后 <table-api-link prop="showHeader"/> 默认为 false</p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="$refs.xTable6.setCheckboxRow(tableData, true)">设置所有行选中</vxe-button>
        <vxe-button @click="$refs.xTable6.clearCheckboxRow()">清除所有行选中</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      highlight-hover-row
      ref="xTable6"
      :data="tableData"
      :checkbox-config="{checkStrictly: true}">
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[10] }}</code>
      <code class="javascript">{{ demoCodes[11] }}</code>
    </pre>

    <p class="tip">多选可单选同时使用</p>

    <vxe-table
      border
      highlight-hover-row
      :data="tableData"
      :radio-config="{labelField: 'name'}">
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column type="radio" width="300" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[12] }}</code>
      <code class="javascript">{{ demoCodes[13] }}</code>
    </pre>

    <p class="tip">不仅如此，还可以多种方式混合使用，通过 <table-api-link prop="range"/> 启用范围选中</p>

    <vxe-table
      border
      resizable
      highlight-hover-row
      highlight-current-row
      :data="tableData"
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
      <code class="xml">{{ demoCodes[14] }}</code>
      <code class="javascript">{{ demoCodes[15] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  data () {
    return {
      defaultSelecteRows: [10002, 10003],
      isCheckboxStrict: false,
      isAllCheckboxDisabled: false,
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' }
      ],
      demoCodes: [
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button @click="$refs.xTable1.toggleCheckboxRow(tableData[1])">切换第二行选中</vxe-button>
            <vxe-button @click="$refs.xTable1.setCheckboxRow([tableData[2], tableData[3]], true)">设置第三、四行选中</vxe-button>
            <vxe-button @click="$refs.xTable1.setAllCheckboxRow(true)">设置所有行选中</vxe-button>
            <vxe-button @click="$refs.xTable1.clearCheckboxRow()">清除所有行选中</vxe-button>
            <vxe-button @click="getSelectEvent1">获取选中</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          ref="xTable1"
          :data="tableData"
          @checkbox-all="selectAllEvent"
          @checkbox-change="selectChangeEvent">
          <vxe-table-column type="checkbox" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
          <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' }
              ]
            }
          },
          methods: {
            selectAllEvent ({ checked, records }) {
              console.log(checked ? '所有勾选事件' : '所有取消事件', records)
            },
            selectChangeEvent ({ checked, records }) {
              console.log(checked ? '勾选事件' : '取消事件', records)
            },
            getSelectEvent () {
              let selectRecords = this.$refs.xTable1.getCheckboxRecords()
              this.$XModal.alert(selectRecords.length)
            }
          }
        }
        `,
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button @click="$refs.xTable2.toggleCheckboxRow(tableData[0])">设置第一行选中（如果被禁用，不可选中）</vxe-button>
            <vxe-button @click="$refs.xTable2.toggleCheckboxRow(tableData[1])">切换第二行选中</vxe-button>
            <vxe-button @click="$refs.xTable2.setCheckboxRow([tableData[2], tableData[3]], true)">设置第三、四行选中</vxe-button>
            <vxe-button @click="$refs.xTable2.setAllCheckboxRow(true)">设置所有行选中</vxe-button>
            <vxe-button @click="$refs.xTable2.clearCheckboxRow()">清除所有行选中</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          ref="xTable2"
          :data="tableData"
          :checkbox-config="{labelField: 'name', checkMethod: checCheckboxkMethod2}">
          <vxe-table-column type="checkbox" title="All"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
          <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' }
              ]
            }
          },
          methods: {
            checCheckboxkMethod2 ({ row }) {
              return row.age > 26
            }
          }
        }
        `,
        `
        <vxe-table
          border
          :data="tableData"
          :checkbox-config="{labelField: 'name', strict: true, checkMethod: checCheckboxkMethod3}">
          <vxe-table-column type="checkbox" title="All"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
          <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' }
              ]
            }
          },
          methods: {
            checCheckboxkMethod3 () {
              return false
            }
          }
        }
        `,
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button @click="$refs.xTable4.toggleCheckboxRow(tableData[1])">切换第二行选中</vxe-button>
            <vxe-button @click="$refs.xTable4.setCheckboxRow([tableData[2], tableData[3]], true)">设置第三、四行选中</vxe-button>
            <vxe-button @click="$refs.xTable4.setAllCheckboxRow(true)">设置所有行选中</vxe-button>
            <vxe-button @click="$refs.xTable4.clearCheckboxRow()">清除所有行选中</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          highlight-hover-row
          class="checkbox-table"
          ref="xTable4"
          :data="tableData"
          :checkbox-config="{checkField: 'checked', trigger: 'row'}">
          <vxe-table-column type="checkbox" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
          <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' }
              ]
            }
          }
        }
        `,
        `
        <vxe-table
          border
          highlight-hover-row
          row-id="id"
          :data="tableData"
          :checkbox-config="{checkRowKeys: defaultSelecteRows, highlight: true}"
          :radio-config="{labelField: 'name'}">
          <vxe-table-column type="checkbox" width="60"></vxe-table-column>
          <vxe-table-column field="id" title="ID"></vxe-table-column>
          <vxe-table-column type="radio" width="300" title="Name"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
          <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              defaultSelecteRows: [10002, 10003],
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' }
              ]
            }
          }
        }
        `,
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button @click="$refs.xTable6.setCheckboxRow(tableData, true)">设置所有行选中</vxe-button>
            <vxe-button @click="$refs.xTable6.clearCheckboxRow()">清除所有行选中</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          highlight-hover-row
          ref="xTable6"
          :data="tableData"
          :checkbox-config="{checkStrictly: true}">
          <vxe-table-column type="checkbox" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
          <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' }
              ]
            }
          }
        }
        `,
        `
        <vxe-table
          border
          highlight-hover-row
          :data="tableData"
          :radio-config="{labelField: 'name'}">
          <vxe-table-column type="checkbox" width="60"></vxe-table-column>
          <vxe-table-column type="radio" width="300" title="Name"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
          <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' }
              ]
            }
          }
        }
        `,
        `
        <vxe-table
          border
          resizable
          highlight-hover-row
          highlight-current-row
          :data="tableData"
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
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' }
              ]
            }
          }
        }
        `
      ]
    }
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    checCheckboxkMethod2 ({ row }) {
      return row.age > 26
    },
    checCheckboxkMethod3 () {
      return false
    },
    selectAllEvent ({ checked, records }) {
      console.log(checked ? '所有勾选事件' : '所有取消事件', records)
    },
    selectChangeEvent ({ checked, records }) {
      console.log(checked ? '勾选事件' : '取消事件', records)
    },
    getSelectEvent1 () {
      const selectRecords = this.$refs.xTable1.getCheckboxRecords()
      this.$XModal.alert(selectRecords.length)
    }
  }
}
</script>
