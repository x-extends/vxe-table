<template>
  <div>
    <h2>模态窗口</h2>
    <p class="tip">查看 <router-link class="link" :to="{name: 'VXEAPI', params: {name: 'modal'}}">API</router-link></p>

    <p>
      <vxe-button @click="$XModal.message({ message: '消息提示' })">消息提示框</vxe-button>
      <vxe-button @click="$XModal.message({ message: '成功消息提示', status: 'success' })">成功消息提示框</vxe-button>
      <vxe-button @click="$XModal.message({ message: '失败消息提示', status: 'error' })">失败消息提示框</vxe-button>
      <vxe-button @click="$XModal.message({ message: '不允许重复点击', id: 'unique1' })">不允许重复点击</vxe-button>
    </p>

    <p>
      <vxe-button @click="$XModal.alert('基本提示框', '标题1')">基本提示框</vxe-button>
      <vxe-button @click="$XModal.alert({ message: '成功提示框', status: 'success' })">成功提示框</vxe-button>
      <vxe-button @click="$XModal.alert({ message: '失败提示框', title: 'app.body.msg.error', status: 'error' })">失败提示框</vxe-button>
      <vxe-button @click="$XModal.confirm('您确定要删除吗？')">确认提示框</vxe-button>
    </p>

    <p>
      <vxe-button @click="$XModal.alert({ message: '点击遮罩层可以关闭', maskClosable: true })">点击遮罩层可以关闭</vxe-button>
      <vxe-button @click="$XModal.alert({ message: '按 Esc 键可以关闭', escClosable: true })">按 Esc 键可以关闭</vxe-button>
      <vxe-button @click="$XModal.alert({ message: '锁界面不要遮罩层', mask: false })">锁界面不要遮罩层</vxe-button>
      <vxe-button @click="$XModal.alert({ message: '不锁界面不要遮罩层', lockView: false, mask: false })">不锁界面不要遮罩层</vxe-button>
    </p>

    <p>
      <vxe-button @click="value1 = !value1">基本窗口</vxe-button>
      <vxe-modal v-model="value1" :lock-scroll="false" show-footer>
        <template>
          <vxe-table
            show-overflow
            height="auto"
            :sync-resize="value1"
            :data="tableData">
            <vxe-table-column type="index" width="60"></vxe-table-column>
            <vxe-table-column field="name" title="app.body.label.name"></vxe-table-column>
            <vxe-table-column field="sex" title="app.body.label.sex"></vxe-table-column>
            <vxe-table-column field="age" title="app.body.label.age"></vxe-table-column>
          </vxe-table>
        </template>
      </vxe-modal>

      <vxe-button @click="value2 = !value2">拖动窗口调整大小</vxe-button>
      <vxe-modal v-model="value2" resize>
        <template>
          <p style="color: red">按住头部移动！！！！！！！！！！！！！！！</p>
          <p style="color: blue">按住左边距拖动！！！！！！！！！！！！！！！</p>
          <p style="color: red">按住右边距拖动！！！！！！！！！！！！！！！</p>
          <p style="color: blue">按住底边距拖动！！！！！！！！！！！！！！！</p>
          <p style="color: blue">按住左下角拖动 ！！！！！！！！！！！！！！！</p>
          <p style="color: blue">按住右下角拖动！！！！！！！！！！！！！！！</p>
        </template>
      </vxe-modal>

      <vxe-button @click="value3 = !value3">缩放表格的窗口</vxe-button>
      <vxe-modal v-model="value3" title="缩放表格的窗口" width="800" height="400" resize>
        <template>
          <vxe-table
            border
            resizable
            show-overflow
            auto-resize
            height="auto"
            :sync-resize="value3"
            :data="tableData">
            <vxe-table-column type="index" width="60"></vxe-table-column>
            <vxe-table-column field="name" title="app.body.label.name"></vxe-table-column>
            <vxe-table-column field="sex" title="app.body.label.sex"></vxe-table-column>
            <vxe-table-column field="age" title="app.body.label.age"></vxe-table-column>
          </vxe-table>
        </template>
      </vxe-modal>

      <vxe-button @click="value4 = !value4">完整功能的窗口</vxe-button>
      <vxe-modal v-model="value4" width="800" height="400" min-width="400" min-height="320" resize>
        <template v-slot:title>
          <span style="color: red;">完整功能的窗口</span>
        </template>
        <template>
          <vxe-grid
            border
            resizable
            show-overflow
            auto-resize
            height="auto"
            :sync-resize="value4"
            :pager-config="tablePage"
            :proxy-config="tableProxy"
            :columns="tableColumn"
            :toolbar="tableToolbar"></vxe-grid>
        </template>
      </vxe-modal>
    </p>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="html">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  data  () {
    return {
      value1: false,
      value2: false,
      value3: false,
      value4: false,
      tablePage: {
        pageSize: 10
      },
      tableProxy: {
        props: {
          result: 'data.result',
          total: 'data.page.total'
        },
        ajax: {
          query: ({ page }) => this.$ajax.doGet(`/api/user/page/list/${page.pageSize}/${page.currentPage}`)
        }
      },
      tableToolbar: {
        buttons: [
          { code: 'myBtn1', name: '按钮1' },
          { code: 'myBtn2', name: '按钮2' }
        ],
        refresh: true,
        setting: true
      },
      tableColumn: [
        { type: 'checkbox', width: 50 },
        { type: 'index', width: 60 },
        { field: 'name', title: 'Name' },
        { field: 'nickname', title: 'Nickname' },
        {
          field: 'role',
          title: 'Role',
          filters: [
            {
              label: '前端',
              value: '前端'
            },
            {
              label: '后端',
              value: '后端'
            }
          ]
        },
        { field: 'describe', title: 'Describe' }
      ],
      demoCodes: [
        `
        <p>
          <vxe-button @click="$XModal.message({ message: '消息提示' })">消息提示框</vxe-button>
          <vxe-button @click="$XModal.message({ message: '成功消息提示', status: 'success' })">成功消息提示框</vxe-button>
          <vxe-button @click="$XModal.message({ message: '失败消息提示', status: 'error' })">失败消息提示框</vxe-button>
          <vxe-button @click="$XModal.message({ message: '不允许重复点击', id: 'unique1' })">不允许重复点击</vxe-button>
        </p>

        <p>
          <vxe-button @click="$XModal.alert('基本提示框', '标题1')">基本提示框</vxe-button>
          <vxe-button @click="$XModal.alert({ message: '成功提示框', status: 'success' })">成功提示框</vxe-button>
          <vxe-button @click="$XModal.alert({ message: '失败提示框', title: 'app.body.msg.error', status: 'error' })">失败提示框</vxe-button>
          <vxe-button @click="$XModal.confirm('您确定要删除吗？')">确认提示框</vxe-button>
        </p>

        <p>
          <vxe-button @click="$XModal.alert({ message: '点击遮罩层可以关闭', maskClosable: true })">点击遮罩层可以关闭</vxe-button>
          <vxe-button @click="$XModal.alert({ message: '按 Esc 键可以关闭', escClosable: true })">按 Esc 键可以关闭</vxe-button>
          <vxe-button @click="$XModal.alert({ message: '锁界面不要遮罩层', mask: false })">锁界面不要遮罩层</vxe-button>
          <vxe-button @click="$XModal.alert({ message: '不锁界面不要遮罩层', lockView: false, mask: false })">不锁界面不要遮罩层</vxe-button>
        </p>

        <p>
          <vxe-button @click="value1 = !value1">基本窗口</vxe-button>
          <vxe-modal v-model="value1" :lock-scroll="false" show-footer>
            <template>
              <vxe-table
                show-overflow
                height="auto"
                :sync-resize="value1"
                :data="tableData">
                <vxe-table-column type="index" width="60"></vxe-table-column>
                <vxe-table-column field="name" title="app.body.label.name"></vxe-table-column>
                <vxe-table-column field="sex" title="app.body.label.sex"></vxe-table-column>
                <vxe-table-column field="age" title="app.body.label.age"></vxe-table-column>
              </vxe-table>
            </template>
          </vxe-modal>

          <vxe-button @click="value2 = !value2">拖动窗口调整大小</vxe-button>
          <vxe-modal v-model="value2" resize>
            <template>
              <p style="color: red">按住头部移动！！！！！！！！！！！！！！！</p>
              <p style="color: blue">按住左边距拖动！！！！！！！！！！！！！！！</p>
              <p style="color: red">按住右边距拖动！！！！！！！！！！！！！！！</p>
              <p style="color: blue">按住底边距拖动！！！！！！！！！！！！！！！</p>
              <p style="color: blue">按住左下角拖动 ！！！！！！！！！！！！！！！</p>
              <p style="color: blue">按住右下角拖动！！！！！！！！！！！！！！！</p>
            </template>
          </vxe-modal>

          <vxe-button @click="value3 = !value3">缩放表格的窗口</vxe-button>
          <vxe-modal v-model="value3" title="缩放表格的窗口" width="800" height="400" resize>
            <template>
              <vxe-table
                border
                resizable
                show-overflow
                auto-resize
                height="auto"
                :sync-resize="value3"
                :data="tableData">
                <vxe-table-column type="index" width="60"></vxe-table-column>
                <vxe-table-column field="name" title="app.body.label.name"></vxe-table-column>
                <vxe-table-column field="sex" title="app.body.label.sex"></vxe-table-column>
                <vxe-table-column field="age" title="app.body.label.age"></vxe-table-column>
              </vxe-table>
            </template>
          </vxe-modal>

          <vxe-button @click="value4 = !value4">完整功能的窗口</vxe-button>
          <vxe-modal v-model="value4" title="完整功能的窗口" width="800" height="400" min-width="400" min-height="320" resize>
            <template v-slot:title>
              <span style="color: red;">完整功能的窗口</span>
            </template>
            <template>
              <vxe-grid
                border
                resizable
                show-overflow
                auto-resize
                height="auto"
                :sync-resize="value4"
                :pager-config="tablePage"
                :proxy-config="tableProxy"
                :columns="tableColumn"
                :toolbar="tableToolbar"></vxe-grid>
            </template>
          </vxe-modal>
        </p>
        `,
        `
        export default {
          data () {
            return {
              value1: false,
              value2: false,
              value3: false,
              value4: false,
              tablePage: {
                pageSize: 10
              },
              tableProxy: {
                props: {
                  result: 'data.result',
                  total: 'data.page.total'
                },
                ajax: {
                  query: ({ page }) => this.$ajax.doGet(\`/api/user/page/list/\${page.pageSize}/\${page.currentPage}\`)
                }
              },
              tableToolbar: {
                buttons: [
                  { code: 'myBtn1', name: '按钮1' },
                  { code: 'myBtn2', name: '按钮2' }
                ],
                refresh: true,
                setting: true
              },
              tableColumn: [
                { type: 'checkbox', width: 50 },
                { type: 'index', width: 60 },
                { field: 'name', title: 'Name' },
                { field: 'nickname', title: 'Nickname' },
                {
                  field: 'role',
                  title: 'Role',
                  filters: [
                    {
                      label: '前端',
                      value: '前端'
                    },
                    {
                      label: '后端',
                      value: '后端'
                    }
                  ]
                },
                { field: 'describe', title: 'Describe' }
              ]
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 8)
          }
        }
        `
      ]
    }
  },
  created () {
    this.tableData = window.MOCK_DATA_LIST.slice(0, 8)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
}
</script>
