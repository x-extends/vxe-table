<template>
  <div>
    <p class="tip">实现附件上传，使用展开行和 <table-api-link prop="readFile"/> 本地文件读取函数</p>

    <vxe-grid
      border
      resizable
      ref="xGrid"
      max-height="500"
      :expand-config="{expandAll: true}"
      :columns="tableColumn"
      :data="tableData">
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
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tableColumn: [
        { type: 'index', width: 50 },
        {
          type: 'expand',
          width: 60,
          slots: {
            default: ({ row, column }) => {
              return [
                row.fileList.length
                  ? <ul class="file-list">
                    {
                      row.fileList.map(file => {
                        return <li>
                          <span>{ file.name }</span>
                          <span>{ file.size }</span>
                          <span>{ file.type }</span>
                          <span>{ file.date }</span>
                        </li>
                      })
                    }
                  </ul>
                  : <div class="file-empty">暂无附件</div>
              ]
            }
          }
        },
        { field: 'name', title: 'app.body.label.name' },
        { field: 'sex', title: 'app.body.label.sex' },
        {
          title: '操作',
          width: 160,
          showOverflow: true,
          slots: {
            default: ({ row, column }) => {
              return [
                <vxe-button type="primary" onClick={ e => this.uploadFileEvent(row) }>添加附件</vxe-button>
              ]
            }
          }
        }
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
          :expand-config="{expandAll: true}"
          :columns="tableColumn"
          :data="tableData">
        </vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              tableColumn: [
                { type: 'index', width: 50 },
                {
                  type: 'expand',
                  width: 60,
                  slots: {
                    default: ({ row, column }) => {
                      return [
                        row.fileList.length
                          ? <ul class="file-list">
                            {
                              row.fileList.map(file => {
                                return <li>
                                  <span>{ file.name }</span>
                                  <span>{ file.size }</span>
                                  <span>{ file.type }</span>
                                  <span>{ file.date }</span>
                                </li>
                              })
                            }
                          </ul>
                          : <div class="file-empty">暂无附件</div>
                      ]
                    }
                  }
                },
                { field: 'name', title: 'app.body.label.name' },
                { field: 'sex', title: 'app.body.label.sex' },
                {
                  title: '操作',
                  width: 160,
                  showOverflow: true,
                  slots: {
                    default: ({ row, column }) => {
                      return [
                        <vxe-button type="primary" onClick={ e => this.uploadFileEvent(row) }>添加附件</vxe-button>
                      ]
                    }
                  }
                }
              ],
              tableData: [
                { name: 'name1', sex: '男', age: '26', fileList: [] },
                { name: 'name2', sex: '女', age: '28', fileList: [] },
                { name: 'name3', sex: '男', age: '30', fileList: [] }
              ]
            }
          },
          methods: {
            uploadFileEvent (row) {
              this.$refs.xGrid.readFile({
                types: ['xlsx', 'csv', 'html']
              }).then(evnt => {
                Array.from(evnt.target.files).forEach(file => {
                  let ns = file.name.split('.')
                  let name = ns.slice(0, ns.length - 1).join('')
                  let type = ns[ns.length - 1]
                  let record = {
                    name: name,
                    size: file.size,
                    type: type,
                    date: this.$utils.toDateString(new Date())
                  }
                  row.fileList.push(record)
                })
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
      this.$refs.xGrid.readFile({
        types: ['xlsx', 'csv', 'html']
      }).then(evnt => {
        Array.from(evnt.target.files).forEach(file => {
          let ns = file.name.split('.')
          let name = ns.slice(0, ns.length - 1).join('')
          let type = ns[ns.length - 1]
          let record = {
            name: name,
            size: file.size,
            type: type,
            date: this.$utils.toDateString(new Date())
          }
          row.fileList.push(record)
        })
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
