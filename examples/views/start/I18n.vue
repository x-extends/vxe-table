<template>
  <div>
    <h2>{{ $t('app.aside.nav.i18n') }}</h2>
    <p class="tip">{{ $t('app.body.demo.start.i18n.i18nTitle') }}</p>
    <pre>
      <pre-code class="shell">
        npm install vxe-table xe-utils vue-i18n
      </pre-code>
      <div>src/i18n/index.ts</div>
      <pre-code class="typescript">{{ demoCodes[0] }}</pre-code>
      <div>main.ts</div>
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
    </pre>
    <h2>{{ $t('app.body.demo.start.i18n.translate') }}</h2>
    <p class="tip">{{ $t('app.body.demo.start.i18n.translateTitle') }}</p>
    <pre>
      <pre-code class="typescript">{{ demoCodes[2] }}</pre-code>
      <pre-code class="html">{{ demoCodes[3] }}</pre-code>
    </pre>
    <h2>{{ $t('app.body.demo.start.i18n.findError') }}</h2>
    <p class="tip">通过 <a class="link" href="https://github.com/x-extends/vxe-table/pulls">Pull requests</a> 贡献翻译 -> <a class="link" href="https://github.com/x-extends/vxe-table/tree/master/packages/locale/lang">添加或修改</a></p>
    <div>
      <ul class="lang-list">
        <li><a class="link" href="https://github.com/x-extends/vxe-table/blob/master/packages/locale/lang/zh-CN.js" target="_blank">简体中文（zh-CN）</a></li>
        <li><a class="link" href="https://github.com/x-extends/vxe-table/blob/master/packages/locale/lang/zh-TC.js" target="_blank">繁体中文（zh-TC）</a></li>
        <li><a class="link" href="https://github.com/x-extends/vxe-table/blob/master/packages/locale/lang/en-US.js" target="_blank">English（en-US）</a></li>
        <li><a class="link" href="https://github.com/x-extends/vxe-table/blob/master/packages/locale/lang/ja-JP.js" target="_blank">ジャパン（ja-JP）</a></li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {
      demoCodes: [
        `
        import { createI18n } from 'vue-i18n'
        import zhCN from 'vxe-table/lib/locale/lang/zh-CN'
        import enUS from 'vxe-table/lib/locale/lang/en-US'

        const messages = {
          zh_CN: {
            ...zhCN
          },
          en_US: {
            ...enUS
          }
        }

        const i18n = createI18n({
          locale: 'zh_CN',
          messages,
        })

        export default i18n
        `,
        `
        import { createApp } = 'vue'
        import i18n from './i18n'
        import VXETable from 'vxe-table'
        
        VXETable.setup({
          // 对组件内置的提示语进行国际化翻译
          i18n: (key, args) => i18n.global.t(key, args)
        })

        Vue.use(VXETable)

        createApp(App).use(i18n).use(VXETable).$mount('#app')
        `,
        `
        VXETable.setup({
          // 可选，对参数中的列头、校验提示..等进行自动翻译（只对支持国际化的有效）
          translate (key, args) {
            // 例如，只翻译 "app." 开头的键值
            if (key && key.indexOf('app.') > -1) {
              return i18n.global.t(key, args)
            }
            return key
          }
        })
        `,
        `
        <vxe-table
          border
          height="600"
          :data="tableData">
          <vxe-column field="name" title="app.body.label.name"></vxe-column>
          <vxe-column field="age" title="app.body.label.age"></vxe-column>
          <vxe-column field="sex" title="app.body.label.sex"></vxe-column>
        </vxe-table>
        `
      ]
    }
  }
})
</script>

<style scoped lang="scss">
.lang-list {
  list-style: disc;
  padding-left: 40px;
}
</style>
