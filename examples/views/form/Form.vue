<template>
  <div>
    <h2>表单</h2>
    <p class="tip">查看 <router-link class="link" :to="{name: 'VXEAPI', params: {name: 'form'}}">API</router-link></p>

    <p>
      <vxe-form :data="formData1" @submit="searchEvent" @reset="resetEvent">
        <vxe-form-item title="名称" field="name">
          <template>
            <vxe-input v-model="formData1.name" placeholder="请输入名称"></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item title="昵称" field="nickname">
          <template>
            <vxe-input v-model="formData1.nickname" placeholder="请输入昵称"></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item title="性别" field="sex">
          <select v-model="formData1.sex" class="vxe-select">
            <option value="0"></option>
            <option value="1">女</option>
            <option value="2">男</option>
          </select>
        </vxe-form-item>
        <vxe-form-item>
          <template>
            <vxe-button type="submit" status="primary">查询</vxe-button>
          </template>
        </vxe-form-item>
      </vxe-form>
    </p>

    <!-- <p>
      <vxe-form :data="formData2" @submit="searchEvent" @reset="resetEvent">
        <vxe-form-item title="名称" field="name" span="8">
          <template>
            <vxe-input v-model="formData2.name" placeholder="请输入名称"></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item title="昵称" field="nickname" span="8">
          <template>
            <vxe-input v-model="formData2.nickname" placeholder="请输入昵称"></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item title="性别" field="sex" span="8">
          <select v-model="formData2.sex" class="vxe-select">
            <option value="0"></option>
            <option value="1">女</option>
            <option value="2">男</option>
          </select>
        </vxe-form-item>
        <vxe-form-item title="角色" field="role" span="8">
          <template>
            <vxe-input v-model="formData2.role" placeholder="请输入角色"></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item title="年龄" field="age" span="8">
          <template>
            <vxe-input v-model="formData2.age" type="number" placeholder="请输入年龄"></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item title="区域" field="region" span="8">
          <template>
            <vxe-input v-model="formData2.region" placeholder="请输入区域"></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item align="center" span="24">
          <template>
            <vxe-button type="submit" status="primary">查询</vxe-button>
            <vxe-button type="reset">重置</vxe-button>
          </template>
        </vxe-form-item>
      </vxe-form>
    </div> -->

    <p>
      <vxe-form :data="formData3" title-align="right" title-width="100" @submit="searchEvent" @reset="resetEvent">
        <vxe-form-item title="名称" field="name" span="12">
          <template>
            <vxe-input v-model="formData3.name" placeholder="请输入名称"></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item title="昵称" field="nickname" span="12">
          <template>
            <vxe-input v-model="formData3.nickname" placeholder="请输入昵称"></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item title="性别" field="sex" span="12">
          <select v-model="formData3.sex" class="vxe-select">
            <option value="0"></option>
            <option value="1">女</option>
            <option value="2">男</option>
          </select>
        </vxe-form-item>
        <vxe-form-item title="年龄" field="age" span="12">
          <template>
            <vxe-input v-model="formData3.age" type="number" placeholder="请输入年龄"></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item title="地址" field="address" span="24">
          <template>
            <vxe-textarea v-model="formData3.address" placeholder="请输入地址"></vxe-textarea>
          </template>
        </vxe-form-item>
        <vxe-form-item align="center" span="24">
          <template>
            <vxe-button type="submit" status="primary">查询</vxe-button>
            <vxe-button type="reset">重置</vxe-button>
          </template>
        </vxe-form-item>
      </vxe-form>
    </p>

    <p>
      <vxe-form :data="formData4" title-align="right" title-width="100" @submit="searchEvent" @reset="resetEvent">
        <vxe-form-item title="名称" field="name" span="8">
          <template>
            <vxe-input v-model="formData4.name" placeholder="请输入名称"></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item title="昵称" field="nickname" span="8" :title-prefix="{ message: '请输入汉字！', icon: 'fa fa-exclamation-circle' }">
          <template>
            <vxe-input v-model="formData4.nickname" placeholder="请输入昵称"></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item title="性别" field="sex" span="8">
          <select v-model="formData4.sex" class="vxe-select">
            <option value="0"></option>
            <option value="1">女</option>
            <option value="2">男</option>
          </select>
        </vxe-form-item>
        <vxe-form-item title="年龄" field="age" span="8" :title-prefix="{ message: '请输入数值！', icon: 'fa fa-info-circle' }">
          <template>
            <vxe-input v-model="formData4.age" type="number" placeholder="请输入年龄"></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item title="区域" field="region" span="8">
          <template>
            <vxe-input v-model="formData2.region" placeholder="请输入区域"></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item title="状态" field="status" span="8">
          <select v-model="formData4.status" class="vxe-select">
            <option value=""></option>
            <option value="0">失败</option>
            <option value="1">成功</option>
          </select>
        </vxe-form-item>
        <vxe-form-item title="身高" field="height" span="8" folding>
          <vxe-input v-model="formData4.height" placeholder="请输入身高"></vxe-input>
        </vxe-form-item>
        <vxe-form-item title="体重" field="weight" span="8" folding>
          <vxe-input v-model="formData4.weight" placeholder="请输入体重"></vxe-input>
        </vxe-form-item>
        <vxe-form-item title="是否单身" field="single" span="8" folding>
          <vxe-radio v-model="formData4.single" name="single" label="1">是</vxe-radio>
          <vxe-radio v-model="formData4.single" name="single" label="0">否</vxe-radio>
        </vxe-form-item>
        <vxe-form-item align="center" span="24" collapse-node>
          <template>
            <vxe-button type="submit" status="primary">查询</vxe-button>
            <vxe-button type="reset">重置</vxe-button>
          </template>
        </vxe-form-item>
      </vxe-form>
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
      formData1: {
        name: '',
        nickname: '',
        sex: '1'
      },
      formData2: {
        name: '',
        nickname: '',
        sex: '0',
        role: '',
        age: 22,
        region: null
      },
      formData3: {
        name: '',
        nickname: '',
        sex: '0',
        age: 26,
        address: null
      },
      formData4: {
        name: '',
        nickname: '',
        sex: '',
        age: 30,
        status: '1',
        region: null,
        height: '178',
        weight: null,
        single: '1'
      },
      demoCodes: [
        `
        <p>
          <vxe-form :data="formData1" @submit="searchEvent" @reset="resetEvent">
            <vxe-form-item title="名称" field="name">
              <template>
                <vxe-input v-model="formData1.name" placeholder="请输入名称"></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item title="昵称" field="nickname">
              <template>
                <vxe-input v-model="formData1.nickname" placeholder="请输入昵称"></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item title="性别" field="sex">
              <select v-model="formData1.sex" class="vxe-select">
                <option value="0"></option>
                <option value="1">女</option>
                <option value="2">男</option>
              </select>
            </vxe-form-item>
            <vxe-form-item>
              <template>
                <vxe-button type="submit" status="primary">查询</vxe-button>
              </template>
            </vxe-form-item>
          </vxe-form>
        </p>

        <p>
          <vxe-form :data="formData3" title-align="right" title-width="100" @submit="searchEvent" @reset="resetEvent">
            <vxe-form-item title="名称" field="name" span="12">
              <template>
                <vxe-input v-model="formData3.name" placeholder="请输入名称"></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item title="昵称" field="nickname" span="12">
              <template>
                <vxe-input v-model="formData3.nickname" placeholder="请输入昵称"></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item title="性别" field="sex" span="12">
              <select v-model="formData3.sex" class="vxe-select">
                <option value="0"></option>
                <option value="1">女</option>
                <option value="2">男</option>
              </select>
            </vxe-form-item>
            <vxe-form-item title="年龄" field="age" span="12">
              <template>
                <vxe-input v-model="formData3.age" type="number" placeholder="请输入年龄"></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item title="地址" field="address" span="24">
              <template>
                <vxe-textarea v-model="formData3.address" placeholder="请输入地址"></vxe-textarea>
              </template>
            </vxe-form-item>
            <vxe-form-item align="center" span="24">
              <template>
                <vxe-button type="submit" status="primary">查询</vxe-button>
                <vxe-button type="reset">重置</vxe-button>
              </template>
            </vxe-form-item>
          </vxe-form>
        </p>

        <p>
          <vxe-form :data="formData4" title-align="right" title-width="100" @submit="searchEvent" @reset="resetEvent">
            <vxe-form-item title="名称" field="name" span="8">
              <template>
                <vxe-input v-model="formData4.name" placeholder="请输入名称"></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item title="昵称" field="nickname" span="8" :title-prefix="{ message: '请输入汉字！', icon: 'fa fa-exclamation-circle' }">
              <template>
                <vxe-input v-model="formData4.nickname" placeholder="请输入昵称"></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item title="性别" field="sex" span="8">
              <select v-model="formData4.sex" class="vxe-select">
                <option value="0"></option>
                <option value="1">女</option>
                <option value="2">男</option>
              </select>
            </vxe-form-item>
            <vxe-form-item title="年龄" field="age" span="8" :title-prefix="{ message: '请输入数值！', icon: 'fa fa-info-circle' }">
              <template>
                <vxe-input v-model="formData4.age" type="number" placeholder="请输入年龄"></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item title="区域" field="region" span="8">
              <template>
                <vxe-input v-model="formData2.region" placeholder="请输入区域"></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item title="状态" field="status" span="8">
              <select v-model="formData4.status" class="vxe-select">
                <option value=""></option>
                <option value="0">失败</option>
                <option value="1">成功</option>
              </select>
            </vxe-form-item>
            <vxe-form-item title="身高" field="height" span="8" folding>
              <vxe-input v-model="formData4.height" placeholder="请输入身高"></vxe-input>
            </vxe-form-item>
            <vxe-form-item title="体重" field="weight" span="8" folding>
              <vxe-input v-model="formData4.weight" placeholder="请输入体重"></vxe-input>
            </vxe-form-item>
            <vxe-form-item title="是否单身" field="single" span="8" folding>
              <vxe-radio v-model="formData4.single" name="single" label="1">是</vxe-radio>
              <vxe-radio v-model="formData4.single" name="single" label="0">否</vxe-radio>
            </vxe-form-item>
            <vxe-form-item align="center" span="24" collapse-node>
              <template>
                <vxe-button type="submit" status="primary">查询</vxe-button>
                <vxe-button type="reset">重置</vxe-button>
              </template>
            </vxe-form-item>
          </vxe-form>
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
              formData3: {
                name: '',
                nickname: '',
                sex: '0',
                age: 26,
                address: null
              },
              formData4: {
                name: '',
                nickname: '',
                sex: '',
                age: 30,
                status: '1',
                region: null,
                height: '178',
                weight: null,
                single: '1'
            }
          },
          methods: {
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
    searchEvent () {
      this.$XModal.message({ message: '查询事件', status: 'info' })
    },
    resetEvent () {
      this.$XModal.message({ message: '重置事件', status: 'info' })
    }
  }
}
</script>
