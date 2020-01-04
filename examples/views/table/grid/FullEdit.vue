<template>
  <div>
    <p class="tip">
      查询代理<a class="link" href="https://github.com/xuliangzhan/vxe-table-demo/tree/master/vxe-table-by-vue-grid-proxy">（配置式代理项目示例）</a>、服务端排序代理、服务端筛选代理、分页代理、增删改查<br>
      对于分页场景下，如果想要保留选中状态，可以通过设置 <table-api-link prop="checkbox-config"/> 的 <table-api-link prop="reserve"/> 属性<br>
      还可以通过 <toolbar-api-link prop="checkMethod"/> 设置个性化列禁止勾选<br>
      由 <grid-api-link name="vxe-grid"/> 代理数据转换，只需要配置好数据源即可；非常简单就可以渲染一个表格，从重复写冗余的代码中解放出来
    </p>

    <vxe-grid
      border
      resizable
      highlight-hover-row
      import-config
      export-config
      form-config
      ref="xGrid"
      height="530"
      row-id="id"
      :sort-config="{trigger: 'cell'}"
      :filter-config="{remote: true}"
      :pager-config="tablePage"
      :toolbar="tableToolbar"
      :proxy-config="tableProxy"
      :columns="tableColumn"
      :checkbox-config="{labelField: 'id', reserve: true, highlight: true, range: true}"
      :edit-rules="validRules"
      :edit-config="{trigger: 'click', mode: 'row', showStatus: true}">

      <template v-slot:form>
        <form class="form-row" v-on:submit.prevent="$refs.xGrid.commitProxy('reload')">
          <div class="form-item">
            <div class="title">Name:</div>
            <div class="content">
              <input name="name" v-model="formData.name" placeholder="Please enter a user name">
            </div>
          </div>
          <div class="form-item">
            <div class="title">Nickname:</div>
            <div class="content">
              <input name="nickname" v-model="formData.nickname" placeholder="Please enter a user nickname">
            </div>
          </div>
          <div class="form-item">
            <div class="title">Sex:</div>
            <div class="content">
              <select name="sex" v-model="formData.sex">
                <option v-for="(item, index) in sexList" :key="index" :value="item.value">{{ item.label }}</option>
              </select>
            </div>
          </div>
          <div class="form-item">
            <div class="title">Role:</div>
            <div class="content">
              <input name="role" v-model="formData.role" placeholder="Please enter a user role">
            </div>
          </div>
          <div class="form-item">
            <div class="content">
              <button>查询</button>
            </div>
          </div>
        </form>
      </template>

      <template v-slot:empty>
        <span style="color: red;">
          <img src="static/other/img1.gif">
          <p>莫慌！没数据了而已！</p>
        </span>
      </template>
    </vxe-grid>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
      <code class="css">{{ demoCodes[2] }}</code>
    </pre>
  </div>
</template>

<script>
import XEAjax from 'xe-ajax'
import hljs from 'highlight.js'

export default {
  data () {
    return {
      sexList: [],
      formData: {
        name: '',
        nickname: '',
        sex: '',
        role: ''
      },
      validRules: {
        name: [
          { required: true, message: '名称必须填写' },
          { min: 3, max: 50, message: '名称长度在 3 到 50 个字符' }
        ],
        role: [
          { required: true, message: '角色必须填写' }
        ]
      },
      tablePage: {
        pageSize: 15,
        pageSizes: [5, 15, 20, 50, 100, 200, 500, 1000]
      },
      tableProxy: {
        seq: true, // 启用动态序号代理
        sort: true, // 启用排序代理
        filter: true, // 启用筛选代理
        ajax: {
          // 任何支持 Promise API 的库都可以对接（fetch、jquery、axios、xe-ajax）
          query: ({ page, sort, filters }) => {
            // 处理排序条件
            let queryParams = Object.assign({
              sort: sort.property,
              order: sort.order
            }, this.formData)
            // 处理筛选条件
            filters.forEach(({ column, property, values }) => {
              queryParams[property] = values.join(',')
            })
            return XEAjax.get(`/api/user/page/list/${page.pageSize}/${page.currentPage}`, queryParams)
          },
          delete: ({ body }) => XEAjax.post('/api/user/save', body),
          save: ({ body }) => XEAjax.post('/api/user/save', body)
        }
      },
      tableToolbar: {
        id: 'full_edit_1',
        buttons: [
          { code: 'insert_actived', name: '新增', icon: 'fa fa-plus', disabled: false },
          {
            code: 'mark_cancel',
            name: 'app.body.button.markCancel',
            icon: 'fa fa-bookmark-o',
            disabled: false,
            dropdowns: [
              { code: 'delete_selection', icon: 'fa fa-trash-o', name: 'app.body.button.deleteSelectedRecords', disabled: false },
              { code: 'remove_selection', icon: 'fa fa-remove', name: '移除数据', disabled: false }
            ]
          },
          { code: 'save', name: 'app.body.button.save', icon: 'fa fa-save', disabled: false }
        ],
        refresh: true,
        import: true,
        export: true,
        zoom: true,
        resizable: {
          storage: true
        },
        custom: {
          storage: true,
          checkMethod: this.checkColumnMethod
        }
      },
      tableColumn: [
        { type: 'checkbox', title: 'ID', width: 120 },
        { field: 'name', title: 'Name', remoteSort: true, editRender: { name: 'input' } },
        { field: 'nickname', title: 'Nickname', editRender: { name: 'input' } },
        { field: 'sex', title: 'Sex', editRender: { name: 'select', options: [] } },
        {
          field: 'role',
          title: 'Role',
          remoteSort: true,
          width: 200,
          filters: [
            { label: '前端开发', value: '前端' },
            { label: '后端开发', value: '后端' },
            { label: '测试', value: '测试' },
            { label: '程序员鼓励师', value: '程序员鼓励师' }
          ],
          filterMultiple: false,
          editRender: { name: 'input' }
        },
        { field: 'describe', title: 'Describe', showOverflow: true, editRender: { name: 'input' } }
      ],
      demoCodes: [
        `
        <vxe-grid
          border
          resizable
          highlight-hover-row
          import-config
          export-config
          form-config
          ref="xGrid"
          height="530"
          row-id="id"
          :sort-config="{trigger: 'cell'}"
          :filter-config="{remote: true}"
          :pager-config="tablePage"
          :toolbar="tableToolbar"
          :proxy-config="tableProxy"
          :columns="tableColumn"
          :checkbox-config="{labelField: 'id', reserve: true, highlight: true, range: true}"
          :edit-rules="validRules"
          :edit-config="{trigger: 'click', mode: 'row', showStatus: true}">

          <template v-slot:form>
            <form class="form-row" v-on:submit.prevent="$refs.xGrid.commitProxy('reload')">
              <div class="form-item">
                <div class="title">Name:</div>
                <div class="content">
                  <input name="name" v-model="formData.name" placeholder="Please enter a user name">
                </div>
              </div>
              <div class="form-item">
                <div class="title">Nickname:</div>
                <div class="content">
                  <input name="nickname" v-model="formData.nickname" placeholder="Please enter a user nickname">
                </div>
              </div>
              <div class="form-item">
                <div class="title">Sex:</div>
                <div class="content">
                  <select name="sex" v-model="formData.sex">
                    <option v-for="(item, index) in sexList" :key="index" :value="item.value">{{ item.label }}</option>
                  </select>
                </div>
              </div>
              <div class="form-item">
                <div class="title">Role:</div>
                <div class="content">
                  <input name="role" v-model="formData.role" placeholder="Please enter a user role">
                </div>
              </div>
              <div class="form-item">
                <div class="content">
                  <button>查询</button>
                </div>
              </div>
            </form>
          </template>

          <template v-slot:empty>
            <span style="color: red;">
              <img src="static/other/img1.gif">
              <p>莫慌！没数据了而已！</p>
            </span>
          </template>
        </vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              sexList: [],
              formData: {
                name: '',
                nickname: '',
                sex: '',
                role: ''
              },
              validRules: {
                name: [
                  { required: true, message: '名称必须填写' },
                  { min: 3, max: 50, message: '名称长度在 3 到 50 个字符' }
                ],
                role: [
                  { required: true, message: '角色必须填写' }
                ]
              },
              tablePage: {
                pageSize: 15,
                pageSizes: [5, 15, 20, 50, 100, 200, 500, 1000]
              },
              tableProxy: {
                seq: true, // 启用动态序号代理
                sort: true, // 启用排序代理
                filter: true, // 启用筛选代理
                ajax: {
                  // 任何支持 Promise API 的库都可以对接（fetch、jquery、axios、xe-ajax）
                  query: ({ page, sort, filters }) => {
                    // 处理排序条件
                    let queryParams = Object.assign({
                      sort: sort.property,
                      order: sort.order
                    }, this.formData)
                    // 处理筛选条件
                    filters.forEach(({ column, property, values }) => {
                      queryParams[property] = values.join(',')
                    })
                    return XEAjax.get(\`/api/user/page/list/\${page.pageSize}/\${page.currentPage}\`, queryParams)
                  },
                  delete: ({ body }) => XEAjax.post('/api/user/save', body),
                  save: ({ body }) => XEAjax.post('/api/user/save', body)
                }
              },
              tableToolbar: {
                id: 'full_edit_1',
                buttons: [
                  { code: 'insert_actived', name: '新增', icon: 'fa fa-plus', disabled: false },
                  {
                    code: 'mark_cancel',
                    name: 'app.body.button.markCancel',
                    icon: 'fa fa-bookmark-o',
                    disabled: false,
                    dropdowns: [
                      { code: 'delete_selection', icon: 'fa fa-trash-o', name: 'app.body.button.deleteSelectedRecords', disabled: false },
                      { code: 'remove_selection', icon: 'fa fa-remove', name: '移除数据', disabled: false }
                    ]
                  },
                  { code: 'save', name: 'app.body.button.save', icon: 'fa fa-save', disabled: false }
                ],
                refresh: true,
                import: true,
                export: true,
                zoom: true,
                resizable: {
                  storage: true
                },
                custom: {
                  storage: true,
                  checkMethod: this.checkColumnMethod
                }
              },
              tableColumn: [
                { type: 'checkbox', title: 'ID', width: 120 },
                { field: 'name', title: 'Name', remoteSort: true, editRender: { name: 'input' } },
                { field: 'nickname', title: 'Nickname', editRender: { name: 'input' } },
                { field: 'sex', title: 'Sex', editRender: { name: 'select', options: [] } },
                {
                  field: 'role',
                  title: 'Role',
                  remoteSort: true,
                  width: 200,
                  filters: [
                    { label: '前端开发', value: '前端' },
                    { label: '后端开发', value: '后端' },
                    { label: '测试', value: '测试' },
                    { label: '程序员鼓励师', value: '程序员鼓励师' }
                  ],
                  filterMultiple: false,
                  editRender: { name: 'input' }
                },
                { field: 'describe', title: 'Describe', showOverflow: true, editRender: { name: 'input' } }
              ]
            }
          },
          created () {
            this.findSexList()
          },
          methods: {
            async findSexList () {
              const sexList = await XEAjax.get('/api/conf/sex/list')
              // 异步更新下拉选项
              let column = this.$refs.xGrid.getColumnByField('sex')
              column.editRender.options = sexList
              this.sexList = sexList
            },
            checkColumnMethod ({ column }) {
              if (['nickname', 'role'].includes(column.property)) {
                return false
              }
              return true
            }
          }
        }
        `,
        `
        .form-row {
          display: flex;
          flex-direction: row;
        }
        .form-row .form-item {
          display: flex;
          flex-direction: row;
          align-items: center;
          height: 36px;
          padding-right: 10px;
        }
        .form-row .form-item > .title {
          padding-right: 10px;
        }
        .form-row .form-item > .content {
          width: 200px;
        }
        .form-row .form-item > .content input,
        .form-row .form-item > .content select {
          width: 100%;
        }
        `
      ]
    }
  },
  created () {
    this.findSexList()
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    async findSexList () {
      const sexList = await XEAjax.get('/api/conf/sex/list')
      // 异步更新下拉选项
      let column = this.$refs.xGrid.getColumnByField('sex')
      column.editRender.options = sexList
      this.sexList = sexList
    },
    checkColumnMethod ({ column }) {
      if (['nickname', 'role'].includes(column.property)) {
        return false
      }
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
.form-row {
  display: flex;
  flex-direction: row;
}
.form-row .form-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 36px;
  padding-right: 10px;
}
.form-row .form-item > .title {
  padding-right: 10px;
}
.form-row .form-item > .content {
  width: 200px;
}
.form-row .form-item > .content input,
.form-row .form-item > .content select {
  width: 100%;
}
</style>
