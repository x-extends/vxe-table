<template>
  <div>
    <h2>按钮</h2>
    <p class="tip">查看 <router-link class="link" :to="{name: 'VXEAPI', params: {name: 'button'}}">API</router-link></p>

    <p>
      <vxe-button type="text" icon="vxe-icon--menu"></vxe-button>
      <vxe-button type="text" icon="vxe-icon--download">图标按钮</vxe-button>
      <vxe-button icon="vxe-icon--refresh"></vxe-button>
      <vxe-button type="primary" icon="vxe-icon--download">图标按钮</vxe-button>
    </p>

    <p>
      <vxe-button type="text">文本按钮</vxe-button>
      <vxe-button type="text" disabled>禁用</vxe-button>
      <vxe-button type="text" loading>加载中</vxe-button>
      <vxe-button type="text">
        <template>下拉按钮</template>
        <template v-slot:dropdowns>
          <vxe-button type="text">下拉按钮1</vxe-button>
          <vxe-button type="text">下拉按钮2</vxe-button>
          <vxe-button type="text">下拉按钮3</vxe-button>
        </template>
      </vxe-button>
    </p>

    <p>
      <vxe-button>普通按钮</vxe-button>
      <vxe-button disabled>禁用</vxe-button>
      <vxe-button loading>加载中</vxe-button>
      <vxe-button type="primary">主要按钮</vxe-button>
      <vxe-button type="primary" disabled>禁用</vxe-button>
      <vxe-button type="primary" loading>加载中</vxe-button>
      <vxe-button>
        <template>下拉按钮</template>
        <template v-slot:dropdowns>
          <vxe-button>下拉按钮1</vxe-button>
          <vxe-button>下拉按钮2</vxe-button>
          <vxe-button>下拉按钮3</vxe-button>
        </template>
      </vxe-button>
    </p>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="html">{{ demoCodes[0] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  data  () {
    return {
      demoCodes: [
        `
        <p>
          <vxe-button type="text" icon="vxe-icon--menu"></vxe-button>
          <vxe-button type="text" icon="vxe-icon--download">图标按钮</vxe-button>
          <vxe-button icon="vxe-icon--refresh"></vxe-button>
          <vxe-button type="primary" icon="vxe-icon--download">图标按钮</vxe-button>
        </p>

        <p>
          <vxe-button type="text">文本按钮</vxe-button>
          <vxe-button type="text" disabled>禁用</vxe-button>
          <vxe-button type="text" loading>加载中</vxe-button>
          <vxe-button type="text">
            <template>下拉按钮</template>
            <template v-slot:dropdowns>
              <vxe-button type="text">下拉按钮1</vxe-button>
              <vxe-button type="text">下拉按钮2</vxe-button>
              <vxe-button type="text">下拉按钮3</vxe-button>
            </template>
          </vxe-button>
        </p>

        <p>
          <vxe-button>普通按钮</vxe-button>
          <vxe-button disabled>禁用</vxe-button>
          <vxe-button loading>加载中</vxe-button>
          <vxe-button type="primary">主要按钮</vxe-button>
          <vxe-button type="primary" disabled>禁用</vxe-button>
          <vxe-button type="primary" loading>加载中</vxe-button>
          <vxe-button>
            <template>下拉按钮</template>
            <template v-slot:dropdowns>
              <vxe-button>下拉按钮1</vxe-button>
              <vxe-button>下拉按钮2</vxe-button>
              <vxe-button>下拉按钮3</vxe-button>
            </template>
          </vxe-button>
        </p>
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
