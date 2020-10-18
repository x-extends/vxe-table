<template>
  <div>
    <h2>{{ $t('app.aside.nav.form') }}</h2>
    <p class="tip">表单，查看 <router-link class="link" :to="{name: 'VXEAPI', params: {name: 'form'}}">API</router-link>，可以通过 <router-link class="link" :to="{name: 'StartGlobal'}">setup</router-link> 设置全局参数</p>

    <p>
      <vxe-form :data="formData1" @submit="searchEvent" @reset="resetEvent">
        <vxe-form-item title="名称" field="name">
          <template v-slot>
            <vxe-input v-model="formData1.name" placeholder="请输入名称" clearable></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item title="昵称" field="nickname">
          <template v-slot>
            <vxe-input v-model="formData1.nickname" placeholder="请输入昵称"></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item title="性别" field="sex">
          <template v-slot>
            <vxe-select v-model="formData1.sex" placeholder="请选择性别" clearable>
              <vxe-option value="1" label="女"></vxe-option>
              <vxe-option value="2" label="男"></vxe-option>
            </vxe-select>
          </template>
        </vxe-form-item>
        <vxe-form-item>
          <template v-slot>
            <vxe-button type="submit" status="primary">默认尺寸</vxe-button>
          </template>
        </vxe-form-item>
      </vxe-form>
      <vxe-form :data="formData1" @submit="searchEvent" @reset="resetEvent" size="medium">
        <vxe-form-item title="名称" field="name">
          <template v-slot>
            <vxe-input v-model="formData1.name" placeholder="请输入名称" clearable></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item title="昵称" field="nickname">
          <template v-slot>
            <vxe-input v-model="formData1.nickname" placeholder="请输入昵称" clearable></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item title="性别" field="sex">
          <template v-slot>
            <vxe-select v-model="formData1.sex" placeholder="请选择性别" clearable>
              <vxe-option value="1" label="女"></vxe-option>
              <vxe-option value="2" label="男"></vxe-option>
            </vxe-select>
          </template>
        </vxe-form-item>
        <vxe-form-item>
          <template v-slot>
            <vxe-button type="submit" status="primary">中等尺寸</vxe-button>
          </template>
        </vxe-form-item>
      </vxe-form>
      <vxe-form :data="formData1" @submit="searchEvent" @reset="resetEvent" size="small">
        <vxe-form-item title="名称" field="name">
          <template v-slot>
            <vxe-input v-model="formData1.name" placeholder="请输入名称" clearable></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item title="昵称" field="nickname">
          <template v-slot>
            <vxe-input v-model="formData1.nickname" placeholder="请输入昵称" clearable></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item title="性别" field="sex">
          <template v-slot>
            <vxe-select v-model="formData1.sex" placeholder="请选择性别" clearable>
              <vxe-option value="1" label="女"></vxe-option>
              <vxe-option value="2" label="男"></vxe-option>
            </vxe-select>
          </template>
        </vxe-form-item>
        <vxe-form-item>
          <template v-slot>
            <vxe-button type="submit" status="primary">小型尺寸</vxe-button>
          </template>
        </vxe-form-item>
      </vxe-form>
      <vxe-form :data="formData1" @submit="searchEvent" @reset="resetEvent" size="mini">
        <vxe-form-item title="名称" field="name">
          <template v-slot>
            <vxe-input v-model="formData1.name" placeholder="请输入名称" clearable></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item title="昵称" field="nickname">
          <template v-slot>
            <vxe-input v-model="formData1.nickname" placeholder="请输入昵称" clearable></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item title="性别" field="sex">
          <template v-slot>
            <vxe-select v-model="formData1.sex" placeholder="请选择性别" clearable>
              <vxe-option value="1" label="女"></vxe-option>
              <vxe-option value="2" label="男"></vxe-option>
            </vxe-select>
          </template>
        </vxe-form-item>
        <vxe-form-item>
          <template v-slot>
            <vxe-button type="submit" status="primary">超小尺寸</vxe-button>
          </template>
        </vxe-form-item>
      </vxe-form>
    </p>

    <p>
      <vxe-form
        ref="xForm"
        class="my-form2"
        title-align="right"
        title-width="100"
        :data="formData2"
        :rules="formRules2"
        :loading="loading2"
        @submit="submitEvent2"
        @reset="resetEvent">
        <vxe-form-item title="名称" field="name" span="24">
          <template v-slot="scope">
            <vxe-input v-model="formData2.name" placeholder="请输入名称" clearable @input="$refs.xForm.updateStatus(scope)"></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item title="昵称" field="nickname" span="24">
          <template v-slot="scope">
            <vxe-input v-model="formData2.nickname" placeholder="请输入昵称" clearable @input="$refs.xForm.updateStatus(scope)"></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item title="性别" field="sex" span="24">
          <template v-slot="scope">
            <vxe-select v-model="formData2.sex" placeholder="请选择性别" clearable @change="$refs.xForm.updateStatus(scope)">
              <vxe-option value="1" label="女"></vxe-option>
              <vxe-option value="2" label="男"></vxe-option>
            </vxe-select>
          </template>
        </vxe-form-item>
        <vxe-form-item title="年龄" field="age" span="24">
          <template v-slot>
            <vxe-input v-model="formData2.age" type="integer" placeholder="请输入年龄" clearable></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item title="日期" field="date" span="24">
          <template v-slot>
            <vxe-input v-model="formData2.date" type="date" placeholder="请选择日期" clearable></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item title="地址" field="address" span="24">
          <template v-slot>
            <vxe-textarea v-model="formData2.address" placeholder="请输入地址" clearable></vxe-textarea>
          </template>
        </vxe-form-item>
        <vxe-form-item align="center" span="24">
          <template v-slot>
            <vxe-button type="submit" status="primary">基本表单</vxe-button>
            <vxe-button type="reset">重置</vxe-button>
          </template>
        </vxe-form-item>
      </vxe-form>
    </p>

    <p>
      <vxe-form :data="formData3" title-align="right" title-width="100" prevent-submit title-colon>
        <vxe-form-item title="名称" field="name" span="8">
          <template v-slot>
            <vxe-input v-model="formData3.name" placeholder="请输入名称" clearable></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item title="昵称" field="nickname" span="8" :title-prefix="{ message: '请输入汉字！', icon: 'fa fa-exclamation-circle' }">
          <template v-slot>
            <vxe-input v-model="formData3.nickname" placeholder="请输入昵称" clearable></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item title="性别" field="sex" span="8">
          <template v-slot>
            <vxe-select v-model="formData3.sex" placeholder="请选择性别" clearable>
              <vxe-option value="1" label="女"></vxe-option>
              <vxe-option value="2" label="男"></vxe-option>
            </vxe-select>
          </template>
        </vxe-form-item>
        <vxe-form-item title="年龄" field="age" span="8" :title-prefix="{ message: '请输入数值！', icon: 'fa fa-info-circle' }">
          <template v-slot>
            <vxe-input v-model="formData3.age" type="integer" placeholder="请输入年龄" clearable></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item title="状态" field="status" span="8">
          <template v-slot>
            <vxe-select v-model="formData3.status" placeholder="请选择状态" clearable>
              <vxe-option value="0" label="失败"></vxe-option>
              <vxe-option value="1" label="成功"></vxe-option>
            </vxe-select>
          </template>
        </vxe-form-item>
        <vxe-form-item title="是否禁用" field="active" span="8">
          <template v-slot>
            <vxe-switch v-model="formData3.active" open-label="是" close-label="否"></vxe-switch>
          </template>
        </vxe-form-item>
        <vxe-form-item title="体重" field="weight" span="8" folding>
          <template v-slot>
            <vxe-input v-model="formData3.weight" type="number" placeholder="请输入体重" clearable></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item title="日期" field="date" span="8" folding>
          <template v-slot>
            <vxe-input v-model="formData3.date" type="date" placeholder="请选择日期" clearable></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item title="是否单身" field="single" span="8" folding>
          <template v-slot>
            <vxe-radio-group v-model="formData3.single">
              <vxe-radio label="1">是</vxe-radio>
              <vxe-radio label="0">否</vxe-radio>
            </vxe-radio-group>
          </template>
        </vxe-form-item>
        <vxe-form-item title="兴趣爱好" field="flagList" span="8" folding>
          <template v-slot>
            <vxe-checkbox-group v-model="formData3.flagList">
              <vxe-checkbox label="1">爬山</vxe-checkbox>
              <vxe-checkbox label="2">跑步</vxe-checkbox>
              <vxe-checkbox label="3">听歌</vxe-checkbox>
            </vxe-checkbox-group>
          </template>
        </vxe-form-item>
        <vxe-form-item align="center" span="24" collapse-node>
          <template v-slot>
            <vxe-button status="primary" @click="searchEvent">手动提交方式</vxe-button>
            <vxe-button @click="resetEvent">重置</vxe-button>
          </template>
        </vxe-form-item>
      </vxe-form>
    </p>

    <p>
      <vxe-form :data="formData4" :items="formItems4"></vxe-form>
    </p>

    <pre>
      <pre-code>
        | Tab | 切换到上一个 |
        | Shift Tab | 切换到下一个 |
        | Enter | （prevent-submit 不为 false）如果有存在提交按钮则提交表单 |
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
      formData1: {
        name: '',
        nickname: '',
        sex: '1'
      },
      loading2: false,
      formData2: {
        name: '',
        nickname: '',
        sex: '',
        age: 26,
        date: null,
        address: null
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
              <template v-slot>
                <vxe-input v-model="formData1.name" placeholder="请输入名称" clearable></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item title="昵称" field="nickname">
              <template v-slot>
                <vxe-input v-model="formData1.nickname" placeholder="请输入昵称"></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item title="性别" field="sex">
              <template v-slot>
                <vxe-select v-model="formData1.sex" placeholder="请选择性别" clearable>
                  <vxe-option value="1" label="女"></vxe-option>
                  <vxe-option value="2" label="男"></vxe-option>
                </vxe-select>
              </template>
            </vxe-form-item>
            <vxe-form-item>
              <template v-slot>
                <vxe-button type="submit" status="primary">默认尺寸</vxe-button>
              </template>
            </vxe-form-item>
          </vxe-form>
          <vxe-form :data="formData1" @submit="searchEvent" @reset="resetEvent" size="medium">
            <vxe-form-item title="名称" field="name">
              <template v-slot>
                <vxe-input v-model="formData1.name" placeholder="请输入名称" clearable></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item title="昵称" field="nickname">
              <template v-slot>
                <vxe-input v-model="formData1.nickname" placeholder="请输入昵称" clearable></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item title="性别" field="sex">
              <template v-slot>
                <vxe-select v-model="formData1.sex" placeholder="请选择性别" clearable>
                  <vxe-option value="1" label="女"></vxe-option>
                  <vxe-option value="2" label="男"></vxe-option>
                </vxe-select>
              </template>
            </vxe-form-item>
            <vxe-form-item>
              <template v-slot>
                <vxe-button type="submit" status="primary">中等尺寸</vxe-button>
              </template>
            </vxe-form-item>
          </vxe-form>
          <vxe-form :data="formData1" @submit="searchEvent" @reset="resetEvent" size="small">
            <vxe-form-item title="名称" field="name">
              <template v-slot>
                <vxe-input v-model="formData1.name" placeholder="请输入名称" clearable></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item title="昵称" field="nickname">
              <template v-slot>
                <vxe-input v-model="formData1.nickname" placeholder="请输入昵称" clearable></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item title="性别" field="sex">
              <template v-slot>
                <vxe-select v-model="formData1.sex" placeholder="请选择性别" clearable>
                  <vxe-option value="1" label="女"></vxe-option>
                  <vxe-option value="2" label="男"></vxe-option>
                </vxe-select>
              </template>
            </vxe-form-item>
            <vxe-form-item>
              <template v-slot>
                <vxe-button type="submit" status="primary">小型尺寸</vxe-button>
              </template>
            </vxe-form-item>
          </vxe-form>
          <vxe-form :data="formData1" @submit="searchEvent" @reset="resetEvent" size="mini">
            <vxe-form-item title="名称" field="name">
              <template v-slot>
                <vxe-input v-model="formData1.name" placeholder="请输入名称" clearable></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item title="昵称" field="nickname">
              <template v-slot>
                <vxe-input v-model="formData1.nickname" placeholder="请输入昵称" clearable></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item title="性别" field="sex">
              <template v-slot>
                <vxe-select v-model="formData1.sex" placeholder="请选择性别" clearable>
                  <vxe-option value="1" label="女"></vxe-option>
                  <vxe-option value="2" label="男"></vxe-option>
                </vxe-select>
              </template>
            </vxe-form-item>
            <vxe-form-item>
              <template v-slot>
                <vxe-button type="submit" status="primary">超小尺寸</vxe-button>
              </template>
            </vxe-form-item>
          </vxe-form>
        </p>

        <p>
          <vxe-form
            ref="xForm"
            class="my-form2"
            title-align="right"
            title-width="100"
            :data="formData2"
            :rules="formRules2"
            :loading="loading2"
            @submit="submitEvent2"
            @reset="resetEvent">
            <vxe-form-item title="名称" field="name" span="24">
              <template v-slot="scope">
                <vxe-input v-model="formData2.name" placeholder="请输入名称" clearable @input="$refs.xForm.updateStatus(scope)"></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item title="昵称" field="nickname" span="24">
              <template v-slot="scope">
                <vxe-input v-model="formData2.nickname" placeholder="请输入昵称" clearable @input="$refs.xForm.updateStatus(scope)"></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item title="性别" field="sex" span="24">
              <template v-slot="scope">
                <vxe-select v-model="formData2.sex" placeholder="请选择性别" clearable @change="$refs.xForm.updateStatus(scope)">
                  <vxe-option value="1" label="女"></vxe-option>
                  <vxe-option value="2" label="男"></vxe-option>
                </vxe-select>
              </template>
            </vxe-form-item>
            <vxe-form-item title="年龄" field="age" span="24">
              <template v-slot>
                <vxe-input v-model="formData2.age" type="integer" placeholder="请输入年龄" clearable></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item title="日期" field="date" span="24">
              <template v-slot>
                <vxe-input v-model="formData2.date" type="date" placeholder="请选择日期" clearable></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item title="地址" field="address" span="24">
              <template v-slot>
                <vxe-textarea v-model="formData2.address" placeholder="请输入地址" clearable></vxe-textarea>
              </template>
            </vxe-form-item>
            <vxe-form-item align="center" span="24">
              <template v-slot>
                <vxe-button type="submit" status="primary">基本表单</vxe-button>
                <vxe-button type="reset">重置</vxe-button>
              </template>
            </vxe-form-item>
          </vxe-form>
        </p>

        <p>
          <vxe-form :data="formData3" title-align="right" title-width="100" prevent-submit title-colon>
            <vxe-form-item title="名称" field="name" span="8">
              <template v-slot>
                <vxe-input v-model="formData3.name" placeholder="请输入名称" clearable></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item title="昵称" field="nickname" span="8" :title-prefix="{ message: '请输入汉字！', icon: 'fa fa-exclamation-circle' }">
              <template v-slot>
                <vxe-input v-model="formData3.nickname" placeholder="请输入昵称" clearable></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item title="性别" field="sex" span="8">
              <template v-slot>
                <vxe-select v-model="formData3.sex" placeholder="请选择性别" clearable>
                  <vxe-option value="1" label="女"></vxe-option>
                  <vxe-option value="2" label="男"></vxe-option>
                </vxe-select>
              </template>
            </vxe-form-item>
            <vxe-form-item title="年龄" field="age" span="8" :title-prefix="{ message: '请输入数值！', icon: 'fa fa-info-circle' }">
              <template v-slot>
                <vxe-input v-model="formData3.age" type="integer" placeholder="请输入年龄" clearable></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item title="状态" field="status" span="8">
              <template v-slot>
                <vxe-select v-model="formData3.status" placeholder="请选择状态" clearable>
                  <vxe-option value="0" label="失败"></vxe-option>
                  <vxe-option value="1" label="成功"></vxe-option>
                </vxe-select>
              </template>
            </vxe-form-item>
            <vxe-form-item title="是否禁用" field="active" span="8">
              <template v-slot>
                <vxe-switch v-model="formData3.active" open-label="是" close-label="否"></vxe-switch>
              </template>
            </vxe-form-item>
            <vxe-form-item title="体重" field="weight" span="8" folding>
              <template v-slot>
                <vxe-input v-model="formData3.weight" type="number" placeholder="请输入体重" clearable></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item title="日期" field="date" span="8" folding>
              <template v-slot>
                <vxe-input v-model="formData3.date" type="date" placeholder="请选择日期" clearable></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item title="是否单身" field="single" span="8" folding>
              <template v-slot>
                <vxe-radio-group v-model="formData3.single">
                  <vxe-radio label="1">是</vxe-radio>
                  <vxe-radio label="0">否</vxe-radio>
                </vxe-radio-group>
              </template>
            </vxe-form-item>
            <vxe-form-item title="兴趣爱好" field="flagList" span="8" folding>
              <template v-slot>
                <vxe-checkbox-group v-model="formData3.flagList">
                  <vxe-checkbox label="1">爬山</vxe-checkbox>
                  <vxe-checkbox label="2">跑步</vxe-checkbox>
                  <vxe-checkbox label="3">听歌</vxe-checkbox>
                </vxe-checkbox-group>
              </template>
            </vxe-form-item>
            <vxe-form-item align="center" span="24" collapse-node>
              <template v-slot>
                <vxe-button status="primary" @click="searchEvent">手动提交方式</vxe-button>
                <vxe-button @click="resetEvent">重置</vxe-button>
              </template>
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
              loading2: false,
              formData2: {
                name: '',
                nickname: '',
                sex: '',
                age: 26,
                date: null,
                address: null
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
            submitEvent2 () {
              this.loading2 = true
              setTimeout(() => {
                this.loading2 = false
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
        `,
        `
        .my-form2 {
          width: 400px;
        }
        `
      ]
    }
  },
  methods: {
    submitEvent2 () {
      this.loading2 = true
      setTimeout(() => {
        this.loading2 = false
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

<style scoped>
.my-form2 {
  width: 400px;
}
</style>
