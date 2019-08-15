<template>
  <div>
    <h2>文字提示</h2>

    <p>
      <vxe-tooltip content="我是提示内容">
        <a class="link">文字提示</a>
      </vxe-tooltip>
    </p>

    <p>
      <vxe-tooltip content="除了点击之外不会自动消息" trigger="click">
        <vxe-button>点击触发</vxe-button>
      </vxe-tooltip>
      <vxe-tooltip content="hover 提示内容 ">
        <vxe-button>Hover 触发</vxe-button>
      </vxe-tooltip>
    </p>

    <p>
      <vxe-tooltip v-model="value1" content="自定义提示内容" trigger="manual">
        <vxe-button @mouseenter="value1 = true" @mouseleave="value1 = false">手动模式</vxe-button>
      </vxe-tooltip>
    </p>

    <p>
      <vxe-tooltip ref="myTip"></vxe-tooltip>
      <vxe-button @mouseenter="$refs.myTip.toVisible($event.target, '自定义提示内容')" @mouseleave="$refs.myTip.close()">高性能模式，只创建一个实例</vxe-button>
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
      value1: false,
      demoCodes: [
        `
        <p>
          <vxe-tooltip content="我是提示内容">
            <a class="link">文字提示</a>
          </vxe-tooltip>
        </p>

        <p>
          <vxe-tooltip content="除了点击之外不会自动消息" trigger="click">
            <vxe-button>点击触发</vxe-button>
          </vxe-tooltip>
          <vxe-tooltip content="hover 提示内容 ">
            <vxe-button>Hover 触发</vxe-button>
          </vxe-tooltip>
        </p>

        <p>
          <vxe-tooltip v-model="value1" content="自定义提示内容" trigger="manual">
            <vxe-button @mouseenter="value1 = true" @mouseleave="value1 = false">手动模式</vxe-button>
          </vxe-tooltip>
        </p>

        <p>
          <vxe-tooltip ref="myTip"></vxe-tooltip>
          <vxe-button @mouseenter="$refs.myTip.toVisible($event.target, '自定义提示内容')" @mouseleave="$refs.myTip.close()">高性能模式，只创建一个实例</vxe-button>
        </p>
        `,
        `
        export default {
          data () {
            return {
              value1: false
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
