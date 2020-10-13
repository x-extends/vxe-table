<template>
  <div>
    <h2>{{ $t('app.aside.nav.toolbar') }}</h2>
    <p class="tip">工具栏模块，需要与表格组合使用，查看 <router-link class="link" :to="{name: 'VXEAPI', params: {name: 'toolbar'}}">API</router-link>，可以通过 <router-link class="link" :to="{name: 'StartGlobal'}">setup</router-link> 设置全局参数</p>

    <p>
      <vxe-toolbar>
        <template v-slot:buttons>
          <vxe-button content="默认尺寸"></vxe-button>
          <vxe-button content="下拉按钮">
            <template v-slot:dropdowns>
              <vxe-button type="text" content="按钮1"></vxe-button>
              <vxe-button type="text" content="按钮2"></vxe-button>
              <vxe-button type="text" content="按钮3"></vxe-button>
            </template>
          </vxe-button>
        </template>
      </vxe-toolbar>
      <vxe-toolbar size="medium">
        <template v-slot:buttons>
          <vxe-button content="中等尺寸"></vxe-button>
          <vxe-button content="下拉按钮">
            <template v-slot:dropdowns>
              <vxe-button type="text" content="按钮1"></vxe-button>
              <vxe-button type="text" content="按钮2"></vxe-button>
              <vxe-button type="text" content="按钮3"></vxe-button>
            </template>
          </vxe-button>
        </template>
      </vxe-toolbar>
      <vxe-toolbar size="small">
        <template v-slot:buttons>
          <vxe-button content="小型尺寸"></vxe-button>
          <vxe-button content="下拉按钮">
            <template v-slot:dropdowns>
              <vxe-button type="text" content="按钮1"></vxe-button>
              <vxe-button type="text" content="按钮2"></vxe-button>
              <vxe-button type="text" content="按钮3"></vxe-button>
            </template>
          </vxe-button>
        </template>
      </vxe-toolbar>
      <vxe-toolbar size="mini">
        <template v-slot:buttons>
          <vxe-button content="超小尺寸"></vxe-button>
          <vxe-button content="下拉按钮">
            <template v-slot:dropdowns>
              <vxe-button type="text" content="按钮1"></vxe-button>
              <vxe-button type="text" content="按钮2"></vxe-button>
              <vxe-button type="text" content="按钮3"></vxe-button>
            </template>
          </vxe-button>
        </template>
      </vxe-toolbar>
    </p>

    <p>
      <vxe-toolbar perfect>
        <template v-slot:buttons>
          <vxe-button type="text" icon="fa fa-plus" content="新增"></vxe-button>
          <vxe-button type="text" icon="fa fa-trash-o" content="删除"></vxe-button>
          <vxe-button type="text" icon="fa fa-save" content="保存"></vxe-button>
        </template>
      </vxe-toolbar>

      <vxe-toolbar perfect>
        <template v-slot:buttons>
          <vxe-button icon="fa fa-plus" status="perfect" content="新增"></vxe-button>
          <vxe-button icon="fa fa-trash-o" status="perfect" content="删除"></vxe-button>
          <vxe-button icon="fa fa-save" status="perfect" content="保存"></vxe-button>
        </template>
      </vxe-toolbar>

      <vxe-toolbar ref="xToolbar" custom>
        <template v-slot:buttons>
          <vxe-button content="自定义模板"></vxe-button>
          <vxe-button content="按钮2"></vxe-button>
          <vxe-button content="按钮3"></vxe-button>
          <vxe-button content="下拉按钮">
            <template v-slot:dropdowns>
              <vxe-button content="按钮1"></vxe-button>
              <vxe-button content="按钮2"></vxe-button>
              <vxe-button content="按钮3"></vxe-button>
            </template>
          </vxe-button>
        </template>
        <template v-slot:tools>
          <vxe-button type="text" icon="vxe-icon--question" class="tool-btn"></vxe-button>
          <vxe-button type="text" icon="vxe-icon--funnel" class="tool-btn"></vxe-button>
        </template>
      </vxe-toolbar>

      <vxe-table ref="xTable" :data="tableData">
        <vxe-table-column field="name" title="Name"></vxe-table-column>
        <vxe-table-column field="role" title="Role"></vxe-table-column>
        <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      </vxe-table>
    </p>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="html">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
      <pre-code class="css">{{ demoCodes[2] }}</pre-code>
    </pre>
  </div>
</template>

<script>
export default {
  data  () {
    return {
      loading: false,
      tableData: [
        { name: 'Test1', role: '前端', sex: '男' },
        { name: 'Test2', role: '后端', sex: '男' },
        { name: 'Test3', role: '测试', sex: '男' },
        { name: 'Test4', role: '设计师', sex: '女' }
      ],
      demoCodes: [
        `
        <p>
          <vxe-toolbar>
            <template v-slot:buttons>
              <vxe-button content="默认尺寸"></vxe-button>
              <vxe-button content="下拉按钮">
                <template v-slot:dropdowns>
                  <vxe-button type="text" content="按钮1"></vxe-button>
                  <vxe-button type="text" content="按钮2"></vxe-button>
                  <vxe-button type="text" content="按钮3"></vxe-button>
                </template>
              </vxe-button>
            </template>
          </vxe-toolbar>
          <vxe-toolbar size="medium">
            <template v-slot:buttons>
              <vxe-button content="中等尺寸"></vxe-button>
              <vxe-button content="下拉按钮">
                <template v-slot:dropdowns>
                  <vxe-button type="text" content="按钮1"></vxe-button>
                  <vxe-button type="text" content="按钮2"></vxe-button>
                  <vxe-button type="text" content="按钮3"></vxe-button>
                </template>
              </vxe-button>
            </template>
          </vxe-toolbar>
          <vxe-toolbar size="small">
            <template v-slot:buttons>
              <vxe-button content="小型尺寸"></vxe-button>
              <vxe-button content="下拉按钮">
                <template v-slot:dropdowns>
                  <vxe-button type="text" content="按钮1"></vxe-button>
                  <vxe-button type="text" content="按钮2"></vxe-button>
                  <vxe-button type="text" content="按钮3"></vxe-button>
                </template>
              </vxe-button>
            </template>
          </vxe-toolbar>
          <vxe-toolbar size="mini">
            <template v-slot:buttons>
              <vxe-button content="超小尺寸"></vxe-button>
              <vxe-button content="下拉按钮">
                <template v-slot:dropdowns>
                  <vxe-button type="text" content="按钮1"></vxe-button>
                  <vxe-button type="text" content="按钮2"></vxe-button>
                  <vxe-button type="text" content="按钮3"></vxe-button>
                </template>
              </vxe-button>
            </template>
          </vxe-toolbar>
        </p>

        <p>
          <vxe-toolbar perfect>
            <template v-slot:buttons>
              <vxe-button type="text" icon="fa fa-plus" content="新增"></vxe-button>
              <vxe-button type="text" icon="fa fa-trash-o" content="删除"></vxe-button>
              <vxe-button type="text" icon="fa fa-save" content="保存"></vxe-button>
            </template>
          </vxe-toolbar>

          <vxe-toolbar perfect>
            <template v-slot:buttons>
              <vxe-button icon="fa fa-plus" status="perfect" content="新增"></vxe-button>
              <vxe-button icon="fa fa-trash-o" status="perfect" content="删除"></vxe-button>
              <vxe-button icon="fa fa-save" status="perfect" content="保存"></vxe-button>
            </template>
          </vxe-toolbar>

          <vxe-toolbar ref="xToolbar" custom>
            <template v-slot:buttons>
              <vxe-button content="自定义模板"></vxe-button>
              <vxe-button content="按钮2"></vxe-button>
              <vxe-button content="按钮3"></vxe-button>
              <vxe-button content="下拉按钮">
                <template v-slot:dropdowns>
                  <vxe-button content="按钮1"></vxe-button>
                  <vxe-button content="按钮2"></vxe-button>
                  <vxe-button content="按钮3"></vxe-button>
                </template>
              </vxe-button>
            </template>
            <template v-slot:tools>
              <vxe-button type="text" icon="vxe-icon--question" class="tool-btn"></vxe-button>
              <vxe-button type="text" icon="vxe-icon--funnel" class="tool-btn"></vxe-button>
            </template>
          </vxe-toolbar>

          <vxe-table ref="xTable" :data="tableData">
            <vxe-table-column field="name" title="Name"></vxe-table-column>
            <vxe-table-column field="role" title="Role"></vxe-table-column>
            <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          </vxe-table>
        </p>
        `,
        `
        export default {
          data () {
            return {
              loading: false,
              tableData: [
                { name: 'Test1', role: '前端', sex: '男' },
                { name: 'Test2', role: '后端', sex: '男' },
                { name: 'Test3', role: '测试', sex: '男' },
                { name: 'Test4', role: '设计师', sex: '女' }
              ]
            }
          },
          created () {
            this.$nextTick(() => {
              // 将表格和工具栏进行关联
              const xTable = this.$refs.xTable
              xTable.connect(this.$refs.xToolbar)
            })
          }
        }
        `,
        `
        .tool-btn {
          font-size: 20px;
          cursor: pointer;
        }
        .tool-btn:hover {
          color: #409eff;
        }
        `
      ]
    }
  },
  created () {
    this.$nextTick(() => {
      // 将表格和工具栏进行关联
      const xTable = this.$refs.xTable
      xTable.connect(this.$refs.xToolbar)
    })
  }
}
</script>

<style scoped>
.tool-btn {
  font-size: 20px;
  cursor: pointer;
}
.tool-btn:hover {
  color: #409eff;
}
</style>
