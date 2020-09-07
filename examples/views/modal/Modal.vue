<template>
  <div>
    <h2>{{ $t('app.aside.nav.modal') }}</h2>

    <p class="tip">
      轻提示框、提示框、弹出窗口，查看 <router-link class="link" :to="{name: 'VXEAPI', params: {name: 'modal'}}">API</router-link>，可以通过 <router-link class="link" :to="{name: 'StartGlobal'}">setup</router-link> 设置全局参数<br>
      对于某些场景如果需要动态创建的窗口，可以通过以下 API 全局调用：<br>
      open(options: ModalOptions) 动态创建窗口<br>
      message(message: string, title?: string, options?: ModalOptions) 动态创建消息框<br>
      alert(message: string, title?: string, options?: ModalOptions) 动态创建提示框<br>
      confirm(message: string, title?: string, options?: ModalOptions) 动态创建确认框<br>
      close(id?: string) 手动关闭当前活动的窗口<br>
      全局实例对象：this.$XModal || VXETable.modal 或者 ModalController<br>
    </p>

    <p>
      <vxe-button @click="$XModal.message({ message: '消息提示' })">默认消息框</vxe-button>
      <vxe-button @click="$XModal.message({ message: 'info 消息提示', status: 'info' })">info</vxe-button>
      <vxe-button @click="$XModal.message({ message: 'warning 消息提示', status: 'warning' })">warning</vxe-button>
      <vxe-button @click="$XModal.message({ message: 'question 消息提示', status: 'question' })">question</vxe-button>
      <vxe-button @click="$XModal.message({ message: 'success 消息提示', status: 'success' })">success</vxe-button>
      <vxe-button @click="$XModal.message({ message: 'error 消息提示', status: 'error' })">error</vxe-button>
      <vxe-button @click="$XModal.message({ message: 'loading 消息提示', status: 'loading' })">loading</vxe-button>
      <vxe-button @click="$XModal.message({ message: 'iconStatus 自定义图标', status:'success', iconStatus: 'fa fa-thumbs-up' })">自定义图标</vxe-button>
      <vxe-button @click="$XModal.message({ message: '不允许重复点击', id: 'unique1' })">不允许重复点击</vxe-button>
    </p>

    <p>
      <vxe-button @click="$XModal.alert('基本提示框', '标题1')">基本提示框</vxe-button>
      <vxe-button @click="$XModal.alert({ message: 'info 提示框', status: 'info' })">info</vxe-button>
      <vxe-button @click="$XModal.alert({ message: 'warning 提示框', status: 'warning' })">warning</vxe-button>
      <vxe-button @click="$XModal.alert({ message: 'question 提示框', status: 'question' })">question</vxe-button>
      <vxe-button @click="$XModal.alert({ message: 'success 提示框', status: 'success' })">success</vxe-button>
      <vxe-button @click="$XModal.alert({ message: 'error 提示框', title:'app.body.msg.error', status: 'error' })">error</vxe-button>
      <vxe-button @click="$XModal.alert({ message: 'loading 提示框', status: 'loading' })">loading</vxe-button>
      <vxe-button @click="$XModal.alert({ message: 'iconStatus 自定义图标', status:'error', iconStatus: 'fa fa-hand-peace-o' })">自定义图标</vxe-button>
      <vxe-button @click="confirmEvent">确认提示框</vxe-button>
    </p>

    <p>
      <vxe-button @click="value1 = true">默认尺寸</vxe-button>
      <vxe-modal v-model="value1">
        <template v-slot>
          <div>默认尺寸</div>
          <div>xxxxxxxxx</div>
          <div>xxxxxxxxxx</div>
        </template>
      </vxe-modal>
      <vxe-button @click="value2 = true" size="medium">中等尺寸</vxe-button>
      <vxe-modal v-model="value2" size="medium">
        <template v-slot>
          <div>中等尺寸</div>
          <div>xxxxxxxxx</div>
          <div>xxxxxxxxxx</div>
        </template>
      </vxe-modal>
      <vxe-button @click="value3 = true" size="small">小型尺寸</vxe-button>
      <vxe-modal v-model="value3" size="small">
        <template v-slot>
          <div>小型尺寸</div>
          <div>xxxxxxxxx</div>
          <div>xxxxxxxxxx</div>
        </template>
      </vxe-modal>
      <vxe-button @click="value4 = true" size="mini">超小尺寸</vxe-button>
      <vxe-modal v-model="value4" size="mini">
        <template v-slot>
          <div>超小尺寸</div>
          <div>xxxxxxxxx</div>
          <div>xxxxxxxxxx</div>
        </template>
      </vxe-modal>
    </p>

    <p>
      <vxe-button @click="$XModal.alert({ message: '点击遮罩层可以关闭', maskClosable: true })">点击遮罩层可以关闭</vxe-button>
      <vxe-button @click="$XModal.alert({ message: '按 Esc 键可以关闭', escClosable: true })">按 Esc 键可以关闭</vxe-button>
      <vxe-button @click="$XModal.alert({ message: '锁界面不要遮罩层', mask: false })">锁界面不要遮罩层</vxe-button>
      <vxe-button @click="$XModal.alert({ message: '不锁界面不要遮罩层（一旦脱离当前实例，需要配合手动关闭）', lockView: false, mask: false })">不锁界面不要遮罩层</vxe-button>
    </p>

    <p>
      <vxe-button @click="value5 = true">基本窗口</vxe-button>
      <vxe-modal v-model="value5" width="600" show-footer>
        <template v-slot>
          <vxe-table
            show-overflow
            height="300"
            :sync-resize="value5"
            :data="tableData">
            <vxe-table-column type="seq" width="60"></vxe-table-column>
            <vxe-table-column field="name" title="app.body.label.name"></vxe-table-column>
            <vxe-table-column field="sex" title="app.body.label.sex"></vxe-table-column>
            <vxe-table-column field="age" title="app.body.label.age"></vxe-table-column>
          </vxe-table>
        </template>
      </vxe-modal>

      <vxe-button @click="value6 = true">窗口初始位置</vxe-button>
      <vxe-modal v-model="value6" width="600" :position="{top: 200, left: 200}">
        <template v-slot>
          <vxe-table
            show-overflow
            height="300"
            :sync-resize="value6"
            :data="tableData">
            <vxe-table-column type="seq" width="60"></vxe-table-column>
            <vxe-table-column field="name" title="app.body.label.name"></vxe-table-column>
            <vxe-table-column field="sex" title="app.body.label.sex"></vxe-table-column>
            <vxe-table-column field="age" title="app.body.label.age"></vxe-table-column>
          </vxe-table>
        </template>
      </vxe-modal>

      <vxe-button @click="value7 = true">拖动窗口调整大小</vxe-button>
      <vxe-modal v-model="value7" resize>
        <template v-slot>
          <div style="color: red">按住头部移动！！！！！！！！！！！！！！！</div>
          <div style="color: blue">按住左边距拖动！！！！！！！！！！！！！！！</div>
          <div style="color: red">按住右边距拖动！！！！！！！！！！！！！！！</div>
          <div style="color: blue">按住底边距拖动！！！！！！！！！！！！！！！</div>
          <div style="color: blue">按住左下角拖动 ！！！！！！！！！！！！！！！</div>
          <div style="color: blue">按住右下角拖动！！！！！！！！！！！！！！！</div>
        </template>
      </vxe-modal>

      <vxe-button @click="value8 = true">记忆功能的窗口</vxe-button>
      <vxe-modal v-model="value8" title="记忆功能的窗口" width="600" height="400" resize remember>
        <template v-slot>
          <vxe-form :data="formData3" :rules="formRules3" title-align="right" title-width="60">
            <vxe-form-item title="基本信息" span="24" title-align="left" title-width="200px" :title-prefix="{icon: 'fa fa-address-card-o'}"></vxe-form-item>
            <vxe-form-item title="名称" field="name" span="12" :item-render="{name: 'input', attrs: {placeholder: '请输入名称'}}"></vxe-form-item>
            <vxe-form-item title="昵称" field="nickname" span="12" :item-render="{name: 'input', attrs: {placeholder: '请输入昵称'}}"></vxe-form-item>
            <vxe-form-item title="性别" field="sex" span="12" :item-render="{name: '$select', options: sexList}"></vxe-form-item>
            <vxe-form-item title="年龄" field="age" span="12" :item-render="{name: 'input', attrs: {type: 'number', placeholder: '请输入年龄'}}"></vxe-form-item>
            <vxe-form-item title="其他信息" span="24" title-align="left" title-width="200px" :title-prefix="{icon: 'fa fa-info-circle'}"></vxe-form-item>
            <vxe-form-item title="地址" field="address" span="24" :item-render="{name: 'textarea', attrs: {placeholder: '请输入地址'}}"></vxe-form-item>
            <vxe-form-item align="center" span="24">
              <template v-slot>
                <vxe-button type="submit" status="primary">提交</vxe-button>
                <vxe-button type="reset">重置</vxe-button>
              </template>
            </vxe-form-item>
          </vxe-form>
        </template>
      </vxe-modal>

      <vxe-button @click="value9 = true">最大化显示</vxe-button>
      <vxe-modal v-model="value9" title="最大化显示" width="600" height="400" resize remember fullscreen>
        <template v-slot>
          <div style="color: red">默认最大化显示</div>
          <div style="color: red">按住头部移动！！！！！！！！！！！！！！！</div>
          <div style="color: blue">按住左边距拖动！！！！！！！！！！！！！！！</div>
          <div style="color: red">按住右边距拖动！！！！！！！！！！！！！！！</div>
          <div style="color: blue">按住底边距拖动！！！！！！！！！！！！！！！</div>
          <div style="color: blue">按住左下角拖动 ！！！！！！！！！！！！！！！</div>
          <div style="color: blue">按住右下角拖动！！！！！！！！！！！！！！！</div>
        </template>
      </vxe-modal>

      <vxe-button @click="value10 = true">缩放表格的窗口</vxe-button>
      <vxe-modal v-model="value10" title="缩放表格的窗口" width="800" height="400" resize>
        <template v-slot>
          <vxe-table
            border
            resizable
            show-overflow
            auto-resize
            height="auto"
            :sync-resize="value10"
            :data="tableData">
            <vxe-table-column type="seq" width="60"></vxe-table-column>
            <vxe-table-column field="name" title="app.body.label.name"></vxe-table-column>
            <vxe-table-column field="sex" title="app.body.label.sex"></vxe-table-column>
            <vxe-table-column field="age" title="app.body.label.age"></vxe-table-column>
          </vxe-table>
        </template>
      </vxe-modal>

      <vxe-button @click="value11 = true">完整功能的窗口（移动、拖动、状态保存）</vxe-button>
      <vxe-modal v-model="value11" id="myModal6" width="800" height="400" min-width="460" min-height="320" resize remember storage transfer>
        <template v-slot:title>
          <span style="color: red;">完整功能的窗口（移动、拖动、状态保存）</span>
          <span style="color: red;">通过设置 transfer 将弹框容器插入 body</span>
        </template>
        <template v-slot>
          <vxe-grid
            border
            resizable
            show-overflow
            auto-resize
            height="auto"
            :sync-resize="value11"
            :pager-config="tablePage"
            :proxy-config="tableProxy"
            :columns="tableColumn"
            :toolbar="tableToolbar"></vxe-grid>
        </template>
      </vxe-modal>
    </p>

    <pre>
      <code>
        | Esc | 如果开启配置，则支持关闭窗口 |
      </code>
    </pre>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="html">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>
  </div>
</template>

<script>
import XEAjax from 'xe-ajax'
import hljs from 'highlight.js'

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
          query: ({ page }) => XEAjax.get(`/api/user/page/list/${page.pageSize}/${page.currentPage}`)
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
          <vxe-button @click="$XModal.message({ message: '消息提示' })">默认消息框</vxe-button>
          <vxe-button @click="$XModal.message({ message: 'info 消息提示', status: 'info' })">info</vxe-button>
          <vxe-button @click="$XModal.message({ message: 'warning 消息提示', status: 'warning' })">warning</vxe-button>
          <vxe-button @click="$XModal.message({ message: 'question 消息提示', status: 'question' })">question</vxe-button>
          <vxe-button @click="$XModal.message({ message: 'success 消息提示', status: 'success' })">success</vxe-button>
          <vxe-button @click="$XModal.message({ message: 'error 消息提示', status: 'error' })">error</vxe-button>
          <vxe-button @click="$XModal.message({ message: 'loading 消息提示', status: 'loading' })">loading</vxe-button>
          <vxe-button @click="$XModal.message({ message: 'iconStatus 自定义图标', status:'success', iconStatus: 'fa fa-thumbs-up' })">自定义图标</vxe-button>
          <vxe-button @click="$XModal.message({ message: '不允许重复点击', id: 'unique1' })">不允许重复点击</vxe-button>
        </p>

        <p>
          <vxe-button @click="$XModal.alert('基本提示框', '标题1')">基本提示框</vxe-button>
          <vxe-button @click="$XModal.alert({ message: 'info 提示框', status: 'info' })">info</vxe-button>
          <vxe-button @click="$XModal.alert({ message: 'warning 提示框', status: 'warning' })">warning</vxe-button>
          <vxe-button @click="$XModal.alert({ message: 'question 提示框', status: 'question' })">question</vxe-button>
          <vxe-button @click="$XModal.alert({ message: 'success 提示框', status: 'success' })">success</vxe-button>
          <vxe-button @click="$XModal.alert({ message: 'error 提示框', title:'app.body.msg.error', status: 'error' })">error</vxe-button>
          <vxe-button @click="$XModal.alert({ message: 'loading 提示框', status: 'loading' })">loading</vxe-button>
          <vxe-button @click="$XModal.alert({ message: 'iconStatus 自定义图标', status:'error', iconStatus: 'fa fa-hand-peace-o' })">自定义图标</vxe-button>
          <vxe-button @click="confirmEvent">确认提示框</vxe-button>
        </p>

        <p>
          <vxe-button @click="value1 = true">默认尺寸</vxe-button>
          <vxe-modal v-model="value1">
            <template v-slot>
              <div>默认尺寸</div>
              <div>xxxxxxxxx</div>
              <div>xxxxxxxxxx</div>
            </template>
          </vxe-modal>
          <vxe-button @click="value2 = true" size="medium">中等尺寸</vxe-button>
          <vxe-modal v-model="value2" size="medium">
            <template v-slot>
              <div>中等尺寸</div>
              <div>xxxxxxxxx</div>
              <div>xxxxxxxxxx</div>
            </template>
          </vxe-modal>
          <vxe-button @click="value3 = true" size="small">小型尺寸</vxe-button>
          <vxe-modal v-model="value3" size="small">
            <template v-slot>
              <div>小型尺寸</div>
              <div>xxxxxxxxx</div>
              <div>xxxxxxxxxx</div>
            </template>
          </vxe-modal>
          <vxe-button @click="value4 = true" size="mini">超小尺寸</vxe-button>
          <vxe-modal v-model="value4" size="mini">
            <template v-slot>
              <div>超小尺寸</div>
              <div>xxxxxxxxx</div>
              <div>xxxxxxxxxx</div>
            </template>
          </vxe-modal>
        </p>

        <p>
          <vxe-button @click="$XModal.alert({ message: '点击遮罩层可以关闭', maskClosable: true })">点击遮罩层可以关闭</vxe-button>
          <vxe-button @click="$XModal.alert({ message: '按 Esc 键可以关闭', escClosable: true })">按 Esc 键可以关闭</vxe-button>
          <vxe-button @click="$XModal.alert({ message: '锁界面不要遮罩层', mask: false })">锁界面不要遮罩层</vxe-button>
          <vxe-button @click="$XModal.alert({ message: '不锁界面不要遮罩层（一旦脱离当前实例，需要配合手动关闭）', lockView: false, mask: false })">不锁界面不要遮罩层</vxe-button>
        </p>

        <p>
          <vxe-button @click="value5 = true">基本窗口</vxe-button>
          <vxe-modal v-model="value5" width="600" show-footer>
            <template v-slot>
              <vxe-table
                show-overflow
                height="300"
                :sync-resize="value5"
                :data="tableData">
                <vxe-table-column type="seq" width="60"></vxe-table-column>
                <vxe-table-column field="name" title="app.body.label.name"></vxe-table-column>
                <vxe-table-column field="sex" title="app.body.label.sex"></vxe-table-column>
                <vxe-table-column field="age" title="app.body.label.age"></vxe-table-column>
              </vxe-table>
            </template>
          </vxe-modal>

          <vxe-button @click="value6 = true">窗口初始位置</vxe-button>
          <vxe-modal v-model="value6" width="600" :position="{top: 200, left: 200}">
            <template v-slot>
              <vxe-table
                show-overflow
                height="300"
                :sync-resize="value6"
                :data="tableData">
                <vxe-table-column type="seq" width="60"></vxe-table-column>
                <vxe-table-column field="name" title="app.body.label.name"></vxe-table-column>
                <vxe-table-column field="sex" title="app.body.label.sex"></vxe-table-column>
                <vxe-table-column field="age" title="app.body.label.age"></vxe-table-column>
              </vxe-table>
            </template>
          </vxe-modal>

          <vxe-button @click="value7 = true">拖动窗口调整大小</vxe-button>
          <vxe-modal v-model="value7" resize>
            <template v-slot>
              <div style="color: red">按住头部移动！！！！！！！！！！！！！！！</div>
              <div style="color: blue">按住左边距拖动！！！！！！！！！！！！！！！</div>
              <div style="color: red">按住右边距拖动！！！！！！！！！！！！！！！</div>
              <div style="color: blue">按住底边距拖动！！！！！！！！！！！！！！！</div>
              <div style="color: blue">按住左下角拖动 ！！！！！！！！！！！！！！！</div>
              <div style="color: blue">按住右下角拖动！！！！！！！！！！！！！！！</div>
            </template>
          </vxe-modal>

          <vxe-button @click="value8 = true">记忆功能的窗口</vxe-button>
          <vxe-modal v-model="value8" title="记忆功能的窗口" width="600" height="400" resize remember>
            <template v-slot>
              <vxe-form :data="formData3" :rules="formRules3" title-align="right" title-width="60">
                <vxe-form-item title="基本信息" span="24" title-align="left" title-width="200px" :title-prefix="{icon: 'fa fa-address-card-o'}"></vxe-form-item>
                <vxe-form-item title="名称" field="name" span="12" :item-render="{name: 'input', attrs: {placeholder: '请输入名称'}}"></vxe-form-item>
                <vxe-form-item title="昵称" field="nickname" span="12" :item-render="{name: 'input', attrs: {placeholder: '请输入昵称'}}"></vxe-form-item>
                <vxe-form-item title="性别" field="sex" span="12" :item-render="{name: '$select', options: sexList}"></vxe-form-item>
                <vxe-form-item title="年龄" field="age" span="12" :item-render="{name: 'input', attrs: {type: 'number', placeholder: '请输入年龄'}}"></vxe-form-item>
                <vxe-form-item title="其他信息" span="24" title-align="left" title-width="200px" :title-prefix="{icon: 'fa fa-info-circle'}"></vxe-form-item>
                <vxe-form-item title="地址" field="address" span="24" :item-render="{name: 'textarea', attrs: {placeholder: '请输入地址'}}"></vxe-form-item>
                <vxe-form-item align="center" span="24">
                  <template v-slot>
                    <vxe-button type="submit" status="primary">提交</vxe-button>
                    <vxe-button type="reset">重置</vxe-button>
                  </template>
                </vxe-form-item>
              </vxe-form>
            </template>
          </vxe-modal>

          <vxe-button @click="value9 = true">最大化显示</vxe-button>
          <vxe-modal v-model="value9" title="最大化显示" width="600" height="400" resize remember fullscreen>
            <template v-slot>
              <div style="color: red">默认最大化显示</div>
              <div style="color: red">按住头部移动！！！！！！！！！！！！！！！</div>
              <div style="color: blue">按住左边距拖动！！！！！！！！！！！！！！！</div>
              <div style="color: red">按住右边距拖动！！！！！！！！！！！！！！！</div>
              <div style="color: blue">按住底边距拖动！！！！！！！！！！！！！！！</div>
              <div style="color: blue">按住左下角拖动 ！！！！！！！！！！！！！！！</div>
              <div style="color: blue">按住右下角拖动！！！！！！！！！！！！！！！</div>
            </template>
          </vxe-modal>

          <vxe-button @click="value10 = true">缩放表格的窗口</vxe-button>
          <vxe-modal v-model="value10" title="缩放表格的窗口" width="800" height="400" resize>
            <template v-slot>
              <vxe-table
                border
                resizable
                show-overflow
                auto-resize
                height="auto"
                :sync-resize="value10"
                :data="tableData">
                <vxe-table-column type="seq" width="60"></vxe-table-column>
                <vxe-table-column field="name" title="app.body.label.name"></vxe-table-column>
                <vxe-table-column field="sex" title="app.body.label.sex"></vxe-table-column>
                <vxe-table-column field="age" title="app.body.label.age"></vxe-table-column>
              </vxe-table>
            </template>
          </vxe-modal>

          <vxe-button @click="value11 = true">完整功能的窗口（移动、拖动、状态保存）</vxe-button>
          <vxe-modal v-model="value11" id="myModal6" width="800" height="400" min-width="460" min-height="320" resize remember storage transfer>
            <template v-slot:title>
              <span style="color: red;">完整功能的窗口（移动、拖动、状态保存）</span>
              <span style="color: red;">通过设置 transfer 将弹框容器插入 body</span>
            </template>
            <template v-slot>
              <vxe-grid
                border
                resizable
                show-overflow
                auto-resize
                height="auto"
                :sync-resize="value11"
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
                  query: ({ page }) => XEAjax.get(\`/api/user/page/list/\${page.pageSize}/\${page.currentPage}\`)
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
          },
          methods: {
            confirmEvent () {
              this.$XModal.confirm('您确定要删除吗？').then(type => {
                this.$XModal.message({ message: \`点击了 \${type}\` })
              })
            }
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
  },
  methods: {
    confirmEvent () {
      this.$XModal.confirm('您确定要删除吗？').then(type => {
        this.$XModal.message({ message: `点击了 ${type}` })
      })
    }
  }
}
</script>
