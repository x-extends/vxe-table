<template>
  <div>
    <p class="tip">可编辑的合并行<br><span class="red">（注：<table-api-link prop="span-method"/> ，不能用于固定列，合并的逻辑都是自行实现的，该示例仅供参考）</span></p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="insertEvent">新增</vxe-button>
        <vxe-button @click="$refs.xTable.removeCheckboxRow()">删除选中</vxe-button>
        <vxe-button @click="saveEvent">保存</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      ref="xTable"
      height="500"
      :loading="loading"
      :span-method="rowspanMethod"
      :data="tableData"
      :edit-rules="validRules"
      :edit-config="{trigger: 'click', mode: 'cell'}">
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column field="key" title="Key" :edit-render="{name: 'input', props: {placeholder: '请输入键值'}}"></vxe-table-column>
      <vxe-table-column field="name" title="Translate" :edit-render="{name: 'input', props: {placeholder: '请输入翻译的内容'}}"></vxe-table-column>
      <vxe-table-column field="language" title="Language" :edit-render="{name: '$select', options: optionList}"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>
  </div>
</template>

<script>
import XEAjax from 'xe-ajax'
import hljs from 'highlight.js'

export default {
  data () {
    return {
      loading: false,
      tableData: [],
      optionList: [
        { label: '中文', value: 'zh_CN' },
        { label: 'English', value: 'en_US' },
        { label: 'Español', value: 'es' },
        { label: 'Français', value: 'fr_FR' }
      ],
      validRules: {
        key: [
          { required: true, message: '键值必须填写' }
        ],
        name: [
          { required: true, message: '翻译内容必须填写' }
        ],
        language: [
          { required: true, message: '语言类型必须填写' }
        ]
      },
      demoCodes: [
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button @click="insertEvent">新增</vxe-button>
            <vxe-button @click="$refs.xTable.removeCheckboxRow()">删除选中</vxe-button>
            <vxe-button @click="saveEvent">保存</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          ref="xTable"
          height="500"
          :loading="loading"
          :span-method="rowspanMethod"
          :data="tableData"
          :edit-rules="validRules"
          :edit-config="{trigger: 'click', mode: 'cell'}">
          <vxe-table-column type="checkbox" width="60"></vxe-table-column>
          <vxe-table-column field="key" title="Key" :edit-render="{name: 'input', props: {placeholder: '请输入键值'}}"></vxe-table-column>
          <vxe-table-column field="name" title="Translate" :edit-render="{name: 'input', props: {placeholder: '请输入翻译的内容'}}"></vxe-table-column>
          <vxe-table-column field="language" title="Language" :edit-render="{name: '$select', options: optionList}"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              loading: false,
              tableData: [],
              optionList: [
                { label: '中文', value: 'zh_CN' },
                { label: 'English', value: 'en_US' },
                { label: 'Español', value: 'es' },
                { label: 'Français', value: 'fr_FR' }
              ],
              validRules: {
                key: [
                  { required: true, message: '键值必须填写' }
                ],
                name: [
                  { required: true, message: '翻译内容必须填写' }
                ],
                language: [
                  { required: true, message: '语言类型必须填写' }
                ]
              }
            }
          },
          created () {
            this.findList()
          },
          methods: {
            findList () {
              this.loading = true
              XEAjax.get('/api/i18n/list', { sort: 'key', order: 'asc' }).then(data => {
                this.tableData = data
                this.loading = false
              })
            },
            insertEvent () {
              let record = {}
              this.$refs.xTable.insert(record)
                .then(({ row }) => this.$refs.xTable.setActiveCell(row, 'key'))
            },
            saveEvent () {
              let body = this.$refs.xTable.getRecordset()
              let { insertRecords, removeRecords, updateRecords } = body
              if (insertRecords.length || removeRecords.length || updateRecords.length) {
                this.$refs.xTable.validate((errMap) => {
                  if (errMap) {
                    this.$XModal.message({ status: 'error', message: '校验不通过！' })
                  } else {
                    XEAjax.post('/api/i18n/save', body).then(() => {
                      this.$XModal.message({ message: '保存成功！', status: 'success' })
                      this.findList()
                    }).catch(() => {
                      this.$XModal.message({ message: '保存失败！', status: 'error' })
                    })
                  }
                })
              } else {
                this.$Message.info('数据未改动！')
              }
            },
            // 通用行合并函数（将相同多列数据合并为一行）
            rowspanMethod ({ row, $rowIndex, column, data }) {
              let fields = ['key']
              let cellValue = row[column.property]
              if (cellValue && fields.includes(column.property)) {
                let prevRow = data[$rowIndex - 1]
                let nextRow = data[$rowIndex + 1]
                if (prevRow && prevRow[column.property] === cellValue) {
                  return { rowspan: 0, colspan: 0 }
                } else {
                  let countRowspan = 1
                  while (nextRow && nextRow[column.property] === cellValue) {
                    nextRow = data[++countRowspan + $rowIndex]
                  }
                  if (countRowspan > 1) {
                    return { rowspan: countRowspan, colspan: 1 }
                  }
                }
              }
            }
          }
        }
        `
      ]
    }
  },
  created () {
    this.findList()
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    findList () {
      this.loading = true
      XEAjax.get('/api/i18n/list', { sort: 'key', order: 'asc' }).then(data => {
        this.tableData = data
        this.loading = false
      })
    },
    insertEvent () {
      const record = {}
      this.$refs.xTable.insert(record)
        .then(({ row }) => this.$refs.xTable.setActiveCell(row, 'key'))
    },
    saveEvent () {
      const body = this.$refs.xTable.getRecordset()
      const { insertRecords, removeRecords, updateRecords } = body
      if (insertRecords.length || removeRecords.length || updateRecords.length) {
        this.$refs.xTable.validate((errMap) => {
          if (errMap) {
            this.$XModal.message({ status: 'error', message: '校验不通过！' })
          } else {
            XEAjax.post('/api/i18n/save', body).then(() => {
              this.$XModal.message({ message: '保存成功！', status: 'success' })
              this.findList()
            }).catch(() => {
              this.$XModal.message({ message: '保存失败！', status: 'error' })
            })
          }
        })
      } else {
        this.$Message.info('数据未改动！')
      }
    },
    // 通用行合并函数（将相同多列数据合并为一行）
    rowspanMethod ({ row, $rowIndex, column, data }) {
      const fields = ['key']
      const cellValue = row[column.property]
      if (cellValue && fields.includes(column.property)) {
        const prevRow = data[$rowIndex - 1]
        let nextRow = data[$rowIndex + 1]
        if (prevRow && prevRow[column.property] === cellValue) {
          return { rowspan: 0, colspan: 0 }
        } else {
          let countRowspan = 1
          while (nextRow && nextRow[column.property] === cellValue) {
            nextRow = data[++countRowspan + $rowIndex]
          }
          if (countRowspan > 1) {
            return { rowspan: countRowspan, colspan: 1 }
          }
        }
      }
    }
  }
}
</script>
