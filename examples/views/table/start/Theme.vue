<template>
  <div>
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
