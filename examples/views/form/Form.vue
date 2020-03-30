<template>
  <div>
    <h2>{{ $t('app.aside.nav.form') }}</h2>
    <p class="tip">查看 <router-link class="link" :to="{name: 'VXEAPI', params: {name: 'form'}}">API</router-link></p>

    <p>
      <vxe-form :data="formData1" @submit="searchEvent" @reset="resetEvent">
        <vxe-form-item title="名称" field="name">
          <vxe-input v-model="formData1.name" placeholder="请输入名称" clearable></vxe-input>
        </vxe-form-item>
        <vxe-form-item title="昵称" field="nickname">
          <vxe-input v-model="formData1.nickname" placeholder="请输入昵称"></vxe-input>
        </vxe-form-item>
        <vxe-form-item title="性别" field="sex">
          <vxe-select v-model="formData1.sex" placeholder="请选择性别" clearable>
            <vxe-option value="1" label="女"></vxe-option>
            <vxe-option value="2" label="男"></vxe-option>
          </vxe-select>
        </vxe-form-item>
        <vxe-form-item>
          <vxe-button type="submit" status="primary">默认尺寸</vxe-button>
        </vxe-form-item>
      </vxe-form>
      <vxe-form :data="formData1" @submit="searchEvent" @reset="resetEvent" size="medium">
        <vxe-form-item title="名称" field="name">
          <vxe-input v-model="formData1.name" placeholder="请输入名称" clearable></vxe-input>
        </vxe-form-item>
        <vxe-form-item title="昵称" field="nickname">
          <vxe-input v-model="formData1.nickname" placeholder="请输入昵称" clearable></vxe-input>
        </vxe-form-item>
        <vxe-form-item title="性别" field="sex">
          <vxe-select v-model="formData1.sex" placeholder="请选择性别" clearable>
            <vxe-option value="1" label="女"></vxe-option>
            <vxe-option value="2" label="男"></vxe-option>
          </vxe-select>
        </vxe-form-item>
        <vxe-form-item>
          <vxe-button type="submit" status="primary">中等尺寸</vxe-button>
        </vxe-form-item>
      </vxe-form>
      <vxe-form :data="formData1" @submit="searchEvent" @reset="resetEvent" size="small">
        <vxe-form-item title="名称" field="name">
          <vxe-input v-model="formData1.name" placeholder="请输入名称" clearable></vxe-input>
        </vxe-form-item>
        <vxe-form-item title="昵称" field="nickname">
          <vxe-input v-model="formData1.nickname" placeholder="请输入昵称" clearable></vxe-input>
        </vxe-form-item>
        <vxe-form-item title="性别" field="sex">
          <vxe-select v-model="formData1.sex" placeholder="请选择性别" clearable>
            <vxe-option value="1" label="女"></vxe-option>
            <vxe-option value="2" label="男"></vxe-option>
          </vxe-select>
        </vxe-form-item>
        <vxe-form-item>
          <vxe-button type="submit" status="primary">小型尺寸</vxe-button>
        </vxe-form-item>
      </vxe-form>
      <vxe-form :data="formData1" @submit="searchEvent" @reset="resetEvent" size="mini">
        <vxe-form-item title="名称" field="name">
          <vxe-input v-model="formData1.name" placeholder="请输入名称" clearable></vxe-input>
        </vxe-form-item>
        <vxe-form-item title="昵称" field="nickname">
          <vxe-input v-model="formData1.nickname" placeholder="请输入昵称" clearable></vxe-input>
        </vxe-form-item>
        <vxe-form-item title="性别" field="sex">
          <vxe-select v-model="formData1.sex" placeholder="请选择性别" clearable>
            <vxe-option value="1" label="女"></vxe-option>
            <vxe-option value="2" label="男"></vxe-option>
          </vxe-select>
        </vxe-form-item>
        <vxe-form-item>
          <vxe-button type="submit" status="primary">超小尺寸</vxe-button>
        </vxe-form-item>
      </vxe-form>
    </p>

    <p>
      <vxe-form ref="xForm" :data="formData2" :rules="formRules3" :loading="loading3" title-align="right" title-width="100" @submit="submitEvent3" @reset="resetEvent">
        <vxe-form-item title="名称" field="name" span="12">
          <template v-slot="scope">
            <vxe-input v-model="formData2.name" placeholder="请输入名称" clearable @input="$refs.xForm.updateStatus(scope)"></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item title="昵称" field="nickname" span="12">
          <template v-slot="scope">
            <vxe-input v-model="formData2.nickname" placeholder="请输入昵称" clearable @input="$refs.xForm.updateStatus(scope)"></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item title="性别" field="sex" span="12">
          <template v-slot="scope">
            <vxe-select v-model="formData2.sex" placeholder="请选择性别" clearable @change="$refs.xForm.updateStatus(scope)">
              <vxe-option value="1" label="女"></vxe-option>
              <vxe-option value="2" label="男"></vxe-option>
            </vxe-select>
          </template>
        </vxe-form-item>
        <vxe-form-item title="年龄" field="age" span="12">
          <vxe-input v-model="formData2.age" type="integer" placeholder="请输入年龄" clearable></vxe-input>
        </vxe-form-item>
        <vxe-form-item title="日期" field="date" span="12">
          <vxe-input v-model="formData2.date" type="date" placeholder="请选择日期" clearable></vxe-input>
        </vxe-form-item>
        <vxe-form-item title="地址" field="address" span="24">
          <vxe-textarea v-model="formData2.address" placeholder="请输入地址" clearable></vxe-textarea>
        </vxe-form-item>
        <vxe-form-item align="center" span="24">
          <vxe-button type="submit" status="primary">基本表单</vxe-button>
          <vxe-button type="reset">重置</vxe-button>
        </vxe-form-item>
      </vxe-form>
    </p>

    <p>
      <vxe-form :data="formData3" title-align="right" title-width="100" @submit="searchEvent" @reset="resetEvent" title-colon>
        <vxe-form-item title="名称" field="name" span="8">
          <vxe-input v-model="formData3.name" placeholder="请输入名称" clearable></vxe-input>
        </vxe-form-item>
        <vxe-form-item title="昵称" field="nickname" span="8" :title-prefix="{ message: '请输入汉字！', icon: 'fa fa-exclamation-circle' }">
          <vxe-input v-model="formData3.nickname" placeholder="请输入昵称" clearable></vxe-input>
        </vxe-form-item>
        <vxe-form-item title="性别" field="sex" span="8">
          <vxe-select v-model="formData3.sex" placeholder="请选择性别" clearable>
            <vxe-option value="1" label="女"></vxe-option>
            <vxe-option value="2" label="男"></vxe-option>
          </vxe-select>
        </vxe-form-item>
        <vxe-form-item title="年龄" field="age" span="8" :title-prefix="{ message: '请输入数值！', icon: 'fa fa-info-circle' }">
          <vxe-input v-model="formData3.age" type="integer" placeholder="请输入年龄" clearable></vxe-input>
        </vxe-form-item>
        <vxe-form-item title="状态" field="status" span="8">
          <vxe-select v-model="formData3.status" placeholder="请选择状态" clearable>
            <vxe-option value="0" label="失败"></vxe-option>
            <vxe-option value="1" label="成功"></vxe-option>
          </vxe-select>
        </vxe-form-item>
        <vxe-form-item title="是否禁用" field="active" span="8">
          <vxe-switch v-model="formData3.active" on-label="是" off-label="否"></vxe-switch>
        </vxe-form-item>
        <vxe-form-item title="体重" field="weight" span="8" folding>
          <vxe-input v-model="formData3.weight" type="number" placeholder="请输入体重" clearable></vxe-input>
        </vxe-form-item>
        <vxe-form-item title="日期" field="date" span="8" folding>
          <vxe-input v-model="formData3.date" type="date" placeholder="请选择日期" clearable></vxe-input>
        </vxe-form-item>
        <vxe-form-item title="是否单身" field="single" span="8" folding>
          <vxe-radio-group v-model="formData3.single">
            <vxe-radio label="1">是</vxe-radio>
            <vxe-radio label="0">否</vxe-radio>
          </vxe-radio-group>
        </vxe-form-item>
        <vxe-form-item title="兴趣爱好" field="flagList" span="8" folding>
          <vxe-checkbox-group v-model="formData3.flagList">
            <vxe-checkbox label="1">爬山</vxe-checkbox>
            <vxe-checkbox label="2">跑步</vxe-checkbox>
            <vxe-checkbox label="3">听歌</vxe-checkbox>
          </vxe-checkbox-group>
        </vxe-form-item>
        <vxe-form-item align="center" span="24" collapse-node>
          <vxe-button type="submit" status="primary">折叠式表单</vxe-button>
          <vxe-button type="reset">重置</vxe-button>
        </vxe-form-item>
      </vxe-form>
    </p>

    <p>
      <vxe-form :data="formData4" :items="formItems4"></vxe-form>
    </p>

    <pre>
      <code>
        | Tab | 切换到上一个 |
        | Shift Tab | 切换到下一个 |
        | Enter | 如果有存在提交按钮则提交表单 |
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
import hljs from 'highlight.js'

export default {
  data  () {
    return {
      formData1: {
        name: '',
        nickname: '',
        sex: '1'
      },
      loading3: false,
      formData2: {
        name: '',
        nickname: '',
        sex: '',
        age: 26,
        date: null,
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
      },
      formData4: {
        name: '',
        nickname: '',
        sex: '0',
        role: '',
        age: 22
      },
      formItems4: [
        { field: 'name', title: '名称', span: 8, itemRender: { name: '$input', props: { placeholder: '请输入名称' } } },
        { field: 'nickname', title: '昵称', span: 8, itemRender: { name: '$input', props: { placeholder: '请输入昵称' } } },
        { field: 'sex', title: '性别', span: 8, itemRender: { name: '$select', options: [{ value: '0', label: '女' }, { value: '1', label: '男' }], props: { placeholder: '请选择性别' } } },
        { field: 'role', title: '角色', span: 8, itemRender: { name: '$input', props: { placeholder: '请输入角色' } } },
        { field: 'age', title: '年龄', span: 8, itemRender: { name: '$input', props: { type: 'number', placeholder: '请输入年龄' } } },
        { field: 'region', title: '名称', span: 8, itemRender: { name: '$input', props: { placeholder: '请输入名称' } } },
        { align: 'center', span: 24, itemRender: { name: '$buttons', children: [{ props: { type: 'submit', content: '配置式表单', status: 'primary' } }, { props: { type: 'reset', content: '重置' } }] } }
      ],
      demoCodes: [
        `
        <p>
          <vxe-form :data="formData1" @submit="searchEvent" @reset="resetEvent">
            <vxe-form-item title="名称" field="name">
              <vxe-input v-model="formData1.name" placeholder="请输入名称" clearable></vxe-input>
            </vxe-form-item>
            <vxe-form-item title="昵称" field="nickname">
              <vxe-input v-model="formData1.nickname" placeholder="请输入昵称"></vxe-input>
            </vxe-form-item>
            <vxe-form-item title="性别" field="sex">
              <vxe-select v-model="formData1.sex" placeholder="请选择性别" clearable>
                <vxe-option value="1" label="女"></vxe-option>
                <vxe-option value="2" label="男"></vxe-option>
              </vxe-select>
            </vxe-form-item>
            <vxe-form-item>
              <vxe-button type="submit" status="primary">默认尺寸</vxe-button>
            </vxe-form-item>
          </vxe-form>
          <vxe-form :data="formData1" @submit="searchEvent" @reset="resetEvent" size="medium">
            <vxe-form-item title="名称" field="name">
              <vxe-input v-model="formData1.name" placeholder="请输入名称" clearable></vxe-input>
            </vxe-form-item>
            <vxe-form-item title="昵称" field="nickname">
              <vxe-input v-model="formData1.nickname" placeholder="请输入昵称" clearable></vxe-input>
            </vxe-form-item>
            <vxe-form-item title="性别" field="sex">
              <vxe-select v-model="formData1.sex" placeholder="请选择性别" clearable>
                <vxe-option value="1" label="女"></vxe-option>
                <vxe-option value="2" label="男"></vxe-option>
              </vxe-select>
            </vxe-form-item>
            <vxe-form-item>
              <vxe-button type="submit" status="primary">中等尺寸</vxe-button>
            </vxe-form-item>
          </vxe-form>
          <vxe-form :data="formData1" @submit="searchEvent" @reset="resetEvent" size="small">
            <vxe-form-item title="名称" field="name">
              <vxe-input v-model="formData1.name" placeholder="请输入名称" clearable></vxe-input>
            </vxe-form-item>
            <vxe-form-item title="昵称" field="nickname">
              <vxe-input v-model="formData1.nickname" placeholder="请输入昵称" clearable></vxe-input>
            </vxe-form-item>
            <vxe-form-item title="性别" field="sex">
              <vxe-select v-model="formData1.sex" placeholder="请选择性别" clearable>
                <vxe-option value="1" label="女"></vxe-option>
                <vxe-option value="2" label="男"></vxe-option>
              </vxe-select>
            </vxe-form-item>
            <vxe-form-item>
              <vxe-button type="submit" status="primary">小型尺寸</vxe-button>
            </vxe-form-item>
          </vxe-form>
          <vxe-form :data="formData1" @submit="searchEvent" @reset="resetEvent" size="mini">
            <vxe-form-item title="名称" field="name">
              <vxe-input v-model="formData1.name" placeholder="请输入名称" clearable></vxe-input>
            </vxe-form-item>
            <vxe-form-item title="昵称" field="nickname">
              <vxe-input v-model="formData1.nickname" placeholder="请输入昵称" clearable></vxe-input>
            </vxe-form-item>
            <vxe-form-item title="性别" field="sex">
              <vxe-select v-model="formData1.sex" placeholder="请选择性别" clearable>
                <vxe-option value="1" label="女"></vxe-option>
                <vxe-option value="2" label="男"></vxe-option>
              </vxe-select>
            </vxe-form-item>
            <vxe-form-item>
              <vxe-button type="submit" status="primary">超小尺寸</vxe-button>
            </vxe-form-item>
          </vxe-form>
        </p>

        <p>
          <vxe-form ref="xForm" :data="formData2" :rules="formRules3" :loading="loading3" title-align="right" title-width="100" @submit="submitEvent3" @reset="resetEvent">
            <vxe-form-item title="名称" field="name" span="12">
              <template v-slot="scope">
                <vxe-input v-model="formData2.name" placeholder="请输入名称" clearable @input="$refs.xForm.updateStatus(scope)"></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item title="昵称" field="nickname" span="12">
              <template v-slot="scope">
                <vxe-input v-model="formData2.nickname" placeholder="请输入昵称" clearable @input="$refs.xForm.updateStatus(scope)"></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item title="性别" field="sex" span="12">
              <template v-slot="scope">
                <vxe-select v-model="formData2.sex" placeholder="请选择性别" clearable @change="$refs.xForm.updateStatus(scope)">
                  <vxe-option value="1" label="女"></vxe-option>
                  <vxe-option value="2" label="男"></vxe-option>
                </vxe-select>
              </template>
            </vxe-form-item>
            <vxe-form-item title="年龄" field="age" span="12">
              <vxe-input v-model="formData2.age" type="integer" placeholder="请输入年龄" clearable></vxe-input>
            </vxe-form-item>
            <vxe-form-item title="日期" field="date" span="12">
              <vxe-input v-model="formData2.date" type="date" placeholder="请选择日期" clearable></vxe-input>
            </vxe-form-item>
            <vxe-form-item title="地址" field="address" span="24">
              <vxe-textarea v-model="formData2.address" placeholder="请输入地址" clearable></vxe-textarea>
            </vxe-form-item>
            <vxe-form-item align="center" span="24">
              <vxe-button type="submit" status="primary">基本表单</vxe-button>
              <vxe-button type="reset">重置</vxe-button>
            </vxe-form-item>
          </vxe-form>
        </p>

        <p>
          <vxe-form :data="formData3" title-align="right" title-width="100" @submit="searchEvent" @reset="resetEvent" title-colon>
            <vxe-form-item title="名称" field="name" span="8">
              <vxe-input v-model="formData3.name" placeholder="请输入名称" clearable></vxe-input>
            </vxe-form-item>
            <vxe-form-item title="昵称" field="nickname" span="8" :title-prefix="{ message: '请输入汉字！', icon: 'fa fa-exclamation-circle' }">
              <vxe-input v-model="formData3.nickname" placeholder="请输入昵称" clearable></vxe-input>
            </vxe-form-item>
            <vxe-form-item title="性别" field="sex" span="8">
              <vxe-select v-model="formData3.sex" placeholder="请选择性别" clearable>
                <vxe-option value="1" label="女"></vxe-option>
                <vxe-option value="2" label="男"></vxe-option>
              </vxe-select>
            </vxe-form-item>
            <vxe-form-item title="年龄" field="age" span="8" :title-prefix="{ message: '请输入数值！', icon: 'fa fa-info-circle' }">
              <vxe-input v-model="formData3.age" type="integer" placeholder="请输入年龄" clearable></vxe-input>
            </vxe-form-item>
            <vxe-form-item title="状态" field="status" span="8">
              <vxe-select v-model="formData3.status" placeholder="请选择状态" clearable>
                <vxe-option value="0" label="失败"></vxe-option>
                <vxe-option value="1" label="成功"></vxe-option>
              </vxe-select>
            </vxe-form-item>
            <vxe-form-item title="是否禁用" field="active" span="8" folding>
              <vxe-switch v-model="formData3.active" on-label="是" off-label="否"></vxe-switch>
            </vxe-form-item>
            <vxe-form-item title="体重" field="weight" span="8" folding>
              <vxe-input v-model="formData3.weight" type="number" placeholder="请输入体重" clearable></vxe-input>
            </vxe-form-item>
            <vxe-form-item title="日期" field="date" span="8" folding>
              <vxe-input v-model="formData3.date" type="date" placeholder="请选择日期" clearable></vxe-input>
            </vxe-form-item>
            <vxe-form-item title="是否单身" field="single" span="8" folding>
              <vxe-radio-group v-model="formData3.single">
                <vxe-radio label="1">是</vxe-radio>
                <vxe-radio label="0">否</vxe-radio>
              </vxe-radio-group>
            </vxe-form-item>
            <vxe-form-item title="兴趣爱好" field="flagList" span="8" folding>
              <vxe-checkbox-group v-model="formData3.flagList">
                <vxe-checkbox label="1">爬山</vxe-checkbox>
                <vxe-checkbox label="2">跑步</vxe-checkbox>
                <vxe-checkbox label="3">听歌</vxe-checkbox>
              </vxe-checkbox-group>
            </vxe-form-item>
            <vxe-form-item align="center" span="24" collapse-node>
              <vxe-button type="submit" status="primary">折叠式表单</vxe-button>
              <vxe-button type="reset">重置</vxe-button>
            </vxe-form-item>
          </vxe-form>
        </p>

        <p>
          <vxe-form :data="formData4" :items="formItems4"></vxe-form>
        </p>
        `,
        `
        export default {
          data () {
            return {
              formData1: {
                name: '',
                nickname: '',
                sex: '1'
              },
              loading3: false,
              formData2: {
                name: '',
                nickname: '',
                sex: '',
                age: 26,
                date: null,
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
              },
              formData4: {
                name: '',
                nickname: '',
                sex: '0',
                role: '',
                age: 22
              },
              formItems4: [
                { field: 'name', title: '名称', span: 8, itemRender: { name: '$input', props: { placeholder: '请输入名称' } } },
                { field: 'nickname', title: '昵称', span: 8, itemRender: { name: '$input', props: { placeholder: '请输入昵称' } } },
                { field: 'sex', title: '性别', span: 8, itemRender: { name: '$select', options: [{ value: '0', label: '女' }, { value: '1', label: '男' }], props: { placeholder: '请选择性别' } } },
                { field: 'role', title: '角色', span: 8, itemRender: { name: '$input', props: { placeholder: '请输入角色' } } },
                { field: 'age', title: '年龄', span: 8, itemRender: { name: '$input', props: { type: 'number', placeholder: '请输入年龄' } } },
                { field: 'region', title: '名称', span: 8, itemRender: { name: '$input', props: { placeholder: '请输入名称' } } },
                { align: 'center', span: 24, itemRender: { name: '$buttons', children: [{ props: { type: 'submit', content: '配置式表单', status: 'primary' } }, { props: { type: 'reset', content: '重置' } }] } }
              ]
            }
          },
          methods: {
            submitEvent3 () {
              this.loading3 = true
              setTimeout(() => {
                this.loading3 = false
                this.$XModal.message({ message: '保存成功', status: 'success' })
              }, 1000)
            },
            searchEvent () {
              this.$XModal.message({ message: '查询事件', status: 'info' })
            },
            resetEvent () {
              this.$XModal.message({ message: '重置事件', status: 'info' })
            }
          }
        }
        `
      ]
    }
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    submitEvent3 () {
      this.loading3 = true
      setTimeout(() => {
        this.loading3 = false
        this.$XModal.message({ message: '保存成功', status: 'success' })
      }, 1000)
    },
    searchEvent () {
      this.$XModal.message({ message: '查询事件', status: 'info' })
    },
    resetEvent () {
      this.$XModal.message({ message: '重置事件', status: 'info' })
    }
  }
}
</script>
