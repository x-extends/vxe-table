<template>
  <div>
    <p>自定义渲染 <a class="link" href="https://www.npmjs.com/package/element-ui" target="_blank">element-ui</a> 组件（建议使用 <a class="link" href="https://www.npmjs.com/package/vxe-table-plugin-element" target="_blank">vxe-table-plugin-element</a> 适配插件，当然你也可以自行处理兼容性）</p>
    <p>使用自定义模板可以实现对更多细节的控制，但会失去默认的一些功能，比如自动聚焦等。（可以通过设置 <table-column-api-link prop="autofocus"/> 属性强制聚焦）</p>
    <p>如果很多页面都使用相同自定义模板的场景下建议使用<router-link class="link" :to="{name: 'StartRenderer'}">渲染器</router-link>，因为可以更好的复用</p>
    <p class="red">自定义渲染需要配合 <table-api-link prop="updateStatus"/> 方法使用，在对应单元格的值发生改变时调用更新状态</p>

    <vxe-table
      border
      show-overflow
      show-footer
      ref="xTable"
      class="vxe-table-element"
      height="600"
      :loading="loading"
      :data.sync="tableData"
      :footer-method="footerMethod"
      :edit-config="{trigger: 'click', mode: 'row', showStatus: true}">
      <vxe-table-column type="selection" width="60"></vxe-table-column>
      <vxe-table-column type="index" width="80">
        <template v-slot:header="{ column }">
          <span>序号</span>
          <i class="el-icon-question"></i>
        </template>
      </vxe-table-column>
      <vxe-table-column field="name" title="ElInput" min-width="140" :edit-render="{type: 'default'}">
        <template v-slot:edit="scope">
          <el-input v-model="scope.row.name" @input="$refs.xTable.updateStatus(scope)"></el-input>
        </template>
      </vxe-table-column>
      <vxe-table-column field="role" title="ElAutocomplete" min-width="160" :edit-render="{type: 'default'}">
        <template v-slot:edit="{ row }">
          <el-autocomplete v-model="row.role" :fetch-suggestions="roleFetchSuggestions"></el-autocomplete>
        </template>
      </vxe-table-column>
      <vxe-table-column field="age" title="ElInputNumber"  width="160" :edit-render="{type: 'default'}">
        <template v-slot:header="{ column }">
          <span>{{ column.title }}</span>
          <i class="el-icon-warning"></i>
        </template>
        <template v-slot:edit="{ row }">
          <el-input-number v-model="row.age" :max="35" :min="18"></el-input-number>
        </template>
      </vxe-table-column>
      <vxe-table-column field="sex" title="ElSelect" width="140" :edit-render="{type: 'default'}">
        <template v-slot:edit="scope">
          <el-select v-model="scope.row.sex" @change="$refs.xTable.updateStatus(scope)">
            <el-option v-for="item in sexList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </template>
        <template v-slot="{ row }">{{ getSelectLabel(row.sex, sexList) }}</template>
      </vxe-table-column>
      <vxe-table-column field="region" title="ElCascader" width="200" :edit-render="{type: 'default'}">
        <template v-slot:edit="{ row }">
          <el-cascader v-model="row.region" :options="regionList"></el-cascader>
        </template>
        <template v-slot="{ row }">{{ getCascaderLabel(row.region, regionList) }}</template>
      </vxe-table-column>
      <vxe-table-column field="date" title="ElDatePicker" width="200" :edit-render="{type: 'default'}">
        <template v-slot:edit="{ row }">
          <el-date-picker v-model="row.date" type="date" format="yyyy/MM/dd"></el-date-picker>
        </template>
        <template v-slot="{ row }">{{ formatDate(row.date, 'yyyy/MM/dd') }}</template>
      </vxe-table-column>
      <vxe-table-column field="date1" title="ElDatePicker" width="220" :edit-render="{type: 'default'}">
        <template v-slot:edit="{ row }">
          <el-date-picker v-model="row.date1" type="datetime" format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
        </template>
        <template v-slot="{ row }">{{ formatDate(row.date1, 'yyyy-MM-dd HH:mm:ss') }}</template>
      </vxe-table-column>
      <vxe-table-column field="date2" title="ElTimePicker" width="200" :edit-render="{type: 'default'}">
        <template v-slot:edit="{ row }">
          <el-time-select v-model="row.date2" :picker-options="{start: '08:30', step: '00:15', end: '18:30'}">
        </el-time-select>
        </template>
      </vxe-table-column>
      <vxe-table-column field="rate" title="ElRate" width="200" :edit-render="{type: 'visible'}">
        <template v-slot:edit="{ row }">
          <el-rate v-model="row.rate"></el-rate>
        </template>
      </vxe-table-column>
      <vxe-table-column field="flag" title="ElSwitch" width="100" :edit-render="{type: 'visible'}">
        <template v-slot:edit="{ row }">
          <el-switch v-model="row.flag"></el-switch>
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
import XEUtils from 'xe-utils'
import XEAjax from 'xe-ajax'
import hljs from 'highlight.js'

export default {
  data () {
    return {
      loading: false,
      tableData: [],
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
          ref="xTable"
          class="vxe-table-element"
          height="600"
          :loading="loading"
          :data.sync="tableData"
          :footer-method="footerMethod"
          :edit-config="{trigger: 'click', mode: 'row', showStatus: true}">
          <vxe-table-column type="selection" width="60"></vxe-table-column>
          <vxe-table-column type="index" width="80">
            <template v-slot:header="{ column }">
              <span>序号</span>
              <i class="el-icon-question"></i>
            </template>
          </vxe-table-column>
          <vxe-table-column field="name" title="ElInput" min-width="140" :edit-render="{type: 'default'}">
            <template v-slot:edit="scope">
              <el-input v-model="scope.row.name" @input="$refs.xTable.updateStatus(scope)"></el-input>
            </template>
          </vxe-table-column>
          <vxe-table-column field="role" title="ElAutocomplete" min-width="160" :edit-render="{type: 'default'}">
            <template v-slot:edit="{ row }">
              <el-autocomplete v-model="row.role" :fetch-suggestions="roleFetchSuggestions"></el-autocomplete>
            </template>
          </vxe-table-column>
          <vxe-table-column field="age" title="ElInputNumber"  width="160" :edit-render="{type: 'default'}">
            <template v-slot:header="{ column }">
              <span>{{ column.title }}</span>
              <i class="el-icon-warning"></i>
            </template>
            <template v-slot:edit="{ row }">
              <el-input-number v-model="row.age" :max="35" :min="18"></el-input-number>
            </template>
          </vxe-table-column>
          <vxe-table-column field="sex" title="ElSelect" width="140" :edit-render="{type: 'default'}">
            <template v-slot:edit="scope">
              <el-select v-model="scope.row.sex" @change="$refs.xTable.updateStatus(scope)">
                <el-option v-for="item in sexList" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </template>
            <template v-slot="{ row }">{{ getSelectLabel(row.sex, sexList) }}</template>
          </vxe-table-column>
          <vxe-table-column field="region" title="ElCascader" width="200" :edit-render="{type: 'default'}">
            <template v-slot:edit="{ row }">
              <el-cascader v-model="row.region" :options="regionList"></el-cascader>
            </template>
            <template v-slot="{ row }">{{ getCascaderLabel(row.region, regionList) }}</template>
          </vxe-table-column>
          <vxe-table-column field="date" title="ElDatePicker" width="200" :edit-render="{type: 'default'}">
            <template v-slot:edit="{ row }">
              <el-date-picker v-model="row.date" type="date" format="yyyy/MM/dd"></el-date-picker>
            </template>
            <template v-slot="{ row }">{{ formatDate(row.date, 'yyyy/MM/dd') }}</template>
          </vxe-table-column>
          <vxe-table-column field="date1" title="ElDatePicker" width="220" :edit-render="{type: 'default'}">
            <template v-slot:edit="{ row }">
              <el-date-picker v-model="row.date1" type="datetime" format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
            </template>
            <template v-slot="{ row }">{{ formatDate(row.date1, 'yyyy-MM-dd HH:mm:ss') }}</template>
          </vxe-table-column>
          <vxe-table-column field="date2" title="ElTimePicker" width="200" :edit-render="{type: 'default'}">
            <template v-slot:edit="{ row }">
              <el-time-select v-model="row.date2" :picker-options="{start: '08:30', step: '00:15', end: '18:30'}">
            </el-time-select>
            </template>
          </vxe-table-column>
          <vxe-table-column field="rate" title="ElRate" width="200" :edit-render="{type: 'visible'}">
            <template v-slot:edit="{ row }">
              <el-rate v-model="row.rate"></el-rate>
            </template>
          </vxe-table-column>
          <vxe-table-column field="flag" title="ElSwitch" width="100" :edit-render="{type: 'visible'}">
            <template v-slot:edit="{ row }">
              <el-switch v-model="row.flag"></el-switch>
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
          },
          methods: {
            formatDate (value, format) {
              return XEUtils.toDateString(value, format)
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
            roleFetchSuggestions (queryString, cb) {
              var restaurants = this.restaurants
              var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
              clearTimeout(this.timeout)
              this.timeout = setTimeout(() => {
                cb(results)
              }, 3000 * Math.random())
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
        `
      ]
    }
  },
  created () {
    this.loading = true
    setTimeout(() => {
      let list = window.MOCK_DATA_LIST.slice(0, 10)
      this.tableData = list
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
      return XEAjax.doGet('/api/conf/sex/list').then(({ data }) => {
        this.sexList = data
        return data
      })
    },
    findRegionList () {
      return XEAjax.doGet('/api/conf/region/list').then(({ data }) => {
        this.regionList = data
        return data
      })
    },
    formatDate (value, format) {
      return XEUtils.toDateString(value, format)
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
    roleFetchSuggestions (queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 3000 * Math.random())
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

<style>
/*注意：需要自行实现 element-ui 需要覆盖以下样式*/
/* .vxe-table-element .vxe-cell > .el-input,
.vxe-table-element .vxe-cell > .el-input-number,
.vxe-table-element .vxe-cell > .el-select,
.vxe-table-element .vxe-cell > .el-cascader,
.vxe-table-element .vxe-cell > .el-date-editor {
  width: 100%;
} */
</style>
