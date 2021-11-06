<template>
  <div>
    <p class="tip">
      通过调用 <table-api-link prop="validate"/> 函数校验数据，<table-api-link prop="edit-rules"/> 校验规则配置，如果第一个参数为 true 则全量校验<br>
      <span class="red">（如果不指定数据，则默认只校验临时变动的数据，例如新增或修改...等）</span>
    </p>

    <vxe-toolbar>
      <template #buttons>
        <vxe-button @click="insertEvent">新增</vxe-button>
        <vxe-button @click="$refs.xTable.removeCheckboxRow()">删除选中</vxe-button>
        <vxe-button @click="validEvent">快速校验</vxe-button>
        <vxe-button @click="fullValidEvent">完整快速校验</vxe-button>
        <vxe-button @click="validAllEvent">全量数据校验</vxe-button>
        <vxe-button @click="selectValidEvent">选中行校验</vxe-button>
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
      <vxe-column type="checkbox" width="80"></vxe-column>
      <vxe-column type="seq" width="80"></vxe-column>
      <vxe-column field="name" title="Name" width="400" :edit-render="{name: 'input'}"></vxe-column>
      <vxe-column field="age" title="Age" width="200" :edit-render="{name: 'input'}"></vxe-column>
      <vxe-column field="sex2" title="Sex" width="200" :edit-render="{name: '$input'}"></vxe-column>
      <vxe-column field="date" title="Date" width="300" fixed="right" :edit-render="{name: '$input', props: {type: 'date'}}"></vxe-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script>
export default {
  data () {
    const nameValid = ({ cellValue }) => {
      if (cellValue && !/^\w+$/.test(cellValue)) {
        return new Error('名称格式不正确，必须字母或数字')
      }
    }
    return {
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, address: 'test abc' },
        { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: '0', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: '1', age: 23, address: 'test abc' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: '1', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: '1', age: 21, address: 'test abc' }
      ],
      validRules: {
        name: [
          { validator: nameValid }
        ],
        sex2: [
          { required: true, message: '性别必须填写' }
        ],
        age: [
          { type: 'number', min: 10, max: 100000, message: '输入 10 ~ 100000 范围' }
        ],
        date: [
          { required: true, message: '日期必须填写' }
        ]
      },
      demoCodes: [
        `
        <vxe-toolbar>
          <template #buttons>
            <vxe-button @click="insertEvent">新增</vxe-button>
            <vxe-button @click="$refs.xTable.removeCheckboxRow()">删除选中</vxe-button>
            <vxe-button @click="validEvent">快速校验</vxe-button>
            <vxe-button @click="fullValidEvent">完整快速校验</vxe-button>
            <vxe-button @click="validAllEvent">全量数据校验</vxe-button>
            <vxe-button @click="selectValidEvent">选中行校验</vxe-button>
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
          <vxe-column type="checkbox" width="80"></vxe-column>
          <vxe-column type="seq" width="80"></vxe-column>
          <vxe-column field="name" title="Name" width="400" :edit-render="{name: 'input'}"></vxe-column>
          <vxe-column field="age" title="Age" width="200" :edit-render="{name: 'input'}"></vxe-column>
          <vxe-column field="sex2" title="Sex" width="200" :edit-render="{name: '$input'}"></vxe-column>
          <vxe-column field="date" title="Date" width="300" fixed="right" :edit-render="{name: '$input', props: {type: 'date'}}"></vxe-column>
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
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, address: 'test abc' },
                { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: '0', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: '1', age: 23, address: 'test abc' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: '1', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: '1', age: 21, address: 'test abc' }
              ],
              validRules: {
                name: [
                  { validator: nameValid }
                ],
                sex2: [
                  { required: true, message: '性别必须填写' }
                ],
                age: [
                  { type: 'number', min: 10, max: 100000, message: '输入 10 ~ 100000 范围' }
                ],
                date: [
                  { required: true, message: '日期必须填写' }
                ]
              }
            }
          },
          methods: {
            async validEvent () {
              const $table = this.$refs.xTable
              const errMap = await $table.validate().catch(errMap => errMap)
              if (errMap) {
                this.$XModal.message({ status: 'error', message: '校验不通过！' })
              } else {
                this.$XModal.message({ status: 'success', message: '校验成功！' })
              }
            },
            async fullValidEvent () {
              const $table = this.$refs.xTable
              const errMap = await $table.fullValidate().catch(errMap => errMap)
              if (errMap) {
                const msgList = []
                Object.values(errMap).forEach(errList => {
                  errList.forEach(params => {
                    const { rowIndex, column, rules } = params
                    rules.forEach(rule => {
                      msgList.push(\`第 \${rowIndex + 1} 行 \${column.title} 校验错误：\${rule.message}\`)
                    })
                  })
                })
                this.$XModal.message({
                  status: 'error',
                  slots: {
                    default () {
                      return [
                        <div class="red" style="max-height: 400px;overflow: auto;">
                          {
                            msgList.map(msg => <div>{ msg }</div>)
                          }
                        </div>
                      ]
                    }
                  }
                })
              } else {
                this.$XModal.message({ status: 'success', message: '校验成功！' })
              }
            },
            async validAllEvent () {
              const $table = this.$refs.xTable
              const errMap = await $table.validate(true).catch(errMap => errMap)
              if (errMap) {
                this.$XModal.message({ status: 'error', message: '校验不通过！' })
              } else {
                this.$XModal.message({ status: 'success', message: '校验成功！' })
              }
            },
            async selectValidEvent () {
              const $table = this.$refs.xTable
              const selectRecords = $table.getCheckboxRecords()
              if (selectRecords.length > 0) {
                const errMap = await $table.validate(selectRecords).catch(errMap => errMap)
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
              const $table = this.$refs.xTable
              const { row: newRow } = await $table.insert()
              // 插入一条数据并触发校验
              const errMap = await $table.validate(newRow).catch(errMap => errMap)
              if (errMap) {

              }
            },
            getSelectEvent () {
              const $table = this.$refs.xTable
              const selectRecords = $table.getCheckboxRecords()
              this.$XModal.alert(selectRecords.length)
            },
            getInsertEvent () {
              const $table = this.$refs.xTable
              const insertRecords = $table.getInsertRecords()
              this.$XModal.alert(insertRecords.length)
            },
            getRemoveEvent () {
              const $table = this.$refs.xTable
              const removeRecords = $table.getRemoveRecords()
              this.$XModal.alert(removeRecords.length)
            },
            getUpdateEvent () {
              const $table = this.$refs.xTable
              const updateRecords = $table.getUpdateRecords()
              this.$XModal.alert(updateRecords.length)
            }
          }
        }
        `
      ]
    }
  },
  methods: {
    async validEvent () {
      const $table = this.$refs.xTable
      const errMap = await $table.validate().catch(errMap => errMap)
      if (errMap) {
        this.$XModal.message({ status: 'error', message: '校验不通过！' })
      } else {
        this.$XModal.message({ status: 'success', message: '校验成功！' })
      }
    },
    async fullValidEvent () {
      const $table = this.$refs.xTable
      const errMap = await $table.fullValidate().catch(errMap => errMap)
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
          slots: {
            default () {
              return [
                <div class="red" style="max-height: 400px;overflow: auto;">
                  {
                    msgList.map(msg => <div>{ msg }</div>)
                  }
                </div>
              ]
            }
          }
        })
      } else {
        this.$XModal.message({ status: 'success', message: '校验成功！' })
      }
    },
    async validAllEvent () {
      const $table = this.$refs.xTable
      const errMap = await $table.validate(true).catch(errMap => errMap)
      if (errMap) {
        this.$XModal.message({ status: 'error', message: '校验不通过！' })
      } else {
        this.$XModal.message({ status: 'success', message: '校验成功！' })
      }
    },
    async selectValidEvent () {
      const $table = this.$refs.xTable
      const selectRecords = $table.getCheckboxRecords()
      if (selectRecords.length > 0) {
        const errMap = await $table.validate(selectRecords).catch(errMap => errMap)
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
      const $table = this.$refs.xTable
      const { row: newRow } = await $table.insert()
      // 插入一条数据并触发校验
      const errMap = await $table.validate(newRow).catch(errMap => errMap)
      if (errMap) {

      }
    },
    getSelectEvent () {
      const $table = this.$refs.xTable
      const selectRecords = $table.getCheckboxRecords()
      this.$XModal.alert(selectRecords.length)
    },
    getInsertEvent () {
      const $table = this.$refs.xTable
      const insertRecords = $table.getInsertRecords()
      this.$XModal.alert(insertRecords.length)
    },
    getRemoveEvent () {
      const $table = this.$refs.xTable
      const removeRecords = $table.getRemoveRecords()
      this.$XModal.alert(removeRecords.length)
    },
    getUpdateEvent () {
      const $table = this.$refs.xTable
      const updateRecords = $table.getUpdateRecords()
      this.$XModal.alert(updateRecords.length)
    }
  }
}
</script>
