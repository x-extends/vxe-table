<template>
  <div>
    <p class="tip">文件上传，可以通过调用 <table-api-link prop="readFile"/> 读取本地文件<span class="red">（具体请自行实现，该示例仅供参考）</span></p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button status="primary" @click="insertEvent()">选择文件</vxe-button>
        <vxe-button status="primary" @click="insertEvent({ multiple : true })">选择多个</vxe-button>
        <vxe-button @click="$refs.xTable.removeCheckboxRow()">删除选中</vxe-button>
        <vxe-button @click="getInsertEvent">保存</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      show-overflow
      ref="xTable"
      height="400"
      :data="tableData"
      :edit-config="{trigger: 'click', mode: 'cell'}">
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="type" title="Type"></vxe-table-column>
      <vxe-table-column field="size" title="Size"></vxe-table-column>
      <vxe-table-column field="date" title="Date"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tableData: [],
      demoCodes: [
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button status="primary" @click="insertEvent()">选择文件</vxe-button>
            <vxe-button status="primary" @click="insertEvent({ multiple : true })">选择多个</vxe-button>
            <vxe-button @click="$refs.xTable.removeCheckboxRow()">删除选中</vxe-button>
            <vxe-button @click="getInsertEvent">保存</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          show-overflow
          ref="xTable"
          height="400"
          :data="tableData"
          :edit-config="{trigger: 'click', mode: 'cell'}">
          <vxe-table-column type="checkbox" width="60"></vxe-table-column>
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="type" title="Type"></vxe-table-column>
          <vxe-table-column field="size" title="Size"></vxe-table-column>
          <vxe-table-column field="date" title="Date"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: []
            }
          },
          methods: {
            insertEvent (opts) {
              this.$refs.xTable.readFile(opts).then(params => {
                const { files } = params.target
                let records = Array.from(files).map(file => {
                  let ns = file.name.split('.')
                  let name = ns.slice(0, ns.length - 1).join('')
                  let type = ns[ns.length - 1]
                  return {
                    name: name,
                    size: file.size,
                    type: type,
                    date: XEUtils.toDateString(new Date())
                  }
                })
                this.$refs.xTable.insert(records)
              })
            },
            getInsertEvent () {
              let insertRecords = this.$refs.xTable.getInsertRecords()
              this.$XModal.alert(insertRecords.length)
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
    insertEvent (opts) {
      this.$refs.xTable.readFile(opts).then(params => {
        const { files } = params.target
        const records = Array.from(files).map(file => {
          const ns = file.name.split('.')
          const name = ns.slice(0, ns.length - 1).join('')
          const type = ns[ns.length - 1]
          return {
            name: name,
            size: file.size,
            type: type,
            date: XEUtils.toDateString(new Date())
          }
        })
        this.$refs.xTable.insert(records)
      })
    },
    getInsertEvent () {
      const insertRecords = this.$refs.xTable.getInsertRecords()
      this.$XModal.alert(insertRecords.length)
    }
  }
}
</script>
