<template>
  <div>
    <p class="tip">
      自定义渲染 <a class="link" href="https://www.npmjs.com/package/ant-design-vue" target="_blank">ant-design-vue</a> 组件，自定义渲染需要配合 <table-api-link prop="updateStatus"/> 方法使用，在对应单元格的值发生改变时调用更新状态<br>
      建议通过使用 <router-link class="link" :to="{name: 'TablePluginAntdConfig'}">vxe-table-plugin-antd</router-link> 适配插件来解决跨组件渲染的兼容性问题，例如：无法下拉选中...等<br>
      <span class="red">（注：该示例仅供参考，具体逻辑请自行实现）</span>
    </p>

    <vxe-table
      border
      show-overflow
      show-footer
      keep-source
      ref="xTable"
      height="600"
      class="my-xtable-antd"
      :loading="demo1.loading"
      :data="demo1.tableData"
      :footer-method="footerMethod"
      :edit-config="{trigger: 'click', mode: 'row', showStatus: true}">
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column type="seq" width="80">
        <template #header>
          <span>序号</span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="name" title="AInput" min-width="140" :edit-render="{}">
        <template #edit="scope">
          <a-input v-model:value="scope.row.name" @input="$refs.xTable.updateStatus(scope)"></a-input>
        </template>
      </vxe-table-column>
      <vxe-table-column field="role" title="AAutoComplete" min-width="160" :edit-render="{}">
        <template #edit="{ row }">
          <a-auto-complete v-model:value="row.role" :options="demo1.searchOptions" @search="handleSearch"/>
        </template>
      </vxe-table-column>
      <vxe-table-column field="age" title="AInputNumber"  width="160" :edit-render="{}">
        <template #header="{ column }">
          <span>{{ column.title }}</span>
        </template>
        <template #edit="{ row }">
          <a-input-number v-model:value="row.age" :max="99" :min="18"></a-input-number>
        </template>
      </vxe-table-column>
      <vxe-table-column field="sex" title="ASelect" width="140" :edit-render="{}">
        <template #edit="scope">
          <a-select v-model:value="scope.row.sex" @change="$refs.xTable.updateStatus(scope)">
            <a-select-option v-for="item in demo1.sexList" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
          </a-select>
        </template>
        <template #default="{ row }">{{ getSelectLabel(row.sex, demo1.sexList) }}</template>
      </vxe-table-column>
      <vxe-table-column field="sex1" title="ASelect" width="180" :edit-render="{}">
        <template #edit="scope">
          <a-select v-model:value="scope.row.sex1" @change="$refs.xTable.updateStatus(scope)" mode="multiple">
            <a-select-option v-for="item in demo1.sexList" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
          </a-select>
        </template>
        <template #default="{ row }">{{ getSelectMultipleLabel(row.sex1, demo1.sexList) }}</template>
      </vxe-table-column>
      <vxe-table-column field="region" title="ACascader" width="200" :edit-render="{}">
        <template #edit="{ row }">
          <a-cascader v-model:value="row.region" :options="demo1.regionList"></a-cascader>
        </template>
        <template #default="{ row }">{{ getCascaderLabel(row.region, demo1.regionList) }}</template>
      </vxe-table-column>
      <vxe-table-column field="date7" title="ADatePicker" width="200" :edit-render="{}">
        <template #edit="{ row }">
          <a-date-picker v-model:value="row.date7" format="YYYY/MM/DD hh:mm:ss"></a-date-picker>
        </template>
        <template #default="{ row }">{{ formatDate(row.date7, 'YYYY/MM/DD hh:mm:ss') }}</template>
      </vxe-table-column>
      <vxe-table-column field="rate" title="ARate" width="200">
        <template #default="{ row }">
          <a-rate v-model:value="row.rate"></a-rate>
        </template>
      </vxe-table-column>
      <vxe-table-column field="flag" title="ElSwitch" width="100">
        <template #default="{ row }">
          <a-switch v-model:checked="row.flag"></a-switch>
        </template>
      </vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { VxeTableInstance, VxeTablePropTypes } from '../../../../types/index'
import XEUtils from 'xe-utils'

export default defineComponent({
  setup () {
    const xTable = ref({} as VxeTableInstance)

    const demo1 = reactive({
      loading: false,
      searchOptions: [] as any[],
      sexList: [
        { value: '1', label: '男' },
        { value: '0', label: '女' }
      ],
      regionList: [
        {
          label: '北京',
          value: 1,
          children: [
            { value: 3, label: '东城区' },
            { value: 4, label: '西城区' }
          ]
        },
        {
          label: '上海',
          value: 21,
          children: [
            { value: 23, label: '黄浦区' },
            { value: 24, label: '卢湾区' }
          ]
        },
        {
          label: '广东',
          value: 42,
          children: [
            { value: 43, label: '广州市' },
            { value: 67, label: '深圳市' }
          ]
        }
      ],
      tableData: [] as any[]
    })

    const formatDate = (value: any, format: string) => {
      return value ? value.format(format) : null
    }

    const getSelectLabel = (value: any, list: any[], valueProp = 'value', labelField = 'label') => {
      const item = XEUtils.find(list, item => item[valueProp] === value)
      return item ? item[labelField] : null
    }

    const getSelectMultipleLabel = (value: any[], list: any[], valueProp = 'value', labelField = 'label') => {
      return value.map(val => {
        const item = XEUtils.find(list, item => item[valueProp] === val)
        return item ? item[labelField] : null
      }).join(', ')
    }

    const getCascaderLabel = (value: any, list: any[]) => {
      const values: any[] = value || []
      const labels: any[] = []
      const matchCascaderData = function (index: any, list: any[]) {
        const val = values[index]
        if (list && values.length > index) {
          list.forEach(item => {
            if (item.value === val) {
              labels.push(item.label)
              matchCascaderData(++index, item.children)
            }
          })
        }
      }
      matchCascaderData(0, list)
      return labels.join(' / ')
    }

    const handleSearch = (value: any) => {
      demo1.searchOptions = !value ? [] : [
        { value },
        { value: value + value },
        { value: value + value + value }
      ]
    }

    const createStateFilter = (queryString: string) => {
      return (state: any) => {
        return (state.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    }

    const meanNum = (list: any[], field: string) => {
      let count = 0
      list.forEach(item => {
        count += Number(item[field])
      })
      return count / list.length
    }

    const sumNum = (list: any[], field: string) => {
      let count = 0
      list.forEach(item => {
        count += Number(item[field])
      })
      return count
    }

    const footerMethod: VxeTablePropTypes.FooterMethod = ({ columns, data }) => {
      return [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '平均'
          }
          if (['age', 'rate'].includes(column.property)) {
            return meanNum(data, column.property)
          }
          return null
        }),
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '和值'
          }
          if (['age', 'rate'].includes(column.property)) {
            return sumNum(data, column.property)
          }
          return null
        })
      ]
    }

    demo1.loading = true
    setTimeout(() => {
      demo1.tableData = [
        { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: '0', sex1: [], region: [], age: 28, date: '', date1: '', date2: '', date3: '', date4: [], date5: '', date7: '', color1: '', tree1: '', tree2: [], rate: 5, rate1: 59, flag: false, address: 'Shenzhen' },
        { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: '1', sex1: [], region: [], age: 22, date: '', date1: '', date2: '', date3: '', date4: [], date5: '', date7: '', color1: '', tree1: '', tree2: [], rate: 2, rate1: 22, flag: false, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: '0', sex1: [], region: [], age: 32, date: '', date1: '', date2: '', date3: '', date4: [], date5: '', date7: '', color1: '', tree1: '', tree2: [], rate: 3, rate1: 12, flag: false, address: 'Shanghai' },
        { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: '0', sex1: ['1', '0'], region: [], age: 23, date: '', date1: '', date2: '', date3: '', date4: [], date5: '', color1: '', tree1: '', tree2: [], date7: '', rate: 33, rate1: 4, flag: true, address: 'Shenzhen' },
        { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: '0', sex1: ['1', '0'], region: [], age: 30, date: '', date1: '', date2: '', date3: '', date4: [], date5: '', color1: '', tree1: '', tree2: [], date7: '', rate: 0, rate1: 15, flag: true, address: 'Shanghai' },
        { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: '0', sex1: [], region: [], age: 21, date: '', date1: '', date2: '', date3: '', date4: [], date5: '', date7: '', color1: '', tree1: '', tree2: [], rate: 3, rate1: 73, flag: false, address: 'Shenzhen' },
        { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: '1', sex1: ['1'], region: [], age: 29, date: '', date1: '', date2: '', date3: '', date4: [], date5: '', date7: '', color1: '', tree1: '', tree2: [], rate: 0, rate1: 0, flag: true, address: 'Guangzhou' },
        { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: '1', sex1: [], region: [], age: 35, date: '', date1: '', date2: '', date3: '', date4: [], date5: '', date7: '', color1: '', tree1: '', tree2: [], rate: 2, rate1: 14, flag: false, address: 'Shenzhen' },
        { id: 10009, name: 'Test9', nickname: 'T9', role: 'Test', sex: '1', sex1: ['0'], region: [], age: 24, date: '', date1: '', date2: '', date3: '', date4: [], date5: '', date7: '', color1: '', tree1: '', tree2: [], rate: 3, rate1: 52, flag: false, address: 'Shenzhen' },
        { id: 100010, name: 'Test10', nickname: 'T10', role: 'Develop', sex: '1', sex1: [], region: [], age: 20, date: '', date1: '', date2: '', date3: '', date4: [], date5: '', date7: '', color1: '', tree1: '', tree2: [], rate: 4, rate1: 83, flag: false, address: 'Guangzhou' }
      ]
      demo1.loading = false
    }, 500)

    return {
      xTable,
      demo1,
      formatDate,
      getSelectLabel,
      getSelectMultipleLabel,
      getCascaderLabel,
      handleSearch,
      createStateFilter,
      footerMethod,
      demoCodes: [
        `
        <vxe-table
          border
          show-overflow
          show-footer
          keep-source
          ref="xTable"
          height="600"
          class="my-xtable-antd"
          :loading="demo1.loading"
          :data="demo1.tableData"
          :footer-method="footerMethod"
          :edit-config="{trigger: 'click', mode: 'row', showStatus: true}">
          <vxe-table-column type="checkbox" width="60"></vxe-table-column>
          <vxe-table-column type="seq" width="80">
            <template #header>
              <span>序号</span>
            </template>
          </vxe-table-column>
          <vxe-table-column field="name" title="AInput" min-width="140" :edit-render="{}">
            <template #edit="scope">
              <a-input v-model:value="scope.row.name" @input="$refs.xTable.updateStatus(scope)"></a-input>
            </template>
          </vxe-table-column>
          <vxe-table-column field="role" title="AAutoComplete" min-width="160" :edit-render="{}">
            <template #edit="{ row }">
              <a-auto-complete v-model:value="row.role" :options="demo1.searchOptions" @search="handleSearch"/>
            </template>
          </vxe-table-column>
          <vxe-table-column field="age" title="AInputNumber"  width="160" :edit-render="{}">
            <template #header="{ column }">
              <span>{{ column.title }}</span>
            </template>
            <template #edit="{ row }">
              <a-input-number v-model:value="row.age" :max="99" :min="18"></a-input-number>
            </template>
          </vxe-table-column>
          <vxe-table-column field="sex" title="ASelect" width="140" :edit-render="{}">
            <template #edit="scope">
              <a-select v-model:value="scope.row.sex" @change="$refs.xTable.updateStatus(scope)">
                <a-select-option v-for="item in demo1.sexList" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
              </a-select>
            </template>
            <template #default="{ row }">{{ getSelectLabel(row.sex, demo1.sexList) }}</template>
          </vxe-table-column>
          <vxe-table-column field="sex1" title="ASelect" width="180" :edit-render="{}">
            <template #edit="scope">
              <a-select v-model:value="scope.row.sex1" @change="$refs.xTable.updateStatus(scope)" mode="multiple">
                <a-select-option v-for="item in demo1.sexList" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
              </a-select>
            </template>
            <template #default="{ row }">{{ getSelectMultipleLabel(row.sex1, demo1.sexList) }}</template>
          </vxe-table-column>
          <vxe-table-column field="region" title="ACascader" width="200" :edit-render="{}">
            <template #edit="{ row }">
              <a-cascader v-model:value="row.region" :options="demo1.regionList"></a-cascader>
            </template>
            <template #default="{ row }">{{ getCascaderLabel(row.region, demo1.regionList) }}</template>
          </vxe-table-column>
          <vxe-table-column field="date7" title="ADatePicker" width="200" :edit-render="{}">
            <template #edit="{ row }">
              <a-date-picker v-model:value="row.date7" format="YYYY/MM/DD hh:mm:ss"></a-date-picker>
            </template>
            <template #default="{ row }">{{ formatDate(row.date7, 'YYYY/MM/DD hh:mm:ss') }}</template>
          </vxe-table-column>
          <vxe-table-column field="rate" title="ARate" width="200">
            <template #default="{ row }">
              <a-rate v-model:value="row.rate"></a-rate>
            </template>
          </vxe-table-column>
          <vxe-table-column field="flag" title="ElSwitch" width="100">
            <template #default="{ row }">
              <a-switch v-model:checked="row.flag"></a-switch>
            </template>
          </vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive, ref } from 'vue'
        import { VxeTableInstance, VxeTablePropTypes } from 'vxe-table'
        import XEUtils from 'xe-utils'

        export default defineComponent({
          setup () {
            const xTable = ref({} as VxeTableInstance)

            const demo1 = reactive({
              loading: false,
              searchOptions: [] as any[],
              sexList: [
                { value: '1', label: '男' },
                { value: '0', label: '女' }
              ],
              regionList: [
                {
                  label: '北京',
                  value: 1,
                  children: [
                    { value: 3, label: '东城区' },
                    { value: 4, label: '西城区' }
                  ]
                },
                {
                  label: '上海',
                  value: 21,
                  children: [
                    { value: 23, label: '黄浦区' },
                    { value: 24, label: '卢湾区' }
                  ]
                },
                {
                  label: '广东',
                  value: 42,
                  children: [
                    { value: 43, label: '广州市' },
                    { value: 67, label: '深圳市' }
                  ]
                }
              ],
              tableData: [] as any[]
            })

            const formatDate = (value: any, format: string) => {
              return value ? value.format(format) : null
            }

            const getSelectLabel = (value: any, list: any[], valueProp = 'value', labelField = 'label') => {
              const item = XEUtils.find(list, item => item[valueProp] === value)
              return item ? item[labelField] : null
            }

            const getSelectMultipleLabel = (value: any[], list: any[], valueProp = 'value', labelField = 'label') => {
              return value.map(val => {
                const item = XEUtils.find(list, item => item[valueProp] === val)
                return item ? item[labelField] : null
              }).join(', ')
            }

            const getCascaderLabel = (value: any, list: any[]) => {
              const values: any[] = value || []
              const labels: any[] = []
              const matchCascaderData = function (index: any, list: any[]) {
                const val = values[index]
                if (list && values.length > index) {
                  list.forEach(item => {
                    if (item.value === val) {
                      labels.push(item.label)
                      matchCascaderData(++index, item.children)
                    }
                  })
                }
              }
              matchCascaderData(0, list)
              return labels.join(' / ')
            }

            const handleSearch = (value: any) => {
              demo1.searchOptions = !value ? [] : [
                { value },
                { value: value + value },
                { value: value + value + value }
              ]
            }

            const createStateFilter = (queryString: string) => {
              return (state: any) => {
                return (state.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
              }
            }

            const meanNum = (list: any[], field: string) => {
              let count = 0
              list.forEach(item => {
                count += Number(item[field])
              })
              return count / list.length
            }

            const sumNum = (list: any[], field: string) => {
              let count = 0
              list.forEach(item => {
                count += Number(item[field])
              })
              return count
            }

            const footerMethod: VxeTablePropTypes.FooterMethod = ({ columns, data }) => {
              return [
                columns.map((column, columnIndex) => {
                  if (columnIndex === 0) {
                    return '平均'
                  }
                  if (['age', 'rate'].includes(column.property)) {
                    return meanNum(data, column.property)
                  }
                  return null
                }),
                columns.map((column, columnIndex) => {
                  if (columnIndex === 0) {
                    return '和值'
                  }
                  if (['age', 'rate'].includes(column.property)) {
                    return sumNum(data, column.property)
                  }
                  return null
                })
              ]
            }

            demo1.loading = true
            setTimeout(() => {
              demo1.tableData = [
                { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: '0', sex1: [], region: [], age: 28, date: '', date1: '', date2: '', date3: '', date4: [], date5: '', date7: '', color1: '', tree1: '', tree2: [], rate: 5, rate1: 59, flag: false, address: 'Shenzhen' },
                { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: '1', sex1: [], region: [], age: 22, date: '', date1: '', date2: '', date3: '', date4: [], date5: '', date7: '', color1: '', tree1: '', tree2: [], rate: 2, rate1: 22, flag: false, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: '0', sex1: [], region: [], age: 32, date: '', date1: '', date2: '', date3: '', date4: [], date5: '', date7: '', color1: '', tree1: '', tree2: [], rate: 3, rate1: 12, flag: false, address: 'Shanghai' },
                { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: '0', sex1: ['1', '0'], region: [], age: 23, date: '', date1: '', date2: '', date3: '', date4: [], date5: '', color1: '', tree1: '', tree2: [], date7: '', rate: 33, rate1: 4, flag: true, address: 'Shenzhen' },
                { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: '0', sex1: ['1', '0'], region: [], age: 30, date: '', date1: '', date2: '', date3: '', date4: [], date5: '', color1: '', tree1: '', tree2: [], date7: '', rate: 0, rate1: 15, flag: true, address: 'Shanghai' },
                { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: '0', sex1: [], region: [], age: 21, date: '', date1: '', date2: '', date3: '', date4: [], date5: '', date7: '', color1: '', tree1: '', tree2: [], rate: 3, rate1: 73, flag: false, address: 'Shenzhen' },
                { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: '1', sex1: ['1'], region: [], age: 29, date: '', date1: '', date2: '', date3: '', date4: [], date5: '', date7: '', color1: '', tree1: '', tree2: [], rate: 0, rate1: 0, flag: true, address: 'Guangzhou' },
                { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: '1', sex1: [], region: [], age: 35, date: '', date1: '', date2: '', date3: '', date4: [], date5: '', date7: '', color1: '', tree1: '', tree2: [], rate: 2, rate1: 14, flag: false, address: 'Shenzhen' },
                { id: 10009, name: 'Test9', nickname: 'T9', role: 'Test', sex: '1', sex1: ['0'], region: [], age: 24, date: '', date1: '', date2: '', date3: '', date4: [], date5: '', date7: '', color1: '', tree1: '', tree2: [], rate: 3, rate1: 52, flag: false, address: 'Shenzhen' },
                { id: 100010, name: 'Test10', nickname: 'T10', role: 'Develop', sex: '1', sex1: [], region: [], age: 20, date: '', date1: '', date2: '', date3: '', date4: [], date5: '', date7: '', color1: '', tree1: '', tree2: [], rate: 4, rate1: 83, flag: false, address: 'Guangzhou' }
              ]
              demo1.loading = false
            }, 500)

            return {
              xTable,
              demo1,
              formatDate,
              getSelectLabel,
              getSelectMultipleLabel,
              getCascaderLabel,
              handleSearch,
              createStateFilter,
              footerMethod
            }
          }
        })
        `
      ]
    }
  }
})
</script>
