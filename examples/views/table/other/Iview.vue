<template>
  <div>
    <p class="tip">
      自定义渲染 <a class="link" href="https://www.npmjs.com/package/iview" target="_blank">iview</a> 组件<br>
      使用自定义模板可以实现对更多细节的控制，但会失去默认的一些功能，比如自动聚焦等。（可以通过设置 <table-column-api-link prop="autofocus"/> 属性强制聚焦）<br>
      如果很多页面都使用相同自定义模板的场景下建议使用<router-link class="link" :to="{name: 'RendererAPI'}">渲染器</router-link>，因为可以更好的复用<br>
      自定义渲染需要配合 <table-api-link prop="updateStatus"/> 方法使用，在对应单元格的值发生改变时调用更新状态<br>
      <span class="red">（注：自定义渲染虽然可以支持任意的 vue 组件，但是并不是所有组件都能直接使用的，所有跨组件之间会存在冲突问题，如果不处理好冲突的情况下是大部分组件是无法使用的；
        可以通过使用 <router-link class="link" :to="{name: 'TablePluginIviewConfig'}">vxe-table-plugin-iview</router-link> 适配插件来解决冲突，当然你也可以<router-link class="link" :to="{name: 'InterceptorAPI'}">自行处理冲突</router-link> ）</span>
    </p>

    <vxe-table
      border
      show-overflow
      show-footer
      keep-source
      ref="xTable"
      height="600"
      class="my-xtable-iview"
      :loading="loading"
      :data="tableData"
      :footer-method="footerMethod"
      :edit-config="{trigger: 'click', mode: 'row', showStatus: true}">
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column type="seq" width="80" >
        <template v-slot:header>
          <span>序号</span>
          <Icon type="md-help-circle" />
        </template>
      </vxe-table-column>
      <vxe-table-column field="name" title="Input"  min-width="140" :edit-render="{type: 'default'}">
        <template v-slot:edit="scope">
          <Input v-model="scope.row.name" @input="$refs.xTable.updateStatus(scope)"/>
        </template>
      </vxe-table-column>
      <vxe-table-column field="role" title="Input"  min-width="140" :edit-render="{type: 'default'}">
        <template v-slot:edit="{ row }">
          <AutoComplete v-model="row.role" :data="restaurants" :filterMethod="roleFilterMethod" transfer></AutoComplete>
        </template>
      </vxe-table-column>
      <vxe-table-column field="age" title="InputNumber" width="150" :edit-render="{type: 'default'}">
        <template v-slot:header="{ column }">
          <span>{{ column.title }}</span>
          <Icon type="md-alert" />
        </template>
        <template v-slot:edit="{ row }">
          <InputNumber v-model="row.age" :max="35" :min="18"></InputNumber>
        </template>
      </vxe-table-column>
      <vxe-table-column field="sex" title="Select" width="140" :edit-render="{type: 'default'}">
        <template v-slot:edit="scope">
          <Select v-model="scope.row.sex" @change="$refs.xTable.updateStatus(scope)" transfer>
            <Option v-for="item in sexList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </template>
        <template v-slot="{ row }">{{ getSelectLabel(row.sex, sexList) }}</template>
      </vxe-table-column>
      <vxe-table-column field="region" title="Cascader" width="200" :edit-render="{type: 'default'}">
        <template v-slot:edit="{ row }">
          <Cascader v-model="row.region" :data="regionList" transfer></Cascader>
        </template>
        <template v-slot="{ row }">{{ getCascaderLabel(row.region, regionList) }}</template>
      </vxe-table-column>
      <vxe-table-column field="date" title="DatePicker" width="200" :edit-render="{type: 'default'}">
        <template v-slot:edit="{ row }">
          <DatePicker v-model="row.date" type="date" format="yyyy/MM/dd" transfer></DatePicker>
        </template>
        <template v-slot="{ row }">{{ formatDate(row.date, 'yyyy/MM/dd') }}</template>
      </vxe-table-column>
      <vxe-table-column field="date2" title="TimePicker" width="200" :edit-render="{type: 'default'}">
        <template v-slot:edit="{ row }">
          <TimePicker v-model="row.date2" type="time" transfer></TimePicker>
        </template>
      </vxe-table-column>
      <vxe-table-column field="rate" title="Rate" width="200" :edit-render="{type: 'visible'}">
        <template v-slot:edit="{ row }">
          <Rate v-model="row.rate" />
        </template>
      </vxe-table-column>
      <vxe-table-column field="flag" title="iSwitch" width="100" :edit-render="{type: 'visible'}">
        <template v-slot:edit="{ row }">
          <iSwitch v-model="row.flag"/>
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
      sexList: [],
      regionList: [],
      restaurants: ['前端', '后端'],
      demoCodes: [
        `
        <vxe-table
          border
          show-overflow
          show-footer
          keep-source
          ref="xTable"
          height="600"
          class="my-xtable-iview"
          :loading="loading"
          :data="tableData"
          :footer-method="footerMethod"
          :edit-config="{trigger: 'click', mode: 'row', showStatus: true}">
          <vxe-table-column type="checkbox" width="60"></vxe-table-column>
          <vxe-table-column type="seq" width="80" >
            <template v-slot:header>
              <span>序号</span>
              <Icon type="md-help-circle" />
            </template>
          </vxe-table-column>
          <vxe-table-column field="name" title="Input"  min-width="140" :edit-render="{type: 'default'}">
            <template v-slot:edit="scope">
              <Input v-model="scope.row.name" @input="$refs.xTable.updateStatus(scope)"/>
            </template>
          </vxe-table-column>
          <vxe-table-column field="role" title="Input"  min-width="140" :edit-render="{type: 'default'}">
            <template v-slot:edit="{ row }">
              <AutoComplete v-model="row.role" :data="restaurants" :filterMethod="roleFilterMethod" transfer></AutoComplete>
            </template>
          </vxe-table-column>
          <vxe-table-column field="age" title="InputNumber" width="150" :edit-render="{type: 'default'}">
            <template v-slot:header="{ column }">
              <span>{{ column.title }}</span>
              <Icon type="md-alert" />
            </template>
            <template v-slot:edit="{ row }">
              <InputNumber v-model="row.age" :max="35" :min="18"></InputNumber>
            </template>
          </vxe-table-column>
          <vxe-table-column field="sex" title="Select" width="140" :edit-render="{type: 'default'}">
            <template v-slot:edit="scope">
              <Select v-model="scope.row.sex" @change="$refs.xTable.updateStatus(scope)" transfer>
                <Option v-for="item in sexList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </template>
            <template v-slot="{ row }">{{ getSelectLabel(row.sex, sexList) }}</template>
          </vxe-table-column>
          <vxe-table-column field="region" title="Cascader" width="200" :edit-render="{type: 'default'}">
            <template v-slot:edit="{ row }">
              <Cascader v-model="row.region" :data="regionList" transfer></Cascader>
            </template>
            <template v-slot="{ row }">{{ getCascaderLabel(row.region, regionList) }}</template>
          </vxe-table-column>
          <vxe-table-column field="date" title="DatePicker" width="200" :edit-render="{type: 'default'}">
            <template v-slot:edit="{ row }">
              <DatePicker v-model="row.date" type="date" format="yyyy/MM/dd" transfer></DatePicker>
            </template>
            <template v-slot="{ row }">{{ formatDate(row.date, 'yyyy/MM/dd') }}</template>
          </vxe-table-column>
          <vxe-table-column field="date2" title="TimePicker" width="200" :edit-render="{type: 'default'}">
            <template v-slot:edit="{ row }">
              <TimePicker v-model="row.date2" type="time" transfer></TimePicker>
            </template>
          </vxe-table-column>
          <vxe-table-column field="rate" title="Rate" width="200" :edit-render="{type: 'visible'}">
            <template v-slot:edit="{ row }">
              <Rate v-model="row.rate" />
            </template>
          </vxe-table-column>
          <vxe-table-column field="flag" title="iSwitch" width="100" :edit-render="{type: 'visible'}">
            <template v-slot:edit="{ row }">
              <iSwitch v-model="row.flag"/>
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
              regionList: []
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 10)
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
            roleFilterMethod  (value, option) {
              return option.toUpperCase().indexOf(value.toUpperCase()) !== -1
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
        .my-xtable-iview .vxe-cell > .ivu-input-wrapper,
        .my-xtable-iview .vxe-cell > .ivu-input-number,
        .my-xtable-iview .vxe-cell > .ivu-select,
        .my-xtable-iview .vxe-cell > .ivu-cascader,
        .my-xtable-iview .vxe-cell > .ivu-date-picker-editor {
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
      return XEUtils.toDateString(value, format)
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
    roleFilterMethod  (value, option) {
      return option.toUpperCase().indexOf(value.toUpperCase()) !== -1
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
