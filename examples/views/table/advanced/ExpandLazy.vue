<template>
  <div>
    <p class="tip">展开行的懒加载，通过配置 <table-api-link prop="expand-config"/>={<table-api-link prop="lazy"/>, <table-api-link prop="loadMethod"/>} 加载方法来开启懒加载<br></p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="$refs.xTable.toggleRowExpansion(tableData[1])">切换第二行展开</vxe-button>
        <vxe-button @click="$refs.xTable.setRowExpansion([tableData[2], tableData[3]], true)">设置第三、四行展开</vxe-button>
        <vxe-button @click="$refs.xTable.setAllRowExpansion(true)">设置所有行展开</vxe-button>
        <vxe-button @click="$refs.xTable.clearRowExpand()">关闭所有行展开</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      ref="xTable"
      :data="tableData"
      :expand-config="{lazy: true, loadMethod: loadContentMethod}">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column type="expand" width="80">
        <template v-slot:content="{ row }">
          <ul>
            <li v-for="(item, index) in row.detailList" :key="index">
              <span>Role: {{ item.role }}</span>
              <span style="margin-left: 100px"> Age: {{ item.age }}</span>
              <span style="margin-left: 100px"> Sex: {{ item.sex }}</span>
            </li>
          </ul>
        </template>
      </vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p class="tip">实现父子表格懒加载</p>

    <vxe-table
      border
      :data="tableData2"
      :expand-config="{lazy: true, loadMethod: loadContentMethod2}">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column type="expand" width="80">
        <template v-slot:content="{ row }">
          <vxe-grid :columns="row.childCols" :data="row.childData"></vxe-grid>
        </template>
      </vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[2] }}</code>
      <code class="javascript">{{ demoCodes[3] }}</code>
    </pre>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tableData: [
        { name: 'Develop', age: 20, sex: '女', detailList: [] },
        { name: 'Develop', age: 22, sex: '女', detailList: [] },
        { name: 'Develop', age: 24, sex: '男', detailList: [] },
        { name: 'Develop', age: 26, sex: '女', detailList: [] }
      ],
      tableData2: [
        { name: 'Develop', age: 20, sex: '女', childCols: [], childData: [] },
        { name: 'Develop', age: 22, sex: '女', childCols: [], childData: [] },
        { name: 'Develop', age: 24, sex: '男', childCols: [], childData: [] },
        { name: 'Develop', age: 26, sex: '女', childCols: [], childData: [] }
      ],
      demoCodes: [
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button @click="$refs.xTable.toggleRowExpansion(tableData[1])">切换第二行展开</vxe-button>
            <vxe-button @click="$refs.xTable.setRowExpansion([tableData[2], tableData[3]], true)">设置第三、四行展开</vxe-button>
            <vxe-button @click="$refs.xTable.setAllRowExpansion(true)">设置所有行展开</vxe-button>
            <vxe-button @click="$refs.xTable.clearRowExpand()">关闭所有行展开</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          ref="xTable"
          :data="tableData"
          :expand-config="{lazy: true, loadMethod: loadContentMethod}">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column type="expand" width="80">
            <template v-slot:content="{ row }">
              <ul>
                <li v-for="(item, index) in row.detailList" :key="index">
                  <span>Role: {{ item.role }}</span>
                  <span style="margin-left: 100px"> Age: {{ item.age }}</span>
                  <span style="margin-left: 100px"> Sex: {{ item.sex }}</span>
                </li>
              </ul>
            </template>
          </vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { name: 'Develop', age: 20, sex: '女', detailList: [] },
                { name: 'Develop', age: 22, sex: '女', detailList: [] },
                { name: 'Develop', age: 24, sex: '男', detailList: [] },
                { name: 'Develop', age: 26, sex: '女', detailList: [] }
              ]
            }
          },
          methods: {
            loadContentMethod ({ row }) {
              return new Promise(resolve => {
                setTimeout(() => {
                  let detailList = XEUtils.sample([
                    { role: 'Develop', age: 20, sex: '女' },
                    { role: 'Develop', age: 22, sex: '女' },
                    { role: 'Develop', age: 24, sex: '男' },
                    { role: 'Develop', age: 26, sex: '女' },
                    { role: 'Develop', age: 28, sex: '男' },
                    { role: 'Develop', age: 30, sex: '男' }
                  ], XEUtils.random(1, 5))
                  row.detailList = detailList
                  resolve()
                }, 500)
              })
            }
          }
        }
        `,
        `
        <vxe-table
          border
          :data="tableData"
          :expand-config="{lazy: true, loadMethod: loadContentMethod}">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column type="expand" width="80">
            <template v-slot:content="{ row }">
              <vxe-grid :columns="row.childCols" :data="row.childData"></vxe-grid>
            </template>
          </vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { name: 'Develop', age: 20, sex: '女', childCols: [], childData: [] },
                { name: 'Develop', age: 22, sex: '女', childCols: [], childData: [] },
                { name: 'Develop', age: 24, sex: '男', childCols: [], childData: [] },
                { name: 'Develop', age: 26, sex: '女', childCols: [], childData: [] }
              ]
            }
          },
          methods: {
            loadContentMethod ({ row }) {
              return new Promise(resolve => {
                setTimeout(() => {
                  let childCols = XEUtils.sample([
                    { type: 'seq', title: 'Sequence' },
                    { field: 'name', title: 'Name' },
                    { field: 'role', title: 'Role' },
                    { field: 'age', title: 'Age' },
                    { field: 'sex', title: 'Sex' }
                  ], XEUtils.random(3, 5))
                  let childData = XEUtils.sample([
                    { name: 'TEST1', role: 'Develop', age: 20, sex: '女' },
                    { name: 'TEST2', role: 'Develop', age: 22, sex: '女' },
                    { name: 'TEST3', role: 'Develop', age: 24, sex: '男' },
                    { name: 'TEST4', role: 'Develop', age: 26, sex: '女' },
                    { name: 'TEST5', role: 'Develop', age: 28, sex: '男' },
                    { name: 'TEST6', role: 'Develop', age: 30, sex: '男' }
                  ], XEUtils.random(1, 5))
                  row.childCols = childCols
                  row.childData = childData
                  resolve()
                }, 500)
              })
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
    loadContentMethod ({ row }) {
      return new Promise(resolve => {
        setTimeout(() => {
          let detailList = XEUtils.sample([
            { role: 'Develop', age: 20, sex: '女' },
            { role: 'Develop', age: 22, sex: '女' },
            { role: 'Develop', age: 24, sex: '男' },
            { role: 'Develop', age: 26, sex: '女' },
            { role: 'Develop', age: 28, sex: '男' },
            { role: 'Develop', age: 30, sex: '男' }
          ], XEUtils.random(1, 5))
          row.detailList = detailList
          resolve()
        }, 500)
      })
    },
    loadContentMethod2 ({ row }) {
      return new Promise(resolve => {
        setTimeout(() => {
          let childCols = XEUtils.sample([
            { type: 'seq', title: 'Sequence' },
            { field: 'name', title: 'Name' },
            { field: 'role', title: 'Role' },
            { field: 'age', title: 'Age' },
            { field: 'sex', title: 'Sex' }
          ], XEUtils.random(3, 5))
          let childData = XEUtils.sample([
            { name: 'TEST1', role: 'Develop', age: 20, sex: '女' },
            { name: 'TEST2', role: 'Develop', age: 22, sex: '女' },
            { name: 'TEST3', role: 'Develop', age: 24, sex: '男' },
            { name: 'TEST4', role: 'Develop', age: 26, sex: '女' },
            { name: 'TEST5', role: 'Develop', age: 28, sex: '男' },
            { name: 'TEST6', role: 'Develop', age: 30, sex: '男' }
          ], XEUtils.random(1, 5))
          row.childCols = childCols
          row.childData = childData
          resolve()
        }, 500)
      })
    }
  }
}
</script>
