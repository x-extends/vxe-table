<template>
  <div>
    <p>调用 insert、insertAt 函数插入数据</p>

    <button class="btn" @click="$refs.xTable.insert({name: Date.now()})">在第1行插入</button>
    <button class="btn" @click="$refs.xTable.insertAt({name: Date.now()}, tableData[2])">在第3行插入</button>
    <button class="btn" @click="$refs.xTable.insertAt({name: Date.now()}, -1)">在最后行插入</button>
    <button class="btn" @click="getInsertEvent">获取新增</button>
    <vxe-table
      ref="xTable"
      border
      show-all-overflow
      :data.sync="tableData"
      :edit-config="{trigger: 'click', mode: 'cell'}">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column prop="name" label="Name" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column prop="age" label="Age" :edit-render="{name: 'input'}"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">显示代码</p>

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
      tableData: [],
      demoCodes: [
        `
        <button class="btn" @click="$refs.xTable.insert({name: Date.now()})">在第1行插入</button>
        <button class="btn" @click="$refs.xTable.insertAt({name: Date.now()}, tableData[2])">在第3行插入</button>
        <button class="btn" @click="$refs.xTable.insertAt({name: Date.now()}, -1)">在最后行插入</button>
        <button class="btn" @click="getInsertEvent">获取新增</button>
        <vxe-table
          ref="xTable"
          border
          show-all-overflow
          :data.sync="tableData"
          :edit-config="{trigger: 'click', mode: 'cell'}">
          <vxe-table-column type="index" width="60"></vxe-table-column>
          <vxe-table-column prop="name" label="Name" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column prop="sex" label="Sex" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column prop="age" label="Age" :edit-render="{name: 'input'}"></vxe-table-column>
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
            this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
          },
          methods: {
            getInsertEvent () {
              let insertRecords = this.$refs.xTable.getInsertRecords()
              alert(insertRecords.length)
            }
          }
        }
        `
      ]
    }
  },
  created () {
    let list = window.MOCK_DATA_LIST.slice(0, 6)
    this.tableData = list
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    getInsertEvent () {
      let insertRecords = this.$refs.xTable.getInsertRecords()
      alert(insertRecords.length)
    }
  }
}
</script>
