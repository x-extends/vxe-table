<template>
  <div>
    <p class="tip">通过调用 <table-api-link prop="validate"/> 函数校验数据，<table-api-link prop="edit-rules"/> 校验规则配置</p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="insertEvent">新增</vxe-button>
        <vxe-button @click="$refs.xTable.removeSelecteds()">删除选中</vxe-button>
        <vxe-button @click="validEvent">校验</vxe-button>
        <vxe-button @click="fullValidEvent">完整校验</vxe-button>
        <vxe-button @click="selectValidEvent">选中校验</vxe-button>
        <vxe-button @click="getSelectEvent">获取选中</vxe-button>
        <vxe-button @click="getInsertEvent">获取新增</vxe-button>
        <vxe-button @click="getRemoveEvent">获取删除</vxe-button>
        <vxe-button @click="getUpdateEvent">获取修改</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      show-overflow
      height="500"
      ref="xTable"
      :data="tableData"
      :edit-rules="validRules"
      :edit-config="{trigger: 'click', mode: 'cell', showStatus: true}">
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="date" title="Date" :edit-render="{name: 'input'}"></vxe-table-column>
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

export default {
  data () {
    return {
      tableData: [],
      validRules: {
        name: [
          { required: true, message: 'app.body.valid.rName' },
          { min: 3, max: 50, message: '名称长度在 3 到 50 个字符' }
        ],
        sex: [
          { required: true, message: '性别必须填写' }
        ]
      },
      demoCodes: [
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button @click="insertEvent">新增</vxe-button>
            <vxe-button @click="validEvent">校验</vxe-button>
            <vxe-button @click="fullValidEvent">完整校验</vxe-button>
            <vxe-button @click="selectValidEvent">选中校验</vxe-button>
            <vxe-button @click="getSelectEvent">获取选中</vxe-button>
            <vxe-button @click="getInsertEvent">获取新增</vxe-button>
            <vxe-button @click="getRemoveEvent">获取删除</vxe-button>
            <vxe-button @click="getUpdateEvent">获取修改</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          show-overflow
          height="500"
          ref="xTable"
          :data="tableData"
          :edit-rules="validRules"
          :edit-config="{trigger: 'click', mode: 'cell', showStatus: true}">
          <vxe-table-column type="checkbox" width="60"></vxe-table-column>
          <vxe-table-column type="index" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="date" title="Date" :edit-render="{name: 'input'}"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [],
              validRules: {
                name: [
                  { required: true, message: 'app.body.valid.rName' },
                  { min: 3, max: 50, message: '名称长度在 3 到 50 个字符' }
                ],
                sex: [
                  { required: true, message: '性别必须填写' }
                ]
              }
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
          },
          methods: {
            async validEvent () {
              try {
                await this.$refs.xTable.validate()
                this.$XModal.message({ status: 'success', message: '校验成功！' })
              } catch (errMap) {
                this.$XModal.message({ status: 'error', message: '校验不通过！' })
              }
            },
            async fullValidEvent () {
              try {
                await this.$refs.xTable.fullValidate()
                this.$XModal.message({ status: 'success', message: '校验成功！' })
              } catch (errMap) {
                let msgList = []
                Object.values(errMap).forEach(errList => {
                  errList.forEach(params => {
                    let { rowIndex, column, rules } = params
                    rules.forEach(rule => {
                      msgList.push(\`第 \${rowIndex} 行 \${column.title} 校验错误：\${rule.message}\`)
                    })
                  })
                })
                this.$XModal.message({
                  status: 'error',
                  message: () => {
                    return [
                      <div class="red" style="max-height: 400px;overflow: auto;">
                        {
                          msgList.map(msg => <div>{ msg }</div>)
                        }
                      </div>
                    ]
                  }
                })
              }
            },
            async selectValidEvent () {
              let selectRecords = this.$refs.xTable.getSelectRecords()
              if (selectRecords.length > 0) {
                try {
                  await this.$refs.xTable.validate(selectRecords)
                  this.$XModal.message({ status: 'success', message: '校验成功！' })
                } catch (errMap) {
                  this.$XModal.message({ status: 'error', message: '校验不通过！' })
                }
              } else {
                this.$XModal.message({ status: 'warning', message: '未选中数据！' })
              }
            },
            async insertEvent () {
              const { row: newRow } = await this.$refs.xTable.insert()
              try {
                // 插入一条数据并触发校验
                await this.$refs.xTable.validate(newRow)
              } catch (errMap) {}
            },
            getSelectEvent () {
              let selectRecords = this.$refs.xTable.getSelectRecords()
              this.$XModal.alert(selectRecords.length)
            },
            getInsertEvent () {
              let insertRecords = this.$refs.xTable.getInsertRecords()
              this.$XModal.alert(insertRecords.length)
            },
            getRemoveEvent () {
              let removeRecords = this.$refs.xTable.getRemoveRecords()
              this.$XModal.alert(removeRecords.length)
            },
            getUpdateEvent () {
              let updateRecords = this.$refs.xTable.getUpdateRecords()
              this.$XModal.alert(updateRecords.length)
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
    async validEvent () {
      try {
        await this.$refs.xTable.validate()
        this.$XModal.message({ status: 'success', message: '校验成功！' })
      } catch (errMap) {
        this.$XModal.message({ status: 'error', message: '校验不通过！' })
      }
    },
    async fullValidEvent () {
      try {
        await this.$refs.xTable.fullValidate()
        this.$XModal.message({ status: 'success', message: '校验成功！' })
      } catch (errMap) {
        let msgList = []
        Object.values(errMap).forEach(errList => {
          errList.forEach(params => {
            let { rowIndex, column, rules } = params
            rules.forEach(rule => {
              msgList.push(`第 ${rowIndex} 行 ${column.title} 校验错误：${rule.message}`)
            })
          })
        })
        this.$XModal.message({
          status: 'error',
          message: () => {
            return [
              <div class="red" style="max-height: 400px;overflow: auto;">
                {
                  msgList.map(msg => <div>{ msg }</div>)
                }
              </div>
            ]
          }
        })
      }
    },
    async selectValidEvent () {
      let selectRecords = this.$refs.xTable.getSelectRecords()
      if (selectRecords.length > 0) {
        try {
          await this.$refs.xTable.validate(selectRecords)
          this.$XModal.message({ status: 'success', message: '校验成功！' })
        } catch (errMap) {
          this.$XModal.message({ status: 'error', message: '校验不通过！' })
        }
      } else {
        this.$XModal.message({ status: 'warning', message: '未选中数据！' })
      }
    },
    async insertEvent () {
      const { row: newRow } = await this.$refs.xTable.insert()
      try {
        // 插入一条数据并触发校验
        await this.$refs.xTable.validate(newRow)
      } catch (errMap) {}
    },
    getSelectEvent () {
      let selectRecords = this.$refs.xTable.getSelectRecords()
      this.$XModal.alert(selectRecords.length)
    },
    getInsertEvent () {
      let insertRecords = this.$refs.xTable.getInsertRecords()
      this.$XModal.alert(insertRecords.length)
    },
    getRemoveEvent () {
      let removeRecords = this.$refs.xTable.getRemoveRecords()
      this.$XModal.alert(removeRecords.length)
    },
    getUpdateEvent () {
      let updateRecords = this.$refs.xTable.getUpdateRecords()
      this.$XModal.alert(updateRecords.length)
    }
  }
}
</script>
