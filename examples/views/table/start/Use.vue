<template>
  <div>
    <h3>局部大小</h3>
    <p>&nbsp;&nbsp;&nbsp;&nbsp;每个组件都有 <table-api-link prop="size"/> 属性，默认是继承父组件，所以只要给局部的父组件设置 <table-api-link prop="size"/>，所有子孙组件一律继承，该功能对于某些场景非常有用</p>
    <p>&nbsp;&nbsp;&nbsp;&nbsp;如果需要设置全局大小尺寸，请参考下面即可</p>
    <h3>全局参数</h3>
    <p>修改默认的全局配置</p>
    <pre>
      <code class="javascript">
        import Vue from 'vue'
        import VXETable from 'vxe-table'
        import 'vxe-table/lib/index.css'

        Vue.use(VXETable, {
          size: 'small'
        })
      </code>
    </pre>
    <p>通过 setup 函数设置</p>
    <pre>
      <code class="javascript">
        import Vue from 'vue'
        import VXETable from 'vxe-table'
        import 'vxe-table/lib/index.css'

        VXETable.setup({
          // 默认尺寸
          size: 'small',
          // 所有内容超过隐藏
          showAllOverflow: null,
          // 所有表头内容超过隐藏
          showHeaderAllOverflow: null,
          // 默认快捷菜单
          contextMenu: null,
          // 自定义图标配置
          iconMap: {
            sortAsc: 'vxe-icon--caret-top',
            sortDesc: 'vxe-icon--caret-bottom',
            filter: 'vxe-icon--funnel',
            edit: 'vxe-icon--edit-outline',
            tree: 'vxe-icon--caret-right',
            jumpPrev: 'vxe-icon--d-arrow-left',
            jumpNext: 'vxe-icon--d-arrow-right',
            prevPage: 'vxe-icon--arrow-left',
            nextPage: 'vxe-icon--arrow-right'
          },
          // 默认 tooltip 主题样式
          tooltipConfig: {
            theme: 'dark'
          },
          // 默认分页参数
          pager: {
            pageSize: 10,
            pagerCount: 7,
            pageSizes: [10, 15, 20, 50, 100],
            layouts: ['PrevJump', 'PrevPage', 'Jump', 'PageCount', 'NextPage', 'NextJump', 'Sizes', 'Total']
          },
          // 默认优化配置项
          optimization : {
            animat: true,
            // 当列大于 40 条时自动启用横向 X 滚动渲染
            scrollX: {
              gt: 40,
              oSize: 5,
              rSize: 16
            },
            // 当数据大于 500 条时自动启用纵向 Y 滚动渲染
            scrollY: {
              gt: 500,
              oSize: 20,
              rSize: 80
            }
          }
        })
      </code>
    </pre>
    <h3>主题</h3>
    <p>修改默认的主题颜色</p>
    <pre>
      <code class="scss">
        // Case 1. Use the default theme style.  使用默认的主题样式
        @import 'vxe-table/lib/index.css';

        // Case 2. Modify the table theme color.  修改表格主题颜色
        // @import 'assets/style/vxe-table/variable.scss';
        // @import 'vxe-table/src/style/default.scss';

        // Case 3. If you need to completely rewrite the theme style, Copy the vxe-table/src/style directory into the project and modify it yourself.
        // 如果需要完全重写主题样式，只需复制 vxe-table/src/style 目录到项目中自行修改就行（例如复制到 /assets
        // @import 'assets/style/index.scss';
      </code>
    </pre>
    <h3>国际化</h3>
    <p>修改默认的国际化信息</p>
    <pre>
      <code class="javascript">
        import Vue from 'vue'
        import VueI18n from 'vxe-i18n'
        import VXETable from 'vxe-table'
        import zhCNLocat from 'vxe-table/lib/locale/lang/zh_CN'
        import enLocat from 'vxe-table/lib/locale/lang/en'

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
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
}
</script>
