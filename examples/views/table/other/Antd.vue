<template>
  <div>
    <p class="tip">
      自定义渲染 <a class="link" href="https://www.npmjs.com/package/ant-design-vue" target="_blank">ant-design-vue</a> 组件，自定义渲染需要配合 <table-api-link prop="updateStatus"/> 方法使用，在对应单元格的值发生改变时调用更新状态<br>
      建议通过使用 <router-link class="link" :to="{name: 'TablePluginAntdConfig'}">vxe-table-plugin-antd</router-link> 适配插件，不用自己做任何兼容性处理直接就能渲染<br>
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
      :loading="loading"
      :data="tableData"
      :footer-method="footerMethod"
      :edit-config="{trigger: 'click', mode: 'row', showStatus: true}">
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column type="seq" width="80">
        <template v-slot:header>
          <span>序号</span>
          <a-icon type="question" />
        </template>
      </vxe-table-column>
      <vxe-table-column field="name" title="AInput" min-width="140" :edit-render="{type: 'default'}">
        <template v-slot:edit="scope">
          <a-input v-model="scope.row.name" @input="$refs.xTable.updateStatus(scope)"></a-input>
        </template>
      </vxe-table-column>
      <vxe-table-column field="role" title="AAutoComplete" min-width="160" :edit-render="{type: 'default'}">
        <template v-slot:edit="{ row }">
          <a-auto-complete v-model="row.role" :dataSource="dataSource" @select="onSelect" @search="handleSearch"/>
        </template>
      </vxe-table-column>
      <vxe-table-column field="age" title="AInputNumber"  width="160" :edit-render="{type: 'default'}">
        <template v-slot:header="{ column }">
          <span>{{ column.title }}</span>
          <a-icon type="warning" />
        </template>
        <template v-slot:edit="{ row }">
          <a-input-number v-model="row.age" :max="35" :min="18"></a-input-number>
        </template>
      </vxe-table-column>
      <vxe-table-column field="sex" title="ASelect" width="140" :edit-render="{type: 'default'}">
        <template v-slot:edit="scope">
          <a-select v-model="scope.row.sex" @change="$refs.xTable.updateStatus(scope)">
            <a-select-option v-for="item in sexList" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
          </a-select>
        </template>
        <template v-slot="{ row }">{{ getSelectLabel(row.sex, sexList) }}</template>
      </vxe-table-column>
      <vxe-table-column field="region" title="ACascader" width="200" :edit-render="{type: 'default'}">
        <template v-slot:edit="{ row }">
          <a-cascader v-model="row.region" :options="regionList"></a-cascader>
        </template>
        <template v-slot="{ row }">{{ getCascaderLabel(row.region, regionList) }}</template>
      </vxe-table-column>
      <vxe-table-column field="date7" title="ADatePicker" width="200" :edit-render="{type: 'default'}">
        <template v-slot:edit="{ row }">
          <a-date-picker v-model="row.date7" format="YYYY/MM/DD hh:mm:ss"></a-date-picker>
        </template>
        <template v-slot="{ row }">{{ formatDate(row.date7, 'YYYY/MM/DD hh:mm:ss') }}</template>
      </vxe-table-column>
      <vxe-table-column field="rate" title="ARate" width="200" :edit-render="{type: 'visible'}">
        <template v-slot:edit="{ row }">
          <a-rate v-model="row.rate"></a-rate>
        </template>
      </vxe-table-column>
      <vxe-table-column field="flag" title="ElSwitch" width="100" :edit-render="{type: 'visible'}">
        <template v-slot:edit="{ row }">
          <a-switch v-model="row.flag"></a-switch>
        </template>
      </vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
      <code class="css">{{ demoCodes[2] }}</code>
    </pre>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'
import XEAjax from 'xe-ajax'
import hljs from 'highlight.js'

export default {
  data () {
    return {
      loading: false,
      tableData: [],
      dataSource: [],
      sexList: [],
      regionList: [],
      restaurants: [
        { value: '前端', name: '前端' },
        { value: '后端', name: '后端' }
      ],
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
          :loading="loading"
          :data="tableData"
          :footer-method="footerMethod"
          :edit-config="{trigger: 'click', mode: 'row', showStatus: true}">
          <vxe-table-column type="checkbox" width="60"></vxe-table-column>
          <vxe-table-column type="seq" width="80">
            <template v-slot:header="{ column }">
              <span>序号</span>
              <a-icon type="question" />
            </template>
          </vxe-table-column>
          <vxe-table-column field="name" title="AInput" min-width="140" :edit-render="{type: 'default'}">
            <template v-slot:edit="scope">
              <a-input v-model="scope.row.name" @input="$refs.xTable.updateStatus(scope)"></a-input>
            </template>
          </vxe-table-column>
          <vxe-table-column field="role" title="AAutoComplete" min-width="160" :edit-render="{type: 'default'}">
            <template v-slot:edit="{ row }">
              <a-auto-complete v-model="row.role" :dataSource="dataSource" @select="onSelect" @search="handleSearch"/>
            </template>
          </vxe-table-column>
          <vxe-table-column field="age" title="AInputNumber"  width="160" :edit-render="{type: 'default'}">
            <template v-slot:header="{ column }">
              <span>{{ column.title }}</span>
              <a-icon type="warning" />
            </template>
            <template v-slot:edit="{ row }">
              <a-input-number v-model="row.age" :max="35" :min="18"></a-input-number>
            </template>
          </vxe-table-column>
          <vxe-table-column field="sex" title="ASelect" width="140" :edit-render="{type: 'default'}">
            <template v-slot:edit="scope">
              <a-select v-model="scope.row.sex" @change="$refs.xTable.updateStatus(scope)">
                <a-select-option v-for="item in sexList" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
              </a-select>
            </template>
            <template v-slot="{ row }">{{ getSelectLabel(row.sex, sexList) }}</template>
          </vxe-table-column>
          <vxe-table-column field="region" title="ACascader" width="200" :edit-render="{type: 'default'}">
            <template v-slot:edit="{ row }">
              <a-cascader v-model="row.region" :options="regionList"></a-cascader>
            </template>
            <template v-slot="{ row }">{{ getCascaderLabel(row.region, regionList) }}</template>
          </vxe-table-column>
          <vxe-table-column field="date7" title="ADatePicker" width="200" :edit-render="{type: 'default'}">
            <template v-slot:edit="{ row }">
              <a-date-picker v-model="row.date7" format="YYYY/MM/DD hh:mm:ss"></a-date-picker>
            </template>
            <template v-slot="{ row }">{{ formatDate(row.date7, 'YYYY/MM/DD hh:mm:ss') }}</template>
          </vxe-table-column>
          <vxe-table-column field="rate" title="ARate" width="200" :edit-render="{type: 'visible'}">
            <template v-slot:edit="{ row }">
              <a-rate v-model="row.rate"></a-rate>
            </template>
          </vxe-table-column>
          <vxe-table-column field="flag" title="ElSwitch" width="100" :edit-render="{type: 'visible'}">
            <template v-slot:edit="{ row }">
              <a-switch v-model="row.flag"></a-switch>
            </template>
          </vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              loading: false,
              tableData: [],
              dataSource: [],
              sexList: [],
              regionList: [],
              restaurants: [
                { value: '前端', name: '前端' },
                { value: '后端', name: '后端' }
              ]
            }
          },
          created () {
            this.loading = true
            setTimeout(() => {
              this.tableData = window.MOCK_DATA_LIST.slice(0, 10)
              this.loading = false
            }, 500)
            this.findSexList()
            this.findRegionList()
          },
          methods: {
            findSexList () {
              return XEAjax.get('/api/conf/sex/list').then(data => {
                this.sexList = data
                return data
              })
            },
            findRegionList () {
              return XEAjax.get('/api/conf/region/list').then(data => {
                this.regionList = data
                return data
              })
            },
            formatDate (value, format) {
              return value ? value.format(format) : null
            },
            getSelectLabel (value, list, valueProp = 'value', labelField = 'label') {
              let item = XEUtils.find(list, item => item[valueProp] === value)
              return item ? item[labelField] : null
            },
            getCascaderLabel (value, list) {
              let values = value || []
              let labels = []
              let matchCascaderData = function (index, list) {
                let val = values[index]
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
            },
            handleSearch (value) {
              this.dataSource = !value ? [] : [
                value,
                value + value,
                value + value + value
              ]
            },
            onSelect (value) {
              console.log('onSelect', value)
            },
            createStateFilter (queryString) {
              return (state) => {
                return (state.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
              }
            },
            footerMethod ({ columns, data }) {
              return [
                columns.map((column, columnIndex) => {
                  if (columnIndex === 0) {
                    return '平均'
                  }
                  if (['age', 'rate'].includes(column.property)) {
                    return XEUtils.mean(data, column.property)
                  }
                  return null
                }),
                columns.map((column, columnIndex) => {
                  if (columnIndex === 0) {
                    return '和值'
                  }
                  if (['age', 'rate'].includes(column.property)) {
                    return XEUtils.sum(data, column.property)
                  }
                  return null
                })
              ]
            }
          }
        }
        `,
        `
        /*注意：如果是自行实现，需要自行处理好兼容样式，否则可能会显示错乱，例如：*/
        /*
        .my-xtable-antd .vxe-cell > .ant-input,
        .my-xtable-antd .vxe-cell > .ant-input-number,
        .my-xtable-antd .vxe-cell > .ant-select,
        .my-xtable-antd .vxe-cell > .ant-cascader-picker,
        .my-xtable-antd .vxe-cell > .ant-calendar-picker {
          width: 100%;
        }
        */
        `
      ]
    }
  },
  created () {
    this.loading = true
    setTimeout(() => {
      this.tableData = window.MOCK_DATA_LIST.slice(0, 10)
      this.loading = false
    }, 500)
    this.findSexList()
    this.findRegionList()
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    findSexList () {
      return XEAjax.get('/api/conf/sex/list').then(data => {
        this.sexList = data
        return data
      })
    },
    findRegionList () {
      return XEAjax.get('/api/conf/region/list').then(data => {
        this.regionList = data
        return data
      })
    },
    formatDate (value, format) {
      return value ? value.format(format) : null
    },
    getSelectLabel (value, list, valueProp = 'value', labelField = 'label') {
      const item = XEUtils.find(list, item => item[valueProp] === value)
      return item ? item[labelField] : null
    },
    getCascaderLabel (value, list) {
      const values = value || []
      const labels = []
      const matchCascaderData = function (index, list) {
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
    },
    handleSearch (value) {
      this.dataSource = !value ? [] : [
        value,
        value + value,
        value + value + value
      ]
    },
    onSelect (value) {
      console.log('onSelect', value)
    },
    createStateFilter (queryString) {
      return (state) => {
        return (state.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    footerMethod ({ columns, data }) {
      return [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '平均'
          }
          if (['age', 'rate'].includes(column.property)) {
            return XEUtils.mean(data, column.property)
          }
          return null
        }),
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '和值'
          }
          if (['age', 'rate'].includes(column.property)) {
            return XEUtils.sum(data, column.property)
          }
          return null
        })
      ]
    }
  }
}
</script>
