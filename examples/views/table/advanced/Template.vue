<template>
  <div>
    <p class="tip">使用 <table-column-api-link prop="slot"/> 自定义模板；可以实现自定义任意内容及 html 元素<br>
      <table-column-api-link prop="default"/>：自定义内容模板（提前格式化（最优） > <table-column-api-link prop="formatter"/>（field值发生变化时） > <table-column-api-link prop="slots"/>（即时））<br>
      <table-column-api-link prop="header"/>：自定义表头模板<br>
      <table-column-api-link prop="footer"/>：自定义表尾模板<br>
      <table-column-api-link prop="filter"/>：自定义筛选模板（建议使用<router-link :to="{name: 'RendererAPI'}">渲染器</router-link>，可以更好的复用）<br>
      <table-column-api-link prop="edit"/>：自定义可编辑模板（建议使用<router-link :to="{name: 'RendererAPI'}">渲染器</router-link>，可以更好的复用）
    </p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button>{{ $t('app.body.button.insert') }}</vxe-button>
        <vxe-button>
          <template v-slot>下拉按钮</template>
          <template v-slot:dropdowns>
            <vxe-button>删除</vxe-button>
            <vxe-button>保存</vxe-button>
          </template>
        </vxe-button>
      </template>
      <template v-slot:tools>
        <vxe-input v-model="value2" placeholder="搜索"></vxe-input>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      resizable
      show-footer
      ref="xTable"
      height="500"
      :footer-method="footerMethod"
      :data="tableData"
      @checkbox-change="checkboxChangeEvent"
      @checkbox-all="checkboxChangeEvent">
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column type="seq" width="160" :resizable="false" show-overflow>
        <template v-slot:header>
          <div class="first-col">
            <div class="first-col-top">名称</div>
            <div class="first-col-bottom">序号</div>
          </div>
        </template>
        <template v-slot:footer="{ items, _columnIndex }">
          <vxe-button status="primary" @click="clickFooterItem(items, _columnIndex)" size="mini">支持</vxe-button>
          <vxe-button @click="clickFooterItem(items, _columnIndex)" size="mini">放弃</vxe-button>
        </template>
        <template v-slot="{ row }">
          <vxe-button @click="showDetailEvent(row)">弹框{{ row.name }}</vxe-button>
        </template>
      </vxe-table-column>
      <vxe-table-column field="name" title="app.body.label.name" sortable>
        <template v-slot="{ row }">
          <a href="https://github.com/x-extends/vxe-table" target="_black">我是超链接：{{ row.name }}</a>
        </template>
      </vxe-table-column>
      <vxe-table-column field="sex" title="app.body.label.sex" :filters="[{data: ''}]" :filter-method="filterSexMethod">
        <template v-slot:header>
          <span style="color: red;">自定义头部</span>
        </template>
        <template v-slot:footer="{ items, _columnIndex }">
          <span style="color: red">累计：{{ items[_columnIndex] }}</span>
        </template>
        <template v-slot:filter="{ $panel, column }">
          <template v-for="(option, index) in column.filters">
            <input class="my-filter" type="type" v-model="option.data" :key="index" @input="changeFilterEvent($event, option, $panel)">
          </template>
        </template>
        <template v-slot="{ row }">
          <span>{{ row.sex }} </span>
          <vxe-button type="text">编辑</vxe-button>
          <vxe-button type="text">删除</vxe-button>
        </template>
      </vxe-table-column>
      <vxe-table-column field="time" title="Time">
        <template v-slot:header>
          <vxe-input v-model="value1" placeholder="放个输入框" size="mini"></vxe-input>
        </template>
        <template v-slot="{ row, rowIndex }">
          <template v-if="rowIndex === 2">
            <vxe-switch v-model="row.flag"></vxe-switch>
          </template>
          <template v-else-if="rowIndex === 3">
            <vxe-switch v-model="row.flag" open-label="开" close-label="关"></vxe-switch>
          </template>
          <template v-else>
            <span>{{ formatDate(row.time) }}</span>
          </template>
        </template>
      </vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow>
        <template v-slot="{ row, rowIndex }">
          <template v-if="rowIndex === 1">
            <vxe-select v-model="row.flag1" transfer>
              <vxe-option value="Y" label="是"></vxe-option>
              <vxe-option value="N" label="否"></vxe-option>
            </vxe-select>
          </template>
          <template v-else>
            <a href="https://github.com/x-extends/vxe-table">{{ row.name }}</a>
          </template>
        </template>
      </vxe-table-column>
      <vxe-table-column field="html1" title="Html片段" width="200" show-overflow>
        <template v-slot="{ row }">
          <span v-html="row.html1"></span>
        </template>
        <template v-slot:footer>
          <span>
            <img src="/vxe-table/static/other/img1.gif" style="width: 36px;">自定义模板<img src="/vxe-table/static/other/img2.gif" style="width: 30px;">
          </span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="img1" title="图片路径" width="120">
        <template v-slot="{ row }">
          <img v-if="row.img1" :src="row.img1" style="width: 100px;">
          <span v-else>无</span>
        </template>
      </vxe-table-column>
    </vxe-table>

    <vxe-pager
      perfect
      :current-page.sync="tablePage.currentPage"
      :page-size.sync="tablePage.pageSize"
      :total="tablePage.total"
      :layouts="['PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'Sizes', 'FullJump', 'Total']">
      <template v-slot:left>
        <span class="page-left">
          <vxe-checkbox v-model="isAllChecked" :indeterminate="isIndeterminate" @change="changeAllEvent"></vxe-checkbox>
          <span class="select-count">自定义模板 {{ selectRecords.length }} 条</span>
          <vxe-button>修改</vxe-button>
          <vxe-button>管理</vxe-button>
          <vxe-button>删除</vxe-button>
          <vxe-button size="small">
            <template v-slot>更多操作</template>
            <template v-slot:dropdowns>
              <vxe-button type="text">批量修改</vxe-button>
              <vxe-button type="text">批量管理</vxe-button>
              <vxe-button type="text">批量删除</vxe-button>
            </template>
          </vxe-button>
        </span>
      </template>
      <template v-slot:right>
        <img src="/vxe-table/static/other/img1.gif" height="34">
        <img src="/vxe-table/static/other/img1.gif" height="34">
        <img src="/vxe-table/static/other/img1.gif" height="34">
      </template>
    </vxe-pager>

    <vxe-modal v-model="showDetails" title="查看详情" width="800" height="400" resize>
      <template v-slot>{{ selectRow ? selectRow.name : '' }}</template>
    </vxe-modal>

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
import hljs from 'highlight.js'

export default {
  data () {
    return {
      value1: '',
      value2: '',
      showDetails: false,
      selectRow: null,
      isAllChecked: false,
      isIndeterminate: false,
      selectRecords: [],
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃', flag: false, time: 1600261774531, html1: '<span style="color:red">vxe-table从入门到废弃</span>', img1: '/vxe-table/static/other/img1.gif' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou', flag: false, time: 1600261774531, html1: '', img1: '/vxe-table/static/other/img1.gif' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai', flag: true, time: 1600261774531, html1: '<span style="color:orange">vxe-table从入门到废弃</span>', img1: '/vxe-table/static/other/img2.gif' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃', flag: false, time: 1600261774531, html1: '', img1: '/vxe-table/static/other/img2.gif' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai', flag: true, time: 1600261774531, html1: '', img1: '/vxe-table/static/other/img1.gif' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: 21, address: 'vxe-table 从入门到放弃', flag: true, time: 1600261774531, html1: '<span style="color:blue">vxe-table从入门到废弃</span>', img1: '/vxe-table/static/other/img2.gif' },
        { id: 10007, name: 'Test7', role: 'Test', sex: 'Man ', age: 29, address: 'vxe-table 从入门到放弃', flag: false, time: 1600261774531, html1: '', img1: '/vxe-table/static/other/img1.gif' },
        { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man ', age: 35, address: 'vxe-table 从入门到放弃', flag: false, time: 1600261774531, html1: '', img1: '/vxe-table/static/other/img1.gif' }
      ],
      tablePage: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      demoCodes: [
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button>{{ $t('app.body.button.insert') }}</vxe-button>
            <vxe-button>
              <template v-slot>下拉按钮</template>
              <template v-slot:dropdowns>
                <vxe-button>删除</vxe-button>
                <vxe-button>保存</vxe-button>
              </template>
            </vxe-button>
          </template>
          <template v-slot:tools>
            <vxe-input v-model="value2" placeholder="搜索"></vxe-input>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          resizable
          show-footer
          ref="xTable"
          height="500"
          :footer-method="footerMethod"
          :data="tableData"
          @checkbox-change="checkboxChangeEvent"
          @checkbox-all="checkboxChangeEvent">
          <vxe-table-column type="checkbox" width="60"></vxe-table-column>
          <vxe-table-column type="seq" width="160" :resizable="false" show-overflow>
            <template v-slot:header>
              <div class="first-col">
                <div class="first-col-top">名称</div>
                <div class="first-col-bottom">序号</div>
              </div>
            </template>
            <template v-slot:footer="{ items, _columnIndex }">
              <vxe-button status="primary" @click="clickFooterItem(items, _columnIndex)" size="mini">支持</vxe-button>
              <vxe-button @click="clickFooterItem(items, _columnIndex)" size="mini">放弃</vxe-button>
            </template>
            <template v-slot="{ row }">
              <vxe-button @click="showDetailEvent(row)">弹框{{ row.name }}</vxe-button>
            </template>
          </vxe-table-column>
          <vxe-table-column field="name" title="app.body.label.name" sortable>
            <template v-slot="{ row }">
              <a href="https://github.com/x-extends/vxe-table" target="_black">我是超链接：{{ row.name }}</a>
            </template>
          </vxe-table-column>
          <vxe-table-column field="sex" title="app.body.label.sex" :filters="[{data: ''}]" :filter-method="filterSexMethod">
            <template v-slot:header>
              <span style="color: red;">自定义头部</span>
            </template>
            <template v-slot:footer="{ items, _columnIndex }">
              <span style="color: red">累计：{{ items[_columnIndex] }}</span>
            </template>
            <template v-slot:filter="{ $panel, column }">
              <template v-for="(option, index) in column.filters">
                <input class="my-filter" type="type" v-model="option.data" :key="index" @input="changeFilterEvent($event, option, $panel)">
              </template>
            </template>
            <template v-slot="{ row }">
              <span>{{ row.sex }} </span>
              <vxe-button type="text">编辑</vxe-button>
              <vxe-button type="text">删除</vxe-button>
            </template>
          </vxe-table-column>
          <vxe-table-column field="time" title="Time">
            <template v-slot:header>
              <vxe-input v-model="value1" placeholder="放个输入框" size="mini"></vxe-input>
            </template>
            <template v-slot="{ row, rowIndex }">
              <template v-if="rowIndex === 2">
                <vxe-switch v-model="row.flag"></vxe-switch>
              </template>
              <template v-else-if="rowIndex === 3">
                <vxe-switch v-model="row.flag" open-label="开" close-label="关"></vxe-switch>
              </template>
              <template v-else>
                <span>{{ formatDate(row.time) }}</span>
              </template>
            </template>
          </vxe-table-column>
          <vxe-table-column field="address" title="Address" show-overflow>
            <template v-slot="{ row, rowIndex }">
              <template v-if="rowIndex === 1">
                <vxe-select v-model="row.flag1" transfer>
                  <vxe-option value="Y" label="是"></vxe-option>
                  <vxe-option value="N" label="否"></vxe-option>
                </vxe-select>
              </template>
              <template v-else>
                <a href="https://github.com/x-extends/vxe-table">{{ row.name }}</a>
              </template>
            </template>
          </vxe-table-column>
          <vxe-table-column field="html1" title="Html片段" width="200" show-overflow>
            <template v-slot="{ row }">
              <span v-html="row.html1"></span>
            </template>
            <template v-slot:footer>
              <span>
                <img src="/vxe-table/static/other/img1.gif" style="width: 36px;">自定义模板<img src="/vxe-table/static/other/img2.gif" style="width: 30px;">
              </span>
            </template>
          </vxe-table-column>
          <vxe-table-column field="img1" title="图片路径" width="120">
            <template v-slot="{ row }">
              <img v-if="row.img1" :src="row.img1" style="width: 100px;">
              <span v-else>无</span>
            </template>
          </vxe-table-column>
        </vxe-table>

        <vxe-pager
          perfect
          :current-page.sync="tablePage.currentPage"
          :page-size.sync="tablePage.pageSize"
          :total="tablePage.total"
          :layouts="['PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'Sizes', 'FullJump', 'Total']">
          <template v-slot:left>
            <span class="page-left">
              <vxe-checkbox v-model="isAllChecked" :indeterminate="isIndeterminate" @change="changeAllEvent"></vxe-checkbox>
              <span class="select-count">自定义模板 {{ selectRecords.length }} 条</span>
              <vxe-button>修改</vxe-button>
              <vxe-button>管理</vxe-button>
              <vxe-button>删除</vxe-button>
              <vxe-button size="small">
                <template v-slot>更多操作</template>
                <template v-slot:dropdowns>
                  <vxe-button type="text">批量修改</vxe-button>
                  <vxe-button type="text">批量管理</vxe-button>
                  <vxe-button type="text">批量删除</vxe-button>
                </template>
              </vxe-button>
            </span>
          </template>
          <template v-slot:right>
            <img src="/vxe-table/static/other/img1.gif" height="34">
            <img src="/vxe-table/static/other/img1.gif" height="34">
            <img src="/vxe-table/static/other/img1.gif" height="34">
          </template>
        </vxe-pager>

        <vxe-modal v-model="showDetails" title="查看详情" width="800" height="400" resize>
          <template v-slot>{{ selectRow ? selectRow.name : '' }}</template>
        </vxe-modal>
        `,
        `
        export default {
          data () {
            return {
              value1: '',
              value2: '',
              showDetails: false,
              selectRow: null,
              isAllChecked: false,
              isIndeterminate: false,
              selectRecords: [],
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃', flag: false, time: 1600261774531, html1: '<span style="color:red">vxe-table从入门到废弃</span>', img1: '/vxe-table/static/other/img1.gif' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou', flag: false, time: 1600261774531, html1: '', img1: '/vxe-table/static/other/img1.gif' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai', flag: true, time: 1600261774531, html1: '<span style="color:orange">vxe-table从入门到废弃</span>', img1: '/vxe-table/static/other/img2.gif' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃', flag: false, time: 1600261774531, html1: '', img1: '/vxe-table/static/other/img2.gif' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai', flag: true, time: 1600261774531, html1: '', img1: '/vxe-table/static/other/img1.gif' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: 21, address: 'vxe-table 从入门到放弃', flag: true, time: 1600261774531, html1: '<span style="color:blue">vxe-table从入门到废弃</span>', img1: '/vxe-table/static/other/img2.gif' },
                { id: 10007, name: 'Test7', role: 'Test', sex: 'Man ', age: 29, address: 'vxe-table 从入门到放弃', flag: false, time: 1600261774531, html1: '', img1: '/vxe-table/static/other/img1.gif' },
                { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man ', age: 35, address: 'vxe-table 从入门到放弃', flag: false, time: 1600261774531, html1: '', img1: '/vxe-table/static/other/img1.gif' }
              ],
              tablePage: {
                total: 0,
                currentPage: 1,
                pageSize: 10
              }
            }
          },
          methods: {
            formatDate (value) {
              return XEUtils.toDateString(value, 'yyyy-MM-dd HH:mm:ss.S')
            },
            filterSexMethod ({ option, row }) {
              return row.sex === option.data
            },
            changeFilterEvent (evnt, option, $panel) {
              $panel.changeOption(evnt, !!option.data, option)
            },
            showDetailEvent (row) {
              this.selectRow = row
              this.showDetails = true
            },
            clickFooterItem (items, _columnIndex) {
              this.$XModal.alert(\`点击了表尾第\${_columnIndex}列\`)
            },
            checkboxChangeEvent ({ records }) {
              this.isAllChecked = this.$refs.xTable.isAllCheckboxChecked()
              this.isIndeterminate = this.$refs.xTable.isCheckboxIndeterminate()
              this.selectRecords = records
            },
            changeAllEvent () {
              this.$refs.xTable.setAllCheckboxRow(this.isAllChecked)
              this.selectRecords = this.$refs.xTable.getCheckboxRecords()
            },
            footerMethod ({ columns, data }) {
              return [
                columns.map(column => {
                  if (['sex', 'num'].includes(column.property)) {
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
        .first-col {
          position: relative;
          height: 20px;
        }
        .first-col:before {
          content: "";
          position: absolute;
          left: -15px;
          top: 10px;
          width: 170px;
          height: 1px;
          transform: rotate(20deg);
          background-color: #e8eaec;
        }
        .first-col .first-col-top {
          position: absolute;
          right: 4px;
          top: -10px;
        }
        .first-col .first-col-bottom {
          position: absolute;
          left: 4px;
          bottom: -10px;
        }
        .my-filter {
          margin: 10px;
        }
        .page-left {
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
        }
        `
      ]
    }
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    formatDate (value) {
      return XEUtils.toDateString(value, 'yyyy-MM-dd HH:mm:ss.S')
    },
    filterSexMethod ({ option, row }) {
      return row.sex === option.data
    },
    changeFilterEvent (evnt, option, $panel) {
      $panel.changeOption(evnt, !!option.data, option)
    },
    showDetailEvent (row) {
      this.selectRow = row
      this.showDetails = true
    },
    clickFooterItem (items, _columnIndex) {
      this.$XModal.alert(`点击了表尾第${_columnIndex}列`)
    },
    checkboxChangeEvent ({ records }) {
      this.isAllChecked = this.$refs.xTable.isAllCheckboxChecked()
      this.isIndeterminate = this.$refs.xTable.isCheckboxIndeterminate()
      this.selectRecords = records
    },
    changeAllEvent () {
      this.$refs.xTable.setAllCheckboxRow(this.isAllChecked)
      this.selectRecords = this.$refs.xTable.getCheckboxRecords()
    },
    footerMethod ({ columns, data }) {
      return [
        columns.map(column => {
          if (['sex', 'num'].includes(column.property)) {
            return XEUtils.sum(data, column.property)
          }
          return null
        })
      ]
    }
  }
}
</script>

<style scoped>
.first-col {
  position: relative;
  height: 20px;
}
.first-col:before {
  content: "";
  position: absolute;
  left: -15px;
  top: 10px;
  width: 170px;
  height: 1px;
  transform: rotate(20deg);
  background-color: #e8eaec;
}
.first-col .first-col-top {
  position: absolute;
  right: 4px;
  top: -10px;
}
.first-col .first-col-bottom {
  position: absolute;
  left: 4px;
  bottom: -10px;
}
.my-filter {
  margin: 10px;
}
.page-left {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}
</style>
