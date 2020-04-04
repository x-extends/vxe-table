<template>
  <div>
    <h2>{{ $t('app.aside.nav.radio') }}</h2>
    <p class="tip">查看 <router-link class="link" :to="{name: 'VXEAPI', params: {name: 'radio'}}">API</router-link>，可以通过 <router-link class="link" :to="{name: 'StartGlobal'}">setup</router-link> 设置全局参数</p>

    <p>
      <vxe-radio name="n1" v-model="value1" label="1">默认尺寸</vxe-radio>
      <vxe-radio name="n1" v-model="value1" label="2" size="medium">中等尺寸</vxe-radio>
      <vxe-radio name="n1" v-model="value1" label="3" size="small">小型尺寸</vxe-radio>
      <vxe-radio name="n1" v-model="value1" label="4" size="mini">超小尺寸</vxe-radio>
    </p>

    <p>
      <vxe-radio name="n2" v-model="value2" label="1">单选1</vxe-radio>
      <vxe-radio name="n2" v-model="value2" label="2" disabled>禁用2</vxe-radio>
      <vxe-radio name="n2" v-model="value2" label="3">单选3</vxe-radio>
    </p>

    <p>
      <vxe-radio-group v-model="value3">
        <vxe-radio label="1">HTML</vxe-radio>
        <vxe-radio label="2">CSS</vxe-radio>
        <vxe-radio label="3">Javascript</vxe-radio>
        <vxe-radio label="4">SASS</vxe-radio>
        <vxe-radio label="5">LESS</vxe-radio>
      </vxe-radio-group>
    </p>

    <pre>
      <code>
        | Tab | 切换到上一个 |
        | Shift Tab | 切换到下一个 |
        | Arrow Up ↑ | 如果在分组内则移动到上一个选项 |
        | Arrow Left ← | 如果在分组内则移动到上一个选项 |
        | Arrow Down ↓ | 如果在分组内则移动到下一个选项 |
        | Arrow Right → | 如果在分组内则移动到下一个选项 |
        | Spacebar | 按下勾选 |
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
      value1: '1',
      value2: '2',
      value3: '3',
      demoCodes: [
        `
        <p>
          <vxe-radio name="n1" v-model="value1" label="1">默认尺寸</vxe-radio>
          <vxe-radio name="n1" v-model="value1" label="2" size="medium">中等尺寸</vxe-radio>
          <vxe-radio name="n1" v-model="value1" label="3" size="small">小型尺寸</vxe-radio>
          <vxe-radio name="n1" v-model="value1" label="4" size="mini">超小尺寸</vxe-radio>
        </p>

        <p>
          <vxe-radio name="n2" v-model="value2" label="1">单选1</vxe-radio>
          <vxe-radio name="n2" v-model="value2" label="2" disabled>禁用2</vxe-radio>
          <vxe-radio name="n2" v-model="value2" label="3">单选3</vxe-radio>
        </p>

        <p>
          <vxe-radio-group v-model="value3">
            <vxe-radio label="1">HTML</vxe-radio>
            <vxe-radio label="2">CSS</vxe-radio>
            <vxe-radio label="3">Javascript</vxe-radio>
            <vxe-radio label="4">SASS</vxe-radio>
            <vxe-radio label="5">LESS</vxe-radio>
          </vxe-radio-group>
        </p>
        `,
        `
        export default {
          data () {
            return {
              value1: '1',
              value2: '2'
              value3: '3'
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
