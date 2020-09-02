<template>
  <div>
    <p class="tip">
      通过调用 <table-api-link prop="validate"/> 函数校验数据，<table-api-link prop="edit-rules"/> 校验规则配置，如果第一个参数为 true 则全量校验<br>
      <span class="red">（如果不指定数据，则默认只校验临时变动的数据，例如新增或修改...等）</span>
    </p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="insertEvent">新增</vxe-button>
        <vxe-button @click="$refs.xTable.removeCheckboxRow()">删除选中</vxe-button>
        <vxe-button @click="validEvent">校验</vxe-button>
        <vxe-button @click="fullValidEvent">完整校验</vxe-button>
        <vxe-button @click="validAllEvent">全量校验</vxe-button>
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
      keep-source
      ref="xTable"
      :data="tableData"
      :edit-rules="validRules"
      :edit-config="{trigger: 'click', mode: 'row', showStatus: true}">
      <vxe-table-column type="checkbox" width="80"></vxe-table-column>
      <vxe-table-column type="seq" width="80"></vxe-table-column>
      <vxe-table-column field="name" title="Name" width="400" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="age" title="Age" width="200" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="sex2" title="Sex" width="200" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="date" title="Date" width="300" fixed="right" :edit-render="{name: '$input', props: {type: 'date'}}"></vxe-table-column>
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
    const nameValid = ({ cellValue }) => {
      if (cellValue && !/^\w+$/.test(cellValue)) {
        return new Error('名称格式不正确，必须字母或数字')
      }
    }
    return {
      tableData: [],
      validRules: {
        name: [
          { validator: nameValid }
        ],
        sex2: [
          { required: true, message: '性别必须填写' }
        ],
        date: [
          { required: true, message: '日期必须填写' }
        ]
      },
      demoCodes: [
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button @click="insertEvent">新增</vxe-button>
            <vxe-button @click="$refs.xTable.removeCheckboxRow()">删除选中</vxe-button>
            <vxe-button @click="validEvent">校验</vxe-button>
            <vxe-button @click="fullValidEvent">完整校验</vxe-button>
            <vxe-button @click="validAllEvent">全量校验</vxe-button>
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
          keep-source
          ref="xTable"
          :data="tableData"
          :edit-rules="validRules"
          :edit-config="{trigger: 'click', mode: 'row', showStatus: true}">
          <vxe-table-column type="checkbox" width="80"></vxe-table-column>
          <vxe-table-column type="seq" width="80"></vxe-table-column>
          <vxe-table-column field="name" title="Name" width="400" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="age" title="Age" width="200" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="sex2" title="Sex" width="200" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="date" title="Date" width="300" fixed="right" :edit-render="{name: '$input', props: {type: 'date'}}"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            const nameValid = ({ cellValue }) => {
              if (cellValue && !/^\\w+$/.test(cellValue)) {
                return new Error('名称格式不正确，必须字母或数字')
              }
            }
            return {
              tableData: [],
              validRules: {
                name: [
                  { validator: nameValid }
                ],
                sex2: [
                  { required: true, message: '性别必须填写' }
                ],
                date: [
                  { required: true, message: '日期必须填写' }
                ]
              }
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
          },
          methods: {
            async validEvent () {
              const errMap = await this.$refs.xTable.validate().catch(errMap => errMap)
              if (errMap) {
                this.$XModal.message({ status: 'error', message: '校验不通过！' })
              } else {
                this.$XModal.message({ status: 'success', message: '校验成功！' })
              }
            },
            async fullValidEvent () {
              const errMap = await this.$refs.xTable.fullValidate().catch(errMap => errMap)
              if (errMap) {
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
              } else {
                this.$XModal.message({ status: 'success', message: '校验成功！' })
              }
            },
            async validAllEvent () {
              const errMap = await this.$refs.xTable.validate(true).catch(errMap => errMap)
              if (errMap) {
                this.$XModal.message({ status: 'error', message: '校验不通过！' })
              } else {
                this.$XModal.message({ status: 'success', message: '校验成功！' })
              }
            },
            async selectValidEvent () {
              let selectRecords = this.$refs.xTable.getCheckboxRecords()
              if (selectRecords.length > 0) {
                const errMap = await this.$refs.xTable.validate(selectRecords).catch(errMap => errMap)
                if (errMap) {
                  this.$XModal.message({ status: 'error', message: '校验不通过！' })
                } else {
                  this.$XModal.message({ status: 'success', message: '校验成功！' })
                }
              } else {
                this.$XModal.message({ status: 'warning', message: '未选中数据！' })
              }
            },
            async insertEvent () {
              const { row: newRow } = await this.$refs.xTable.insert()
              // 插入一条数据并触发校验
              const errMap = await this.$refs.xTable.validate(newRow).catch(errMap => errMap)
              if (errMap) {

              }
            },
            getSelectEvent () {
              let selectRecords = this.$refs.xTable.getCheckboxRecords()
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
    this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    async validEvent () {
      const errMap = await this.$refs.xTable.validate().catch(errMap => errMap)
      if (errMap) {
        this.$XModal.message({ status: 'error', message: '校验不通过！' })
      } else {
        this.$XModal.message({ status: 'success', message: '校验成功！' })
      }
    },
    async fullValidEvent () {
      const errMap = await this.$refs.xTable.fullValidate().catch(errMap => errMap)
      if (errMap) {
        const msgList = []
        Object.values(errMap).forEach(errList => {
          errList.forEach(params => {
            const { rowIndex, column, rules } = params
            rules.forEach(rule => {
              msgList.push(`第 ${rowIndex + 1} 行 ${column.title} 校验错误：${rule.message}`)
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
      } else {
        this.$XModal.message({ status: 'success', message: '校验成功！' })
      }
    },
    async validAllEvent () {
      const errMap = await this.$refs.xTable.validate(true).catch(errMap => errMap)
      if (errMap) {
        this.$XModal.message({ status: 'error', message: '校验不通过！' })
      } else {
        this.$XModal.message({ status: 'success', message: '校验成功！' })
      }
    },
    async selectValidEvent () {
      const selectRecords = this.$refs.xTable.getCheckboxRecords()
      if (selectRecords.length > 0) {
        const errMap = await this.$refs.xTable.validate(selectRecords).catch(errMap => errMap)
        if (errMap) {
          this.$XModal.message({ status: 'error', message: '校验不通过！' })
        } else {
          this.$XModal.message({ status: 'success', message: '校验成功！' })
        }
      } else {
        this.$XModal.message({ status: 'warning', message: '未选中数据！' })
      }
    },
    async insertEvent () {
      const { row: newRow } = await this.$refs.xTable.insert()
      // 插入一条数据并触发校验
      const errMap = await this.$refs.xTable.validate(newRow).catch(errMap => errMap)
      if (errMap) {

      }
    },
    getSelectEvent () {
      const selectRecords = this.$refs.xTable.getCheckboxRecords()
      this.$XModal.alert(selectRecords.length)
    },
    getInsertEvent () {
      const insertRecords = this.$refs.xTable.getInsertRecords()
      this.$XModal.alert(insertRecords.length)
    },
    getRemoveEvent () {
      const removeRecords = this.$refs.xTable.getRemoveRecords()
      this.$XModal.alert(removeRecords.length)
    },
    getUpdateEvent () {
      const updateRecords = this.$refs.xTable.getUpdateRecords()
      this.$XModal.alert(updateRecords.length)
    }
  }
}
</script>
