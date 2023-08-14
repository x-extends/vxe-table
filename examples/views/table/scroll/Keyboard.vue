<template>
  <div>
    <p class="tip">全键盘操作</p>

    <vxe-toolbar :refresh="{query: findList}">
      <template #buttons>
        <vxe-button>
          <template #default>新增操作</template>
          <template #dropdowns>
            <vxe-button type="text" @click="insertEvent(null)">从第一行插入</vxe-button>
            <vxe-button type="text" @click="insertEvent(-1)">从最后插入</vxe-button>
            <vxe-button type="text" @click="insertEvent($refs.xTable.getData(100))">插入到 100 行</vxe-button>
            <vxe-button type="text" @click="insertEvent($refs.xTable.getData(400))">插入到 400 行</vxe-button>
          </template>
        </vxe-button>
        <vxe-button>
          <template #default>删除操作</template>
          <template #dropdowns>
            <vxe-button type="text" @click="$refs.xTable.removeCheckboxRow()">删除选中</vxe-button>
            <vxe-button type="text" @click="$refs.xTable.remove($refs.xTable.getData(0))">删除第一行</vxe-button>
            <vxe-button type="text" @click="$refs.xTable.remove($refs.xTable.getData($refs.xTable.getData().length - 1))">删除最后一行</vxe-button>
            <vxe-button type="text" @click="$refs.xTable.remove($refs.xTable.getData(100))">删除第 100 行</vxe-button>
          </template>
        </vxe-button>
        <vxe-button>
          <template #default>校验操作</template>
          <template #dropdowns>
            <vxe-button type="text" @click="validEvent">快速校验</vxe-button>
            <vxe-button type="text" @click="fullValidEvent">完整快速校验</vxe-button>
            <vxe-button type="text" @click="selectValidEvent">选中行校验</vxe-button>
          </template>
        </vxe-button>
        <vxe-button @click="getInsertEvent">获取新增</vxe-button>
        <vxe-button @click="getRemoveEvent">获取删除</vxe-button>
        <vxe-button @click="getUpdateEvent">获取修改</vxe-button>
        <vxe-button>
          <template #default>滚动操作</template>
          <template #dropdowns>
            <vxe-button type="text" @click="$refs.xTable.scrollToRow($refs.xTable.getData(10))">滚动到第 10 行</vxe-button>
            <vxe-button type="text" @click="$refs.xTable.scrollToRow($refs.xTable.getData(400))">滚动第 400 行</vxe-button>
            <vxe-button type="text" @click="$refs.xTable.scrollToColumn($refs.xTable.getColumns(1))">滚动第 1 列</vxe-button>
            <vxe-button type="text" @click="$refs.xTable.scrollToColumn($refs.xTable.getColumns(10))">滚动第 10 列</vxe-button>
          </template>
        </vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      resizable
      show-overflow
      keep-source
      ref="xTable"
      height="300"
      :loading="demo1.loading"
      :edit-rules="demo1.validRules"
      :mouse-config="{selected: true}"
      :checkbox-config="{checkField: 'checked'}"
      :edit-config="{trigger: 'dblclick', mode: 'cell', showStatus: true}"
      :keyboard-config="{isArrow: true, isDel: true, isEnter: true, isTab: true, isEdit: true}"
      :scroll-y="{enabled: true}">
      <vxe-column type="checkbox" width="60"></vxe-column>
      <vxe-column type="seq" width="100"></vxe-column>
      <vxe-column field="name" title="Name" sortable width="200" :edit-render="{name: 'input'}"></vxe-column>
      <vxe-column field="age" title="Age" width="200" :edit-render="{name: 'input'}"></vxe-column>
      <vxe-column field="sex" title="Sex" width="200" :edit-render="{name: 'input'}"></vxe-column>
      <vxe-column field="rate" title="Rate" width="200"></vxe-column>
      <vxe-column field="region" title="Region" width="200"></vxe-column>
      <vxe-column field="time" title="Time" width="200"></vxe-column>
      <vxe-column field="address" title="Address" width="300" show-overflow></vxe-column>
      <vxe-column field="updateTime" title="UpdateTime" width="200"></vxe-column>
      <vxe-column field="createTime" title="CreateTime" width="200"></vxe-column>
    </vxe-table>

    <pre>
      <pre-code>
        | Arrow Up ↑ | 移动到当前活动单元格上面的单元格 |
        | Arrow Down ↓ | 移动到当前活动单元格下面的单元格 |
        | Arrow Left ← | 移动到当前活动单元格左边的单元格 |
        | Arrow Right → | 移动到当前活动单元格右边的单元格 |
        | Tab | 移动到当前选中或活动单元格的右侧单元格，如果到最后一列且存在下一行，则从下一行开始移动 |
        | Tab + Shift | 移动到当前选中或活动单元格的左侧单元格，如果到第一列且存在上一行，则从上一行开始移动 |
        | Spacebar | 如果单元格是复选框或单选框则切换勾选状态 |
        | Enter | 取消编辑并移动到当前活动单元格下面的单元格 |
        | Delete | 清空内容 |
        | Backspace | 清空内容并激活选中单元格为编辑状态 |
        | F2 | 激活单元格编辑 |
        | Esc | 取消单元格编辑 |
        | Page Up | 向上翻页滚动 |
        | Page Down | 向下翻页滚动 |
        | Home | 滚动到顶部 |
        | End | 滚动到底部 |
      </pre-code>
    </pre>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="tsx">
import { defineComponent, reactive, ref } from 'vue'
import { VXETable } from '../../../../packages/all'
import { VxeTableInstance, VxeTablePropTypes } from '../../../../types/index'

export default defineComponent({
  setup () {
    const xTable = ref({} as VxeTableInstance)

    const demo1 = reactive({
      loading: false,
      validRules: {
        name: [
          { required: true, message: 'app.body.valid.rName' },
          { min: 3, max: 50, message: '名称长度在 3 到 50 个字符' }
        ],
        sex: [
          { required: true, message: '性别必须填写' }
        ]
      } as VxeTablePropTypes.ValidConfig
    })

    const mockList = (size: number) => {
      const list = []
      for (let index = 0; index < size; index++) {
        list.push({
          checked: false,
          name: `名称${index}`,
          sex: '0',
          num: 123,
          age: 18,
          num2: 234,
          rate: 3,
          address: 'shenzhen'
        })
      }
      return list
    }

    const findList = () => {
      demo1.loading = true
      return new Promise(resolve => {
        setTimeout(() => {
          const tableData = mockList(600)
          // 阻断 vue 对大数组的监听，避免 vue 绑定大数据造成短暂的卡顿
          const $table = xTable.value
          if ($table) {
            $table.loadData(tableData)
          }
          resolve(null)
          demo1.loading = false
        }, 300)
      })
    }

    const validEvent = async () => {
      const $table = xTable.value
      const errMap = await $table.validate().catch(errMap => errMap)
      if (errMap) {
        VXETable.modal.message({ status: 'error', content: '校验不通过！' })
      } else {
        VXETable.modal.message({ status: 'success', content: '校验成功！' })
      }
    }

    const fullValidEvent = () => {
      const $table = xTable.value
      $table.fullValidate((errMap) => {
        if (errMap) {
          const msgList: string[] = []
          Object.values(errMap).forEach((errList) => {
            errList.forEach(params => {
              const { rowIndex, column, rules } = params
              rules.forEach(rule => {
                msgList.push(`第 ${rowIndex + 1} 行 ${column.title} 校验错误：${rule.message}`)
              })
            })
          })
          VXETable.modal.message({
            status: 'error',
            slots: {
              default () {
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
            }
          })
        } else {
          VXETable.modal.message({ status: 'success', content: '校验成功！' })
        }
      })
    }

    const selectValidEvent = async () => {
      const $table = xTable.value
      const selectRecords = $table.getCheckboxRecords()
      if (selectRecords.length > 0) {
        const errMap = await $table.validate(selectRecords).catch(errMap => errMap)
        if (errMap) {
          VXETable.modal.message({ status: 'error', content: '校验不通过！' })
        } else {
          VXETable.modal.message({ status: 'success', content: '校验成功！' })
        }
      } else {
        VXETable.modal.message({ status: 'warning', content: '未选中数据！' })
      }
    }

    const insertEvent = (row: any) => {
      const $table = xTable.value
      const record = {
        checked: false
      }
      $table.insertAt(record, row).then(({ row }) => {
        $table.setActiveRow(row)
      })
    }

    const getInsertEvent = () => {
      const $table = xTable.value
      const insertRecords = $table.getInsertRecords()
      VXETable.modal.alert(insertRecords.length)
    }

    const getRemoveEvent = () => {
      const $table = xTable.value
      const removeRecords = $table.getRemoveRecords()
      VXETable.modal.alert(removeRecords.length)
    }

    const getUpdateEvent = () => {
      const $table = xTable.value
      const updateRecords = $table.getUpdateRecords()
      VXETable.modal.alert(updateRecords.length)
    }

    findList()

    return {
      xTable,
      demo1,
      findList,
      validEvent,
      fullValidEvent,
      selectValidEvent,
      insertEvent,
      getInsertEvent,
      getRemoveEvent,
      getUpdateEvent,
      demoCodes: [
        `
        <vxe-toolbar :refresh="{query: findList}">
          <template #buttons>
            <vxe-button>
              <template #default>新增操作</template>
              <template #dropdowns>
                <vxe-button type="text" @click="insertEvent(null)">从第一行插入</vxe-button>
                <vxe-button type="text" @click="insertEvent(-1)">从最后插入</vxe-button>
                <vxe-button type="text" @click="insertEvent($refs.xTable.getData(100))">插入到 100 行</vxe-button>
                <vxe-button type="text" @click="insertEvent($refs.xTable.getData(400))">插入到 400 行</vxe-button>
              </template>
            </vxe-button>
            <vxe-button>
              <template #default>删除操作</template>
              <template #dropdowns>
                <vxe-button type="text" @click="$refs.xTable.removeCheckboxRow()">删除选中</vxe-button>
                <vxe-button type="text" @click="$refs.xTable.remove($refs.xTable.getData(0))">删除第一行</vxe-button>
                <vxe-button type="text" @click="$refs.xTable.remove($refs.xTable.getData($refs.xTable.getData().length - 1))">删除最后一行</vxe-button>
                <vxe-button type="text" @click="$refs.xTable.remove($refs.xTable.getData(100))">删除第 100 行</vxe-button>
              </template>
            </vxe-button>
            <vxe-button>
              <template #default>校验操作</template>
              <template #dropdowns>
                <vxe-button type="text" @click="validEvent">快速校验</vxe-button>
                <vxe-button type="text" @click="fullValidEvent">完整快速校验</vxe-button>
                <vxe-button type="text" @click="selectValidEvent">选中行校验</vxe-button>
              </template>
            </vxe-button>
            <vxe-button @click="getInsertEvent">获取新增</vxe-button>
            <vxe-button @click="getRemoveEvent">获取删除</vxe-button>
            <vxe-button @click="getUpdateEvent">获取修改</vxe-button>
            <vxe-button>
              <template #default>滚动操作</template>
              <template #dropdowns>
                <vxe-button type="text" @click="$refs.xTable.scrollToRow($refs.xTable.getData(10))">滚动到第 10 行</vxe-button>
                <vxe-button type="text" @click="$refs.xTable.scrollToRow($refs.xTable.getData(400))">滚动第 400 行</vxe-button>
                <vxe-button type="text" @click="$refs.xTable.scrollToColumn($refs.xTable.getColumns(1))">滚动第 1 列</vxe-button>
                <vxe-button type="text" @click="$refs.xTable.scrollToColumn($refs.xTable.getColumns(10))">滚动第 10 列</vxe-button>
              </template>
            </vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          resizable
          show-overflow
          keep-source
          ref="xTable"
          height="300"
          :loading="demo1.loading"
          :edit-rules="demo1.validRules"
          :mouse-config="{selected: true}"
          :checkbox-config="{checkField: 'checked'}"
          :edit-config="{trigger: 'dblclick', mode: 'cell', showStatus: true}"
          :keyboard-config="{isArrow: true, isDel: true, isEnter: true, isTab: true, isEdit: true}">
          <vxe-column type="checkbox" width="60"></vxe-column>
          <vxe-column type="seq" width="100"></vxe-column>
          <vxe-column field="name" title="Name" sortable width="200" :edit-render="{name: 'input'}"></vxe-column>
          <vxe-column field="age" title="Age" width="200" :edit-render="{name: 'input'}"></vxe-column>
          <vxe-column field="sex" title="Sex" width="200" :edit-render="{name: 'input'}"></vxe-column>
          <vxe-column field="rate" title="Rate" width="200"></vxe-column>
          <vxe-column field="region" title="Region" width="200"></vxe-column>
          <vxe-column field="time" title="Time" width="200"></vxe-column>
          <vxe-column field="address" title="Address" width="300" show-overflow></vxe-column>
          <vxe-column field="updateTime" title="UpdateTime" width="200"></vxe-column>
          <vxe-column field="createTime" title="CreateTime" width="200"></vxe-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive, ref } from 'vue'
        import { VXETable, VxeTableInstance, VxeTablePropTypes } from 'vxe-table'

        export default defineComponent({
          setup () {
            const xTable = ref({} as VxeTableInstance)

            const demo1 = reactive({
              loading: false,
              validRules: {
                name: [
                  { required: true, message: 'app.body.valid.rName' },
                  { min: 3, max: 50, message: '名称长度在 3 到 50 个字符' }
                ],
                sex: [
                  { required: true, message: '性别必须填写' }
                ]
              } as VxeTablePropTypes.ValidConfig
            })

            const mockList = (size: number) => {
              const list = []
              for (let index = 0; index < size; index++) {
                list.push({
                  checked: false,
                  name: \`名称\${index}\`,
                  sex: '0',
                  num: 123,
                  age: 18,
                  num2: 234,
                  rate: 3,
                  address: 'shenzhen'
                })
              }
              return list
            }

            const findList = () => {
              demo1.loading = true
              return new Promise(resolve => {
                setTimeout(() => {
                  const tableData = mockList(600)
                  // 阻断 vue 对大数组的监听，避免 vue 绑定大数据造成短暂的卡顿
                  const $table = xTable.value
                  if ($table) {
                    $table.loadData(tableData)
                  }
                  resolve(null)
                  demo1.loading = false
                }, 300)
              })
            }

            const validEvent = async () => {
              const $table = xTable.value
              const errMap = await $table.validate().catch(errMap => errMap)
              if (errMap) {
                VXETable.modal.message({ status: 'error', content: '校验不通过！' })
              } else {
                VXETable.modal.message({ status: 'success', content: '校验成功！' })
              }
            }

            const fullValidEvent = () => {
              const $table = xTable.value
              $table.fullValidate((errMap) => {
                if (errMap) {
                  const msgList: string[] = []
                  Object.values(errMap).forEach((errList) => {
                    errList.forEach(params => {
                      const { rowIndex, column, rules } = params
                      rules.forEach(rule => {
                        msgList.push(\`第 \${rowIndex + 1} 行 \${column.title} 校验错误：\${rule.message}\`)
                      })
                    })
                  })
                  VXETable.modal.message({
                    status: 'error',
                    slots: {
                      default () {
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
                    }
                  })
                } else {
                  VXETable.modal.message({ status: 'success', content: '校验成功！' })
                }
              })
            }

            const selectValidEvent = async () => {
              const $table = xTable.value
              const selectRecords = $table.getCheckboxRecords()
              if (selectRecords.length > 0) {
                const errMap = await $table.validate(selectRecords).catch(errMap => errMap)
                if (errMap) {
                  VXETable.modal.message({ status: 'error', content: '校验不通过！' })
                } else {
                  VXETable.modal.message({ status: 'success', content: '校验成功！' })
                }
              } else {
                VXETable.modal.message({ status: 'warning', content: '未选中数据！' })
              }
            }

            const insertEvent = (row: any) => {
              const $table = xTable.value
              const record = {
                checked: false
              }
              $table.insertAt(record, row).then(({ row }) => {
                $table.setActiveRow(row)
              })
            }

            const getInsertEvent = () => {
              const $table = xTable.value
              const insertRecords = $table.getInsertRecords()
              VXETable.modal.alert(insertRecords.length)
            }

            const getRemoveEvent = () => {
              const $table = xTable.value
              const removeRecords = $table.getRemoveRecords()
              VXETable.modal.alert(removeRecords.length)
            }

            const getUpdateEvent = () => {
              const $table = xTable.value
              const updateRecords = $table.getUpdateRecords()
              VXETable.modal.alert(updateRecords.length)
            }

            findList()

            return {
              xTable,
              demo1,
              findList,
              validEvent,
              fullValidEvent,
              selectValidEvent,
              insertEvent,
              getInsertEvent,
              getRemoveEvent,
              getUpdateEvent
            }
          }
        })
        `
      ]
    }
  }
})
</script>
