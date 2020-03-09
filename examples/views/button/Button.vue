<template>
  <div>
    <h2>{{ $t('app.aside.nav.button') }}</h2>
    <p class="tip">查看 <router-link class="link" :to="{name: 'VXEAPI', params: {name: 'button'}}">API</router-link></p>

    <p>
      <vxe-button>默认尺寸</vxe-button>
      <vxe-button size="medium">中等尺寸</vxe-button>
      <vxe-button size="small">小型尺寸</vxe-button>
      <vxe-button size="mini">超小尺寸</vxe-button>
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
      <vxe-button type="text">默认颜色</vxe-button>
      <vxe-button type="text" status="primary">主要颜色</vxe-button>
      <vxe-button type="text" status="success">成功颜色</vxe-button>
      <vxe-button type="text" status="info">信息颜色</vxe-button>
      <vxe-button type="text" status="warning">警告颜色</vxe-button>
      <vxe-button type="text" status="danger">危险颜色</vxe-button>
    </p>

    <p>
      <vxe-button type="text" disabled>默认颜色</vxe-button>
      <vxe-button type="text" status="primary" disabled>主要颜色</vxe-button>
      <vxe-button type="text" status="success" disabled>成功颜色</vxe-button>
      <vxe-button type="text" status="info" disabled>信息颜色</vxe-button>
      <vxe-button type="text" status="warning" disabled>警告颜色</vxe-button>
      <vxe-button type="text" status="danger" disabled>危险颜色</vxe-button>
    </p>

    <p>
      <vxe-button type="text" loading>默认颜色</vxe-button>
      <vxe-button type="text" status="primary" loading>主要颜色</vxe-button>
      <vxe-button type="text" status="success" loading>成功颜色</vxe-button>
      <vxe-button type="text" status="info" loading>信息颜色</vxe-button>
      <vxe-button type="text" status="warning" loading>警告颜色</vxe-button>
      <vxe-button type="text" status="danger" loading>危险颜色</vxe-button>
    </p>

    <p>
      <vxe-button>默认颜色</vxe-button>
      <vxe-button status="primary">主要颜色</vxe-button>
      <vxe-button status="success">成功颜色</vxe-button>
      <vxe-button status="info">信息颜色</vxe-button>
      <vxe-button status="warning">警告颜色</vxe-button>
      <vxe-button status="danger">危险颜色</vxe-button>
    </p>

    <p>
      <vxe-button disabled>默认颜色</vxe-button>
      <vxe-button status="primary" disabled>主要颜色</vxe-button>
      <vxe-button status="success" disabled>成功颜色</vxe-button>
      <vxe-button status="info" disabled>信息颜色</vxe-button>
      <vxe-button status="warning" disabled>警告颜色</vxe-button>
      <vxe-button status="danger" disabled>危险颜色</vxe-button>
    </p>

    <p>
      <vxe-button loading>默认颜色</vxe-button>
      <vxe-button status="primary" loading>主要颜色</vxe-button>
      <vxe-button status="success" loading>成功颜色</vxe-button>
      <vxe-button status="info" loading>信息颜色</vxe-button>
      <vxe-button status="warning" loading>警告颜色</vxe-button>
      <vxe-button status="danger" loading>危险颜色</vxe-button>
    </p>

    <p>
      <vxe-button>
        <template>默认颜色</template>
        <template v-slot:dropdowns>
          <vxe-button type="text">下拉按钮1</vxe-button>
        </template>
      </vxe-button>
      <vxe-button status="primary">
        <template>主要颜色</template>
        <template v-slot:dropdowns>
          <vxe-button type="text">下拉按钮1</vxe-button>
        </template>
      </vxe-button>
      <vxe-button status="success">
        <template>成功颜色</template>
        <template v-slot:dropdowns>
          <vxe-button type="text">下拉按钮1</vxe-button>
        </template>
      </vxe-button>
      <vxe-button status="info">
        <template>信息颜色</template>
        <template v-slot:dropdowns>
          <vxe-button type="text">下拉按钮1</vxe-button>
        </template>
      </vxe-button>
      <vxe-button status="warning">
        <template>警告颜色</template>
        <template v-slot:dropdowns>
          <vxe-button type="text">下拉按钮1</vxe-button>
        </template>
      </vxe-button>
      <vxe-button status="danger">
        <template>危险颜色</template>
        <template v-slot:dropdowns>
          <vxe-button type="text">下拉按钮1</vxe-button>
        </template>
      </vxe-button>
    </p>

    <p>
      <vxe-button type="text" icon="vxe-icon--plus"></vxe-button>
      <vxe-button type="text" icon="vxe-icon--refresh" loading></vxe-button>
      <vxe-button type="text" icon="vxe-icon--download">图标按钮</vxe-button>
      <vxe-button status="primary" icon="vxe-icon--download">图标按钮</vxe-button>
    </p>

    <pre>
      <code>
        | Tab | 切换到上一个 |
        | Shift Tab | 切换到下一个 |
        | Spacebar | 按下点击 |
        | Enter | 点击 |
      </code>
    </pre>

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
          <vxe-button>默认尺寸</vxe-button>
          <vxe-button size="medium">中等尺寸</vxe-button>
          <vxe-button size="small">小型尺寸</vxe-button>
          <vxe-button size="mini">超小尺寸</vxe-button>
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
          <vxe-button type="text">默认颜色</vxe-button>
          <vxe-button type="text" status="primary">主要颜色</vxe-button>
          <vxe-button type="text" status="success">成功颜色</vxe-button>
          <vxe-button type="text" status="info">信息颜色</vxe-button>
          <vxe-button type="text" status="warning">警告颜色</vxe-button>
          <vxe-button type="text" status="danger">危险颜色</vxe-button>
        </p>

        <p>
          <vxe-button type="text" disabled>默认颜色</vxe-button>
          <vxe-button type="text" status="primary" disabled>主要颜色</vxe-button>
          <vxe-button type="text" status="success" disabled>成功颜色</vxe-button>
          <vxe-button type="text" status="info" disabled>信息颜色</vxe-button>
          <vxe-button type="text" status="warning" disabled>警告颜色</vxe-button>
          <vxe-button type="text" status="danger" disabled>危险颜色</vxe-button>
        </p>

        <p>
          <vxe-button type="text" loading>默认颜色</vxe-button>
          <vxe-button type="text" status="primary" loading>主要颜色</vxe-button>
          <vxe-button type="text" status="success" loading>成功颜色</vxe-button>
          <vxe-button type="text" status="info" loading>信息颜色</vxe-button>
          <vxe-button type="text" status="warning" loading>警告颜色</vxe-button>
          <vxe-button type="text" status="danger" loading>危险颜色</vxe-button>
        </p>

        <p>
          <vxe-button>默认颜色</vxe-button>
          <vxe-button status="primary">主要颜色</vxe-button>
          <vxe-button status="success">成功颜色</vxe-button>
          <vxe-button status="info">信息颜色</vxe-button>
          <vxe-button status="warning">警告颜色</vxe-button>
          <vxe-button status="danger">危险颜色</vxe-button>
        </p>

        <p>
          <vxe-button disabled>默认颜色</vxe-button>
          <vxe-button status="primary" disabled>主要颜色</vxe-button>
          <vxe-button status="success" disabled>成功颜色</vxe-button>
          <vxe-button status="info" disabled>信息颜色</vxe-button>
          <vxe-button status="warning" disabled>警告颜色</vxe-button>
          <vxe-button status="danger" disabled>危险颜色</vxe-button>
        </p>

        <p>
          <vxe-button loading>默认颜色</vxe-button>
          <vxe-button status="primary" loading>主要颜色</vxe-button>
          <vxe-button status="success" loading>成功颜色</vxe-button>
          <vxe-button status="info" loading>信息颜色</vxe-button>
          <vxe-button status="warning" loading>警告颜色</vxe-button>
          <vxe-button status="danger" loading>危险颜色</vxe-button>
        </p>

        <p>
          <vxe-button>
            <template>默认颜色</template>
            <template v-slot:dropdowns>
              <vxe-button>下拉按钮1</vxe-button>
            </template>
          </vxe-button>
          <vxe-button status="primary">
            <template>主要颜色</template>
            <template v-slot:dropdowns>
              <vxe-button>下拉按钮1</vxe-button>
            </template>
          </vxe-button>
          <vxe-button status="success">
            <template>成功颜色</template>
            <template v-slot:dropdowns>
              <vxe-button>下拉按钮1</vxe-button>
            </template>
          </vxe-button>
          <vxe-button status="info">
            <template>信息颜色</template>
            <template v-slot:dropdowns>
              <vxe-button>下拉按钮1</vxe-button>
            </template>
          </vxe-button>
          <vxe-button status="warning">
            <template>警告颜色</template>
            <template v-slot:dropdowns>
              <vxe-button>下拉按钮1</vxe-button>
            </template>
          </vxe-button>
          <vxe-button status="danger">
            <template>危险颜色</template>
            <template v-slot:dropdowns>
              <vxe-button>下拉按钮1</vxe-button>
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

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
