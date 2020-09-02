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
        <vxe-button @click="validEvent">快速校验</vxe-button>
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
      height="500"
      ref="xTable"
      :data="tableData"
      :edit-rules="validRules"
      :edit-config="{trigger: 'click', mode: 'cell', showStatus: true}">
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column title="分组1">
        <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
        <vxe-table-column field="role" title="Role" :edit-render="{name: 'input'}"></vxe-table-column>
      </vxe-table-column>
      <vxe-table-column title="分组2">
        <vxe-table-column title="分组21">
          <vxe-table-column field="sex2" title="Sex" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="age" title="Age" :edit-render="{name: '$input', props: {type: 'integer'}}"></vxe-table-column>
          <vxe-table-column field="date" title="Date" :edit-render="{name: '$input', props: {type: 'date'}}"></vxe-table-column>
        </vxe-table-column>
      </vxe-table-column>
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
      // 模拟服务端校验
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (cellValue && (cellValue.length < 3 || cellValue.length > 50)) {
            reject(new Error('名称长度在 3 到 50 个字符之间'))
          } else {
            resolve()
          }
        }, 100)
      })
    }
    const roleValid = ({ cellValue }) => {
      if (cellValue && !['前端', '后端', '设计师', '项目经理', '测试'].includes(cellValue)) {
        return new Error('角色输入不正确')
      }
    }
    return {
      tableData: [],
      validRules: {
        name: [
          { required: true, message: 'app.body.valid.rName' },
          { validator: nameValid }
        ],
        role: [
          { validator: roleValid }
        ],
        sex2: [
          { required: true, message: '性别必须填写' },
          { pattern: /^[0,1]{1}$/, message: '格式不正确' }
        ],
        age: [
          { pattern: '^[0-9]{0,3}$', message: '格式不正确' }
        ]
      },
      demoCodes: [
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button @click="insertEvent">新增</vxe-button>
            <vxe-button @click="$refs.xTable.removeCheckboxRow()">删除选中</vxe-button>
            <vxe-button @click="validEvent">快速校验</vxe-button>
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
          height="500"
          ref="xTable"
          :data="tableData"
          :edit-rules="validRules"
          :edit-config="{trigger: 'click', mode: 'cell', showStatus: true}">
          <vxe-table-column type="checkbox" width="60"></vxe-table-column>
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column title="分组1">
            <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
            <vxe-table-column field="role" title="Role" :edit-render="{name: 'input'}"></vxe-table-column>
          </vxe-table-column>
          <vxe-table-column title="分组2">
            <vxe-table-column title="分组21">
              <vxe-table-column field="sex2" title="Sex" :edit-render="{name: 'input'}"></vxe-table-column>
              <vxe-table-column field="age" title="Age" :edit-render="{name: '$input', props: {type: 'integer'}}"></vxe-table-column>
              <vxe-table-column field="date" title="Date" :edit-render="{name: '$input', props: {type: 'date'}}"></vxe-table-column>
            </vxe-table-column>
          </vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            const nameValid = ({ cellValue }) => {
              // 模拟服务端校验
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  if (cellValue && (cellValue.length < 3 || cellValue.length > 50)) {
                    reject(new Error('名称长度在 3 到 50 个字符之间'))
                  } else {
                    resolve()
                  }
                }, 100)
              })
            }
            const roleValid = ({ cellValue }) => {
              if (cellValue && !['前端', '后端', '设计师', '项目经理', '测试'].includes(cellValue)) {
                return new Error('角色输入不正确')
              }
            }
            return {
              tableData: [],
              validRules: {
                name: [
                  { required: true, message: 'app.body.valid.rName' },
                  { validator: nameValid }
                ],
                role: [
                  { validator: roleValid }
                ],
                sex2: [
                  { required: true, message: '性别必须填写' },
                  { pattern: /^[0,1]{1}$/, message: '格式不正确' }
                ],
                age: [
                  { pattern: '^[0-9]{0,3}$', message: '格式不正确' }
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
