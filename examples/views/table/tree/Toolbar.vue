<template>
  <div>
    <p>增删改查、工具栏</p>
    <p class="red">必须指定 <table-api-link prop="row-key"/> 或者 ( <table-api-link prop="select-config"/>、<table-api-link prop="tree-config"/>、<table-api-link prop="expand-config"/>、<table-api-link prop="edit-config"/> ) 中的 key 任意配置一个即可</p>

    <vxe-toolbar :data="tableData" setting>
      <template v-slot:buttons>
        <vxe-button @click="insertEvent">新增</vxe-button>
        <vxe-button @click="getInsertEvent">获取新增</vxe-button>
        <vxe-button @click="getRemoveEvent">获取删除</vxe-button>
        <vxe-button @click="getUpdateEvent">获取修改</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      ref="xTree"
      :tree-config="{key: 'id', children: 'children'}"
      :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
      :data.sync="tableData">
      <vxe-table-column type="selection" width="120" tree-node></vxe-table-column>
      <vxe-table-column prop="name" label="Name" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column prop="size" label="Size" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column prop="type" label="Type" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column prop="date" label="Date" :edit-render="{name: 'input'}"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'
import XEUtils from 'xe-utils'

export default {
  data () {
    return {
      tableData: [],
      demoCodes: [
        `
        <vxe-toolbar :data="tableData" setting>
          <template v-slot:buttons>
            <vxe-button @click="insertEvent">新增</vxe-button>
            <vxe-button @click="getInsertEvent">获取新增</vxe-button>
            <vxe-button @click="getRemoveEvent">获取删除</vxe-button>
            <vxe-button @click="getUpdateEvent">获取修改</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          ref="xTree"
          :tree-config="{key: 'id', children: 'children'}"
          :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
          :data.sync="tableData">
          <vxe-table-column type="selection" width="120" tree-node></vxe-table-column>
          <vxe-table-column prop="name" label="Name" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column prop="size" label="Size" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column prop="type" label="Type" :edit-render="{name: 'input'}"></vxe-table-column>
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
            this.tableData = window.MOCK_TREE_DATA_LIST.slice(0)
          },
          methods: {
            insertEvent () {
              let record = {
                date: XEUtils.toDateString(new Date(), 'yyyy-MM-dd')
              }
              this.$refs.xTree.insert(record)
                .then(({ row }) => this.$refs.xTree.setActiveRow(row))
            },
            getInsertEvent () {
              let insertRecords = this.$refs.xTree.getInsertRecords()
              alert(insertRecords.length)
            },
            getRemoveEvent () {
              let removeRecords = this.$refs.xTree.getRemoveRecords()
              alert(removeRecords.length)
            },
            getUpdateEvent () {
              let updateRecords = this.$refs.xTree.getUpdateRecords()
              alert(updateRecords.length)
            }
          }
        }
        `
      ]
    }
  },
  created () {
    this.tableData = window.MOCK_TREE_DATA_LIST.slice(0)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    insertEvent () {
      let record = {
        date: XEUtils.toDateString(new Date(), 'yyyy-MM-dd')
      }
      this.$refs.xTree.insert(record)
        .then(({ row }) => this.$refs.xTree.setActiveRow(row))
    },
    getInsertEvent () {
      let insertRecords = this.$refs.xTree.getInsertRecords()
      alert(insertRecords.length)
    },
    getRemoveEvent () {
      let removeRecords = this.$refs.xTree.getRemoveRecords()
      alert(removeRecords.length)
    },
    getUpdateEvent () {
      let updateRecords = this.$refs.xTree.getUpdateRecords()
      alert(updateRecords.length)
    }
  }
}
</script>
