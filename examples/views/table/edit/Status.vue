<template>
  <div>
    <p>设置 edit-config={trigger: 'click', mode: 'cell', showStatus: true} 开启编辑状态显示功能</p>

    <button class="btn" @click="getInsertEvent">获取新增</button>
    <button class="btn" @click="getRemoveEvent">获取删除</button>
    <button class="btn" @click="getUpdateEvent">获取修改</button>
    <vxe-table
      ref="xTable"
      border
      show-all-overflow
      :data.sync="tableData"
      :edit-config="{trigger: 'click', mode: 'cell', showStatus: true}">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column prop="name" label="Name" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column prop="date" label="Date" :edit-render="{name: 'input'}"></vxe-table-column>
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
        <button class="btn" @click="getInsertEvent">获取新增</button>
        <button class="btn" @click="getRemoveEvent">获取删除</button>
        <button class="btn" @click="getUpdateEvent">获取修改</button>
        <vxe-table
          ref="xTable"
          border
          :data.sync="tableData"
          :edit-config="{trigger: 'click', mode: 'cell', showStatus: true}">
          <vxe-table-column type="index" width="60"></vxe-table-column>
          <vxe-table-column prop="name" label="Name" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column prop="sex" label="Sex" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column prop="date" label="Date" :edit-render="{name: 'input'}"></vxe-table-column>
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
            },
            getRemoveEvent () {
              let removeRecords = this.$refs.xTable.getRemoveRecords()
              alert(removeRecords.length)
            },
            getUpdateEvent () {
              let updateRecords = this.$refs.xTable.getUpdateRecords()
              alert(updateRecords.length)
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
    },
    getRemoveEvent () {
      let removeRecords = this.$refs.xTable.getRemoveRecords()
      alert(removeRecords.length)
    },
    getUpdateEvent () {
      let updateRecords = this.$refs.xTable.getUpdateRecords()
      alert(updateRecords.length)
    }
  }
}
</script>
