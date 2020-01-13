<template>
  <div>
    <h2>表单</h2>
    <p class="tip">查看 <router-link class="link" :to="{name: 'VXEAPI', params: {name: 'form'}}">API</router-link></p>

    <p>
      <vxe-form :data="formData" @submit="searchEvent">
        <vxe-form-item title="名称" field="name">
          <template>
            <vxe-input v-model="formData.name" placeholder="请输入名称"></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item title="昵称" field="nickname">
          <template>
            <vxe-input v-model="formData.nickname" placeholder="请输入昵称"></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item title="性别" field="sex">
          <select v-model="formData.sex" class="vxe-select">
            <option value="0"></option>
            <option value="1">女</option>
            <option value="2">男</option>
          </select>
        </vxe-form-item>
        <vxe-form-item title="角色" field="role">
          <template>
            <vxe-input v-model="formData.role" placeholder="请输入角色"></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item>
          <template>
            <vxe-button>查询</vxe-button>
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
      formData: {
        name: '',
        nickname: '',
        sex: '',
        role: ''
      },
      demoCodes: [
        `
        <p>
          <vxe-form :data="formData" @submit="searchEvent">
            <vxe-form-item title="名称" field="name">
              <template>
                <vxe-input v-model="formData.name" placeholder="请输入名称"></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item title="昵称" field="nickname">
              <template>
                <vxe-input v-model="formData.nickname" placeholder="请输入昵称"></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item title="性别" field="sex">
              <select v-model="formData.sex" class="vxe-select">
                <option value="0"></option>
                <option value="1">女</option>
                <option value="2">男</option>
              </select>
            </vxe-form-item>
            <vxe-form-item title="角色" field="role">
              <template>
                <vxe-input v-model="formData.role" placeholder="请输入角色"></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item>
              <template>
                <vxe-button>查询</vxe-button>
              </template>
            </vxe-form-item>
          </vxe-form>
        </p>
        `,
        `
        export default {
          data () {
            return {
              formData: {
                name: '',
                nickname: '',
                sex: '',
                role: ''
              }
            }
          },
          methods: {
            searchEvent () {
              this.$XModal.message({ message: '查询', status: 'info' })
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
      this.$XModal.message({ message: '查询', status: 'info' })
    }
  }
}
</script>
