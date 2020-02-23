<template>
  <div>
    <h2>{{ $t('app.aside.nav.input') }}</h2>
    <p class="tip">查看 <router-link class="link" :to="{name: 'VXEAPI', params: {name: 'input'}}">API</router-link></p>

    <p>
      <vxe-input v-model="value1" placeholder="请输入内容" clearable></vxe-input>
      <vxe-input v-model="value2" placeholder="请输入内容" disabled></vxe-input>
      <vxe-input v-model="value3" placeholder="请输入内容" prefix-icon="fa fa-user"></vxe-input>
      <vxe-input v-model="value4" placeholder="请输入内容" suffix-icon="fa fa-search"></vxe-input>
      <vxe-input v-model="value5" placeholder="请输入内容" prefix-icon="fa fa-user-o" suffix-icon="fa fa-eye"></vxe-input>
      <vxe-input v-model="value6" placeholder="请输入内容" prefix-icon="fa fa-user" suffix-icon="fa fa-eye-slash" clearable></vxe-input>
    </p>

    <p>
      <vxe-textarea v-model="value7" placeholder="请输入内容"></vxe-textarea>
      <vxe-textarea v-model="value8" placeholder="请输入内容" disabled></vxe-textarea>
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
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      value5: '',
      value6: '',
      value7: '',
      value8: '',
      demoCodes: [
        `
        <p>
          <vxe-input v-model="value1" placeholder="请输入内容" clearable></vxe-input>
          <vxe-input v-model="value2" placeholder="请输入内容" disabled></vxe-input>
          <vxe-input v-model="value3" placeholder="请输入内容" prefix-icon="fa fa-user"></vxe-input>
          <vxe-input v-model="value4" placeholder="请输入内容" suffix-icon="fa fa-search"></vxe-input>
          <vxe-input v-model="value5" placeholder="请输入内容" prefix-icon="fa fa-user-o" suffix-icon="fa fa-eye"></vxe-input>
          <vxe-input v-model="value6" placeholder="请输入内容" prefix-icon="fa fa-user" suffix-icon="fa fa-eye-slash" clearable></vxe-input>
        </p>

        <p>
          <vxe-textarea v-model="value6" placeholder="请输入内容"></vxe-textarea>
          <vxe-textarea v-model="value7" placeholder="请输入内容" disabled></vxe-textarea>
        </p>
        `,
        `
        export default {
          data () {
            return {
              value1: '',
              value2: '',
              value3: '',
              value4: '',
              value5: '',
              value6: '',
              value7: '',
              value8: ''
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
  }
}
</script>
