<template>
  <div>
    <p class="tip">
      keep-alive 切换<span class="red">（如果需要将表格放到隐藏的元素中，那么就必然会导致宽度无法计算）</span>，有以下方法解决<br>
      1.在 actived 显示的事件中手动调用 <table-api-link prop="recalculate"/> 重新计算宽度 2.使用 <table-api-link prop="sync-resize"/> 绑定可视的变量实现自动更新宽度 3.使用 <table-api-link prop="auto-resize"/> 自动监听响应式更新宽度
    </p>

    <p class="btns">
      <router-link class="link" :to="{name: 'TableScrollKeepAliveTable1'}">表格1</router-link>
      <router-link class="link" :to="{name: 'TableScrollKeepAliveTable2'}">表格2</router-link>
      <router-link class="link" :to="{name: 'TableScrollKeepAliveTable3'}">表格3</router-link>
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
