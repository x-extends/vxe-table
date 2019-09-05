<template>
  <div>
    <h2>工具栏</h2>
    <p class="tip">查看 <router-link class="link" :to="{name: 'VXEAPI', params: {name: 'toolbar'}}">API</router-link></p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button>按钮1</vxe-button>
        <vxe-button>按钮2</vxe-button>
        <vxe-button>按钮3</vxe-button>
        <vxe-button>
          <template>下拉按钮</template>
          <template v-slot:dropdowns>
            <vxe-button>按钮1</vxe-button>
            <vxe-button>按钮2</vxe-button>
            <vxe-button>按钮3</vxe-button>
          </template>
        </vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-toolbar :refresh="{ query: findList }">
      <template v-slot:buttons>
        <vxe-button>按钮1</vxe-button>
        <vxe-button>按钮2</vxe-button>
        <vxe-button>按钮3</vxe-button>
        <vxe-button>
          <template>下拉按钮</template>
          <template v-slot:dropdowns>
            <vxe-button>按钮1</vxe-button>
            <vxe-button>按钮2</vxe-button>
            <vxe-button>按钮3</vxe-button>
          </template>
        </vxe-button>
      </template>
    </vxe-toolbar>

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
      loading: false,
      demoCodes: [
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button>按钮1</vxe-button>
            <vxe-button>按钮2</vxe-button>
            <vxe-button>按钮3</vxe-button>
            <vxe-button>
              <template>下拉按钮</template>
              <template v-slot:dropdowns>
                <vxe-button>按钮1</vxe-button>
                <vxe-button>按钮2</vxe-button>
                <vxe-button>按钮3</vxe-button>
              </template>
            </vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-toolbar :refresh="{ query: findList }">
          <template v-slot:buttons>
            <vxe-button>按钮1</vxe-button>
            <vxe-button>按钮2</vxe-button>
            <vxe-button>按钮3</vxe-button>
            <vxe-button>
              <template>下拉按钮</template>
              <template v-slot:dropdowns>
                <vxe-button>按钮1</vxe-button>
                <vxe-button>按钮2</vxe-button>
                <vxe-button>按钮3</vxe-button>
              </template>
            </vxe-button>
          </template>
        </vxe-toolbar>
        `,
        `
        export default {
          data () {
            return {
              loading: false
            }
          },
          methods: {
            findList () {
              this.loading = true
              return new Promise(resolve => {
                this.loading = false
                this.$XModal.message({ message: '刷新成功！', status: 'success' })
                setTimeout(resolve, 800)
              })
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
  },
  methods: {
    findList () {
      this.loading = true
      return new Promise(resolve => {
        this.loading = false
        this.$XModal.message({ message: '刷新成功！', status: 'success' })
        setTimeout(resolve, 800)
      })
    }
  }
}
</script>
