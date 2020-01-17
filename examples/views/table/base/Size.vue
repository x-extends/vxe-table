<template>
  <div>
    <p class="tip">
      可以设置大小尺寸：medium / small / mini<br>
      默认大小：Table 48px 、Button 34px、Input 34px、Checkbox 16px、Radio 16px，可以通过 scss 变量修改，<a class="link" href="https://github.com/xuliangzhan/vxe-table/blob/master/styles/variable.scss" target="_blank">查看所有变量</a><br><a class="link" href="https://github.com/xuliangzhan/vxe-table-demo/tree/master/vxe-table-by-vue-custom-theme" target="_blank">（项目示例）</a>
    </p>

    <vxe-form :data="formData">
      <vxe-form-item title="输入框" field="iVal">
        <vxe-input v-model="formData.iVal" placeholder="请输入名称" clearable></vxe-input>
      </vxe-form-item>
      <vxe-form-item title="下拉框" field="sVal">
        <select v-model="formData.sVal" class="vxe-select">
          <option value="0"></option>
          <option value="1">女</option>
          <option value="2">男</option>
        </select>
      </vxe-form-item>
      <vxe-form-item title="复选框" field="cVal">
        <vxe-checkbox v-model="formData.cVal">选项1</vxe-checkbox>
        <vxe-checkbox :indeterminate="formData.ciVal">半选</vxe-checkbox>
      </vxe-form-item>
      <vxe-form-item title="单选框" field="rVal">
        <vxe-radio v-model="formData.rVal" name="size-radio" label="1">选项1</vxe-radio>
        <vxe-radio v-model="formData.rVal" name="size-radio" label="2">选项2</vxe-radio>
      </vxe-form-item>
      <vxe-form-item>
        <vxe-button type="submit" status="primary">查询</vxe-button>
        <vxe-button type="reset">重置</vxe-button>
      </vxe-form-item>
    </vxe-form>

    <vxe-toolbar export custom>
      <template v-slot:buttons>
        <vxe-input v-model="formData.name" placeholder="请输入名称" clearable></vxe-input>
        <vxe-button status="primary">查询</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      export-config
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
      :current-page.sync="tablePage.currentPage"
      :page-size.sync="tablePage.pageSize"
      :total="tablePage.total"
      :page-sizes="tablePage.pageSizes"
      :layouts="tablePage.layouts">
    </vxe-pager>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p class="tip">设置大小为 medium，默认大小：Table 44px 、Button 32px、Input 32px、Checkbox 15px、Radio 15px</p>

    <vxe-form :data="formData" size="medium">
      <vxe-form-item title="输入框" field="iVal">
        <vxe-input v-model="formData.iVal" placeholder="请输入名称" clearable></vxe-input>
      </vxe-form-item>
      <vxe-form-item title="下拉框" field="sVal">
        <select v-model="formData.sVal" class="vxe-select">
          <option value="0"></option>
          <option value="1">女</option>
          <option value="2">男</option>
        </select>
      </vxe-form-item>
      <vxe-form-item title="复选框" field="cVal">
        <vxe-checkbox v-model="formData.cVal">选项1</vxe-checkbox>
        <vxe-checkbox :indeterminate="formData.ciVal">半选</vxe-checkbox>
      </vxe-form-item>
      <vxe-form-item title="单选框" field="rVal">
        <vxe-radio v-model="formData.rVal" name="size-radio" label="1">选项1</vxe-radio>
        <vxe-radio v-model="formData.rVal" name="size-radio" label="2">选项2</vxe-radio>
      </vxe-form-item>
      <vxe-form-item>
        <vxe-button type="submit" status="primary">查询</vxe-button>
        <vxe-button type="reset">重置</vxe-button>
      </vxe-form-item>
    </vxe-form>

    <vxe-toolbar size="medium" export custom>
      <template v-slot:buttons>
        <vxe-input v-model="formData.name" placeholder="请输入名称" clearable></vxe-input>
        <vxe-button status="primary">查询</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      export-config
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

    <vxe-pager
      perfect
      size="medium"
      :current-page.sync="tablePage.currentPage"
      :page-size.sync="tablePage.pageSize"
      :total="tablePage.total"
      :page-sizes="tablePage.pageSizes"
      :layouts="tablePage.layouts">
    </vxe-pager>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[2] }}</code>
      <code class="javascript">{{ demoCodes[3] }}</code>
    </pre>

    <p class="tip">设置大小为 small，默认大小：Table 40px 、Button 30px、Input 30px、Checkbox 14px、Radio 14px</p>

    <vxe-form :data="formData" size="small">
      <vxe-form-item title="输入框" field="iVal">
        <vxe-input v-model="formData.iVal" placeholder="请输入名称" clearable></vxe-input>
      </vxe-form-item>
      <vxe-form-item title="下拉框" field="sVal">
        <select v-model="formData.sVal" class="vxe-select">
          <option value="0"></option>
          <option value="1">女</option>
          <option value="2">男</option>
        </select>
      </vxe-form-item>
      <vxe-form-item title="复选框" field="cVal">
        <vxe-checkbox v-model="formData.cVal">选项1</vxe-checkbox>
        <vxe-checkbox :indeterminate="formData.ciVal">半选</vxe-checkbox>
      </vxe-form-item>
      <vxe-form-item title="单选框" field="rVal">
        <vxe-radio v-model="formData.rVal" name="size-radio" label="1">选项1</vxe-radio>
        <vxe-radio v-model="formData.rVal" name="size-radio" label="2">选项2</vxe-radio>
      </vxe-form-item>
      <vxe-form-item>
        <vxe-button type="submit" status="primary">查询</vxe-button>
        <vxe-button type="reset">重置</vxe-button>
      </vxe-form-item>
    </vxe-form>

    <vxe-toolbar size="small" export custom>
      <template v-slot:buttons>
        <vxe-input v-model="formData.name" placeholder="请输入名称" clearable></vxe-input>
        <vxe-button status="primary">查询</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      export-config
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

    <vxe-pager
      perfect
      size="small"
      :current-page.sync="tablePage.currentPage"
      :page-size.sync="tablePage.pageSize"
      :total="tablePage.total"
      :page-sizes="tablePage.pageSizes"
      :layouts="tablePage.layouts">
    </vxe-pager>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[4] }}</code>
      <code class="javascript">{{ demoCodes[5] }}</code>
    </pre>

    <p class="tip">设置大小为 mini，默认大小：Table 36px 、Button 28px、Input 28px、Checkbox 14px、Radio 14px</p>

    <vxe-form :data="formData" size="mini">
      <vxe-form-item title="输入框" field="iVal">
        <vxe-input v-model="formData.iVal" placeholder="请输入名称" clearable></vxe-input>
      </vxe-form-item>
      <vxe-form-item title="下拉框" field="sVal">
        <select v-model="formData.sVal" class="vxe-select">
          <option value="0"></option>
          <option value="1">女</option>
          <option value="2">男</option>
        </select>
      </vxe-form-item>
      <vxe-form-item title="复选框" field="cVal">
        <vxe-checkbox v-model="formData.cVal">选项1</vxe-checkbox>
        <vxe-checkbox :indeterminate="formData.ciVal">半选</vxe-checkbox>
      </vxe-form-item>
      <vxe-form-item title="单选框" field="rVal">
        <vxe-radio v-model="formData.rVal" name="size-radio" label="1">选项1</vxe-radio>
        <vxe-radio v-model="formData.rVal" name="size-radio" label="2">选项2</vxe-radio>
      </vxe-form-item>
      <vxe-form-item>
        <vxe-button type="submit" status="primary">查询</vxe-button>
        <vxe-button type="reset">重置</vxe-button>
      </vxe-form-item>
    </vxe-form>

    <vxe-toolbar size="mini" export custom>
      <template v-slot:buttons>
        <vxe-input v-model="formData.name" placeholder="请输入名称" clearable></vxe-input>
        <vxe-button status="primary">查询</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      export-config
      size="mini"
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
      :current-page.sync="tablePage.currentPage"
      :page-size.sync="tablePage.pageSize"
      :total="tablePage.total"
      :page-sizes="tablePage.pageSizes"
      :layouts="tablePage.layouts">
    </vxe-pager>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[6] }}</code>
      <code class="javascript">{{ demoCodes[7] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  data () {
    return {
      formData: {
        iVal: '',
        sVal: '',
        cVal: true,
        ciVal: true,
        rVal: '1'
      },
      tablePage: {
        total: 500,
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 15, 20, 50, 100],
        layouts: ['PrevJump', 'PrevPage', 'JumpNumber', 'NextPage', 'NextJump', 'FullJump', 'Sizes', 'Total']
      },
      tableData: [],
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
        export default {
          data () {
            return {
              tableData: []
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 3)
          }
        }
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
        export default {
          data () {
            return {
              tableData: []
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 3)
          }
        }
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
        export default {
          data () {
            return {
              tableData: []
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 3)
          }
        }
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
        export default {
          data () {
            return {
              tableData: []
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 3)
          }
        }
        `
      ]
    }
  },
  created () {
    this.tableData = window.MOCK_DATA_LIST.slice(0, 3)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
}
</script>
