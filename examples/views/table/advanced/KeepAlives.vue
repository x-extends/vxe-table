<template>
  <div>
    <p class="tip">keep-alive 切换，v-show 可以使用 <table-api-link prop="auto-resize"/> 或者 <table-api-link prop="sync-resize"/> 自动监听响应式宽，也可以手动调用 <table-api-link prop="recalculate"/> 重新计算宽度</p>

    <p class="btns">
      <router-link class="link" :to="{name: 'TableKeepAliveTable1'}">表格1</router-link>
      <router-link class="link" :to="{name: 'TableKeepAliveTable2'}">表格2</router-link>
      <router-link class="link" :to="{name: 'TableKeepAliveTable3'}">表格3</router-link>
    </p>

    <keep-alive>
      <router-view></router-view>
    </keep-alive>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  data () {
    return {
      demoCodes: [
        `
        <p class="btns">
          <router-link class="link" :to="{name: 'TableKeepAliveTable1'}">表格1</router-link>
          <router-link class="link" :to="{name: 'TableKeepAliveTable2'}">表格2</router-link>
          <router-link class="link" :to="{name: 'TableKeepAliveTable3'}">表格3</router-link>
        </p>

        <keep-alive>
          <router-view></router-view>
        </keep-alive>
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

<style scoped>
.btns .link {
  margin-right: 20px;
  color: #333;
}
.btns .link.router-link-exact-active {
  color: #409eff;
}
</style>
