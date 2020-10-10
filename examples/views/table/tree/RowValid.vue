<template>
  <div>
    <p class="tip">
      通过调用 <table-api-link prop="validate"/> 函数校验数据，<table-api-link prop="edit-rules"/> 校验规则配置<br>
      <span class="red">（不指定数据的情况下，默认只校验状态发生变动的数据，例如：新增、修改...等）</span>
    </p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="validEvent">校验</vxe-button>
        <vxe-button @click="fullValidEvent">完整校验</vxe-button>
        <vxe-button @click="selectValidEvent">选中校验</vxe-button>
        <vxe-button @click="getSelectEvent">获取选中</vxe-button>
        <vxe-button @click="getUpdateEvent">获取修改</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      resizable
      show-overflow
      keep-source
      ref="xTree"
      :edit-rules="validRules"
      :tree-config="treeConfig"
      :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
      :checkbox-config="{labelField: 'id'}"
      :data="tableData">
      <vxe-table-column type="checkbox" title="ID" tree-node></vxe-table-column>
      <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="size" title="Size" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="type" title="Type" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="date" title="Date" :edit-render="{name: '$input', props: {type: 'date'}}"></vxe-table-column>
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
      treeConfig: {
        children: 'children'
      },
      validRules: {
        name: [
          { required: true, message: 'app.body.valid.rName' },
          { min: 3, max: 50, message: '文件名长度在 3 到 50 个字符' }
        ]
      },
      demoCodes: [
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button @click="validEvent">校验</vxe-button>
            <vxe-button @click="fullValidEvent">完整校验</vxe-button>
            <vxe-button @click="selectValidEvent">选中校验</vxe-button>
            <vxe-button @click="getSelectEvent">获取选中</vxe-button>
            <vxe-button @click="getUpdateEvent">获取修改</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          resizable
          show-overflow
          keep-source
          ref="xTree"
          :edit-rules="validRules"
          :tree-config="treeConfig"
          :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
          :checkbox-config="{labelField: 'id'}"
          :data="tableData">
          <vxe-table-column type="checkbox" title="ID" tree-node></vxe-table-column>
          <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="size" title="Size" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="type" title="Type" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="date" title="Date" :edit-render="{name: '$input', props: {type: 'date'}}"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [],
              treeConfig: {
                children: 'children'
              },
              validRules: {
                name: [
                  { required: true, message: 'app.body.valid.rName' },
                  { min: 3, max: 50, message: '文件名长度在 3 到 50 个字符' }
                ]
              }
            }
          },
          created () {
            this.tableData = window.MOCK_TREE_DATA_LIST
          },
          methods: {
            validEvent () {
              this.$refs.xTree.validate((errMap) => {
                if (errMap) {
                  this.$XModal.message({ status: 'error', message: '校验不通过！' })
                } else {
                  this.$XModal.message({ status: 'success', message: '校验成功！' })
                }
              })
            },
            fullValidEvent () {
              this.$refs.xTree.fullValidate((errMap) => {
                if (errMap) {
                  let msgList = []
                  Object.values(errMap).forEach(errList => {
                    errList.forEach(params => {
                      let { row, column, rules } = params
                      let matchObj = XEUtils.findTree(this.tableData, item => item === row, this.treeConfig)
                      let seq = matchObj.path.filter(item => item !== this.treeConfig.children).map(item => Number(item) + 1).join('.')
                      rules.forEach(rule => {
                        msgList.push(\`第 \${seq} 行 \${column.title} 校验错误：\${rule.message}\`)
                      })
                    })
                  })
                  this.$XModal.message({
                    status: 'error',
                    message: () => {
                      return [
                        <div class="red" style="max-height: 400px;overflow: auto;">
                          {
                            msgList.map(msg => {
                              return <div>{ msg }</div>
                            })
                          }
                        </div>
                      ]
                    }
                  })
                } else {
                  this.$XModal.message({ status: 'success', message: '校验成功！' })
                }
              })
            },
            selectValidEvent () {
              let selectRecords = this.$refs.xTree.getCheckboxRecords()
              if (selectRecords.length > 0) {
                this.$refs.xTree.validate(selectRecords, (errMap) => {
                  if (errMap) {
                    this.$XModal.message({ status: 'error', message: '校验不通过！' })
                  } else {
                    this.$XModal.message({ status: 'success', message: '校验成功！' })
                  }
                })
              } else {
                this.$XModal.message({ status: 'warning', message: '未选中数据！' })
              }
            },
            getSelectEvent () {
              let selectRecords = this.$refs.xTree.getCheckboxRecords()
              this.$XModal.alert(selectRecords.length)
            },
            getUpdateEvent () {
              let updateRecords = this.$refs.xTree.getUpdateRecords()
              this.$XModal.alert(updateRecords.length)
            }
          }
        }
        `
      ]
    }
  },
  created () {
    this.tableData = XEUtils.clone(window.MOCK_TREE_DATA_LIST, true)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    validEvent () {
      this.$refs.xTree.validate((errMap) => {
        if (errMap) {
          this.$XModal.message({ status: 'error', message: '校验不通过！' })
        } else {
          this.$XModal.message({ status: 'success', message: '校验成功！' })
        }
      })
    },
    fullValidEvent () {
      this.$refs.xTree.fullValidate((errMap) => {
        if (errMap) {
          const msgList = []
          Object.values(errMap).forEach(errList => {
            errList.forEach(params => {
              const { row, column, rules } = params
              const matchObj = XEUtils.findTree(this.tableData, item => item === row, this.treeConfig)
              const seq = matchObj.path.filter(item => item !== this.treeConfig.children).map(item => Number(item) + 1).join('.')
              rules.forEach(rule => {
                msgList.push(`第 ${seq} 行 ${column.title} 校验错误：${rule.message}`)
              })
            })
          })
          this.$XModal.message({
            status: 'error',
            message: () => {
              return [
                <div class="red" style="max-height: 400px;overflow: auto;">
                  {
                    msgList.map(msg => {
                      return <div>{ msg }</div>
                    })
                  }
                </div>
              ]
            }
          })
        } else {
          this.$XModal.message({ status: 'success', message: '校验成功！' })
        }
      })
    },
    selectValidEvent () {
      const selectRecords = this.$refs.xTree.getCheckboxRecords()
      if (selectRecords.length > 0) {
        this.$refs.xTree.validate(selectRecords, (errMap) => {
          if (errMap) {
            this.$XModal.message({ status: 'error', message: '校验不通过！' })
          } else {
            this.$XModal.message({ status: 'success', message: '校验成功！' })
          }
        })
      } else {
        this.$XModal.message({ status: 'warning', message: '未选中数据！' })
      }
    },
    getSelectEvent () {
      const selectRecords = this.$refs.xTree.getCheckboxRecords()
      this.$XModal.alert(selectRecords.length)
    },
    getUpdateEvent () {
      const updateRecords = this.$refs.xTree.getUpdateRecords()
      this.$XModal.alert(updateRecords.length)
    }
  }
}
</script>
