<template>
  <div>
    <p class="tip">
      可以设置大小尺寸：medium / small / mini<br>
      默认大小：Table 48px 、Button 34px、Input 34px、Checkbox 16px、Radio 16px，可以通过 scss 变量修改，<a class="link" href="https://github.com/x-extends/vxe-table/blob/master/styles/variable.scss" target="_blank">查看所有变量</a><br><a class="link" href="https://github.com/x-extends/vxe-table-demo/tree/master/vxe-table-by-theme" target="_blank">（项目示例）</a>
    </p>

    <vxe-toolbar>
      <template #buttons>
        <vxe-button @click="demo1.allAlign = 'left'">居左</vxe-button>
        <vxe-button @click="demo1.allAlign = 'center'">居中</vxe-button>
        <vxe-button @click="demo1.allAlign = 'right'">居右</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-form :data="formData">
      <vxe-form-item title="输入框" field="iVal" :item-render="{}">
        <template #default>
          <vxe-input v-model="formData.iVal" placeholder="请输入名称" clearable></vxe-input>
        </template>
      </vxe-form-item>
      <vxe-form-item title="下拉框" field="sVal" :item-render="{}">
        <template #default>
          <vxe-select v-model="formData.sVal">
            <vxe-option value="0" label="女"></vxe-option>
            <vxe-option value="1" label="男"></vxe-option>
          </vxe-select>
        </template>
      </vxe-form-item>
      <vxe-form-item title="复选框" field="cVal" :item-render="{}">
        <template #default>
          <vxe-checkbox v-model="formData.cVal">选项1</vxe-checkbox>
          <vxe-checkbox :indeterminate="formData.ciVal">半选</vxe-checkbox>
        </template>
      </vxe-form-item>
      <vxe-form-item title="单选框" field="rVal" :item-render="{}">
        <template #default>
          <vxe-radio-group v-model="formData.rVal">
            <vxe-radio label="1">选项1</vxe-radio>
            <vxe-radio label="2">选项2</vxe-radio>
          </vxe-radio-group>
        </template>
      </vxe-form-item>
      <vxe-form-item>
        <template #default>
          <vxe-button type="submit" status="primary">查询</vxe-button>
          <vxe-button type="reset">重置</vxe-button>
        </template>
      </vxe-form-item>
    </vxe-form>

    <vxe-toolbar export custom>
      <template #buttons>
        <vxe-input v-model="formData.name" placeholder="请输入名称" clearable></vxe-input>
        <vxe-button status="primary">查询</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      :export-config="{}"
      :align="demo1.allAlign"
      :data="tableData">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column type="radio" width="60"></vxe-table-column>
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="age" title="Age" sortable></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" :filters="[{value:'0',label:'女'},{value:'1',label:'男'}]"></vxe-table-column>
      <vxe-table-column field="sex2" title="Sex2" sortable :filters="[{value:'0',label:'女'},{value:'1',label:'男'}]" :filter-multiple="false"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <vxe-pager
      perfect
      v-model:current-page="tablePage.currentPage"
      v-model:page-size="tablePage.pageSize"
      :total="tablePage.total"
      :page-sizes="tablePage.pageSizes"
      :layouts="tablePage.layouts">
    </vxe-pager>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>

    <p class="tip">设置大小为 medium，默认大小：Table 44px 、Button 32px、Input 32px、Checkbox 15px、Radio 15px</p>

    <vxe-form :data="formData" size="medium">
      <vxe-form-item title="输入框" field="iVal" :item-render="{}">
        <template #default>
          <vxe-input v-model="formData.iVal" placeholder="请输入名称" clearable></vxe-input>
        </template>
      </vxe-form-item>
      <vxe-form-item title="下拉框" field="sVal" :item-render="{}">
        <template #default>
          <vxe-select v-model="formData.sVal">
            <vxe-option value="0" label="女"></vxe-option>
            <vxe-option value="1" label="男"></vxe-option>
          </vxe-select>
        </template>
      </vxe-form-item>
      <vxe-form-item title="复选框" field="cVal" :item-render="{}">
        <template #default>
          <vxe-checkbox v-model="formData.cVal">选项1</vxe-checkbox>
          <vxe-checkbox :indeterminate="formData.ciVal">半选</vxe-checkbox>
        </template>
      </vxe-form-item>
      <vxe-form-item title="单选框" field="rVal" :item-render="{}">
        <template #default>
          <vxe-radio-group v-model="formData.rVal">
            <vxe-radio label="1">选项1</vxe-radio>
            <vxe-radio label="2">选项2</vxe-radio>
          </vxe-radio-group>
        </template>
      </vxe-form-item>
      <vxe-form-item>
        <template #default>
          <vxe-button type="submit" status="primary">查询</vxe-button>
          <vxe-button type="reset">重置</vxe-button>
        </template>
      </vxe-form-item>
    </vxe-form>

    <vxe-toolbar size="medium" export custom>
      <template #buttons>
        <vxe-input v-model="formData.name" placeholder="请输入名称" clearable></vxe-input>
        <vxe-button status="primary">查询</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      size="medium"
      :export-config="{}"
      :align="demo1.allAlign"
      :data="tableData">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column type="radio" width="60"></vxe-table-column>
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="age" title="Age" sortable></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" :filters="[{value:'0',label:'女'},{value:'1',label:'男'}]"></vxe-table-column>
      <vxe-table-column field="sex2" title="Sex2" sortable :filters="[{value:'0',label:'女'},{value:'1',label:'男'}]" :filter-multiple="false"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <vxe-pager
      perfect
      size="medium"
      v-model:current-page="tablePage.currentPage"
      v-model:page-size="tablePage.pageSize"
      :total="tablePage.total"
      :page-sizes="tablePage.pageSizes"
      :layouts="tablePage.layouts">
    </vxe-pager>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[2] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[3] }}</pre-code>
    </pre>

    <p class="tip">设置大小为 small，默认大小：Table 40px 、Button 30px、Input 30px、Checkbox 14px、Radio 14px</p>

    <vxe-form :data="formData" size="small">
      <vxe-form-item title="输入框" field="iVal" :item-render="{}">
        <template #default>
          <vxe-input v-model="formData.iVal" placeholder="请输入名称" clearable></vxe-input>
        </template>
      </vxe-form-item>
      <vxe-form-item title="下拉框" field="sVal" :item-render="{}">
        <template #default>
          <vxe-select v-model="formData.sVal">
            <vxe-option value="0" label="女"></vxe-option>
            <vxe-option value="1" label="男"></vxe-option>
          </vxe-select>
        </template>
      </vxe-form-item>
      <vxe-form-item title="复选框" field="cVal" :item-render="{}">
        <template #default>
          <vxe-checkbox v-model="formData.cVal">选项1</vxe-checkbox>
          <vxe-checkbox :indeterminate="formData.ciVal">半选</vxe-checkbox>
        </template>
      </vxe-form-item>
      <vxe-form-item title="单选框" field="rVal" :item-render="{}">
        <template #default>
          <vxe-radio-group v-model="formData.rVal">
            <vxe-radio label="1">选项1</vxe-radio>
            <vxe-radio label="2">选项2</vxe-radio>
          </vxe-radio-group>
        </template>
      </vxe-form-item>
      <vxe-form-item>
        <template #default>
          <vxe-button type="submit" status="primary">查询</vxe-button>
          <vxe-button type="reset">重置</vxe-button>
        </template>
      </vxe-form-item>
    </vxe-form>

    <vxe-toolbar size="small" export custom>
      <template #buttons>
        <vxe-input v-model="formData.name" placeholder="请输入名称" clearable></vxe-input>
        <vxe-button status="primary">查询</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      size="small"
      :export-config="{}"
      :align="demo1.allAlign"
      :data="tableData">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column type="radio" width="60"></vxe-table-column>
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="age" title="Age" sortable></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" :filters="[{value:'0',label:'女'},{value:'1',label:'男'}]"></vxe-table-column>
      <vxe-table-column field="sex2" title="Sex2" sortable :filters="[{value:'0',label:'女'},{value:'1',label:'男'}]" :filter-multiple="false"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <vxe-pager
      perfect
      size="small"
      v-model:current-page="tablePage.currentPage"
      v-model:page-size="tablePage.pageSize"
      :total="tablePage.total"
      :page-sizes="tablePage.pageSizes"
      :layouts="tablePage.layouts">
    </vxe-pager>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[4] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[5] }}</pre-code>
    </pre>

    <p class="tip">设置大小为 mini，默认大小：Table 36px 、Button 28px、Input 28px、Checkbox 14px、Radio 14px</p>

    <vxe-form :data="formData" size="mini">
      <vxe-form-item title="输入框" field="iVal" :item-render="{}">
        <template #default>
          <vxe-input v-model="formData.iVal" placeholder="请输入名称" clearable></vxe-input>
        </template>
      </vxe-form-item>
      <vxe-form-item title="下拉框" field="sVal" :item-render="{}">
        <template #default>
          <vxe-select v-model="formData.sVal">
            <vxe-option value="0" label="女"></vxe-option>
            <vxe-option value="1" label="男"></vxe-option>
          </vxe-select>
        </template>
      </vxe-form-item>
      <vxe-form-item title="复选框" field="cVal" :item-render="{}">
        <template #default>
          <vxe-checkbox v-model="formData.cVal">选项1</vxe-checkbox>
          <vxe-checkbox :indeterminate="formData.ciVal">半选</vxe-checkbox>
        </template>
      </vxe-form-item>
      <vxe-form-item title="单选框" field="rVal" :item-render="{}">
        <template #default>
          <vxe-radio-group v-model="formData.rVal">
            <vxe-radio label="1">选项1</vxe-radio>
            <vxe-radio label="2">选项2</vxe-radio>
          </vxe-radio-group>
        </template>
      </vxe-form-item>
      <vxe-form-item>
        <template #default>
          <vxe-button type="submit" status="primary">查询</vxe-button>
          <vxe-button type="reset">重置</vxe-button>
        </template>
      </vxe-form-item>
    </vxe-form>

    <vxe-toolbar size="mini" export custom>
      <template #buttons>
        <vxe-input v-model="formData.name" placeholder="请输入名称" clearable></vxe-input>
        <vxe-button status="primary">查询</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      size="mini"
      :export-config="{}"
      :align="demo1.allAlign"
      :data="tableData">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column type="radio" width="60"></vxe-table-column>
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="age" title="Age" sortable></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" :filters="[{value:'0',label:'女'},{value:'1',label:'男'}]"></vxe-table-column>
      <vxe-table-column field="sex2" title="Sex2" sortable :filters="[{value:'0',label:'女'},{value:'1',label:'男'}]" :filter-multiple="false"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <vxe-pager
      perfect
      size="mini"
      v-model:current-page="tablePage.currentPage"
      v-model:page-size="tablePage.pageSize"
      :total="tablePage.total"
      :page-sizes="tablePage.pageSizes"
      :layouts="tablePage.layouts">
    </vxe-pager>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[6] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[7] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'

export default defineComponent({
  setup () {
    const demo1 = reactive({
      allAlign: null
    })
    const formData = reactive({
      iVal: '',
      sVal: '',
      cVal: true,
      ciVal: true,
      rVal: '1'
    })
    const tablePage = reactive({
      total: 500,
      currentPage: 1,
      pageSize: 10,
      pageSizes: [10, 15, 20, 50, 100],
      layouts: ['PrevJump', 'PrevPage', 'JumpNumber', 'NextPage', 'NextJump', 'FullJump', 'Sizes', 'Total']
    })
    const tableData = ref([
      { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
      { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
      { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
      { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃' },
      { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
      { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: 21, address: 'vxe-table 从入门到放弃' },
      { id: 10007, name: 'Test7', role: 'Test', sex: 'Man ', age: 29, address: 'vxe-table 从入门到放弃' },
      { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man ', age: 35, address: 'vxe-table 从入门到放弃' }
    ])
    return {
      demo1,
      formData,
      tablePage,
      tableData,
      demoCodes: [
        `
        <vxe-table
          :data="tableData">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column type="radio" width="60"></vxe-table-column>
          <vxe-table-column type="checkbox" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="age" title="Age" sortable></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" :filters="[{value:'0',label:'女'},{value:'1',label:'男'}]"></vxe-table-column>
          <vxe-table-column field="sex2" title="Sex2" sortable :filters="[{value:'0',label:'女'},{value:'1',label:'男'}]" :filter-multiple="false"></vxe-table-column>
          <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, ref } from 'vue'

        export default defineComponent({
          setup () {
            const tableData = ref([
              { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
              { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
              { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
              { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃' },
              { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
              { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: 21, address: 'vxe-table 从入门到放弃' },
              { id: 10007, name: 'Test7', role: 'Test', sex: 'Man ', age: 29, address: 'vxe-table 从入门到放弃' },
              { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man ', age: 35, address: 'vxe-table 从入门到放弃' }
            ])
            return {
              tableData
            }
          }
        })
        `,
        `
        <vxe-table
          size="medium"
          :data="tableData">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column type="radio" width="60"></vxe-table-column>
          <vxe-table-column type="checkbox" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="age" title="Age" sortable></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" :filters="[{value:'0',label:'女'},{value:'1',label:'男'}]"></vxe-table-column>
          <vxe-table-column field="sex2" title="Sex2" sortable :filters="[{value:'0',label:'女'},{value:'1',label:'男'}]" :filter-multiple="false"></vxe-table-column>
          <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, ref } from 'vue'

        export default defineComponent({
          setup () {
            const tableData = ref([
              { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
              { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
              { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
              { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃' },
              { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
              { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: 21, address: 'vxe-table 从入门到放弃' },
              { id: 10007, name: 'Test7', role: 'Test', sex: 'Man ', age: 29, address: 'vxe-table 从入门到放弃' },
              { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man ', age: 35, address: 'vxe-table 从入门到放弃' }
            ])
            return {
              tableData
            }
          }
        })
        `,
        `
        <vxe-table
          size="small"
          :data="tableData">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column type="radio" width="60"></vxe-table-column>
          <vxe-table-column type="checkbox" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="age" title="Age" sortable></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" :filters="[{value:'0',label:'女'},{value:'1',label:'男'}]"></vxe-table-column>
          <vxe-table-column field="sex2" title="Sex2" sortable :filters="[{value:'0',label:'女'},{value:'1',label:'男'}]" :filter-multiple="false"></vxe-table-column>
          <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, ref } from 'vue'

        export default defineComponent({
          setup () {
            const tableData = ref([
              { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
              { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
              { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
              { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃' },
              { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
              { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: 21, address: 'vxe-table 从入门到放弃' },
              { id: 10007, name: 'Test7', role: 'Test', sex: 'Man ', age: 29, address: 'vxe-table 从入门到放弃' },
              { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man ', age: 35, address: 'vxe-table 从入门到放弃' }
            ])
            return {
              tableData
            }
          }
        })
        `,
        `
        <vxe-table
          size="mini"
          :data="tableData">
          <<vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column type="radio" width="60"></vxe-table-column>
          <vxe-table-column type="checkbox" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="age" title="Age" sortable></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" :filters="[{value:'0',label:'女'},{value:'1',label:'男'}]"></vxe-table-column>
          <vxe-table-column field="sex2" title="Sex2" sortable :filters="[{value:'0',label:'女'},{value:'1',label:'男'}]" :filter-multiple="false"></vxe-table-column>
          <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, ref } from 'vue'

        export default defineComponent({
          setup () {
            const tableData = ref([
              { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
              { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
              { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
              { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃' },
              { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
              { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: 21, address: 'vxe-table 从入门到放弃' },
              { id: 10007, name: 'Test7', role: 'Test', sex: 'Man ', age: 29, address: 'vxe-table 从入门到放弃' },
              { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man ', age: 35, address: 'vxe-table 从入门到放弃' }
            ])
            return {
              tableData
            }
          }
        })
        `
      ]
    }
  }
})
</script>
