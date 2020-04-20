<template>
  <div>
    <h2>{{ $t('app.aside.nav.checkbox') }}</h2>
    <p class="tip">复选框，查看 <router-link class="link" :to="{name: 'VXEAPI', params: {name: 'checkbox'}}">API</router-link></p>

    <p>
      <vxe-checkbox>默认尺寸</vxe-checkbox>
      <vxe-checkbox size="medium">中等尺寸</vxe-checkbox>
      <vxe-checkbox size="small">小型尺寸</vxe-checkbox>
      <vxe-checkbox size="mini">超小尺寸</vxe-checkbox>
      <vxe-checkbox indeterminate>默认尺寸</vxe-checkbox>
      <vxe-checkbox size="medium" indeterminate>中等尺寸</vxe-checkbox>
      <vxe-checkbox size="small" indeterminate>小型尺寸</vxe-checkbox>
      <vxe-checkbox size="mini" indeterminate>超小尺寸</vxe-checkbox>
    </p>

    <p>
      <vxe-checkbox v-model="value1">复选1</vxe-checkbox>
      <vxe-checkbox v-model="value2" disabled>复选2</vxe-checkbox>
      <vxe-checkbox>复选3</vxe-checkbox>
    </p>

    <p>
      <vxe-checkbox-group v-model="value3">
        <vxe-checkbox label="1">HTML</vxe-checkbox>
        <vxe-checkbox label="2">CSS</vxe-checkbox>
        <vxe-checkbox label="3">Javascript</vxe-checkbox>
        <vxe-checkbox label="4">SASS</vxe-checkbox>
        <vxe-checkbox label="5">LESS</vxe-checkbox>
      </vxe-checkbox-group>
    </p>

    <pre>
      <code>
        | Tab | 切换到上一个 |
        | Shift Tab | 切换到下一个 |
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
      value1: true,
      value2: true,
      value3: ['3'],
      demoCodes: [
        `
        <p>
          <vxe-checkbox>默认尺寸</vxe-checkbox>
          <vxe-checkbox size="medium">中等尺寸</vxe-checkbox>
          <vxe-checkbox size="small">小型尺寸</vxe-checkbox>
          <vxe-checkbox size="mini">超小尺寸</vxe-checkbox>
          <vxe-checkbox indeterminate>默认尺寸</vxe-checkbox>
          <vxe-checkbox size="medium" indeterminate>中等尺寸</vxe-checkbox>
          <vxe-checkbox size="small" indeterminate>小型尺寸</vxe-checkbox>
          <vxe-checkbox size="mini" indeterminate>超小尺寸</vxe-checkbox>
        </p>

        <p>
          <vxe-checkbox v-model="value1">复选1</vxe-checkbox>
          <vxe-checkbox v-model="value2" disabled>复选2</vxe-checkbox>
          <vxe-checkbox>复选3</vxe-checkbox>
        </p>

        <p>
          <vxe-checkbox-group v-model="value3">
            <vxe-checkbox label="1">HTML</vxe-checkbox>
            <vxe-checkbox label="2">CSS</vxe-checkbox>
            <vxe-checkbox label="3">Javascript</vxe-checkbox>
            <vxe-checkbox label="4">SASS</vxe-checkbox>
            <vxe-checkbox label="5">LESS</vxe-checkbox>
          </vxe-checkbox-group>
        </p>
        `,
        `
        export default {
          data () {
            return {
              value1: true,
              value2: true,
              value3: ['3']
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
