<template>
  <div>
    <h2>{{ $t('app.aside.nav.checkbox') }}</h2>
    <p class="tip">查看 <router-link class="link" :to="{name: 'VXEAPI', params: {name: 'checkbox'}}">API</router-link></p>

    <p>
      <vxe-checkbox indeterminate>不确定选项</vxe-checkbox>
    </p>

    <p>
      <vxe-checkbox v-model="value1">复选1</vxe-checkbox>
      <vxe-checkbox v-model="value2" disabled>复选2</vxe-checkbox>
      <vxe-checkbox>复选3</vxe-checkbox>
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
      value1: true,
      value2: true,
      demoCodes: [
        `
        <p>
          <vxe-checkbox indeterminate>不确定选项</vxe-checkbox>
        </p>

        <p>
          <vxe-checkbox v-model="value1">复选1</vxe-checkbox>
          <vxe-checkbox v-model="value2" disabled>复选2</vxe-checkbox>
          <vxe-checkbox>复选3</vxe-checkbox>
        </p>
        `,
        `
        export default {
          data () {
            return {
              value1: true,
              value2: true
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
