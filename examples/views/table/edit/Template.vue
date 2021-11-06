<template>
  <div>
    <p class="tip">
      使用 edit <table-column-api-link prop="slot"/> 自定义渲染任意 Vue 组件，自定义渲染需要配合 <table-api-link prop="updateStatus"/> 方法使用，在对应单元格的值发生改变时调用更新状态<br>
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
      <vxe-column type="checkbox" width="60"></vxe-column>
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column field="role" title="Role" :edit-render="{autofocus: '.vxe-input--inner'}">
        <template #edit="scope">
          <vxe-input type="text" v-model="scope.row.role" @input="$refs.xTable.updateStatus(scope)"></vxe-input>
        </template>
      </vxe-column>
      <vxe-column field="name" title="Name" :edit-render="{autofocus: '.custom-input'}">
        <template #edit="{ row }">
          <vxe-pulldown ref="xPulldown1" transfer>
            <template #default>
              <vxe-input v-model="row.name" placeholder="下拉容器" @click="clickDownEvent"></vxe-input>
            </template>
            <template #dropdown>
              <ul class="my-downpanel1">
                <li v-for="item in downList" :key="item.value" @click="changeNameEvent(item, row)">
                  <i class="fa fa-user-o"></i>
                  <span>{{ item.label }}</span>
                </li>
              </ul>
            </template>
          </vxe-pulldown>
        </template>
      </vxe-column>
      <vxe-colgroup title="分组">
        <vxe-column field="age" title="Age" :edit-render="{autofocus: '.vxe-input--inner'}">
          <template #edit="scope">
            <vxe-input type="number" v-model="scope.row.age" @input="$refs.xTable.updateStatus(scope)"></vxe-input>
          </template>
        </vxe-column>
        <vxe-column field="num" title="Money" :edit-render="{autofocus: '.vxe-input--inner'}">
          <template #edit="scope">
            <vxe-input type="number" v-model="scope.row.num" @input="$refs.xTable.updateStatus(scope)"></vxe-input>
          </template>
          <template #default="{ row }">￥{{ row.num }}</template>
        </vxe-column>
      </vxe-colgroup>
      <vxe-column field="attr1" title="不同行渲染" :edit-render="{}">
        <template #edit="scope">
          <template v-if="scope.rowIndex === 0">
            <vxe-input type="date" v-model="scope.row.attr1" placeholder="请选择日期" @input="$refs.xTable.updateStatus(scope)" transfer></vxe-input>
          </template>
          <template v-else-if="scope.rowIndex === 1">
            <vxe-select v-model="scope.row.attr1" placeholder="请选择下拉" transfer>
              <vxe-option value="选项1" label="选项1"></vxe-option>
              <vxe-option value="选项2" label="选项2"></vxe-option>
              <vxe-option value="选项3" label="选项3"></vxe-option>
            </vxe-select>
          </template>
          <template v-else-if="scope.rowIndex === 2">
            <vxe-input type="number" v-model="scope.row.attr1" placeholder="请输入数值"></vxe-input>
          </template>
          <template v-else>
            <vxe-input type="text" v-model="scope.row.attr1" placeholder="请输入内容"></vxe-input>
          </template>
        </template>
      </vxe-column>
    </vxe-table>

    <vxe-pager
      perfect
      :current-page.sync="tablePage.currentPage"
      :page-size.sync="tablePage.pageSize"
      :total="tablePage.total"
      :layouts="['PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'Sizes', 'FullJump', 'Total']">
      <template #left>
        <span class="page-left">
          <vxe-checkbox v-model="isAllChecked" :indeterminate="isIndeterminate" @change="changeAllEvent"></vxe-checkbox>
          <span class="select-count">自定义模板 {{ selectRecords.length }} 条</span>
          <vxe-button>修改</vxe-button>
          <vxe-button>管理</vxe-button>
          <vxe-button>删除</vxe-button>
          <vxe-button size="small">
            <template #default>更多操作</template>
            <template #dropdowns>
              <vxe-button type="text">批量修改</vxe-button>
              <vxe-button type="text">批量管理</vxe-button>
              <vxe-button type="text">批量删除</vxe-button>
            </template>
          </vxe-button>
        </span>
      </template>
      <template #right>
        <img src="/vxe-table/static/other/img1.gif" height="34">
        <img src="/vxe-table/static/other/img1.gif" height="34">
        <img src="/vxe-table/static/other/img1.gif" height="34">
      </template>
    </vxe-pager>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
      <pre-code class="css">{{ demoCodes[2] }}</pre-code>
    </pre>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isAllChecked: false,
      isIndeterminate: false,
      selectRecords: [],
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'test abc' },
        { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'test abc' },
        { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc' }
      ],
      downList: [
        { label: '选项1', value: 1 },
        { label: '选项2', value: 2 },
        { label: '选项3', value: 3 },
        { label: '选项4', value: 4 },
        { label: '选项5', value: 5 }
      ],
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
          <vxe-column type="checkbox" width="60"></vxe-column>
          <vxe-column type="seq" width="60"></vxe-column>
          <vxe-column field="role" title="Role" :edit-render="{autofocus: '.vxe-input--inner'}">
            <template #edit="{ row }">
              <vxe-input type="text" v-model="row.role"></vxe-input>
            </template>
          </vxe-column>
          <vxe-column field="name" title="Name" :edit-render="{autofocus: '.custom-input'}">
            <template #edit="{ row }">
              <vxe-pulldown ref="xPulldown1" transfer>
                <template #default>
                  <vxe-input v-model="row.name" placeholder="下拉容器" @click="clickDownEvent"></vxe-input>
                </template>
                <template #dropdown>
                  <ul class="my-downpanel1">
                    <li v-for="item in downList" :key="item.value" @click="changeNameEvent(item, row)">
                      <i class="fa fa-user-o"></i>
                      <span>{{ item.label }}</span>
                    </li>
                  </ul>
                </template>
              </vxe-pulldown>
            </template>
          </vxe-column>
          <vxe-colgroup title="分组">
            <vxe-column field="age" title="Age" :edit-render="{autofocus: '.vxe-input--inner'}">
              <template #edit="{ row }">
                <vxe-input type="number" v-model="row.age"></vxe-input>
              </template>
            </vxe-column>
            <vxe-column field="num" title="Money" :edit-render="{autofocus: '.vxe-input--inner'}">
              <template #edit="{ row }">
                <vxe-input type="number" v-model="row.num"></vxe-input>
              </template>
              <template #default="{ row }">￥{{ row.num }}</template>
            </vxe-column>
          </vxe-colgroup>
          <vxe-column field="attr1" title="不同行渲染" :edit-render="{}">
            <template #edit="scope">
              <template v-if="scope.rowIndex === 0">
                <vxe-input type="date" v-model="scope.row.attr1" placeholder="请选择日期" @input="$refs.xTable.updateStatus(scope)" transfer></vxe-input>
              </template>
              <template v-else-if="scope.rowIndex === 1">
                <vxe-select v-model="scope.row.attr1" placeholder="请选择下拉" transfer>
                  <vxe-option value="选项1" label="选项1"></vxe-option>
                  <vxe-option value="选项2" label="选项2"></vxe-option>
                  <vxe-option value="选项3" label="选项3"></vxe-option>
                </vxe-select>
              </template>
              <template v-else-if="scope.rowIndex === 2">
                <vxe-input type="number" v-model="scope.row.attr1" placeholder="请输入数值"></vxe-input>
              </template>
              <template v-else>
                <vxe-input type="text" v-model="scope.row.attr1" placeholder="请输入内容"></vxe-input>
              </template>
            </template>
          </vxe-column>
        </vxe-table>
        
        <vxe-pager
          perfect
          :current-page.sync="tablePage.currentPage"
          :page-size.sync="tablePage.pageSize"
          :total="tablePage.total"
          :layouts="['PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'Sizes', 'FullJump', 'Total']">
          <template #left>
            <span class="page-left">
              <vxe-checkbox v-model="isAllChecked" :indeterminate="isIndeterminate" @change="changeAllEvent"></vxe-checkbox>
              <span class="select-count">自定义模板 {{ selectRecords.length }} 条</span>
              <vxe-button>修改</vxe-button>
              <vxe-button>管理</vxe-button>
              <vxe-button>删除</vxe-button>
              <vxe-button size="small">
                <template #default>更多操作</template>
                <template #dropdowns>
                  <vxe-button type="text">批量修改</vxe-button>
                  <vxe-button type="text">批量管理</vxe-button>
                  <vxe-button type="text">批量删除</vxe-button>
                </template>
              </vxe-button>
            </span>
          </template>
          <template #right>
            <img src="/vxe-table/static/other/img1.gif" height="34">
            <img src="/vxe-table/static/other/img1.gif" height="34">
            <img src="/vxe-table/static/other/img1.gif" height="34">
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
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'test abc' },
                { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'test abc' },
                { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc' }
              ],
              downList: [
                { label: '选项1', value: 1 },
                { label: '选项2', value: 2 },
                { label: '选项3', value: 3 },
                { label: '选项4', value: 4 },
                { label: '选项5', value: 5 }
              ],
              tablePage: {
                total: 0,
                currentPage: 1,
                pageSize: 10
              }
            }
          },
          methods: {
            checkboxChangeEvent ({ records }) {
              const $table = this.$refs.xTable
              this.isAllChecked = $table.isAllCheckboxChecked()
              this.isIndeterminate = $table.isAllCheckboxIndeterminate()
              this.selectRecords = records
            },
            changeAllEvent () {
              const $table = this.$refs.xTable
              $table.setAllCheckboxRow(this.isAllChecked)
              this.selectRecords = $table.getCheckboxRecords()
            },
            clickDownEvent () {
              const $pulldown = this.$refs.xPulldown1
              if ($pulldown) {
                $pulldown.showPanel()
              }
            },
            changeNameEvent (item, row) {
              const $pulldown = this.$refs.xPulldown1
              row.name = item.label
              if ($pulldown) {
                $pulldown.hidePanel()
              }
            }
          }
        }
        `,
        `
        .my-downpanel1 {
          background-color: #fff;
          border: 1px solid #e8eaec;
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
  methods: {
    checkboxChangeEvent ({ records }) {
      const $table = this.$refs.xTable
      this.isAllChecked = $table.isAllCheckboxChecked()
      this.isIndeterminate = $table.isAllCheckboxIndeterminate()
      this.selectRecords = records
    },
    changeAllEvent () {
      const $table = this.$refs.xTable
      $table.setAllCheckboxRow(this.isAllChecked)
      this.selectRecords = $table.getCheckboxRecords()
    },
    clickDownEvent () {
      const $pulldown = this.$refs.xPulldown1
      if ($pulldown) {
        $pulldown.showPanel()
      }
    },
    changeNameEvent (item, row) {
      const $pulldown = this.$refs.xPulldown1
      row.name = item.label
      if ($pulldown) {
        $pulldown.hidePanel()
      }
    }
  }
}
</script>

<style scoped>
.my-downpanel1 {
  background-color: #fff;
  border: 1px solid #e8eaec;
}
.page-left {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}
</style>
