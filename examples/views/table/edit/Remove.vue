<template>
  <div>
    <p>调用 remove 删除指定行数据</p>

    <vxe-button @click="$refs.xTable.remove(tableData[1])">删除第2行</vxe-button>
    <vxe-button @click="$refs.xTable.removeSelecteds()">删除选中</vxe-button>
    <vxe-button @click="getRemoveEvent">获取删除</vxe-button>
    <vxe-button @click="getSelectionEvent">获取选中</vxe-button>
    <vxe-table
      ref="xTable"
      border
      show-all-overflow
      :data.sync="tableData"
      :edit-config="{trigger: 'click', mode: 'cell'}">
      <vxe-table-column type="selection" width="60"></vxe-table-column>
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
        <vxe-button @click="$refs.xTable.remove(tableData[1])">删除第2行</vxe-button>
        <vxe-button @click="$refs.xTable.removeSelecteds()">删除选中</vxe-button>
        <vxe-button @click="getRemoveEvent">获取删除</vxe-button>
        <vxe-button @click="getSelectionEvent">获取选中</vxe-button>
        <vxe-table
          ref="xTable"
          border
          show-all-overflow
          :data.sync="tableData"
          :edit-config="{trigger: 'click', mode: 'cell'}">
          <vxe-table-column type="selection" width="60"></vxe-table-column>
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
            getRemoveEvent () {
              let removeRecords = this.$refs.xTable.getRemoveRecords()
              alert(removeRecords.length)
            },
            getSelectionEvent () {
              let removeRecords = this.$refs.xTable.getSelectionRecords()
              alert(removeRecords.length)
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
    getRemoveEvent () {
      let removeRecords = this.$refs.xTable.getRemoveRecords()
      alert(removeRecords.length)
    },
    getSelectionEvent () {
      let removeRecords = this.$refs.xTable.getSelectionRecords()
      alert(removeRecords.length)
    }
  }
}
</script>
