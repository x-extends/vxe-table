<template>
  <div>
    <h2>{{ $t('app.aside.nav.toolbar') }}</h2>
    <p class="tip">工具栏模块，与表格组合使用，通过调用 connect() 方法与表格建立连接</p>

    <p>
      <vxe-toolbar>
        <template #buttons>
          <vxe-button content="默认尺寸"></vxe-button>
          <vxe-button content="下拉按钮">
            <template #dropdowns>
              <vxe-button type="text" content="按钮1"></vxe-button>
              <vxe-button type="text" content="按钮2"></vxe-button>
              <vxe-button type="text" content="按钮3"></vxe-button>
            </template>
          </vxe-button>
        </template>
      </vxe-toolbar>
      <vxe-toolbar size="medium">
        <template #buttons>
          <vxe-button content="中等尺寸">中等尺寸</vxe-button>
          <vxe-button content="下拉按钮">
            <template #dropdowns>
              <vxe-button type="text" content="按钮1"></vxe-button>
              <vxe-button type="text" content="按钮2"></vxe-button>
              <vxe-button type="text" content="按钮3"></vxe-button>
            </template>
          </vxe-button>
        </template>
      </vxe-toolbar>
      <vxe-toolbar size="small">
        <template #buttons>
          <vxe-button content="小型尺寸">小型尺寸</vxe-button>
          <vxe-button content="下拉按钮">
            <template #dropdowns>
              <vxe-button type="text" content="按钮1"></vxe-button>
              <vxe-button type="text" content="按钮2"></vxe-button>
              <vxe-button type="text" content="按钮3"></vxe-button>
            </template>
          </vxe-button>
        </template>
      </vxe-toolbar>
      <vxe-toolbar size="mini">
        <template #buttons>
          <vxe-button content="超小尺寸"></vxe-button>
          <vxe-button content="下拉按钮">
            <template #dropdowns>
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
        <template #buttons>
          <vxe-button type="text" icon="fa fa-plus" content="新增"></vxe-button>
          <vxe-button type="text" icon="fa fa-trash-o" content="删除"></vxe-button>
          <vxe-button type="text" icon="fa fa-save" content="保存"></vxe-button>
        </template>
      </vxe-toolbar>

      <vxe-toolbar perfect>
        <template #buttons>
          <vxe-button icon="fa fa-plus" status="perfect" content="新增"></vxe-button>
          <vxe-button icon="fa fa-trash-o" status="perfect" content="删除"></vxe-button>
          <vxe-button icon="fa fa-save" status="perfect" content="保存"></vxe-button>
        </template>
      </vxe-toolbar>

      <vxe-toolbar ref="xToolbar" custom>
        <template #buttons>
          <vxe-button content="自定义模板"></vxe-button>
          <vxe-button content="按钮2"></vxe-button>
          <vxe-button content="按钮3"></vxe-button>
          <vxe-button content="下拉按钮">
            <template #dropdowns>
              <vxe-button content="按钮1"></vxe-button>
              <vxe-button content="按钮2"></vxe-button>
              <vxe-button content="按钮3"></vxe-button>
            </template>
          </vxe-button>
        </template>
        <template #tools>
          <vxe-button type="text" icon="vxe-icon--question" class="tool-btn"></vxe-button>
          <vxe-button type="text" icon="vxe-icon--funnel" class="tool-btn" @click="funnelEvent"></vxe-button>
        </template>
      </vxe-toolbar>

      <vxe-table ref="xTable" :data="demo1.tableData">
        <vxe-table-column field="name" title="Name"></vxe-table-column>
        <vxe-table-column field="role" title="Role"></vxe-table-column>
        <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      </vxe-table>
    </p>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="html">{{ demoCodes[0] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
      <pre-code class="css">{{ demoCodes[2] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, nextTick } from 'vue'
import { VXETable } from '../../../packages/all'
import { VxeTableInstance, VxeToolbarInstance } from '../../../types/index'

export default defineComponent({
  setup  () {
    const demo1 = reactive({
      tableData: [
        { name: 'Test1', role: '前端', sex: '男' },
        { name: 'Test2', role: '后端', sex: '男' },
        { name: 'Test3', role: '测试', sex: '男' },
        { name: 'Test4', role: '设计师', sex: '女' }
      ]
    })

    const xTable = ref({} as VxeTableInstance)
    const xToolbar = ref({} as VxeToolbarInstance)

    const funnelEvent = () => {
      VXETable.modal.alert({ content: '点击事件' })
    }

    nextTick(() => {
      // 将表格和工具栏进行关联
      const $table = xTable.value
      const $toolbar = xToolbar.value
      $table.connect($toolbar)
    })

    return {
      demo1,
      xTable,
      xToolbar,
      funnelEvent,
      demoCodes: [
        `
        <p>
          <vxe-toolbar>
            <template #buttons>
              <vxe-button content="默认尺寸"></vxe-button>
              <vxe-button content="下拉按钮">
                <template #dropdowns>
                  <vxe-button type="text" content="按钮1"></vxe-button>
                  <vxe-button type="text" content="按钮2"></vxe-button>
                  <vxe-button type="text" content="按钮3"></vxe-button>
                </template>
              </vxe-button>
            </template>
          </vxe-toolbar>
          <vxe-toolbar size="medium">
            <template #buttons>
              <vxe-button content="中等尺寸">中等尺寸</vxe-button>
              <vxe-button content="下拉按钮">
                <template #dropdowns>
                  <vxe-button type="text" content="按钮1"></vxe-button>
                  <vxe-button type="text" content="按钮2"></vxe-button>
                  <vxe-button type="text" content="按钮3"></vxe-button>
                </template>
              </vxe-button>
            </template>
          </vxe-toolbar>
          <vxe-toolbar size="small">
            <template #buttons>
              <vxe-button content="小型尺寸">小型尺寸</vxe-button>
              <vxe-button content="下拉按钮">
                <template #dropdowns>
                  <vxe-button type="text" content="按钮1"></vxe-button>
                  <vxe-button type="text" content="按钮2"></vxe-button>
                  <vxe-button type="text" content="按钮3"></vxe-button>
                </template>
              </vxe-button>
            </template>
          </vxe-toolbar>
          <vxe-toolbar size="mini">
            <template #buttons>
              <vxe-button content="超小尺寸"></vxe-button>
              <vxe-button content="下拉按钮">
                <template #dropdowns>
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
            <template #buttons>
              <vxe-button type="text" icon="fa fa-plus" content="新增"></vxe-button>
              <vxe-button type="text" icon="fa fa-trash-o" content="删除"></vxe-button>
              <vxe-button type="text" icon="fa fa-save" content="保存"></vxe-button>
            </template>
          </vxe-toolbar>

          <vxe-toolbar perfect>
            <template #buttons>
              <vxe-button icon="fa fa-plus" status="perfect" content="新增"></vxe-button>
              <vxe-button icon="fa fa-trash-o" status="perfect" content="删除"></vxe-button>
              <vxe-button icon="fa fa-save" status="perfect" content="保存"></vxe-button>
            </template>
          </vxe-toolbar>

          <vxe-toolbar ref="xToolbar" custom>
            <template #buttons>
              <vxe-button content="自定义模板"></vxe-button>
              <vxe-button content="按钮2"></vxe-button>
              <vxe-button content="按钮3"></vxe-button>
              <vxe-button content="下拉按钮">
                <template #dropdowns>
                  <vxe-button content="按钮1"></vxe-button>
                  <vxe-button content="按钮2"></vxe-button>
                  <vxe-button content="按钮3"></vxe-button>
                </template>
              </vxe-button>
            </template>
            <template #tools>
              <vxe-button type="text" icon="vxe-icon--question" class="tool-btn"></vxe-button>
              <vxe-button type="text" icon="vxe-icon--funnel" class="tool-btn" @click="funnelEvent"></vxe-button>
            </template>
          </vxe-toolbar>

          <vxe-table ref="xTable" :data="demo1.tableData">
            <vxe-table-column field="name" title="Name"></vxe-table-column>
            <vxe-table-column field="role" title="Role"></vxe-table-column>
            <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          </vxe-table>
        </p>
        `,
        `
        import { defineComponent, ref, reactive, nextTick } from 'vue'
        import { VXETable, VxeTableInstance, VxeToolbarInstance } from 'vxe-table'

        export default defineComponent({
          setup  () {
            const demo1 = reactive({
              tableData: [
                { name: 'Test1', role: '前端', sex: '男' },
                { name: 'Test2', role: '后端', sex: '男' },
                { name: 'Test3', role: '测试', sex: '男' },
                { name: 'Test4', role: '设计师', sex: '女' }
              ]
            })

            const xTable = ref({} as VxeTableInstance)
            const xToolbar = ref({} as VxeToolbarInstance)

            const funnelEvent = () => {
              VXETable.modal.alert({ content: '点击事件' })
            }

            nextTick(() => {
              // 将表格和工具栏进行关联
              const $table = xTable.value
              const $toolbar = xToolbar.value
              $table.connect($toolbar)
            })

            return {
              demo1,
              xTable,
              xToolbar,
              funnelEvent
            }
          }
        })
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
  }
})
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
