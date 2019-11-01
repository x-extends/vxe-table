<template>
  <div>
    <p class="tip">更加复杂的合并行，实现横向树结构<br><span class="red">（注：<table-api-link prop="span-method"/> 合并的逻辑都是自行实现的，该示例仅供参考）</span></p>

    <vxe-table
      border
      height="600"
      :span-method="rowspanMethod"
      :data="tableData">
      <vxe-table-column field="name_1" title="功能模块"></vxe-table-column>
      <vxe-table-column field="name_2" title="详细功能"></vxe-table-column>
      <vxe-table-column field="name_3" title="权限类型">
        <template v-slot="{ row }">
          <vxe-checkbox v-model="row.check_3" @change="check3ChangeEvent(row)">{{ row.name_3 }}</vxe-checkbox>
        </template>
      </vxe-table-column>
      <vxe-table-column field="name_4" title="权限列表">
        <template v-slot="{ row }">
          <vxe-checkbox v-model="row.check_4" @change="check4ChangeEvent(row)">{{ row.name_4 }}</vxe-checkbox>
        </template>
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
import XEUtils from 'xe-utils'

export default {
  data () {
    return {
      treeData: [
        {
          id: '10000',
          name: '账号管理',
          children: [
            {
              id: '11000',
              name: '用户管理',
              children: [
                {
                  id: '11100',
                  name: '查看',
                  children: [
                    {
                      id: '11110',
                      name: '用户列表'
                    }
                  ]
                },
                {
                  id: '11200',
                  name: '编辑',
                  children: [
                    {
                      id: '11210',
                      name: '用户列表'
                    },
                    {
                      id: '11220',
                      name: '新增用户'
                    }
                  ]
                },
                {
                  id: '11300',
                  name: '操作',
                  children: [
                    {
                      id: '11310',
                      name: '新增'
                    },
                    {
                      id: '11320',
                      name: '删除'
                    },
                    {
                      id: '11330',
                      name: '修改'
                    }
                  ]
                }
              ]
            },
            {
              id: '12000',
              name: '角色管理',
              children: [
                {
                  id: '12100',
                  name: '查看',
                  children: [
                    {
                      id: '12110',
                      name: '角色列表'
                    }
                  ]
                },
                {
                  id: '12200',
                  name: '编辑',
                  children: [
                    {
                      id: '122100',
                      name: '角色列表'
                    },
                    {
                      id: '12220',
                      name: '新增角色'
                    }
                  ]
                },
                {
                  id: '12300',
                  name: '操作',
                  children: [
                    {
                      id: '12310',
                      name: '新增'
                    },
                    {
                      id: '12320',
                      name: '删除'
                    },
                    {
                      id: '12330',
                      name: '修改'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: '20000',
          name: '个人中心',
          children: [
            {
              id: '21000',
              name: '个性化设置',
              children: [
                {
                  id: '21100',
                  name: '查看',
                  children: [
                    {
                      id: '21110',
                      name: '信息列表'
                    }
                  ]
                },
                {
                  id: '21200',
                  name: '操作',
                  children: [
                    {
                      id: '21210',
                      name: '重置信息'
                    }
                  ]
                }
              ]
            },
            {
              id: '22000',
              name: '账户管理',
              children: [
                {
                  id: '22100',
                  name: '查看',
                  children: [
                    {
                      id: '22110',
                      name: '账户余额'
                    },
                    {
                      id: '22120',
                      name: '帐变记录'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      tableData: [],
      demoCodes: [
        `
        <vxe-table
          border
          height="600"
          :span-method="rowspanMethod"
          :data="tableData">
          <vxe-table-column field="name_1" title="功能模块"></vxe-table-column>
          <vxe-table-column field="name_2" title="详细功能"></vxe-table-column>
          <vxe-table-column field="name_3" title="权限类型">
            <template v-slot="{ row }">
              <vxe-checkbox v-model="row.check_3" @change="check3ChangeEvent(row)">{{ row.name_3 }}</vxe-checkbox>
            </template>
          </vxe-table-column>
          <vxe-table-column field="name_4" title="权限列表">
            <template v-slot="{ row }">
              <vxe-checkbox v-model="row.check_4" @change="check4ChangeEvent(row)">{{ row.name_4 }}</vxe-checkbox>
            </template>
          </vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              treeData: [
                {
                  id: '10000',
                  name: '账号管理',
                  children: [
                    {
                      id: '11000',
                      name: '用户管理',
                      children: [
                        {
                          id: '11100',
                          name: '查看',
                          children: [
                            {
                              id: '11110',
                              name: '用户列表'
                            }
                          ]
                        },
                        {
                          id: '11200',
                          name: '编辑',
                          children: [
                            {
                              id: '11210',
                              name: '用户列表'
                            },
                            {
                              id: '11220',
                              name: '新增用户'
                            }
                          ]
                        },
                        {
                          id: '11300',
                          name: '操作',
                          children: [
                            {
                              id: '11310',
                              name: '新增'
                            },
                            {
                              id: '11320',
                              name: '删除'
                            },
                            {
                              id: '11330',
                              name: '修改'
                            }
                          ]
                        }
                      ]
                    },
                    {
                      id: '12000',
                      name: '角色管理',
                      children: [
                        {
                          id: '12100',
                          name: '查看',
                          children: [
                            {
                              id: '12110',
                              name: '角色列表'
                            }
                          ]
                        },
                        {
                          id: '12200',
                          name: '编辑',
                          children: [
                            {
                              id: '122100',
                              name: '角色列表'
                            },
                            {
                              id: '12220',
                              name: '新增角色'
                            }
                          ]
                        },
                        {
                          id: '12300',
                          name: '操作',
                          children: [
                            {
                              id: '12310',
                              name: '新增'
                            },
                            {
                              id: '12320',
                              name: '删除'
                            },
                            {
                              id: '12330',
                              name: '修改'
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  id: '20000',
                  name: '个人中心',
                  children: [
                    {
                      id: '21000',
                      name: '个性化设置',
                      children: [
                        {
                          id: '21100',
                          name: '查看',
                          children: [
                            {
                              id: '21110',
                              name: '信息列表'
                            }
                          ]
                        },
                        {
                          id: '21200',
                          name: '操作',
                          children: [
                            {
                              id: '21210',
                              name: '重置信息'
                            }
                          ]
                        }
                      ]
                    },
                    {
                      id: '22000',
                      name: '账户管理',
                      children: [
                        {
                          id: '22100',
                          name: '查看',
                          children: [
                            {
                              id: '22110',
                              name: '账户余额'
                            },
                            {
                              id: '22120',
                              name: '帐变记录'
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ],
              tableData: []
            }
          },
          created () {
            this.toColTreeData()
          },
          methods: {
            check3ChangeEvent (row) {
            let checked = row.check_3
            let levelList = this.tableData.filter(item => item.id_3 === row.id_3)
            levelList.forEach(item => {
              item.check_4 = checked
            })
          },
          check4ChangeEvent (row) {
            let levelList = this.tableData.filter(item => item.id_3 === row.id_3)
            let checked = levelList.every(item => item.check_4)
            levelList.forEach(item => {
              item.check_3 = checked
            })
          },
          // 转换横向树结构
          toColTreeData () {
            let options = { children: 'children' }
            let list = []
            let keyMap = {}
            XEUtils.eachTree(this.treeData, (item, index, result, paths, parent) => {
              keyMap[item.id] = item
              item.keys = parent ? parent.keys.concat([item.id]) : [item.id]
              if (!item.children || !item.children.length) {
                let row = { }
                item.keys.forEach((key, index) => {
                  let level = index + 1
                  let obj = keyMap[key]
                  row[\`check_\${level}\`] = false
                  row[\`id_\${level}\`] = obj.id
                  row[\`name_\${level}\`] = obj.name
                })
                list.push(row)
              }
            }, options)
            this.keyMap = keyMap
            this.tableData = list
          },
          // 通用行合并函数（将相同多列数据合并为一行）
          rowspanMethod ({ row, $rowIndex, column, data }) {
            let fields = ['name_1', 'name_2', 'name_3']
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
        `
      ]
    }
  },
  created () {
    this.toColTreeData()
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    check3ChangeEvent (row) {
      let checked = row.check_3
      let levelList = this.tableData.filter(item => item.id_3 === row.id_3)
      levelList.forEach(item => {
        item.check_4 = checked
      })
    },
    check4ChangeEvent (row) {
      let levelList = this.tableData.filter(item => item.id_3 === row.id_3)
      let checked = levelList.every(item => item.check_4)
      levelList.forEach(item => {
        item.check_3 = checked
      })
    },
    // 转换横向树结构
    toColTreeData () {
      let options = { children: 'children' }
      let list = []
      let keyMap = {}
      XEUtils.eachTree(this.treeData, (item, index, result, paths, parent) => {
        keyMap[item.id] = item
        item.keys = parent ? parent.keys.concat([item.id]) : [item.id]
        if (!item.children || !item.children.length) {
          let row = { }
          item.keys.forEach((key, index) => {
            let level = index + 1
            let obj = keyMap[key]
            row[`check_${level}`] = false
            row[`id_${level}`] = obj.id
            row[`name_${level}`] = obj.name
          })
          list.push(row)
        }
      }, options)
      this.keyMap = keyMap
      this.tableData = list
    },
    // 通用行合并函数（将相同多列数据合并为一行）
    rowspanMethod ({ row, $rowIndex, column, data }) {
      let fields = ['name_1', 'name_2', 'name_3']
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
</script>
