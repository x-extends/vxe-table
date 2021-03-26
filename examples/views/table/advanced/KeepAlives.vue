<template>
  <div>
    <p class="tip">
      keep-alive 切换<span class="red">（如果需要将表格放到隐藏的元素中，那么就必然会导致宽度无法计算）</span>，有以下方法解决<br>
      1.每次切换 Tab 页显示之后手动调用 <table-api-link prop="recalculate"/> 重新计算表格<br>
      2.使用 <table-api-link prop="sync-resize"/> 绑定指定的变量来触发重新计算表格<br>
      3.使用 <table-api-link prop="auto-resize"/> 自动监听父容器来触发重新计算表格
    </p>

    <p class="btns">
      <router-link class="link" :to="{name: 'TableKeepAliveTable1'}">表格1</router-link>
      <router-link class="link" :to="{name: 'TableKeepAliveTable2'}">表格2</router-link>
      <router-link class="link" :to="{name: 'TableKeepAliveTable3'}">表格3</router-link>
    </p>

    <router-view #default="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {
      demoCodes: [
        `
        // ... 代码片段，仅供参考
        
        <p class="btns">
          <router-link class="link" :to="{name: 'TableKeepAliveTable1'}">表格1</router-link>
          <router-link class="link" :to="{name: 'TableKeepAliveTable2'}">表格2</router-link>
          <router-link class="link" :to="{name: 'TableKeepAliveTable3'}">表格3</router-link>
        </p>

        <router-view #default="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
        `
      ]
    }
  }
})
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
