<template>
  <div>
    <h2>{{ $t('app.aside.nav.textarea') }}</h2>
    <p class="tip">支持多行文本，自动弹性高度，查看 <router-link class="link" :to="{name: 'VXEAPI', params: {name: 'textarea'}}">API</router-link></p>

    <p>
      <vxe-textarea v-model="demo1.value1" placeholder="默认尺寸"></vxe-textarea>
      <vxe-textarea v-model="demo1.value2" placeholder="中等尺寸" size="medium"></vxe-textarea>
      <vxe-textarea v-model="demo1.value3" placeholder="小型尺寸" size="small"></vxe-textarea>
      <vxe-textarea v-model="demo1.value4" placeholder="超小尺寸" size="mini"></vxe-textarea>
    </p>

    <p>
      <vxe-textarea v-model="demo1.value5" placeholder="多行文本域"></vxe-textarea>
      <vxe-textarea v-model="demo1.value6" placeholder="只读的" readonly></vxe-textarea>
      <vxe-textarea v-model="demo1.value7" placeholder="禁用的" disabled></vxe-textarea>
      <vxe-textarea v-model="demo1.value8" placeholder="显示字数统计" maxlength="100" show-word-count></vxe-textarea>
      <vxe-textarea v-model="demo1.value9" placeholder="自适应文本高度" :autosize="{ minRows: 2, maxRows: 4 }"></vxe-textarea>
      <vxe-textarea v-model="demo1.value10" placeholder="默认3行与40列" rows="3" cols="40"></vxe-textarea>
      <vxe-textarea v-model="demo1.value11" placeholder="关闭调节元素" resize="none"></vxe-textarea>
      <vxe-textarea v-model="demo1.value12" placeholder="可以调节元素的高度" resize="vertical"></vxe-textarea>
      <vxe-textarea v-model="demo1.value13" placeholder="以调节元素的宽度" resize="horizontal"></vxe-textarea>
      <vxe-textarea v-model="demo1.value14" placeholder="可以调节元素的宽度和高度" resize="both"></vxe-textarea>
    </p>

    <pre>
      <pre-code>
        | Tab | 切换到上一个 |
        | Shift Tab | 切换到下一个 |
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

export default defineComponent({
  data  () {
    const demo1 = reactive({
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      value5: '',
      value6: '',
      value7: '',
      value8: '',
      value9: '',
      value10: '',
      value11: '',
      value12: '',
      value13: '',
      value14: ''
    })
    return {
      demo1,
      demoCodes: [
        `
        <p>
          <vxe-textarea v-model="demo1.value1" placeholder="默认尺寸"></vxe-textarea>
          <vxe-textarea v-model="demo1.value2" placeholder="中等尺寸" size="medium"></vxe-textarea>
          <vxe-textarea v-model="demo1.value3" placeholder="小型尺寸" size="small"></vxe-textarea>
          <vxe-textarea v-model="demo1.value4" placeholder="超小尺寸" size="mini"></vxe-textarea>
        </p>

        <p>
          <vxe-textarea v-model="demo1.value5" placeholder="多行文本域"></vxe-textarea>
          <vxe-textarea v-model="demo1.value6" placeholder="只读的" readonly></vxe-textarea>
          <vxe-textarea v-model="demo1.value7" placeholder="禁用的" disabled></vxe-textarea>
          <vxe-textarea v-model="demo1.value8" placeholder="显示字数统计" maxlength="100" show-word-count></vxe-textarea>
          <vxe-textarea v-model="demo1.value9" placeholder="自适应文本高度" :autosize="{ minRows: 2, maxRows: 4 }"></vxe-textarea>
          <vxe-textarea v-model="demo1.value10" placeholder="默认3行与40列" rows="3" cols="40"></vxe-textarea>
          <vxe-textarea v-model="demo1.value11" placeholder="关闭调节元素" resize="none"></vxe-textarea>
          <vxe-textarea v-model="demo1.value12" placeholder="可以调节元素的高度" resize="vertical"></vxe-textarea>
          <vxe-textarea v-model="demo1.value13" placeholder="以调节元素的宽度" resize="horizontal"></vxe-textarea>
          <vxe-textarea v-model="demo1.value14" placeholder="可以调节元素的宽度和高度" resize="both"></vxe-textarea>
        </p>
        `,
        `
        import { defineComponent, reactive } from 'vue'

        export default defineComponent({
          data  () {
            const demo1 = reactive({
              value1: '',
              value2: '',
              value3: '',
              value4: '',
              value5: '',
              value6: '',
              value7: '',
              value8: '',
              value9: '',
              value10: '',
              value11: '',
              value12: '',
              value13: '',
              value14: ''
            })
            return {
              demo1
            }
          }
        })
        `
      ]
    }
  }
})
</script>
