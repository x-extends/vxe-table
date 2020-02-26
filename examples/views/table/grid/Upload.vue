<template>
  <div>
    <p class="tip">实现附件上传，使用展开行和 <table-api-link prop="readFile"/> 本地文件读取函数</p>

    <vxe-grid
      border
      resizable
      ref="xGrid"
      max-height="500"
      :columns="tableColumn"
      :data="tableData">
      <!--使用自定义模板-->
      <template v-slot:fileExpand="{ row }">
        <ul v-if="row.fileList.length" class="file-list">
          <li v-for="(file, index) in row.fileList" :key="index">
            <span>{{ file.name }}</span>
            <span>{{ file.size }}</span>
            <span>{{ file.type }}</span>
            <span>{{ file.date }}</span>
          </li>
        </ul>
        <div v-else class="file-empty">暂无附件</div>
      </template>
      <template v-slot:cellExpand="{ row }">
        <span>（{{ row.fileList.length }}）</span>
      </template>
      <template v-slot:operation="{ row }">
        <vxe-button status="primary" @click="uploadFileEvent(row)">添加附件</vxe-button>
      </template>
    </vxe-grid>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
      <code class="css">{{ demoCodes[2] }}</code>
    </pre>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tableColumn: [
        { type: 'seq', width: 50 },
        { type: 'expand', width: 120, slots: { content: 'fileExpand', default: 'cellExpand' } },
        { field: 'name', title: 'app.body.label.name' },
        { field: 'sex', title: 'app.body.label.sex' },
        { title: '操作', width: 160, showOverflow: true, slots: { default: 'operation' } }
      ],
      tableData: [
        { name: 'name1', sex: '男', age: '26', fileList: [] },
        { name: 'name2', sex: '女', age: '28', fileList: [] },
        { name: 'name3', sex: '男', age: '30', fileList: [] }
      ],
      demoCodes: [
        `
        <vxe-grid
          border
          resizable
          ref="xGrid"
          max-height="500"
          :columns="tableColumn"
          :data="tableData">
          <!--使用自定义模板-->
          <template v-slot:fileExpand="{ row }">
            <ul v-if="row.fileList.length" class="file-list">
              <li v-for="(file, index) in row.fileList" :key="index">
                <span>{{ file.name }}</span>
                <span>{{ file.size }}</span>
                <span>{{ file.type }}</span>
                <span>{{ file.date }}</span>
              </li>
            </ul>
            <div v-else class="file-empty">暂无附件</div>
          </template>
          <template v-slot:cellExpand="{ row }">
            <span>（{{ row.fileList.length }}）</span>
          </template>
          <template v-slot:operation="{ row }">
            <vxe-button status="primary" @click="uploadFileEvent(row)">添加附件</vxe-button>
          </template>
        </vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              tableColumn: [
                { type: 'seq', width: 50 },
                { type: 'expand', width: 120, slots: { content: 'fileExpand', default: 'cellExpand' } },
                { field: 'name', title: 'app.body.label.name' },
                { field: 'sex', title: 'app.body.label.sex' },
                { title: '操作', width: 160, showOverflow: true, slots: { default: 'operation' } }
              ],
              tableData: [
                { name: 'name1', sex: '男', age: '26', fileList: [] },
                { name: 'name2', sex: '女', age: '28', fileList: [] },
                { name: 'name3', sex: '男', age: '30', fileList: [] }
              ]
            }
          },
          methods: {
            // 读取附件
            uploadFileEvent (row) {
              this.$refs.xGrid.readFile({
                multiple: true,
                types: ['xlsx', 'csv', 'html']
              }).then(evnt => {
                // 解析数据并显示
                Array.from(evnt.target.files).forEach(file => {
                  let ns = file.name.split('.')
                  let name = ns.slice(0, ns.length - 1).join('')
                  let type = ns[ns.length - 1]
                  let record = {
                    name: name,
                    size: file.size,
                    type: type,
                    date: XEUtils.toDateString(new Date())
                  }
                  row.fileList.push(record)
                })
                // 加载完成后展开行
                this.$refs.xGrid.setRowExpansion(row, true)
              })
            }
          }
        }
        `,
        `
        .file-list li span{
          display: inline-block;
          width: 25%;
        }
        .file-empty {
          text-align: center;
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
    uploadFileEvent (row) {
      // 读取附件
      this.$refs.xGrid.readFile({
        multiple: true,
        types: ['xlsx', 'csv', 'html']
      }).then(evnt => {
        // 解析数据并显示
        Array.from(evnt.target.files).forEach(file => {
          const ns = file.name.split('.')
          const name = ns.slice(0, ns.length - 1).join('')
          const type = ns[ns.length - 1]
          const record = {
            name: name,
            size: file.size,
            type: type,
            date: XEUtils.toDateString(new Date())
          }
          row.fileList.push(record)
        })
        // 加载完成后展开行
        this.$refs.xGrid.setRowExpansion(row, true)
      })
    }
  }
}
</script>

<style scoped>
.file-list li span{
  display: inline-block;
  width: 25%;
}
.file-empty {
  text-align: center;
}
</style>
