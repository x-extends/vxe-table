<template>
  <div>
    <h2>{{ $t('app.aside.nav.button') }}</h2>
    <p class="tip">查看 <router-link class="link" :to="{name: 'VXEAPI', params: {name: 'button'}}">API</router-link></p>

    <p>
      <vxe-button>默认按钮</vxe-button>
      <vxe-button size="medium">中等按钮</vxe-button>
      <vxe-button size="small">小型按钮</vxe-button>
      <vxe-button size="mini">超小按钮</vxe-button>
    </p>

    <p>
      <vxe-button size="mini">
        <template>超小下拉按钮</template>
        <template v-slot:dropdowns>
          <vxe-button type="text">下拉按钮1</vxe-button>
          <vxe-button type="text">下拉按钮2</vxe-button>
          <vxe-button type="text">下拉按钮3</vxe-button>
        </template>
      </vxe-button>
      <vxe-button size="small">
        <template>小型下拉按钮</template>
        <template v-slot:dropdowns>
          <vxe-button type="text">下拉按钮1</vxe-button>
          <vxe-button type="text">下拉按钮2</vxe-button>
          <vxe-button type="text">下拉按钮3</vxe-button>
        </template>
      </vxe-button>
      <vxe-button size="medium">
        <template>中等下拉按钮</template>
        <template v-slot:dropdowns>
          <vxe-button type="text">下拉按钮1</vxe-button>
          <vxe-button type="text">下拉按钮2</vxe-button>
          <vxe-button type="text">下拉按钮3</vxe-button>
        </template>
      </vxe-button>
      <vxe-button>
        <template>默认下拉按钮</template>
        <template v-slot:dropdowns>
          <vxe-button type="text">下拉按钮1</vxe-button>
          <vxe-button type="text">下拉按钮2</vxe-button>
          <vxe-button type="text">下拉按钮3</vxe-button>
        </template>
      </vxe-button>
    </p>

    <p>
      <vxe-button type="text" icon="vxe-icon--menu"></vxe-button>
      <vxe-button type="text" icon="vxe-icon--download">图标按钮</vxe-button>
      <vxe-button icon="vxe-icon--refresh"></vxe-button>
      <vxe-button status="primary" icon="vxe-icon--download">图标按钮</vxe-button>
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
      <vxe-button status="primary">主要按钮</vxe-button>
      <vxe-button status="primary" disabled>禁用</vxe-button>
      <vxe-button status="primary" loading>加载中</vxe-button>
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
          <vxe-button>默认按钮</vxe-button>
          <vxe-button size="medium">中等按钮</vxe-button>
          <vxe-button size="small">小型按钮</vxe-button>
          <vxe-button size="mini">超小按钮</vxe-button>
        </p>

        <p>
          <vxe-button size="mini">
            <template>超小下拉按钮</template>
            <template v-slot:dropdowns>
              <vxe-button type="text">下拉按钮1</vxe-button>
              <vxe-button type="text">下拉按钮2</vxe-button>
              <vxe-button type="text">下拉按钮3</vxe-button>
            </template>
          </vxe-button>
          <vxe-button size="small">
            <template>小型下拉按钮</template>
            <template v-slot:dropdowns>
              <vxe-button type="text">下拉按钮1</vxe-button>
              <vxe-button type="text">下拉按钮2</vxe-button>
              <vxe-button type="text">下拉按钮3</vxe-button>
            </template>
          </vxe-button>
          <vxe-button size="medium">
            <template>中等下拉按钮</template>
            <template v-slot:dropdowns>
              <vxe-button type="text">下拉按钮1</vxe-button>
              <vxe-button type="text">下拉按钮2</vxe-button>
              <vxe-button type="text">下拉按钮3</vxe-button>
            </template>
          </vxe-button>
          <vxe-button>
            <template>默认下拉按钮</template>
            <template v-slot:dropdowns>
              <vxe-button type="text">下拉按钮1</vxe-button>
              <vxe-button type="text">下拉按钮2</vxe-button>
              <vxe-button type="text">下拉按钮3</vxe-button>
            </template>
          </vxe-button>
        </p>

        <p>
          <vxe-button type="text" icon="vxe-icon--menu"></vxe-button>
          <vxe-button type="text" icon="vxe-icon--download">图标按钮</vxe-button>
          <vxe-button icon="vxe-icon--refresh"></vxe-button>
          <vxe-button status="primary" icon="vxe-icon--download">图标按钮</vxe-button>
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
          <vxe-button status="primary">主要按钮</vxe-button>
          <vxe-button status="primary" disabled>禁用</vxe-button>
          <vxe-button status="primary" loading>加载中</vxe-button>
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
