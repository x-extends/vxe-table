<template>
  <div>
    <h3>npm 安装</h3>
    <p>推荐使用 npm 的方式安装，它能更好地和 <a class="link" href="https://webpack.js.org/">webpack</a> 打包工具配合使用。</p>
    <pre>
      <code class="javascript">
        npm install vxe-table
      </code>
    </pre>
    <pre>
      <code class="javascript">
        import Vue from 'vue'
        import VXETable from 'vxe-table'
        import 'vxe-table/lib/index.css'

        Vue.use(VXETable)
      </code>
    </pre>
    <p>或者</p>
    <pre>
      <code class="javascript">
        import Vue from 'vue'
        import {
          Table,
          TableColumn,
          Grid,
          Excel,
          Pagination,
          Checkbox
        } from 'vxe-table'
        import 'vxe-table/lib/index.css'

        Vue.use(Table)
        Vue.use(TableColumn)
        Vue.use(Grid)
        Vue.use(Excel)
        Vue.use(Pagination)
        Vue.use(Checkbox)
      </code>
    </pre>
    <h3>CDN</h3>
    <p>可以通过 <a class="link" href="https://unpkg.com/vxe-table/">unpkg</a> 或 <a class="link" href="https://cdn.jsdelivr.net/npm/vxe-table/">cdnjs</a> 获取到最新版本的资源，并在页面上引入即可</p>
    <pre>
      <code class="xml">
        &lt;!-- 引入样式 --&gt;
        &lt;link rel="stylesheet" href="https://unpkg.com/vxe-table/lib/index.css"&gt;
        &lt;!-- 引入脚本 --&gt;
        &lt;script src="https://unpkg.com/xe-utils"&gt;&lt;/script&gt;
        &lt;script src="https://unpkg.com/vxe-table"&gt;&lt;/script&gt;
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
