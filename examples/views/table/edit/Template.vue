<template>
  <div>
    <p class="tip">
      使用 edit <table-column-api-link prop="slot"/> 自定义渲染任意 Vue 组件<br>
      <span class="red">（注：自定义渲染虽然可以支持任意的 vue 组件，但是并不是所有组件都能直接使用的，所有跨组件之间会存在冲突问题，如果不处理好冲突的情况下是大部分组件是无法使用的；
      可以通过 <router-link class="link" :to="{name: 'InterceptorAPI'}">事件拦截器</router-link> 来处理冲突）</span><br>
      <table-column-api-link prop="default"/>：自定义内容模板（提前格式化（最优） > <table-column-api-link prop="formatter"/>（值发生变化时） > <table-column-api-link prop="slots"/>（即时））<br>
      <table-column-api-link prop="header"/>：自定义表头模板<br>
      <table-column-api-link prop="footer"/>：自定义表尾模板<br>
      <table-column-api-link prop="filter"/>：自定义筛选模板（建议使用<router-link :to="{name: 'RendererAPI'}">渲染器</router-link>，可以更好的复用）<br>
      <table-column-api-link prop="edit"/>：自定义可编辑模板（建议使用<router-link :to="{name: 'RendererAPI'}">渲染器</router-link>，可以更好的复用）
    </p>

    <vxe-table
      border
      show-overflow
      ref="xTable"
      :data="tableData"
      :edit-config="{trigger: 'click', mode: 'cell', icon: 'fa fa-pencil'}"
      @checkbox-change="checkboxChangeEvent"
      @checkbox-all="checkboxChangeEvent">
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="role" title="Role" :edit-render="{autofocus: '.vxe-input--inner'}">
        <template v-slot:edit="{ row }">
          <vxe-input type="text" v-model="row.role"></vxe-input>
        </template>
      </vxe-table-column>
      <vxe-table-column field="name" title="Name" :edit-render="{autofocus: '.custom-input'}">
        <template v-slot:edit="{ row }">
          <input type="text" v-model="row.name" class="custom-input">
        </template>
      </vxe-table-column>
      <vxe-table-column field="age" title="Age" :edit-render="{autofocus: '.vxe-input--inner'}">
        <template v-slot:edit="{ row }">
          <vxe-input type="number" v-model="row.age"></vxe-input>
        </template>
      </vxe-table-column>
      <vxe-table-column field="num" title="Money" :edit-render="{autofocus: '.vxe-input--inner'}">
        <template v-slot:edit="{ row }">
          <vxe-input type="number" v-model="row.num"></vxe-input>
        </template>
        <template v-slot="{ row }">￥{{ row.num }}</template>
      </vxe-table-column>
      <vxe-table-column field="attr1" title="不同行渲染" :edit-render="{type: 'default'}">
        <template v-slot:edit="{ row, rowIndex }">
          <template v-if="rowIndex === 0">
            <vxe-input type="date" v-model="row.attr1" placeholder="请选择日期" transfer></vxe-input>
          </template>
          <template v-else-if="rowIndex === 1">
            <vxe-select v-model="row.attr1" placeholder="请选择下拉" transfer>
              <vxe-option value="选项1" label="选项1"></vxe-option>
              <vxe-option value="选项2" label="选项2"></vxe-option>
              <vxe-option value="选项3" label="选项3"></vxe-option>
            </vxe-select>
          </template>
          <template v-else-if="rowIndex === 2">
            <vxe-input type="number" v-model="row.attr1" placeholder="请输入数值"></vxe-input>
          </template>
          <template v-else>
            <vxe-input type="text" v-model="row.attr1" placeholder="请输入内容"></vxe-input>
          </template>
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
          <span class="select-count">已选中 {{ selectRecords.length }} 条</span>
          <vxe-button>修改</vxe-button>
          <vxe-button>管理</vxe-button>
          <vxe-button>删除</vxe-button>
          <vxe-button size="small">
            <template>更多操作</template>
            <template v-slot:dropdowns>
              <vxe-button type="text">批量修改</vxe-button>
              <vxe-button type="text">批量管理</vxe-button>
              <vxe-button type="text">批量删除</vxe-button>
            </template>
          </vxe-button>
        </span>
      </template>
      <template v-slot:right>
        <img src="static/other/img1.gif" height="34">
        <img src="static/other/img1.gif" height="34">
        <img src="static/other/img1.gif" height="34">
      </template>
    </vxe-pager>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
      <code class="css">{{ demoCodes[2] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  data () {
    return {
      isAllChecked: false,
      isIndeterminate: false,
      selectRecords: [],
      tableData: [],
      tablePage: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      demoCodes: [
        `
        <vxe-table
          border
          show-overflow
          ref="xTable"
          :data="tableData"
          :edit-config="{trigger: 'click', mode: 'cell', icon: 'fa fa-pencil'}"
          @checkbox-change="checkboxChangeEvent"
          @checkbox-all="checkboxChangeEvent">
          <vxe-table-column type="checkbox" width="60"></vxe-table-column>
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="role" title="Role" :edit-render="{autofocus: '.vxe-input--inner'}">
            <template v-slot:edit="{ row }">
              <vxe-input type="text" v-model="row.role"></vxe-input>
            </template>
          </vxe-table-column>
          <vxe-table-column field="name" title="Name" :edit-render="{autofocus: '.custom-input'}">
            <template v-slot:edit="{ row }">
              <input type="text" v-model="row.name" class="custom-input">
            </template>
          </vxe-table-column>
          <vxe-table-column field="age" title="Age" :edit-render="{autofocus: '.vxe-input--inner'}">
            <template v-slot:edit="{ row }">
              <vxe-input type="number" v-model="row.age"></vxe-input>
            </template>
          </vxe-table-column>
          <vxe-table-column field="num" title="Money" :edit-render="{autofocus: '.vxe-input--inner'}">
            <template v-slot:edit="{ row }">
              <vxe-input type="number" v-model="row.num"></vxe-input>
            </template>
            <template v-slot="{ row }">￥{{ row.num }}</template>
          </vxe-table-column>
          <vxe-table-column field="attr1" title="不同行渲染" :edit-render="{type: 'default'}">
            <template v-slot:edit="{ row, rowIndex }">
              <template v-if="rowIndex === 0">
                <vxe-input type="date" v-model="row.attr1" placeholder="请选择日期" transfer></vxe-input>
              </template>
              <template v-else-if="rowIndex === 1">
                <vxe-select v-model="row.attr1" placeholder="请选择下拉" transfer>
                  <vxe-option value="选项1" label="选项1"></vxe-option>
                  <vxe-option value="选项2" label="选项2"></vxe-option>
                  <vxe-option value="选项3" label="选项3"></vxe-option>
                </vxe-select>
              </template>
              <template v-else-if="rowIndex === 2">
                <vxe-input type="number" v-model="row.attr1" placeholder="请输入数值"></vxe-input>
              </template>
              <template v-else>
                <vxe-input type="text" v-model="row.attr1" placeholder="请输入内容"></vxe-input>
              </template>
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
              <span class="select-count">已选中 {{ selectRecords.length }} 条</span>
              <vxe-button>修改</vxe-button>
              <vxe-button>管理</vxe-button>
              <vxe-button>删除</vxe-button>
              <vxe-button size="small">
                <template>更多操作</template>
                <template v-slot:dropdowns>
                  <vxe-button type="text">批量修改</vxe-button>
                  <vxe-button type="text">批量管理</vxe-button>
                  <vxe-button type="text">批量删除</vxe-button>
                </template>
              </vxe-button>
            </span>
          </template>
          <template v-slot:right>
            <img src="static/other/img1.gif" height="34">
            <img src="static/other/img1.gif" height="34">
            <img src="static/other/img1.gif" height="34">
          </template>
        </vxe-pager>
        `,
        `
        export default {
          data () {
            return {
              isAllChecked: false,
              isIndeterminate: false,
              selectRecords: [],
              tableData: [],
              tablePage: {
                total: 0,
                currentPage: 1,
                pageSize: 10
              }
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
          },
          methods: {
            checkboxChangeEvent ({ records }) {
              this.isAllChecked = this.$refs.xTable.isAllCheckboxChecked()
              this.isIndeterminate = this.$refs.xTable.isCheckboxIndeterminate()
              this.selectRecords = records
            },
            changeAllEvent () {
              this.$refs.xTable.setAllCheckboxRow(this.isAllChecked)
            }
          }
        }
        `,
        `
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
  created () {
    this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    checkboxChangeEvent ({ records }) {
      this.isAllChecked = this.$refs.xTable.isAllCheckboxChecked()
      this.isIndeterminate = this.$refs.xTable.isCheckboxIndeterminate()
      this.selectRecords = records
    },
    changeAllEvent () {
      this.$refs.xTable.setAllCheckboxRow(this.isAllChecked)
    }
  }
}
</script>

<style scoped>
.page-left {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}
</style>
