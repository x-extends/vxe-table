<template>
  <div>
    <h2>{{ $t('app.aside.nav.modal') }}</h2>

    <p class="tip">
      轻提示框、提示框、弹出窗口，查看 <router-link class="link" :to="{name: 'VXEAPI', params: {name: 'modal'}}">API</router-link>，可以通过 <router-link class="link" :to="{name: 'StartGlobal'}">setup</router-link> 设置全局参数<br>
      对于某些场景如果需要动态创建的窗口，可以通过以下 API 全局调用：<br>
      打开窗口：<br>
      open(options: ModalOptions)<br>
      打开消息框：<br>
      message(options: ModalOptions)<br>
      message(content: string, title?: string)<br>
      打开提示框：<br>
      alert(options: ModalOptions) 打开提示框<br>
      alert(content: string, title?: string)<br>
      打开确认框：<br>
      confirm(options: ModalOptions) 打开确认框<br>
      confirm(content: string, title?: string)<br>
      手动关闭当前活动的窗口：<br>
      close(id?: string)<br>
      给 vue 实例挂载属性：<br>
      Vue.prototype.$XModal = VXETable.modal
    </p>

    <p>
      <vxe-button content="默认消息框" @click="$XModal.message({ content: '消息提示' })"></vxe-button>
      <vxe-button content="info" @click="$XModal.message({ content: 'info 消息提示', status: 'info' })"></vxe-button>
      <vxe-button content="warning" @click="$XModal.message({ content: 'warning 消息提示', status: 'warning' })"></vxe-button>
      <vxe-button content="question" @click="$XModal.message({ content: 'question 消息提示', status: 'question' })"></vxe-button>
      <vxe-button content="success" @click="$XModal.message({ content: 'success 消息提示', status: 'success' })"></vxe-button>
      <vxe-button content="error" @click="$XModal.message({ content: 'error 消息提示', status: 'error' })"></vxe-button>
      <vxe-button content="loading" @click="$XModal.message({ content: 'loading 消息提示', status: 'loading' })"></vxe-button>
      <vxe-button content="自定义图标" @click="$XModal.message({ content: 'iconStatus 自定义图标', status:'success', iconStatus: 'fa fa-thumbs-up' })"></vxe-button>
      <vxe-button content="不允许重复点击" @click="$XModal.message({ content: '不允许重复点击', id: 'unique1' })"></vxe-button>
    </p>

    <p>
      <vxe-button content="基本提示框" @click="$XModal.alert('基本提示框', '标题1')"></vxe-button>
      <vxe-button content="info" @click="$XModal.alert({ content: 'info 提示框', status: 'info' })"></vxe-button>
      <vxe-button content="warning" @click="$XModal.alert({ content: 'warning 提示框', status: 'warning' })"></vxe-button>
      <vxe-button content="question" @click="$XModal.alert({ content: 'question 提示框', status: 'question' })"></vxe-button>
      <vxe-button content="success" @click="$XModal.alert({ content: 'success 提示框', status: 'success' })"></vxe-button>
      <vxe-button content="error" @click="$XModal.alert({ content: 'error 提示框', title:'app.body.msg.error', status: 'error' })"></vxe-button>
      <vxe-button content="loading" @click="$XModal.alert({ content: 'loading 提示框', status: 'loading' })"></vxe-button>
      <vxe-button content="自定义图标" @click="$XModal.alert({ content: 'iconStatus 自定义图标', status:'error', iconStatus: 'fa fa-hand-peace-o' })"></vxe-button>
      <vxe-button content="禁止拖动" @click="$XModal.alert({ content: '禁止后，按住头部无法进行拖动', draggable: false })"></vxe-button>
      <vxe-button content="确认提示框" @click="confirmEvent"></vxe-button>
    </p>

    <p>
      <vxe-button @click="value1 = true">默认尺寸</vxe-button>
      <vxe-modal v-model="value1">
        <template #default>
          <div>默认尺寸</div>
          <div>xxxxxxxxx</div>
          <div>xxxxxxxxxx</div>
        </template>
      </vxe-modal>
      <vxe-button @click="value2 = true" size="medium">中等尺寸</vxe-button>
      <vxe-modal v-model="value2" size="medium">
        <template #default>
          <div>中等尺寸</div>
          <div>xxxxxxxxx</div>
          <div>xxxxxxxxxx</div>
        </template>
      </vxe-modal>
      <vxe-button @click="value3 = true" size="small">小型尺寸</vxe-button>
      <vxe-modal v-model="value3" size="small">
        <template #default>
          <div>小型尺寸</div>
          <div>xxxxxxxxx</div>
          <div>xxxxxxxxxx</div>
        </template>
      </vxe-modal>
      <vxe-button @click="value4 = true" size="mini">超小尺寸</vxe-button>
      <vxe-modal v-model="value4" size="mini">
        <template #default>
          <div>超小尺寸</div>
          <div>xxxxxxxxx</div>
          <div>xxxxxxxxxx</div>
        </template>
      </vxe-modal>
    </p>

    <p>
      <vxe-button content="点击遮罩层可以关闭" @click="$XModal.alert({ content: '点击遮罩层可以关闭', maskClosable: true })"></vxe-button>
      <vxe-button content="按 Escape 键可以关闭" @click="$XModal.alert({ content: '按 Escape 键可以关闭', escClosable: true })"></vxe-button>
      <vxe-button content="锁界面不要遮罩层" @click="$XModal.alert({ content: '锁界面不要遮罩层', mask: false })"></vxe-button>
      <vxe-button content="多窗口、叠加窗口" @click="$XModal.alert({ content: '多窗口、叠加窗口（一旦脱离当前实例，需要配合手动关闭）', lockView: false, mask: false })"></vxe-button>
      <vxe-button content="允许拖动范围超出屏幕" @click="$XModal.alert({ content: '允许拖动范围超出屏幕', marginSize: -500 })"></vxe-button>
    </p>

    <p>
      <vxe-button @click="value5 = true">基本窗口</vxe-button>
      <vxe-modal v-model="value5" width="600" show-footer>
        <template #default>
          <vxe-table
            show-overflow
            auto-resize
            height="300"
            :data="tableData">
            <vxe-column type="seq" width="60"></vxe-column>
            <vxe-column field="name" title="app.body.label.name"></vxe-column>
            <vxe-column field="sex" title="app.body.label.sex"></vxe-column>
            <vxe-column field="age" title="app.body.label.age"></vxe-column>
          </vxe-table>
        </template>
      </vxe-modal>

      <vxe-button @click="value6 = true">窗口初始位置</vxe-button>
      <vxe-modal v-model="value6" width="600" :position="{top: 200, left: 200}">
        <template #default>
          <vxe-table
            show-overflow
            auto-resize
            height="300"
            :data="tableData">
            <vxe-column type="seq" width="60"></vxe-column>
            <vxe-column field="name" title="app.body.label.name"></vxe-column>
            <vxe-column field="sex" title="app.body.label.sex"></vxe-column>
            <vxe-column field="age" title="app.body.label.age"></vxe-column>
          </vxe-table>
        </template>
      </vxe-modal>

      <vxe-button @click="value7 = true">拖动窗口调整大小</vxe-button>
      <vxe-modal v-model="value7" show-zoom resize>
        <template #default>
          <div style="color: red">按住头部移动！！！！！！！！！！！！！！！</div>
          <div style="color: blue">按住左边距拖动！！！！！！！！！！！！！！！</div>
          <div style="color: red">按住右边距拖动！！！！！！！！！！！！！！！</div>
          <div style="color: blue">按住底边距拖动！！！！！！！！！！！！！！！</div>
          <div style="color: blue">按住左下角拖动 ！！！！！！！！！！！！！！！</div>
          <div style="color: blue">按住右下角拖动！！！！！！！！！！！！！！！</div>
        </template>
      </vxe-modal>

      <vxe-button @click="value8 = true">记忆功能的窗口</vxe-button>
      <vxe-modal v-model="value8" title="记忆功能的窗口" width="600" height="400" show-zoom resize remember>
        <template #default>
          <vxe-form :data="formData3" :rules="formRules3" title-align="right" title-width="60">
            <vxe-form-item title="基本信息" span="24" title-align="left" title-width="200px" :title-prefix="{icon: 'fa fa-address-card-o'}"></vxe-form-item>
            <vxe-form-item title="名称" field="name" span="12" :item-render="{name: 'input', attrs: {placeholder: '请输入名称'}}"></vxe-form-item>
            <vxe-form-item title="昵称" field="nickname" span="12" :item-render="{name: 'input', attrs: {placeholder: '请输入昵称'}}"></vxe-form-item>
            <vxe-form-item title="性别" field="sex" span="12" :item-render="{name: '$select', options: sexList}"></vxe-form-item>
            <vxe-form-item title="年龄" field="age" span="12" :item-render="{name: 'input', attrs: {type: 'number', placeholder: '请输入年龄'}}"></vxe-form-item>
            <vxe-form-item title="其他信息" span="24" title-align="left" title-width="200px" :title-prefix="{icon: 'fa fa-info-circle'}"></vxe-form-item>
            <vxe-form-item title="地址" field="address" span="24" :item-render="{name: 'textarea', attrs: {placeholder: '请输入地址'}}"></vxe-form-item>
            <vxe-form-item align="center" span="24">
              <template #default>
                <vxe-button type="submit" status="primary">提交</vxe-button>
                <vxe-button type="reset">重置</vxe-button>
              </template>
            </vxe-form-item>
          </vxe-form>
        </template>
      </vxe-modal>

      <vxe-button @click="value9 = true">最大化显示</vxe-button>
      <vxe-modal v-model="value9" title="最大化显示" width="600" height="400" show-zoom resize remember fullscreen>
        <template #default>
          <div style="color: red">默认最大化显示</div>
          <div style="color: red">按住头部移动！！！！！！！！！！！！！！！</div>
          <div style="color: blue">按住左边距拖动！！！！！！！！！！！！！！！</div>
          <div style="color: red">按住右边距拖动！！！！！！！！！！！！！！！</div>
          <div style="color: blue">按住底边距拖动！！！！！！！！！！！！！！！</div>
          <div style="color: blue">按住左下角拖动 ！！！！！！！！！！！！！！！</div>
          <div style="color: blue">按住右下角拖动！！！！！！！！！！！！！！！</div>
        </template>
      </vxe-modal>

      <vxe-button @click="value10 = true">阻止关闭</vxe-button>
      <vxe-modal v-model="value10" title="阻止关闭" width="800" height="400" :before-hide-method="beforeHideMethod" show-zoom resize>
        <template #default>
          <vxe-table
            border
            resizable
            show-overflow
            auto-resize
            height="auto"
            :data="tableData">
            <vxe-column type="seq" width="60"></vxe-column>
            <vxe-column field="name" title="app.body.label.name"></vxe-column>
            <vxe-column field="sex" title="app.body.label.sex"></vxe-column>
            <vxe-column field="age" title="app.body.label.age"></vxe-column>
          </vxe-table>
        </template>
      </vxe-modal>

      <vxe-button @click="value11 = true">完整功能的窗口（移动、拖动、状态保存）</vxe-button>
      <vxe-modal v-model="value11" id="myModal6" width="800" height="400" min-width="460" min-height="320" show-zoom resize remember storage transfer>
        <template #title>
          <span style="color: red;">完整功能的窗口（移动、拖动、状态保存）</span>
          <span style="color: red;">通过设置 transfer 将弹框容器插入 body</span>
        </template>
        <template #default>
          <vxe-grid
            border
            resizable
            show-overflow
            auto-resize
            height="auto"
            :pager-config="tablePage"
            :proxy-config="tableProxy"
            :columns="tableColumn"
            :toolbar-config="tableToolbar"></vxe-grid>
        </template>
      </vxe-modal>
    </p>

    <pre>
      <pre-code>
        | Escape | 如果开启配置，则支持关闭窗口 |
      </pre-code>
    </pre>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="html">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script>
export default {
  data  () {
    return {
      value1: false,
      value2: false,
      value3: false,
      value4: false,
      value5: false,
      value6: false,
      value7: false,
      value8: false,
      value9: false,
      value10: false,
      value11: false,
      sexList: [
        { label: '', value: '' },
        { label: '女', value: '0' },
        { label: '男', value: '1' }
      ],
      formData3: {
        name: '',
        nickname: '',
        sex: '',
        age: 26,
        address: null
      },
      formRules3: {
        name: [
          { required: true, message: '请输入名称' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符' }
        ],
        nickname: [
          { required: true, message: '请输入昵称' }
        ],
        sex: [
          { required: true, message: '请选择性别' }
        ]
      },
      tablePage: {
        pageSize: 10
      },
      tableProxy: {
        props: {
          result: 'result',
          total: 'page.total'
        },
        ajax: {
          query: () => {
            return new Promise(resolve => {
              const list = [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'Shenzhen' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'Shenzhen' },
                { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'Shenzhen' },
                { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'Shenzhen' }
              ]
              resolve({
                result: list,
                page: {
                  total: 140
                }
              })
            })
          }
        }
      },
      tableToolbar: {
        buttons: [
          { code: 'myBtn1', name: '按钮1' },
          { code: 'myBtn2', name: '按钮2' }
        ],
        refresh: true,
        custom: true
      },
      tableColumn: [
        { type: 'checkbox', width: 50 },
        { type: 'seq', width: 60 },
        { field: 'name', title: 'Name' },
        { field: 'nickname', title: 'Nickname' },
        {
          field: 'role',
          title: 'Role',
          filters: [
            { label: '前端', value: '前端' },
            { label: '后端', value: '后端' },
            { label: '设计师', value: '设计师' },
            { label: '管理员', value: '管理员' },
            { label: '项目经理', value: '项目经理' },
            { label: '测试', value: '测试' },
            { label: '美工', value: '美工' },
            { label: '数据库', value: '数据库' }
          ]
        },
        { field: 'describe', title: 'Describe' }
      ],
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, address: 'test abc' },
        { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: '0', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: '1', age: 23, address: 'test abc' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: '1', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: '1', age: 21, address: 'test abc' }
      ],
      demoCodes: [
        `
        <p>
          <vxe-button content="默认消息框" @click="$XModal.message({ content: '消息提示' })"></vxe-button>
          <vxe-button content="info" @click="$XModal.message({ content: 'info 消息提示', status: 'info' })"></vxe-button>
          <vxe-button content="warning" @click="$XModal.message({ content: 'warning 消息提示', status: 'warning' })"></vxe-button>
          <vxe-button content="question" @click="$XModal.message({ content: 'question 消息提示', status: 'question' })"></vxe-button>
          <vxe-button content="success" @click="$XModal.message({ content: 'success 消息提示', status: 'success' })"></vxe-button>
          <vxe-button content="error" @click="$XModal.message({ content: 'error 消息提示', status: 'error' })"></vxe-button>
          <vxe-button content="loading" @click="$XModal.message({ content: 'loading 消息提示', status: 'loading' })"></vxe-button>
          <vxe-button content="自定义图标" @click="$XModal.message({ content: 'iconStatus 自定义图标', status:'success', iconStatus: 'fa fa-thumbs-up' })"></vxe-button>
          <vxe-button content="不允许重复点击" @click="$XModal.message({ content: '不允许重复点击', id: 'unique1' })"></vxe-button>
        </p>

        <p>
          <vxe-button content="基本提示框" @click="$XModal.alert('基本提示框', '标题1')"></vxe-button>
          <vxe-button content="info" @click="$XModal.alert({ content: 'info 提示框', status: 'info' })"></vxe-button>
          <vxe-button content="warning" @click="$XModal.alert({ content: 'warning 提示框', status: 'warning' })"></vxe-button>
          <vxe-button content="question" @click="$XModal.alert({ content: 'question 提示框', status: 'question' })"></vxe-button>
          <vxe-button content="success" @click="$XModal.alert({ content: 'success 提示框', status: 'success' })"></vxe-button>
          <vxe-button content="error" @click="$XModal.alert({ content: 'error 提示框', title:'app.body.msg.error', status: 'error' })"></vxe-button>
          <vxe-button content="loading" @click="$XModal.alert({ content: 'loading 提示框', status: 'loading' })"></vxe-button>
          <vxe-button content="自定义图标" @click="$XModal.alert({ content: 'iconStatus 自定义图标', status:'error', iconStatus: 'fa fa-hand-peace-o' })"></vxe-button>
          <vxe-button content="禁止拖动" @click="$XModal.alert({ content: '禁止后，按住头部无法进行拖动', draggable: false })"></vxe-button>
          <vxe-button content="确认提示框" @click="confirmEvent"></vxe-button>
        </p>

        <p>
          <vxe-button @click="value1 = true">默认尺寸</vxe-button>
          <vxe-modal v-model="value1">
            <template #default>
              <div>默认尺寸</div>
              <div>xxxxxxxxx</div>
              <div>xxxxxxxxxx</div>
            </template>
          </vxe-modal>
          <vxe-button @click="value2 = true" size="medium">中等尺寸</vxe-button>
          <vxe-modal v-model="value2" size="medium">
            <template #default>
              <div>中等尺寸</div>
              <div>xxxxxxxxx</div>
              <div>xxxxxxxxxx</div>
            </template>
          </vxe-modal>
          <vxe-button @click="value3 = true" size="small">小型尺寸</vxe-button>
          <vxe-modal v-model="value3" size="small">
            <template #default>
              <div>小型尺寸</div>
              <div>xxxxxxxxx</div>
              <div>xxxxxxxxxx</div>
            </template>
          </vxe-modal>
          <vxe-button @click="value4 = true" size="mini">超小尺寸</vxe-button>
          <vxe-modal v-model="value4" size="mini">
            <template #default>
              <div>超小尺寸</div>
              <div>xxxxxxxxx</div>
              <div>xxxxxxxxxx</div>
            </template>
          </vxe-modal>
        </p>

        <<p>
          <vxe-button content="点击遮罩层可以关闭" @click="$XModal.alert({ content: '点击遮罩层可以关闭', maskClosable: true })"></vxe-button>
          <vxe-button content="按 Escape 键可以关闭" @click="$XModal.alert({ content: '按 Escape 键可以关闭', escClosable: true })"></vxe-button>
          <vxe-button content="锁界面不要遮罩层" @click="$XModal.alert({ content: '锁界面不要遮罩层', mask: false })"></vxe-button>
          <vxe-button content="多窗口、叠加窗口" @click="$XModal.alert({ content: '多窗口、叠加窗口（一旦脱离当前实例，需要配合手动关闭）', lockView: false, mask: false })"></vxe-button>
          <vxe-button content="允许拖动范围超出屏幕" @click="$XModal.alert({ content: '允许拖动范围超出屏幕', marginSize: -500 })"></vxe-button>
        </p>

        <p>
          <vxe-button @click="value5 = true">基本窗口</vxe-button>
          <vxe-modal v-model="value5" width="600" show-footer>
            <template #default>
              <vxe-table
                show-overflow
                auto-resize
                height="300"
                :data="tableData">
                <vxe-column type="seq" width="60"></vxe-column>
                <vxe-column field="name" title="app.body.label.name"></vxe-column>
                <vxe-column field="sex" title="app.body.label.sex"></vxe-column>
                <vxe-column field="age" title="app.body.label.age"></vxe-column>
              </vxe-table>
            </template>
          </vxe-modal>

          <vxe-button @click="value6 = true">窗口初始位置</vxe-button>
          <vxe-modal v-model="value6" width="600" :position="{top: 200, left: 200}">
            <template #default>
              <vxe-table
                show-overflow
                auto-resize
                height="300"
                :data="tableData">
                <vxe-column type="seq" width="60"></vxe-column>
                <vxe-column field="name" title="app.body.label.name"></vxe-column>
                <vxe-column field="sex" title="app.body.label.sex"></vxe-column>
                <vxe-column field="age" title="app.body.label.age"></vxe-column>
              </vxe-table>
            </template>
          </vxe-modal>

          <vxe-button @click="value7 = true">拖动窗口调整大小</vxe-button>
          <vxe-modal v-model="value7" show-zoom resize>
            <template #default>
              <div style="color: red">按住头部移动！！！！！！！！！！！！！！！</div>
              <div style="color: blue">按住左边距拖动！！！！！！！！！！！！！！！</div>
              <div style="color: red">按住右边距拖动！！！！！！！！！！！！！！！</div>
              <div style="color: blue">按住底边距拖动！！！！！！！！！！！！！！！</div>
              <div style="color: blue">按住左下角拖动 ！！！！！！！！！！！！！！！</div>
              <div style="color: blue">按住右下角拖动！！！！！！！！！！！！！！！</div>
            </template>
          </vxe-modal>

          <vxe-button @click="value8 = true">记忆功能的窗口</vxe-button>
          <vxe-modal v-model="value8" title="记忆功能的窗口" width="600" height="400" show-zoom resize remember>
            <template #default>
              <vxe-form :data="formData3" :rules="formRules3" title-align="right" title-width="60">
                <vxe-form-item title="基本信息" span="24" title-align="left" title-width="200px" :title-prefix="{icon: 'fa fa-address-card-o'}"></vxe-form-item>
                <vxe-form-item title="名称" field="name" span="12" :item-render="{name: 'input', attrs: {placeholder: '请输入名称'}}"></vxe-form-item>
                <vxe-form-item title="昵称" field="nickname" span="12" :item-render="{name: 'input', attrs: {placeholder: '请输入昵称'}}"></vxe-form-item>
                <vxe-form-item title="性别" field="sex" span="12" :item-render="{name: '$select', options: sexList}"></vxe-form-item>
                <vxe-form-item title="年龄" field="age" span="12" :item-render="{name: 'input', attrs: {type: 'number', placeholder: '请输入年龄'}}"></vxe-form-item>
                <vxe-form-item title="其他信息" span="24" title-align="left" title-width="200px" :title-prefix="{icon: 'fa fa-info-circle'}"></vxe-form-item>
                <vxe-form-item title="地址" field="address" span="24" :item-render="{name: 'textarea', attrs: {placeholder: '请输入地址'}}"></vxe-form-item>
                <vxe-form-item align="center" span="24">
                  <template #default>
                    <vxe-button type="submit" status="primary">提交</vxe-button>
                    <vxe-button type="reset">重置</vxe-button>
                  </template>
                </vxe-form-item>
              </vxe-form>
            </template>
          </vxe-modal>

          <vxe-button @click="value9 = true">最大化显示</vxe-button>
          <vxe-modal v-model="value9" title="最大化显示" width="600" height="400" show-zoom resize remember fullscreen>
            <template #default>
              <div style="color: red">默认最大化显示</div>
              <div style="color: red">按住头部移动！！！！！！！！！！！！！！！</div>
              <div style="color: blue">按住左边距拖动！！！！！！！！！！！！！！！</div>
              <div style="color: red">按住右边距拖动！！！！！！！！！！！！！！！</div>
              <div style="color: blue">按住底边距拖动！！！！！！！！！！！！！！！</div>
              <div style="color: blue">按住左下角拖动 ！！！！！！！！！！！！！！！</div>
              <div style="color: blue">按住右下角拖动！！！！！！！！！！！！！！！</div>
            </template>
          </vxe-modal>

          <vxe-button @click="value10 = true">阻止关闭</vxe-button>
          <vxe-modal v-model="value10" title="阻止关闭" width="800" height="400" :before-hide-method="beforeHideMethod" show-zoom resize>
            <template #default>
              <vxe-table
                border
                resizable
                show-overflow
                auto-resize
                height="auto"
                :data="tableData">
                <vxe-column type="seq" width="60"></vxe-column>
                <vxe-column field="name" title="app.body.label.name"></vxe-column>
                <vxe-column field="sex" title="app.body.label.sex"></vxe-column>
                <vxe-column field="age" title="app.body.label.age"></vxe-column>
              </vxe-table>
            </template>
          </vxe-modal>

          <vxe-button @click="value11 = true">完整功能的窗口（移动、拖动、状态保存）</vxe-button>
          <vxe-modal v-model="value11" id="myModal6" width="800" height="400" min-width="460" min-height="320" show-zoom resize remember storage transfer>
            <template #title>
              <span style="color: red;">完整功能的窗口（移动、拖动、状态保存）</span>
              <span style="color: red;">通过设置 transfer 将弹框容器插入 body</span>
            </template>
            <template #default>
              <vxe-grid
                border
                resizable
                show-overflow
                auto-resize
                height="auto"
                :pager-config="tablePage"
                :proxy-config="tableProxy"
                :columns="tableColumn"
                :toolbar-config="tableToolbar"></vxe-grid>
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
              value5: false,
              value6: false,
              value7: false,
              value8: false,
              value9: false,
              value10: false,
              value11: false,
              sexList: [
                { label: '', value: '' },
                { label: '女', value: '0' },
                { label: '男', value: '1' }
              ],
              formData3: {
                name: '',
                nickname: '',
                sex: '',
                age: 26,
                address: null
              },
              formRules3: {
                name: [
                  { required: true, message: '请输入名称' },
                  { min: 3, max: 5, message: '长度在 3 到 5 个字符' }
                ],
                nickname: [
                  { required: true, message: '请输入昵称' }
                ],
                sex: [
                  { required: true, message: '请选择性别' }
                ]
              },
              tablePage: {
                pageSize: 10
              },
              tableProxy: {
                props: {
                  result: 'result',
                  total: 'page.total'
                },
                ajax: {
                  query: () => {
                    return new Promise(resolve => {
                      const list = [
                        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
                        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'Shenzhen' },
                        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
                        { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'Shenzhen' },
                        { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'Shenzhen' },
                        { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'Shenzhen' }
                      ]
                      resolve({
                        result: list,
                        page: {
                          total: 140
                        }
                      })
                    })
                  }
                }
              },
              tableToolbar: {
                buttons: [
                  { code: 'myBtn1', name: '按钮1' },
                  { code: 'myBtn2', name: '按钮2' }
                ],
                refresh: true,
                custom: true
              },
              tableColumn: [
                { type: 'checkbox', width: 50 },
                { type: 'seq', width: 60 },
                { field: 'name', title: 'Name' },
                { field: 'nickname', title: 'Nickname' },
                {
                  field: 'role',
                  title: 'Role',
                  filters: [
                    { label: '前端', value: '前端' },
                    { label: '后端', value: '后端' },
                    { label: '设计师', value: '设计师' },
                    { label: '管理员', value: '管理员' },
                    { label: '项目经理', value: '项目经理' },
                    { label: '测试', value: '测试' },
                    { label: '美工', value: '美工' },
                    { label: '数据库', value: '数据库' }
                  ]
                },
                { field: 'describe', title: 'Describe' }
              ]
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, address: 'test abc' },
                { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: '0', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: '1', age: 23, address: 'test abc' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: '1', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: '1', age: 21, address: 'test abc' }
              ]
            }
          },
          methods: {
            async beforeHideMethod () {
              const type = await this.$XModal.confirm('您确定要关闭吗？')
              if (type === 'confirm') {
                this.$XModal.message({ content: \`允许关闭 \${type}\`, status: 'success' })
              } else {
                this.$XModal.message({ content: \`禁止关闭 \${type}\`, status: 'error' })
                return new Error()
              }
            },
            confirmEvent () {
              this.$XModal.confirm('您确定要删除吗？').then(type => {
                this.$XModal.message({ content: \`点击了 \${type}\` })
              })
            }
          }
        }
        `
      ]
    }
  },
  methods: {
    async beforeHideMethod () {
      const type = await this.$XModal.confirm('您确定要关闭吗？')
      if (type === 'confirm') {
        this.$XModal.message({ content: `允许关闭 ${type}`, status: 'success' })
      } else {
        this.$XModal.message({ content: `禁止关闭 ${type}`, status: 'error' })
        return new Error()
      }
    },
    confirmEvent () {
      this.$XModal.confirm('您确定要删除吗？').then(type => {
        this.$XModal.message({ content: `点击了 ${type}` })
      })
    }
  }
}
</script>
