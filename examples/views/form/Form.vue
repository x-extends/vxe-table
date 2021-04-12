<template>
  <div>
    <h2>{{ $t('app.aside.nav.form') }}</h2>
    <p class="tip">
      表单，查看 <router-link class="link" :to="{name: 'VXEAPI', params: {name: 'form'}}">API</router-link>，可以通过 <router-link class="link" :to="{name: 'StartGlobal'}">setup</router-link> 设置全局参数<br>
      <span class="red">（注：重置功能需要配置 item-render 的项有效，如果不需要自动重置，可以不用设置）</span>
    </p>

    <p>
      <vxe-form :data="demo1.formData1" @submit="searchEvent" @reset="resetEvent">
        <vxe-form-item title="名称" field="name" :item-render="{}">
          <template #default>
            <vxe-input v-model="demo1.formData1.name" placeholder="请输入名称" clearable></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item title="昵称" field="nickname" :item-render="{}">
          <template #default>
            <vxe-input v-model="demo1.formData1.nickname" placeholder="请输入昵称"></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item title="性别" field="sex" :item-render="{}">
          <template #default>
            <vxe-select v-model="demo1.formData1.sex" placeholder="请选择性别" clearable>
              <vxe-option value="1" label="女"></vxe-option>
              <vxe-option value="2" label="男"></vxe-option>
            </vxe-select>
          </template>
        </vxe-form-item>
        <vxe-form-item>
          <template #default>
            <vxe-button type="submit" status="primary" content="默认尺寸"></vxe-button>
          </template>
        </vxe-form-item>
      </vxe-form>

      <vxe-form :data="demo1.formData1" @submit="searchEvent" @reset="resetEvent" size="medium">
        <vxe-form-item title="名称" field="name" :item-render="{}">
          <template #default>
            <vxe-input v-model="demo1.formData1.name" placeholder="请输入名称" clearable></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item title="昵称" field="nickname" :item-render="{}">
          <template #default>
            <vxe-input v-model="demo1.formData1.nickname" placeholder="请输入昵称" clearable></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item title="性别" field="sex" :item-render="{}">
          <template #default>
            <vxe-select v-model="demo1.formData1.sex" placeholder="请选择性别" clearable>
              <vxe-option value="1" label="女"></vxe-option>
              <vxe-option value="2" label="男"></vxe-option>
            </vxe-select>
          </template>
        </vxe-form-item>
        <vxe-form-item>
          <template #default>
            <vxe-button type="submit" status="primary" content="中等尺寸"></vxe-button>
          </template>
        </vxe-form-item>
      </vxe-form>

      <vxe-form :data="demo1.formData1" @submit="searchEvent" @reset="resetEvent" size="small">
        <vxe-form-item title="名称" field="name" :item-render="{}">
          <template #default>
            <vxe-input v-model="demo1.formData1.name" placeholder="请输入名称" clearable></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item title="昵称" field="nickname" :item-render="{}">
          <template #default>
            <vxe-input v-model="demo1.formData1.nickname" placeholder="请输入昵称" clearable></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item title="性别" field="sex" :item-render="{}">
          <template #default>
            <vxe-select v-model="demo1.formData1.sex" placeholder="请选择性别" clearable>
              <vxe-option value="1" label="女"></vxe-option>
              <vxe-option value="2" label="男"></vxe-option>
            </vxe-select>
          </template>
        </vxe-form-item>
        <vxe-form-item>
          <template #default>
            <vxe-button type="submit" status="primary" content="小型尺寸"></vxe-button>
          </template>
        </vxe-form-item>
      </vxe-form>

      <vxe-form :data="demo1.formData1" @submit="searchEvent" @reset="resetEvent" size="mini">
        <vxe-form-item title="名称" field="name" :item-render="{}">
          <template #default>
            <vxe-input v-model="demo1.formData1.name" placeholder="请输入名称" clearable></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item title="昵称" field="nickname" :item-render="{}">
          <template #default>
            <vxe-input v-model="demo1.formData1.nickname" placeholder="请输入昵称" clearable></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item title="性别" field="sex" :item-render="{}">
          <template #default>
            <vxe-select v-model="demo1.formData1.sex" placeholder="请选择性别" clearable>
              <vxe-option value="1" label="女"></vxe-option>
              <vxe-option value="2" label="男"></vxe-option>
            </vxe-select>
          </template>
        </vxe-form-item>
        <vxe-form-item>
          <template #default>
            <vxe-button type="submit" status="primary" content="超小尺寸"></vxe-button>
          </template>
        </vxe-form-item>
      </vxe-form>
    </p>

    <p>
      <vxe-form
        title-colon
        ref="xForm"
        title-align="right"
        title-width="100"
        :data="demo2.formData2"
        :rules="demo2.formRules2"
        :loading="demo2.loading2"
        @submit="submitEvent2"
        @reset="resetEvent">
        <vxe-form-gather span="12">
          <vxe-form-item title="名称" field="name" span="24"></vxe-form-item>
          <vxe-form-item title="昵称" span="24">
            <template #default>自定义 {{ demo2.formData2.nickname }}</template>
          </vxe-form-item>
          <vxe-form-item title="标题貌似有点长呢" field="sex" span="24" :item-render="{}" title-overflow>
            <template #default="params">
              <vxe-select v-model="demo2.formData2.sex" placeholder="请选择性别" clearable @change="$refs.xForm.updateStatus(params)">
                <vxe-option value="1" label="女"></vxe-option>
                <vxe-option value="2" label="男"></vxe-option>
              </vxe-select>
            </template>
          </vxe-form-item>
          <vxe-form-item title="标题貌似有点长呢" field="age" span="24" :item-render="{}" title-overflow="title">
            <template #default>
              <vxe-input v-model="demo2.formData2.age" type="integer" placeholder="请输入年龄" clearable></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item title="标题貌似有点长呢" field="date" span="24" :item-render="{}" title-overflow="ellipsis">
            <template #default>
              <vxe-input v-model="demo2.formData2.date" type="date" placeholder="请选择日期" clearable></vxe-input>
            </template>
          </vxe-form-item>
        </vxe-form-gather>
        <vxe-form-gather span="12">
          <vxe-form-item title="标题貌似有点长呢" field="address" span="24" :item-render="{}">
            <template #default>
              <vxe-textarea v-model="demo2.formData2.address" placeholder="请输入地址" :autosize="{minRows: 6, maxRows: 10}" clearable></vxe-textarea>
            </template>
          </vxe-form-item>
        </vxe-form-gather>
        <vxe-form-item align="center" span="24">
          <template #default>
            <vxe-button type="submit" status="primary" content="基本表单"></vxe-button>
            <vxe-button type="reset" content="重置"></vxe-button>
          </template>
        </vxe-form-item>
      </vxe-form>
    </p>

    <p>
      <vxe-form :data="demo3.formData3" title-align="right" title-width="100" prevent-submit title-colon>
        <vxe-form-item title="名称" field="name" span="8" :item-render="{}">
          <template #default>
            <vxe-input v-model="demo3.formData3.name" placeholder="请输入名称" clearable></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item title="昵称" field="nickname" span="8" :item-render="{}" :title-prefix="{ message: '请输入汉字！', icon: 'fa fa-exclamation-circle' }">
          <template #default>
            <vxe-input v-model="demo3.formData3.nickname" placeholder="请输入昵称" clearable></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item title="性别" field="sex" span="8" :item-render="{}">
          <template #default>
            <vxe-select v-model="demo3.formData3.sex" placeholder="请选择性别" clearable>
              <vxe-option value="1" label="女"></vxe-option>
              <vxe-option value="2" label="男"></vxe-option>
            </vxe-select>
          </template>
        </vxe-form-item>
        <vxe-form-item title="年龄" field="age" span="8" :item-render="{}" :title-prefix="{ message: '请输入数值！', icon: 'fa fa-info-circle' }">
          <template #default>
            <vxe-input v-model="demo3.formData3.age" type="integer" placeholder="请输入年龄" clearable></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item title="状态" field="status" span="8" :item-render="{}">
          <template #default>
            <vxe-select v-model="demo3.formData3.status" placeholder="请选择状态" clearable>
              <vxe-option value="0" label="失败"></vxe-option>
              <vxe-option value="1" label="成功"></vxe-option>
            </vxe-select>
          </template>
        </vxe-form-item>
        <vxe-form-item title="是否禁用" field="active" span="8" :item-render="{}">
          <template #default>
            <vxe-switch v-model="demo3.formData3.active" open-label="是" close-label="否"></vxe-switch>
          </template>
        </vxe-form-item>
        <vxe-form-item title="体重" field="weight" span="8" :item-render="{}" folding>
          <template #default>
            <vxe-input v-model="demo3.formData3.weight" type="number" placeholder="请输入体重" clearable></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item title="日期" field="date" span="8" :item-render="{}" folding>
          <template #default>
            <vxe-input v-model="demo3.formData3.date" type="date" placeholder="请选择日期" clearable></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item title="是否单身" field="single" :item-render="{}" span="8" folding>
          <template #default>
            <vxe-radio-group v-model="demo3.formData3.single">
              <vxe-radio label="1" content="是"></vxe-radio>
              <vxe-radio label="0" content="否"></vxe-radio>
            </vxe-radio-group>
          </template>
        </vxe-form-item>
        <vxe-form-item title="兴趣爱好" field="flagList" :item-render="{}" span="8" folding>
          <template #default>
            <vxe-checkbox-group v-model="demo3.formData3.flagList">
              <vxe-checkbox label="1" content="爬山"></vxe-checkbox>
              <vxe-checkbox label="2" content="跑步"></vxe-checkbox>
              <vxe-checkbox label="3" content="听歌"></vxe-checkbox>
            </vxe-checkbox-group>
          </template>
        </vxe-form-item>
        <vxe-form-item align="center" span="24" collapse-node>
          <template #default>
            <vxe-button status="primary" content="手动提交方式" @click="searchEvent"></vxe-button>
            <vxe-button content="重置" @click="resetEvent"></vxe-button>
          </template>
        </vxe-form-item>
      </vxe-form>
    </p>

    <p>
      <vxe-form :data="demo4.formData4" :items="demo4.formItems4"></vxe-form>
    </p>

    <pre>
      <pre-code>
        | Tab | 切换到上一个 |
        | Shift Tab | 切换到下一个 |
        | Enter | （prevent-submit=true时）如果有存在提交按钮则回车后自动提交表单 |
      </pre-code>
    </pre>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="html">{{ demoCodes[0] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { VXETable } from '../../../packages/all'
import { VxeFormEvents } from '../../../types/index'

export default defineComponent({
  setup  () {
    const demo1 = reactive({
      formData1: {
        name: '',
        nickname: '',
        sex: '1'
      }
    })

    const demo2 = reactive({
      loading2: false,
      formData2: {
        name: 'test1',
        nickname: 'Testing',
        sex: '',
        age: 26,
        date: null,
        address: '左右布局'
      },
      formRules2: {
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
      }
    })

    const demo3 = reactive({
      formData3: {
        name: '',
        nickname: '',
        sex: '',
        age: 30,
        status: '1',
        weight: null,
        date: null,
        active: false,
        single: '1',
        flagList: []
      }
    })

    const demo4 = reactive({
      formData4: {
        name: '',
        nickname: '',
        sex: '0',
        role: '',
        age: 22
      },
      formItems4: [
        {
          title: '左侧',
          span: 12,
          children: [
            { field: 'name', title: '名称', span: 8, itemRender: { name: '$input', props: { placeholder: '请输入名称' } } },
            { field: 'sex', title: '性别', span: 8, itemRender: { name: '$select', options: [{ value: '0', label: '女' }, { value: '1', label: '男' }], props: { placeholder: '请选择性别' } } },
            { field: 'role', title: '角色', span: 8, itemRender: { name: '$input', props: { placeholder: '请输入角色' } } },
            { field: 'age', title: '年龄', span: 24, itemRender: { name: '$input', props: { type: 'number', placeholder: '请输入年龄' } } },
            { field: 'region', title: '名称', span: 24, itemRender: { name: '$input', props: { placeholder: '请输入名称' } } }
          ]
        },
        {
          title: '右侧',
          span: 12,
          children: [
            { field: 'nickname', title: '昵称', span: 24, itemRender: { name: '$input', props: { placeholder: '请输入昵称' } } }
          ]
        },
        { align: 'center', span: 24, itemRender: { name: '$buttons', children: [{ props: { type: 'submit', content: '配置式表单', status: 'primary' } }, { props: { type: 'reset', content: '重置' } }] } }
      ]
    })

    const submitEvent2: VxeFormEvents.Submit = () => {
      demo2.loading2 = true
      setTimeout(() => {
        demo2.loading2 = false
        VXETable.modal.message({ content: '保存成功', status: 'success' })
      }, 1000)
    }

    const searchEvent: VxeFormEvents.Submit = () => {
      VXETable.modal.message({ content: '查询事件', status: 'info' })
    }

    const resetEvent: VxeFormEvents.Reset = () => {
      VXETable.modal.message({ content: '重置事件', status: 'info' })
    }

    return {
      demo1,
      demo2,
      submitEvent2,
      demo3,
      demo4,
      searchEvent,
      resetEvent,
      demoCodes: [
        `
        <p>
          <vxe-form :data="demo1.formData1" @submit="searchEvent" @reset="resetEvent">
            <vxe-form-item title="名称" field="name" :item-render="{}">
              <template #default>
                <vxe-input v-model="demo1.formData1.name" placeholder="请输入名称" clearable></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item title="昵称" field="nickname" :item-render="{}">
              <template #default>
                <vxe-input v-model="demo1.formData1.nickname" placeholder="请输入昵称"></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item title="性别" field="sex" :item-render="{}">
              <template #default>
                <vxe-select v-model="demo1.formData1.sex" placeholder="请选择性别" clearable>
                  <vxe-option value="1" label="女"></vxe-option>
                  <vxe-option value="2" label="男"></vxe-option>
                </vxe-select>
              </template>
            </vxe-form-item>
            <vxe-form-item>
              <template #default>
                <vxe-button type="submit" status="primary" content="默认尺寸"></vxe-button>
              </template>
            </vxe-form-item>
          </vxe-form>

          <vxe-form :data="demo1.formData1" @submit="searchEvent" @reset="resetEvent" size="medium">
            <vxe-form-item title="名称" field="name" :item-render="{}">
              <template #default>
                <vxe-input v-model="demo1.formData1.name" placeholder="请输入名称" clearable></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item title="昵称" field="nickname" :item-render="{}">
              <template #default>
                <vxe-input v-model="demo1.formData1.nickname" placeholder="请输入昵称" clearable></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item title="性别" field="sex" :item-render="{}">
              <template #default>
                <vxe-select v-model="demo1.formData1.sex" placeholder="请选择性别" clearable>
                  <vxe-option value="1" label="女"></vxe-option>
                  <vxe-option value="2" label="男"></vxe-option>
                </vxe-select>
              </template>
            </vxe-form-item>
            <vxe-form-item>
              <template #default>
                <vxe-button type="submit" status="primary" content="中等尺寸"></vxe-button>
              </template>
            </vxe-form-item>
          </vxe-form>

          <vxe-form :data="demo1.formData1" @submit="searchEvent" @reset="resetEvent" size="small">
            <vxe-form-item title="名称" field="name" :item-render="{}">
              <template #default>
                <vxe-input v-model="demo1.formData1.name" placeholder="请输入名称" clearable></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item title="昵称" field="nickname" :item-render="{}">
              <template #default>
                <vxe-input v-model="demo1.formData1.nickname" placeholder="请输入昵称" clearable></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item title="性别" field="sex" :item-render="{}">
              <template #default>
                <vxe-select v-model="demo1.formData1.sex" placeholder="请选择性别" clearable>
                  <vxe-option value="1" label="女"></vxe-option>
                  <vxe-option value="2" label="男"></vxe-option>
                </vxe-select>
              </template>
            </vxe-form-item>
            <vxe-form-item>
              <template #default>
                <vxe-button type="submit" status="primary" content="小型尺寸"></vxe-button>
              </template>
            </vxe-form-item>
          </vxe-form>

          <vxe-form :data="demo1.formData1" @submit="searchEvent" @reset="resetEvent" size="mini">
            <vxe-form-item title="名称" field="name" :item-render="{}">
              <template #default>
                <vxe-input v-model="demo1.formData1.name" placeholder="请输入名称" clearable></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item title="昵称" field="nickname" :item-render="{}">
              <template #default>
                <vxe-input v-model="demo1.formData1.nickname" placeholder="请输入昵称" clearable></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item title="性别" field="sex" :item-render="{}">
              <template #default>
                <vxe-select v-model="demo1.formData1.sex" placeholder="请选择性别" clearable>
                  <vxe-option value="1" label="女"></vxe-option>
                  <vxe-option value="2" label="男"></vxe-option>
                </vxe-select>
              </template>
            </vxe-form-item>
            <vxe-form-item>
              <template #default>
                <vxe-button type="submit" status="primary" content="超小尺寸"></vxe-button>
              </template>
            </vxe-form-item>
          </vxe-form>
        </p>

        <p>
          <vxe-form
            title-colon
            ref="xForm"
            title-align="right"
            title-width="100"
            :data="demo2.formData2"
            :rules="demo2.formRules2"
            :loading="demo2.loading2"
            @submit="submitEvent2"
            @reset="resetEvent">
            <vxe-form-gather span="12">
              <vxe-form-item title="名称" field="name" span="24"></vxe-form-item>
              <vxe-form-item title="昵称" span="24">
                <template #default>自定义 {{ demo2.formData2.nickname }}</template>
              </vxe-form-item>
              <vxe-form-item title="标题貌似有点长呢" field="sex" span="24" :item-render="{}" title-overflow>
                <template #default="params">
                  <vxe-select v-model="demo2.formData2.sex" placeholder="请选择性别" clearable @change="$refs.xForm.updateStatus(params)">
                    <vxe-option value="1" label="女"></vxe-option>
                    <vxe-option value="2" label="男"></vxe-option>
                  </vxe-select>
                </template>
              </vxe-form-item>
              <vxe-form-item title="标题貌似有点长呢" field="age" span="24" :item-render="{}" title-overflow="title">
                <template #default>
                  <vxe-input v-model="demo2.formData2.age" type="integer" placeholder="请输入年龄" clearable></vxe-input>
                </template>
              </vxe-form-item>
              <vxe-form-item title="标题貌似有点长呢" field="date" span="24" :item-render="{}" title-overflow="ellipsis">
                <template #default>
                  <vxe-input v-model="demo2.formData2.date" type="date" placeholder="请选择日期" clearable></vxe-input>
                </template>
              </vxe-form-item>
            </vxe-form-gather>
            <vxe-form-gather span="12">
              <vxe-form-item title="标题貌似有点长呢" field="address" span="24" :item-render="{}">
                <template #default>
                  <vxe-textarea v-model="demo2.formData2.address" placeholder="请输入地址" :autosize="{minRows: 6, maxRows: 10}" clearable></vxe-textarea>
                </template>
              </vxe-form-item>
            </vxe-form-gather>
            <vxe-form-item align="center" span="24">
              <template #default>
                <vxe-button type="submit" status="primary" content="基本表单"></vxe-button>
                <vxe-button type="reset" content="重置"></vxe-button>
              </template>
            </vxe-form-item>
          </vxe-form>
        </p>

        <p>
          <vxe-form :data="demo3.formData3" title-align="right" title-width="100" prevent-submit title-colon>
            <vxe-form-item title="名称" field="name" span="8" :item-render="{}">
              <template #default>
                <vxe-input v-model="demo3.formData3.name" placeholder="请输入名称" clearable></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item title="昵称" field="nickname" span="8" :item-render="{}" :title-prefix="{ message: '请输入汉字！', icon: 'fa fa-exclamation-circle' }">
              <template #default>
                <vxe-input v-model="demo3.formData3.nickname" placeholder="请输入昵称" clearable></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item title="性别" field="sex" span="8" :item-render="{}">
              <template #default>
                <vxe-select v-model="demo3.formData3.sex" placeholder="请选择性别" clearable>
                  <vxe-option value="1" label="女"></vxe-option>
                  <vxe-option value="2" label="男"></vxe-option>
                </vxe-select>
              </template>
            </vxe-form-item>
            <vxe-form-item title="年龄" field="age" span="8" :item-render="{}" :title-prefix="{ message: '请输入数值！', icon: 'fa fa-info-circle' }">
              <template #default>
                <vxe-input v-model="demo3.formData3.age" type="integer" placeholder="请输入年龄" clearable></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item title="状态" field="status" span="8" :item-render="{}">
              <template #default>
                <vxe-select v-model="demo3.formData3.status" placeholder="请选择状态" clearable>
                  <vxe-option value="0" label="失败"></vxe-option>
                  <vxe-option value="1" label="成功"></vxe-option>
                </vxe-select>
              </template>
            </vxe-form-item>
            <vxe-form-item title="是否禁用" field="active" span="8" :item-render="{}">
              <template #default>
                <vxe-switch v-model="demo3.formData3.active" open-label="是" close-label="否"></vxe-switch>
              </template>
            </vxe-form-item>
            <vxe-form-item title="体重" field="weight" span="8" :item-render="{}" folding>
              <template #default>
                <vxe-input v-model="demo3.formData3.weight" type="number" placeholder="请输入体重" clearable></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item title="日期" field="date" span="8" :item-render="{}" folding>
              <template #default>
                <vxe-input v-model="demo3.formData3.date" type="date" placeholder="请选择日期" clearable></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item title="是否单身" field="single" :item-render="{}" span="8" folding>
              <template #default>
                <vxe-radio-group v-model="demo3.formData3.single">
                  <vxe-radio label="1" content="是"></vxe-radio>
                  <vxe-radio label="0" content="否"></vxe-radio>
                </vxe-radio-group>
              </template>
            </vxe-form-item>
            <vxe-form-item title="兴趣爱好" field="flagList" :item-render="{}" span="8" folding>
              <template #default>
                <vxe-checkbox-group v-model="demo3.formData3.flagList">
                  <vxe-checkbox label="1" content="爬山"></vxe-checkbox>
                  <vxe-checkbox label="2" content="跑步"></vxe-checkbox>
                  <vxe-checkbox label="3" content="听歌"></vxe-checkbox>
                </vxe-checkbox-group>
              </template>
            </vxe-form-item>
            <vxe-form-item align="center" span="24" collapse-node>
              <template #default>
                <vxe-button status="primary" content="手动提交方式" @click="searchEvent"></vxe-button>
                <vxe-button content="重置" @click="resetEvent"></vxe-button>
              </template>
            </vxe-form-item>
          </vxe-form>
        </p>

        <p>
          <vxe-form :data="demo4.formData4" :items="demo4.formItems4"></vxe-form>
        </p>
        `,
        `
        import { defineComponent, reactive } from 'vue'
        import { VXETable, VxeFormEvents } from 'vxe-table'

        export default defineComponent({
          setup  () {
            const demo1 = reactive({
              formData1: {
                name: '',
                nickname: '',
                sex: '1'
              }
            })

            const demo2 = reactive({
              loading2: false,
              formData2: {
                name: 'test1',
                nickname: 'Testing',
                sex: '',
                age: 26,
                date: null,
                address: 左右布局''
              },
              formRules2: {
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
              }
            })

            const demo3 = reactive({
              formData3: {
                name: '',
                nickname: '',
                sex: '',
                age: 30,
                status: '1',
                weight: null,
                date: null,
                active: false,
                single: '1',
                flagList: []
              }
            })

            const demo4 = reactive({
              formData4: {
                name: '',
                nickname: '',
                sex: '0',
                role: '',
                age: 22
              },
              formItems4: [
                {
                  title: '左侧',
                  span: 12,
                  children: [
                    { field: 'name', title: '名称', span: 8, itemRender: { name: '$input', props: { placeholder: '请输入名称' } } },
                    { field: 'sex', title: '性别', span: 8, itemRender: { name: '$select', options: [{ value: '0', label: '女' }, { value: '1', label: '男' }], props: { placeholder: '请选择性别' } } },
                    { field: 'role', title: '角色', span: 8, itemRender: { name: '$input', props: { placeholder: '请输入角色' } } },
                    { field: 'age', title: '年龄', span: 24, itemRender: { name: '$input', props: { type: 'number', placeholder: '请输入年龄' } } },
                    { field: 'region', title: '名称', span: 24, itemRender: { name: '$input', props: { placeholder: '请输入名称' } } }
                  ]
                },
                {
                  title: '右侧',
                  span: 12,
                  children: [
                    { field: 'nickname', title: '昵称', span: 24, itemRender: { name: '$input', props: { placeholder: '请输入昵称' } } }
                  ]
                },
                { align: 'center', span: 24, itemRender: { name: '$buttons', children: [{ props: { type: 'submit', content: '配置式表单', status: 'primary' } }, { props: { type: 'reset', content: '重置' } }] } }
              ]
            })

            const submitEvent2: VxeFormEvents.Submit = () => {
              demo2.loading2 = true
              setTimeout(() => {
                demo2.loading2 = false
                VXETable.modal.message({ content: '保存成功', status: 'success' })
              }, 1000)
            }

            const searchEvent: VxeFormEvents.Submit = () => {
              VXETable.modal.message({ content: '查询事件', status: 'info' })
            }

            const resetEvent: VxeFormEvents.Reset = () => {
              VXETable.modal.message({ content: '重置事件', status: 'info' })
            }

            return {
              demo1,
              demo2,
              submitEvent2,
              demo3,
              demo4,
              searchEvent,
              resetEvent,
            }
          }
        }
        `
      ]
    }
  }
})
</script>
