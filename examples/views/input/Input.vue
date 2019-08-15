<template>
  <div>
    <h2>输入框</h2>

    <p>
      <vxe-input v-model="value1" placeholder="请输入内容"></vxe-input>
    </p>

    <p>
      <vxe-input v-model="value2" placeholder="请输入内容" disabled></vxe-input>
    </p>

    <p>
      <vxe-textarea v-model="value3" placeholder="请输入内容"></vxe-textarea>
    </p>

    <p>
      <vxe-textarea v-model="value4" placeholder="请输入内容" disabled></vxe-textarea>
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
      demoCodes: [
        `
        <p>
          <vxe-input v-model="value1" placeholder="请输入内容"></vxe-input>
        </p>

        <p>
          <vxe-input v-model="value2" placeholder="请输入内容" disabled></vxe-input>
        </p>

        <p>
          <vxe-textarea v-model="value3" placeholder="请输入内容"></vxe-textarea>
        </p>

        <p>
          <vxe-textarea v-model="value4" placeholder="请输入内容" disabled></vxe-textarea>
        </p>
        `,
        `
        export default {
          data () {
            return {
              value1: '',
              value2: '',
              value3: '',
              value4: ''
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
