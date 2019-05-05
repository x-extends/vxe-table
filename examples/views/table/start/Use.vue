<template>
  <div>
    <h3>全局参数</h3>
    <p>修改默认的全局配置</p>
    <pre>
      <code >
        import Vue from 'vue'
        import VXETable from 'vxe-table'
        import 'vxe-table/lib/index.css'

        Vue.use(VXETable, {
          size: 'small',
          contextMenu: null,
          optimized: {
            scroll: {
              gt: 500,
              oSize: 30,
              rSize: 120
            }
          }
        })
      </code>
    </pre>
    <h3>主题</h3>
    <p>修改默认的主题颜色</p>
    <pre>
      <code >
        // Case 1. 引入默认的样式
        import 'vxe-table/lib/index.css'

        // Case 2. 自定义表格颜色（复制 style/variable.scss 到自己的项目中，修改颜色变量，然后引入）
        // @import 'assets/style/vxe-table/variable.scss';
        // @import 'vxe-table/style/table.scss';

        // Case 3. 重写主题样式（复制 style/table.scss 到项目中自行修改）
        // @import 'assets/style/vxe-table/variable.scss';
        // @import 'assets/style/vxe-table/table.scss';
      </code>
    </pre>
    <h3>国际化</h3>
    <p>修改默认的国际化信息</p>
    <pre>
      <code >
        import Vue from 'vue'
        import VueI18n from 'vxe-i18n'
        import VXETable from 'vxe-table'
        import zhCNLocat from 'vxe-table/lib/locale/lang/zh_CN'
        import enLocat from 'vxe-table/lib/locale/lang/zh_CN'

        const messages = {
          zh_CN: {
            ...zhCNLocat
          },
          en: {
            ...enLocat
          }
        }

        const i18n = new VueI18n({
          locale: 'zh_CN',
          messages,
        })

        Vue.use(VXETable, {
          i18n: (key, value) => i18n.t(key, value)
        })

        new Vue({ i18n }).$mount('#app')
      </code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  mounted () {
    this.$el.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
}
</script>
