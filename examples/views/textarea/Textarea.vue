<template>
  <div>
    <h2>{{ $t('app.aside.nav.input') }}</h2>
    <p class="tip">查看 <router-link class="link" :to="{name: 'VXEAPI', params: {name: 'textarea'}}">API</router-link></p>

    <p>
      <vxe-textarea v-model="value1" placeholder="默认尺寸"></vxe-textarea>
      <vxe-textarea v-model="value2" placeholder="中等尺寸" size="medium"></vxe-textarea>
      <vxe-textarea v-model="value3" placeholder="小型尺寸" size="small"></vxe-textarea>
      <vxe-textarea v-model="value4" placeholder="超小尺寸" size="mini"></vxe-textarea>
    </p>

    <p>
      <vxe-textarea v-model="value5" placeholder="多行文本域"></vxe-textarea>
      <vxe-textarea v-model="value6" placeholder="只读的" readonly></vxe-textarea>
      <vxe-textarea v-model="value7" placeholder="禁用的" disabled></vxe-textarea>
      <vxe-textarea v-model="value8" placeholder="显示字数统计" maxlength="100" show-word-count></vxe-textarea>
      <vxe-textarea v-model="value9" placeholder="自适应文本高度" :autosize="{ minRows: 2, maxRows: 4 }"></vxe-textarea>
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
      value9: '',
      demoCodes: [
        `
        <p>
          <vxe-textarea v-model="value1" placeholder="默认尺寸"></vxe-textarea>
          <vxe-textarea v-model="value2" placeholder="中等尺寸" size="medium"></vxe-textarea>
          <vxe-textarea v-model="value3" placeholder="小型尺寸" size="small"></vxe-textarea>
          <vxe-textarea v-model="value4" placeholder="超小尺寸" size="mini"></vxe-textarea>
        </p>

        <p>
          <vxe-textarea v-model="value5" placeholder="多行文本域"></vxe-textarea>
          <vxe-textarea v-model="value6" placeholder="只读的" readonly></vxe-textarea>
          <vxe-textarea v-model="value7" placeholder="禁用的" disabled></vxe-textarea>
          <vxe-textarea v-model="value8" placeholder="显示字数统计" maxlength="100" show-word-count></vxe-textarea>
          <vxe-textarea v-model="value9" placeholder="自适应文本高度" :autosize="{ minRows: 2, maxRows: 4 }"></vxe-textarea>
        </p>
        `,
        `
        export default {
          data () {
            return {
              vvalue1: '',
              value2: '',
              value3: '',
              value4: '',
              value5: '',
              value6: '',
              value7: '',
              value8: '',
              value9: ''
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
