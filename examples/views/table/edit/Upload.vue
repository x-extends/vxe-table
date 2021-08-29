<template>
  <div>
    <p class="tip">文件上传，可以通过调用 <table-api-link prop="readFile"/> 读取本地文件<span class="red">（具体请自行实现，该示例仅供参考）</span></p>

    <vxe-toolbar>
      <template #buttons>
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
      <vxe-column type="checkbox" width="60"></vxe-column>
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-column>
      <vxe-column field="type" title="Type"></vxe-column>
      <vxe-column field="size" title="Size"></vxe-column>
      <vxe-column field="date" title="Date"></vxe-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'

export default {
  data () {
    return {
      tableData: [],
      demoCodes: [
        `
        <vxe-toolbar>
          <template #buttons>
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
          <vxe-column type="checkbox" width="60"></vxe-column>
          <vxe-column type="seq" width="60"></vxe-column>
          <vxe-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-column>
          <vxe-column field="type" title="Type"></vxe-column>
          <vxe-column field="size" title="Size"></vxe-column>
          <vxe-column field="date" title="Date"></vxe-column>
        </vxe-table>
        `,
        `
        import XEUtils from 'xe-utils'
        
        export default {
          data () {
            return {
              tableData: []
            }
          },
          methods: {
            insertEvent (opts) {
              const $table = this.$refs.xTable
              $table.readFile(opts).then(params => {
                const { files } = params
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
                $table.insert(records)
              })
            },
            getInsertEvent () {
              const $table = this.$refs.xTable
              const insertRecords = $table.getInsertRecords()
              this.$XModal.alert(insertRecords.length)
            }
          }
        }
        `
      ]
    }
  },
  methods: {
    insertEvent (opts) {
      const $table = this.$refs.xTable
      $table.readFile(opts).then(params => {
        const { files } = params
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
        $table.insert(records)
      })
    },
    getInsertEvent () {
      const $table = this.$refs.xTable
      const insertRecords = $table.getInsertRecords()
      this.$XModal.alert(insertRecords.length)
    }
  }
}
</script>
