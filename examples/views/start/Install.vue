<template>
  <div>
    <h2>{{ $t('app.aside.nav.install') }}</h2>
    <p class="tip">
      推荐使用 npm 的方式安装，它能更好地和 <a class="link" href="https://webpack.js.org/">webpack</a> 打包工具配合使用。<br>
      依赖库： <a class="link" href="https://www.npmjs.com/package/xe-utils">xe-utils</a>&nbsp;&nbsp;<a class="link" href="https://cn.vuejs.org/v2/guide/components-slots.html#%E5%8A%A8%E6%80%81%E6%8F%92%E6%A7%BD%E5%90%8D" style="font-size: 20px;font-weight: 700;">vue 3.x</a><br>
    </p>
    <pre>
      <pre-code class="shell">
        npm install xe-utils vxe-table@next
      </pre-code>
      <pre-code class="typescript">{{ demoCodes[0] }}</pre-code>
    </pre>
    <h2>CDN</h2>
    <p class="tip">
      可以通过 <a class="link" href="https://unpkg.com/vxe-table/">unpkg</a> 或 <a class="link" href="https://cdn.jsdelivr.net/npm/vxe-table/">cdnjs</a> 获取到最新版本的资源，并在页面上引入即可<br>
      <span class="red">（注：使用 cdn 引用方式需要注意是否锁定版本，默认指向最新版本）</span>
    </p>
    <pre>
      <pre-code class="xml">
        &lt;!-- 引入样式 --&gt;
        &lt;link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vxe-table@next/lib/style.css"&gt;
        &lt;!-- 引入脚本 --&gt;
        &lt;script src="https://cdn.jsdelivr.net/npm/xe-utils"&gt;&lt;/script&gt;
        &lt;script src="https://cdn.jsdelivr.net/npm/vxe-table@next"&gt;&lt;/script&gt;
      </pre-code>
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
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
        import { App, createApp } = 'vue'
        import 'xe-utils'
        import VXETable from 'vxe-table'
        import 'vxe-table/lib/style.css'

        function useTable (app: App) {
          app.use(VXETable)

          // 给 vue 实例挂载内部对象，例如：
          // app.config.globalProperties.$XModal = VXETable.modal
          // app.config.globalProperties.$XPrint = VXETable.print
          // app.config.globalProperties.$XSaveFile = VXETable.saveFile
          // app.config.globalProperties.$XReadFile = VXETable.readFile
        }

        createApp(App).use(useTable).mount('#app')
        `,
        `
        function useTable (app) {
          app.use(VXETable)

          // 给 vue 实例挂载内部对象，例如：
          // app.config.globalProperties.$XModal = VXETable.modal
          // app.config.globalProperties.$XPrint = VXETable.print
          // app.config.globalProperties.$XSaveFile = VXETable.saveFile
          // app.config.globalProperties.$XReadFile = VXETable.readFile
        }

        createApp(App).use(useTable).mount('#app')
        `
      ]
    }
  }
})
</script>
