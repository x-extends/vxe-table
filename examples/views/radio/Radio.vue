<template>
  <div>
    <h2>按钮</h2>
    <p class="tip">查看 <router-link class="link" :to="{name: 'VXEAPI', params: {name: 'radio'}}">API</router-link></p>

    <p>
      <vxe-radio name="n1" v-model="value1" label="1">单选1</vxe-radio>
      <vxe-radio name="n1" v-model="value1" label="2">单选2</vxe-radio>
      <vxe-radio name="n1" v-model="value1" label="3">单选3</vxe-radio>
    </p>

    <p>
      <vxe-radio name="n2" v-model="value2" label="1">单选1</vxe-radio>
      <vxe-radio name="n2" v-model="value2" label="2" disabled>禁用2</vxe-radio>
      <vxe-radio name="n2" v-model="value2" label="3">单选3</vxe-radio>
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
      value1: '1',
      value2: '2',
      demoCodes: [
        `
        <p>
          <vxe-radio name="n1" v-model="value1" label="1">单选1</vxe-radio>
          <vxe-radio name="n1" v-model="value1" label="2">单选2</vxe-radio>
          <vxe-radio name="n1" v-model="value1" label="3">单选3</vxe-radio>
        </p>

        <p>
          <vxe-radio name="n2" v-model="value2" label="1">单选1</vxe-radio>
          <vxe-radio name="n2" v-model="value2" label="2" disabled>禁用2</vxe-radio>
          <vxe-radio name="n2" v-model="value2" label="3">单选3</vxe-radio>
        </p>
        `,
        `
        export default {
          data () {
            return {
              value1: '1',
              value2: '2'
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
