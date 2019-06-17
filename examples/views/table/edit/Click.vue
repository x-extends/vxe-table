<template>
  <div>
    <p>设置 <table-api-link prop="edit-config"/>={key: 'id', trigger: 'click', mode: 'cell'} 启用单元格点击编辑的功能</p>
    <p class="red">必须指定 <table-api-link prop="row-key"/> 或者 ( <table-api-link prop="select-config"/>、<table-api-link prop="tree-config"/>、<table-api-link prop="expand-config"/>、<table-api-link prop="edit-config"/> ) 中的 key 任意配置一个即可</p>

    <vxe-table
      border
      resizable
      highlight-current-row
      show-all-overflow
      :data.sync="tableData"
      :edit-config="{key: 'id', trigger: 'click', mode: 'cell'}"
      @edit-actived="editActivedEvent"
      @edit-closed="editClosedEvent">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column prop="name" label="Name" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column prop="date" label="Date" :edit-render="{name: 'input'}"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p>设置 <table-api-link prop="edit-config"/>={key: 'id', trigger: 'click', mode: 'row'} 启用行点击编辑的功能</p>
    <p>需要注意的 mode=row 时，事件中的 column 相关参数是不确定性的（会保留 column 相关参数，但不一定是准确的）</p>

    <vxe-table
      border
      resizable
      show-all-overflow
      :data.sync="tableData"
      :edit-config="{key: 'id', trigger: 'click', mode: 'row'}">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column prop="name" label="Name" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column prop="date" label="Date" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column prop="address" label="Address" :edit-render="{name: 'input'}"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[2] }}</code>
      <code class="javascript">{{ demoCodes[3] }}</code>
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
        <vxe-table
          border
          resizable
          highlight-current-row
          show-all-overflow
          :data.sync="tableData"
          :edit-config="{key: 'id', trigger: 'click', mode: 'cell'}"
          @edit-actived="editActivedEvent"
          @edit-closed="editClosedEvent">
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
            editActivedEvent ({ row, column }, event) {
              console.log(\`打开 \${column.label} 列编辑\`)
            },
            editClosedEvent ({ row, column }, event) {
              console.log(\`关闭 \${column.label} 列编辑\`)
            }
          }
        }
        `,
        `
        <vxe-table
          border
          resizable
          show-all-overflow
          :data.sync="tableData"
          :edit-config="{key: 'id', trigger: 'click', mode: 'row'}">
          <vxe-table-column type="index" width="60"></vxe-table-column>
          <vxe-table-column prop="name" label="Name" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column prop="sex" label="Sex" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column prop="date" label="Date" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column prop="address" label="Address" :edit-render="{name: 'input'}"></vxe-table-column>
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
          }
        }
        `
      ]
    }
  },
  created () {
    this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    editActivedEvent ({ row, column }, event) {
      console.log(`打开 ${column.label} 列编辑`)
    },
    editClosedEvent ({ row, column }, event) {
      console.log(`关闭 ${column.label} 列编辑`)
    }
  }
}
</script>
